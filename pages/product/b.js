export default function ProductB() {
  return <p>Product B loading...</p>;
}

export async function getServerSideProps({ req, res }) {
  console.log("==== B ====");

  res.setHeader("set-cookie", "experience=B");

  return {
    redirect: {
      permanent: false,
      destination: "/product",
    },
  };
}
