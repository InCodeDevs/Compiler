/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class PreCompiler {
  private readonly input: string;
  private lines: string[];
  private return: string;

  constructor(input: string) {
    this.input = input;
    this.lines = this.input.split("\n");
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
    this.return = this.lines.join("\n");
  }

  finalize(): string {
    this.return = this.input;
    this.removeComments();
    return this.return;
  }
}
