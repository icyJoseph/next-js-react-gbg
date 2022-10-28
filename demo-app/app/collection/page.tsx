import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Collection } from "components/Collection";
import { USER_TOKEN, verifyUserToken } from "lib/token";

type Collection = Array<{ value: number; id: number }>;

export const dynamic = "force-dynamic";

export const getCollection = async (token: string): Promise<Collection> => {
  const data = await verifyUserToken(token);

  if ("status" in data) return [];

  const collection = data.pokemonDb
    .split("")
    .map((value, index) => {
      return { value: Number(value), id: index };
    })
    .filter(({ value }) => !Number.isNaN(value));

  return collection;
};

export const PokeCollection = async () => {
  const nextCookies = cookies();
  const token = nextCookies.get(USER_TOKEN);

  if (!token) {
    return redirect("/");
  }

  const collection = await getCollection(token);

  return <Collection collection={collection}></Collection>;
};

export default PokeCollection;
