import AdmZip from "adm-zip";
import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { PDFDocument } from "pdf-lib";
import { z } from "zod";
import undertakingEmbedImage from "~/utils/image";
import undertakingImgType from "~/utils/validImage";

import { NextRequest } from "next/server";
import contributors from "public/data/json/contributors.json";
const contributorsBuffer = Buffer.from(JSON.stringify(contributors));

export interface UndertakingBody {
  fullName: string;
  idImg: File;
  signatureImg: File;
  enrollmentFormat: string;
  studentNumber: string;
  year: string;
  program: string;
  courses: string[];
}

const zodUndertaking = z.object({
  fullName: z.string(),
  idImg: z.instanceof(File),
  signatureImg: z.instanceof(File),
  enrollmentFormat: z.string(),
  studentNumber: z.string(),
  year: z.string(),
  program: z.string(),
  courses: z.array(z.string()),
}) satisfies z.ZodType<UndertakingBody>;

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

const source = process.cwd() + "/public/data/CONFIDENTIALITY-UNDERTAKING.pdf";
const TEMPLATE_PDF_BUFFER = await readFile(source);
const createTemplate = async (
  signatureBytes: Buffer,
  idBytes: Buffer,
  imgTypes: ImgTypes,
  rest: UndertakingBodyPartial,
) => {
  const { fullName, year, program, studentNumber } = rest;
  const templatePdf = await PDFDocument.load(TEMPLATE_PDF_BUFFER);
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

  firstPage.drawText(`${year} / ${program}`, {
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
const POST = async (req: NextRequest, res: NextResponse) => {
  const formData = await req.formData();
  const body = zodUndertaking.parse(formData);
  const {
    fullName,
    studentNumber,
    year,
    program,
    courses,
    idImg,
    signatureImg,
    enrollmentFormat,
  } = body;

  const [signature, id] = await Promise.all([
    signatureImg.arrayBuffer(),
    idImg.arrayBuffer(),
  ]);
  const idImgType = undertakingImgType(idImg.type);
  const signatureImgType = undertakingImgType(signatureImg.type);
  console.log("Generating PDFs...");
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
  const zip = new AdmZip();
  const uniName = universityNames[enrollmentFormat as keyof typeof universityNames];
  if (!enrollmentFormat || !uniName) throw new Error("Invalid university");
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
    zip.addFile(
      `${course}-CONFIDENTIALITY-UNDERTAKING.pdf`,
      Buffer.from(coursePdfBytes),
    );
  }
  zip.addFile("README.md", contributorsBuffer);
  console.log("PDFs generated successfully");
  return new NextResponse(zip.toBuffer(), {
    status: 200,
    headers,
  });
};

export { POST };
