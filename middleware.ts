import { NextResponse, NextFetchEvent, NextRequest } from "next/server";
import { jwt } from "./utils";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const cookie = req.headers.get('cookie')
    const token = cookie?.replace('token=', '') || ''

    try {
        await jwt.isValidToken( token )
        return NextResponse.next()
        
    } catch (error) {
        const { origin, pathname } = req.nextUrl.clone()
        return NextResponse.redirect(`${origin}/auth/login?p=${pathname}`)
    }
}

export const config = {
    matcher: ['/checkout/address']
}