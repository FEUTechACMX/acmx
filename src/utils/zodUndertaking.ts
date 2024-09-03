import { z } from 'zod';

export interface UndertakingBody {
    fullName: string;
    studentNumber: string;
    year: string;
    program: string;
    enrollmentFormat: string;
    idImg: File;
    signatureImg: File;
    courses: string[];
}
export const zodUndertaking = z.object({
    fullName: z.string(),
    studentNumber: z.string(),
    year: z.string(),
    program: z.string(),
    enrollmentFormat: z.string(),
    idImg: z.instanceof(File),
    signatureImg: z.instanceof(File),
    courses: z.array(z.string()),
}) satisfies z.ZodType<UndertakingBody>;

export const MAX_UNDERTAKING_IMG_SIZE = 5000000;