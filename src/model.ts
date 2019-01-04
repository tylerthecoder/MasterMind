import View from "./view";

export type IColor = "r" | "y" | "b" | "a" | "w" | "g" | "";
export type ILine = IColor[];

export interface ILineResult {
  red: number;
  white: number;
}

export default class Model {
  public view: View;
  public lines: Array<{
    line: ILine,
    res: ILineResult,
  }> = [];
  public allColors = ["r", "y", "b", "a", "w", "g"];
  public secretCombo: ILine = ["y", "r", "r", "y"];
  public currentLine: ILine = ["", "", "", ""];
  public selectedColor: IColor;
  public won = false;

  constructor(view: View) {
    this.view = view;
    this.secretCombo = Array.from(Array(4)).map((_) => this.getRandomColor());
    console.log(this.secretCombo);
    this.view.draw(this);
  }

  public setCurrentLineColor(index: number) {
    this.currentLine[index] = this.selectedColor;
    this.view.draw(this);
  }

  public check() {
    // compare current line to secret code.
    let white = 0;
    let red = 0;
    const secret = this.secretCombo.slice(0);
    const check: any[] = this.currentLine.slice(0);
    for (const index of Object.keys(secret)) {
      if (check[index] === secret[index]) {
        red++;
        check[index] = false;
        secret[index] = false;
      }
    }
    // you win
    if (red === 4) {
      this.win();
    }
    for (const index of Object.keys(secret)) {
      if (secret[index] && check.includes(secret[index])) {
        white++;
        check[check.indexOf(secret[index])] = NaN;
      }
    }
    this.lines.push({
      line: this.currentLine.splice(0),
      res: { red, white },
    });
    this.currentLine = ["", "", "", ""];
    this.view.draw(this);
    return false;
  }

  private win() {
    this.won = true;
    this.view.draw(this);
  }

  private getRandomColor(): IColor {
    return this.allColors[Math.floor(Math.random() * this.allColors.length)] as IColor;
  }
}
