import { NextResponse } from "next/server";
import { authMiddleware } from "@clerk/nextjs";
import type { NextRequest, NextFetchEvent } from "next/server";

const allowedOrigins = [
    "https://convo-space-8cnfn511f-jerrys-projects-825ed6bc.vercel.app",
    "https://convo-space-h9vul1fj4-jerrys-projects-825ed6bc.vercel.app",
];

// CORS Middleware
function corsMiddleware(req: NextRequest) {
    const origin = req.headers.get("origin");

    if (origin && allowedOrigins.includes(origin)) {
        const response = NextResponse.next();
        response.headers.set("Access-Control-Allow-Origin", origin);
        response.headers.set("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
        return response;
    }

    if (req.method === "OPTIONS") {
        return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json({ message: "CORS not allowed" }, { status: 403 });
}

// Combined Middleware
export default async function middleware(req: NextRequest, event: NextFetchEvent) {
    // Process authentication first
    const authResult = authMiddleware({
        publicRoutes: ["/api/uploadthing"],
    })(req, event);

    if (!authResult) {
        return corsMiddleware(req);
    }

    return authResult;
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


// https://convo-space-8cnfn511f-jerrys-projects-825ed6bc.vercel.app/

// import { authMiddleware } from "@clerk/nextjs";

// export default authMiddleware({
//     publicRoutes: ["/api/uploadthing"]
// });

// export const config = {
//     matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };