import { useMemo, useState } from "react";

import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { ButtonGroup } from "components/ButtonGroup";
import { CollectionGrid } from "components/CollectionGrid";
import { PokeArticle } from "components/PokeArticle";
import { USER_TOKEN, verifyUserToken } from "lib/token";

const ITEMS_PER_PAGE = 6;

const getAriaProps = ({ page, index }: { page: number; index: number }) =>
  ({
    "aria-label":
      page === index
        ? `Current Page, Page ${index + 1}`
        : `Go to Page ${index + 1}`,
    "aria-current": page === index ? "true" : "false",
  } as const);

export const PokeCollection = ({
  collection,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const totalPages = Math.ceil(collection.length / ITEMS_PER_PAGE);

  const [page, setPage] = useState(0);

  const btnIndexes = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, index) => ({
        index,
      })),
    [totalPages]
  );

  return (
    <>
      <Head>
        <title>Collection | Poké Adventure</title>
      </Head>

      <section>
        <h1>My Collection</h1>

        <ButtonGroup
          as="nav"
          role="navigation"
          aria-label="Collection Navigation"
        >
          {btnIndexes.map(({ index }) => (
            <button
              className={`nes-btn ${page === index ? "is-primary" : ""}`.trim()}
              key={index}
              onClick={() => setPage(index)}
              {...getAriaProps({ page, index: index })}
            >
              {index + 1}
            </button>
          ))}
        </ButtonGroup>

        <CollectionGrid>
          {collection
            .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
            .map(({ value, id }) => (
              <article key={id}>
                <PokeArticle id={id} value={value} />
              </article>
            ))}
        </CollectionGrid>
      </section>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<{
  collection: Array<{ value: number; id: number }>;
}> = async (ctx) => {
  const token = ctx.req.cookies[USER_TOKEN];

  const data = await verifyUserToken(token);

  // if ("status" in data)
  //   return { redirect: { destination: "/", permanent: false } };
  if ("status" in data) return { notFound: true };

  const collection = data.pokemonDb
    .split("")
    .map((value, index) => {
      return { value: Number(value), id: index };
    })
    .filter(({ value }) => !Number.isNaN(value));

  return { props: { collection } };
};

export default PokeCollection;
