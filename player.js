function Player() {
  this.x = 0;
  this.y = PLAYER_EQUILIBRIUM;
  
  this.lengthX = PLAYER_LENGTH;
  this.lengthY = PLAYER_LENGTH;
  
  this.path = new Curve();
  this.pathCounter = 0;
  this.onPath = false;
  
  this.score = 0;
  document.getElementById('score').innerHTML = 'Score: 0';
  this.dodgeChain = 0;
  
  this.lives = PLAYER_MAX_LIVES;
  document.getElementById('lives').innerHTML = 'Lives: ' + PLAYER_MAX_LIVES;
  
  this.draw = function() {
    if(this.onPath) {
      this.path.draw('rgb(255, 0, 0', -this.pathCounter);
    }
  
    context.beginPath();
    
    context.fillStyle = PLAYER_COLOR;
    context.fillRect(this.x, this.y, PLAYER_LENGTH, PLAYER_LENGTH);
    
    context.closePath();
  }
  
  this.move = function(speed) {
    if(this.onPath) {
      if(this.pathCounter + speed <= this.path.period) {
        this.y = this.path.get(this.pathCounter) - PLAYER_LENGTH / 2;
        this.pathCounter += speed;
      } else {
        this.y = PLAYER_EQUILIBRIUM;
        this.pathCounter = 0;
        this.onPath = false;;
        this.setScore(this.score + Math.pow(this.dodgeChain, 2));
        this.dodgeChain = 0;
      }
    }
  }
  
  this.setPath = function(path) {
    if(!this.onPath) {
      this.path.copy(path);
      this.onPath = true;
    }
  }
  
  this.setScore = function(val) {
    this.score = val;
    document.getElementById('score').innerHTML = 'Score: ' + this.score;
  }
  
  this.setLives = function(val) {
    this.lives = val;
    document.getElementById('lives').innerHTML = 'Lives: ' + this.lives;
  }
}