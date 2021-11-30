/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";
import LanguageSelector from "./LanguageSelector";
import UnknownLanguageError from "./errors/UnknownLanguageError";
import NotImplementedError from "./errors/NotImplementedError";
import GermanLanguage from "./language/GermanLanguage";
import EnglishLanguage from "./language/EnglishLanguage";

export default class LanguageCompiler {
  private language: string;
  private ast: JSONObject;

  constructor(ast: JSONObject) {
    this.ast = ast;
    this.language = LanguageSelector.suggestLanguage(ast[0]);
  }

  finalize(): string {
    let result = "";
    switch (this.language) {
      case "german":
        result = new GermanLanguage(this.ast).finalize();
        break;
      case "english":
        result = new EnglishLanguage(this.ast).finalize();
        break;
      default:
        new UnknownLanguageError(
          "The Language " +
            this.language +
            " does not exists! This is an internal error. Please open an issue at https://github.com/InCodeDevs/Compiler/issues/new"
        );
    }
    return result;
  }
}
