"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

import { PokeArticle } from "components/PokeArticle";
import app from "design-system/App.module.css";
import collectionStyle from "design-system/Collection.module.css";
import group from "design-system/Group.module.css";

const ITEMS_PER_PAGE = 6;

export const dynamic = "force-dynamic";

const getAriaProps = ({ page, index }: { page: number; index: number }) =>
  ({
    "aria-label":
      page === index
        ? `Current Page, Page ${index + 1}`
        : `Go to Page ${index + 1}`,
    "aria-current": page === index ? "true" : "false",
  } as const);

export const Collection = ({
  collection,
}: {
  collection: Array<{ value: number; id: number }>;
}) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(collection.length / ITEMS_PER_PAGE);

  const buttons = useMemo(
    () =>
      Array.from({ length: totalPages }, (_, index) => ({
        index,
      })),
    [totalPages]
  );

  if (collection.length === 0) {
    return (
      <section className={app.section}>
        <h1>Empty Collection</h1>

        <p>
          You collection is empty! Try to{" "}
          <Link href="/pokemon/capture">capture</Link> some Pokémon!
        </p>
      </section>
    );
  }

  return (
    <section className={app.section}>
      <h1>My Collection</h1>

      <nav className={group.buttons} aria-label="Collection Navigation">
        {buttons.map(({ index }) => (
          <button
            className={`nes-btn ${page === index ? "is-primary" : ""}`.trim()}
            key={index}
            onClick={() => setPage(index)}
            {...getAriaProps({ page, index: index })}
          >
            {index + 1}
          </button>
        ))}
      </nav>

      <div className={collectionStyle.grid}>
        {collection
          .slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE)
          .map(({ value, id }) => (
            <article key={id}>
              <PokeArticle id={id} value={value} />
            </article>
          ))}
      </div>
    </section>
  );
};