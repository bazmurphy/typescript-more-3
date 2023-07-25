# TypeScript

1. `npm init -y`

2. `npm i typescript`

3. create `main.ts` with some basic code

4. compile the ts file into a js file `npx tsc main.ts`

5. `main.js` is automatically created and can be used a script in `index.html`

6. now to keep developing without running that command everytime, use watch mode `npx tsc main.ts -w`

7. but this is limited, instead... make a `src` folder, make a `build` folder (and move the relevant files into the correct places)

8. `npx tsc --init` creates a `tsconfig.json` file

9. set the `rootDir` as `./src`

10. set the `outDir` as `./build/js`

11. then start watch mode `npx tsc -w`

12. note the `target` `es2016` in `tsconfig.json`

13. we can explicitly add a new property at the bottom of `tsconfig.json` as `"include": ["src"]` to ignore (not compile) anything that is NOT in `src`

14. we can adjust `"noEmitOnError": true` to stop the compiler from compiling if there are any TypeScript Errors

15. you could do this manually with `npx tsc --noEmitOnError -w`
