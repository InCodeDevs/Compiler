/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";
import * as fs from "fs";
import * as path from "path";

export default class Dictionary {
  public static dic: JSONObject = {};

  public static loadDictionary() {
    let dic_de = JSON.parse(
      fs
        .readFileSync(
          path.join(
            __dirname,
            "..",
            "..",
            "resources",
            "dictionary",
            "german.json"
          )
        )
        .toString()
    );
    let dic_en = JSON.parse(
      fs
        .readFileSync(
          path.join(
            __dirname,
            "..",
            "..",
            "resources",
            "dictionary",
            "english.json"
          )
        )
        .toString()
    );

    this.dic.german = dic_de;
    this.dic.english = dic_en;
  }
}
