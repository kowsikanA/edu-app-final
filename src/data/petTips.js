// Contextual tips for Peanut to help kids when they're stuck
// Organized by lesson/quiz ID and page type

export const getPetTips = (pageType, lessonId, quizId) => {
  const allTips = {
    // General tips (fallback)
    general: [
      "Read the question carefully! Sometimes the answer is hiding right there. 📖",
      "Take your time — there's no rush! Think it through. 🤔",
      "Try clicking on the answer options to see what happens! 👆",
      "You've got this! I believe in you! 💪",
      "If you're not sure, think about what you've learned. 🧠",
    ],

    // Lessons tips (organized by unit)
    lessons: {
      unit1: [
        "Think about this: Do you NEED food to survive, or do you WANT it because it's yummy? 🍕",
        "Needs = things you can't live without (food, water, shelter). Wants = things you'd like to have. 🏠",
        "Ask yourself: Can I live without this? If yes, it's probably a want! 🤔",
        "Remember: Everyone has needs and wants. The trick is knowing the difference! 💡",
      ],
      unit2: [
        "When you shop, make a list first! It helps you stick to your budget. 📝",
        "Compare prices! Sometimes a different store has a better deal. 🏪",
        "Ask yourself: Do I really need this, or do I just want it right now? ⏸️",
        "Smart shoppers look for sales and discounts! 🏷️",
      ],
      unit3: [
        "A savings goal is something you're saving money for! 🎯",
        "Break your big goal into smaller steps — it's easier that way! 📈",
        "Every coin you save gets you closer to your goal! Keep going! 🪙",
        "Ask yourself: What do I want to save for? A toy? A trip? 🎁",
      ],
      unit4: [
        "When you work, you earn money! 💼",
        "Choose a job you'd enjoy — it makes earning more fun! 😊",
        "The more hours you work, the more money you make! ⏰",
        "Remember: Every job is important! 🌟",
      ],
      unit5: [
        "Investing means putting your money somewhere to grow! 📈",
        "Think of it like planting a seed — it takes time to grow into a tree! 🌱",
        "Safe investments grow slowly. Risky ones might grow fast OR lose money! 🎢",
        "Only invest money you can afford to lose or wait a long time for! 💭",
      ],
      unit6: [
        "You've learned so much! Time to show what you know! 🚀",
        "Think back to all the lessons. You've got the answers inside you! 🧠",
        "One step at a time — you can do this! 💪",
        "I'm so proud of you! Let's finish strong! 🏆",
      ],
    },

    // Quiz/Assessment tips
    assessments: {
      general: [
        "Read each question twice before answering. 👀",
        "Trust your instincts — your first answer is often right! 🎯",
        "If you're stuck, skip it and come back to it! ⏭️",
        "You've learned everything here — I know you know this! 🌟",
      ],
      unit1: [
        "Which one can you LIVE without? That's the want! 🤔",
        "Think of your own examples: What do you need? What do you want? 📋",
      ],
      unit2: [
        "A smart shopper thinks before they buy! 🛍️",
        "Which choice saves the most money? 💰",
      ],
      unit3: [
        "Saving takes patience and time! ⏳",
        "Which goal would YOU want to save for? 🎯",
      ],
      unit4: [
        "More work = more money. Simple math! ➕",
        "Would you keep doing that job? 💼",
      ],
      unit5: [
        "Investments are about waiting and watching your money grow! 📊",
        "Which investment sounds safest? 🛡️",
      ],
    },

    // Pet Shop tips
    petshop: [
      "Feed your pet to boost health! 🥕",
      "Water keeps your pet happy and hydrated! 💧",
      "Play with your pet to make it smile! 🎾",
      "Buy items in the shop to care for your pet! 🛒",
      "A happy pet is a healthy pet! 😊",
    ],
  };

  // Determine which tips to return
  if (pageType === "lesson" && lessonId) {
    const unitKey = `unit${lessonId.charAt(lessonId.length - 1)}`; // Extract unit number
    return allTips.lessons[unitKey] || allTips.general;
  }

  if (pageType === "quiz" && quizId) {
    const unitKey = `unit${quizId.charAt(quizId.length - 1)}`; // Extract unit number
    return allTips.assessments[unitKey] || allTips.assessments.general;
  }

  if (pageType === "shop") {
    return allTips.petshop;
  }

  // Fallback to general tips
  return allTips.general;
};

// Helper to get a random tip from array
export const getRandomTip = (tips) => {
  return tips[Math.floor(Math.random() * tips.length)];
};
