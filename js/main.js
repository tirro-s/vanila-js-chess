function init() {
  const board = document.querySelector('#board');

  for(let i = 0; i < 64; i++) {
    const node = document.createElement("div");
    node.innerText = i;
    node.classList.add('cell');

    const row = Math.floor(i / 8);
    
    if (isEven(i) && isOdd(row) || isOdd(i) && isEven(row)) {
      node.classList.add('black-cell');
    }
    board.appendChild(node);
  }

}

init();