// Define the scrabble values for each letter
const letterValues = {
  'A': 1,
  'B': 4,
  'C': 10,
  'D': 1,
  'E': 1,
  'F': 2,
  'G': 2,
  'H': 3,
  'I': 1,
  'J': 4,
  'K': 2,
  'L': 1,
  'M': 2,
  'N': 1,
  'O': 2,
  'P': 4,
  'Q': 10,
  'R': 1,
  'S': 1,
  'T': 1,
  'U': 4,
  'V': 4,
  'W': 8,
  'X': 10,
  'Y': 6,
  'Z': 10,
  'Æ': 6,
  'Ø': 5,
  'Å': 4
};

// Define a function to calculate the scrabble score of a word
function getWordScore(word) {
  let score = 0;
  word = word.toUpperCase();
  for (let i = 0; i < word.length; i++) {
    score += letterValues[word[i]];
  }
  return score;
}

// Define a function to count the number of words in a text
function countWords(text) {
  const words = text.trim().split(/\s+/);
  return words.length;
}

// Define a function to count the number of words in a text with more than six letters
function countLongWords(text) {
  const words = text.trim().split(/\s+/);
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].length > 6) {
      count++;
    }
  }
  return count;
}

// Define a function to calculate the average number of letters in each word
function getAverageWordLength(text) {
  const words = text.trim().split(/\s+/);
  let totalLength = 0;
  for (let i = 0; i < words.length; i++) {
    totalLength += words[i].length;
  }
  return totalLength / words.length;
}

// Define a function to count the number of sentences in a text
function countSentences(text) {
  const sentences = text.trim().split(/[.?!]/);
  return sentences.length;
}

// Define a function to calculate the average number of words in each sentence
function getAverageWordsPerSentence(text) {
const sentences = text.trim().split(/[.?!]/);
let totalWords = 0;
for (let i = 0; i < sentences.length; i++) {
const words = sentences[i].trim().split(/\s+/);
totalWords += words.length;
}
return totalWords / sentences.length;
}

// Define a function to calculate the Lesbarhetsindeks of a text
function getLesbarhetsindeks(text) {
const words = countWords(text);
const sentences = countSentences(text);
const longWords = countLongWords(text);
return (words / sentences) + (100 * longWords / words);
}

// Define a function to calculate the average scrabble score for words in a text
function getAverageWordScore(text) {
const words = text.trim().split(/\s+/);
let totalScore = 0;
for (let i = 0; i < words.length; i++) {
totalScore += getWordScore(words[i]);
}
return totalScore / words.length;
}

// Define a function to calculate the average scrabble score of sentences in a text
function getAverageSentenceScore(text) {
const sentences = text.trim().split(/[.?!]/);
let totalScore = 0;
for (let i = 0; i < sentences.length; i++) {
const words = sentences[i].trim().split(/\s+/);
let sentenceScore = 0;
for (let j = 0; j < words.length; j++) {
sentenceScore += getWordScore(words[j]);
}
totalScore += sentenceScore / words.length;
}
return totalScore / sentences.length;
}

// Define a function to analyze the text and display the results on the webpage
function analyzeText() {
const inputText = document.getElementById('inputText').value;
const words = countWords(inputText);
const longWords = countLongWords(inputText);
const averageWordLength = getAverageWordLength(inputText);
const sentences = countSentences(inputText);
const averageWordsPerSentence = getAverageWordsPerSentence(inputText);
const lesbarhetsindeks = getLesbarhetsindeks(inputText);
const averageWordScore = getAverageWordScore(inputText);
const averageSentenceScore = getAverageSentenceScore(inputText);

// Display the results on the webpage
const resultsDiv = document.getElementById('results');
resultsDiv.innerHTML = <p>Words: ${words}</p> <p>Long words (> 6 letters): ${longWords}</p> <p>Average word length: ${averageWordLength.toFixed(2)}</p> <p>Sentences: ${sentences}</p> <p>Average words per sentence: ${averageWordsPerSentence.toFixed(2)}</p> <p>Lesbarhetsindeks: ${lesbarhetsindeks.toFixed(2)}</p> <p>Average word score: ${averageWordScore.toFixed(2)}</p> <p>Average sentence score: ${averageSentenceScore.toFixed(2)}</p> ;

// Highlight the top 5% words with highest scrabble score

/*const wordsArray = inputText.trim().split(/\s+/);
const sortedWords = wordsArray.slice().sort((a, b) => getWordScore(b) - getWordScore(a));
const topWords = sortedWords.slice(0, Math.ceil(wordsArray.length * 0.05));
const highlightedTextDiv = document.getElementById('highlightedText');
let highlighted*/

function highlightSentences(text) {
  let sentences = text.match(/[^.!?]+[.!?]+/g);
  let sentenceScores = sentences.map(sentence => scrabbleScore(sentence));
  let maxIndices = getMaxIndices(sentenceScores, 2);
  let highlightedText = '';
  sentences.forEach((sentence, index) => {
    if (maxIndices.includes(index)) {
      highlightedText += `<span class="highlight">${sentence}</span>`;
    } else {
      highlightedText += sentence;
    }
  });
  return highlightedText;
}

function getMaxIndices(arr, count) {
  let indices = [];
  let sortedArr = arr.slice().sort((a, b) => b - a);
  for (let i = 0; i < count; i++) {
    let index = arr.indexOf(sortedArr[i]);
    while (indices.includes(index)) {
      index = arr.indexOf(sortedArr[i], index + 1);
    }
    indices.push(index);
  }
  return indices;
}