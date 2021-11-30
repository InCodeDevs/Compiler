/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";
import AbstractSyntaxTreeGenerator from "./AbstractSyntaxTreeGenerator";
import PreCompiler from "./PreCompiler";
import Dictionary from "./Dictionary";
import LanguageCompiler from "./LanguageCompiler";

/**
 * The Main Compiler of InCode
 */
export default class Compiler {
  /**
   * Compiles InCode to JavaScript. This function automatically detects the Language InCode is written in.
   * @param code The code that will be compiled.
   */
  public static compile(code: string): string {
    Dictionary.loadDictionary();
    let result = new PreCompiler(code).finalize();
    let abstractSyntaxTree = new AbstractSyntaxTreeGenerator(result).finalize();
    result = new LanguageCompiler(abstractSyntaxTree).finalize();
    return result;
  }

  /**
   * Compiles an Abstract Syntax Tree JSON Object. This function automatically detects the Language InCode is written in.
   * @param ast The Abstract Syntax Tree JSON Object.
   */
  public static compileAST(ast: JSONObject): string {
    Dictionary.loadDictionary();
    return new LanguageCompiler(ast).finalize();
  }

  /**
   * Generates an Abstract Syntax Tree JSON Object of an InCode.
   * @param code The code that will be used to generate the Abstract Syntax Tree JSON Object.
   */
  public static generateAST(code: string): JSONObject {
    let result = new PreCompiler(code).finalize();
    return new AbstractSyntaxTreeGenerator(result).finalize();
  }
}
