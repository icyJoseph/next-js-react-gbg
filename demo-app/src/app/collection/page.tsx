import type { Metadata } from "next";
import { cookies } from "next/headers";

import { fetchPokemon } from "lib/pokemon";
import { USER_TOKEN, verifyUserToken } from "lib/token";

import { CollectionClient } from "./collection-client";

export const metadata: Metadata = {
  title: "Collection | Poké Adventure",
};

async function getCollection() {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_TOKEN)?.value;

  const data = await verifyUserToken(token);

  if ("status" in data) {
    return [];
  }

  const collection = data.pokemonDb
    .split("")
    .map((value, index) => {
      return { value: Number(value), id: index };
    })
    .filter(({ value }) => !Number.isNaN(value));

  return collection;
}

export default async function CollectionPage() {
  const collection = await getCollection();

  const promises = collection.map(
    ({ id, value }) => [id, value, fetchPokemon(id)] as const
  );

  return <CollectionClient collection={promises} />;
}
