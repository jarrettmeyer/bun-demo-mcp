# Magic 8-Ball MCP Server

A demo [Model Context Protocol](https://modelcontextprotocol.io/) server that implements a classic Magic 8-Ball oracle. Built with TypeScript and [Bun](https://bun.sh/).

## What's Inside

| MCP Primitive | Name                       | Description                                        |
| ------------- | -------------------------- | -------------------------------------------------- |
| **Tool**      | `shake`                    | Ask a yes/no question, get a random 8-Ball answer  |
| **Prompt**    | `ask-the-8-ball`           | Reusable prompt template for consulting the oracle |
| **Resource**  | `magic-8-ball://responses` | The complete list of 20 classic responses          |

## Prerequisites

- [Bun](https://bun.sh/) v1.0+
- [Claude Desktop](https://claude.ai/download) (for installing the `.mcpb` bundle)

## Getting Started

```bash
# Install dependencies
bun install

# Run the server directly (stdio transport)
bun run start
```

## Testing with MCP Inspector

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) provides a browser UI for interacting with your server.

```bash
bun run inspect
```

This opens http://localhost:6274 where you can:

1. **Tools** — Call `shake` with a question and see random 8-Ball responses
2. **Prompts** — Get the `ask-the-8-ball` prompt template with a question filled in
3. **Resources** — Read `magic-8-ball://responses` to see all 20 classic answers

## Building & Packaging for Claude Desktop

### 1. Build

Compile TypeScript to JavaScript so the bundle can run with Node.js (which ships with Claude Desktop):

```bash
bun run build
```

This creates `dist/index.js` — a single-file bundle with all dependencies included.

### 2. Create the manifest

If you haven't already, initialize the MCPB manifest:

```bash
bunx @anthropic-ai/mcpb init
```

A `manifest.json` is already included in this repo. You can validate it:

```bash
bunx @anthropic-ai/mcpb validate manifest.json
```

### 3. Pack

```bash
bunx @anthropic-ai/mcpb pack .
```

This creates a `.mcpb` file (e.g., `magic-8-ball-mcp-1.0.0.mcpb`).

### 4. Install in Claude Desktop

Double-click the `.mcpb` file (or open it with Claude Desktop). Claude will show an installation dialog — click **Install** and the Magic 8-Ball tools will be available in your conversations.

## Project Structure

```
bun-demo-mcp/
├── .claude/
│   └── CLAUDE.md         # Claude Code project instructions
├── dist/
│   └── index.js          # Compiled bundle (generated)
├── src/
│   ├── index.ts          # MCP server (tool + prompt + resource)
│   └── responses.ts
├── bun.lock
├── manifest.json         # MCPB bundle manifest
├── package.json
├── README.md
└── tsconfig.json
```

## License

MIT
