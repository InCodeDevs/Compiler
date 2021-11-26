/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";

export default class AbstractSyntaxTreeGenerator {
  private input: string;
  private lines: string[];
  private readonly spacesAsIntends: number;
  private words: JSONObject;
  private ast: JSONObject[];

  constructor(input: string, spacesAsIntends: number = 2) {
    this.input = input;
    this.lines = this.input.split("\n");
    this.spacesAsIntends = spacesAsIntends;
    this.ast = [];
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
      line = line.replace(/\r/g, "");
      line = line.replace(/\n/g, "");
      if (line.includes("  ")) {
        line = line.replace(
          new RegExp(" {" + this.spacesAsIntends + "}", "g"),
          "\t"
        );
      }
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
    let astSoft: JSONObject[] = [];
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

    let nestedAST: JSONObject[] = [];

    let lastObject: JSONObject = null;

    astSoft.forEach((object: JSONObject) => {
      if (lastObject === null) {
        nestedAST.push(this.helperGenerateNestedASTObject(object));
        lastObject = nestedAST[nestedAST.length - 1];
      } else {
        if (object.position === 0) {
          nestedAST.push(this.helperGenerateNestedASTObject(object));
          lastObject = nestedAST[nestedAST.length - 1];
        } else {
          if (lastObject.innerObjects.length === 0) {
            lastObject.innerObjects.push(
              this.helperGenerateNestedASTObject(object)
            );
          } else {
            let x = lastObject;
            let y = x;
            while (true) {
              if (x.positon === object.position + 1) {
                x.innerObjects.push(this.helperGenerateNestedASTObject(object));
                break;
              } else {
                if (x.position === object.position) {
                  y.innerObjects.push(
                    this.helperGenerateNestedASTObject(object)
                  );
                  break;
                } else {
                  if (x.innerObjects.length === 0) {
                    x.innerObjects.push(
                      this.helperGenerateNestedASTObject(object)
                    );
                    break;
                  } else {
                    y = x;
                    x = x.innerObjects[x.innerObjects.length - 1];
                  }
                }
              }
            }
          }
        }
      }
    });

    this.ast = nestedAST;
  }

  public finalize(): JSONObject {
    this.removeComments();
    this.splitWords();
    this.generateAST();

    return this.ast;
  }

  private helperGenerateNestedASTObject(object: JSONObject): JSONObject {
    object.innerObjects = [];
    return object;
  }
}
