'use strict';

const allLetters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];
const allNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const allSymbols = ['!', '#', '$', '%', '&', '(', ')', '*', '+'];

let amountOfLetters, amountOfNumbers, amountOfSymbols, sumOfAll;
let chosenLetters, chosenNumbers, chosenSymbols;

let letters = document.querySelector('#amount_of_letters');
let numbers = document.querySelector('#amount_of_numbers');
let symbols = document.querySelector('#amount_of_symbols');

const allRandomCharacters = [];

//get all imports and save them in their seperate variables
const getAllInput = function () {
  amountOfLetters = Number(letters.value);
  amountOfNumbers = Number(numbers.value);
  amountOfSymbols = Number(symbols.value);
  sumOfAll =
    Number(amountOfLetters) + Number(amountOfNumbers) + Number(amountOfSymbols);

  letters.value = numbers.value = symbols.value = '';
};

//display a processing message after receiving imports
const displayProcessingMsg = function () {
  const processingMsgDiv = document.querySelector('.processing_msg_div');
  const processingCont = document.querySelector('.processing_cont');
  const resultCont = document.querySelector('.result_cont');
  const processingMsg = document.querySelector('.processing_msg');
  const resultMsg = document.querySelector('.result_msg');
  processingMsgDiv.classList.add('processing_msg_div_show');

  setTimeout(() => {
    processingMsg.textContent = 'Completed 😁';
  }, 1000);
  setTimeout(() => {
    processingCont.style.display = 'none';
    resultMsg.textContent = randomiseFinalCharacters();
  }, 1200);

  setTimeout(() => {
    resultCont.style.display = 'block';
  }, 1300);
};

//generate a random number
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min) + 1) + min;
};

//randomise all elements in the allRandomCharacters variable and push them to the finalRandomCharacters variables
const randomiseFinalCharacters = function () {
  const finalResultCharacters = [];

  for (let i = 0; i < sumOfAll; i++) {
    if (allRandomCharacters.length < 2) {
      finalResultCharacters.splice(
        randomInt(0, finalResultCharacters.length - 1),
        0,
        allRandomCharacters[0]
      );
    } else {
      finalResultCharacters.push(
        allRandomCharacters
          .splice(randomInt(0, allRandomCharacters.length - 1), 1)
          .join('')
      );
    }
  }
  return finalResultCharacters.join('');
};

//get the amount of characters requested and save them in the allRandomCharacters variable
const renderRandomCharacters = function () {
  for (let i = 1; i <= amountOfLetters; i++) {
    allRandomCharacters.push(allLetters[randomInt(0, allLetters.length - 1)]);
  }

  for (let i = 1; i <= amountOfNumbers; i++) {
    allRandomCharacters.push(allNumbers[randomInt(0, allNumbers.length - 1)]);
  }

  for (let i = 1; i <= amountOfSymbols; i++) {
    allRandomCharacters.push(allSymbols[randomInt(0, allSymbols.length - 1)]);
  }
};

//validate input before processing
const validator = function () {
  const errorMsg = document.querySelector('.error_msg');
  if (letters.value === '' || numbers.value === '' || symbols.value === '') {
    errorMsg.textContent = 'Input cannot remain blank!! 😡';
  } else {
    const allInputs = [
      letters.value.split(''),
      numbers.value.split(''),
      symbols.value.split(''),
    ].flat();

    const letrAndSyn = [allLetters, allSymbols].flat();
    const filterAllInputs = allInputs.filter((ele) => letrAndSyn.includes(ele));
    if (filterAllInputs.length < 1) {
      const numAllEle = [];
      [letters.value, numbers.value, symbols.value].forEach((ele) => {
        numAllEle.push(Number(ele));
      });
      const allSum = numAllEle.reduce((bf, af) => bf + af, 0);
      if (allSum > 30) {
        errorMsg.textContent =
          "Sum of all inputs can't be greater then 30!! 👹";
      } else {
        errorMsg.textContent = '';
        return true;
      }
    } else {
      errorMsg.textContent = 'Inputs can contain only numbers!! 👺';
      return false;
    }
  }
};

const submitBtn = document.querySelector('.submit_btn');

//add eventlistener to the submit button to perform all action
submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const validatorResult = validator();

  if (validatorResult) {
    getAllInput();
    renderRandomCharacters();
    displayProcessingMsg();
  }
});

//copy password
const copyBtn = document.querySelector('.copy_btn');

const copyFunction = function () {
  const passwordContent = document.querySelector('.result_msg');
  const copyAlert = document.querySelector('.copy_alert');
  navigator.clipboard.writeText(passwordContent.textContent);
  copyAlert.classList.add('copy_alert_show');
  setTimeout(() => {
    copyAlert.classList.remove('copy_alert_show');
  }, 1000);
};
copyBtn.addEventListener('click', copyFunction);

//regenerate password/ reload page
const newPasswordBtn = document.querySelector('.new_password_btn');

newPasswordBtn.addEventListener('click', () => {
  location.reload();
});
