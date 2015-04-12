var canvas;
var context;

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

const OBSTACLE_LENGTH = 10;
const OBSTACLE_COLOR = 'rgb(255, 0, 0)';
const OBSTACLE_EQUILIBRIUM = CANVAS_HEIGHT / 2;

const GRAPH_COLOR = 'rgba(0, 100, 255, 50)';
const GRAPH_RESOLUTION = 1;

const PLAYER_LENGTH = 1;
const PLAYER_COLOR = 'rgb(100, 100, 50)';
const PLAYER_EQUILIBRIUM = CANVAS_HEIGHT / 2 - PLAYER_LENGTH / 2;
const PLAYER_MAX_LIVES = 3;

const EQUILIBRIUM_COLOR = 'rgb(0, 0, 0)';
const DIVIDER_COLOR = 'rgb(0, 0, 0)';

const SPAWN_FREQUENCY = 100;
var spawnEquilibriumChance = 0.55;
var additionalSpawn = 9;