"use server";
import { readFile } from "fs/promises";
import jszip from "jszip";
import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import contributors from "public/data/json/contributors.json";
import undertakingEmbedImage from "~/utils/image";
import serverWrapper from "~/utils/serverWrapper";
import undertakingImgType from "~/utils/validImage";
import { UndertakingBody, zodUndertaking } from "~/utils/zodUndertaking";
import { MAX_UNDERTAKING_IMG_SIZE } from "~/utils/zodUndertaking";
const contributorsBuffer = Buffer.from(JSON.stringify(contributors));

interface ImgTypes {
  idImgType: number;
  signatureImgType: number;
}

const reg = 10;
const fontSize = new Map([
  ["1", 12],
  ["2", 7.8],
]);

const universityNames = new Map([
  ["1", "FEU Tech"],
  ["2", "FEU Institute of Technology"],
]);


const _maxDims = {
  sig: {
    width: 100,
    height: 50,
  },
  id: {
    width: 150,
    height: 150,
  },
} as const;
const { sig: sigMaxDims, id: idMaxDims } = _maxDims;
type dim = typeof _maxDims.sig | typeof _maxDims.id;

type UndertakingBodyPartial = Omit<
  UndertakingBody,
  "idImg" | "signatureImg" | "courses" | "enrollmentFormat"
>;

const headers = new Headers({
  "Cache-Control": "no-store",
  "Content-Disposition": "attachment; filename=CONFIDENTIALITY-UNDERTAKING.zip",
  "Content-Type": "application/zip",
});

function setDimWithAspectRatio(width: number, height: number, maxDims: dim) {
  const aspectRatio = width / height;
  let w = maxDims.width;
  let h = maxDims.width / aspectRatio;

  if (h > maxDims.height) {
    h = maxDims.height;
    w = maxDims.height * aspectRatio;
  }
  return {
    width: w,
    height: h,
  };
}

function getYearString(year: string) {
  switch (year) {
    case "1":
      return "1st Year";
    case "2":
      return "2nd Year";
    case "3":
      return "3rd Year";
    case "4":
      return "4th Year";
    default:
      return year;
  }
}

const source = process.cwd() + "/public/data/CONFIDENTIALITY-UNDERTAKING.pdf";
const createTemplate = async (
  signatureBytes: Buffer,
  idBytes: Buffer,
  imgTypes: ImgTypes,
  rest: UndertakingBodyPartial,
) => {
  const { fullName, year, program, studentNumber } = rest;
  const yearString = getYearString(year);
  const templatePdf = await PDFDocument.load(await readFile(source));
  const { idImgType, signatureImgType } = imgTypes;
  const idImgPromise = undertakingEmbedImage(idBytes, idImgType, templatePdf);
  const sigImgPromise = undertakingEmbedImage(
    signatureBytes,
    signatureImgType,
    templatePdf,
  );

  const [idImg, sigImg] = await Promise.all([idImgPromise, sigImgPromise]);
  const { width: sigWidth, height: sigHeight } = setDimWithAspectRatio(
    sigImg.width,
    sigImg.height,
    sigMaxDims,
  );

  const firstPage = templatePdf.getPages()[0];
  if (!firstPage) throw new Error("No pages found");
  firstPage.drawImage(sigImg, {
    x: 400,
    y: 145,
    width: sigWidth,
    height: sigHeight,
  });

  firstPage.drawText(fullName, {
    x: 400,
    y: 136,
    size: reg,
  });

  firstPage.drawText(`${yearString} / ${program}`, {
    x: 400,
    y: 122,
    size: reg,
  });

  firstPage.drawText(studentNumber, {
    x: 400,
    y: 110,
    size: reg,
  });

  const date = new Date().toLocaleDateString("en-PH");
  firstPage.drawText(date, {
    x: 400,
    y: 96,
    size: reg,
  });

  const { width: idImgWidth, height: idImgHeight } = setDimWithAspectRatio(
    idImg.width,
    idImg.height,
    idMaxDims,
  );

  firstPage.drawImage(idImg, {
    x: 100,
    y: 10,
    width: idImgWidth,
    height: idImgHeight,
  });

  return templatePdf.save();
};

export const POST = serverWrapper(async (req) => {
  const formData = await req.formData();
  const body = Object.fromEntries(formData.entries());
  body.courses = (body.courses as string).split(",") as unknown as FormDataEntryValue;
  const parsedBody = zodUndertaking.parse(body);

  const {
    fullName,
    studentNumber,
    year,
    program,
    courses,
    idImg,
    signatureImg,
    enrollmentFormat,
  } = parsedBody;

  if (idImg.size > MAX_UNDERTAKING_IMG_SIZE || signatureImg.size > MAX_UNDERTAKING_IMG_SIZE)
    throw new Error("Image size too large");

  const [signature, id] = await Promise.all([
    signatureImg.arrayBuffer(),
    idImg.arrayBuffer(),
  ]);
  const idImgType = undertakingImgType(idImg.type);
  const signatureImgType = undertakingImgType(signatureImg.type);
  const templatePdfBytes = await createTemplate(
    Buffer.from(signature),
    Buffer.from(id),
    {
      idImgType,
      signatureImgType,
    },
    {
      fullName,
      year,
      program,
      studentNumber,
    },
  );
  const zip = new jszip();
  const uniName = universityNames.get(enrollmentFormat);
  if (!uniName) throw new Error("Invalid university");
  const title = fontSize.get(enrollmentFormat);
  for await (const course of courses) {
    const pdfDoc = await PDFDocument.load(templatePdfBytes);
    const firstPage = pdfDoc.getPages()[0];
    if (!firstPage) throw new Error("No pages found");
    firstPage.drawText(`${uniName} - ${course}`, {
      x: 244,
      y: 694,
      size: title,
    });
    const coursePdfBytes = await pdfDoc.save();
    zip.file(
      `${course}-CONFIDENTIALITY-UNDERTAKING.pdf`,
      Buffer.from(coursePdfBytes),
    );
  }
  zip.file("README.md", contributorsBuffer);
  return new NextResponse(
    await zip.generateAsync({ type: "blob" }),
    {
      status: 200,
      headers,
    },
  );
});