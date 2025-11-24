export function splitHTMLIntoBlocks(html) {
  if (!html || typeof html !== "string") return [];

  // Normalize newlines
  html = html.replace(/\r\n|\r/g, "\n");

  // Define block-level tags
  const blockTags = [
    "p",
    "div",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "ul", "ol", "li",
    "blockquote",
    "section",
    "article"
  ];

  // Regex for splitting at the END of a block element
  const regex = new RegExp(`</(${blockTags.join("|")})>`, "gi");

  // Use split but KEEP the closing tag using lookbehind simulation
  const parts = html
    .split(regex)
    .map((part, idx, arr) => {
      // If the part is a closing tag name, attach </tag> to previous block
      if (blockTags.includes(part)) {
        return `</${part}>`;
      }
      return part;
    });

  // Merge correctly to form full blocks
  let blocks = [];
  let current = "";

  for (let i = 0; i < parts.length; i++) {
    current += parts[i];

    // If block ends with </tag>, push it
    if (/<\/(p|div|h1|h2|h3|h4|h5|h6|li|ul|ol|blockquote|section|article)>$/i.test(current.trim())) {
      blocks.push(current.trim());
      current = "";
    }
  }

  // If leftover HTML
  if (current.trim() !== "") {
    blocks.push(current.trim());
  }

  return blocks.filter(Boolean);
}
