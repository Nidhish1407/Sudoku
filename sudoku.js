const b = null;

const bd1 = [
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b]
]

const bd2 = [
    [1, b, b, b, b, b, b, b, 3],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, 8, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, 4, b, b],
    [b, b, b, b, b, b, b, b, b],
    [b, 3, b, b, b, b, b, b, b],
    [b, b, b, b, b, b, b, b, 9]
]

const bd3 = [
    [b, b, b, b, b, 8, 9, 1, b],
    [b, b, 1, b, b, b, b, b, 3],
    [9, b, b, b, 2, 7, b, b, 5],
    [3, b, 2, 5, 6, b, b, b, b],
    [5, b, b, b, b, b, b, b, 8],
    [b, b, b, b, 8, 3, 5, b, 4],
    [8, b, b, 7, 4, b, b, b, 2],
    [6, b, b, b, b, b, 1, b, b],
    [b, 5, 7, 3, b, b, b, b, b]]

const bd4 = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9]]


const userInput = document.querySelector('.Userboard');
const canvas    = document.querySelector('.Solboard');
const SolveBtn     = document.querySelector('.solve');
const GenerateBtn  = document.querySelector('.generate');
const ResetBtn     = document.querySelector('.reset');

//Global variables
let msg = ""; //For showing error in Solution()
let IsGenerated = 0; //If board is generated Solution is already stored no need to run backtracking again
let Solboard;

function init()
{
    //initialize empty board for user input
    for(let i = 0;i<81;i++)
    {
        userInput.insertAdjacentHTML('beforeend', `<input type="text" class = "box userInput">`);
        canvas.insertAdjacentHTML('beforeend', `<input type="text" class = "box Sol" value = "?" disabled>`);
    }
}

function twoDimensionArray(a, b) {
    let arr = [];

    // creating two dimensional array
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            arr[i] = [];
        }
    }

    // inserting elements to array
    for (let i = 0; i < a; i++) {
        for (let j = 0; j < b; j++) {
            arr[i][j] = j;
        }
    }
    return arr;
}



SolveBtn.addEventListener('click',Solution);

GenerateBtn.addEventListener('click',Generate);

ResetBtn.addEventListener('click', () => {
    const input = document.querySelectorAll('.userInput');
    const Sol = document.querySelectorAll('.Sol');

    input.forEach(elm => elm.value = "");
    Sol.forEach(elm => elm.value = "?")

})

function Generate()
{
    console.log("Generated Table: ");
    let fillThisSq = Math.floor(Math.random()*10)&1;
    Solboard = solve(bd2);
    const board = [...Solboard];
    for(let i =0;i<9;i++)
    {
        for(let j =0;j<9;j++)
        {
            fillThisSq = Math.floor(Math.random() * 10) & 1;
            if(!fillThisSq)
                board[i][j] = "";
        }
    }
    userInput.textContent = "";
    board.forEach(row=>{
        row.forEach(elm=>{
            userInput.insertAdjacentHTML('beforeend', `<input type="text" class = "box userInput" value = ${elm}>`);
        })
    })
}


function Solution()
{
    if(IsGenerated)
        updateSolBoard(Solboard);

    const input = document.querySelectorAll('.userInput');
    const inputVal = [];
    try {

        input.forEach(elm => {

            if ((elm.value != "" && elm.value <= 0) || isNaN(elm.value) || elm.value.length > 1) {
                msg = "Please Enter numerical values between 1 - 9 only."

                throw new error();
            }
            // console.log(elm.value)
            if (elm.value == "")
                inputVal.push(b);
            else
                inputVal.push(+elm.value);
        })
        // console.table(inputVal);

        //Create 2d array
        const board = twoDimensionArray(9, 9);

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                board[j][i] = inputVal[(j * 9) + i];
            }
        }

        console.table(board)
        // board.forEach(row=>{
        //     row.forEach(elm=>console.log(elm));
        // })

        if (!validBoard(board)) {
            msg = "Invalid board!";
            throw new error();
        }
        updateSolBoard(board);
    }
    catch (err) {
        console.log(err);
        console.log(msg);
        alert(msg);
    }
}

