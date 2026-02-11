import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod/v4";
import pkg from "../package.json";

// Magic 8-Ball responses
const AFFIRMATIVE = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes definitely.",
  "You may rely on it.",
  "As I see it, yes.",
  "Most likely.",
  "Outlook good.",
  "Yes.",
  "Signs point to yes.",
  "This is the way.",
  "Make it so.",
];
const NON_COMMITTAL = [
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
];
const NEGATIVE = [
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];
const RESPONSES = [...AFFIRMATIVE, ...NON_COMMITTAL, ...NEGATIVE];

const server = new McpServer({
  name: "magic-8-ball",
  version: pkg.version,
});

// Tool: shake the 8-ball
server.registerTool("shake", {
  title: "Shake the Magic 8-Ball",
  description: "Ask a yes/no question and receive a mystical answer from the Magic 8-Ball.",
  inputSchema: {
    question: z.string().describe("A yes/no question to ask the Magic 8-Ball"),
  },
}, async ({ question }) => {
  const answer = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]!;
  return {
    content: [
      {
        type: "text",
        text: `🎱 Question: "${question}"\n\n${answer}`,
      },
    ],
  };
});

// Prompt: ask the 8-ball
server.registerPrompt("ask-the-8-ball", {
  title: "Ask the Magic 8-Ball",
  description: "A prompt template for consulting the Magic 8-Ball oracle.",
  argsSchema: {
    question: z.string().describe("A yes/no question to ask the Magic 8-Ball"),
  },
}, async ({ question }) => {
  return {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `I need guidance from the Magic 8-Ball. Please use the "shake" tool to answer my question: "${question}"`,
        },
      },
    ],
  };
});

// Resource: list of all possible responses
server.registerResource(
  "responses",
  "magic-8-ball://responses",
  {
    title: "Magic 8-Ball Responses",
    description: `The complete list of ${RESPONSES.length} Magic 8-Ball responses.`,
    mimeType: "application/json",
  },
  async (uri) => {
    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({
            total: RESPONSES.length,
            affirmative: AFFIRMATIVE,
            nonCommittal: NON_COMMITTAL,
            negative: NEGATIVE,
          }, null, 2),
        },
      ],
    };
  },
);

// Start the server
const transport = new StdioServerTransport();
await server.connect(transport);
