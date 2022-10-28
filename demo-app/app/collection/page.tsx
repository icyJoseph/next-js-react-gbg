import { cookies } from "next/headers";

import { Collection } from "components/Collection";
import { USER_TOKEN, verifyUserToken } from "lib/token";

type CollectionProps = {
  collection: Array<{ value: number; id: number }>;
};

export const getCollection = async (): Promise<CollectionProps> => {
  const nextCookies = cookies();
  const token = nextCookies.get(USER_TOKEN);

  const data = await verifyUserToken(token);

  if ("status" in data) return { collection: [] };

  const collection = data.pokemonDb
    .split("")
    .map((value, index) => {
      return { value: Number(value), id: index };
    })
    .filter(({ value }) => !Number.isNaN(value));

  return { collection };
};

export const PokeCollection = async () => {
  const { collection } = await getCollection();

  return <Collection collection={collection}></Collection>;
};

export default PokeCollection;
