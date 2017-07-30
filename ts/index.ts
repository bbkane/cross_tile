class SquareField {
  unit_width: number;
  unit_height: number;
  constructor( public canvas: HTMLCanvasElement, public n: number) {
    this.unit_width = canvas.width / this.n;
    this.unit_height = canvas.height / this.n;
  }
}

class Point {
  constructor(public x: number, public y: number, public color: string) {
  }
}

// transform a point in s to the center of a cross in c
// derivation in README
function transform_point(point: Point, point_field: SquareField): Point {
  let new_x = point_field.n + point.x * 2 + point.y * -1;
  let new_y = 1 + point.x + point.y * 2;
  let ret = new Point(new_x, new_y, point.color);
  return ret;
}


function draw_square(context: CanvasRenderingContext2D, field: SquareField, point: Point) {
  context.fillStyle = point.color;
  context.fillRect(point.x * field.unit_width, point.y * field.unit_height, field.unit_width, field.unit_height)
}


// turn a point in pf into a cross (really 5 points) in cf and draw it
function draw_cross(cf_context: CanvasRenderingContext2D, cf: SquareField, pf: SquareField, pf_point: Point) {
  // helper function to make new points
  function point_from_offset(offset_x: number, offset_y: number, other_point: Point) {
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

function make_points(point_field: SquareField) {
  let points: Point[] = [];
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
  // I have to do the casting because this could be null. I'm just confident it's not
  let pf_canvas = <HTMLCanvasElement> document.getElementById('point_field');
  let pf_ctx = <CanvasRenderingContext2D> pf_canvas.getContext('2d');
  let pf = new SquareField(pf_canvas, 10);

  let cf_canvas = <HTMLCanvasElement> document.getElementById('cross_field');
  let cf_ctx = <CanvasRenderingContext2D> cf_canvas.getContext('2d');
  cf_ctx.fillStyle = 'black';
  cf_ctx.fillRect(0, 0, cf_canvas.width, cf_canvas.height);
  let cf = new SquareField(cf_canvas, pf.n * 3);

  let points = make_points(pf);

  for (let p of points) {
    draw_square(pf_ctx, pf, p);
    // Uncomment to only see the small center squares
    // draw_square(cf_ctx, cf, transform_point(p, pf));
    draw_cross(cf_ctx, cf, pf, p);
  }
}

// Only execute stuff when the window is done
window.onload = main;
