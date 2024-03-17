const INITIAL_SQUARES_PER_SIDE = 16;
const DARKEN_PERCENTAGE = 10;

const container = document.querySelector('.squares-container');

function createGrid(container, squaresPerSide) {
    for (let i = 0; i < squaresPerSide ** 2; i++) {
        let squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.style.width = 100 / squaresPerSide + '%';
        container.appendChild(squareDiv);
    }    
}

// Round half up ('round half towards positive infinity')
// Negative numbers round differently than positive numbers.
function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  

function createRandomRGB() {
    let r = getRandomInt(255);
    let g = getRandomInt(255);
    let b = getRandomInt(255);

    return [r,g,b];
}

// in: r,g,b in [0,1], out: h in [0,360) and s,l in [0,1]
function rgb2hsl(arrRGB) {
    let r = arrRGB[0] /= 255;
    let g = arrRGB[1] /= 255;
    let b = arrRGB[2] /= 255;
    let v=Math.max(r,g,b), c=v-Math.min(r,g,b), f=(1-Math.abs(v+v-c-1)); 
    let h= c && ((v==r) ? (g-b)/c : ((v==g) ? 2+(b-r)/c : 4+(r-g)/c)); 
    return [60*(h<0?h+6:h), f ? c/f : 0, (v+v-c)/2];
  }

// input: h as an angle in [0,360] and s,l in [0,1] - output: r,g,b in [0,1]
function hsl2rgb(arrHSL) 
{
    let h = arrHSL[0];
    let s = arrHSL[1];
    let l = arrHSL[2];

    let a=s*Math.min(l,1-l);
    let f= (n,k=(n+h/30)%12) => l - a*Math.max(Math.min(k-3,9-k,1),-1);
    return [f(0),f(8),f(4)];
}   

//  Darken color. Converts an array with RGB values to HSL, 
//  adds a specified percentage to the "L" value, then converts back to RGB
//  and returns the resulting array.
function darkenRGB(arrRGB, pctDarken) {
    let arrHSL = rgb2hsl(arrRGB);
    arrHSL[2] = Math.max(0, arrHSL[2] -= pctDarken / 100);
    // Convert back 255 scale
    return hsl2rgb(arrHSL).map((x) => round(x * 255, 2));
}

container.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('square') && e.buttons === 1) {

        let drawSelect = 
            document.querySelector('input[name="draw-select"]:checked').value;

        let arrRGB = [];

        switch (drawSelect) {
            case 'black':
                arrRGB = [0,0,0];
                break;
            case 'randomRGB':
                arrRGB = createRandomRGB();
                break;
            case 'darken':
                arrRGB = [255,255,255];

                if (e.target.style.backgroundColor) {
                    arrRGB = e.target.style.backgroundColor.slice(4,-1).split(',');
                }
        
                arrRGB = darkenRGB(arrRGB, DARKEN_PERCENTAGE);
                break;
        }

        e.target.style.backgroundColor = `rgb(${arrRGB.join(',')})`;
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