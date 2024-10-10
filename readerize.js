import { Readability } from "npm:@mozilla/readability";
import { JSDOM } from "npm:jsdom";

const version = "0.1.0";

function usage() {
  console.log(`readerize ${version}

readerize reads an HTML document from stdin, returning the "readable" content of the document to stdout.
If the document isn't readable by Readability.js, readerize will exit with a status of 1.

Example:
$ cat article.html | readerize

This project is downstream of Readability.js, and its interal functionality is described there.
https://github.com/mozilla/readability

Copyright (c) 2024 weebney, public domain.
`);
}

const decoder = new TextDecoder();
let text = "";

if (Deno.args.length > 0) {
  usage();
  Deno.exit(2);
}

for await (const chunk of Deno.stdin.readable) {
  text = decoder.decode(chunk);
}

if (text === "") {
  usage();
  Deno.exit(2);
}

const doc = new JSDOM(text, {});
const reader = new Readability(doc.window.document);

let article = reader.parse();

if (article === null) {
  Deno.exit(1);
} else {
  console.log(article);
}
