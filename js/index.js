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
  let transformed_point = transform_point(pf_point, pf);
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

function make_points(point_field) {
  let points = []
  let style = 'black';
  for(let i = 0; i < point_field.n; ++i) {
    for (let j = 0; j < point_field.n; ++j) {
      if ( i % 2 == 0 && j % 2 == 0) {
        style = 'green';
      }
      else if (i % 2 == 0 && j % 2 == 1){
        style = 'red';
      }
      else if (i % 2 == 1 && j % 2 == 0){
        style = 'yellow';
      }
      else { // 1 1
        style = 'blue';
      }
      let point = new Point(i, j, style);
      points.push(point);
    }
  }
  return points
}

function main()
{
  let pf_canvas = document.getElementById('point_field');
  let pf_ctx = pf_canvas.getContext('2d');
  let pf = new PointField(pf_canvas, 10);

  let cf_canvas = document.getElementById('cross_field');
  let cf_ctx = cf_canvas.getContext('2d');
  cf_ctx.fillStyle = 'black';
  cf_ctx.fillRect(0, 0, cf_canvas.width, cf_canvas.height);
  let cf = new CrossField(cf_canvas, pf);

  let points = make_points(pf);

  for (let p of points) {
    draw_square(pf_ctx, pf, p);
    draw_cross(cf_ctx, cf, pf, p);
  }
}

// Only execute stuff when the window is done
window.onload = main;
