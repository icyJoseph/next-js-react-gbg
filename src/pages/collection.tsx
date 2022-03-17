import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { PokeArticle } from "components/PokeArticle";
import { USER_TOKEN, verifyUserCookie } from "lib/cookie";

export const PokeCollection = ({
  collection,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Collection</title>
      </Head>

      <section>
        <h1>My Collection</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1rem",
            maxWidth: "80%",
            margin: "0 auto",
          }}
        >
          {collection.map(({ value, index }) => (
            <article key={index}>
              <PokeArticle id={index} value={value} />
            </article>
          ))}
        </div>
      </section>
    </>
  );
};

// getServerSideProps

export const getServerSideProps: GetServerSideProps<{
  collection: Array<{ value: number; index: number }>;
}> = async (ctx) => {
  const token = ctx.req.cookies[USER_TOKEN];

  const data = await verifyUserCookie(token);

  if ("status" in data) return { notFound: true }; // or redirect back to '/'

  const collection = data.pokemonDb
    .split("")
    .map((value, index) => {
      return { value: Number(value), index };
    })
    .filter(({ value }) => !Number.isNaN(value));

  return { props: { collection } };
};

export default PokeCollection;
