// Define scrabble score values for each letter
const letterValues = {
	"A": 1, "B": 4, "C": 10, "D": 1, "E": 1, "F": 2, "G": 2, "H": 3, "I": 1,
	"J": 4, "K": 2, "L": 1, "M": 2, "N": 1, "O": 2, "P": 4, "Q": 10, "R": 1,
	"S": 1, "T": 1, "U": 4, "V": 4, "W": 8, "X": 10, "Y": 6, "Z": 10, "Æ": 6,
	"Ø": 5, "Å": 4
};

// Define common words list
const commonWords = [];

// Load common words list from file
fetch("wordlist.txt")
	.then(response => response.text())
	.then(text => {
		// Split the text into an array of words
		const words = text.trim().split("\n");

		// Loop through the words and store them in the commonWords array
		for (let i = 0; i < words.length; i++) {
			commonWords[words[i].toLowerCase()] = i / words.length;
		}
	});

function analyzeText() {
	// Get the text from the textarea
	const text = document.getElementById("text").value.trim();

	// Split the text into an array of words and sentences
	const words = text.split(/\s+/);
	const sentences = text.split(/[.?!]+/);

	// Initialize counters and variables
	let numWords = words.length;
	let numLongWords = 0;
	let numSentences = sentences.length - 1; // Last item is an empty string
	let totalLetters = 0;
	let totalWordsInSentence = 0;
	let scrabbleScore = 0;
	let sentenceScore = 0;
	let commonWordsScore = 0;
	let uniqueWords = {};

	// Loop through the words to count long words, calculate total letters, and find unique words
	for (let i = 0; i < numWords; i++) {
		const word = words[i].replace(/[^\wÆØÅ]/g, "").toLowerCase(); // Remove non-alphanumeric characters and convert to lowercase

		if (word.length > 6) {
			numLongWords++;
		}

	
