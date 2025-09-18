let boardNotes;
let activeItem;

function init() {
  const board = document.querySelector('#board');

  for(let i = 0; i < 64; i++) {
    const node = document.createElement("div");
    // node.innerText = i;
    node.classList.add('cell');
    node.setAttribute('custom-id', i);
    board.onclick = clickFunc;

    if (i === 28) {
      const image = document.createElement('img');
      image.setAttribute('src', 'images/piaces/knight.png');
      node.appendChild(image);
    }

    const row = Math.floor(i / 8);
    
    if (isEven(i) && isOdd(row) || isOdd(i) && isEven(row)) {
      node.classList.add('black-cell');
    }
    board.appendChild(node);
  }

  boardNotes = document.querySelectorAll('.cell');


}

function clickFunc(event) {
  const position = getCellPosition(event);
  if (activeItem) {
    activeItem.cell.classList.remove('active');
    const node = boardNotes[position];
    node.appendChild(activeItem.piece);
    activeItem = null;
  } else {
    const node = boardNotes[position];
    if (node.childNodes.length) {
      node.classList.add('active');
      activeItem = {
        position: position,
        cell: node,
        piece: node.childNodes[0]
      }
    }
  }
}

function getCellPosition(event) {
  target = event.target;
  if (target.nodeName === 'IMG') {
    target = target.parentNode;
  }
  return target.getAttribute('custom-id');
}

init();