/**
 * @file script.js
 * @author Pérez Apablaza Augusto 
 * @brief Conway´s Game Life
 * @version 0.1
 * @date 2023-10-26
 * 
 * @copyright Copyright (c) 2023 Released under the MIT license
 * @link https://opensource.org/licenses/MIT @endlink
 * 
 */


const rows = 30;
const cols = 30;
let grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
let intervalId;


// Función para crear el tablero en el DOM
function createGrid() {
    const gridContainer = document.getElementById('grid');
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => toggleCell(i, j));
            gridContainer.appendChild(cell);
        }
    }
}

//Función con la logica de las reglas del juego y actualizacion del estado del tablero
function updateGrid() {
    const newGrid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const neighbors = countNeighbors(i, j);
            if (grid[i][j]) {
                //Celula viva
                newGrid[i][j] = neighbors === 2 || neighbors === 3;
            } else {
                //Celula muerta
                newGrid[i][j] = neighbors === 3;
            }
        }
    }
    grid = newGrid;
    renderGrid();
}

//Funcion para contar el numero de celulas vivas alrededor de una celda
function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && !(i === 0 && j === 0)) {
                if (grid[newX][newY]) {
                    count++;
                }
            }
        }
    }
    return count;
}

//Funcion para alternar el estado de una celda de celula viva/muerta
function toggleCell(x, y) {
    grid[x][y] = !grid[x][y];
    renderGrid();
}

//Funcion para renderizar el tablero en el DOM
function renderGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        const x = Math.floor(index / cols);
        const y = index % cols;
        if (grid[x][y]) {
            cell.classList.add('alive');
        } else {
            cell.classList.remove('alive');
        }
    });
}

//Funcion para inicializar el juego
function startGame() {
    if(!intervalId){
    intervalId = setInterval(updateGrid, 200); // Actualiza el tablero cada 200 milisegundos (5 veces por segundo)
    }
}

//Funcion para pausar el juego
function pauseGame() {
    clearInterval(intervalId);
    intervalId=0;//lo igualo a 0 para que pueda entrar en el if dentro de startGame()
}

//Funcion para limpiar el tablero
function clearGrid() {
    grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
    renderGrid();
}

let isPaused = true;
function generateRandomGrid() {
    if (isPaused) {
        grid = new Array(rows).fill(null).map(() => new Array(cols).fill(false));
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = Math.random() < 0.5; //50% de probabilidad de estar viva
            }
        }
        renderGrid();
    }
}

//Crear el tablero cuando se carga la página
window.onload = createGrid;
