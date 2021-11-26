/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

import { InCodeTest } from "./InCodeTest";
import * as fs from "fs";
import * as path from "path";
import Compiler from "../modules/Compiler";

export default class All extends InCodeTest {
  runTest() {
    console.log();
    fs.readdirSync(
      path.join(__dirname, "..", "..", "resources", "test", "all")
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
              "all",
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
                "all",
                file + ".hash"
              )
            )
            .toString();
          const content = fs
            .readFileSync(
              path.join(__dirname, "..", "..", "resources", "test", "all", file)
            )
            .toString();

          const result = JSON.stringify(new Compiler(content).finalize());

          this.check(result, resultContent, "/resources/test/all", file);
        } else {
          this.check(
            "No hash File was found.",
            "No hash file was found.",
            "/resources/test/ast",
            file
          );
        }
      }
    });
  }
}
