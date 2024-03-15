const container = document.querySelector('.squares-container');

const INITIAL_SQUARES_PER_SIDE = 16;

function createGrid(container, squaresPerSide) {
    for (let i = 0; i < squaresPerSide ** 2; i++) {
        let squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.style.width = 100 / squaresPerSide + '%';
        container.appendChild(squareDiv);
    }    
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

function createRandomRGB() {
    let r = getRandomInt(255);
    let g = getRandomInt(255);
    let b = getRandomInt(255);

    return `rgb(${r},${g},${b})`;
}

container.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('square') && e.buttons === 1) {
        // e.target.classList.add('black');
        console.log(createRandomRGB());
        e.target.style.backgroundColor = createRandomRGB();
    }
});


const newGridButton = document.querySelector('.create-new-grid');
newGridButton.addEventListener('click', (e) => {
    let squaresPerSideStr = 
        prompt('Choose number squares per side (must be an integer between 1 and 100)!', 
        INITIAL_SQUARES_PER_SIDE);

    if (squaresPerSideStr !== null) {
        let squaresPerSide = +squaresPerSideStr;
        if (Number.isInteger(squaresPerSide) && squaresPerSide <= 100 && squaresPerSide >= 1) {
            container.replaceChildren();
            createGrid(container, squaresPerSide);
        } else {
            alert('The value entered is not an integer between 1 and 100!');
        }
    }
});


createGrid(container, INITIAL_SQUARES_PER_SIDE);