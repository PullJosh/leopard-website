import palettes from "../lib/palettes";

export default function PaletteHeader({ children }: { children: string }) {
  const palette = palettes.find(palette => palette.name === children);
  return (
    <h2
      className="palette-header"
      id={children.toLowerCase().replace(/ /g, "-")}
      style={{ color: palette ? `rgb(${palette.color.join()})` : "black" }}
    >
      {children}
      <style jsx>
        {`
          .palette-header {
            font-size: 48px;
            font-weight: 700;
            margin-top: 32px;
          }
        `}
      </style>
    </h2>
  );
}
