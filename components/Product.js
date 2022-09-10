import Head from "next/head";
import { useEffect, useState } from "react";
import { brazilTimeString } from "../helpers/brazilTime";
import styles from "../styles/Home.module.css";

export default function Product({ experience, serverTime, nonce }) {
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    setClientTime(brazilTimeString());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Product - {experience}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ fontSize: "20px" }} className={styles.main}>
        <code>
          Page: Product
          <br />
          Experience: {experience}
          <br />
          ServerTime: {serverTime}
          <br />
          ClientTime: {clientTime}
        </code>

        <p>{nonce}</p>
      </main>
    </div>
  );
}
