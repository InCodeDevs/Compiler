/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import { InCodeTest } from "./InCodeTest";
import fs from "fs";
import path from "path";
import AbstractSyntaxTreeGenerator from "../modules/AbstractSyntaxTreeGenerator";
import LanguageSelector from "../modules/LanguageSelector";

export default class Language extends InCodeTest {
  runTest() {
    console.log();
    fs.readdirSync(
      path.join(__dirname, "..", "..", "resources", "test", "lng")
    ).forEach((file) => {
      if (file.endsWith(".incode")) {
        if (
          fs.existsSync(
            path.join(
              __dirname,
              "..",
              "..",
              "resources",
              "test",
              "lng",
              file + ".hash"
            )
          )
        ) {
          const resultContent = fs
            .readFileSync(
              path.join(
                __dirname,
                "..",
                "..",
                "resources",
                "test",
                "lng",
                file + ".hash"
              )
            )
            .toString();
          const content = fs
            .readFileSync(
              path.join(__dirname, "..", "..", "resources", "test", "lng", file)
            )
            .toString();

          const ast = new AbstractSyntaxTreeGenerator(content).finalize();

          const result = LanguageSelector.suggestLanguage(ast[0]);

          this.check(result, resultContent, "/resources/test/lng", file);
        } else {
          this.check(
            "No hash File was found.",
            "No hash file was found.",
            "/resources/test/lng",
            file
          );
        }
      }
    });
  }
}
