function analyzeText() {
  let text = document.getElementById("text").value;

  // Remove empty lines and trailing white spaces
  text = text.replace(/^\s*$(?:\r\n?|\n)/gm, '').trim();

  // Count characters (including spaces)
  let charCount = text.length;

  // Count words
  let wordCount = text.split(/\s+/).length;

  // Count sentences
  let sentenceCount = text.split(/[.?!]+/).length - 1;

  // Count paragraphs
  let paragraphCount = text.split(/\n\n+/).length;

  // Calculate Lesbarhetsindeks
  let words = text.match(/\b\w+\b/g);
  let longWords = words.filter(word => word.length >= 7).length;
  let lesbarhetsindeks = (wordCount / sentenceCount) + ((longWords * 100) / wordCount);

  // Calculate OVIX score
  let uniqueWords = new Set(words);
  let ovix = Math.log(wordCount) / Math.log(2 - (Math.log(uniqueWords.size) / Math.log(wordCount)));

  // Calculate average word score
  let letterValues = {
    "b": 4,
    "c": 10,
    "f": 2,
    "g": 2,
    "h": 3,
    "j": 4,
    "k": 2,
    "m": 2,
    "o": 2,
    "p": 4,
    "q": 10,
    "u": 4,
    "v": 4,
    "w": 8,
    "x": 10,
    "y": 6,
    "z": 10,
    "æ": 6,
    "ø": 5,
    "å": 4
  };

  let totalWordScore = 0;
  words.forEach(word => {
    let wordScore = 0;
    for (let i = 0; i < word.length; i++) {
      let letterValue = letterValues[word[i].toLowerCase()] || 1;
      wordScore += letterValue;
    }
    totalWordScore += wordScore;
  });
  let averageWordScore = totalWordScore / wordCount;

  let sentences = text.match(/[^.!?]+[.!?]/g);
  let totalSentenceScore = 0;
  sentences.forEach(sentence => {
    let sentenceScore = 0;
    for (let i = 0; i < sentence.length; i++) {
      let letterValue = letterValues[sentence[i].toLowerCase()] || 1;
      sentenceScore += letterValue;
    }
    totalSentenceScore += sentenceScore;
  });
  let averageSentenceScore = totalSentenceScore / sentenceCount;
  
  // Display results
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <p>Teksten best&aring;r av<br />
  	${charCount} tegn<br />
  	${wordCount} ord<br />
    ${sentenceCount} setninger og<br />
    ${paragraphCount} avsnitt.</p>
    <p>Gj.sn. Scrabble Score pr. ord er ${averageWordScore.toFixed(2)}</p>
    <p>Gj.sn. Scrabble Score pr. setning er ${averageSentenceScore.toFixed(2)}</p>
    <p>Lesbarhet (LIKS): ${lesbarhetsindeks.toFixed(2)}</p>
    <p>Ordvariasjon (OVIX): ${ovix.toFixed(2)}</p>
  `;
  
// Load the word list from file
 fetch('wordlist.txt')
   .then(response => response.text())
   .then(wordlist => {
     // Split the text into words
     // const inputText = document.getElementById('input-text').value;
     // const words = inputText.split(/\W+/);

     // Calculate the percentile rank for each word
     const ranks = words.map(word => {
       const rank = wordlist.indexOf(word.toLowerCase());
       return rank >= 0 ? rank / 10000 : 1;
     });

     // Calculate the average percentile rank
     const sum = ranks.reduce((acc, rank) => acc + rank, 0);
     const average = sum / ranks.length;

     // Display the result
     alert(`Common Words Score: ${average}`);
   });

}
