import React from "react";

const converPoints = points =>
  points.length && points.map(([x, y]) => ({ x, y }));

const rightTriangle = (size = 100) => {
  const points = [[0, 0]];
  const height = (Math.sqrt(3) / 2) * size;

  points.push([size / 2, -height]);
  points.push([size, 0]);
  points.push([0, 0]);

  return points.map(([x, y]) => [x - size / 2, y + height / 2]);
};

const initPoints = converPoints(rightTriangle(400));

class KochSnowflake extends React.PureComponent {
  static defaultProps = {
    zoom: 5,
    width: 800,
    height: 600,
    points: initPoints,
    invertX: false,
    invertY: false
  };

  static draw = (
    ctx,
    points,
    zoom,
    offset = [0, 0],
    invertX = false,
    invertY = false
  ) => {
    if (points.length > 1) {
      if (zoom >= 0) {
        let breacked = [...points];

        for (let i = 0; i < zoom; i++) {
          breacked = KochSnowflake.breakeLines(breacked, invertX, invertY);
        }

        KochSnowflake.drawByPoints(ctx, breacked, offset);
      }
    }
  };

  static drawByPoints = (ctx, points, offset = [0, 0]) => {
    if (points.length > 1) {
      console.log("drawByPoints", points.length);
      if (points.length < 200) {
        console.log("points", points);
      }

      // ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.moveTo(offset[0] + points[0].x, offset[1] + points[0].y);

      for (let i = 1, l = points.length; i < l; i++) {
        const x = offset[0] + points[i].x;
        const y = offset[1] + points[i].y;

        ctx.lineTo(x, y);
      }

      ctx.closePath();
      // ctx.fill();
      ctx.stroke();
    }
  };

  static breakeLines = (points = [], invertX = false, invertY = false) => {
    let result = [];

    for (let i = 0; i < points.length - 1; i++) {
      result = result.concat(
        KochSnowflake.brakeLine(points[i], points[i + 1], invertX, invertY)
      );
    }

    result.push(points[points.length - 1]);

    return result;
  };

  static brakeLine = (
    a = { x: 0, y: 0 },
    b = { x: 0, y: 0 },
    invertX = false,
    invertY = false
  ) => {
    const points = [];

    points.push(a);

    points.push({
      x: (a.x * 2 + b.x) / 3,
      y: (a.y * 2 + b.y) / 3
    });

    points.push({
      x:
        (a.x + b.x) / 2 +
        ((a.y - b.y) / (2 * Math.sqrt(3))) * (invertX ? 1 : -1),
      y:
        (a.y + b.y) / 2 +
        ((b.x - a.x) / (2 * Math.sqrt(3))) * (invertY ? 1 : -1)
    });

    points.push({
      x: (a.x + b.x * 2) / 3,
      y: (a.y + b.y * 2) / 3
    });

    // points.push(b);

    return points;
  };

  canvasRef = React.createRef();

  componentDidUpdate() {
    this.componentDidMount();
  }

  componentDidMount = () => {
    const canvas = this.canvasRef.current;

    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext("2d");
      const { points, zoom, width, height, invertX, invertY } = this.props;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      KochSnowflake.draw(
        ctx,
        points,
        zoom,
        [width / 2, height / 2],
        invertX,
        invertY
      );
    }
  };

  render() {
    const { canvasRef: ref } = this;
    const { width, height, invertX, invertY, ...rest } = this.props;

    return <canvas {...{ ref, width, height, ...rest }} />;
  }
}

export default KochSnowflake;
