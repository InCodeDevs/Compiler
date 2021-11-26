/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";
import AbstractSyntaxTreeGenerator from "./AbstractSyntaxTreeGenerator";
import PreCompiler from "./PreCompiler";

export default class Compiler {
  private code: string;
  private abstractSyntaxTree: JSONObject;
  private return: string;

  constructor(code: string) {
    this.code = code;
  }

  finalize(): string {
    this.code = new PreCompiler(this.code).finalize();
    this.abstractSyntaxTree = new AbstractSyntaxTreeGenerator(
      this.code
    ).finalize();
    this.return = JSON.stringify({
      code: this.code,
      ast: this.abstractSyntaxTree,
    });
    return this.return;
  }
}
