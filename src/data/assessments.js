const assessmentsData = {
  grade4: {
    unit1: {
      title: "Unit 1 Quiz",
      questions: [
        {
          id: "g4u1q1",
          question: "You are packing for school. Which choice is a need?",
          type: "multiple-choice",
          imageUrl: "https://placehold.co/600x320?text=Needs+and+Wants",
          options: [
            { label: "Candy", imageUrl: "https://placehold.co/240x160?text=Candy" },
            { label: "Water", imageUrl: "https://placehold.co/240x160?text=Water" },
            { label: "Toy", imageUrl: "https://placehold.co/240x160?text=Toy" },
            { label: "Sticker", imageUrl: "https://placehold.co/240x160?text=Sticker" }
          ],
          answerIndex: 1,
          feedback: "Water keeps you healthy every day. Candy is a treat, not a need."
        },
        {
          id: "g4u1q1b",
          question: "Drag each item to Needs or Wants.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Water", emoji: "💧", bucket: "need" },
            { label: "School lunch", emoji: "🍱", bucket: "need" },
            { label: "Jacket", emoji: "🧥", bucket: "need" },
            { label: "Video game", emoji: "🎮", bucket: "want" },
            { label: "Candy", emoji: "🍬", bucket: "want" },
            { label: "Sticker pack", emoji: "✨", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs help you learn and stay healthy. Wants are fun extras."
        },
        {
          id: "g4u1q1c",
          question: "Sort the choices into Needs and Wants.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Backpack", emoji: "🎒", bucket: "need" },
            { label: "Notebook", emoji: "📓", bucket: "need" },
            { label: "Shoes", emoji: "👟", bucket: "need" },
            { label: "Toy car", emoji: "🧸", bucket: "want" },
            { label: "Movie night", emoji: "🎬", bucket: "want" },
            { label: "Glow stick", emoji: "✨", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "School items and shoes are needs. Movies and toys are wants."
        },
        {
          id: "g4u1q2",
          question: "If you save a little each week, you reach goals faster.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Saving a little each time helps you reach a goal sooner."
        },
        {
          id: "g4u1q3",
          question: "You already packed lunch and water. Which choice is a want?",
          type: "multiple-choice",
          options: ["Water bottle", "New sneakers", "Birthday toy", "School lunch"],
          answerIndex: 2,
          feedback: "A birthday toy is fun but not required for school or health."
        },
        {
          id: "g4u1q4",
          question: "You want a bike that costs $80. What is a smart money goal?",
          type: "multiple-choice",
          options: ["Buy everything", "Save for something important", "Spend daily", "Ignore your money"],
          answerIndex: 1,
          feedback: "A smart goal is something important you can save for, like a bike."
        },
        {
          id: "g4u1q5",
          question: "Match each item to Need or Want.",
          type: "matching",
          matchOptions: ["Need", "Want"],
          matches: [
            { left: "Water", right: "Need" },
            { left: "Notebook", right: "Need" },
            { left: "Video game", right: "Want" },
            { left: "Candy", right: "Want" }
          ],
          answerIndex: 1,
          feedback: "Needs help you learn and stay healthy; wants are fun extras."
        },
        {
          id: "g4u1q7",
          question: "You buy lunch first, then extras. Needs come before wants.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Pay for needs like food first before fun extras."
        },
        {
          id: "g4u1q8",
          question: "You have $12 for school supplies. What should you buy first?",
          type: "multiple-choice",
          options: ["Notebook", "Stickers", "Candy", "Toy"],
          answerIndex: 0,
          feedback: "A notebook is needed for class, stickers are extra."
        },
        {
          id: "g4u1q10",
          question: "Your backpack breaks and you also want a toy. What is the best choice?",
          type: "multiple-choice",
          options: ["Buy the backpack", "Buy the toy", "Buy candy", "Buy stickers"],
          answerIndex: 0,
          feedback: "Fixing your backpack helps school now; the toy can wait."
        }
      ]
    },
    unit2: {
      title: "Unit 2 Quiz",
      questions: [
        {
          id: "g4u2q1",
          question: "You have $4 for pencils. Which is the best value?",
          type: "multiple-choice",
          options: [
            { label: "1 pencil $4", imageUrl: "https://placehold.co/240x160?text=1+for+%244" },
            { label: "4 pencils $3", imageUrl: "https://placehold.co/240x160?text=4+for+%243" },
            { label: "1 pencil $5", imageUrl: "https://placehold.co/240x160?text=1+for+%245" },
            { label: "2 pencils $4", imageUrl: "https://placehold.co/240x160?text=2+for+%244" }
          ],
          answerIndex: 1,
          feedback: "Four pencils for $3 is more for less money."
        },
        {
          id: "g4u2q1b",
          question: "Drag each choice to Needs or Wants for a movie night budget.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Popcorn", emoji: "🍿", bucket: "need" },
            { label: "Juice", emoji: "🧃", bucket: "need" },
            { label: "Napkins", emoji: "🧻", bucket: "need" },
            { label: "Glow stick", emoji: "✨", bucket: "want" },
            { label: "Extra candy", emoji: "🍬", bucket: "want" },
            { label: "Toy", emoji: "🧸", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs for the event come first. Extras are wants."
        },
        {
          id: "g4u2q1c",
          question: "Sort each item into Needs or Wants before you buy.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Water bottle", emoji: "🍼", bucket: "need" },
            { label: "Paper", emoji: "📓", bucket: "need" },
            { label: "Markers", emoji: "✏️", bucket: "need" },
            { label: "Glitter", emoji: "✨", bucket: "want" },
            { label: "Candy", emoji: "🍬", bucket: "want" },
            { label: "Game", emoji: "🎮", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Supplies you need for class go in Needs. Fun extras are Wants."
        },
        {
          id: "g4u2q2",
          question: "You check two stores first. Comparing prices helps you avoid overpaying.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Checking two stores can save you coins."
        },
        {
          id: "g4u2q3",
          question: "You plan how to use your $10. A budget is a plan for how to use your money.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "A budget tells you how much to spend and save."
        },
        {
          id: "g4u2q4",
          question: "You have $12 for movie night. Which choice fits a smart budget?",
          type: "multiple-choice",
          options: ["Popcorn $4 + juice $3 + napkins $2", "Candy $8 + glow stick $5", "Two candy bags $8 + soda $5", "Glow stick $5 + candy $8"],
          answerIndex: 0,
          feedback: "Popcorn, juice, and napkins fit the $12 limit."
        },
        {
          id: "g4u2q6",
          question: "You need a water bottle. Which choice is smarter?",
          type: "multiple-choice",
          options: ["Bottle for $15 with sparkles", "Bottle for $8 that works well", "Spend $15 on snacks", "Buy nothing and forget"],
          answerIndex: 1,
          feedback: "The $8 bottle works and leaves money for other needs."
        },
        {
          id: "g4u2q7",
          question: "Match the money move to the best example.",
          type: "matching",
          matchOptions: ["Compare", "Budget", "Save"],
          matches: [
            { left: "Look at two stores", right: "Compare" },
            { left: "Plan $12 for snacks", right: "Budget" },
            { left: "Keep extra coins", right: "Save" }
          ],
          answerIndex: 1,
          feedback: "Comparing, budgeting, and saving are smart money moves."
        },
        {
          id: "g4u2q9",
          question: "You see a big sale sign. A good deal should still match what you need.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "A good deal also matches what you need."
        },
        {
          id: "g4u2q10",
          question: "If you choose a cheaper option, what is a smart next step?",
          type: "multiple-choice",
          options: ["Save the extra money", "Spend it on random extras", "Forget about the plan", "Buy the most expensive item"],
          answerIndex: 0,
          feedback: "Saving the difference grows your goal money."
        }
      ]
    },
    unit3: {
      title: "Unit 3 Quiz",
      questions: [
        {
          id: "g4u3q1",
          question: "You check your chart each week. A goal tracker helps you see progress.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "A tracker shows how close you are to a goal."
        },
        {
          id: "g4u3q1b",
          question: "Drag each item to Needs or Wants for emergencies.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Broken glasses", emoji: "🩹", bucket: "need" },
            { label: "Medicine", emoji: "💊", bucket: "need" },
            { label: "Bus ticket", emoji: "🚌", bucket: "need" },
            { label: "New toy", emoji: "🧸", bucket: "want" },
            { label: "Extra candy", emoji: "🍬", bucket: "want" },
            { label: "Sticker pack", emoji: "✨", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Emergency money is for urgent needs like broken items."
        },
        {
          id: "g4u3q1c",
          question: "Sort the choices into Needs and Wants for your goal.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Notebook", emoji: "📓", bucket: "need" },
            { label: "Pencil", emoji: "✏️", bucket: "need" },
            { label: "Lunch", emoji: "🍱", bucket: "need" },
            { label: "Movie night", emoji: "🎬", bucket: "want" },
            { label: "Toy", emoji: "🧸", bucket: "want" },
            { label: "Glow stick", emoji: "✨", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs support school and health. Wants are fun extras."
        },
        {
          id: "g4u3q2",
          question: "What is a goal tracker used for?",
          type: "multiple-choice",
          options: ["To track progress", "To spend more", "To forget goals", "To buy snacks"],
          answerIndex: 0,
          feedback: "Trackers help you see progress each week."
        },
        {
          id: "g4u3q3",
          question: "Your glasses break at school. Which is an emergency?",
          type: "multiple-choice",
          options: ["Broken glasses", "New toy", "Extra candy", "Sticker pack"],
          answerIndex: 0,
          feedback: "Broken glasses are urgent, a toy can wait."
        },
        {
          id: "g4u3q4",
          question: "You save money for surprises. Emergency money should be saved for urgent needs.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Emergency money is for surprises like a broken item."
        },
        {
          id: "g4u3q5",
          question: "Match each situation to Emergency or Extra.",
          type: "matching",
          matchOptions: ["Emergency", "Extra"],
          matches: [
            { left: "Broken glasses", right: "Emergency" },
            { left: "New toy", right: "Extra" },
            { left: "Medicine", right: "Emergency" },
            { left: "Sticker pack", right: "Extra" }
          ],
          answerIndex: 1,
          feedback: "Emergencies are urgent needs. Extras can wait."
        },
        {
          id: "g4u3q6",
          question: "If you want a $30 item and save $5 each week, how many weeks?",
          type: "multiple-choice",
          options: ["6 weeks", "3 weeks", "10 weeks", "2 weeks"],
          answerIndex: 0,
          feedback: "$5 saved for 6 weeks equals $30."
        },
        {
          id: "g4u3q8",
          question: "A rainy day fund is for surprises you need to handle.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "A rainy day fund helps with unexpected needs."
        },
        {
          id: "g4u3q10",
          question: "What should you do after reaching a mini-goal?",
          type: "multiple-choice",
          options: ["Celebrate a little and keep saving", "Spend everything", "Stop tracking", "Forget the bigger goal"],
          answerIndex: 0,
          feedback: "Celebrate a little, then keep saving for the big goal."
        }
      ]
    },
    unit4: {
      title: "Unit 4 Quiz",
      questions: [
        {
          id: "g4u4q1",
          question: "Which is a good way to earn money?",
          type: "multiple-choice",
          options: ["Do chores", "Wait and hope", "Spend all", "Forget goals"],
          answerIndex: 0,
          feedback: "Chores earn money because you help someone."
        },
        {
          id: "g4u4q1b",
          question: "Sort the choices into Needs and Wants when you earn money.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Save in jar", emoji: "💰", bucket: "need" },
            { label: "School supplies", emoji: "📓", bucket: "need" },
            { label: "Lunch", emoji: "🍱", bucket: "need" },
            { label: "Candy", emoji: "🍬", bucket: "want" },
            { label: "Toy", emoji: "🧸", bucket: "want" },
            { label: "Movie night", emoji: "🎬", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs and saving should come before fun extras."
        },
        {
          id: "g4u4q1c",
          question: "Drag each item to Needs or Wants for a balanced plan.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Jacket", emoji: "🧥", bucket: "need" },
            { label: "Shoes", emoji: "👟", bucket: "need" },
            { label: "Backpack", emoji: "🎒", bucket: "need" },
            { label: "Glow stick", emoji: "✨", bucket: "want" },
            { label: "Game", emoji: "🎮", bucket: "want" },
            { label: "Stickers", emoji: "✨", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs help you learn and stay safe. Wants are extras."
        },
        {
          id: "g4u4q2",
          question: "You earn $12. Spend, save, and share are three smart money choices.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Using money to spend, save, and share is balanced."
        },
        {
          id: "g4u4q3",
          question: "Match each action to Earn, Spend, or Share.",
          type: "matching",
          matchOptions: ["Earn", "Spend", "Share"],
          matches: [
            { left: "Walk a neighbor's dog", right: "Earn" },
            { left: "Buy a snack", right: "Spend" },
            { left: "Donate a little", right: "Share" }
          ],
          answerIndex: 1,
          feedback: "Earning comes from work, spending buys things, sharing helps others."
        },
        {
          id: "g4u4q4",
          question: "You earn $10 from chores. Which choice shows saving?",
          type: "multiple-choice",
          options: ["Put money in a jar", "Buy candy", "Spend on toys", "Give up"],
          answerIndex: 0,
          feedback: "Putting money in a jar means you saved it."
        },
        {
          id: "g4u4q6",
          question: "If you earn $20, what is a balanced plan?",
          type: "multiple-choice",
          options: ["Save $10, spend $6, share $4", "Spend all", "Save nothing", "Share everything"],
          answerIndex: 0,
          feedback: "Saving, spending a little, and sharing splits money wisely."
        },
        {
          id: "g4u4q7",
          question: "You have $20 to use. Why should you plan before spending?",
          type: "multiple-choice",
          options: ["To reach goals", "To spend faster", "To waste money", "To forget needs"],
          answerIndex: 0,
          feedback: "Planning helps you meet goals and avoid waste."
        },
        {
          id: "g4u4q8",
          question: "Earning money can come from helping others.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Helping others can earn money, like a small job."
        },
        {
          id: "g4u4q10",
          question: "Which is a smart way to reach a big goal?",
          type: "multiple-choice",
          options: ["Save a little each week", "Spend all now", "Buy extras only", "Stop tracking"],
          answerIndex: 0,
          feedback: "Saving a little each week builds big goals."
        }
      ]
    }
  },
  grade5: {
    unit1: {
      title: "Unit 1 Quiz",
      questions: [
        {
          id: "g5u1q1",
          question: "What is the first step before spending?",
          type: "multiple-choice",
          options: ["Think", "Swipe", "Spend fast", "Forget"],
          answerIndex: 0,
          feedback: "Pause and think before spending."
        },
        {
          id: "g5u1q1b",
          question: "Drag each item into Needs or Wants.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Breakfast", emoji: "🍱", bucket: "need" },
            { label: "Jacket", emoji: "🧥", bucket: "need" },
            { label: "Shoes", emoji: "👟", bucket: "need" },
            { label: "New game", emoji: "🎮", bucket: "want" },
            { label: "Candy", emoji: "🍬", bucket: "want" },
            { label: "Movie night", emoji: "🎬", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs keep you healthy and ready for school."
        },
        {
          id: "g5u1q1c",
          question: "Sort the choices into Needs and Wants.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Notebook", emoji: "📓", bucket: "need" },
            { label: "Pencil", emoji: "✏️", bucket: "need" },
            { label: "Lunch", emoji: "🍱", bucket: "need" },
            { label: "Toy", emoji: "🧸", bucket: "want" },
            { label: "Stickers", emoji: "✨", bucket: "want" },
            { label: "Glow stick", emoji: "✨", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs come before wants in a smart plan."
        },
        {
          id: "g5u1q2",
          question: "New shoes for fun are a want.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Fun shoes are a want, not a must-have."
        },
        {
          id: "g5u1q3",
          question: "Match each item to Need or Want.",
          type: "matching",
          matchOptions: ["Need", "Want"],
          matches: [
            { left: "Breakfast", right: "Need" },
            { left: "Notebook", right: "Need" },
            { left: "New game", right: "Want" },
            { left: "Candy", right: "Want" }
          ],
          answerIndex: 1,
          feedback: "Needs help you stay healthy and ready for school."
        },
        {
          id: "g5u1q4",
          question: "You want a new headset. Saving helps you…",
          type: "multiple-choice",
          options: ["Reach goals", "Lose money", "Buy less later", "Forget goals"],
          answerIndex: 0,
          feedback: "Saving moves you closer to what you want."
        },
        {
          id: "g5u1q5",
          question: "You plan your allowance. A budget is…",
          type: "multiple-choice",
          options: ["A plan for money", "A game", "A toy", "A receipt"],
          answerIndex: 0,
          feedback: "A budget is your money plan."
        },
        {
          id: "g5u1q6",
          question: "What is a smart choice?",
          type: "multiple-choice",
          options: ["Spend on a goal", "Spend all on candy", "Ignore needs", "Buy random items"],
          answerIndex: 0,
          feedback: "Spending on a goal keeps you on track."
        },
        {
          id: "g5u1q7",
          question: "You want a $25 item and have $10 saved. What should you do next?",
          type: "multiple-choice",
          options: ["Keep saving", "Spend the $10", "Buy candy", "Give up"],
          answerIndex: 0,
          feedback: "Keeping your savings grows your goal money."
        },
        {
          id: "g5u1q8",
          question: "Comparing prices helps you keep more money.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Comparing prices helps you pay less."
        }
      ]
    },
    unit2: {
      title: "Unit 2 Quiz",
      questions: [
        {
          id: "g5u2q1",
          question: "A jacket is a need.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "A jacket keeps you warm, so it is a need."
        },
        {
          id: "g5u2q2",
          question: "Match each item to Need or Want.",
          type: "matching",
          matchOptions: ["Need", "Want"],
          matches: [
            { left: "Water", right: "Need" },
            { left: "Backpack", right: "Need" },
            { left: "Phone case", right: "Want" },
            { left: "Candy", right: "Want" }
          ],
          answerIndex: 1,
          feedback: "Needs keep you ready for school; wants are extras."
        },
        {
          id: "g5u2q1b",
          question: "Drag each item to Needs or Wants before you buy.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Water", emoji: "💧", bucket: "need" },
            { label: "Backpack", emoji: "🎒", bucket: "need" },
            { label: "Shoes", emoji: "👟", bucket: "need" },
            { label: "Phone case", emoji: "📱", bucket: "want" },
            { label: "Candy", emoji: "🍬", bucket: "want" },
            { label: "Toy", emoji: "🧸", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs should be covered before extras."
        },
        {
          id: "g5u2q1c",
          question: "Sort the items into Needs and Wants for a budget.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Lunch", emoji: "🍱", bucket: "need" },
            { label: "Notebook", emoji: "📓", bucket: "need" },
            { label: "Bus pass", emoji: "🚌", bucket: "need" },
            { label: "Glow stick", emoji: "✨", bucket: "want" },
            { label: "Movie night", emoji: "🎬", bucket: "want" },
            { label: "Game", emoji: "🎮", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs support school and safety; wants are fun extras."
        },
        {
          id: "g5u2q3",
          question: "Saving $2 each day for 5 days gives you…",
          type: "multiple-choice",
          options: ["$10", "$5", "$7", "$2"],
          answerIndex: 0,
          feedback: "$2 a day for 5 days equals $10."
        },
        {
          id: "g5u2q4",
          question: "Why should you compare prices?",
          type: "multiple-choice",
          options: ["To save money", "To spend more", "To waste time", "To buy anything"],
          answerIndex: 0,
          feedback: "Comparing prices helps you pay less."
        },
        {
          id: "g5u2q5",
          question: "What should you do with allowance?",
          type: "multiple-choice",
          options: ["Save some", "Spend all", "Lose it", "Forget it"],
          answerIndex: 0,
          feedback: "Saving some allowance builds good habits."
        },
        {
          id: "g5u2q6",
          question: "Needs vs wants: which is a want?",
          type: "multiple-choice",
          options: ["Breakfast", "Homework", "New game", "School"],
          answerIndex: 2,
          feedback: "A new game is fun but not required."
        },
        {
          id: "g5u2q7",
          question: "You found a cheaper notebook. What is a smart next step?",
          type: "multiple-choice",
          options: ["Save the extra money", "Spend it right away", "Ignore your plan", "Buy two extras"],
          answerIndex: 0,
          feedback: "Saving the extra helps your goal grow."
        },
        {
          id: "g5u2q8",
          question: "Before a big purchase, you should compare prices.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Comparing prices helps you spend wisely."
        }
      ]
    }
  },
  grade6: {
    unit1: {
      title: "Unit 1 Quiz",
      questions: [
        {
          id: "g6u1q1",
          question: "What is a smart money goal?",
          type: "multiple-choice",
          options: ["Save for a need", "Spend on everything", "Ignore money", "Buy random items"],
          answerIndex: 0,
          feedback: "Saving for a need is a clear, smart goal."
        },
        {
          id: "g6u1q1b",
          question: "Drag each item into Needs or Wants.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Water", emoji: "💧", bucket: "need" },
            { label: "Shoes", emoji: "👟", bucket: "need" },
            { label: "School supplies", emoji: "📓", bucket: "need" },
            { label: "Phone case", emoji: "📱", bucket: "want" },
            { label: "Candy", emoji: "🍬", bucket: "want" },
            { label: "Movie night", emoji: "🎬", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs help you stay healthy and ready for school."
        },
        {
          id: "g6u1q1c",
          question: "Sort the choices into Needs and Wants.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Lunch", emoji: "🍱", bucket: "need" },
            { label: "Notebook", emoji: "📓", bucket: "need" },
            { label: "Bus ticket", emoji: "🚌", bucket: "need" },
            { label: "Game", emoji: "🎮", bucket: "want" },
            { label: "Glow stick", emoji: "✨", bucket: "want" },
            { label: "Toy", emoji: "🧸", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs cover basics; wants are extras."
        },
        {
          id: "g6u1q2",
          question: "You plan your month. A budget helps you…",
          type: "multiple-choice",
          options: ["Plan spending", "Spend more", "Forget goals", "Avoid saving"],
          answerIndex: 0,
          feedback: "A budget tells you what to spend and save."
        },
        {
          id: "g6u1q3",
          question: "Shoes are a need.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Shoes protect your feet every day."
        },
        {
          id: "g6u1q4",
          question: "Match each item to Need or Want.",
          type: "matching",
          matchOptions: ["Need", "Want"],
          matches: [
            { left: "Lunch", right: "Need" },
            { left: "Notebook", right: "Need" },
            { left: "Phone case", right: "Want" },
            { left: "Candy", right: "Want" }
          ],
          answerIndex: 1,
          feedback: "Needs cover basics; wants are extras."
        },
        {
          id: "g6u1q5",
          question: "Why save money?",
          type: "multiple-choice",
          options: ["Reach bigger goals", "Spend faster", "Buy only candy", "Ignore goals"],
          answerIndex: 0,
          feedback: "Saving helps you afford bigger goals later."
        },
        {
          id: "g6u1q6",
          question: "A want is…",
          type: "multiple-choice",
          options: ["Extra for fun", "Something you must have", "Food", "Water"],
          answerIndex: 0,
          feedback: "Wants are extras, needs are must-haves."
        },
        {
          id: "g6u1q7",
          question: "You want a $60 item and save $10 each week. How many weeks?",
          type: "multiple-choice",
          options: ["6 weeks", "3 weeks", "10 weeks", "2 weeks"],
          answerIndex: 0,
          feedback: "Saving $10 for 6 weeks gives you $60."
        },
        {
          id: "g6u1q8",
          question: "Saving a little each week helps you reach goals.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Small savings add up over time."
        }
      ]
    },
    unit2: {
      title: "Unit 2 Quiz",
      questions: [
        {
          id: "g6u2q1",
          question: "You check two stores first. Comparing prices helps you…",
          type: "multiple-choice",
          options: ["Save money", "Spend more", "Forget goals", "Lose coins"],
          answerIndex: 0,
          feedback: "Comparing prices helps you keep more money."
        },
        {
          id: "g6u2q1b",
          question: "Drag each item into Needs or Wants for a smart plan.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Breakfast", emoji: "🍱", bucket: "need" },
            { label: "Jacket", emoji: "🧥", bucket: "need" },
            { label: "Bus pass", emoji: "🚌", bucket: "need" },
            { label: "Phone case", emoji: "📱", bucket: "want" },
            { label: "Candy", emoji: "🍬", bucket: "want" },
            { label: "Toy", emoji: "🧸", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs should be covered before fun extras."
        },
        {
          id: "g6u2q1c",
          question: "Sort the items into Needs and Wants for your budget.",
          type: "drag-sort",
          bucketLabels: { need: "Needs", want: "Wants" },
          items: [
            { label: "Water", emoji: "💧", bucket: "need" },
            { label: "Notebook", emoji: "📓", bucket: "need" },
            { label: "Shoes", emoji: "👟", bucket: "need" },
            { label: "Game", emoji: "🎮", bucket: "want" },
            { label: "Glow stick", emoji: "✨", bucket: "want" },
            { label: "Movie night", emoji: "🎬", bucket: "want" }
          ],
          answerIndex: 1,
          feedback: "Needs keep you healthy and ready; wants are extras."
        },
        {
          id: "g6u2q2",
          question: "If you earn $5 a week, after 4 weeks you have…",
          type: "multiple-choice",
          options: ["$20", "$10", "$15", "$25"],
          answerIndex: 0,
          feedback: "$5 x 4 weeks equals $20."
        },
        {
          id: "g6u2q3",
          question: "A phone case is a want, not a need.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "A phone case is optional, not required."
        },
        {
          id: "g6u2q4",
          question: "Match each item to Need or Want.",
          type: "matching",
          matchOptions: ["Need", "Want"],
          matches: [
            { left: "Breakfast", right: "Need" },
            { left: "Bus pass", right: "Need" },
            { left: "New game", right: "Want" },
            { left: "Glow stick", right: "Want" }
          ],
          answerIndex: 1,
          feedback: "Needs keep you ready for school and safety."
        },
        {
          id: "g6u2q5",
          question: "Good money habits include…",
          type: "multiple-choice",
          options: ["Saving and planning", "Spending fast", "Ignoring goals", "No budgeting"],
          answerIndex: 0,
          feedback: "Saving and planning are strong money habits."
        },
        {
          id: "g6u2q6",
          question: "When you want something, you should…",
          type: "multiple-choice",
          options: ["Set a goal", "Spend everything", "Forget it", "Buy it now"],
          answerIndex: 0,
          feedback: "Setting a goal helps you plan before buying."
        },
        {
          id: "g6u2q7",
          question: "You compare prices before buying to save money.",
          type: "true-false",
          options: ["True", "False"],
          answerIndex: 0,
          feedback: "Comparing prices helps you keep more money."
        },
        {
          id: "g6u2q8",
          question: "You want a $40 item and save $8 each week. How many weeks?",
          type: "multiple-choice",
          options: ["5 weeks", "4 weeks", "6 weeks", "3 weeks"],
          answerIndex: 0,
          feedback: "$8 saved for 5 weeks equals $40."
        }
      ]
    }
  }
};

export default assessmentsData;
