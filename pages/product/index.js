import Product from "../../components/Product";

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
      serverTime: new Date().toLocaleString("pt-BR"),
      nonce: Math.floor(Math.random() * 1000000),
    },
  };
}
