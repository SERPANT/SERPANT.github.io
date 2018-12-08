let probPos = 0;
let probNeg = 0;
let negCount = 0;
let posCount = 0;
let wordProb = {};
let wordsInPos = 0;
let wordsInNeg = 0;
let wordCount = {};

/**
 * Traning Data
 */
let traningData = [
  { discription: "not good", type: "-" },
  { discription: "bad movie", type: "-" },
  { discription: "poor acting", type: "-" },
  { discription: "amazing movie", type: "+" },
  { discription: "a great movie", type: "+" },
  { discription: "it was boring", type: "-" },
  { discription: "hate the songs", type: "-" },
  { discription: "loved the cast", type: "+" },
  { discription: "one of the best", type: "+" },
  { discription: "loved the songs", type: "+" },
  { discription: "loved the story", type: "+" },
  { discription: "blockboster hit", type: "+" },
  { discription: "worst movie ever", type: "-" },
  { discription: "the movie was bad", type: "-" },
  { discription: "good in every way", type: "+" },
  { discription: "i hated the movie", type: "-" },
  { discription: "i loved the movie", type: "+" },
  { discription: "i liked the story", type: "+" },
  { discription: "story was awesome", type: "+" },
  { discription: "movie was awesome", type: "+" },
  { discription: "i hated the story", type: "-" },
  { discription: "bad story writting", type: "-" },
  { discription: "i loved that movie", type: "+" },
  { discription: "bad job by the cast", type: "-" },
  { discription: "just wasted my time", type: "-" },
  { discription: "totally disappointed", type: "-" },
  { discription: "disappointing for me", type: "-" },
  { discription: "good job by the cast", type: "+" },
  { discription: "entertaining as hell", type: "+" },
  { discription: "just an amazing movie", type: "+" },
  { discription: "the songs were amazing", type: "+" },
  { discription: "the movie had no story", type: "-" },
  { discription: "not so good in my view", type: "-" },
  { discription: "best movie i ever watched", type: "+" },
  { discription: "i fell asleap watching it", type: "-" },
  { discription: "overall the movie sucked ", type: "-" },
  { discription: "better than any other movie", type: "+" },
  { discription: "great acting so good overall", type: "+" },
  { discription: "never even blinked watching it", type: "+" },
  { discription: "worst movie i have ever watched", type: "-" },
  { discription: "the direction of the movie was bad", type: "-" },
  { discription: "acting was a complete disappointment", type: "-" },
  { discription: "the direction of the movie was amazing", type: "+" }
];

/**
 * Adding training Data to the List
 */
function addData() {
  let typeBox = document.getElementsByClassName("type-box")[0];
  let sentenceBox = document.getElementsByClassName("sentence-box")[0];
  traningData.push({ discription: sentenceBox.value, type: typeBox.value });

  reRender();
  trainData();
}

/**
 * Render the training Data
 */
function reRender() {
  let trainingDataList = document.getElementsByClassName(
    "traning-data-list"
  )[0];

  let htmlElements = convertToHtmlList();
  trainingDataList.innerHTML = htmlElements;
}

/**
 * convert list item to html
 */
function convertToHtmlList() {
  let htmlElements = traningData
    .map(singleDataObject => {
      let { discription, type } = singleDataObject;
      return `<li class="data">
    <div>Sentence:  ${discription} <div>
     <div> Type: ${type}<div>
     <hr>
     </li>`;
    })
    .reduce((acc, val) => {
      return acc + val;
    });

  return htmlElements;
}

/**
 * Training the model with training data
 */
function trainData() {
  createCountTable();
  calProbOfEachType();
  calProbOfWord();
}

/**
 * calculate probabily of each word given positive or negetive condition
 */
function calProbOfWord() {
  let vocabSize = Object.keys(wordCount).length;

  for (word of Object.keys(wordCount)) {
    let count = wordCount[word];
    let wordPosCount = count["+"];
    let wordNegCount = count["-"];

    let wordPosProb = (wordPosCount + 1) / (wordPosCount + vocabSize);
    let wordNegProb = (wordNegCount + 1) / (negCount + vocabSize);
    // let wordPosProb = (wordPosCount + 1) / probPos;
    // let wordNegProb = (wordNegCount + 1) / probNeg;
    wordProb[word] = { "+": wordPosProb, "-": wordNegProb };
  }
}

/**
 * classify a given sentence
 */
function classifier() {
  let sentenceBox = document.getElementsByClassName("sentence-box")[0];
  let sentence = sentenceBox.value;
  let wordArray = sentence.split(" ");

  let positiveProb = 1;
  let negetiveProb = 1;

  for (word of wordArray) {
    let wordProbObject = wordProb[word];
    positiveProb = positiveProb * probPos * wordProbObject["+"];
    negetiveProb = negetiveProb * probNeg * wordProbObject["-"];
  }

  displayResult(positiveProb, negetiveProb);
}

/**
 * Display output
 * @param {*} positiveProb : probability of being +
 * @param {*} negetiveProb : probability of being -
 */
function displayResult(positiveProb, negetiveProb) {
  let classifierResult = document.getElementsByClassName(
    "classifier-result"
  )[0];

  if (positiveProb > negetiveProb) {
    classifierResult.innerHTML = "<h3 class='good'>Good review</h3>";
  } else {
    classifierResult.innerHTML = "<h3 class='bad'>Bad review</h3>";
  }
}

/**
 * calculating the probability of situation + or -
 */
function calProbOfEachType() {
  let totalData = traningData.length;
  probPos = posCount / totalData;
  probNeg = negCount / totalData;
}

/**
 * counting each element and creating a count table
 */
function createCountTable() {
  for (let singleDataObject of traningData) {
    let { discription, type } = singleDataObject;
    let wordArray = discription.split(" ");
    for (let word of wordArray) {
      if (wordCount[word] === undefined) {
        if (type === "+") {
          wordCount[word] = { "+": 1, "-": 0 };
          wordsInPos++;
        } else {
          wordCount[word] = { "+": 0, "-": 1 };
          wordsInNeg++;
        }
      } else {
        if (type === "+") {
          let wordObject = wordCount[word];
          wordsInPos++;
          wordObject["+"]++;
        } else {
          let wordObject = wordCount[word];
          wordsInNeg++;
          wordObject["-"]++;
        }
      }
    }
    if (type === "+") {
      posCount++;
    } else {
      negCount++;
    }
  }
}

/**
 * Starting the function
 */
function start() {
  reRender();
  trainData();
}
