import Product from "../../components/Product";
import { brazilTimeString } from "../../helpers/brazilTime";

export default function ProductPage({ experience, serverTime, nonce }) {
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
