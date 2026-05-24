import "@reach/dialog/styles.css";

import Dialog from "@reach/dialog";
import NextImage from "next/image";
import Link from "next/link";
import styled from "styled-components";

import { ButtonGroup } from "components/ButtonGroup";
import type { Pokemon } from "types";

const StyledDialog = styled(Dialog)`
  border-color: rgba(0, 0, 0);
  border-style: solid;
  box-sizing: border-box;
  width: min(95vw, 28rem);

  h1 {
    font-size: clamp(1rem, 6vw, 2rem);
    margin: 0 0 1rem;
    word-break: break-word;
  }

  img {
    image-rendering: pixelated;
    max-width: 100%;
    height: auto;
  }
`;

export const CaptureDialog = ({
  captured,
  onDismiss,
}: {
  captured: Pokemon | null;
  onDismiss: VoidFunction;
}) =>
  captured && (
    <StyledDialog
      className="nes-dialog"
      isOpen
      aria-label="Success! You captured a Pokémon"
    >
      <h1 className="nes-text is-success">Nice!</h1>

      <p>
        You captured a{" "}
        <span className="nes-text is-primary capitalize">{captured?.name}</span>
        .
      </p>

      {captured && (
        <NextImage
          src={captured.sprites.frontDefault}
          width={180}
          height={180}
          alt={captured.name}
        />
      )}

      <ButtonGroup gap="1rem">
        <Link href={`/pokemon/${captured?.id}`} className="nes-btn is-primary">
          <span className="capitalize">{captured?.name}</span>
        </Link>

        <button type="button" className="nes-btn is-error" onClick={onDismiss}>
          Catch more
        </button>
      </ButtonGroup>
    </StyledDialog>
  );
