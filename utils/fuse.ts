import Fuse from "fuse.js";

export interface IDictionary {
  english: string;
  slovene: string;
}

const options = {
  includeScore: true,
  keys: ["english", "slovene"],
};

const dictionary: IDictionary[] = require("../utils/dictionary.json")["terms"];

export const fuse = new Fuse(dictionary, options);
