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
  public static compile(code: string): string {
    Dictionary.loadDictionary();
    let result = new PreCompiler(code).finalize();
    let abstractSyntaxTree = new AbstractSyntaxTreeGenerator(result).finalize();
    result = new LanguageCompiler(abstractSyntaxTree).finalize();
    return result;
  }

  public static compileAST(ast: JSONObject): string {
    Dictionary.loadDictionary();
    return "";
  }

  public static generateAST(code: string): JSONObject {
    let result = new PreCompiler(code).finalize();
    return new AbstractSyntaxTreeGenerator(result).finalize();
  }
}
