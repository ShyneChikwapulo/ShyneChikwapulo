const fs = require('fs');

// Picks a random quote from quotes.json and rewrites the quote card in README.md.
function updateQuote() {
  const quotes = require('./quotes.json');
  const { quote, author } = quotes[Math.floor(Math.random() * quotes.length)];

  const cardDesign = `<!--STARTS_HERE_QUOTE_CARD-->
<p align="center">
    <img src="https://readme-daily-quotes.vercel.app/api?author=${encodeURIComponent(author)}&quote=${encodeURIComponent(quote)}&theme=dark&bg_color=071c26&author_color=89cff0&accent_color=3de0d0">
</p>
<!--ENDS_HERE_QUOTE_CARD-->`;

  const readmePath = './README.md';
  const readme = fs.readFileSync(readmePath, 'utf-8');
  const pattern = /<!--STARTS_HERE_QUOTE_CARD-->[\s\S]*?<!--ENDS_HERE_QUOTE_CARD-->/;

  if (!pattern.test(readme)) {
    throw new Error('Quote card markers not found in README.md');
  }

  // A replacer function stops "$" sequences in a quote from being read as special patterns.
  fs.writeFileSync(readmePath, readme.replace(pattern, () => cardDesign));
}

try {
  updateQuote();
} catch (error) {
  console.error('Error updating quote:', error);
  process.exit(1); // make the GitHub Action show as failed instead of silently passing
}