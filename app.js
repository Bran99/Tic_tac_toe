// var board = [['','',''],['','',''],['','','']];
// var alternator = 1;
// var player = 'X';
// var position = [''][''];
// var winner;
//
// var ticTacToe = {
//   check: false,
//   place: function(position, letter){
//     position.split('');
//     board[position[0]][position[1]] = letter;
//     board;
//   },
//
//   alternateLetter: function (){
//     if(alternator % 2 === 0){
//       player = 'X';
//     }
//     else{
//       player = 'O';
//     }
//     alternator++;
//   },
//
//   getWinner: function (){
//     function rowWin(){
//       for(var row = 0; row < board.length; row++){
//         if((board[row][0] === board[row][1] === board[row][2]) && (board[row][0] !== '')){
//           winner = board[row][0];
//           console.log(winner);
//           check = true;
//           return true;
//         };
//       };
//     };
//
//     function colWin(){
//       for(var col = 0; col < board.length; col++){
//         if((board[0][col] === board[1][col] === board[2][col]) && (board[col][0] !== '')){
//           winner = board[0][col];
//           console.log(winner);
//           check = true;
//           return true;
//         };
//       };
//     };
//
//     function diagWin(){
//       if((board[0][0] === board[1][1] === board[2][2]) && board[1][1] !== ''){
//         winner = board[1][1];
//         console.log(winner);
//         check = true;
//         return true;
//       } else if((board[0][2] === board[1][1] === board[2][0]) && board[1][1] !== ''){
//         winner = board[1][1];
//         console.log(winner);
//         check = true;
//         return true;
//       };
//     };
//
//     rowWin();
//     colWin();
//     diagWin();
//   },
//
//   repeatTilWin: function (){
//     var currentThis = this;
//     while(!this.check){
//       currentThis.place(prompt("Where do you want to place your piece?"), player);
//       currentThis.alternateLetter();
//       currentThis.getWinner();
//     };
//     console.log(this.winner,"Wins!");
//   },
//
//   clearBoard: function (){
//     for(var i = 0; i < board.length; i++){
//       for(var j = 0; j < board[i].length; j++){
//         currentThis.board[i][j] = '';
//       };
//     };
//   }
// };


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

    for(var i = 0; i < 3; i++) {
      var $tr = $('<tr>').addClass('row' + i);
      for(var j = 0; j < 3; j++) {
        var $td = $('<td>')
                           .addClass('col' + j)
                           .text(this.board[i][j])
                           .attr('id', 'spot' + i + ''  + j)
                           .on('click', function ($td) {
                             return function () {
                               if(!this.winner) {
                                 this.placeLetter($td);
                               }
                             }.bind(this);
                           }.bind(this)($td));
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
    if(this.alternator % 2 === 0) {
      this.currentPlayer = 'X';
    } else {
      this.currentPlayer = 'O';
    }
    this.alternator++;
  },

  placeLetter: function ($el) {
    if($el === undefined) {
      pos1 = 0;
      pos2 = 0;
    } else {
      var getPos = $el.attr('id').split('');
      var pos1 = getPos[getPos.length - 2];
      var pos2 = getPos[getPos.length - 1];
      pos2 = parseInt(pos2) + 1;
      if(pos1 === '0' && pos2 === 3) {
        pos1 = 1;
        pos2 = 0;
      } else if(pos1 === '1' && pos2 === 3) {
        pos1 = 2;
        pos2 = 0;
      }
    }

    //This if statement will stop a spot from being overwritten
    if(!this.board[pos1][pos2]) {
      this.alternatePlayer();
      this.board[pos1][pos2] = this.currentPlayer;
      this.getWinner();
      this.render();
    }
  },

  getWinner: function (){
    var that = this;
    function rowWin(){
      for(var row = 0; row < that.board.length; row++){
        if(that.board[row][0] === that.board[row][1] && that.board[row][1] === that.board[row][2] && that.board[row][0] && that.alternator >= 5){
          that.winner = that.board[row][0];
          console.log(that.winner);
        };
      };
    };

    function colWin(){
      for(var col = 0; col < that.board.length; col++){
        if(that.board[0][col] === that.board[1][col] && that.board[1][col] === that.board[2][col] && that.board[col][0] && that.alternator >= 5){
          that.winner = that.board[0][col];
          console.log(that.winner);
        };
      };
    };

    function diagWin(){
      if(that.board[0][0] === that.board[1][1] && that.board[1][1] ===that.board[2][2] && that.board[0][0] && that.alternator >= 5){
        that.winner = that.board[1][1];
        console.log(that.winner);
      } else if(that.board[0][2] === that.board[1][1] && that.board[1][1] === that.board[2][0] && that.board[2][0] && that.alternator >= 5){
        that.winner = that.board[1][1];
        console.log(that.winner);
      };
    };

    rowWin();
    colWin();
    diagWin();
  },

  clearBoard: function (){
    if(this.winner !== ''){
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
