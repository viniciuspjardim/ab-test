/* eslint-disable @next/next/no-html-link-for-pages */

import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { brazilTimeString } from "../helpers/brazilTime";
import styles from "../styles/Home.module.css";

export default function Home({ serverTime, nonce }) {
  const [clientTime, setClientTime] = useState("");

  useEffect(() => {
    setClientTime(brazilTimeString());
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home - A/B Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ fontSize: "20px" }} className={styles.main}>
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <Link href="/product">
            <a>Product</a>
          </Link>
          <span>&nbsp;|&nbsp;</span>

          <a href="/product/a">Product A</a>
          <span>&nbsp;|&nbsp;</span>

          <a href="/product/b">Product B</a>
        </div>

        <code>
          Page: Home
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

export async function getServerSideProps() {
  console.log("==== Home ====");

  return {
    props: {
      serverTime: brazilTimeString(),
      nonce: Math.floor(Math.random() * 1000000),
    },
  };
}
