# Contributing

Thank you for helping. A few things to know before you open a pull request.

## Run the checks first

Every pull request runs the same three checks in CI (`.github/workflows/ci.yml`). Run them locally and make sure they pass:

```sh
npx vitest run
npx eslint .
npx tsc --noEmit
```

If you changed the script, also run its copy check:

```sh
node docs/tools/city-script-check.mjs docs/city-talk-script.md
```

It should end with `0 problems`.

If you changed anything that moves on screen, also run the browser check with the site running (`npm run dev`):

```sh
npx -y -p playwright@1.63.0 node src/components/deck/check/deck-check.mjs http://localhost:3000/
```

## Keep the script and its code in step

The script document (`docs/city-talk-script.md`) and the script code (`src/talks/city/script/*.ts`) must match word for word. `src/talks/city/script/script.test.ts` fails if they differ. Change the document first, then the code to match.

## Pictures and public files

Every file under `public/` is reached through `withBase()` from `src/lib/base-path.ts`, so it still loads when the deck is served under `/city-talk` on GitHub Pages. A changed picture gets a new version in its name (`.v1` becomes `.v2`), because browsers keep a picture by its address.

## The talk's content

The talk's slide content (its words, pictures and story) belongs to its owner at Austin Public Health. Pull requests that fix bugs in the engine or the kit are welcome. Please do not change the talk's words or slides in a pull request; open an issue to suggest a change instead.
