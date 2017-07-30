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
function transform_point(point, point_field) {
  let new_x = point_field.n + point.x * 2 + point.y * -1;
  let new_y = 1 + point.x + point.y * 2;
  let ret = new Point(new_x, new_y, point.color);
  return ret;
}


function draw_square(context, field, point) {
  context.fillStyle = point.color;
  context.fillRect(point.x * field.unit_width, point.y * field.unit_height, field.unit_width, field.unit_height)
}


// turn a point in pf into a cross (really 5 points) in cf and draw it
function draw_cross(cf_context, cf, pf, pf_point) {
  // helper function to make new points
  function point_from_offset(offset_x, offset_y, other_point) {
    return new Point(other_point.x + offset_x, other_point.y + offset_y, other_point.color);
  }
  transformed_point = transform_point(pf_point, pf);
  let cross_points = [
    transformed_point,
    point_from_offset(0, -1, transformed_point),
    point_from_offset(0, 1, transformed_point),
    point_from_offset(-1, 0, transformed_point),
    point_from_offset(1, 0, transformed_point)
  ];
  for( let p of cross_points) {
    draw_square(cf_context, cf, p);
  }
}

function main()
{
  let pf_canvas = document.getElementById('point_field');
  let pf_ctx = pf_canvas.getContext('2d');
  let pf = new PointField(pf_canvas, 5, 5);

  let cf_canvas = document.getElementById('cross_field');
  let cf_ctx = cf_canvas.getContext('2d');
  let cf = new CrossField(cf_canvas, pf);

  let point = new Point(0, 0, 'red');

  draw_square(pf_ctx, pf, point);
  draw_cross(cf_ctx, cf, pf, point);
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
