const BLACKLIST = ["spam", "badword1", "badword2", "http", ".com", "buy now"];

export function checkContent(content: string) {
  const lowerContent = content.toLowerCase();
  
  // 1. Check for blacklisted words
  const foundWord = BLACKLIST.find(word => lowerContent.includes(word));
  
  if (foundWord) {
    return { flagged: true, reason: `Contains forbidden term: ${foundWord}` };
  }

  // 2. Check for "shouting" (Too many caps)
  const capsCount = content.replace(/[^A-Z]/g, "").length;
  if (capsCount > content.length * 0.7 && content.length > 10) {
    return { flagged: true, reason: "Excessive capitalization" };
  }

  // 3. Check for links (anti-spam)
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  if (urlRegex.test(content)) {
    return { flagged: true, reason: "Links are not allowed" };
  }

  return { flagged: false, reason: "none" };
}