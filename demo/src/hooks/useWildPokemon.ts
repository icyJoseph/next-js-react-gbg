import { useEffect, useState } from "react";

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
      .catch((e) => console.error(e));

    return () => {
      controller.abort();
    };
  }, []);

  return data;
};
