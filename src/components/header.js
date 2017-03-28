import Head from 'next/head';

export default () => (
    <Head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Awale</title>
        <style>{`
          * {
              box-sizing: border-box;
          }
          body {
              background: #1abc9c;
              display: flex;
              align-items: center;
              font-family: Segoe UI,Helvetica Neue,Helvetica,Arial,sans-serif;
          }
        `}</style>
    </Head>
);
