import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface EnvConfig {
    isProd: boolean;
}

const getEnvironmentConfig = (): EnvConfig => {
    const nextAuthUrl = process.env.NEXTAUTH_URL || '';
    const isProd = nextAuthUrl.includes(process.env.NEXT_PUBLIC_SITE_DOMAIN as string);
    return { isProd };
};

const middleware = async (req: NextRequest) => {
    const { isProd } = getEnvironmentConfig();
    const hostname = req.headers.get('host') ?? '';
    const apiKey = req.headers.get('x-api-key');
    
    const url = req.nextUrl;
    const path = url.pathname;
    
    if (hostname === `api.${process.env.NEXT_PUBLIC_SITE_DOMAIN}` || (!isProd && hostname.startsWith('api.localhost'))) {
        if (!path.startsWith('/public')) {
            if (!apiKey) {
                return new Response('API key required', {status: 401});
            }
        }
        return NextResponse.rewrite(
            new URL(`/api${path}`, req.url)
        );
    }
    
    return NextResponse.next();
};

export const config = {
    matcher: ['/:path*'],
};

export default middleware;
