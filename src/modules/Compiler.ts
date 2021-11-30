/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";
import AbstractSyntaxTreeGenerator from "./AbstractSyntaxTreeGenerator";
import PreCompiler from "./PreCompiler";
import Dictionary from "./Dictionary";
import LanguageCompiler from "./LanguageCompiler";

export default class Compiler {
  private code: string;
  private abstractSyntaxTree: JSONObject;
  private return: string;

  constructor(code: string) {
    this.code = code;
    Dictionary.loadDictionary();
  }

  finalize(): string {
    this.code = new PreCompiler(this.code).finalize();
    this.abstractSyntaxTree = new AbstractSyntaxTreeGenerator(
      this.code
    ).finalize();
    this.return = new LanguageCompiler(this.abstractSyntaxTree).finalize();

    return this.return;
  }
}
