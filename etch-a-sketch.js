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

container.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('square')) {
        e.target.classList.add('black');
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