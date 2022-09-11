addEventListener("fetch", (event) => {
  try {
    return event.respondWith(handleRequest(event));
  } catch (err) {
    return new Response(err.stack || err);
  }
});

async function handleProductABTest(request) {
  const cookie = request.headers.get("cookie");
  const url = new URL(request.url);

  let response;

  // Fetch from /a
  if (cookie?.includes("experience=A")) {
    response = await fetch(`${url.origin}/product/a`, request);
    // Fetch from /b
  } else if (cookie?.includes("experience=B")) {
    response = await fetch(`${url.origin}/product/b`, request);
    // Set a random cookie and redirect according to the cookie
  } else {
    const experience = Math.random() < 0.5 ? "A" : "B";

    response = await fetch(
      `${url.origin}/product/${experience.toLowerCase()}`,
      request
    );
    response = new Response(response.body, response);
    response.headers.append("Set-Cookie", `experience=${experience}; path=/`);
  }

  return response;
}

// The cookie must be set in all pages, to be possible to navigate using
// the <Link /> component in Next.js
async function handleRegularPages(request) {
  const cookie = request.headers.get("cookie");
  let response;

  // If the cookie is available just go to the page
  if (cookie?.includes("experience=A") || cookie?.includes("experience=B")) {
    response = await fetch(request);
    // If it's not, set the cookie and go to the page
  } else {
    const experience = Math.random() < 0.5 ? "A" : "B";

    response = await fetch(request);
    response = new Response(response.body, response);
    response.headers.append("Set-Cookie", `experience=${experience}; path=/`);
  }

  return response;
}

async function handleRequest({ request }) {
  const url = new URL(request.url);

  console.log("==> pathname: ", url.pathname);

  let response;

  if (url.pathname.startsWith("/product")) {
    console.log("==> is product");
    response = await handleProductABTest(request);
  } else {
    console.log("==> other");
    response = await handleRegularPages(request);
  }

  return response;
}
