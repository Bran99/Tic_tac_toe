var game = {
  board: [['','',''],['','',''],['','','']],
  player: [],
  alternator: 0,
  playerOneScore: 0,
  playerTwoScore: 0,
  playerOneName: 'Player 1',
  playerTwoName: 'Player 2',
  currentPlayer: '',
  winner: ' ',

  enterNames: function () {
    var self = this;
    var nameCounter = 0;
    $('input').attr('placeholder', "Please Enter Player One's Name")
              .on('keydown', function (e) {
                if(e.keyCode === 13 && nameCounter === 0) {
                  self.playerOneName = $('input').val();
                  $('input').val('')
                            .attr('placeholder', "Please Enter Player Two's Name");
                  nameCounter++;
                } else if(e.keyCode === 13 && nameCounter === 1) {
                  self.playerTwoName = $('input').val();
                  $('input').remove();
                }
              });
  },

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
                           .attr('id', 'spot' + i + '' + j)
                           .on('click', function () {
                             self.placeLetter($(this));
                           });
        $tr.append($td);
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
      $('#modal').css('visibility', 'visible');
      $('#winner-text').text(this.playerOneName + ' wins!');

    } else if(this.winner === 'O') {
      this.playerTwoScore += 1;
      $('#modal').css('visibility', 'visible');
      $('#winner-text').text(this.playerTwoName + ' wins!');

    } else if(this.alternator === 9){
      $('#modal').css('visibility', 'visible');
      $('#winner-text').text('TIE!');
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
      //If there is no winner, place a letter, check for a winner, and render the board
      if(!this.winner) {
        this.board[row][column] = this.currentPlayer;
        this.getWinner();
        this.render();
      }
    }
  },

  getWinner: function (){
    //Determines the winner of the game
    var self = this;

    function rowWin(){
      for(var row = 0; row < self.board.length; row++){
        if(self.board[row][0] === self.board[row][1] && self.board[row][1] === self.board[row][2] && self.board[row][0] !== '' && self.alternator >= 5){
          self.winner = self.board[row][0];
          return true;
        };
      };
    };

    function colWin(){
      for(var col = 0; col < self.board.length; col++){
        if(self.board[0][col] === self.board[1][col] && self.board[1][col] === self.board[2][col] && self.board[0][col] !== '' && self.alternator >= 5){
          self.winner = self.board[0][col];
          console.log(self.winner);
          return true;
        };
      };
    };

    function diagWin(){
      if(self.board[0][0] === self.board[1][1] && self.board[1][1] ===self.board[2][2] && self.board[0][0] !== '' && self.alternator >= 5){
        self.winner = self.board[1][1];
        return true;
      } else if(self.board[0][2] === self.board[1][1] && self.board[1][1] === self.board[2][0] && self.board[2][0] !== '' && self.alternator >= 5){
        self.winner = self.board[1][1];
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
      this.render();
      this.alternator = 0;
    }
  }
};

$('#start-game').on('click', function () {
  game.clearBoard();
  $('#modal').css('visibility', 'hidden');
});

game.makeTable();
game.enterNames();
