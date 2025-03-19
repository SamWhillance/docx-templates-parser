# Debugging Guide for DOCX Billy

This guide describes how to debug the DOCX Billy application.

## VS Code Debugging

Three debugging configurations have been set up in `.vscode/launch.json`:

1. **Next.js: Debug Server-Side** - For debugging server-side code (API routes, getServerSideProps, etc.)
2. **Next.js: Debug Client-Side** - For debugging client-side code in the browser
3. **Next.js: Debug Full Stack** - Debug both server and client at the same time

### How to Debug

1. Open VS Code
2. Go to the "Run and Debug" panel (Ctrl+Shift+D or Cmd+Shift+D)
3. Select one of the debug configurations from the dropdown
4. Click the green play button or press F5

### Setting Breakpoints

- Set breakpoints by clicking in the gutter (the space to the left of the line numbers)
- You can also use the `debugger;` statement in your code

### Debugging the DOCX Parser

To debug the DOCX parsing functionality:

1. Choose the "Next.js: Debug Server-Side" configuration
2. Set breakpoints in `src/app/api/parse-docx/route.ts`
3. Start the debugger
4. Upload a DOCX file through the UI
5. The breakpoints will be hit when the file is processed

## Command-Line Debugging

You can also start the server in debug mode from the command line:

```
npm run dev:debug
```

Then connect to the debugging port using Chrome DevTools or VS Code.

### Chrome DevTools

1. Open Chrome and navigate to `chrome://inspect`
2. Click on "Open dedicated DevTools for Node"

## Debugging in Production Build

For debugging production builds:

```
NODE_OPTIONS=--inspect npm run build
NODE_OPTIONS=--inspect npm run start
```

Happy debugging!
