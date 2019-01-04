import Model, { IColor } from "./model";
import View from "./view";

export default class Controller {
  public model: Model;
  public view: View;
  constructor(model: Model, view: View) {
    this.model = model;
    this.view = view;

    const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    canvas.addEventListener("click", (event) => {this.clickHandler(event); });
    document.body.addEventListener("keydown", (event) => {this.keyHandler(event); });
  }

  public clickHandler(event: MouseEvent) {
    if (event.clientY < 100) { // picking a color
      this.model.selectedColor = this.view.getColor(event.clientX) as IColor;
    } else {
      const index = this.view.getCircleIndex(event.clientX);
      if (index !== -1) {
        this.model.setCurrentLineColor(index);
      }
    }
  }

  public keyHandler(event: KeyboardEvent) {
    this.model.check();
  }
}
