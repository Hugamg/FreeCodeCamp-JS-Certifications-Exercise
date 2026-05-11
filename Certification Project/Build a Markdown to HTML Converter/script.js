const markdownInput = document.getElementById("markdown-input");
const rowHtml = document.getElementById("html-output");
const htmlPreview = document.getElementById("preview");



function convertMarkdown() {
  const input = markdownInput.value;

  //Regex
  const h1Regex = /^(?!##)# (.+)$/gm;
const h2Regex = /^(?!###)## (.+)$/gm;
const h3Regex = /^### (.+)$/gm;
  const firstBold = /\*\*(.+?)\*\*/g;
  const secondBold = /__(.+?)__/g;
  const firstItalic = /\*(.+?)\*/g;
  const secondItalic = /_(.+?)_/g;
  const image = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const link = /\[([^\]]+)\]\(([^)]+)\)/g;
  const blockquote = /^[ \t]*>[ \t]+(.+)$/gm;

  const html = input
    .replace(h3Regex, "<h3>$1</h3>")
    .replace(h2Regex, "<h2>$1</h2>")
    .replace(h1Regex, "<h1>$1</h1>")
    .replace(image, '<img alt="$1" src="$2">')
    .replace(link, '<a href="$2">$1</a>')
    .replace(firstBold, "<strong>$1</strong>")
    .replace(secondBold, "<strong>$1</strong>")
    .replace(firstItalic, "<em>$1</em>")
    .replace(secondItalic, "<em>$1</em>")
    .replace(blockquote, "<blockquote>$1</blockquote>")
    .replace(/\n/g, "");
  
  console.log("OUTPUT:", JSON.stringify(html));
  return html;
}

markdownInput.addEventListener("input", () => {
  const html = convertMarkdown();
  rowHtml.textContent = html;
  htmlPreview.innerHTML = html;
});
