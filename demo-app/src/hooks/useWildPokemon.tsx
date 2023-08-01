import { ReactNode, useEffect, useState } from "react";

import { assert } from "superstruct";

import { Pokemon } from "types";

export const useWildPokemon = () => {
  const [data, setData] = useState<null | Pokemon>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/wild", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        assert(data, Pokemon);

        return setData(data);
      })
      .catch((e) => {
        if (controller.signal.aborted) return;
        console.error(e);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return data;
};

type RenderWithPokemonProps = {
  children: (props: { pokemon: Pokemon | null }) => ReactNode;
};
export const RenderWithPokemon = ({ children }: RenderWithPokemonProps) => {
  const pokemon = useWildPokemon();

  return <>{children({ pokemon })}</>;
};
