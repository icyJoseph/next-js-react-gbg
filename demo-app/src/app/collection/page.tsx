import type { Metadata } from "next";
import { cookies } from "next/headers";

import {
  CollectionPages,
  type CollectionProps,
} from "app/collection/collection";
import { USER_TOKEN, resolveUserToken } from "lib/token";

export const metadata: Metadata = {
  title: "Collection | Poké Adventure",
};

export const dynamic = "force-dynamic";

const getPokemonCollection = async (
  token: string | undefined
): Promise<CollectionProps> => {
  const data = await resolveUserToken(token);

  // if ("status" in data)
  //   return { redirect: { destination: "/", permanent: false } };
  if ("status" in data) return { collection: [] };

  const collection = data.pokemonDb
    .split("")
    .map((value, index) => {
      return { value: Number(value), id: index };
    })
    .filter(({ value }) => !Number.isNaN(value));

  return { collection };
};

const PokeCollection = async () => {
  const token = cookies().get(USER_TOKEN)?.value;

  const { collection } = await getPokemonCollection(token);

  return (
    <section>
      <h1>My Collection</h1>

      <CollectionPages collection={collection} />
    </section>
  );
};

export default PokeCollection;
