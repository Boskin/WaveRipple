canvas = document.getElementById('canvas');
context = canvas.getContext('2d');

var path = new Curve(0, 0, PLAYER_LENGTH / 2, CANVAS_HEIGHT / 2);
var player = new Player();
var obstacles = [];
var obstacleTimer = 0;
var speed = 1.0;
var updateId;

reset();

function reset() {
  document.addEventListener('mousemove', helperSineCurve);
  document.addEventListener('mousedown', onClick);
  updateId = window.setInterval(updateLoop, 1000 / 60);
  player = new Player();
  obstacles = [];
}

function end() {
  document.removeEventListener('mousemove');
  document.removeEventListener('mousedown');
  window.clearInterval(updateId);
}

function onClick(evt) {
  player.setPath(path);
}

function helperSineCurve(evt) {
  var canvasRect = canvas.getBoundingClientRect();
  var mouseX = evt.pageX - canvasRect.left;
  var mouseY = evt.pageY - canvasRect.top;
  
  if(mouseX > 0 && mouseY > 0 && mouseX <= CANVAS_WIDTH && 
    mouseY < CANVAS_HEIGHT) {
    path.setAmplitude(mouseY - CANVAS_HEIGHT / 2);
    if(mouseX > CANVAS_WIDTH / 2) {
      path.setPeriod(CANVAS_WIDTH);
    } else {
      path.setPeriod(2 * mouseX);
    }
  }
}

function otherLineDraw() {
  context.beginPath();
  
  context.strokeStyle = EQUILIBRIUM_COLOR;
  context.moveTo(0, CANVAS_HEIGHT / 2);
  context.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT / 2);
  context.stroke();
  
  context.strokeStyle = DIVIDER_COLOR;
  context.moveTo(CANVAS_WIDTH / 2, 0);
  context.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
  context.stroke();
  
  context.closePath();
}

function objectCollision(a, b) {
  return a.x < b.x + b.lengthX && a.x + a.lengthX > b.x &&
    a.y < b.y + b.lengthY && a.y + a.lengthY > b.y;
}

function updateLoop() {
  player.move(speed);
  
  obstacleTimer += speed;
  if(obstacleTimer >= SPAWN_FREQUENCY) {
    var x = CANVAS_WIDTH - OBSTACLE_LENGTH / 2;
    var y;
    var i;
    
    if(Math.random() <= spawnEquilibriumChance) {
      obstacles.push(new Obstacle(x, OBSTACLE_EQUILIBRIUM));
    }
    
    for(var i = 0; i < additionalSpawn; ++i) {
      y = Math.random() * (CANVAS_HEIGHT - OBSTACLE_LENGTH / 2) + OBSTACLE_LENGTH / 2;
      obstacles.push(new Obstacle(x, y));
    }
    
    while(obstacles.length > 0 && obstacles[0].x < 0) {
      obstacles.shift();
      if(player.onPath) {
        ++player.dodgeChain;
      }
    }
    
    obstacleTimer = 0;
  }
  
  canvas.width = canvas.width;
  otherLineDraw();
  
  for(var i = 0; i < obstacles.length; ++i) {
    obstacles[i].draw();
    obstacles[i].move(speed);
    if(objectCollision(player, obstacles[i])) {
      var obstacleX = obstacles[i].x;
      player.setLives(player.lives - 1);
      if(player.lives < 1) {
        end();
      }
      obstacles.splice(0, additionalSpawn);
      if(obstacles[0].x == obstacleX) {
        obstacles.splice(0, 1);
      }
      break;
    }
  }
  
  player.draw();
  path.draw();
}