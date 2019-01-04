import Model, { ILineResult } from "./model";

export let sw = window.innerWidth;
export let sh = window.innerHeight;
window.addEventListener("resize", () => {
  sw = window.innerWidth;
  sh = window.innerHeight;
});

export default class View {
  public ctx: CanvasRenderingContext2D;
  public boardWidth = 500;
  public circleRadius = 25;
  public lineHeight = 80;
  public rowWidth: number;

  public colorMappings: {
    [index: string]: string }
  = {
    r: "red",
    y: "yellow",
    b: "blue",
    a: "black",
    w: "white",
    g: "green",
  };

  constructor() {
    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    canvas.width = sw;
    canvas.height = sh;
    this.ctx = canvas.getContext("2d");
    this.rowWidth = this.boardWidth / 4;
  }

  public draw(model: Model) {
    // background
    this.ctx.fillStyle = "grey";
    this.ctx.fillRect(0, 0, sw, sh);

    // board
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fillRect(sw / 2 - this.boardWidth / 2, this.lineHeight, this.boardWidth, sh);

    // color picker
    // loop through all the colors;
    const colors = Object.keys(this.colorMappings).map((x) => this.colorMappings[x]);
    for (const index in colors) {
      const color = colors[index];
      this.ctx.fillStyle = color;
      this.ctx.fillRect(Number(index) * 50 + sw / 2 - this.boardWidth / 2, 0, 50, 50);
    }

    // lines
    if (model.won) {
      this.drawLine(1, model.secretCombo);
    }
    this.drawLine(2, model.currentLine);
    for (const index in model.lines) {
      this.drawLine(model.lines.length - Number(index) + 2, model.lines[index].line);
      this.drawResult(model.lines.length - Number(index) + 2, model.lines[index].res);
    }
  }

  public getColor(x: number) {
    const colorIndex = Math.floor((x - (sw / 2 - this.boardWidth / 2)) / 50);
    const colors = Object.keys(this.colorMappings);
    if (colorIndex in colors) {
      return colors[colorIndex];
    }
    return false;
  }

  public drawLine(line: number, colors: string[]) {
   this.ctx.beginPath();
   this.ctx.strokeStyle = "black";
   this.ctx.moveTo(sw / 2 - this.boardWidth / 2, line * this.lineHeight);
   this.ctx.lineTo(sw / 2 + this.boardWidth / 2, line * this.lineHeight);
   this.ctx.stroke();

   for (const index in colors) {
      const color = colors[index];
      if (color) {
        this.ctx.fillStyle = this.colorMappings[color];
      } else {
        this.ctx.fillStyle = "grey";
      }
      const cc = this.circleCords(line, Number(index));
      this.ctx.beginPath();
      this.ctx.arc(cc.x, cc.y, this.circleRadius, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  public drawResult(line: number, res: ILineResult) {
    let { red, white } = res;
    const y = line * this.lineHeight;
    const x = 4 * this.rowWidth + (sw / 2 - this.boardWidth / 2);
    top:
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 2; j++) {
        let color = null;
        if (red > 0) {
          color = "red";
          red--;
        } else if (white > 0) {
          color = "white";
          white--;
        } else {
          break top;
        }
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = "black";
        const rx = x + i * this.lineHeight / 2;
        const ry = y + j * this.lineHeight / 2;
        this.ctx.fillRect(rx, ry, this.lineHeight / 2, this.lineHeight / 2);
        this.ctx.strokeRect(rx, ry, this.lineHeight / 2, this.lineHeight / 2);
      }
    }
  }

  public circleCords(line: number, index: number) {
    const x = index * this.rowWidth + this.rowWidth / 2 + sw / 2 - this.boardWidth / 2;
    const y = this.circleRadius + line * this.lineHeight + this.lineHeight / 2 - this.circleRadius;
    return { x, y };
  }

  public getCircleIndex(x: number) {
    if (Math.abs(x - sw / 2) > this.boardWidth / 2) { return -1; }
    return Math.floor((x - (this.rowWidth / 2 + sw / 2 - this.boardWidth / 2 + this.circleRadius)) / this.rowWidth) + 1;
  }
}
