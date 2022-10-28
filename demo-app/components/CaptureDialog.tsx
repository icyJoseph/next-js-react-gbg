import "@reach/dialog/styles.css";

import Dialog from "@reach/dialog";
import NextImage from "next/legacy/image";
import Link from "next/link";

import dialog from "design-system/Dialog.module.css";
import group from "design-system/Group.module.css";

import type { Pokemon } from "../types";

export const CaptureDialog = ({
  captured,
  onDismiss,
}: {
  captured: Pokemon | null;
  onDismiss: () => void;
}) => (
  <Dialog
    className={`nes-dialog ${dialog.capture}`}
    isOpen
    aria-label="Success! You captured a Pokémon"
  >
    <h1 className="nes-text is-success">Nice!</h1>

    <p>
      You captured a{" "}
      <span className="nes-text is-primary capitalize">{captured?.name}</span>.
    </p>

    {captured && (
      <NextImage
        src={captured.sprites.frontDefault}
        width="180"
        height="180"
        alt={captured.name}
      />
    )}

    <div className={group.button} style={{ "--button-gap": "1rem" }}>
      <Link href={`/pokemon/${captured?.id}`} className="nes-btn is-primary">
        <span className="capitalize">{captured?.name}</span>
      </Link>

      <button className="nes-btn is-error" onClick={onDismiss}>
        Catch more
      </button>
    </div>
  </Dialog>
);
