import type { Metadata } from "next";
import Link from "next/link";

import { ArchitectureDiagram } from "../components/ArchitectureDiagram";
import { Notice } from "../components/Notice";
import { VisuallyHidden } from "../components/VisuallyHidden";
import { SUPPORTED_POKEMON } from "../lib/constants";

export const metadata: Metadata = {
  title: "Home | Poké Adventure",
};

export default function Home() {
  return (
    <>
      <section>
        <h1>Poké Adventure</h1>

        <p>
          Try to capture Pokémon in <Link href="/pokemon/capture">Capture</Link>
          , and view your collection in{" "}
          <Link href="/collection">Collection</Link>.
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
          <Link href="/pokemon/1">/pokemon/[id]</Link>.
        </p>

        <Notice>
          <div className="nes-balloon from-left">
            <p className="nes-text is-primary">
              This site uses a Cookie to save your collection.
            </p>
            <p className="nes-text is-error">
              We just didn&apos;t want to bother with a database!
            </p>

            <p className="nes-text is-error">This site does not track you.</p>
          </div>

          <div>
            <i className="nes-ash"></i>
          </div>
        </Notice>

        <p>
          The source code for this project can be found{" "}
          <a
            href="https://github.com/icyJoseph/next-js-react-gbg"
            target="_blank"
            rel="noopener noreferrer"
          >
            in this repository
          </a>
          .
        </p>
      </section>

      <section>
        <h2 id="about">
          <a href="#about">
            # <VisuallyHidden>About this application</VisuallyHidden>
          </a>{" "}
          <span aria-hidden>About</span>
        </h2>

        <p>Poké Adventure was made to be used as a Next.js demonstration.</p>

        <p>
          The application uses, 4 Pages, 1 Route Handler, and a Server Function
        </p>

        <h3>Pages</h3>
        <ul className="nes-list is-circle">
          <li>
            <Link href="/">Landing Page</Link>: this page, overview and
            documentation
          </li>
          <li>
            <Link href="/pokemon/4">Pokémon view</Link>: displays stats and
            details for a single Pokémon
          </li>
          <li>
            <Link href="/pokemon/capture">Pokémon Capture</Link>: encounter
            wild Pokémon and attempt to catch them
          </li>
          <li>
            <Link href="/collection">Personal Collection</Link>: view all
            Pokémon you have seen and caught
          </li>
        </ul>

        <h3>Route Handlers</h3>
        <ul className="nes-list is-circle">
          <li>
            Wild Pokémon fetch: returns a random Pokémon for the capture
            encounter
          </li>
        </ul>

        <h3>Server Function</h3>
        <ul className="nes-list is-circle">
          <li>
            Poké Capture decider: determines whether a capture attempt succeeds
            based on the Pokémon&apos;s capture rate
          </li>
        </ul>
      </section>

      <section>
        <h2 id="architecture">
          <a href="#architecture">
            #{" "}
            <VisuallyHidden>
              Architecture used in this application
            </VisuallyHidden>
          </a>{" "}
          <span aria-hidden>Architecture</span>
        </h2>

        <h3>At Build time</h3>
        <p>The following routes are statically generated:</p>
        <ul className="nes-list is-circle">
          <li>
            Landing page:{" "}
            <Link href="/">
              <code className="nes-text is-primary">/</code>
            </Link>
          </li>
          <li>
            Capture page:{" "}
            <Link href="/pokemon/capture">
              <code className="nes-text is-primary">/pokemon/capture</code>
            </Link>
          </li>
          <li>
            Bulbasaur:{" "}
            <Link href="/pokemon/1">
              <code className="nes-text is-primary">/pokemon/1</code>
            </Link>
          </li>
          <li>
            Charmander:{" "}
            <Link href="/pokemon/4">
              <code className="nes-text is-primary">/pokemon/4</code>
            </Link>
          </li>
          <li>
            Squirtle:{" "}
            <Link href="/pokemon/7">
              <code className="nes-text is-primary">/pokemon/7</code>
            </Link>
          </li>
        </ul>

        <h3>On Demand</h3>
        <p>The following pages are generated on demand:</p>
        <ul className="nes-list is-circle">
          <li>
            Personal collection:{" "}
            <Link href="/collection">
              <code className="nes-text is-primary">/collection</code>
            </Link>
          </li>
          <li>
            Any Pokémon view not generated at build time:{" "}
            <code className="nes-text is-primary">/pokemon/[id]</code>
          </li>
        </ul>
        <p>
          Additionally, the following are served as serverless functions:
        </p>
        <ul className="nes-list is-circle">
          <li>
            Wild Pokémon Route Handler:{" "}
            <code className="nes-text is-primary">/api/wild</code>
          </li>
          <li>
            Poké Capture Server Function
          </li>
        </ul>

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
          <ArchitectureDiagram />
        </figure>
      </section>
    </>
  );
}
