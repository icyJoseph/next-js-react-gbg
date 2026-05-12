"use client";

import { Suspense, useMemo, useState } from "react";

import Link from "next/link";

import type { Pokemon } from "types";

import { ButtonGroup } from "../../components/ButtonGroup";
import { CollectionGrid } from "../../components/CollectionGrid";
import { PokeArticle } from "../../components/PokeArticle";

const ITEMS_PER_PAGE = 6;

const getAriaProps = ({ page, index }: { page: number; index: number }) =>
  ({
    "aria-label":
      page === index
        ? `Current Page, Page ${index + 1}`
        : `Go to Page ${index + 1}`,
    "aria-current": page === index ? "true" : "false",
  } as const);

type CollectionProps = {
  collection: Array<readonly [number, number, Promise<Pokemon | null>]>;
};

export function CollectionClient({ collection }: CollectionProps) {
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
    <section>
      <h1>My Collection</h1>

      <ButtonGroup as="nav" aria-label="Collection Navigation">
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
        <CollectionGrid>
          {collection
            .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
            .map(([id, value, promise]) => (
              <article key={id}>
                <Suspense fallback={"Loading..."}>
                  <PokeArticle id={id} value={value} promise={promise} />
                </Suspense>
              </article>
            ))}
        </CollectionGrid>
      )}
    </section>
  );
}
