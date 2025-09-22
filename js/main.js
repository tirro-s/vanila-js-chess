let activeItem;
const board = [];

function init() {
  const boardNode = document.querySelector('#board');
  boardNode.onclick = handleBoardClick;

  initBoard();
  console.log(board);
  
  for(let i = 0; i < 64; i++) {
    const node = document.createElement("div");
    node.classList.add('cell');

    const piece = board[i]; // {name: 'rook', alliance: 'black'} // null undefined
    if (piece) {
      const black = piece.alliance === 'white' ? '' : 'b';
      const image = document.createElement('img');
      image.src = `images/piaces/${piece.name}${black}.png`;
      node.appendChild(image);
    }

    const row = Math.floor(i / 8);
    if (isEven(i) && isOdd(row) || isOdd(i) && isEven(row)) {
      node.classList.add('black-cell');
    }

    boardNode.appendChild(node);
  }

}

function initBoard() {
  board[0] = {
    name: 'rook',
    alliance: 'black'
  }
  board[1] = {
    name: 'knight',
    alliance: 'black'
  }
  board[2] = {
    name: 'bishop',
    alliance: 'black'
  }
  board[6] = { 
    name: 'knight', 
    alliance: 'black' 
  };

  for(let i = 8; i < 16; i++) {
    board[i] = { 
      name: 'pawn', 
      alliance: 'black' 
    }
  }

  board[57] = {
    name: 'knight',
    alliance: 'white'
  }
  board[58] = {
    name: 'bishop',
    alliance: 'white'
  }
}

function handleBoardClick(event) {
  if (activeItem) {
    movePice(event.target);
  } else {
    selectPiece(event.target);
  }
}

function selectPiece(element) {
  if (element.nodeName === 'IMG') {
    activeItem = {
      item: element,
      parent: element.parentNode,
    }
    console.log(activeItem);
    element.parentNode.classList.add('active');
  }
}

function movePice(element) {
  activeItem.parent.classList.remove('active');
  element.appendChild(activeItem.item);
  activeItem = null;
}

init();