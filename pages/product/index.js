import Product from "../../components/Product";
import { brazilTimeString } from "../../helpers/brazilTime";

// Should NOT be cached by Cloudflare. It's used to client side navigation like
// using <Link />
export default function ProductPage({ experience, serverTime, nonce }) {
  return (
    <Product experience={experience} serverTime={serverTime} nonce={nonce} />
  );
}

export async function getServerSideProps({ req }) {
  console.log(`==== Product (cookie ${req?.cookies?.experience} ) ====`);

  // Get the experience from the cookie. If none is set we can set a default
  // value.
  const experience = req?.cookies?.experience ?? "none";

  return {
    props: {
      experience,
      serverTime: brazilTimeString(),
      nonce: Math.floor(Math.random() * 1000000),
    },
  };
}
