import * as Dialog from "@radix-ui/react-dialog";
import NextLegacyImage from "next/legacy/image";
import Link from "next/link";

import { ButtonGroup } from "components/ButtonGroup";
import capture from "design-system/capture.module.css";
import type { Pokemon } from "types";

export const CaptureDialog = ({
  captured,
  onDismiss,
}: {
  captured: Pokemon | null;
  onDismiss: () => void;
}) => (
  <Dialog.Root open>
    <Dialog.Portal aria-label="Success! You captured a Pokémon">
      <Dialog.Overlay className={capture.DialogOverlay} />
      <Dialog.Content className={`${capture.DialogContent} nes-dialog`}>
        <Dialog.Title className="nes-text is-success">Nice!</Dialog.Title>

        <Dialog.Description>
          You captured{" "}
          <span className="nes-text is-primary capitalize">
            {captured?.name}
          </span>
          .
          {captured && (
            <NextLegacyImage
              src={captured.sprites.frontDefault}
              width="180"
              height="180"
              alt={captured.name}
            />
          )}
          <ButtonGroup gap="1rem">
            <Link
              href={`/pokemon/${captured?.id}`}
              className="nes-btn is-primary"
            >
              <span className="capitalize">{captured?.name}</span>
            </Link>

            <button className="nes-btn is-error" onClick={onDismiss}>
              Catch more
            </button>
          </ButtonGroup>
        </Dialog.Description>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
