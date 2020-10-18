import Game from './js/game.js';
import View from './js/view.js';
import Controller from './js/controller.js';

const tetris = document.querySelector('#tetris')
const game = new Game();
const view = new View(tetris, 480, 640, 20, 10);
const	controller = new Controller(game,view);

window.game = game;
window.view = view;
window.controller = controller;
