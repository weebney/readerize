import { Readability } from "npm:@mozilla/readability";
import { DOMParser } from "jsr:@b-fuze/deno-dom";
import { NodeHtmlMarkdown } from "npm:node-html-markdown";

const version = "0.1.0";

function usage() {
  console.log(`readerize ${version}

readerize reads an HTML document from stdin, returning the "readable" content of the document to stdout.
If the document isn't readable by Readability.js, readerize will exit with a status of 1.
The output is in markdown format.

Example:
$ cat article.html | readerize

This project is downstream of Readability.js, and its interal functionality is described there.
https://github.com/mozilla/readability

Copyright (c) 2024 weebney, licensed 0BSD.`);
}

const decoder = new TextDecoder();
let html = "";

if (Deno.args.length > 0) {
  usage();
  Deno.exit(2);
}

for await (const chunk of Deno.stdin.readable) {
  html = decoder.decode(chunk);
}

if (html === "") {
  usage();
  Deno.exit(2);
}

const doc = new DOMParser().parseFromString(html, "text/html");

const reader = new Readability(doc);
let article = reader.parse();

if (article === null) {
  console.log("Readability.js could not parse document");
  Deno.exit(1);
} else {
  let md = NodeHtmlMarkdown.translate(article.content);
  console.log(md);
}
