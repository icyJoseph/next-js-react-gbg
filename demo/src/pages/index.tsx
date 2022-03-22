import Head from "next/head";
import NextImage from "next/image";
import Link from "next/link";

import { Notice } from "components/Notice";
import { SUPPORTED_POKEMON } from "lib/constants";

export const Home = () => {
  return (
    <>
      <Head>
        <title>Home | Poké Adventure</title>
      </Head>

      <section>
        <h1>Poké Adventure</h1>

        <p>
          Try to capture Pokémon in{" "}
          <Link href="/pokemon/capture">
            <a>Capture</a>
          </Link>
          , and view your collection in{" "}
          <Link href="/collection">
            <a>Collection</a>
          </Link>
          .
        </p>

        <Notice>
          <div className="nes-balloon from-left">
            <p className="nes-text is-primary">
              For a Pokémon to be registered as seen, you must try to capture
              it, at least once.
            </p>
          </div>

          <div>
            <i className="nes-pokeball"></i>
          </div>
        </Notice>

        <p className="nes-text">
          The encounter rate is the same for all Pokémon. The capture rate is
          taken from the Pokémon API.
        </p>

        <p className="nes-text">
          You can only capture the first{" "}
          <span className="nes-text is-primary">
            {SUPPORTED_POKEMON} Pokémon
          </span>
          . However, you can view information for any Pokémon at{" "}
          <Link href="/pokemon/1">
            <a>/pokemon/[id]</a>
          </Link>
          .
        </p>

        <Notice>
          <div className="nes-balloon from-left">
            <p className="nes-text is-primary">
              This site uses a Cookie to save your collection.
            </p>
            <p className="nes-text is-error">Terrible and lazy decision!</p>

            <p className="nes-text is-error">This site does not track you.</p>
          </div>

          <div>
            <i className="nes-ash"></i>
          </div>
        </Notice>

        <p>
          The source code for this repository can be found{" "}
          <a href="" target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      </section>

      <section>
        <h2 id="about">
          <a href="#about">#</a> About
        </h2>

        <p>Poké Adventure was made to be used as a Next.js demonstration.</p>

        <p>The application uses 6 routes, 4 pages and 2 API routes.</p>

        <h3>Pages</h3>
        <ul className="nes-list is-circle">
          <li>
            <Link href="/">
              <a>Landing Page</a>
            </Link>
          </li>
          <li>
            <Link href="/pokemon/4">
              <a>Pokémon view</a>
            </Link>
          </li>
          <li>
            <Link href="/pokemon/capture">
              <a>Pokémon Capture</a>
            </Link>
          </li>
          <li>
            <Link href="/collection">
              <a>Personal Collection</a>
            </Link>
          </li>
        </ul>

        <h3>API</h3>
        <ul className="nes-list is-circle">
          <li>Wild Pokémon fetch</li>
          <li>Poké Capture decider</li>
        </ul>
      </section>

      <section>
        <h2 id="architecture">
          <a href="#architecture">#</a> Architecture
        </h2>
        <h3>At Build time</h3>
        <p>
          At build time the landing page, the capture page, and 3 Pokémon views
          are generated.
        </p>
        <h3>On Demand</h3>
        <p>
          The API routes are lambdas, and are generated at runtime, by default.
        </p>
        <p>
          The Pokémon collection page, and additional Pokémon views are
          generated on demand.
        </p>

        <h3>Tech Stack</h3>

        <p>
          Next.js application, built with{" "}
          <code className="nes-text is-primary">next build</code> and activated
          using <code className="nes-text is-primary">next start</code> command.
        </p>

        <p>
          The data for Pokémon comes from the{" "}
          <a
            href="https://pokeapi.co/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PokéAPI
          </a>
          .
        </p>

        <figure className="nes-container with-title">
          <figcaption className="title">Application Data Flow</figcaption>
          <NextImage src="/architecture.png" width="1148" height="851" />
        </figure>
      </section>
    </>
  );
};

export default Home;
