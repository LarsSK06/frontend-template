import { NextRequest, NextResponse } from "next/server";

export const middleware = (req: NextRequest) => {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");

    const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
        style-src 'self' 'nonce-${nonce}';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `;

    const cspHeaderValue = cspHeader.replace(/\s{2,}/g, ' ').trim();

    const requestHeaders = new Headers(req.headers);

    requestHeaders.set("x-nonce", nonce);
    requestHeaders.set("Content-Security-Policy", cspHeaderValue);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders
        }
    });

    //response.headers.set("Content-Security-Policy", cspHeaderValue);

    return response;
};