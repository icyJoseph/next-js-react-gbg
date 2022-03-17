import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { PokeArticle } from "components/PokeArticle";
import { USER_TOKEN, verifyUserCookie } from "lib/cookie";
import { useState } from "react";

const ITEMS_PER_PAGE = 8;

export const PokeCollection = ({
  collection,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const totalPages = Math.ceil(collection.length / ITEMS_PER_PAGE);

  const [page, setPage] = useState(0);

  return (
    <>
      <Head>
        <title>Collection | Poke Adventure</title>
      </Head>

      <section>
        <h1>My Collection</h1>

        <nav role="navigation" aria-label="Collection Navigation">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              aria-label={
                page === i
                  ? `Current Page, Page ${i + 1}`
                  : `Go to Page ${i + 1}`
              }
              aria-current={page === i ? "true" : "false"}
            >
              {i + 1}
            </button>
          ))}
        </nav>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
            gap: "1rem",
            margin: "0 auto",
          }}
        >
          {collection
            .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
            .map(({ value, id }) => (
              <article key={id}>
                <PokeArticle id={id} value={value} />
              </article>
            ))}
        </div>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  collection: Array<{ value: number; id: number }>;
}> = async (ctx) => {
  const token = ctx.req.cookies[USER_TOKEN];

  const data = await verifyUserCookie(token);

  if ("status" in data) return { notFound: true }; // or redirect back to '/'

  const collection = data.pokemonDb
    .split("")
    .map((value, index) => {
      return { value: Number(value), id: index };
    })
    .filter(({ value }) => !Number.isNaN(value));

  return { props: { collection } };
};

export default PokeCollection;
