class SquareField {
  unit_width: number;
  unit_height: number;
  context: CanvasRenderingContext2D
  constructor( public canvas: HTMLCanvasElement, public n: number) {
    this.unit_width = canvas.width / this.n;
    this.unit_height = canvas.height / this.n;
    this.context = <CanvasRenderingContext2D> this.canvas.getContext('2d');
  }
  drawPoint(point: Point) {
    this.context.fillStyle = point.color;
    this.context.fillRect(
      point.x * this.unit_width,
      point.y * this.unit_height,
      this.unit_width, this.unit_height);
  }

  drawCross(point: Point) {
    // helper function to make new points
    function point_from_offset(offset_x: number, offset_y: number, other_point: Point) {
      return new Point(other_point.x + offset_x, other_point.y + offset_y, other_point.color);
    }
    let cross_points = [
      point,
      point_from_offset(0, -1, point),
      point_from_offset(0, 1, point),
      point_from_offset(-1, 0, point),
      point_from_offset(1, 0, point)
    ];
    for( let p of cross_points) {
      this.drawPoint(p);
    }
  }

}

class Point {
  constructor(public x: number, public y: number, public color: string) {
  }
}

// transform a point in s to the center of a cross in c
// derivation in README
function transformPoint(point: Point, point_field: SquareField): Point {
  let new_x = point_field.n + point.x * 2 + point.y * -1;
  let new_y = 1 + point.x + point.y * 2;
  let ret = new Point(new_x, new_y, point.color);
  return ret;
}

function makeSquarePoints(point_field: SquareField) {
  let points: Point[] = [];
  let style = 'black';
  for(let i = 0; i < point_field.n; ++i) {
    for (let j = 0; j < point_field.n; ++j) {
      if ( i % 2 == 0 && j % 2 == 0) {
        style = 'blue';
      }
      else if (i % 2 == 0 && j % 2 == 1){
        style = 'red';
      }
      else if (i % 2 == 1 && j % 2 == 0){
        style = 'blue';
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

function makePoints(point_field: SquareField) {
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
  let pf = new SquareField(pf_canvas, 12);

  let cf_canvas = <HTMLCanvasElement> document.getElementById('cross_field');
  let cf = new SquareField(cf_canvas, pf.n * 3);
  cf.context.fillStyle = 'black';
  cf.context.fillRect(0, 0, cf_canvas.width, cf_canvas.height);

  // let points = makePoints(pf);
  let points = makeSquarePoints(pf);

  for (let p of points) {
    pf.drawPoint(p);
    // draw_square(pf_ctx, pf, p);
    // Uncomment to only see the small center squares
    cf.drawCross(transformPoint(p, pf));
  }
}

// Only execute stuff when the window is done
window.onload = main;
