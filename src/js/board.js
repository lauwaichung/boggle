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
