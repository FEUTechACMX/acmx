import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const serverWrapper = (
    fn: (
        req: NextRequest
    ) => Promise<NextResponse>
) => {
    return async (req: NextRequest) => {
        try {
            return await fn(req);
        } catch (e) {
            return new NextResponse(e?.toString(), {
                status: 422,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
    };
};

export default serverWrapper;