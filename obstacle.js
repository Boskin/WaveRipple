function Obstacle(x, y) {
  this.x = x - OBSTACLE_LENGTH / 2;
  this.y = y - OBSTACLE_LENGTH / 2;
  
  this.lengthX = OBSTACLE_LENGTH;
  this.lengthY = OBSTACLE_LENGTH;
  
  this.draw = function() {
    context.beginPath();
    
    context.fillStyle = OBSTACLE_COLOR;
    context.fillRect(this.x, this.y, OBSTACLE_LENGTH, OBSTACLE_LENGTH);
    
    context.closePath();
  }
  
  this.move = function(speed) {
    this.x -= speed;
  }
}