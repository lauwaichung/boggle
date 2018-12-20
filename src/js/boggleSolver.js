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
