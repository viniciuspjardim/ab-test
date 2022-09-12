# A/B Test

The goal of this project is to see how we can setup a Next.js A/B test on
AWS Lambda with Cloudflare cache, but without giving up Next.js server side
rendering advantages.

This test is deployed at
[viniciusjardim.com](https://viniciusjardim.com). 

## Details

The idea is to make Cloudflare cache two versions of the same page. For
a regular page with A/B test we would have 3 URLs - `/page-name`,
`/page-name/a`, and `/page-name/b`.

> I'll try to replace the `/a` and `/b` with query parameters.

Cloudflare will have 2 cached pages. The `/a` and `/b`. It will point to
one of each depending on a cookie. If no cookie is set, it will flip a
coin to choose one and set the cookie.

> See the Cloudflare worker code in [/cf-worker.js](/cf-worker.js).

The `/page-name` (without the version) will not be cached, and will be used
for client side navigation only, when the cookie is already set.

This makes the Cloudflare cache to not interfere with Next.js server side
rendering feature. We render two versions of the same page already on Next.js
server and cache them separately.
