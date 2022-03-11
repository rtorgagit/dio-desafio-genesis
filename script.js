let order = [];
let clickedOrder = [];
let score = 0;
/**
 * 0 - verde
 * 1 - vermelho
 * 2 - amarelo
 * 3 - azul
 */

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const delay = (n) => new Promise(r => setTimeout(r, n * 1000));


let shuffleOrder = async () => {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    ligthColor(elementColor);
    await delay(1);
  }
}


let ligthColor = async (element) => {
  element.classList.add('selected');
  await delay(0.5);
  element.classList.remove('selected');
  await delay(1);
}



let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] != order[i]) {
      gameOver();
      break;
    }
  }

  if (clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
}

let click = async (color) => {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add('selected');
  await delay(0.2);
  createColorElement(color).classList.remove('selected');
  await delay(0.2);
  checkOrder();

}

let createColorElement = (color) => {
  switch (color) {
    case 0:
      return green;
    case 1:
      return red;
    case 2:
      return yellow;
    case 3:
      return blue;
  }
}

let nextLevel = () => {
  score++;
  shuffleOrder();
}

let gameOver = () => {
  alert(`Pontuação: ${score}\nVocê perdeu!\nClique em OK para iniciar um novo jogo`);
  order = [];
  clickedOrder = [];

  playGame();
}

let playGame = () => {
  alert(`Bem vindo ao Gênesis! Iniciando novo jogo!`);
  score = 0;

  nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();