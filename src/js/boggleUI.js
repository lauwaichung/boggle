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
