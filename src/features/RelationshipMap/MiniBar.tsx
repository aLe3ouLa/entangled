import { theme } from "../../lib/theme";

interface MiniBarProps {
  label: string;
  value: number;
}

export const MiniBar = ({ label, value }: MiniBarProps) => {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}
    >
      <span style={{ width: 56, fontSize: 10, color: theme.textMuted }}>
        {label}
      </span>
      <div
        style={{
          flex: 1,
          height: 4,
          background: "rgba(255,255,255,0.08)",
          borderRadius: 2,
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${theme.accent}, #ffb3d9)`,
            borderRadius: 2,
          }}
        />
      </div>
    </div>
  );
};
