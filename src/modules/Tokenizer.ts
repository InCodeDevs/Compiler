/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";

export default class Tokenizer {
  private ast: JSONObject;

  constructor(ast: JSONObject) {
    this.ast = ast;
  }

  finalize(): JSONObject {
    return {};
  }
}
