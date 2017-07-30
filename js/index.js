class PointField {
  constructor(canvas, n) {
    this.canvas = canvas;
    // TODO: does it have to be a square?
    this.n = n;
    this.unit_width = canvas.width / this.n;
    this.unit_height = canvas.height / this.n;
  }
}

class Point {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}

// this struct needs to calculate the width/height to put crosses on another canvas
// There's going to be an offest, so that also needs to be calculated.
class CrossField {
  constructor(canvas, point_field) {
    this.canvas = canvas;
    this.n = point_field.n * 3;
    this.unit_width = canvas.width / this.n;
    this.unit_height = canvas.height / this.n;
  }
}

// transform a point in s to the center of a cross in c
function transform_point(point, cross_field) {
  new_x = cross_field.n + point.x * 2 + point.y * -1;
  new_y = 1 + point.x + point.y * 2;
  ret = new Point(new_x, new_y, point.color);
  return ret;
}


function draw_square(context, point_field, point) {
  context.fillStyle = point.color;
  context.fillRect(point.x * point_field.unit_width, point.y * point_field.unit_height, point_field.unit_width, point_field.unit_height)
}

function main()
{
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  pf = new PointField(canvas, 5, 5);
  draw_square(ctx, pf, new Point(0, 1, 'red'));
}

function oldmain() {


  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  f = new PointField(canvas, 5, 5);

  for( var i = 0; i < f.num_rows; ++i) {
    for (var j = 0; j < f.num_cols; ++j) {
      if ( i % 2 == 0 && j % 2 == 0) {
        ctx.fillStyle = 'green';
      }
      else if (i % 2 == 0 && j % 2 == 1){
        ctx.fillStyle = 'red';
      }
      else if (i % 2 == 1 && j % 2 == 0){
        ctx.fillStyle = 'yellow';
      }
      else { // 1 1
        ctx.fillStyle = 'blue';
      }
      ctx.fillRect(i * f.unit_width, j * f.unit_height, f.unit_width, f.unit_height);
    }
  }
}

// Only execute stuff when the window is done
window.onload = main;
