function Board (boardDisplayContainer) {
  this.boardDisplay = boardDisplayContainer;
  this.rawString = "";
  this.boardLength = 4;
  this.updateBoardDisplay("")
  this.solver = new BoggleSolver()
}

Board.prototype.validateInput = function(rawInputString) {
  //TODO:: Validate raw input is valid board
  return true;
};

Board.prototype.updateBoardDisplay = function(rawInputString) {
  if (this.validateInput(rawInputString)) {
    this.rawInputString = rawInputString;
    var formattedBoard = this.formatBoardStringForDisplay(rawInputString);
    this.boardDisplay.html(formattedBoard);
  }
};

// adapted from https://stackoverflow.com/questions/22835430/make-table-cells-square
Board.prototype.formatBoardStringForDisplay = function(rawInputString) {
  var boardHTMLString = "";
  for (var row = 0; row < this.boardLength; row ++) {
    boardHTMLString += '<tr></tr>';
    for (var column = 0; column < this.boardLength; column++) {
      boardHTMLString += ("<td class=\"boardCell\"><div class=\"content\">" +
      charFromRowColumnAndBoardLength(rawInputString, row, column, this.boardLength) +
      "</div></td>"
    );
    }
  }
  return boardHTMLString;
};

Board.prototype.solve = function() {
  return this.solver.solve(this);
}

var charFromRowColumnAndBoardLength = function(inputString, row, column, boardLength) {
  return inputString.charAt(column+row*boardLength);
}
function BoggleSolver () {
  this.wordList;
  this.solutions = [];
  fetchDefaultWordList(this)
}

BoggleSolver.prototype.solve = function (board) {
  return this.solveFunction(board)
}

var fetchDefaultWordList = function(boggleSolver) {
  var words = [];
  // Dictionary from https://github.com/dwyl/english-words/blob/master/words_dictionary.json
  $.getJSON( "wordLists/words_dictionary.json", function (data) {
    $.each( data, function( key, val ) {
      words.push(key);
    });
    boggleSolver.wordList = words
  });
}

BoggleSolver.prototype.solveFunction = function (board) {
  var nodes = nodify(board.rawString, board.boardLength);
  return ["solutions", "example", "test"];
}

var nodify = function (inputString, boardLength) {
  var nodes = initializeMatrix(boardLength);
  for (var row = 0; row < boardLength; row++) {
    for (var column = 0; column < boardLength; column++) {
      var nodeCharacter = charFromRowColumnAndBoardLength(
        inputString,
        row,
        column,
        boardLength
      );
      var node = new BoggleNode(nodeCharacter);
      if (row != 0) {
        node.attachSibling(nodes[row - 1][column])
      }
      if (row != 0 && column != boardLength - 1) {
        node.attachSibling(nodes[row - 1][column + 1])
      }
      if (column != 0) {
        node.attachSibling(nodes[row][column - 1])
      }
      if (row != 0 && column != 0) {
        node.attachSibling(nodes[row - 1][column - 1])
      }
      nodes[row][column] = node;
    }
  }
  return flattenMatrix(nodes)
}

var initializeMatrix = function(boardLength) {
  var n = [];
  for (var row = 0; row < boardLength; row++) {
    n.push(
      new Array(boardLength)
    );
  }
  return n;
}

var flattenMatrix = function(arrayToFlatten) {
  return $.map(arrayToFlatten, function(n) { return n});
}

function BoggleNode (character) {
  this.character = character;
  this.siblings = new Set([]);
}

BoggleNode.prototype.attachSibling = function (sibling) {
  this.siblings.add(sibling)
  sibling.siblings.add(this)
};
$(function() {
  init();
})

function init() {
  var boardInput = $("#boardInput");
  var solveButton = $("#solveButton");
  var boardDisplay = $("#boardDisplay");
  var solutionContainer = $("#solutionContainer");

  var board = new Board(boardDisplay);
  var solutionDisplay = new SolutionDisplay(solutionContainer)

  boardInput.on("input", function(){
    board.updateBoardDisplay(boardInput.val());
    solveButton.text("Solve")
  })

  solveButton.on("click", function(){
    solveButton.text("Boggling");
    var solutions = board.solve()
    solutionDisplay.show(solutions)
  })
}
function SolutionDisplay (solutionContainer) {
  this.container = solutionContainer;
  this.columnCount = 1
}

SolutionDisplay.prototype.show = function (solutions) {
  var solutionTable = this.createSolutionTable(solutions);
  this.container.html(solutionTable);
}

SolutionDisplay.prototype.createSolutionTable = function (solutions) {
  var solutionTable = solutions.join("<p>");
  return solutionTable;
}
