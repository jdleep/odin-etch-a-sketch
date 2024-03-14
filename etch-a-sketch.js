const container = document.querySelector('.squares-container');

let squaresPerSide = 16;

for (let i = 0; i < squaresPerSide ** 2; i++) {
    console.log(i);
    let squareDiv = document.createElement('div');
    squareDiv.classList.add('square');
    squareDiv.style.width = 100 / squaresPerSide + "%";

    container.appendChild(squareDiv);
} 