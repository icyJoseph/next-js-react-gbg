import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    html,
    body {
    padding: 0;
    margin: 0;
    font-family: "Press Start 2P", -apple-system, BlinkMacSystemFont, Segoe UI,
        Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
        sans-serif;
    }

    * {
    box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }

    html,
    body,
    #__next {
    height: 100%;
    }

    #__next {
    display: flex;
    flex-flow: column;
    min-height: 100%;
    }

    main {
        display: block;
        overflow-y: auto;
    }

    .capitalize {
        text-transform: capitalize;
    }
`;
