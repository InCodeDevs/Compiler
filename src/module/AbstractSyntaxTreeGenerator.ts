/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { AbstractSyntaxTree } from "../types/AbstractSyntaxTree";

export class AbstractSyntaxTreeGenerator {
  public static generate(source: string): AbstractSyntaxTree[] {
    const lines = source.split("\n");

    if (lines.length === 0) {
      return [];
    }

    const words: string[][] = this.splitWords(source);

    let result: AbstractSyntaxTree[] = [];

    let temp: AbstractSyntaxTree[] = [];
    let temp0: AbstractSyntaxTree[] = [];

    words.forEach((wordList) => {
      if (wordList.length === 0) {
        return;
      }

      const ast: AbstractSyntaxTree = {
        intents: 0,
        command: "",
        args: [],
        children: [],
      };

      const firstWord = wordList[0];

      ast.intents = firstWord.split("\t").length - 1;
      ast.command = firstWord.replace(/\t/g, "");
      ast.args = wordList.slice(1);

      temp.push(ast);
    });

    temp.forEach((ast) => {
      if (ast.intents === 0) {
        temp.push(ast);
        return;
      }
      if (temp[temp.length - 1].intents === ast.intents - 1) {
        temp[temp.length - 1].children.push(ast);
        return;
      } else {
        let x =
          temp[temp.length - 1].children[
            temp[temp.length - 1].children.length - 1
          ];
        console.log(ast.command + " " + x);
        console.log(x);
        let y = x;
        while (
          x !== null &&
          x.intents !== ast.intents - 1 &&
          x.intents !== ast.intents
        ) {
          x = y.children[y.children.length - 1];
          y = x;
        }
        if (x.intents === ast.intents - 1) {
          x.children.push(ast);
        } else {
          y.children.push(ast);
        }
      }
    });

    temp = temp.filter((t) => t.intents === 0);

    temp = Array.from(new Set(temp.map((a) => a))).map((a0) => {
      return temp.find((a) => a === a0);
    }) as AbstractSyntaxTree[];

    result = temp;

    return result;
  }

  private static splitWords(source: string): string[][] {
    const matrix: string[][] = [];

    const lines = source.split("\n");
    lines.forEach((line) => {
      matrix.push(line.split(" "));
    });

    return matrix;
  }
}
