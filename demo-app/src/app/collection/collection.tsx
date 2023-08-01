"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { ButtonGroup } from "components/ButtonGroup";
import { PokeArticle } from "components/PokeArticle";
import collectionStyles from "design-system/collection.module.css";

export type CollectionProps = {
  collection: Array<{ value: number; id: number }>;
};

const ITEMS_PER_PAGE = 6;

const getAriaProps = ({ page, index }: { page: number; index: number }) =>
  ({
    "aria-label":
      page === index
        ? `Current Page, Page ${index + 1}`
        : `Go to Page ${index + 1}`,
    "aria-current": page === index ? "true" : "false",
  } as const);

export const CollectionPages = ({ collection }: CollectionProps) => {
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

      {collection.length === 0 ? (
        <section>
          <h1>Empty Collection</h1>

          <p>
            You collection is empty! Try to{" "}
            <Link href="/pokemon/capture">capture</Link> some Pokémon!
          </p>
        </section>
      ) : (
        <div className={collectionStyles.grid}>
          {collection
            .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
            .map(({ value, id }) => (
              <article key={id}>
                <PokeArticle id={id} value={value} />
              </article>
            ))}
        </div>
      )}
    </>
  );
};
