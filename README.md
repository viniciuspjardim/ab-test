# A/B Test POC

The goal of this proof of concept is to see how we can setup Next.js A/B tests
on AWS Lambda with Cloudflare cache, but without giving up Next.js server side
rendering advantages. Please see it working: https://viniciusjardim.com. 

## Details

The idea is to make Cloudflare cache two versions of the same page. For
a regular page with A/B test we would have 3 URLs - `/page-name`,
`/page-name/a`, and `/page-name/b`. See the Cloudflare worker code
[here](/cf-worker.js).

Cloudflare will have two cached versions of this page - the `/a` and `/b`.
In this example, when you go to `/product`, Cloudflare is actually getting the
cached version from `/product/a` or `/product/b` depending on the experience
cookie you have. If you don't have the cookie, it will set one randomly.

> I'll try to replace the `/a` and `/b` with a query parameter.

When you reach `/product`, you will see that the *Experience* is either A or B.
And we get this value all the way from the server in `getServerSideProps`.
Even disabling the JavaScript on the client is possible to see the experience,
because it was server side rendered.

The `/page-name` (without the version) will not be cached, and will be used
for client side navigation only, when the cookie is already set. This enables
the Next.js `<Link>` to keep working.

With this solution, Cloudflare cache does not interfere with Next.js server side
rendering feature. We render two versions of the same page already on Next.js
server and cache them separately. The Cloudflare worker splits the traffic between
the two versions of the page.
