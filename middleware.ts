import createMiddleware from 'next-intl/middleware';

const locales = ['nb', 'nn'];
const defaultLocale = 'nb';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'always',
});

/*export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  console.log(`Middleware: ${pathname}`);

  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/dev/${locale}`));

  if (pathnameHasLocale) {
    return;
  }

  const pathWithoutPrefix = pathname.replace('/dev', '');
  request.nextUrl.pathname = `/dev/${defaultLocale}${pathWithoutPrefix}`;
  return NextResponse.redirect(request.nextUrl);
};*/

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(nb|nn)/:path*'],
};

/*export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};*/
