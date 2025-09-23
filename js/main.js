let activeItem;

function init() {
  const board = document.querySelector('#board');
  board.onclick = handleBoardClick;
  
  for(let i = 0; i < 64; i++) {
    const node = document.createElement("div");
    node.classList.add('cell');

    if (i === 28) {
      const image = document.createElement('img');
      // image.setAttribute('src', 'images/piaces/knight.png');
      image.src = 'images/piaces/knight.png';
      node.appendChild(image);
    }

    const row = Math.floor(i / 8);
    
    if (isEven(i) && isOdd(row) || isOdd(i) && isEven(row)) {
      node.classList.add('black-cell');
    }
    board.appendChild(node);
  }

}

function handleBoardClick(event) {
  console.log(activeItem);
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