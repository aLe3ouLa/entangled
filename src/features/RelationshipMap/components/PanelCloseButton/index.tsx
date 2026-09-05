import type { ReactNode } from "react";
import { closeButtonStyle } from "./styles";

interface PanelCloseButtonProps {
  onClick: () => void;
  children: ReactNode;
}

export function PanelCloseButton({ onClick, children }: PanelCloseButtonProps) {
  return (
    <button onClick={onClick} style={closeButtonStyle}>
      {children}
    </button>
  );
}
