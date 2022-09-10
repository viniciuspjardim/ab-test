import Product from "../../components/Product";
import { brazilTimeString } from "../../helpers/brazilTime";

// Should be cached by Cloudflare
export default function ProductPageA({ experience, serverTime, nonce }) {
  return (
    <Product experience={experience} serverTime={serverTime} nonce={nonce} />
  );
}

export async function getServerSideProps() {
  console.log("==== Product A ====");

  return {
    props: {
      experience: "A",
      serverTime: brazilTimeString(),
      nonce: Math.floor(Math.random() * 1000000),
    },
  };
}