function updateSolBoard(Userboard)
{
    let board;
    if(IsGenerated)
    {
        board = Userboard;
        IsGenerated = 0;
    }
    else
    {
        board = solve(Userboard);
    }

    console.log("Solution:");
    console.table(board);
    canvas.textContent = "";
    board.forEach(row => {
        row.forEach(elm => {
            canvas.insertAdjacentHTML('beforeend', `<input type="text" class = "box Sol" value = "${elm}" disabled>`);
        })
    })
}


function solve(board){
    if(solved(board)){
        return board;
    }
    else{
        const possibilities = nextBoards(board);
        const validBoards = keepOnlyValid(possibilities); 
        return searchForSolution(validBoards);
    }
}

function searchForSolution(boards)
{
    if(boards.length < 1)
        return false;
    else{
        //Backtracking search for solution
        let first = boards.shift();
        const tryPath = solve(first);
        if(tryPath != false)
        {
            return tryPath;
        }
        else{
            return searchForSolution(boards);
        }
    }
}

function solved(board){
    for(let i =0;i<9;i++)
    {
        for(let j = 0;j<9;j++)
        {
            if (board[i][j] === null)
                return false;
        }
    }
    return true;
}

function nextBoards(board)
{
    let res = [];
    const firstEmpty = findEmptySquare(board); //<-- (y,x)
    if(firstEmpty != undefined)
    {
        const y = firstEmpty[0];
        const x = firstEmpty[1];

        for(let i =1;i<=9;i++)
        {
            let newBoard = [...board];
            let row = [...newBoard[y]];
            row[x] = i;
            newBoard[y] = row;
            res.push(newBoard);
        }
    }
    return res;
}

function findEmptySquare(board)
{
    //return  (int,int)
    for(let i =0;i<9;i++)
    {
        for(let j =0;j<9;j++)
        {
            if(board[i][j] == null)
            {
                return [i,j];
            }
        }
    }
}

function keepOnlyValid(boards)
{
    // let res = [];
    // for(let i =0;i<boards.length;i++)
    // {
    //     if(validBoard(boards[i]))
    //     {
    //         res.push(boards[i]);
    //     }
    // }
    // return res;
    return boards.filter(b => validBoard(b));
}

function validBoard(board)
{
    return rowsGood(board) && columnsGood(board) && boxesGood(board);
}

function rowsGood(board){
    for(let i =0;i<9;i++)
    {
        let cur = [];
        for(let j = 0;j<9;j++)
        {  
            if(cur.includes(board[i][j]))
            {
                return false;
            }
            else if(board[i][j] != null)
            {
                cur.push(board[i][j]);
            }
        }
    }
    return true;
}

function columnsGood(board)
{
    for (let i = 0; i < 9; i++) {
        let cur = [];
        for (let j = 0; j < 9; j++) {
            if (cur.includes(board[j][i])) {
                return false;
            }
            else if (board[j][i] != null) {
                cur.push(board[j][i]);
            }
        }
    }
    return true;
}

function boxesGood(board)
{
    const boxCordinates = [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2],
        [2, 0], [2, 1], [2, 2],
    ]

    for(let y =0;y<9;y+=3)
    {  
        for(let x = 0;x<9;x+=3)
        {
            let cur = [];
            for(let i =0;i<9;i++)
            {
                let coordinates = [...boxCordinates[i]];
                coordinates[0] += y;
                coordinates[1] += x;

                if(cur.includes(board[coordinates[0]][coordinates[1]]))
                    return false;
                else if (board[coordinates[0]][coordinates[1]] != null)
                {
                    cur.push(board[coordinates[0]][coordinates[1]]);
                }
            }
        }
    }
    return true;
}

//Test
// console.log(solve(bd2))
// const sol = solve(bd2);
// init(sol)

init()



