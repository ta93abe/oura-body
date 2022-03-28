import type { GetServerSideProps, NextPage } from "next";
import Head from 'next/head'

type Props = {
  bpm: number
  source: string
  timestamp: Date
}

export interface ServerSideIndexProps {
  props: Props[]
}

const Home = ({ props }: ServerSideIndexProps) => {
  return (
    <div className="flex flex-col min-h-screen px-8">
      <Head>
        <title>our Oura</title>
        <meta name="description" content="fetch data from Oura api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow px-0 flex-1 flex flex-col justify-center items-center">
        <div>Heart Rate</div>
        <div className="text-4xl">{ (props.reduce((sum, data) => sum + data.bpm, 0) / props.length).toFixed(1) }</div>
      </main>

      <footer className="flex py-8 px-0 border-t-2 border-solid border-l-violet-300 justify-center items-center">
        <a
          href="https://ta93a.be"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by @ta93abe
        </a>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const url = 'https://api.ouraring.com/v2/usercollection/heartrate';
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${process.env.OURA_ACCESS_TOKEN}`
    }
  });
  const data = await res.json();

  const props = data.data;

  return { props: { props } }
}

export default Home
