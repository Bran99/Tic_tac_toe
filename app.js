var game = {
  board: [[,,,],[,,,],[,,,]],
  boardElements: [],
  player: [],
  alternator: 0,
  playerOneScore: 0,
  playerTwoScore: 0,
  playerOneName: 'Player 1',
  playerTwoName: 'Player 2',
  currentPlayer: '',
  winner: '1',

  // enterNames: function () {
  //   //This function is a work in progress
  //   $('input').attr('placeholder', 'Please Enter Your Name')
  //             .on('keydown', function (e) {
  //               if(e.keyCode === 13) {
  //                 $('#player-one').text($('input').text());
  //               }
  //             })
  // },

  makeTable: function () {
    //A nested loop to create the board with a row and col class corresponding to their respective rows and classes
    //Also creates a click listener for each box
    var self = this;
    for(var i = 0; i < 3; i++) {
      var $tr = $('<tr>').addClass('row' + i);
      for(var j = 0; j < 3; j++) {
        var $td = $('<td>')
                           .addClass('col' + j)
                           .text(this.board[i][j])
                           .attr('id', 'spot' + i + ''  + j)
                           .on('click', function () {
                             self.placeLetter($(this));
                           });
        $tr.append($td);
        this.boardElements.push($td);
      }
      $('#player-one').text(this.playerOneName + ': ' + this.playerOneScore);
      $('#player-two').text(this.playerTwoName + ': ' + this.playerTwoScore);
      $('table').append($tr);
    }
  },

  render: function () {
    //This renders the board after each turn
    for(var i = 0; i < 3; i++) {
      for(var j = 0; j < 3; j++) {
        $('#spot' + i + '' + j).text(this.board[i][j]);
      }
    }
    if(this.winner === 'X') {
      this.playerOneScore += 1;
    } else if(this.winner === 'O') {
      this.playerTwoScore += 1;
    }
    $('#player-one').text(this.playerOneName + ': ' + this.playerOneScore);
    $('#player-two').text(this.playerTwoName + ': ' + this.playerTwoScore);
  },

  alternatePlayer: function () {
    //Alternates the player every time the function is called
    if(this.alternator % 2 === 0) {
      this.currentPlayer = 'X';
    } else {
      this.currentPlayer = 'O';
    }
    this.alternator++;
  },

  placeLetter: function ($el) {
    var positionArray = $el.attr('id').replace('spot','').split('');
    var row = positionArray[0];
    var column = positionArray[1];

    //This if statement will stop a spot from being overwritten
    if(!this.board[row][column]) {
      this.alternatePlayer();
      this.board[row][column] = this.currentPlayer;
      this.getWinner();
      this.render();
    }
  },

  getWinner: function (){
    //Determines the winner of the game
    //Column checker not fully functional
    var that = this;

    function rowWin(){
      for(var row = 0; row < that.board.length; row++){
        if(that.board[row][0] === that.board[row][1] && that.board[row][1] === that.board[row][2] && that.board[row][0] && that.alternator >= 5){
          that.winner = that.board[row][0];
          return true;
        };
      };
    };

    function colWin(){
      for(var col = 0; col < that.board.length; col++){
        if(that.board[0][col] === that.board[1][col] && that.board[1][col] === that.board[2][col] && that.board[col][0] && that.alternator >= 5){
          that.winner = that.board[0][col];
          return true;
        };
      };
    };

    function diagWin(){
      if(that.board[0][0] === that.board[1][1] && that.board[1][1] ===that.board[2][2] && that.board[0][0] && that.alternator >= 5){
        that.winner = that.board[1][1];
        return true;
      } else if(that.board[0][2] === that.board[1][1] && that.board[1][1] === that.board[2][0] && that.board[2][0] && that.alternator >= 5){
        that.winner = that.board[1][1];
        return true;
      };
    };

    rowWin();
    colWin();
    diagWin();
  },

  clearBoard: function (){
    //Clears the board every time play button is clicked, assuming the game is finished
    if(this.winner !== '' || this.alternator === 9){
      this.winner = '';
      for(var i = 0; i < this.board.length; i++){
        for(var j = 0; j < this.board[i].length; j++){
          this.board[i][j] = '';
        };
      };
      this.alternator = 0;
      this.render();
    }
  }
};

game.makeTable();
$('#start-game').on('click', function () {
  game.clearBoard();
});
