let activeItem;
const board = [];

function init() {
  const boardRef = document.querySelector('#board');
  boardRef.onclick = handleBoardClick;

  initBoard();
  
  for(let i = 0; i < 64; i++) {
    const node = document.createElement("div");
    node.classList.add('cell');
    node.setAttribute('cell-id', i);


    const piece = board[i];
    if (piece) {
      const image = createPiece(piece);
      node.appendChild(image);
    }

    const row = Math.floor(i / 8);
    if (isEven(i) && isOdd(row) || isOdd(i) && isEven(row)) {
      node.classList.add('black-cell');
    }

    boardRef.appendChild(node);
  }

  console.log(board);

}

function createPiece(piece) {
  const black = piece.alliance === 'black'  ? 'b' : '';
  const image = document.createElement('img');
  image.src = `images/piaces/${piece.name}${black}.png`;
  return image;
}

function initBoard() {
  board[0] = {
    name: 'rook',
    alliance: 'black'
  };
  board[1] = {
    name: 'knight',
    alliance: 'black'
  };
  board[2] = {
    name: 'bishop',
    alliance: 'black'
  };
  board[57] = {
    name: 'knight',
    alliance: 'white'
  };
}

function handleBoardClick(event) {
  const cell = {
    id: event.target.nodeName === 'IMG' ? event.target.parentNode.getAttribute('cell-id') : event.target.getAttribute('cell-id'),
    node: event.target.nodeName === 'IMG' ? event.target.parentNode : event.target,
    element: event.target
  }  
  if (!cell.id) {
    return;
  }
  if (activeItem) {
    movePice(cell);
  } else {
    selectPiece(cell);
  }
}

function selectPiece(cell) {
  const piece = board[cell.id];
  if (piece) {
    cell.node.classList.add('active');
    activeItem = {
      cell: cell,
      piece: piece
    }
  }
}

function movePice(cell) {
  activeItem.cell.node.classList.remove('active');
  if (board[cell.id]) {
    activeItem = null;
    return;
  }
  board[cell.id] = activeItem.piece;
  cell.node.appendChild(activeItem.cell.element);
  board[activeItem.cell.id] = null;
  activeItem = null;
}

init();