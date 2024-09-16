function knightMoves(startArray, endArray) {
  let path = [startArray];
  let currentArray = [...startArray];
  let completed = false;

  while (!completed) {
    let optionsArray = createOptionsArray([...currentArray]);
    let finalOptionsArray = checkForDuplicates([...optionsArray], [...path]);
    let nextPosition = findBestMove([...finalOptionsArray], [...endArray]);
    path.push([...nextPosition]);
    currentArray = [...nextPosition];
    if (currentArray[0] === endArray[0] && currentArray[1] === endArray[1]) {
      completed = true;
    }
  }

  let message = `You made it in ${path.length - 1} moves! Here's your path:`;

  for (let position of path) {
    message += `\n${position}`;
  }

  return message;
}

function createOptionsArray(array) {
  let originalArray = [...array];
  let finalArray = [];

  array[0] += 2;
  array[1] += 1;
  finalArray.push([...array]);
  array = [...originalArray];

  array[0] -= 2;
  array[1] -= 1;
  finalArray.push([...array]);
  array = [...originalArray];

  array[0] += 2;
  array[1] -= 1;
  finalArray.push([...array]);
  array = [...originalArray];

  array[0] -= 2;
  array[1] += 1;
  finalArray.push([...array]);
  array = [...originalArray];

  array[0] += 1;
  array[1] += 2;
  finalArray.push([...array]);
  array = [...originalArray];

  array[0] -= 1;
  array[1] -= 2;
  finalArray.push([...array]);
  array = [...originalArray];

  array[0] += 1;
  array[1] -= 2;
  finalArray.push([...array]);
  array = [...originalArray];

  array[0] -= 1;
  array[1] += 2;
  finalArray.push([...array]);

  for (let i = 7; i >= 0; i--) {
    if (
      finalArray[i][0] < 0 ||
      finalArray[i][0] > 7 ||
      finalArray[i][1] < 0 ||
      finalArray[i][1] > 7
    ) {
      finalArray.splice(i, 1);
    }
  }

  return finalArray;
}

function checkForDuplicates(mainArray, duplicateArray) {
  for (let i = mainArray.length - 1; i >= 0; i--) {
    for (let j = duplicateArray.length - 1; j >= 0; j--) {
      if (
        mainArray[i][0] === duplicateArray[j][0] &&
        mainArray[i][1] === duplicateArray[j][1]
      ) {
        mainArray.splice(i, 1);
      }
    }
  }

  return mainArray;
}

function findBestMove(array, endArray) {
  let scoresArray = [];

  for (let miniArray of array) {
    let optionScore =
      Math.abs(miniArray[0] - endArray[0]) +
      Math.abs(miniArray[1] - endArray[1]);
    scoresArray.push(optionScore);
  }

  let lowestScore = scoresArray[0];
  let lowestIndex = 0;
  for (let i = 1; i < scoresArray.length; i++) {
    if (scoresArray[i] < lowestScore) {
      lowestScore = scoresArray[i];
      lowestIndex = i;
    }
  }

  return array[lowestIndex];
}

console.log(knightMoves([3, 3], [4, 3]));
