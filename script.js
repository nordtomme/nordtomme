function analyzeText() {
  // Get the input text
  const text = document.getElementById("text").value;

  // Calculate the number of words
  const wordCount = text.trim().split(/\s+/).length;

  // Calculate the number of long words (more than 5 letters)
  const longWordCount = text.match(/\b\w{6,}\b/g) ? text.match(/\b\w{6,}\b/g).length : 0;

  // Calculate the average word length
  const words = text.match(/\b\w+\b/g);
  const totalWordLength = words ? words.reduce((acc, word) => acc + word.length, 0) : 0;
  const avgWordLength = totalWordLength / wordCount;

  // Calculate the number of sentences
  const sentenceCount = text.split(/[.?!]/g).filter(Boolean).length;

  // Calculate the average number of words in each sentence
  const wordsPerSentence = wordCount / sentenceCount;

  // Calculate the average number of characters in each sentence
  const charactersPerSentence = totalWordLength / sentenceCount;

  // Calculate the Lesbarhetsindeks
  const lesbarhetsindeks = ((wordCount / sentenceCount) + (longWordCount * 100 / wordCount)) * (1 / avgWordLength);

  // Display the results
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <p>Number of words: ${wordCount}</p>
    <p>Number of long words (more than 6 letters): ${longWordCount}</p>
    <p>Average word length: ${avgWordLength.toFixed(2)} characters</p>
    <p>Number of sentences: ${sentenceCount}</p>
    <p>Average number of words in each sentence: ${wordsPerSentence.toFixed(2)}</p>
    <p>Average number of characters in each sentence: ${charactersPerSentence.toFixed(2)} characters</p>
    <p>Lesbarhetsindeks: ${lesbarhetsindeks.toFixed(2)}</p>
  `;
}