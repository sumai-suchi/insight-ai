// Initialize Gemini model with your API key
const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "your api key here",
);
const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

async function startChat() {
  console.log("🤖 Gemini Chatbot\nType 'exit' to quit.\n");

  // ✅ Fix: Properly formatted chat history
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "You are a helpful assistant chatbot." }],
      },
    ],
  });

  while (true) {
    const userInput = readlineSync.question("You: ");
    if (userInput.toLowerCase() === "exit") break;

    // Send user message
    const result = await chat.sendMessage(userInput);
    const response = result.response.text();
    console.log(`Gemini: ${response}\n`);
  }
}

startChat();
