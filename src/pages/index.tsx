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
    <div>
      <Head>
        <title>our Oura</title>
        <meta name="description" content="fetch data from Oura api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>Heart Rate</div>
        <div>{ props.reduce((sum, data) => sum + data.bpm, 0) / props.length }</div>
      </main>

      <footer>
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
