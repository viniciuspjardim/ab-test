import Product from "../../components/Product";
import { brazilTimeString } from "../../helpers/brazilTime";

// Should be cached by Cloudflare
export default function ProductPageB({ experience, serverTime, nonce }) {
  return (
    <Product experience={experience} serverTime={serverTime} nonce={nonce} />
  );
}

export async function getServerSideProps() {
  console.log("==== Product B ====");

  return {
    props: {
      experience: "B",
      serverTime: brazilTimeString(),
      nonce: Math.floor(Math.random() * 1000000),
    },
  };
}
