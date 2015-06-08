# Tic tac toe
My first project - Brandon Goodman

##Instructions
1. Enter each player's name in the input box, hitting enter in between each name.
2. Click the Play button to run the game
3. Get 3 "X's" or "O's" in a row to win.
4. If all of the squares are filled, and there is no winner, the result is a tie!

##How I made this
I started with creating the HTML skeleton and CSS styling.  This allowed me to
- decide how to create the boxes and
- know what I was working with.
This was the first time I used the `<table>` tag, which ended up working nicely–it was very easy to split up everything into rows and columns.

For my javaScript/jQuery, I knew I needed several things:
- an array to store the letters placed on the board
- a function to draw the table when the page is loaded
- a function to alternate the letter being placed ('X' and 'O')
- a function to place a letter on the board
- a function to render the board after a letter is placed
- a function to check if anybody has won
- and a click listener to listen for clicks on the board, call the place letter function, render the board, and check if someone has won

During the building of my game, I implemented two extra features:
- The ability to enter each player's names and
- a function to clear the board, assuming someone has won or the game ends in a tie

##What I can do next time
If I were to improve upon this, I would try to make an unbeatable AI.  I found out that there is a list of priorities needed to produce an unbeatable AI, but I had much trouble conceptualizing how to implement them (specifically how to create and/or block a fork).

I would also implement the ability to change a player's name once it has been entered, and a way to reset the scores without having to reload the page.  This would be good, for example, for friends playing best out of 5.

Lastly, I would like to make it so that two friends can play across the internet.
