/**
 * @author Ben Siebert <ben@mctzock.de>
 * @copyright (c) 2018-2021 Ben Siebert. All rights reserved.
 */
import InCodeError from "./InCodeError";

export default class UnknownLanguageError extends InCodeError {
  constructor(msg: string) {
    super("UnknownLanguageError", msg);
  }
}
