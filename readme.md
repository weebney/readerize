# readerize

```
readerize 0.1.0

readerize reads an HTML document from stdin, returning the "readable" content of the document to stdout.
If the document isn't readable by Readability.js, readerize will exit with a status of 1.

Example:
$ cat article.html | readerize

This project is downstream of Readability.js, and its interal functionality is described there.
https://github.com/mozilla/readability

Copyright (c) 2024 weebney, public domain.
```

# building

Building readerize depends on [deno 2](https://deno.com/). Then, just run `deno task build` to build for the current platform as `bin/readerize`.
To build for all platforms, use `deno task build-all`; the binaries will be labeled by platform and placed into `bin/`.
