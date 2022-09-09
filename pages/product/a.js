export default function ProductA() {
  return <p>Product A loading...</p>;
}

export async function getServerSideProps({ req, res }) {
  console.log("==== A ====");

  res.setHeader("set-cookie", "experience=A");

  return {
    redirect: {
      permanent: false,
      destination: "/product",
    },
  };
}
