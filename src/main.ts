import Controller from "./controller";
import Model from "./model";
import View from "./view";

class Game {
  public view: View;
  public model: Model;
  public controller: Controller;

  constructor() {
    console.log("Test");
    this.view = new View();
    this.model = new Model(this.view);
    this.controller = new Controller(this.model, this.view);
  }
}

const game = new Game();
