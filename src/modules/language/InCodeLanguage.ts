/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../../types/JSONObject";

export abstract class InCodeLanguage {
  public result: string = "(async () => { window.incode = {}\n";
  public ast: JSONObject;
  c: string;

  constructor(ast: JSONObject) {
    this.ast = ast;
  }

  public finalize(): string {
    this.ast.forEach((a: JSONObject) => {
      this.result += this.compileObject(a);
    });
    this.result += "})();";
    return this.result;
  }

  private compileObject(ast: JSONObject): string {
    let r = "";

    while (ast.wordSet[0] === "\t") ast.wordSet.shift();

    r += this.compileStatement(ast.wordSet);

    if (ast.innerObjects.length > 0) {
      r += "{\n";
      ast.innerObjects.forEach((_innerObject: JSONObject) => {
        r += this.compileObject(_innerObject);
      });
      r += "}\n";
    }

    return r;
  }

  randomString(length: number = 32) {
    let result = "__";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getArgsInRange(s: string[], min: number, max: number): string {
    let x = [];
    for (let i = min; i < max; i++) {
      x.push(s[i]);
    }
    return x.join(" ");
  }

  abstract compileStatement(wordSet: string[]): string;
}
