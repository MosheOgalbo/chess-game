'use strict'

// Pieces Types
const PAWN_BLACK = '♟'
const ROOK_BLACK = '♜'
const KNIGHT_BLACK = '♞'
const BISHOP_BLACK = '♝'
const QUEEN_BLACK = '♛'
const KING_BLACK = '♚'
const PAWN_WHITE = '♙'
const ROOK_WHITE = '♖'
const KNIGHT_WHITE = '♘'
const BISHOP_WHITE = '♗'
const QUEEN_WHITE = '♕'
const KING_WHITE = '♔'

// The Chess Board
var gBoard
var gSelectedElCell = null

function restartGame() {
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function buildBoard() {
    const board = []
    // DONE: build the board 8 * 8
    for (var i = 0; i < 8; i++) {
        board.push([])
        for (var j = 0; j < 8; j++) {
            board[i][j] = ''
            if (i === 1) board[i][j] = PAWN_BLACK
            if (i === 6) board[i][j] = PAWN_WHITE
        }
    }

    board[0][0] = board[0][7] = ROOK_BLACK
    board[0][1] = board[0][6] = KNIGHT_BLACK
    board[0][2] = board[0][5] = BISHOP_BLACK
    board[0][3] = QUEEN_BLACK
    board[0][4] = KING_BLACK

    board[7][0] = board[7][7] = ROOK_WHITE
    board[7][1] = board[7][6] = KNIGHT_WHITE
    board[7][2] = board[7][5] = BISHOP_WHITE
    board[7][3] = QUEEN_WHITE
    board[7][4] = KING_WHITE

    return board
}

function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        const row = board[i]
        strHtml += '<tr>'
        for (var j = 0; j < row.length; j++) {
            const cell = row[j]
            // DONE: figure class name
            const className = (i + j) % 2 === 0 ? 'white' : 'black'
            const tdId = `cell-${i}-${j}`
            strHtml += `<td id="${tdId}" onclick="cellClicked(this)" class="${className}">${cell}</td>`
        }
        strHtml += '</tr>'
    }
    const elMat = document.querySelector('.game-board')
    elMat.innerHTML = strHtml
}


function cellClicked(elCell) {

    // DONE: if the target is marked - move the piece!
    if (elCell.classList.contains('mark')) {
        cleanBoard()
        movePiece(gSelectedElCell, elCell)
        return
    }

    cleanBoard()

    elCell.classList.add('selected')
    gSelectedElCell = elCell

    // console.log('elCell.id:', elCell.id)
    const cellCoord = getCellCoord(elCell.id)
    // console.log('cellCoord:', cellCoord)
    const piece = gBoard[cellCoord.i][cellCoord.j]

    var possibleCoords = []
    switch (piece) {
        case ROOK_BLACK:
        case ROOK_WHITE:
            possibleCoords = getAllPossibleCoordsRook(cellCoord)
            break
        case BISHOP_BLACK:
        case BISHOP_WHITE:
            possibleCoords = getAllPossibleCoordsBishop(cellCoord)
            break
        case KNIGHT_BLACK:
        case KNIGHT_WHITE:
            possibleCoords = getAllPossibleCoordsKnight(cellCoord)
            break
        case PAWN_BLACK:
        case PAWN_WHITE:
            possibleCoords = getAllPossibleCoordsPawn(cellCoord, piece === PAWN_WHITE)
            break

    }
    markCells(possibleCoords)
}

function movePiece(elFromCell, elToCell) {
    // DONE: use: getCellCoord to get the coords, move the piece

    const fromCoord = getCellCoord(elFromCell.id)
    const toCoord = getCellCoord(elToCell.id)
    const piece = gBoard[fromCoord.i][fromCoord.j]


    //* REMOVE FROM LAST CELL
    // update the MODEl
    gBoard[fromCoord.i][fromCoord.j] = ''
    // update the DOM
    elFromCell.innerText = ''

    // ADD TO NEXT CELL
    // update the MODEl
    gBoard[toCoord.i][toCoord.j] = piece
    // update the DOM
    elToCell.innerText = piece


}

function markCells(coords) {
    // console.log('coords:', coords)
    // DONE: query select them one by one and add mark 
    for (var i = 0; i < coords.length; i++) {
        const coord = coords[i]
        const selector = getSelector(coord)
        const elCell = document.querySelector(selector)
        elCell.classList.add('mark')
    }
}

// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    const coord = {}
    const parts = strCellId.split('-')
    // console.log('parts:', parts)
    coord.i = +parts[1]
    coord.j = +parts[2]
    return coord
}

function cleanBoard() {
    const elTds = document.querySelectorAll('.mark,.selected')
    for (var i = 0; i < elTds.length; i++) {
        elTds[i].classList.remove('mark', 'selected')
    }
}

function getSelector(coord) {
    return `#cell-${coord.i}-${coord.j}`
}

function isEmptyCell(coord) {
    return gBoard[coord.i][coord.j] === ''
}

function getAllPossibleCoordsPawn(pieceCoord, isWhite) {
    // console.log('pieceCoord:', pieceCoord)
    // console.log('isWhite:', isWhite)
    const res = []
    var diff = isWhite ? -1 : 1

    var nextCoord = {
        i: pieceCoord.i + diff,
        j: pieceCoord.j
    }

    if (isEmptyCell(nextCoord)) res.push(nextCoord)

    if (pieceCoord.i === 6 && isWhite ||
        pieceCoord.i === 1 && !isWhite) {
        diff *= 2
        nextCoord = {
            i: pieceCoord.i + diff,
            j: pieceCoord.j
        }

        if (isEmptyCell(nextCoord)) res.push(nextCoord)
    }

    return res
}

function getAllPossibleCoordsRook(pieceCoord) {
    var res = []
    return res
}


function getAllPossibleCoordsBishop(pieceCoord) {
    var res = []
    var i = pieceCoord.i - 1
    for (var idx = pieceCoord.j + 1; i >= 0 && idx < 8; idx++) {
        var coord = { i: i--, j: idx }
        if (!isEmptyCell(coord)) break
        res.push(coord)
    }
    console.log(res)

    // TODO: 3 more directions - the Bishop 
    return res
}

function getAllPossibleCoordsKnight(pieceCoord) {
    var res = []

    return res
}
