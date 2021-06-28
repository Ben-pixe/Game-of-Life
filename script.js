function make2Darray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows;
let res = 10;
function setup() {
    createCanvas(400, 400);
    cols = width / res;
    rows = height / res;
    grid = make2Darray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0);
    while (true) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * res;
                let y = j* res;
                if (grid[i][j] === 1){
                    fill(255);
                    stroke(255)
                    rect(x, y, res, res);
                }
            }
        }
    
        let next = make2Darray(cols, rows);
    
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                let edges = (i === 0 || i === cols - 1 || j === 0 || j === rows - 1);
                if (edges) {
                    next[i][j] = state;
                } else {
                    let neighbours = countNeighbours(grid, i, j);
                    if (state === 0 && neighbours === 3) {
                        next[i][j] = 1
                    } else if (state === 1 && (neighbours > 3 || neighbours < 2)) {
                        next[i][j] = 0;
                    } else {
                        next[i][j] = state;
                    }
                }
            }
        }
        grid = next;
    }
    setInterval(() => {
        console.log('waiting')
    }, 200);
}

function countNeighbours(grid, x, y){
    let sum = 0;
    for(let i = -1; i < 2; i++){
        for(let j = -1; j < 2; j++){
            sum += grid[x+i][+j];
        }
    }
    sum -= grid[x][y];
    return sum;
}