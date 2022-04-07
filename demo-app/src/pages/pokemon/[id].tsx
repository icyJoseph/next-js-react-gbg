import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { PokeCard } from "components/PokeCard";
import { fetchPokemon } from "lib/pokemon";
import { Pokemon } from "types";

type PokeViewProps = InferGetStaticPropsType<typeof getStaticProps>;

export const PokeView = ({ pokemon }: PokeViewProps) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>{pokemon.name} | Poké Adventure</title>
      </Head>

      <PokeCard pokemon={pokemon} />
    </>
  );
};

const initial = [1, 4, 7];

export const getStaticPaths: GetStaticPaths = () => {
  const paths = initial.map((id) => ({ params: { id: `${id}` } }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{ pokemon: Pokemon }> = async (
  ctx
) => {
  const id = ctx.params?.id;

  const idx = Number(id);

  if (Number.isNaN(idx)) return { notFound: true };

  try {
    const pokemon = await fetchPokemon(idx);

    return {
      props: { pokemon },
      revalidate: 900,
    };
  } catch (e) {
    console.log(e);
    return { notFound: true, revalidate: 500 };
  }
};

export default PokeView;
