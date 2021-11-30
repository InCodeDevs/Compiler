/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */

export default class InCodeError {
  constructor(name: string, message: string) {
    try {
      throw new Error("Silent Error");
    } catch (e) {
      console.error(" ERROR " + "\t\t" + ": " + message);
    }
  }
}
