/* eslint-disable @next/next/no-html-link-for-pages */

/*
 * The idea is to make Cloudflare to cache two versions of the same page. For
 * a regular page with A/B test we would have 3 URLs - /page-name,
 * /page-name/a, and /page-name/b.
 *
 * Cloudflare will have 2 cached pages. The /a and the /b. It will point to
 * one of each depending on a cookie. If no cookie is set, it will flip a
 * coin to choose one.
 *
 * The /page-name (without the version) will not be cached, and will be used
 * for client side navigation only, when the cookie is already set.
 *
 * So already in the server code we have the experience we are in, depending
 * only on the file we are. In the Cloudflare worker we will cache the two
 * pages remove the /<a | b> from the URL and set the cookie.
 *
 * Note: unfortunately AWS + serverless does not support Next.js middleware.
 * The solution with it is way more elegant.
 */

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
