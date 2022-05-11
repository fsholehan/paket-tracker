import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Paket from "../components/Paket";
import Result from "../service/dummy/result";

export default function Home() {
  const data = Result;

  return (
    <>
      <Head>
        <title>PaketTracker - Cek Paket Mu!</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
      <Paket />
    </>
  );
}
