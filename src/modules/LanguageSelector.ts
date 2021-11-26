/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { JSONObject } from "../types/JSONObject";
import Dictionary from "./Dictionary";

export default class LanguageSelector {
  public static suggestLanguage(ast: JSONObject): string {
    const dic = Dictionary.dic;
    let index = 0;
    let command = ast.wordSet[index];
    while (command === "\t") {
      index++;
      command = ast.wordSet[index];
    }

    let e = true;
    let ret: string = "";

    Object.keys(dic).forEach((key) => {
      if (e) {
        Object.keys(dic[key].commands).forEach((k) => {
          if (e) {
            if (dic[key].commands[k].toLowerCase() === command.toLowerCase()) {
              e = true;
              ret = key;
            }
          }
        });
      }
    });
    return ret;
  }
}
