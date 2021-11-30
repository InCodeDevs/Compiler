/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { JSONObject } from "../types/JSONObject";
import dic_de from "./dictionary/german.json";
import dic_en from "./dictionary/english.json";

export default class Dictionary {
  public static dic: JSONObject = {};

  public static loadDictionary() {
    this.dic.german = dic_de;
    this.dic.english = dic_en;
  }
}
