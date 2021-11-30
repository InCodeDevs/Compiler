/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { InCodeLanguage } from "./InCodeLanguage";
import { JSONObject } from "../../types/JSONObject";
import definition from "../lang_def/incode.german.json";

export default class GermanLanguage extends InCodeLanguage {
  compileStatement(args: string[]): string {
    let r = "";
    const statement = args.join(" ");
    switch (args[0].toLowerCase()) {
      case "importiere":
        let url = "";
        for (let i = 1; i < args.length; i++) {
          url += args[i];
          if (i + 1 !== args.length) {
            url += " ";
          }
        }
        let __var_name = `__incode__fetch_${this.randomString(16)}`;

        r = `let ${__var_name} = await fetch(${url});\neval(${__var_name});`;
        break;
      case "erstelle":
        if (args.length == 2) {
          r = "let " + args[1] + ";";
        } else if (args.length == 3) {
          let found = false;
          let varName: string;
          while (!found) {
            varName = this.randomString(64);
            if (!this.c.includes(varName)) {
              found = true;
            }
          }
          r = `let ${varName} = document.createElement('${args[2].toLowerCase()}')`;
        } else {
          if (args.length === 4) {
            if (definition.creatable[args[3].toLowerCase()]) {
              r =
                "let " +
                args[1] +
                " = document.createElement('" +
                definition.creatable[args[3].toLowerCase()] +
                "')";
            } else {
              if (
                args[3].toLowerCase() === "methode:" ||
                args[3].toLowerCase() === "methode"
              ) {
                r = "window.incode." + args[1] + " = () =>";
              } else {
                console.log("A line was ignored because it contained errors.");
                r = "";
              }
            }
          } else {
            console.log("A line was ignored because it contained errors.");
            r = "";
          }
        }
        break;
      case "setze":
        if (args[2].toLowerCase() === "wert") {
          r = args[4] + " = " + this.getArgsInRange(args, 6, args.length);
        } else {
          if (definition.settable[args[2].toLowerCase()]) {
            if (definition.settable[args[2].toLowerCase()].type === "style") {
              if (definition.settable[args[2].toLowerCase()].values) {
                if (
                  definition.settable[args[2].toLowerCase()].values[
                    args[6].toLocaleLowerCase()
                  ]
                ) {
                  r =
                    args[4] +
                    ".style." +
                    definition.settable[args[2].toLowerCase()].name +
                    ' = "' +
                    definition.settable[args[2].toLowerCase()].values[
                      args[6].toLowerCase()
                    ] +
                    definition.settable[args[2].toLowerCase()].append +
                    '"';
                } else {
                  r =
                    args[4] +
                    ".style." +
                    definition.settable[args[2].toLowerCase()].name +
                    ' = "' +
                    args[6].toLowerCase() +
                    '"';
                }
              } else {
                r =
                  args[4] +
                  ".style." +
                  definition.settable[args[2].toLowerCase()].name +
                  ' = "' +
                  this.getArgsInRange(args, 6, args.length) +
                  definition.settable[args[2].toLowerCase()].append +
                  '"';
              }
            } else if (
              definition.settable[args[2].toLowerCase()].type === "attribute"
            ) {
              if (definition.settable[args[2].toLowerCase()].useSetAttribute) {
                r =
                  args[4] +
                  '.setAttribute("' +
                  definition.settable[args[2].toLowerCase()].name +
                  '", "' +
                  this.getArgsInRange(args, 6, args.length) +
                  '");';
              } else {
                r =
                  args[4] +
                  "." +
                  definition.settable[args[2].toLowerCase()].name +
                  " = " +
                  (definition.settable[args[2].toLowerCase()].prepend || "") +
                  this.getArgsInRange(args, 6, args.length) +
                  definition.settable[args[2].toLowerCase()].append;
              }
            }
          } else {
            console.log("A line was ignored because it contained errors.");
            r = "";
          }
        }
        break;
      case "rufe":
        if (args.length === 5) {
          r = "window.incode." + args[3] + "()";
        } else {
          console.log(
            "Missing KeyWord: als. In statement: " + JSON.stringify(statement)
          );
          console.log("A line was ignored because it contained errors.");
          r = "";
        }
        break;
      case "füge":
        if (args.length === 5) {
          let parentElement = args[3];
          if (args[3].toLowerCase() === "bildschirm")
            parentElement = "document.body";
          r = parentElement + ".appendChild(" + args[1] + ")";
        } else {
          console.log("A line was ignored because it contained errors.");
          r = "";
        }
        break;
      case "wiederhole":
        if (args.length === 3) {
          let found = false;
          let varName: string;
          while (!found) {
            varName = this.randomString(64);
            if (!this.c.includes(varName)) {
              found = true;
            }
          }
          r = `for(let ${varName} = 0; ${varName} < ${args[1]} ; ${varName}++)`;
        } else {
          if (args.length === 6) {
            if (definition.operators[args[3]]) {
              r =
                "while(" +
                args[2] +
                " " +
                definition.operators[args[3].toLowerCase()] +
                " " +
                args[4] +
                ")";
            } else {
              console.log("A line was ignored because it contained errors.");
              r = "";
            }
          } else {
            console.log("A line was ignored because it contained errors.");
            r = "";
          }
        }
        break;
      case "wenn":
        if (args.length >= 5 && args[3] !== "wird") {
          if (definition.operators[args[2]]) {
            r =
              "if(" +
              args[1] +
              " " +
              definition.operators[args[2].toLowerCase()] +
              " " +
              this.getArgsInRange(args, 3, args.length - 1) +
              ")";
          } else {
            console.log("A line was ignored because it contained errors.");
            r = "";
          }
        } else {
          if (args.length === 7) {
            if (definition.events[args[2].toLowerCase()]) {
              r =
                args[1] +
                ".setAttribute('" +
                definition.events[args[2].toLowerCase()] +
                "', 'window.incode." +
                args[5] +
                "()')";
            } else {
              console.log(args[2]);
              console.log("A line was ignored because it contained errors.");
              r = "";
            }
          } else {
            console.log("A line was ignored because it contained errors.");
            r = "";
          }
        }
        break;
      case "sonst":
        if (args.length === 1) {
          r = "else";
        } else {
          if (args.length === 6) {
            if (definition.operators[args[3]]) {
              r =
                "else if(" +
                args[2] +
                " " +
                definition.operators[args[3].toLowerCase()] +
                " " +
                args[4] +
                ")";
            } else {
              console.log("A line was ignored because it contained errors.");
              r = "";
            }
          } else {
            console.log("A line was ignored because it contained errors.");
            r = "";
          }
        }
        break;
      case "gib":
        if (args.length >= 6) {
          if (args[args.length - 2].toLowerCase() === "konsole") {
            r =
              "console.log(" +
              this.getArgsInRange(args, 1, args.length - 4) +
              ")";
          } else if (args[args.length - 2].toLowerCase() === "dialogbox") {
            r = "alert(" + this.getArgsInRange(args, 1, args.length - 4) + ")";
          } else {
            console.log("A line was ignored because it contained errors.");
            r = "";
          }
        } else {
          console.log("A line was ignored because it contained errors.");
          r = "";
        }
        break;
      case "frage":
        if (args.length >= 8) {
          r =
            args[args.length - 1] +
            " = prompt(" +
            this.getArgsInRange(args, 1, args.length - 6) +
            ")";
        } else {
          console.log("A line was ignored because it contained errors.");
          r = "";
        }
        break;
      case "warte":
        if (args.length === 3) {
          let milliseconds = "";
          if (args[2].toLowerCase() === "sekunden") {
            milliseconds = args[1] + "000";
          } else if (args[2].toLowerCase() === "millisekunden") {
            milliseconds = args[1];
          }

          r = `await new Promise(done => setTimeout(() => done(), ${milliseconds}))`;
        } else {
        }
        break;
      default:
        if (args[0] != "//") {
          console.log(
            "KeyWord: " +
              args[0] +
              ". In statement: " +
              JSON.stringify(statement)
          );
          console.log("A line was ignored because it contained errors.");
          r = "";
        }
    }

    return r + "\n";
  }
}
