function Curve(amplitude, period, startX, startY) {
  this.amplitude = amplitude;
  this.period = period;
  this.pCoefficient = 2 * Math.PI / this.period;
  this.startX = startX;
  this.startY = startY;
  
  this.copy = function(other) {
    this.amplitude = other.amplitude;
    this.period = other.period;
    this.pCoefficient = other.pCoefficient;
    this.startX = other.startX;
    this.startY = other.startY;
  }
  
  this.setAmplitude = function(amplitude) {
    this.amplitude = amplitude;
  }
  
  this.setPeriod = function(period) {
    this.period = period;
    this.pCoefficient = 2 * Math.PI / this.period;
  }
  
  this.get = function(i) {
    return this.amplitude * Math.sin(this.pCoefficient * i) + this.startY;
  }
  
  this.draw = function(color, x, y) {
    context.beginPath();
    context.fillStyle = color != undefined ? color : GRAPH_COLOR;
    
    if(x == undefined) {
      x = 0;
    }
    
    if(y == undefined) {
      y = 0;
    }
    
    for(var i = 0; i <= this.period; i += GRAPH_RESOLUTION) {
      context.fillRect(i + this.startX + x, this.get(i) + y, 1, 1);
    }
    
    context.closePath();
  }
}
