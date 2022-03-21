import Head from "next/head";
import NextImage from "next/image";
import Link from "next/link";

import { Notice } from "components/Notice";

export const Home = () => {
  return (
    <>
      <Head>
        <title>Home | Poke Adventure</title>
      </Head>

      <section>
        <h1>Poke Adventure</h1>

        <p>
          Try to capture pokemon in{" "}
          <Link href="/pokemon/capture">
            <a>/pokemon/capture</a>
          </Link>
          , and view your collection in{" "}
          <Link href="/collection">
            <a>/collection</a>
          </Link>
          .
        </p>

        <p className="nes-text">
          For a Pokemon to be registered as seen, you must try to capture it, at
          least once.
        </p>

        <p className="nes-text">
          The encounter rate is the same for all Pokemon. The capture rate is
          taken from the Pokemon API.
        </p>

        <p className="nes-text">
          Only the first{" "}
          <span className="nes-text is-primary">251 Pokemon</span> are
          supported. You can view information about any of these at{" "}
          <Link href="/pokemon/1">
            <a>/pokemon/[id]</a>
          </Link>
          .
        </p>

        <Notice>
          <div className="nes-balloon from-left">
            <p className="nes-text">
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

        <p>Poke Adventure page. Made to be used as a Next.js demonstration.</p>

        <p>The application uses 6 routes, 4 pages and 2 API routes.</p>

        <ul className="nes-list">
          <li>
            <h3>Pages</h3>
            <ul className="nes-list is-circle">
              <li>
                Landing page:{" "}
                <Link href="/">
                  <a>/</a>
                </Link>
              </li>
              <li>
                Pokemon view:{" "}
                <Link href="/pokemon/4">
                  <a>/pokemon/[id]</a>
                </Link>
              </li>
              <li>
                Pokemon capture:{" "}
                <Link href="/pokemon/capture">
                  <a>/pokemon/capture</a>
                </Link>
              </li>
              <li>
                Personal collection:{" "}
                <Link href="/collection">
                  <a>/collection</a>
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <h3>API</h3>
            <ul className="nes-list is-circle">
              <li>Wild Pokemon fetch</li>
              <li>Poke Capture decider</li>
            </ul>
          </li>
        </ul>
      </section>

      <section>
        <h2 id="architecture">
          <a href="#architecture">#</a> Architecture
        </h2>

        <h3>At Build time</h3>

        <p>
          At build time the landing page, the capture page, and 3 pokemon views
          are generated.
        </p>

        <h3>On Demand</h3>

        <p>
          The API routes are lambdas, and are generated at runtime, by default.
        </p>

        <p>
          The pokemon collection page, and additional pokemon views are
          generated on demand.
        </p>

        <div>
          <NextImage src="/architecture.png" width="1148" height="851" />
        </div>
      </section>
    </>
  );
};

export default Home;

// landing page
