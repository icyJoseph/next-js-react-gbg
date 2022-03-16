import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import NextImage from "next/image";

import { fetchPokemon } from "lib/pokemon";
import { Pokemon } from "types";

type PokeViewProps = InferGetStaticPropsType<typeof getStaticProps>;

export const PokeView = ({ pokemon }: PokeViewProps) => {
  const router = useRouter();

  if (router.isFallback) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>{pokemon.name}</title>
      </Head>

      <div className="max-width-wrapper pokecard-container">
        <section className="nes-container with-title pokecard">
          <header className="title">
            <h1>{pokemon.name}</h1>

            <p>#{pokemon.id}</p>
          </header>

          <NextImage
            className="pokemon-img"
            src={pokemon.sprites.frontDefault}
            width="240"
            height="240"
            alt={pokemon.name}
          />

          <div>
            <pre>
              {(pokemon.height * 0.1).toFixed(2)} m -{" "}
              {(pokemon.weight * 0.1).toFixed(2)} kg
            </pre>
          </div>

          <div>
            <pre>{pokemon.description}</pre>
          </div>
        </section>
      </div>
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
