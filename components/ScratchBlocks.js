import scratchblocks from "scratchblocks";
import { useEffect, useRef } from "react";

export default function ScratchBlocks({
  blockStyle = "scratch3",
  languages = undefined,
  children,
  inline = false,
  scale = 1,
  ...props
}) {
  const ref = useRef(null);

  useEffect(() => {
    let options = {};
    if (blockStyle !== undefined) options.style = blockStyle;
    if (languages !== undefined) options.languages = languages;
    options.inline = inline;

    const doc = scratchblocks.parse(children, options);
    const svg = scratchblocks.render(doc, options);

    svg.setAttribute("width", svg.getAttribute("width") * scale);

    ref.current.innerHTML = "";
    ref.current.appendChild(svg);
  }, [blockStyle, languages, scale, children, inline]);

  return <div ref={ref} {...props} />;
}
