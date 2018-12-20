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
