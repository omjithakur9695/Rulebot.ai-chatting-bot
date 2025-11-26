/**
 * A sophisticated rule-based engine that matches patterns using Regex
 * and conditional logic to simulate conversation.
 */

// Helper to pick a random response from an array
const randomResponse = (responses: string[]) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

export const processMessage = (input: string): string => {
  const text = input.trim().toLowerCase();

  // 1. Greetings
  if (
    /^(hi|hello|hey|howdy|greetings|yo)/.test(text) ||
    text === 'hi' ||
    text === 'hello'
  ) {
    return randomResponse([
      "Hello! How can I help you today?",
      "Hi there! What's on your mind?",
      "Greetings! ready to chat.",
      "Hey! Need any assistance?"
    ]);
  }

  // 2. Identity / Self
  if (text.includes('who are you') || text.includes('what are you')) {
    return "I am RuleBot, a deterministic chat interface built with React. I function based on predefined logic patterns rather than generative AI.";
  }

  if (text.includes('your name')) {
    return "You can call me RuleBot.";
  }

  if (text.includes('real person') || text.includes('human')) {
    return "No, I am a computer program designed to respond to your inputs.";
  }

  // 3. Status / Well-being
  if (text.includes('how are you') || text.includes('how is it going')) {
    return randomResponse([
      "I'm functioning at 100% efficiency! How about you?",
      "Systems are operational. Thanks for asking! How are you?",
      "I'm just a bot, but I'm feeling great. You?"
    ]);
  }

  // 4. Emotional responses (User says they are good/bad)
  if (/(i am|i'm) (good|great|fine|happy|doing well)/.test(text)) {
    return "That's wonderful to hear! I love positive vibes.";
  }
  
  if (/(i am|i'm) (sad|bad|tired|unhappy|angry)/.test(text)) {
    return "I'm sorry to hear that. I hope your day gets better soon. Is there anything I can do to help?";
  }

  // 5. Utility: Time and Date
  if (text.includes('time')) {
    return `The current local time is ${new Date().toLocaleTimeString()}.`;
  }
  
  if (text.includes('date') || text.includes('day is it')) {
    return `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
  }

  // 6. Capabilities
  if (text.includes('help') || text.includes('what can you do')) {
    return `I can assist with simple conversations. Here are some things you can ask me:
    
- "Who are you?"
- "What time is it?"
- "Tell me a joke"
- "Open the pod bay doors"
- "What is React?"
    `;
  }

  // 7. Tech jokes / Easter eggs
  if (text.includes('joke')) {
    return randomResponse([
      "Why do programmers prefer dark mode? Because light attracts bugs.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
      "I would tell you a UDP joke, but you might not get it.",
      "Why did the developer go broke? Because he used up all his cache."
    ]);
  }

  if (text.includes('open the pod bay doors')) {
    return "I'm sorry, Dave. I'm afraid I can't do that.";
  }

  if (text.includes('react')) {
    return "React is a JavaScript library for building user interfaces, maintained by Meta and a community of developers. I'm built with it!";
  }

  if (text.includes('javascript') || text.includes('js')) {
    return "JavaScript is the language of the web. It's versatile, powerful, and occasionally confusing!";
  }

  // 8. Math (Simple) - Regex to catch "what is 2 + 2" or "calc 5 * 5"
  const mathMatch = text.match(/(\d+)\s*([\+\-\*\/])\s*(\d+)/);
  if (mathMatch) {
    const [_, n1, op, n2] = mathMatch;
    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);
    let result = 0;
    if (op === '+') result = num1 + num2;
    if (op === '-') result = num1 - num2;
    if (op === '*') result = num1 * num2;
    if (op === '/') result = num2 !== 0 ? num1 / num2 : NaN;
    
    if (isNaN(result)) return "I cannot divide by zero.";
    return `The answer is ${result}.`;
  }

  // 9. Farewell
  if (text.includes('bye') || text.includes('goodbye') || text.includes('see ya')) {
    return "Goodbye! Have a great day.";
  }

  // Default Fallback
  return randomResponse([
    "I'm not sure I understand. Could you rephrase that?",
    "That's interesting. Tell me more.",
    "I don't have a specific rule for that, but I'm listening.",
    "Could you clarify what you mean?",
    "I'm a simple rule-based bot, so I might have missed that. Try asking for 'help'."
  ]);
};