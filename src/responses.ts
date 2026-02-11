export const AFFIRMATIVE: string[] = [
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

export const NON_COMMITTAL: string[] = [
  "Reply hazy, try again.",
  "Ask again later.",
  "Better not tell you now.",
  "Cannot predict now.",
  "Concentrate and ask again.",
];

export const NEGATIVE: string[] = [
  "Don't count on it.",
  "My reply is no.",
  "My sources say no.",
  "Outlook not so good.",
  "Very doubtful.",
];

export const RESPONSES: string[] = [...AFFIRMATIVE, ...NON_COMMITTAL, ...NEGATIVE];
