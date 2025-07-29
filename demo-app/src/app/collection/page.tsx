import type { Metadata } from "next";
import { cookies } from "next/headers";

import { CollectionClient } from "./collection-client";
import { USER_TOKEN, verifyUserToken } from "../../lib/token";

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

  return <CollectionClient collection={collection} />;
}
