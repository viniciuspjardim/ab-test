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

      <main className={styles.main}>
        <div style={{ display: "flex", marginBottom: "16px" }}>
          <Link href="/product">
            <a>Product {"<Link>"}</a>
          </Link>

          <span>&nbsp;|&nbsp;</span>

          <a href="/product">Product {"<a>"}</a>
        </div>

        <code>
          Page: Home
          <br />
          ServerTime: {serverTime}
          <br />
          ClientTime: {clientTime}
        </code>

        <p>{nonce}</p>

        <p className={styles.info}>
          When you go to <code>/product</code>, Cloudflare is actually getting
          the cached version from <code>/product/a</code> or{" "}
          <code>/product/b</code> depending on the <code>experience</code>{" "}
          cookie you have. If you don&apos;t have the cookie, it will set one
          randomly.
        </p>

        <a href="https://github.com/viniciuspjardim/ab-test">GitHub</a>
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
