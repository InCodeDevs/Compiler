/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";

export default class AbstractSyntaxTreeGenerator {
  private input: string;
  private lines: string[];
  private words: JSONObject;
  private ast: JSONObject;

  constructor(input: string) {
    this.input = input;
    this.lines = this.input.split("\n");
    this.ast = {};
  }

  private removeComments() {
    let lines = [];
    this.lines.forEach((line) => {
      let tempLine = line;
      tempLine = tempLine.replace(/\t/g, "");
      if (!tempLine.startsWith("//")) {
        lines.push(line);
      }
    });
    this.lines = lines;
  }

  private splitWords() {
    let w = {};
    this.lines.forEach((line) => {
      const tempWords = line.split(" ");
      let words = [];
      tempWords.forEach((word) => {
        if (word.includes("\t")) {
          if (line.indexOf(word) === 0) {
            for (let i = 0; i < word.match(/\t/g).length; i++) {
              words.push("\t");
            }
          }
          word = word.replaceAll("\t", "");
        }
        if (word.length !== 0) {
          words.push(word);
        }
      });
      if (line.length > 0 && line.trim().length > 0) {
        w[line] = words;
      }
    });
    this.words = w;
  }

  private generateAST() {
    let astSoft = [];
    Object.keys(this.words).forEach((expression) => {
      let wordSet = this.words[expression];

      const match = wordSet.join("").match(/\t/g);
      let length = 0;
      if (match !== null && match.length !== null) {
        length = match.length;
      }

      let astSoftObject = {
        statement: expression,
        wordSet,
        position: length,
      };

      astSoft.push(astSoftObject);
    });
    this.ast = astSoft;
  }

  public finalize(): JSONObject {
    this.removeComments();
    this.splitWords();
    this.generateAST();

    console.log(this.ast);

    return this.ast;
  }
}
