

// const lessonsData = {
//   grade4: {
//     unit1: [
//       {
//         id: 1,
//         title: "Smart Choices Start Here",
//         coinReward: 10,
//         context: [
//           {
//             term: "Decision Making",
//             definition:
//               "Decision making means stopping to think before you spend your money."
//           },
//           {
//             term: "Smart Choice",
//             definition:
//               "A smart choice helps you now or helps you reach an important goal later."
//           }
//         ],
//         tips: "Think about needs, goals, and tomorrow before spending today.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Toy or Bike",
//             scenarioText: "You earned $20 from helping at home. You want a bike that costs $80.",
//             walletAmount: 20,
//             goal: "Save for a bike",
//             heroEmoji: "🚲",
//             heroCaption: "Big goals take smart choices.",
//             question: "What should you do with your $20?",
//             generalHint: "Choose the option that gets you closer to the bike.",
//             options: [
//               {
//                 text: "Buy a toy today",
//                 subText: "Fun now",
//                 emoji: "🧸",
//                 hint: "The toy is fun, but it does not help your bike goal.",
//                 effect: "The toy was fun today, but now you are not closer to the bike.",
//                 isBest: false
//               },
//               {
//                 text: "Save the money",
//                 subText: "Goal first",
//                 emoji: "🐷",
//                 effect: "Great choice! Saving helps you get closer to your bike.",
//                 isBest: true
//               },
//               {
//                 text: "Spend half on snacks",
//                 subText: "A little now",
//                 emoji: "🍿",
//                 hint: "Even small spending can slow a big goal.",
//                 effect: "Spending some money means the bike will take longer.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Detective Desk",
//             scenarioText: "Kai wants a new soccer ball, but he also wants candy after school.",
//             goal: "Reach a bigger goal",
//             heroEmoji: "🕵️",
//             heroCaption: "Use clues before deciding.",
//             question: "Which choice is smarter?",
//             generalHint: "Think about what helps for longer than just one afternoon.",
//             cards: [
//               {
//                 id: "u1l1q2c1",
//                 coverEmoji: "🃏",
//                 emoji: "⚽",
//                 title: "Clue 1",
//                 text: "The soccer ball is something Kai can use again and again."
//               },
//               {
//                 id: "u1l1q2c2",
//                 coverEmoji: "🃏",
//                 emoji: "🍬",
//                 title: "Clue 2",
//                 text: "Candy is gone quickly and does not help with the bigger goal."
//               },
//               {
//                 id: "u1l1q2c3",
//                 coverEmoji: "🃏",
//                 emoji: "⏳",
//                 title: "Clue 3",
//                 text: "Waiting a little can help you afford something more useful."
//               },
//               {
//                 id: "u1l1q2c4",
//                 coverEmoji: "🃏",
//                 emoji: "🎯",
//                 title: "Clue 4",
//                 text: "Smart money choices often match a goal."
//               }
//             ],
//             options: [
//               {
//                 text: "Save for the soccer ball",
//                 isBest: true,
//                 effect: "Nice job! The clues showed that saving for the bigger goal is smarter."
//               },
//               {
//                 text: "Buy candy right away",
//                 isBest: false,
//                 hint: "Look at the clues again. Which choice lasts longer and fits the goal?"
//               }
//             ]
//           }
//         ]
//       },

//       {
//         id: 2,
//         title: "Needs and Wants Lab",
//         coinReward: 10,
//         context: [
//           {
//             term: "Need",
//             definition:
//               "A need is something important for living, learning, health, or safety."
//           },
//           {
//             term: "Want",
//             definition:
//               "A want is something fun or nice to have, but not necessary right now."
//           }
//         ],
//         tips: "Needs first. Wants later.",
//         questions: [
//           {
//             type: "drag-drop",
//             scenarioTitle: "Sort the Shopping Bag",
//             scenarioText: "Drag each item into the correct bucket, or use the quick buttons.",
//             heroEmoji: "🛍️",
//             heroCaption: "Can you tell the difference between needs and wants?",
//             question: "Which items are needs and which are wants?",
//             generalHint:
//               "Ask yourself: do I need this for living, learning, or health?",
//             successMessage: "Amazing! You sorted every item correctly.",
//             items: [
//               { id: "u1l2i1", label: "Water Bottle", emoji: "💧", bucket: "need" },
//               { id: "u1l2i2", label: "Lunch", emoji: "🥪", bucket: "need" },
//               { id: "u1l2i3", label: "Notebook", emoji: "📓", bucket: "need" },
//               { id: "u1l2i4", label: "Winter Coat", emoji: "🧥", bucket: "need" },
//               { id: "u1l2i5", label: "Candy", emoji: "🍬", bucket: "want" },
//               { id: "u1l2i6", label: "Toy Car", emoji: "🚗", bucket: "want" },
//               { id: "u1l2i7", label: "Video Game", emoji: "🎮", bucket: "want" },
//               { id: "u1l2i8", label: "Ice Cream", emoji: "🍦", bucket: "want" }
//             ]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Ready for School",
//             scenarioText: "You have $12 before school starts.",
//             walletAmount: 12,
//             goal: "Be prepared for class",
//             heroEmoji: "🏫",
//             heroCaption: "Needs help you learn and be ready.",
//             question: "What should you buy first?",
//             generalHint: "Think about what helps most with school today.",
//             options: [
//               {
//                 text: "A notebook",
//                 subText: "Useful for class",
//                 emoji: "📒",
//                 effect: "Correct! A notebook is a school need.",
//                 isBest: true
//               },
//               {
//                 text: "A sticker pack",
//                 subText: "Looks fun",
//                 emoji: "🌟",
//                 hint: "Stickers are fun, but they are not the most important thing for class.",
//                 effect: "Stickers are a want. A school need should come first.",
//                 isBest: false
//               },
//               {
//                 text: "A candy bag",
//                 subText: "Treat now",
//                 emoji: "🍭",
//                 hint: "Candy is a treat, not the most important school item.",
//                 effect: "Candy is a want, not a classroom need.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       },

//       {
//         id: 3,
//         title: "Goal Getter",
//         coinReward: 10,
//         context: [
//           {
//             term: "Goal",
//             definition: "A goal is something you are working toward."
//           },
//           {
//             term: "Save",
//             definition: "Saving means keeping some money for later."
//           }
//         ],
//         tips: "Goals get easier when you save step by step.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Skateboard Dream",
//             scenarioText: "You want a skateboard. You have $15 already saved.",
//             walletAmount: 15,
//             goal: "Save for a skateboard",
//             heroEmoji: "🛹",
//             heroCaption: "Small choices can help a big goal.",
//             question: "What is the smartest choice after school?",
//             generalHint: "Which choice helps the skateboard fund grow?",
//             options: [
//               {
//                 text: "Save today's money too",
//                 subText: "Stay on track",
//                 emoji: "💰",
//                 effect: "Excellent! Adding more money today helps your goal grow.",
//                 isBest: true
//               },
//               {
//                 text: "Buy two treats",
//                 subText: "Fun now",
//                 emoji: "🍪",
//                 hint: "Treats are okay sometimes, but they do not help the skateboard goal.",
//                 effect: "Those treats use money that could help your goal.",
//                 isBest: false
//               },
//               {
//                 text: "Buy a tiny toy",
//                 subText: "Small purchase",
//                 emoji: "🪀",
//                 hint: "Even small purchases can slow a big goal.",
//                 effect: "Small spending still makes the skateboard take longer.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "budget-builder",
//             scenarioTitle: "Save Most, Spend a Little",
//             scenarioText:
//               "You have $10. You want one small treat, but you also want to save most of your money.",
//             budget: 10,
//             heroEmoji: "🎯",
//             heroCaption: "Build a plan that matches your goal.",
//             question: "Pick the best set of items.",
//             generalHint:
//               "Choose one small extra and keep most of the money for savings.",
//             successMessage:
//               "Great job! You enjoyed one small extra and still protected your savings.",
//             showAnswerTip: true,
//             items: [
//               { id: "u1l3b1", name: "Fruit Snack", price: 2, emoji: "🍎", tag: "small treat" },
//               { id: "u1l3b2", name: "Candy Box", price: 6, emoji: "🍬", tag: "bigger treat" },
//               { id: "u1l3b3", name: "Sticker Sheet", price: 2, emoji: "🌈", tag: "extra fun" },
//               { id: "u1l3b4", name: "Save the Rest", price: 0, emoji: "🐷", tag: "goal money" }
//             ],
//             correctItemIds: ["u1l3b1", "u1l3b4"]
//           }
//         ]
//       },

//       {
//         id: 4,
//         title: "School Day Money Mission",
//         coinReward: 10,
//         context: [
//           {
//             term: "Important First",
//             definition:
//               "When money is limited, choose the most important thing first."
//           }
//         ],
//         tips: "Ask yourself: what matters most right now?",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Broken Backpack",
//             scenarioText: "Your backpack zipper broke. You also want a toy from the store.",
//             walletAmount: 25,
//             goal: "Be ready for school",
//             heroEmoji: "🎒",
//             heroCaption: "Solve the important problem first.",
//             question: "What should you do?",
//             generalHint: "Think about what helps you get through the school day.",
//             options: [
//               {
//                 text: "Buy a new backpack",
//                 subText: "Fix the problem",
//                 emoji: "🎒",
//                 effect: "Yes! The backpack is the important need right now.",
//                 isBest: true
//               },
//               {
//                 text: "Buy the toy",
//                 subText: "Fun choice",
//                 emoji: "🧸",
//                 hint: "The toy is fun, but it does not fix your school problem.",
//                 effect: "The toy is fun, but the backpack problem is still there.",
//                 isBest: false
//               },
//               {
//                 text: "Buy candy and juice",
//                 subText: "Treats today",
//                 emoji: "🧃",
//                 hint: "Treats are extras, not the most important need here.",
//                 effect: "Treats can wait when a school need comes first.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Lunch Line Clues",
//             scenarioText: "You brought $8 to school and need to make one smart choice.",
//             walletAmount: 8,
//             heroEmoji: "🧠",
//             heroCaption: "Use clues to decide what matters most.",
//             question: "What should come first today?",
//             generalHint: "Look for the choice that helps you through the day.",
//             cards: [
//               {
//                 id: "u1l4c1",
//                 coverEmoji: "🃏",
//                 emoji: "🍽️",
//                 title: "Clue 1",
//                 text: "Lunch helps you stay focused and ready to learn."
//               },
//               {
//                 id: "u1l4c2",
//                 coverEmoji: "🃏",
//                 emoji: "🍬",
//                 title: "Clue 2",
//                 text: "Candy is tasty, but it is not the most important item."
//               },
//               {
//                 id: "u1l4c3",
//                 coverEmoji: "🃏",
//                 emoji: "🏫",
//                 title: "Clue 3",
//                 text: "A school day goes better when your important needs are met."
//               },
//               {
//                 id: "u1l4c4",
//                 coverEmoji: "🃏",
//                 emoji: "✅",
//                 title: "Clue 4",
//                 text: "Smart choices are not always the most fun choices."
//               }
//             ],
//             options: [
//               {
//                 text: "Buy lunch first",
//                 isBest: true,
//                 effect: "Correct! Lunch is the important choice for the school day."
//               },
//               {
//                 text: "Buy candy first",
//                 isBest: false,
//                 hint: "Check the clues again. Which choice helps you most today?"
//               }
//             ]
//           }
//         ]
//       }
//     ],

//     unit2: [
//       {
//         id: 5,
//         title: "Price Detective",
//         coinReward: 10,
//         context: [
//           {
//             term: "Compare Prices",
//             definition:
//               "Comparing prices means looking at more than one choice before buying."
//           },
//           {
//             term: "Value",
//             definition:
//               "Value means getting something useful for a fair price."
//           }
//         ],
//         tips: "Smart shoppers compare before they buy.",
//         questions: [
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Pencil Mystery",
//             scenarioText: "One store sells one pencil for $4.",
//             heroEmoji: "✏️",
//             heroCaption: "Detectives compare clues before deciding.",
//             question: "Is that a smart price?",
//             generalHint: "Compare the item to what it usually costs.",
//             cards: [
//               {
//                 id: "u2l5c1",
//                 coverEmoji: "🃏",
//                 emoji: "🏪",
//                 title: "Clue 1",
//                 text: "A second store sells a pack of 4 pencils for $3."
//               },
//               {
//                 id: "u2l5c2",
//                 coverEmoji: "🃏",
//                 emoji: "📦",
//                 title: "Clue 2",
//                 text: "Getting more items for less money is often better value."
//               },
//               {
//                 id: "u2l5c3",
//                 coverEmoji: "🃏",
//                 emoji: "💸",
//                 title: "Clue 3",
//                 text: "Paying too much for one small item leaves less money for other needs."
//               },
//               {
//                 id: "u2l5c4",
//                 coverEmoji: "🃏",
//                 emoji: "🔍",
//                 title: "Clue 4",
//                 text: "Comparing prices helps shoppers avoid overpaying."
//               }
//             ],
//             options: [
//               {
//                 text: "No, it is too expensive",
//                 isBest: true,
//                 effect: "Exactly! Comparing stores showed the first price was not a good deal."
//               },
//               {
//                 text: "Yes, it is a smart price",
//                 isBest: false,
//                 hint: "Read the clues again. Was there a better deal somewhere else?"
//               }
//             ]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Two Water Bottles",
//             scenarioText: "You need a water bottle for school.",
//             walletAmount: 15,
//             goal: "Buy something useful and still save money",
//             heroEmoji: "🫗",
//             heroCaption: "Useful and affordable is often smartest.",
//             question: "Which choice is smarter?",
//             generalHint: "Look for the useful choice that still leaves money.",
//             options: [
//               {
//                 text: "Bottle for $15 with sparkles",
//                 subText: "Looks cool",
//                 emoji: "✨",
//                 hint: "It looks cool, but it uses all your money.",
//                 effect: "You bought a bottle, but you spent all your money.",
//                 isBest: false
//               },
//               {
//                 text: "Bottle for $8",
//                 subText: "Still useful",
//                 emoji: "💧",
//                 effect: "Great shopping! You got what you need and kept some money too.",
//                 isBest: true
//               }
//             ]
//           }
//         ]
//       },

//       {
//         id: 6,
//         title: "Budget Builder",
//         coinReward: 10,
//         context: [
//           {
//             term: "Budget",
//             definition:
//               "A budget is a plan for how to use your money."
//           }
//         ],
//         tips: "Pick the most important things first and stay inside the budget.",
//         questions: [
//           {
//             type: "budget-builder",
//             scenarioTitle: "Movie Night Basket",
//             scenarioText: "You have $12 for a family movie night at home.",
//             budget: 12,
//             heroEmoji: "🎬",
//             heroCaption: "Can you build a smart basket?",
//             question: "Choose the best items without going over budget.",
//             generalHint: "Pick the basic things first, then see if any money is left.",
//             successMessage:
//               "Awesome! You stayed within budget and picked a smart set of items.",
//             showAnswerTip: true,
//             items: [
//               { id: "u2l6i1", name: "Popcorn", price: 4, emoji: "🍿", tag: "shared snack" },
//               { id: "u2l6i2", name: "Juice Box Pack", price: 3, emoji: "🧃", tag: "drink" },
//               { id: "u2l6i3", name: "Napkins", price: 2, emoji: "🧻", tag: "useful" },
//               { id: "u2l6i4", name: "Glow Stick", price: 5, emoji: "✨", tag: "extra fun" },
//               { id: "u2l6i5", name: "Candy Bag", price: 8, emoji: "🍬", tag: "pricey extra" }
//             ],
//             correctItemIds: ["u2l6i1", "u2l6i2", "u2l6i3"]
//           },
//           {
//             type: "budget-builder",
//             scenarioTitle: "Art Day Plan",
//             scenarioText: "Your class art table has $10 to spend.",
//             budget: 10,
//             heroEmoji: "🎨",
//             heroCaption: "Budgets help teams choose wisely.",
//             question: "Which plan makes the most sense?",
//             generalHint: "Pick the items needed to do the activity first.",
//             successMessage:
//               "Nice work! You used the budget for the most important art supplies.",
//             items: [
//               { id: "u2l6a1", name: "Paper", price: 3, emoji: "📄", tag: "need" },
//               { id: "u2l6a2", name: "Markers", price: 4, emoji: "🖍️", tag: "need" },
//               { id: "u2l6a3", name: "Glitter", price: 4, emoji: "✨", tag: "extra" },
//               { id: "u2l6a4", name: "Tape", price: 2, emoji: "🧷", tag: "helpful" },
//               { id: "u2l6a5", name: "Candy", price: 3, emoji: "🍭", tag: "not for art" }
//             ],
//             correctItemIds: ["u2l6a1", "u2l6a2", "u2l6a4"]
//           }
//         ]
//       },

//       {
//         id: 7,
//         title: "Shopping Challenge",
//         coinReward: 10,
//         context: [
//           {
//             term: "Best Deal",
//             definition:
//               "A best deal gives you what you need at a better price or in a smarter way."
//           }
//         ],
//         tips: "A good deal is not just cheap. It should also match what you need.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Snack Shop",
//             scenarioText: "You want one snack after school and still want to save money.",
//             walletAmount: 6,
//             goal: "Enjoy something small and keep some money",
//             heroEmoji: "🛒",
//             heroCaption: "A smart choice can balance fun and saving.",
//             question: "Which is the best value?",
//             generalHint: "Look for the choice that gives you a snack and still leaves money.",
//             options: [
//               {
//                 text: "One tiny candy for $6",
//                 subText: "All your money",
//                 emoji: "🍬",
//                 hint: "That uses all your money for one small item.",
//                 effect: "That was not a great deal because it used all your money.",
//                 isBest: false
//               },
//               {
//                 text: "A snack for $3 and save $3",
//                 subText: "Balanced choice",
//                 emoji: "🥨",
//                 effect: "Exactly! You got a snack and still saved half your money.",
//                 isBest: true
//               },
//               {
//                 text: "Spend all $6 because you can",
//                 subText: "No plan",
//                 emoji: "💸",
//                 hint: "Having money does not mean you need to spend everything.",
//                 effect: "A smart shopper does not spend everything just because they can.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "The Big Sale Sign",
//             scenarioText: "A store says 'SUPER DEAL!' on a toy display.",
//             heroEmoji: "📣",
//             heroCaption: "Ads can grab attention, but smart shoppers still think.",
//             question: "What should you do first?",
//             generalHint: "A sign is not enough. Smart shoppers still compare and think.",
//             cards: [
//               {
//                 id: "u2l7c1",
//                 coverEmoji: "🃏",
//                 emoji: "🏷️",
//                 title: "Clue 1",
//                 text: "A sale sign can be helpful, but it does not always mean best value."
//               },
//               {
//                 id: "u2l7c2",
//                 coverEmoji: "🃏",
//                 emoji: "🔍",
//                 title: "Clue 2",
//                 text: "You should still look at the price and compare."
//               },
//               {
//                 id: "u2l7c3",
//                 coverEmoji: "🃏",
//                 emoji: "🎯",
//                 title: "Clue 3",
//                 text: "The toy also needs to fit your goal or budget."
//               },
//               {
//                 id: "u2l7c4",
//                 coverEmoji: "🃏",
//                 emoji: "🧠",
//                 title: "Clue 4",
//                 text: "Smart shopping means thinking, not just reacting."
//               }
//             ],
//             options: [
//               {
//                 text: "Compare the price and think first",
//                 isBest: true,
//                 effect: "Correct! A smart shopper checks the price and thinks before buying."
//               },
//               {
//                 text: "Buy it right away because of the sign",
//                 isBest: false,
//                 hint: "Look at the clues again. Does a big sign always mean smartest choice?"
//               }
//             ]
//           }
//         ]
//       },

//       {
//         id: 8,
//         title: "Class Party Planner",
//         coinReward: 10,
//         context: [
//           {
//             term: "Planning",
//             definition:
//               "Planning means thinking ahead so your money works better."
//           }
//         ],
//         tips: "The most exciting choice is not always the smartest one.",
//         questions: [
//           {
//             type: "budget-builder",
//             scenarioTitle: "Party Table Plan",
//             scenarioText: "You have $15 to help set up a simple class party table.",
//             budget: 15,
//             heroEmoji: "🎉",
//             heroCaption: "Plan the table without overspending.",
//             question: "Pick the smartest set of items.",
//             generalHint: "Choose what the whole group needs first.",
//             successMessage: "Nice planning! You used the money for a practical party setup.",
//             items: [
//               { id: "u2l8p1", name: "Cups", price: 3, emoji: "🥤", tag: "need" },
//               { id: "u2l8p2", name: "Napkins", price: 2, emoji: "🧻", tag: "need" },
//               { id: "u2l8p3", name: "Fruit Tray", price: 6, emoji: "🍉", tag: "shared food" },
//               { id: "u2l8p4", name: "Glitter Banner", price: 7, emoji: "✨", tag: "extra" },
//               { id: "u2l8p5", name: "Party Horns", price: 5, emoji: "📯", tag: "extra" }
//             ],
//             correctItemIds: ["u2l8p1", "u2l8p2", "u2l8p3"]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "One More Choice",
//             scenarioText: "After buying the basics, you have a little money left.",
//             walletAmount: 4,
//             goal: "Keep the party useful and fun",
//             heroEmoji: "🤝",
//             heroCaption: "Think about the whole group.",
//             question: "What is the smartest final choice?",
//             generalHint: "Pick something that helps the group most.",
//             options: [
//               {
//                 text: "Save the extra money",
//                 subText: "No waste",
//                 emoji: "🐷",
//                 effect: "Great choice! Saving extra money is a smart way to avoid waste.",
//                 isBest: true
//               },
//               {
//                 text: "Buy random candy",
//                 subText: "Spend it anyway",
//                 emoji: "🍬",
//                 hint: "Spending just because money is left is not always smart.",
//                 effect: "Random spending is not the strongest plan.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       }
//     ],

//     unit3: [
//       {
//         id: 9,
//         title: "Saving Step by Step",
//         coinReward: 10,
//         context: [
//           {
//             term: "Small Steps",
//             definition:
//               "Big goals can be reached with many small saving steps."
//           }
//         ],
//         tips: "You do not need all the money at once. Keep building.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Toy Fund",
//             scenarioText: "A toy costs $24. You can save $4 each week.",
//             walletAmount: 4,
//             goal: "Buy the toy in a few weeks",
//             heroEmoji: "🗓️",
//             heroCaption: "Small weekly steps can reach a big goal.",
//             question: "What should you do this week?",
//             generalHint: "This week still matters, even if the goal is not finished yet.",
//             options: [
//               {
//                 text: "Save the $4",
//                 subText: "One more step",
//                 emoji: "💰",
//                 effect: "Correct! Saving this week moves you one step closer.",
//                 isBest: true
//               },
//               {
//                 text: "Spend it on a snack",
//                 subText: "Fun now",
//                 emoji: "🍪",
//                 hint: "That uses the money you wanted for the toy.",
//                 effect: "The snack was fun, but it slows your toy goal.",
//                 isBest: false
//               },
//               {
//                 text: "Buy stickers",
//                 subText: "Small extra",
//                 emoji: "🌟",
//                 hint: "Stickers are extra and use the money you planned to save.",
//                 effect: "That choice delays the toy a little more.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Halfway There",
//             scenarioText: "You have saved $15 toward a $30 goal.",
//             heroEmoji: "📈",
//             heroCaption: "Tracking helps you see progress.",
//             question: "What does this mean?",
//             generalHint: "Think about how far $15 is toward $30.",
//             cards: [
//               {
//                 id: "u3l9c1",
//                 coverEmoji: "🃏",
//                 emoji: "1️⃣",
//                 title: "Clue 1",
//                 text: "$15 is exactly half of $30."
//               },
//               {
//                 id: "u3l9c2",
//                 coverEmoji: "🃏",
//                 emoji: "📍",
//                 title: "Clue 2",
//                 text: "Halfway means you still need the other half."
//               },
//               {
//                 id: "u3l9c3",
//                 coverEmoji: "🃏",
//                 emoji: "🙌",
//                 title: "Clue 3",
//                 text: "Being halfway is a good reason to keep going."
//               },
//               {
//                 id: "u3l9c4",
//                 coverEmoji: "🃏",
//                 emoji: "🚫",
//                 title: "Clue 4",
//                 text: "Halfway does not mean finished."
//               }
//             ],
//             options: [
//               {
//                 text: "You are halfway to the goal",
//                 isBest: true,
//                 effect: "Yes! You are halfway, which means your saving plan is working."
//               },
//               {
//                 text: "You should spend it now",
//                 isBest: false,
//                 hint: "Check the clues again. Is halfway the same as finished?"
//               }
//             ]
//           }
//         ]
//       },

//       {
//         id: 10,
//         title: "Goal Tracker Game",
//         coinReward: 10,
//         context: [
//           {
//             term: "Tracking",
//             definition:
//               "Tracking means checking how close you are to your goal."
//           }
//         ],
//         tips: "Tracking can help you stay motivated and keep your plan going.",
//         questions: [
//           {
//             type: "budget-builder",
//             scenarioTitle: "Sticker Chart Supplies",
//             scenarioText: "You are building a goal tracker chart. You have $8 for supplies.",
//             budget: 8,
//             heroEmoji: "📊",
//             heroCaption: "Build a simple tracker without overspending.",
//             question: "Pick the best supplies for the tracker.",
//             generalHint: "Choose the items that help you track progress, not extra decorations first.",
//             successMessage:
//               "Great! You built a useful tracker and stayed on budget.",
//             items: [
//               { id: "u3l10i1", name: "Chart Paper", price: 3, emoji: "📄", tag: "need" },
//               { id: "u3l10i2", name: "Marker", price: 2, emoji: "🖊️", tag: "need" },
//               { id: "u3l10i3", name: "Star Stickers", price: 3, emoji: "⭐", tag: "helpful" },
//               { id: "u3l10i4", name: "Toy Figure", price: 6, emoji: "🧸", tag: "not for tracking" }
//             ],
//             correctItemIds: ["u3l10i1", "u3l10i2", "u3l10i3"]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Keep Going",
//             scenarioText: "Your goal is not finished yet, but you can see progress on your chart.",
//             heroEmoji: "🚀",
//             heroCaption: "Progress can keep you motivated.",
//             question: "What should you do next?",
//             generalHint: "Tracking helps you keep moving forward.",
//             options: [
//               {
//                 text: "Keep saving",
//                 subText: "Stay motivated",
//                 emoji: "🐷",
//                 effect: "Excellent! The tracker helps you keep going.",
//                 isBest: true
//               },
//               {
//                 text: "Quit because it is not done yet",
//                 subText: "Give up",
//                 emoji: "😕",
//                 hint: "A goal does not need to be finished right away to be working.",
//                 effect: "Tracking is meant to help you keep going, not quit.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       },

//       {
//         id: 11,
//         title: "Emergency or Extra",
//         coinReward: 10,
//         context: [
//           {
//             term: "Emergency Need",
//             definition:
//               "Sometimes money must be used for an important problem or need."
//           }
//         ],
//         tips: "When a real need appears, it often comes before extras.",
//         questions: [
//           {
//             type: "drag-drop",
//             scenarioTitle: "Sort the Situations",
//             scenarioText: "Sort each item into Needs or Wants.",
//             heroEmoji: "🚨",
//             heroCaption: "Some choices are more important because of the situation.",
//             question: "Which items belong where?",
//             successMessage: "Perfect! You understood which choices are urgent needs and which are extras.",
//             generalHint:
//               "A need solves a real problem. A want is extra fun or comfort.",
//             items: [
//               { id: "u3l11i1", label: "Medicine", emoji: "💊", bucket: "need" },
//               { id: "u3l11i2", label: "New Lunch Box", emoji: "🥪", bucket: "need" },
//               { id: "u3l11i3", label: "Umbrella in Rain", emoji: "☔", bucket: "need" },
//               { id: "u3l11i4", label: "Warm Gloves", emoji: "🧤", bucket: "need" },
//               { id: "u3l11i5", label: "Candy", emoji: "🍬", bucket: "want" },
//               { id: "u3l11i6", label: "Glow Bracelet", emoji: "💫", bucket: "want" },
//               { id: "u3l11i7", label: "Trading Cards", emoji: "🃏", bucket: "want" },
//               { id: "u3l11i8", label: "Fancy Pencil Topper", emoji: "🎀", bucket: "want" }
//             ]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Rainy Walk Home",
//             scenarioText: "It is raining hard. You only have enough money for one item.",
//             heroEmoji: "🌧️",
//             heroCaption: "The situation can change what matters most.",
//             question: "Which choice is smartest right now?",
//             generalHint: "Think about what helps most in the weather today.",
//             options: [
//               {
//                 text: "Buy an umbrella",
//                 subText: "Useful today",
//                 emoji: "☔",
//                 effect: "Correct! The umbrella solves the important problem right now.",
//                 isBest: true
//               },
//               {
//                 text: "Buy a candy bar",
//                 subText: "Treat first",
//                 emoji: "🍫",
//                 hint: "Candy is extra, but the rain problem is more important.",
//                 effect: "Candy is a want. The umbrella is the important need today.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       },

//       {
//         id: 12,
//         title: "Celebrate Smartly",
//         coinReward: 10,
//         context: [
//           {
//             term: "Balanced Choice",
//             definition:
//               "A balanced choice can include a little fun without forgetting your goal."
//           }
//         ],
//         tips: "It is okay to enjoy small fun things when the plan still makes sense.",
//         questions: [
//           {
//             type: "budget-builder",
//             scenarioTitle: "Birthday Treat Plan",
//             scenarioText: "You have $14. You want a small birthday treat but also want to save some money.",
//             budget: 14,
//             heroEmoji: "🎂",
//             heroCaption: "Can you celebrate and still save?",
//             question: "Choose the smartest plan.",
//             generalHint: "Pick one small treat and keep part of the money safe.",
//             successMessage:
//               "Nice balance! You had a little celebration and still saved money.",
//             items: [
//               { id: "u3l12i1", name: "Cupcake", price: 3, emoji: "🧁", tag: "small treat" },
//               { id: "u3l12i2", name: "Juice", price: 2, emoji: "🧃", tag: "drink" },
//               { id: "u3l12i3", name: "Big Candy Box", price: 8, emoji: "🍬", tag: "larger extra" },
//               { id: "u3l12i4", name: "Save the Rest", price: 0, emoji: "🐷", tag: "goal money" }
//             ],
//             correctItemIds: ["u3l12i1", "u3l12i4"]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "After the Celebration",
//             scenarioText: "You still care about your bigger goal after your birthday.",
//             heroEmoji: "🎯",
//             heroCaption: "Fun and goals can work together when you plan.",
//             question: "What should you remember next?",
//             generalHint: "Think about how your plan helped you celebrate and still save.",
//             options: [
//               {
//                 text: "Keep saving after the small treat",
//                 subText: "Back to the plan",
//                 emoji: "💰",
//                 effect: "Exactly! A small treat is okay when you keep the bigger plan going.",
//                 isBest: true
//               },
//               {
//                 text: "Stop saving because you already had fun",
//                 subText: "Forget the goal",
//                 emoji: "🛑",
//                 hint: "A small celebration does not mean the goal disappears.",
//                 effect: "The strongest choice is to enjoy a little fun and still continue your goal.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       }
//     ],
//     unit4: [
//       {
//         id: 13,
//         title: "Ways to Earn Money",
//         coinReward: 10,
//         context: [
//           {
//             term: "Earn",
//             definition:
//               "Earning money means doing helpful work or completing a useful task."
//           }
//         ],
//         tips: "Money is often earned by helping, working, or doing a job well.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Helping at Home",
//             scenarioText: "You want money for a goal.",
//             walletAmount: 0,
//             goal: "Find a good way to earn",
//             heroEmoji: "🧹",
//             heroCaption: "Helpful work can become earning.",
//             question: "What is a good way to earn money?",
//             generalHint: "Think about useful jobs you can do safely.",
//             options: [
//               {
//                 text: "Do chores",
//                 subText: "Helpful job",
//                 emoji: "🧹",
//                 effect: "Correct! Helping with chores can be a good way to earn money.",
//                 isBest: true
//               },
//               {
//                 text: "Wait and hope money appears",
//                 subText: "No plan",
//                 emoji: "💭",
//                 hint: "Money usually comes from a plan or effort.",
//                 effect: "Waiting without a plan is not a strong way to earn.",
//                 isBest: false
//               },
//               {
//                 text: "Spend before you earn",
//                 subText: "Wrong order",
//                 emoji: "💸",
//                 hint: "Spending comes after you have money, not before.",
//                 effect: "A smart plan starts with earning first.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Neighbor Helper",
//             scenarioText: "A neighbor needs help watering plants.",
//             heroEmoji: "🌱",
//             heroCaption: "Use the clues to find the best earning habit.",
//             question: "What makes this a smart earning choice?",
//             generalHint: "Think about being helpful and responsible.",
//             cards: [
//               {
//                 id: "u4l13c1",
//                 coverEmoji: "🃏",
//                 emoji: "🤝",
//                 title: "Clue 1",
//                 text: "Helpful work can be a fair way to earn money."
//               },
//               {
//                 id: "u4l13c2",
//                 coverEmoji: "🃏",
//                 emoji: "✅",
//                 title: "Clue 2",
//                 text: "Doing the job well matters."
//               },
//               {
//                 id: "u4l13c3",
//                 coverEmoji: "🃏",
//                 emoji: "🕒",
//                 title: "Clue 3",
//                 text: "Being on time and reliable is important."
//               },
//               {
//                 id: "u4l13c4",
//                 coverEmoji: "🃏",
//                 emoji: "💰",
//                 title: "Clue 4",
//                 text: "Money is usually earned after effort."
//               }
//             ],
//             options: [
//               {
//                 text: "Help and do the job well",
//                 isBest: true,
//                 effect: "Great! Helpful work done responsibly is a strong earning habit."
//               },
//               {
//                 text: "Ask for money without helping",
//                 isBest: false,
//                 hint: "Check the clues again. What comes before earning?"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 14,
//         title: "Spend, Save, Share",
//         coinReward: 10,
//         context: [
//           {
//             term: "Share",
//             definition:
//               "Sharing means using some of your money to help others."
//           }
//         ],
//         tips: "A good money plan can include spending, saving, and sharing.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Three Good Uses",
//             scenarioText: "You earned $12 this week.",
//             walletAmount: 12,
//             goal: "Use money wisely",
//             heroEmoji: "🪙",
//             heroCaption: "Balanced plans are strong plans.",
//             question: "What is a balanced plan?",
//             generalHint: "A smart plan can do more than one good thing.",
//             options: [
//               {
//                 text: "Spend some, save some, share some",
//                 subText: "Balanced plan",
//                 emoji: "⚖️",
//                 effect: "Excellent! That is a balanced and thoughtful money plan.",
//                 isBest: true
//               },
//               {
//                 text: "Spend every dollar",
//                 subText: "All now",
//                 emoji: "💸",
//                 hint: "Using all your money right away leaves nothing for later or for helping.",
//                 effect: "Spending all of it removes balance from your plan.",
//                 isBest: false
//               },
//               {
//                 text: "Hide every dollar forever",
//                 subText: "Only save",
//                 emoji: "🫙",
//                 hint: "Saving matters, but money can also be used wisely and kindly.",
//                 effect: "A stronger plan is usually more balanced than this.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "budget-builder",
//             scenarioTitle: "Weekend Money Plan",
//             scenarioText: "You have $10 for the weekend.",
//             budget: 10,
//             heroEmoji: "📅",
//             heroCaption: "Can you make a balanced money plan?",
//             question: "Pick the best set of choices.",
//             generalHint: "Choose something for spending, something for saving, and something kind.",
//             successMessage: "Nice work! You made a balanced spend-save-share plan.",
//             items: [
//               { id: "u4l14i1", name: "Small Treat", price: 2, emoji: "🍪", tag: "spend" },
//               { id: "u4l14i2", name: "Save the Rest", price: 0, emoji: "🐷", tag: "save" },
//               { id: "u4l14i3", name: "Charity Box", price: 2, emoji: "❤️", tag: "share" },
//               { id: "u4l14i4", name: "Big Candy Bag", price: 6, emoji: "🍬", tag: "extra spend" },
//               { id: "u4l14i5", name: "Toy Car", price: 8, emoji: "🧸", tag: "big spend" }
//             ],
//             correctItemIds: ["u4l14i1", "u4l14i2", "u4l14i3"]
//           }
//         ]
//       },
//       {
//         id: 15,
//         title: "Big Goals Take Time",
//         coinReward: 10,
//         context: [
//           {
//             term: "Long-Term Goal",
//             definition:
//               "A long-term goal is something that takes more time and patience to reach."
//           }
//         ],
//         tips: "Big goals often need patience, planning, and regular saving.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "New Bike Plan",
//             scenarioText: "A bike is expensive, so you need a plan.",
//             walletAmount: 10,
//             goal: "Save for a bike",
//             heroEmoji: "🚲",
//             heroCaption: "Big goals are built step by step.",
//             question: "What is the strongest idea?",
//             generalHint: "A big goal is usually not reached in one day.",
//             options: [
//               {
//                 text: "Save regularly over time",
//                 subText: "Keep building",
//                 emoji: "🐷",
//                 effect: "Correct! Big goals usually need regular saving.",
//                 isBest: true
//               },
//               {
//                 text: "Give up because it costs a lot",
//                 subText: "Too hard",
//                 emoji: "😕",
//                 hint: "Big goals can still be reached with a plan.",
//                 effect: "A good plan can make a big goal feel possible.",
//                 isBest: false
//               },
//               {
//                 text: "Spend your money on treats each week",
//                 subText: "Fun now",
//                 emoji: "🍭",
//                 hint: "Treats use the money that could build the bike fund.",
//                 effect: "Those treats slow the bike goal down.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Stay Motivated",
//             scenarioText: "Your goal still feels far away.",
//             heroEmoji: "🎯",
//             heroCaption: "Progress matters even before the finish line.",
//             question: "What should you remember?",
//             generalHint: "Big goals are often built from many small wins.",
//             cards: [
//               {
//                 id: "u4l15c1",
//                 coverEmoji: "🃏",
//                 emoji: "👣",
//                 title: "Clue 1",
//                 text: "Every small saving step matters."
//               },
//               {
//                 id: "u4l15c2",
//                 coverEmoji: "🃏",
//                 emoji: "📅",
//                 title: "Clue 2",
//                 text: "Saving often works better than waiting for one huge amount."
//               },
//               {
//                 id: "u4l15c3",
//                 coverEmoji: "🃏",
//                 emoji: "📈",
//                 title: "Clue 3",
//                 text: "Progress can be slow and still be real progress."
//               },
//               {
//                 id: "u4l15c4",
//                 coverEmoji: "🃏",
//                 emoji: "🙌",
//                 title: "Clue 4",
//                 text: "Staying patient helps long-term goals."
//               }
//             ],
//             options: [
//               {
//                 text: "Every small step counts",
//                 isBest: true,
//                 effect: "Correct! Small steps really do matter."
//               },
//               {
//                 text: "Only big amounts count",
//                 isBest: false,
//                 hint: "Look at the clues again. Can small steps still build a big goal?"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 16,
//         title: "Money Mission Final Challenge",
//         coinReward: 25,
//         context: [
//           {
//             term: "Money Mission",
//             definition:
//               "A money mission is using everything you learned to make strong choices."
//           }
//         ],
//         tips: "Use all your money skills together: think, compare, save, and choose wisely.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Mission 1",
//             scenarioText: "You have $20. You need a notebook and want candy.",
//             walletAmount: 20,
//             goal: "Choose wisely",
//             heroEmoji: "📓",
//             heroCaption: "Needs first.",
//             question: "What is the smartest plan?",
//             generalHint: "Think about what matters most today.",
//             options: [
//               {
//                 text: "Buy the notebook first and save the rest",
//                 subText: "Need first",
//                 emoji: "✅",
//                 effect: "Excellent! You handled your need first and still saved money.",
//                 isBest: true
//               },
//               {
//                 text: "Buy lots of candy first",
//                 subText: "Treat first",
//                 emoji: "🍬",
//                 hint: "Candy is a want. What comes first?",
//                 effect: "Candy is a want, but the notebook is more important.",
//                 isBest: false
//               },
//               {
//                 text: "Spend all $20 on treats",
//                 subText: "Use it all",
//                 emoji: "💸",
//                 hint: "That leaves nothing for the notebook or savings.",
//                 effect: "That plan uses your money too quickly.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "budget-builder",
//             scenarioTitle: "Mission 2 Basket",
//             scenarioText: "You have $10 to prepare for a study night.",
//             budget: 10,
//             heroEmoji: "🧠",
//             heroCaption: "Can you build a smart study basket?",
//             question: "Pick the best set of items.",
//             generalHint: "Choose useful items before extra treats.",
//             successMessage: "Great job! You built a smart study plan.",
//             items: [
//               { id: "u4l16i1", name: "Notebook", price: 4, emoji: "📓", tag: "need" },
//               { id: "u4l16i2", name: "Pencil", price: 2, emoji: "✏️", tag: "need" },
//               { id: "u4l16i3", name: "Water", price: 2, emoji: "💧", tag: "helpful" },
//               { id: "u4l16i4", name: "Candy Box", price: 6, emoji: "🍬", tag: "extra" }
//             ],
//             correctItemIds: ["u4l16i1", "u4l16i2", "u4l16i3"]
//           }
//         ]
//       }
//     ],
//     game: [
//       {
//         id: 8,
//         title: "Investment Game",
//         type: "goal-builder",
//         goal: {
//           item: "Bike",
//           cost: 50
//         },
//         startingMoney: 35,
//         startingFun: 7,
//         targetFun: 7,
//         actions: [
//           // money increase
//           {
//             text: "Save $5",
//             img: "https://pngimg.com/d/piggy_bank_PNG56.png",
//             saveAmount: 5,
//             funChange: -1,
//             weight: 3
//           },
//           {
//             text: "Do chores",
//             img: "https://static.vecteezy.com/system/resources/thumbnails/060/539/488/small/student-boy-sitting-at-home-office-desk-doing-school-homework-surfing-internet-on-desktop-computer-vector.jpg",
//             earnAmount: 6,
//             funChange: -2,
//             weight: 2
//           },
//           {
//             text: "Sell old toy",
//             img: "https://png.pngtree.com/png-vector/20230728/ourmid/pngtree-toy-drive-vector-png-image_7014253.png",
//             earnAmount: 8,
//             funChange: -2,
//             weight: 1
//           },

//           // money decrease
//           {
//             text: "Buy candy",
//             img: "https://cdn-icons-png.flaticon.com/512/9356/9356709.png",
//             spendAmount: 3,
//             funChange: 1,
//             weight: 4
//           },
//           {
//             text: "Buy ice cream",
//             img: "https://cdn-icons-png.flaticon.com/512/3250/3250484.png",
//             spendAmount: 5,
//             funChange: 2,
//             weight: 3
//           },
//           {
//             text: "Go to arcade",
//             img: "https://cdn-icons-png.flaticon.com/512/8848/8848930.png",
//             spendAmount: 8,
//             funChange: 4,
//             weight: 2
//           },
//           {
//             text: "Buy a snack",
//             img: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
//             spendAmount: 2,
//             funChange: 1,
//             weight: 5
//           },
//           {
//             text: "Watch a movie",
//             img: "https://www.shutterstock.com/image-vector/kids-watching-movie-theater-vector-260nw-2606822691.jpg",
//             spendAmount: 7,
//             funChange: 3,
//             weight: 3
//           },
//           {
//             text: "Go to theme park",
//             img: "https://img.freepik.com/free-vector/scene-funfair_1308-30721.jpg?semt=ais_hybrid&w=740&q=80",
//             spendAmount: 12,
//             funChange: 5,
//             weight: 1
//           },
//           {
//             text: "Go bowling",
//             img: "https://img.freepik.com/premium-vector/cartoon-bowling-game-with-red-ball-white-pins_864013-4465.jpg",
//             spendAmount: 9,
//             funChange: 3,
//             weight: 2
//           },
//           {
//             text: "Buy a comic book",
//             img: "https://www.shutterstock.com/shutterstock/photos/106466321/display_1500/stock-vector-cartoon-boy-reading-a-comic-book-isolated-on-white-106466321.jpg",
//             spendAmount: 6,
//             funChange: 2,
//             weight: 2
//           }
//         ]
//       }
//     ]
//   }, 
//     grade5: {
//     unit1: [
//       {
//         id: 1,
//         title: "Smarter Spending Choices",
//         coinReward: 25,
//         context: [
//           {
//             term: "Trade-Off",
//             definition:
//               "A trade-off means choosing one thing means giving up something else."
//           },
//           {
//             term: "Priority",
//             definition:
//               "A priority is the most important thing to handle first."
//           }
//         ],
//         tips: "Think about what you give up when you spend money.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Shoes or Sweets",
//             scenarioText: "You have $18. Your gym shoes are worn out, but you also want snacks after school.",
//             walletAmount: 18,
//             goal: "Be ready for gym class",
//             heroEmoji: "👟",
//             heroCaption: "Some choices matter more right now.",
//             question: "What is the smartest choice?",
//             generalHint: "Choose the option that solves the more important problem first.",
//             options: [
//               {
//                 text: "Buy the gym shoes",
//                 subText: "Need first",
//                 emoji: "👟",
//                 effect: "Correct! The shoes are the higher priority because you need them for class.",
//                 isBest: true
//               },
//               {
//                 text: "Buy snacks after school",
//                 subText: "Fun now",
//                 emoji: "🍿",
//                 hint: "Snacks are enjoyable, but they do not fix the school need.",
//                 effect: "Snacks are fun, but the shoe problem is still not solved.",
//                 isBest: false
//               },
//               {
//                 text: "Buy candy for friends",
//                 subText: "Kind but extra",
//                 emoji: "🍬",
//                 hint: "Kindness matters, but important needs should still come first.",
//                 effect: "That is kind, but the gym shoes are still the bigger priority.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Choice Clues",
//             scenarioText: "Mia wants headphones, but she also keeps buying small treats.",
//             goal: "Reach a bigger goal faster",
//             heroEmoji: "🎧",
//             heroCaption: "Look for the hidden trade-off.",
//             question: "What is Mia giving up when she buys treats often?",
//             generalHint: "Think about what repeated small spending does to a bigger goal.",
//             cards: [
//               {
//                 id: "g5u1l1c1",
//                 coverEmoji: "🃏",
//                 emoji: "💸",
//                 title: "Clue 1",
//                 text: "Small purchases can add up quickly."
//               },
//               {
//                 id: "g5u1l1c2",
//                 coverEmoji: "🃏",
//                 emoji: "🎯",
//                 title: "Clue 2",
//                 text: "A goal usually takes longer when money is spent on extras."
//               },
//               {
//                 id: "g5u1l1c3",
//                 coverEmoji: "🃏",
//                 emoji: "⏳",
//                 title: "Clue 3",
//                 text: "Waiting can help a larger goal happen sooner."
//               },
//               {
//                 id: "g5u1l1c4",
//                 coverEmoji: "🃏",
//                 emoji: "🧠",
//                 title: "Clue 4",
//                 text: "A smart choice considers both now and later."
//               }
//             ],
//             options: [
//               {
//                 text: "She gives up faster progress on the headphones",
//                 isBest: true,
//                 effect: "Exactly! The trade-off is slower progress on the bigger goal."
//               },
//               {
//                 text: "She gives up nothing important",
//                 isBest: false,
//                 hint: "Check the clues again. Do small purchases affect the bigger goal?"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 2,
//         title: "Needs, Wants, and Priorities",
//         coinReward: 25,
//         context: [
//           {
//             term: "Priority Order",
//             definition:
//               "Priority order means ranking what should come first, second, and later."
//           }
//         ],
//         tips: "Sometimes more than one thing matters, but one still comes first.",
//         questions: [
//           {
//             type: "drag-drop",
//             scenarioTitle: "Sort by Importance",
//             scenarioText: "Sort each item into Need or Want.",
//             heroEmoji: "📦",
//             heroCaption: "Think carefully about what matters most.",
//             question: "Which items are needs and which are wants?",
//             generalHint: "A need helps with health, learning, safety, or daily life.",
//             successMessage: "Awesome! You sorted the items correctly.",
//             items: [
//               { id: "g5u1l2i1", label: "Bus Pass", emoji: "🚌", bucket: "need" },
//               { id: "g5u1l2i2", label: "Lunch", emoji: "🥗", bucket: "need" },
//               { id: "g5u1l2i3", label: "Calculator for class", emoji: "🧮", bucket: "need" },
//               { id: "g5u1l2i4", label: "Rain Jacket", emoji: "🧥", bucket: "need" },
//               { id: "g5u1l2i5", label: "Video Game Skin", emoji: "🎮", bucket: "want" },
//               { id: "g5u1l2i6", label: "Bubble Tea", emoji: "🧋", bucket: "want" },
//               { id: "g5u1l2i7", label: "Trading Cards", emoji: "🃏", bucket: "want" },
//               { id: "g5u1l2i8", label: "Glow Pen Set", emoji: "✨", bucket: "want" }
//             ]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Before the Field Trip",
//             scenarioText: "You have $20 before a school field trip. You need lunch and also want a souvenir.",
//             walletAmount: 20,
//             goal: "Be ready for the trip",
//             heroEmoji: "🚌",
//             heroCaption: "Important things first.",
//             question: "What should you do first?",
//             generalHint: "Pick the option that prepares you for the trip before extras.",
//             options: [
//               {
//                 text: "Buy lunch first",
//                 subText: "Prepared choice",
//                 emoji: "🥪",
//                 effect: "Correct! Lunch is the important first choice for the trip.",
//                 isBest: true
//               },
//               {
//                 text: "Buy a souvenir first",
//                 subText: "Fun extra",
//                 emoji: "🎁",
//                 hint: "Souvenirs are extra. What do you need for the day?",
//                 effect: "The souvenir is fun, but lunch is more important first.",
//                 isBest: false
//               },
//               {
//                 text: "Spend half on candy",
//                 subText: "Treat now",
//                 emoji: "🍭",
//                 hint: "Treats can wait when you still need something important.",
//                 effect: "That choice makes it harder to handle the important need first.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       }
//     ],

//     unit2: [
//       {
//         id: 3,
//         title: "Budgeting Basics",
//         coinReward: 25,
//         context: [
//           {
//             term: "Budget Limit",
//             definition:
//               "A budget limit is the most money you can spend."
//           },
//           {
//             term: "Plan Ahead",
//             definition:
//               "Planning ahead helps you avoid running out of money."
//           }
//         ],
//         tips: "A budget works best when you choose important things first.",
//         questions: [
//           {
//             type: "budget-builder",
//             scenarioTitle: "School Project Supplies",
//             scenarioText: "You have $15 for a science project poster.",
//             budget: 15,
//             heroEmoji: "🧪",
//             heroCaption: "Stay inside the budget and get what you need.",
//             question: "Pick the best set of supplies.",
//             generalHint: "Choose the materials needed to finish the project before extras.",
//             successMessage: "Great job! You built a practical project plan within budget.",
//             showAnswerTip: true,
//             items: [
//               { id: "g5u2l3i1", name: "Poster Board", price: 5, emoji: "📄", tag: "need" },
//               { id: "g5u2l3i2", name: "Markers", price: 4, emoji: "🖍️", tag: "need" },
//               { id: "g5u2l3i3", name: "Glue", price: 2, emoji: "🧴", tag: "need" },
//               { id: "g5u2l3i4", name: "LED Stickers", price: 6, emoji: "✨", tag: "extra" },
//               { id: "g5u2l3i5", name: "Candy", price: 3, emoji: "🍬", tag: "not for project" }
//             ],
//             correctItemIds: ["g5u2l3i1", "g5u2l3i2", "g5u2l3i3"]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Weekly Allowance Plan",
//             scenarioText: "You get $10 each week and want to be more organized with your money.",
//             walletAmount: 10,
//             goal: "Build a better money habit",
//             heroEmoji: "📅",
//             heroCaption: "Strong habits make money easier to manage.",
//             question: "Which plan is strongest?",
//             generalHint: "Look for a plan that includes both spending and saving.",
//             options: [
//               {
//                 text: "Save some and plan some for spending",
//                 subText: "Balanced habit",
//                 emoji: "⚖️",
//                 effect: "Excellent! A balanced habit makes your money easier to manage.",
//                 isBest: true
//               },
//               {
//                 text: "Spend it all right away",
//                 subText: "No plan",
//                 emoji: "💸",
//                 hint: "Using everything at once makes it harder to reach future goals.",
//                 effect: "That habit leaves no room for future plans.",
//                 isBest: false
//               },
//               {
//                 text: "Forget where the money goes",
//                 subText: "No tracking",
//                 emoji: "❓",
//                 hint: "Money habits work better when you know where your money went.",
//                 effect: "A strong money habit includes paying attention and planning.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 4,
//         title: "Comparing Better Deals",
//         coinReward: 25,
//         context: [
//           {
//             term: "Unit Value",
//             definition:
//               "Unit value means comparing what you get for the price."
//           }
//         ],
//         tips: "The cheapest-looking choice is not always the smartest one.",
//         questions: [
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Snack Pack Puzzle",
//             scenarioText: "Store A sells 1 granola bar for $2. Store B sells 3 granola bars for $5.",
//             heroEmoji: "🥨",
//             heroCaption: "Compare what you get, not just the price tag.",
//             question: "Which deal gives better value?",
//             generalHint: "Think about how many items you get for the money.",
//             cards: [
//               {
//                 id: "g5u2l4c1",
//                 coverEmoji: "🃏",
//                 emoji: "1️⃣",
//                 title: "Clue 1",
//                 text: "One granola bar for $2 costs more per bar than 3 for $5."
//               },
//               {
//                 id: "g5u2l4c2",
//                 coverEmoji: "🃏",
//                 emoji: "📦",
//                 title: "Clue 2",
//                 text: "Getting more of the same item for a fair price can be better value."
//               },
//               {
//                 id: "g5u2l4c3",
//                 coverEmoji: "🃏",
//                 emoji: "💰",
//                 title: "Clue 3",
//                 text: "Smart shoppers compare both amount and price."
//               },
//               {
//                 id: "g5u2l4c4",
//                 coverEmoji: "🃏",
//                 emoji: "🧠",
//                 title: "Clue 4",
//                 text: "Value is about what you get for your money."
//               }
//             ],
//             options: [
//               {
//                 text: "The 3 bars for $5 deal",
//                 isBest: true,
//                 effect: "Correct! The 3-pack gives better value for the money."
//               },
//               {
//                 text: "The 1 bar for $2 deal",
//                 isBest: false,
//                 hint: "Look at the clues again. Which choice gives more for the price?"
//               }
//             ]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Notebook Choice",
//             scenarioText: "You need paper for class. One notebook is $9 and another similar one is $5.",
//             walletAmount: 10,
//             goal: "Buy what you need and keep money left",
//             heroEmoji: "📓",
//             heroCaption: "Useful and lower-cost can be the smarter choice.",
//             question: "Which is smarter?",
//             generalHint: "Choose the option that meets the need and protects your budget.",
//             options: [
//               {
//                 text: "Buy the $5 notebook",
//                 subText: "Useful and lower cost",
//                 emoji: "✅",
//                 effect: "Great choice! It meets the need and leaves more money.",
//                 isBest: true
//               },
//               {
//                 text: "Buy the $9 notebook for the cover design",
//                 subText: "Looks cooler",
//                 emoji: "✨",
//                 hint: "Looks matter less if both notebooks do the same job.",
//                 effect: "That choice works, but it uses more money than needed.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },

//   grade6: {
//     unit1: [
//       {
//         id: 1,
//         title: "Opportunity Cost in Action",
//         coinReward: 30,
//         context: [
//           {
//             term: "Opportunity Cost",
//             definition:
//               "Opportunity cost is what you miss out on when you choose one option over another."
//           },
//           {
//             term: "Short-Term vs Long-Term",
//             definition:
//               "Short-term choices affect now, while long-term choices affect later."
//           }
//         ],
//         tips: "Every money choice has a trade-off, even if it seems small.",
//         questions: [
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Concert Tee or Tablet Fund",
//             scenarioText: "You have $25 left after an event. You want a concert T-shirt now, but you are also saving for a tablet.",
//             walletAmount: 25,
//             goal: "Save for a tablet",
//             heroEmoji: "📱",
//             heroCaption: "Think beyond the moment.",
//             question: "Which choice best supports the long-term goal?",
//             generalHint: "Think about which option has the strongest long-term benefit.",
//             options: [
//               {
//                 text: "Add the $25 to the tablet fund",
//                 subText: "Long-term gain",
//                 emoji: "💰",
//                 effect: "Correct! This choice supports the bigger long-term goal.",
//                 isBest: true
//               },
//               {
//                 text: "Buy the concert T-shirt now",
//                 subText: "Short-term fun",
//                 emoji: "👕",
//                 hint: "The shirt may feel exciting now, but it slows the larger goal.",
//                 effect: "The shirt is fun now, but it delays progress on the tablet.",
//                 isBest: false
//               },
//               {
//                 text: "Spend half on snacks",
//                 subText: "Small spending adds up",
//                 emoji: "🍟",
//                 hint: "Even partial spending can reduce progress on a bigger goal.",
//                 effect: "That still slows the long-term plan.",
//                 isBest: false
//               }
//             ]
//           },
//           {
//             type: "tap-reveal",
//             scenarioTitle: "The Real Cost",
//             scenarioText: "Aarav keeps using his allowance on small game add-ons instead of saving for headphones.",
//             goal: "Understand opportunity cost",
//             heroEmoji: "🎮",
//             heroCaption: "The real cost is often hidden.",
//             question: "What is the opportunity cost of buying the add-ons?",
//             generalHint: "Think about what Aarav gives up by choosing the add-ons.",
//             cards: [
//               {
//                 id: "g6u1l1c1",
//                 coverEmoji: "🃏",
//                 emoji: "🎧",
//                 title: "Clue 1",
//                 text: "Money spent on one choice cannot also be used for another goal."
//               },
//               {
//                 id: "g6u1l1c2",
//                 coverEmoji: "🃏",
//                 emoji: "⏳",
//                 title: "Clue 2",
//                 text: "The headphones will take longer to afford."
//               },
//               {
//                 id: "g6u1l1c3",
//                 coverEmoji: "🃏",
//                 emoji: "📉",
//                 title: "Clue 3",
//                 text: "Repeated small purchases reduce future options."
//               },
//               {
//                 id: "g6u1l1c4",
//                 coverEmoji: "🃏",
//                 emoji: "🧠",
//                 title: "Clue 4",
//                 text: "Opportunity cost is the value of the option you did not choose."
//               }
//             ],
//             options: [
//               {
//                 text: "Slower progress toward the headphones",
//                 isBest: true,
//                 effect: "Exactly. The opportunity cost is giving up faster progress toward the headphones."
//               },
//               {
//                 text: "Nothing important",
//                 isBest: false,
//                 hint: "Read the clues again. What goal becomes harder to reach?"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 2,
//         title: "Needs, Wants, and Context",
//         coinReward: 30,
//         context: [
//           {
//             term: "Context",
//             definition:
//               "Context means the situation around a choice, which can change what matters most."
//           }
//         ],
//         tips: "The smartest choice can change depending on the situation.",
//         questions: [
//           {
//             type: "drag-drop",
//             scenarioTitle: "Sort the Situation Items",
//             scenarioText: "Sort each item into Need or Want based on everyday life.",
//             heroEmoji: "🧩",
//             heroCaption: "Context matters when money is limited.",
//             question: "Which items are needs and which are wants?",
//             generalHint: "Think about learning, safety, health, and daily life first.",
//             successMessage: "Well done! You sorted the items using context and priority.",
//             items: [
//               { id: "g6u1l2i1", label: "Prescription Glasses", emoji: "👓", bucket: "need" },
//               { id: "g6u1l2i2", label: "School Binder", emoji: "📘", bucket: "need" },
//               { id: "g6u1l2i3", label: "Transit Card", emoji: "🚌", bucket: "need" },
//               { id: "g6u1l2i4", label: "Winter Boots", emoji: "🥾", bucket: "need" },
//               { id: "g6u1l2i5", label: "Branded Hoodie", emoji: "👕", bucket: "want" },
//               { id: "g6u1l2i6", label: "Streaming Subscription Add-On", emoji: "📺", bucket: "want" },
//               { id: "g6u1l2i7", label: "Gaming Mouse Lights", emoji: "🖱️", bucket: "want" },
//               { id: "g6u1l2i8", label: "Designer Phone Case", emoji: "📱", bucket: "want" }
//             ]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Cold Week Decision",
//             scenarioText: "You have enough money for either warm gloves or a movie ticket this week.",
//             walletAmount: 15,
//             goal: "Handle the most important need first",
//             heroEmoji: "🧤",
//             heroCaption: "Context changes what should come first.",
//             question: "What is the smarter choice?",
//             generalHint: "Think about what is more useful during a cold week.",
//             options: [
//               {
//                 text: "Buy the warm gloves",
//                 subText: "Useful now",
//                 emoji: "🧤",
//                 effect: "Correct! The gloves solve the more important problem in this situation.",
//                 isBest: true
//               },
//               {
//                 text: "Buy the movie ticket",
//                 subText: "Entertainment",
//                 emoji: "🎬",
//                 hint: "The movie is fun, but it does not solve the colder-weather need.",
//                 effect: "That choice is enjoyable, but the gloves are the higher priority this week.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       }
//     ],

//     unit2: [
//       {
//         id: 3,
//         title: "Budget Trade-Off Challenge",
//         coinReward: 30,
//         context: [
//           {
//             term: "Trade-Off Budgeting",
//             definition:
//               "Trade-off budgeting means choosing the most valuable items when you cannot afford everything."
//           }
//         ],
//         tips: "A strong budget reflects your priorities, not just your wants.",
//         questions: [
//           {
//             type: "budget-builder",
//             scenarioTitle: "Study Session Setup",
//             scenarioText: "You have $20 to prepare for a study session at home.",
//             budget: 20,
//             heroEmoji: "📚",
//             heroCaption: "Build the smartest setup without wasting money.",
//             question: "Choose the best combination of items.",
//             generalHint: "Pick the items that support the study goal before extras.",
//             successMessage: "Excellent! You built a strong study setup and stayed in budget.",
//             showAnswerTip: true,
//             items: [
//               { id: "g6u2l3i1", name: "Notebook", price: 5, emoji: "📓", tag: "need" },
//               { id: "g6u2l3i2", name: "Pens", price: 3, emoji: "🖊️", tag: "need" },
//               { id: "g6u2l3i3", name: "Desk Lamp Bulb", price: 6, emoji: "💡", tag: "important" },
//               { id: "g6u2l3i4", name: "Premium Snacks", price: 8, emoji: "🍫", tag: "extra" },
//               { id: "g6u2l3i5", name: "LED Strip Lights", price: 10, emoji: "✨", tag: "optional" }
//             ],
//             correctItemIds: ["g6u2l3i1", "g6u2l3i2", "g6u2l3i3"]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Club Fund Plan",
//             scenarioText: "Your club has limited money for an event and cannot buy everything on the list.",
//             heroEmoji: "🧾",
//             heroCaption: "Budgets are about choices, not just totals.",
//             question: "What should the group do first?",
//             generalHint: "Start by choosing the items that matter most for the event to work.",
//             options: [
//               {
//                 text: "Pick the most necessary items first",
//                 subText: "Priority budgeting",
//                 emoji: "✅",
//                 effect: "Correct! A limited budget should be used on the most necessary items first.",
//                 isBest: true
//               },
//               {
//                 text: "Pick the most exciting extras first",
//                 subText: "Looks fun",
//                 emoji: "🎉",
//                 hint: "Extras can be good, but the event still needs the basics to work.",
//                 effect: "That can make the event less successful if the basics are missing.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 4,
//         title: "Better Value Decisions",
//         coinReward: 30,
//         context: [
//           {
//             term: "Value Comparison",
//             definition:
//               "Value comparison means judging whether something is worth its cost."
//           }
//         ],
//         tips: "A higher price is only worth it if the extra value really matters.",
//         questions: [
//           {
//             type: "tap-reveal",
//             scenarioTitle: "Data Plan Decision",
//             scenarioText: "Plan A costs $10 and gives 2 GB. Plan B costs $15 and gives 6 GB.",
//             heroEmoji: "📶",
//             heroCaption: "Compare cost and what you receive.",
//             question: "Which plan has better value?",
//             generalHint: "Think about how much you get for each dollar.",
//             cards: [
//               {
//                 id: "g6u2l4c1",
//                 coverEmoji: "🃏",
//                 emoji: "2️⃣",
//                 title: "Clue 1",
//                 text: "Plan A gives less data for a smaller price."
//               },
//               {
//                 id: "g6u2l4c2",
//                 coverEmoji: "🃏",
//                 emoji: "6️⃣",
//                 title: "Clue 2",
//                 text: "Plan B gives much more data without costing much more."
//               },
//               {
//                 id: "g6u2l4c3",
//                 coverEmoji: "🃏",
//                 emoji: "⚖️",
//                 title: "Clue 3",
//                 text: "Value is about cost compared with what you get."
//               },
//               {
//                 id: "g6u2l4c4",
//                 coverEmoji: "🃏",
//                 emoji: "🧠",
//                 title: "Clue 4",
//                 text: "The best value is not always the lowest price."
//               }
//             ],
//             options: [
//               {
//                 text: "Plan B has better value",
//                 isBest: true,
//                 effect: "Exactly. Plan B provides more value for the extra cost."
//               },
//               {
//                 text: "Plan A has better value",
//                 isBest: false,
//                 hint: "Look at the clues again. Does lower price always mean better value?"
//               }
//             ]
//           },
//           {
//             type: "scenario-choice",
//             scenarioTitle: "Backpack Comparison",
//             scenarioText: "Two backpacks meet your needs. One costs much more mostly because of the brand name.",
//             walletAmount: 40,
//             goal: "Choose useful value",
//             heroEmoji: "🎒",
//             heroCaption: "Pay for value, not just a label.",
//             question: "Which is the smarter choice?",
//             generalHint: "If both do the job, compare how much extra value the higher price really adds.",
//             options: [
//               {
//                 text: "Buy the lower-cost backpack that still works well",
//                 subText: "Useful value",
//                 emoji: "💼",
//                 effect: "Great choice! If it meets the need well, paying less can be smarter.",
//                 isBest: true
//               },
//               {
//                 text: "Buy the expensive one only for the brand",
//                 subText: "Paying for label",
//                 emoji: "🏷️",
//                 hint: "A higher price is not always worth it if the main difference is the brand.",
//                 effect: "That choice may cost more without giving enough extra value.",
//                 isBest: false
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   },
// };

// export default lessonsData;

 const lessonsData = {
  grade4: {
    unit1: [
      {
        id: 1,
        title: "Smart Choices Start Here",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=2fSrhyS7FeM",
        context: [
          {
            term: "Decision Making",
            definition:
              "Decision making means stopping to think before you spend your money."
          },
          {
            term: "Smart Choice",
            definition:
              "A smart choice helps you now or helps you reach an important goal later."
          }
        ],
        tips: "Think about needs, goals, and tomorrow before spending today.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Toy or Bike",
            scenarioText: "You earned $20 from helping at home. You want a bike that costs $80.",
            walletAmount: 20,
            goal: "Save for a bike",
            heroEmoji: "🚲",
            heroCaption: "Big goals take smart choices.",
            question: "What should you do with your $20?",
            generalHint: "Choose the option that gets you closer to the bike.",
            options: [
              {
                text: "Buy a toy today",
                subText: "Fun now",
                emoji: "🧸",
                hint: "The toy is fun, but it does not help your bike goal.",
                effect: "The toy was fun today, but now you are not closer to the bike.",
                isBest: false
              },
              {
                text: "Save the money",
                subText: "Goal first",
                emoji: "🐷",
                effect: "Great choice! Saving helps you get closer to your bike.",
                isBest: true
              },
              {
                text: "Spend half on snacks",
                subText: "A little now",
                emoji: "🍿",
                hint: "Even small spending can slow a big goal.",
                effect: "Spending some money means the bike will take longer.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Detective Desk",
            scenarioText: "Kai wants a new soccer ball, but he also wants candy after school.",
            goal: "Reach a bigger goal",
            heroEmoji: "🕵️",
            heroCaption: "Use clues before deciding.",
            question: "Which choice is smarter?",
            generalHint: "Think about what helps for longer than just one afternoon.",
            cards: [
              {
                id: "u1l1q2c1",
                coverEmoji: "🃏",
                emoji: "⚽",
                title: "Clue 1",
                text: "The soccer ball is something Kai can use again and again."
              },
              {
                id: "u1l1q2c2",
                coverEmoji: "🃏",
                emoji: "🍬",
                title: "Clue 2",
                text: "Candy is gone quickly and does not help with the bigger goal."
              },
              {
                id: "u1l1q2c3",
                coverEmoji: "🃏",
                emoji: "⏳",
                title: "Clue 3",
                text: "Waiting a little can help you afford something more useful."
              },
              {
                id: "u1l1q2c4",
                coverEmoji: "🃏",
                emoji: "🎯",
                title: "Clue 4",
                text: "Smart money choices often match a goal."
              }
            ],
            options: [
              {
                text: "Save for the soccer ball",
                isBest: true,
                effect: "Nice job! The clues showed that saving for the bigger goal is smarter."
              },
              {
                text: "Buy candy right away",
                isBest: false,
                hint: "Look at the clues again. Which choice lasts longer and fits the goal?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Snack or Save",
            scenarioText: "You have $6 after school, but you want to save for a board game.",
            walletAmount: 6,
            goal: "Save for a board game",
            heroEmoji: "🎲",
            heroCaption: "Small choices can help big plans.",
            question: "What is the smartest choice?",
            generalHint: "Choose the option that protects your goal the most.",
            options: [
              {
                text: "Save all $6",
                subText: "Goal first",
                emoji: "💰",
                effect: "Awesome! Saving all of it helps your goal grow faster.",
                isBest: true
              },
              {
                text: "Buy candy with all $6",
                subText: "Spend now",
                emoji: "🍭",
                hint: "Candy is gone fast and does not help your game goal.",
                effect: "That was fun for a moment, but it did not help your big goal.",
                isBest: false
              },
              {
                text: "Buy one snack and save the rest",
                subText: "Mixed plan",
                emoji: "🥨",
                hint: "Saving some is better, but the best choice protects the goal most.",
                effect: "You still saved some money, but not as much as you could.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "After-School Plan",
            scenarioText: "You have $10. You want one small treat, but you also want to save most of your money for a bigger goal.",
            budget: 10,
            heroEmoji: "🧠",
            heroCaption: "Build a plan that matches your goal.",
            question: "Pick the smartest set of choices.",
            generalHint: "Choose one small extra and keep most of the money safe.",
            successMessage: "Great job! You enjoyed a little fun and still protected your savings.",
            showAnswerTip: true,
            items: [
              { id: "u1l1b1", name: "Small Juice", price: 2, emoji: "🧃", tag: "small treat" },
              { id: "u1l1b2", name: "Candy Bag", price: 5, emoji: "🍬", tag: "bigger treat" },
              { id: "u1l1b3", name: "Sticker Sheet", price: 2, emoji: "🌟", tag: "small extra" },
              { id: "u1l1b4", name: "Save the Rest", price: 0, emoji: "🐷", tag: "goal money" }
            ],
            correctItemIds: ["u1l1b1", "u1l1b4"]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Think First",
            scenarioText: "Sam wants to make a smart choice with money today.",
            heroEmoji: "💡",
            heroCaption: "Smart choices start with thinking first.",
            question: "What should Sam remember before spending?",
            generalHint: "Look for the clue that explains good money thinking.",
            cards: [
              {
                id: "u1l1q5c1",
                coverEmoji: "🃏",
                emoji: "🛑",
                title: "Clue 1",
                text: "Stopping to think can help you avoid choices you might regret."
              },
              {
                id: "u1l1q5c2",
                coverEmoji: "🃏",
                emoji: "🎯",
                title: "Clue 2",
                text: "Goals matter when you decide how to use money."
              },
              {
                id: "u1l1q5c3",
                coverEmoji: "🃏",
                emoji: "📅",
                title: "Clue 3",
                text: "A smart choice can help both today and later."
              },
              {
                id: "u1l1q5c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Thinking before spending is part of good decision making."
              }
            ],
            options: [
              {
                text: "Stop and think before spending",
                isBest: true,
                effect: "Exactly! Smart choices begin by thinking first."
              },
              {
                text: "Spend fast before changing your mind",
                isBest: false,
                hint: "The clues show that rushing is not the best money habit."
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Needs and Wants Lab",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=aRcXutXvfmM",
        context: [
          {
            term: "Need",
            definition:
              "A need is something important for living, learning, health, or safety."
          },
          {
            term: "Want",
            definition:
              "A want is something fun or nice to have, but not necessary right now."
          }
        ],
        tips: "Needs first. Wants later.",
        questions: [
          {
            type: "drag-drop",
            scenarioTitle: "Sort the Shopping Bag",
            scenarioText: "Drag each item into the correct bucket, or use the quick buttons.",
            heroEmoji: "🛍️",
            heroCaption: "Can you tell the difference between needs and wants?",
            question: "Which items are needs and which are wants?",
            generalHint:
              "Ask yourself: do I need this for living, learning, or health?",
            successMessage: "Amazing! You sorted every item correctly.",
            items: [
              { id: "u1l2i1", label: "Water Bottle", emoji: "💧", bucket: "need" },
              { id: "u1l2i2", label: "Lunch", emoji: "🥪", bucket: "need" },
              { id: "u1l2i3", label: "Notebook", emoji: "📓", bucket: "need" },
              { id: "u1l2i4", label: "Winter Coat", emoji: "🧥", bucket: "need" },
              { id: "u1l2i5", label: "Candy", emoji: "🍬", bucket: "want" },
              { id: "u1l2i6", label: "Toy Car", emoji: "🚗", bucket: "want" },
              { id: "u1l2i7", label: "Video Game", emoji: "🎮", bucket: "want" },
              { id: "u1l2i8", label: "Ice Cream", emoji: "🍦", bucket: "want" }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Ready for School",
            scenarioText: "You have $12 before school starts.",
            walletAmount: 12,
            goal: "Be prepared for class",
            heroEmoji: "🏫",
            heroCaption: "Needs help you learn and be ready.",
            question: "What should you buy first?",
            generalHint: "Think about what helps most with school today.",
            options: [
              {
                text: "A notebook",
                subText: "Useful for class",
                emoji: "📒",
                effect: "Correct! A notebook is a school need.",
                isBest: true
              },
              {
                text: "A sticker pack",
                subText: "Looks fun",
                emoji: "🌟",
                hint: "Stickers are fun, but they are not the most important thing for class.",
                effect: "Stickers are a want. A school need should come first.",
                isBest: false
              },
              {
                text: "A candy bag",
                subText: "Treat now",
                emoji: "🍭",
                hint: "Candy is a treat, not the most important school item.",
                effect: "Candy is a want, not a classroom need.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Need or Nice to Have?",
            scenarioText: "Lina is deciding what matters most for a cold day.",
            heroEmoji: "❄️",
            heroCaption: "Use clues to find the need.",
            question: "Which item is the real need?",
            generalHint: "Look for what helps with health or safety.",
            cards: [
              {
                id: "u1l2c1",
                coverEmoji: "🃏",
                emoji: "🧥",
                title: "Clue 1",
                text: "A warm coat helps protect you outside in cold weather."
              },
              {
                id: "u1l2c2",
                coverEmoji: "🃏",
                emoji: "🍬",
                title: "Clue 2",
                text: "Candy is fun, but it does not protect you from the cold."
              },
              {
                id: "u1l2c3",
                coverEmoji: "🃏",
                emoji: "🛡️",
                title: "Clue 3",
                text: "Needs often help with safety, health, or daily life."
              },
              {
                id: "u1l2c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "A need is more important than something extra."
              }
            ],
            options: [
              {
                text: "Warm coat",
                isBest: true,
                effect: "Yes! A coat is the important need on a cold day."
              },
              {
                text: "Candy treat",
                isBest: false,
                hint: "Read the clues again. Which item really helps with the weather?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Lunch Money Choice",
            scenarioText: "You brought enough money for one important item at lunch.",
            walletAmount: 5,
            goal: "Get through the school day well",
            heroEmoji: "🍽️",
            heroCaption: "Choose what helps most today.",
            question: "Which choice is smartest?",
            generalHint: "Pick the option that helps you most for the school day.",
            options: [
              {
                text: "Buy lunch",
                subText: "Need first",
                emoji: "🥪",
                effect: "Great choice! Lunch helps you stay ready to learn.",
                isBest: true
              },
              {
                text: "Buy candy",
                subText: "Treat first",
                emoji: "🍫",
                hint: "Candy is extra, but lunch is more important.",
                effect: "Candy is a want. Lunch is the need here.",
                isBest: false
              },
              {
                text: "Buy a toy eraser",
                subText: "Cute extra",
                emoji: "🧸",
                hint: "That is fun, but it is not the main need right now.",
                effect: "The toy eraser is a want, not the most important choice.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Backpack Check",
            scenarioText: "You have $9 to prepare for school tomorrow.",
            budget: 9,
            heroEmoji: "🎒",
            heroCaption: "Choose the most important things first.",
            question: "Which set makes the most sense?",
            generalHint: "Pick the items that help you learn and be ready.",
            successMessage: "Nice work! You focused on needs before wants.",
            showAnswerTip: true,
            items: [
              { id: "u1l2b1", name: "Notebook", price: 3, emoji: "📓", tag: "need" },
              { id: "u1l2b2", name: "Pencil Pack", price: 2, emoji: "✏️", tag: "need" },
              { id: "u1l2b3", name: "Lunch", price: 4, emoji: "🥪", tag: "need" },
              { id: "u1l2b4", name: "Candy", price: 3, emoji: "🍬", tag: "want" },
              { id: "u1l2b5", name: "Glow Sticker", price: 2, emoji: "✨", tag: "want" }
            ],
            correctItemIds: ["u1l2b1", "u1l2b2", "u1l2b3"]
          }
        ]
      },
      {
        id: 3,
        title: "Goal Getter",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=v-mlEQ7KW5Q",
        context: [
          {
            term: "Goal",
            definition: "A goal is something you are working toward."
          },
          {
            term: "Save",
            definition: "Saving means keeping some money for later."
          }
        ],
        tips: "Goals get easier when you save step by step.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Skateboard Dream",
            scenarioText: "You want a skateboard. You have $15 already saved.",
            walletAmount: 15,
            goal: "Save for a skateboard",
            heroEmoji: "🛹",
            heroCaption: "Small choices can help a big goal.",
            question: "What is the smartest choice after school?",
            generalHint: "Which choice helps the skateboard fund grow?",
            options: [
              {
                text: "Save today's money too",
                subText: "Stay on track",
                emoji: "💰",
                effect: "Excellent! Adding more money today helps your goal grow.",
                isBest: true
              },
              {
                text: "Buy two treats",
                subText: "Fun now",
                emoji: "🍪",
                hint: "Treats are okay sometimes, but they do not help the skateboard goal.",
                effect: "Those treats use money that could help your goal.",
                isBest: false
              },
              {
                text: "Buy a tiny toy",
                subText: "Small purchase",
                emoji: "🪀",
                hint: "Even small purchases can slow a big goal.",
                effect: "Small spending still makes the skateboard take longer.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Save Most, Spend a Little",
            scenarioText:
              "You have $10. You want one small treat, but you also want to save most of your money.",
            budget: 10,
            heroEmoji: "🎯",
            heroCaption: "Build a plan that matches your goal.",
            question: "Pick the best set of items.",
            generalHint:
              "Choose one small extra and keep most of the money for savings.",
            successMessage:
              "Great job! You enjoyed one small extra and still protected your savings.",
            showAnswerTip: true,
            items: [
              { id: "u1l3b1", name: "Fruit Snack", price: 2, emoji: "🍎", tag: "small treat" },
              { id: "u1l3b2", name: "Candy Box", price: 6, emoji: "🍬", tag: "bigger treat" },
              { id: "u1l3b3", name: "Sticker Sheet", price: 2, emoji: "🌈", tag: "extra fun" },
              { id: "u1l3b4", name: "Save the Rest", price: 0, emoji: "🐷", tag: "goal money" }
            ],
            correctItemIds: ["u1l3b1", "u1l3b4"]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Goal Clues",
            scenarioText: "A big goal can feel far away at first.",
            heroEmoji: "🧩",
            heroCaption: "Clues can show how goals work.",
            question: "What helps with a big goal?",
            generalHint: "Look for the clue about small progress.",
            cards: [
              {
                id: "u1l3c1",
                coverEmoji: "🃏",
                emoji: "👣",
                title: "Clue 1",
                text: "Saving a little at a time still counts."
              },
              {
                id: "u1l3c2",
                coverEmoji: "🃏",
                emoji: "📈",
                title: "Clue 2",
                text: "Small progress can grow into big progress."
              },
              {
                id: "u1l3c3",
                coverEmoji: "🃏",
                emoji: "⏳",
                title: "Clue 3",
                text: "Some goals take patience."
              },
              {
                id: "u1l3c4",
                coverEmoji: "🃏",
                emoji: "🎯",
                title: "Clue 4",
                text: "A goal is easier when you keep your plan going."
              }
            ],
            options: [
              {
                text: "Keep saving step by step",
                isBest: true,
                effect: "Exactly! Small steps help reach a big goal."
              },
              {
                text: "Quit because it takes time",
                isBest: false,
                hint: "The clues show that progress still matters even if it takes time."
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Game Goal",
            scenarioText: "You want a game that costs $30. You just got $5.",
            walletAmount: 5,
            goal: "Save for the game",
            heroEmoji: "🎮",
            heroCaption: "Every small amount can help.",
            question: "What should you do with the $5?",
            generalHint: "Pick the option that helps the game goal most.",
            options: [
              {
                text: "Add it to your savings",
                subText: "Grow the goal",
                emoji: "🐷",
                effect: "Great! Every saved amount gets you closer.",
                isBest: true
              },
              {
                text: "Spend it on soda",
                subText: "Quick treat",
                emoji: "🥤",
                hint: "That uses money you wanted for the game.",
                effect: "That choice slows your game goal.",
                isBest: false
              },
              {
                text: "Buy stickers",
                subText: "Extra item",
                emoji: "⭐",
                hint: "Stickers are fun, but they do not help the goal.",
                effect: "The stickers do not move you closer to the game.",
                isBest: false
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Goal Helpers",
            scenarioText: "Sort each habit into the best bucket.",
            heroEmoji: "📦",
            heroCaption: "Some habits help goals and some habits slow them down.",
            question: "Which actions help a goal and which slow it down?",
            generalHint: "Ask: does this bring the goal closer or farther away?",
            successMessage: "Awesome! You sorted the goal habits correctly.",
            items: [
              { id: "u1l3d1", label: "Save birthday money", emoji: "🎁", bucket: "need" },
              { id: "u1l3d2", label: "Track your progress", emoji: "📊", bucket: "need" },
              { id: "u1l3d3", label: "Wait patiently", emoji: "⏳", bucket: "need" },
              { id: "u1l3d4", label: "Spend on random treats", emoji: "🍭", bucket: "want" },
              { id: "u1l3d5", label: "Forget the plan", emoji: "😕", bucket: "want" },
              { id: "u1l3d6", label: "Buy extras every day", emoji: "🧸", bucket: "want" }
            ]
          }
        ]
      },
      {
        id: 4,
        title: "School Day Money Mission",
        coinReward: 10,
        context: [
          {
            term: "Important First",
            definition:
              "When money is limited, choose the most important thing first."
          }
        ],
        tips: "Ask yourself: what matters most right now?",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Broken Backpack",
            scenarioText: "Your backpack zipper broke. You also want a toy from the store.",
            walletAmount: 25,
            goal: "Be ready for school",
            heroEmoji: "🎒",
            heroCaption: "Solve the important problem first.",
            question: "What should you do?",
            generalHint: "Think about what helps you get through the school day.",
            options: [
              {
                text: "Buy a new backpack",
                subText: "Fix the problem",
                emoji: "🎒",
                effect: "Yes! The backpack is the important need right now.",
                isBest: true
              },
              {
                text: "Buy the toy",
                subText: "Fun choice",
                emoji: "🧸",
                hint: "The toy is fun, but it does not fix your school problem.",
                effect: "The toy is fun, but the backpack problem is still there.",
                isBest: false
              },
              {
                text: "Buy candy and juice",
                subText: "Treats today",
                emoji: "🧃",
                hint: "Treats are extras, not the most important need here.",
                effect: "Treats can wait when a school need comes first.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Lunch Line Clues",
            scenarioText: "You brought $8 to school and need to make one smart choice.",
            walletAmount: 8,
            heroEmoji: "🧠",
            heroCaption: "Use clues to decide what matters most.",
            question: "What should come first today?",
            generalHint: "Look for the choice that helps you through the day.",
            cards: [
              {
                id: "u1l4c1",
                coverEmoji: "🃏",
                emoji: "🍽️",
                title: "Clue 1",
                text: "Lunch helps you stay focused and ready to learn."
              },
              {
                id: "u1l4c2",
                coverEmoji: "🃏",
                emoji: "🍬",
                title: "Clue 2",
                text: "Candy is tasty, but it is not the most important item."
              },
              {
                id: "u1l4c3",
                coverEmoji: "🃏",
                emoji: "🏫",
                title: "Clue 3",
                text: "A school day goes better when your important needs are met."
              },
              {
                id: "u1l4c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Smart choices are not always the most fun choices."
              }
            ],
            options: [
              {
                text: "Buy lunch first",
                isBest: true,
                effect: "Correct! Lunch is the important choice for the school day."
              },
              {
                text: "Buy candy first",
                isBest: false,
                hint: "Check the clues again. Which choice helps you most today?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "School Project Need",
            scenarioText: "Tomorrow you need poster paper for class, but today you also want a toy ball.",
            walletAmount: 10,
            goal: "Be ready for class",
            heroEmoji: "📚",
            heroCaption: "Important school needs come first.",
            question: "Which choice is smartest?",
            generalHint: "Think about what you need for tomorrow.",
            options: [
              {
                text: "Buy the poster paper",
                subText: "Class first",
                emoji: "📄",
                effect: "Right! The school need should come first.",
                isBest: true
              },
              {
                text: "Buy the toy ball",
                subText: "Play first",
                emoji: "⚽",
                hint: "The toy is fun, but it does not help with your class need.",
                effect: "The fun item can wait when a school need matters more.",
                isBest: false
              },
              {
                text: "Buy candy instead",
                subText: "Treat choice",
                emoji: "🍫",
                hint: "Candy is not the important thing for tomorrow's class.",
                effect: "Candy does not help you get ready for school.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Study Basket",
            scenarioText: "You have $9 to get ready for homework time.",
            budget: 9,
            heroEmoji: "✏️",
            heroCaption: "Build the smartest study basket.",
            question: "Which plan makes the most sense?",
            generalHint: "Pick the things that help you study first.",
            successMessage: "Nice! You chose useful study items first.",
            showAnswerTip: true,
            items: [
              { id: "u1l4b1", name: "Notebook", price: 4, emoji: "📓", tag: "need" },
              { id: "u1l4b2", name: "Pencil", price: 2, emoji: "✏️", tag: "need" },
              { id: "u1l4b3", name: "Water", price: 2, emoji: "💧", tag: "helpful" },
              { id: "u1l4b4", name: "Candy Box", price: 5, emoji: "🍬", tag: "extra" }
            ],
            correctItemIds: ["u1l4b1", "u1l4b2", "u1l4b3"]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Important or Extra?",
            scenarioText: "Sort each school-day item into the best bucket.",
            heroEmoji: "🧾",
            heroCaption: "Some things are important first. Others can wait.",
            question: "Which items are important first and which are extras?",
            generalHint: "Choose based on what helps with school and daily needs.",
            successMessage: "Great sorting! You know how to pick important things first.",
            items: [
              { id: "u1l4d1", label: "Lunch", emoji: "🥪", bucket: "need" },
              { id: "u1l4d2", label: "Notebook", emoji: "📒", bucket: "need" },
              { id: "u1l4d3", label: "Water Bottle", emoji: "💧", bucket: "need" },
              { id: "u1l4d4", label: "Candy", emoji: "🍬", bucket: "want" },
              { id: "u1l4d5", label: "Toy Car", emoji: "🚗", bucket: "want" },
              { id: "u1l4d6", label: "Sticker Pack", emoji: "🌟", bucket: "want" }
            ]
          }
        ]
      }
    ],
    unit2: [
      {
        id: 5,
        title: "Price Detective",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=HekcJ2jt7Mw",
        context: [
          {
            term: "Compare Prices",
            definition:
              "Comparing prices means looking at more than one choice before buying."
          },
          {
            term: "Value",
            definition:
              "Value means getting something useful for a fair price."
          }
        ],
        tips: "Smart shoppers compare before they buy.",
        questions: [
          {
            type: "tap-reveal",
            scenarioTitle: "Pencil Mystery",
            scenarioText: "One store sells one pencil for $4.",
            heroEmoji: "✏️",
            heroCaption: "Detectives compare clues before deciding.",
            question: "Is that a smart price?",
            generalHint: "Compare the item to what it usually costs.",
            cards: [
              {
                id: "u2l5c1",
                coverEmoji: "🃏",
                emoji: "🏪",
                title: "Clue 1",
                text: "A second store sells a pack of 4 pencils for $3."
              },
              {
                id: "u2l5c2",
                coverEmoji: "🃏",
                emoji: "📦",
                title: "Clue 2",
                text: "Getting more items for less money is often better value."
              },
              {
                id: "u2l5c3",
                coverEmoji: "🃏",
                emoji: "💸",
                title: "Clue 3",
                text: "Paying too much for one small item leaves less money for other needs."
              },
              {
                id: "u2l5c4",
                coverEmoji: "🃏",
                emoji: "🔍",
                title: "Clue 4",
                text: "Comparing prices helps shoppers avoid overpaying."
              }
            ],
            options: [
              {
                text: "No, it is too expensive",
                isBest: true,
                effect: "Exactly! Comparing stores showed the first price was not a good deal."
              },
              {
                text: "Yes, it is a smart price",
                isBest: false,
                hint: "Read the clues again. Was there a better deal somewhere else?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Two Water Bottles",
            scenarioText: "You need a water bottle for school.",
            walletAmount: 15,
            goal: "Buy something useful and still save money",
            heroEmoji: "🫗",
            heroCaption: "Useful and affordable is often smartest.",
            question: "Which choice is smarter?",
            generalHint: "Look for the useful choice that still leaves money.",
            options: [
              {
                text: "Bottle for $15 with sparkles",
                subText: "Looks cool",
                emoji: "✨",
                hint: "It looks cool, but it uses all your money.",
                effect: "You bought a bottle, but you spent all your money.",
                isBest: false
              },
              {
                text: "Bottle for $8",
                subText: "Still useful",
                emoji: "💧",
                effect: "Great shopping! You got what you need and kept some money too.",
                isBest: true
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Crayon Compare",
            scenarioText: "Store A sells 1 crayon for $2. Store B sells 4 crayons for $3.",
            walletAmount: 6,
            goal: "Get the better deal",
            heroEmoji: "🖍️",
            heroCaption: "Compare before you choose.",
            question: "Which deal is smarter?",
            generalHint: "Look for more value, not just one item.",
            options: [
              {
                text: "Store A",
                subText: "One crayon",
                emoji: "1️⃣",
                hint: "That is more money for less.",
                effect: "That is not the better value.",
                isBest: false
              },
              {
                text: "Store B",
                subText: "Four crayons",
                emoji: "4️⃣",
                effect: "Exactly! You get more crayons for less money.",
                isBest: true
              },
              {
                text: "Either store",
                subText: "Same thing",
                emoji: "🤷",
                hint: "The prices are not equal when you compare what you get.",
                effect: "Comparing showed that one store is clearly the better deal.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "School Supply Deal",
            scenarioText: "You have $10 and want the smartest school supply plan.",
            budget: 10,
            heroEmoji: "🛒",
            heroCaption: "Good value means choosing useful items at fair prices.",
            question: "Which set makes the most sense?",
            generalHint: "Pick the useful items with the strongest value.",
            successMessage: "Nice! You chose a practical and fair-value plan.",
            showAnswerTip: true,
            items: [
              { id: "u2l5b1", name: "Pencil Pack", price: 3, emoji: "✏️", tag: "good value" },
              { id: "u2l5b2", name: "Notebook", price: 4, emoji: "📓", tag: "useful" },
              { id: "u2l5b3", name: "Eraser", price: 1, emoji: "🩹", tag: "helpful" },
              { id: "u2l5b4", name: "Fancy Pen", price: 8, emoji: "🖊️", tag: "too pricey" }
            ],
            correctItemIds: ["u2l5b1", "u2l5b2", "u2l5b3"]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Sale Sign Test",
            scenarioText: "A big sign says 'BEST DEAL!' but the price still looks high.",
            heroEmoji: "📣",
            heroCaption: "Signs can grab attention, but smart shoppers still think.",
            question: "What should you do first?",
            generalHint: "A sign is not enough by itself.",
            cards: [
              {
                id: "u2l5c5",
                coverEmoji: "🃏",
                emoji: "🔍",
                title: "Clue 1",
                text: "You should still compare the price."
              },
              {
                id: "u2l5c6",
                coverEmoji: "🃏",
                emoji: "🏷️",
                title: "Clue 2",
                text: "A sale sign does not always mean the best value."
              },
              {
                id: "u2l5c7",
                coverEmoji: "🃏",
                emoji: "💡",
                title: "Clue 3",
                text: "Smart shoppers look at what they get for the money."
              },
              {
                id: "u2l5c8",
                coverEmoji: "🃏",
                emoji: "🧠",
                title: "Clue 4",
                text: "Thinking first helps avoid bad deals."
              }
            ],
            options: [
              {
                text: "Compare the price before buying",
                isBest: true,
                effect: "Correct! Smart shoppers compare before they buy."
              },
              {
                text: "Buy it because the sign says deal",
                isBest: false,
                hint: "The clues show that signs are not enough on their own."
              }
            ]
          }
        ]
      },
      {
        id: 6,
        title: "Budget Builder",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=cYGiipJOiLg",
        context: [
          {
            term: "Budget",
            definition:
              "A budget is a plan for how to use your money."
          }
        ],
        tips: "Pick the most important things first and stay inside the budget.",
        questions: [
          {
            type: "budget-builder",
            scenarioTitle: "Movie Night Basket",
            scenarioText: "You have $12 for a family movie night at home.",
            budget: 12,
            heroEmoji: "🎬",
            heroCaption: "Can you build a smart basket?",
            question: "Choose the best items without going over budget.",
            generalHint: "Pick the basic things first, then see if any money is left.",
            successMessage:
              "Awesome! You stayed within budget and picked a smart set of items.",
            showAnswerTip: true,
            items: [
              { id: "u2l6i1", name: "Popcorn", price: 4, emoji: "🍿", tag: "shared snack" },
              { id: "u2l6i2", name: "Juice Box Pack", price: 3, emoji: "🧃", tag: "drink" },
              { id: "u2l6i3", name: "Napkins", price: 2, emoji: "🧻", tag: "useful" },
              { id: "u2l6i4", name: "Glow Stick", price: 5, emoji: "✨", tag: "extra fun" },
              { id: "u2l6i5", name: "Candy Bag", price: 8, emoji: "🍬", tag: "pricey extra" }
            ],
            correctItemIds: ["u2l6i1", "u2l6i2", "u2l6i3"]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Art Day Plan",
            scenarioText: "Your class art table has $10 to spend.",
            budget: 10,
            heroEmoji: "🎨",
            heroCaption: "Budgets help teams choose wisely.",
            question: "Which plan makes the most sense?",
            generalHint: "Pick the items needed to do the activity first.",
            successMessage:
              "Nice work! You used the budget for the most important art supplies.",
            showAnswerTip: true,
            items: [
              { id: "u2l6a1", name: "Paper", price: 3, emoji: "📄", tag: "need" },
              { id: "u2l6a2", name: "Markers", price: 4, emoji: "🖍️", tag: "need" },
              { id: "u2l6a3", name: "Glitter", price: 4, emoji: "✨", tag: "extra" },
              { id: "u2l6a4", name: "Tape", price: 2, emoji: "🧷", tag: "helpful" },
              { id: "u2l6a5", name: "Candy", price: 3, emoji: "🍭", tag: "not for art" }
            ],
            correctItemIds: ["u2l6a1", "u2l6a2", "u2l6a4"]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Stay in Budget",
            scenarioText: "You have $8 and want supplies for a homework station.",
            walletAmount: 8,
            goal: "Stay inside your budget",
            heroEmoji: "📏",
            heroCaption: "Budgets help you make smart limits.",
            question: "Which choice fits the budget best?",
            generalHint: "Pick the useful plan that does not go over.",
            options: [
              {
                text: "Notebook and pencil",
                subText: "Useful and affordable",
                emoji: "📓",
                effect: "Correct! That plan fits the budget and helps with homework.",
                isBest: true
              },
              {
                text: "Fancy toy pen only",
                subText: "Looks cool",
                emoji: "🖊️",
                hint: "That is not the most useful plan for homework.",
                effect: "It uses money, but it is not the strongest homework choice.",
                isBest: false
              },
              {
                text: "Buy everything you want",
                subText: "No plan",
                emoji: "💸",
                hint: "A budget is supposed to help limit spending.",
                effect: "That choice ignores the budget.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Budget Clues",
            scenarioText: "A budget is supposed to help you make strong choices.",
            heroEmoji: "🧠",
            heroCaption: "Use clues to understand what budgets do.",
            question: "What is the main job of a budget?",
            generalHint: "Look for the clue about planning money.",
            cards: [
              {
                id: "u2l6c1",
                coverEmoji: "🃏",
                emoji: "📝",
                title: "Clue 1",
                text: "A budget is a money plan."
              },
              {
                id: "u2l6c2",
                coverEmoji: "🃏",
                emoji: "🚫",
                title: "Clue 2",
                text: "A budget can stop you from spending too much."
              },
              {
                id: "u2l6c3",
                coverEmoji: "🃏",
                emoji: "🎯",
                title: "Clue 3",
                text: "A budget helps you choose what matters most."
              },
              {
                id: "u2l6c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Planning first makes money choices stronger."
              }
            ],
            options: [
              {
                text: "To plan how to use money",
                isBest: true,
                effect: "Exactly! A budget is a plan for your money."
              },
              {
                text: "To spend without thinking",
                isBest: false,
                hint: "The clues show that a budget is meant for planning."
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Budget Habits",
            scenarioText: "Sort the actions into smart budget habits and not-smart budget habits.",
            heroEmoji: "📦",
            heroCaption: "Budgets work best when you use them wisely.",
            question: "Which actions help a budget and which do not?",
            generalHint: "Ask whether the action follows a plan or ignores it.",
            successMessage: "Nice sorting! You know what helps a budget work.",
            items: [
              { id: "u2l6d1", label: "Choose needs first", emoji: "✅", bucket: "need" },
              { id: "u2l6d2", label: "Check prices", emoji: "🔍", bucket: "need" },
              { id: "u2l6d3", label: "Stay inside the limit", emoji: "📏", bucket: "need" },
              { id: "u2l6d4", label: "Buy extras first", emoji: "🍭", bucket: "want" },
              { id: "u2l6d5", label: "Ignore the total", emoji: "🙈", bucket: "want" },
              { id: "u2l6d6", label: "Spend because it looks fun", emoji: "✨", bucket: "want" }
            ]
          }
        ]
      },
      {
        id: 7,
        title: "Shopping Challenge",
        coinReward: 10,
        context: [
          {
            term: "Best Deal",
            definition:
              "A best deal gives you what you need at a better price or in a smarter way."
          }
        ],
        tips: "A good deal is not just cheap. It should also match what you need.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Snack Shop",
            scenarioText: "You want one snack after school and still want to save money.",
            walletAmount: 6,
            goal: "Enjoy something small and keep some money",
            heroEmoji: "🛒",
            heroCaption: "A smart choice can balance fun and saving.",
            question: "Which is the best value?",
            generalHint: "Look for the choice that gives you a snack and still leaves money.",
            options: [
              {
                text: "One tiny candy for $6",
                subText: "All your money",
                emoji: "🍬",
                hint: "That uses all your money for one small item.",
                effect: "That was not a great deal because it used all your money.",
                isBest: false
              },
              {
                text: "A snack for $3 and save $3",
                subText: "Balanced choice",
                emoji: "🥨",
                effect: "Exactly! You got a snack and still saved half your money.",
                isBest: true
              },
              {
                text: "Spend all $6 because you can",
                subText: "No plan",
                emoji: "💸",
                hint: "Having money does not mean you need to spend everything.",
                effect: "A smart shopper does not spend everything just because they can.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "The Big Sale Sign",
            scenarioText: "A store says 'SUPER DEAL!' on a toy display.",
            heroEmoji: "📣",
            heroCaption: "Ads can grab attention, but smart shoppers still think.",
            question: "What should you do first?",
            generalHint: "A sign is not enough. Smart shoppers still compare and think.",
            cards: [
              {
                id: "u2l7c1",
                coverEmoji: "🃏",
                emoji: "🏷️",
                title: "Clue 1",
                text: "A sale sign can be helpful, but it does not always mean best value."
              },
              {
                id: "u2l7c2",
                coverEmoji: "🃏",
                emoji: "🔍",
                title: "Clue 2",
                text: "You should still look at the price and compare."
              },
              {
                id: "u2l7c3",
                coverEmoji: "🃏",
                emoji: "🎯",
                title: "Clue 3",
                text: "The toy also needs to fit your goal or budget."
              },
              {
                id: "u2l7c4",
                coverEmoji: "🃏",
                emoji: "🧠",
                title: "Clue 4",
                text: "Smart shopping means thinking, not just reacting."
              }
            ],
            options: [
              {
                text: "Compare the price and think first",
                isBest: true,
                effect: "Correct! A smart shopper checks the price and thinks before buying."
              },
              {
                text: "Buy it right away because of the sign",
                isBest: false,
                hint: "Look at the clues again. Does a big sign always mean smartest choice?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Two Toy Choices",
            scenarioText: "You want one small toy and have two choices.",
            walletAmount: 10,
            goal: "Get the better deal",
            heroEmoji: "🧸",
            heroCaption: "The smartest deal matches both value and need.",
            question: "Which deal is better?",
            generalHint: "Look for the better price for something useful or lasting.",
            options: [
              {
                text: "A tiny toy for $10",
                subText: "Costs all your money",
                emoji: "💸",
                hint: "Using all your money on one tiny item is not the best value.",
                effect: "That choice leaves no money and is not strong value.",
                isBest: false
              },
              {
                text: "A toy for $5 and save $5",
                subText: "Better balance",
                emoji: "✅",
                effect: "Yes! You still got something and kept some money too.",
                isBest: true
              },
              {
                text: "Buy the first thing you see",
                subText: "No comparing",
                emoji: "👀",
                hint: "Smart shopping means comparing, not rushing.",
                effect: "That choice skips good thinking.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Snack Table Plan",
            scenarioText: "You have $8 for a snack table and want the strongest plan.",
            budget: 8,
            heroEmoji: "🍽️",
            heroCaption: "Choose the plan with better value.",
            question: "Which set makes the most sense?",
            generalHint: "Look for the useful and fair-priced option.",
            successMessage: "Nice! You picked the stronger shopping plan.",
            showAnswerTip: true,
            items: [
              { id: "u2l7b1", name: "Fruit Cups", price: 3, emoji: "🍎", tag: "good value" },
              { id: "u2l7b2", name: "Water Pack", price: 3, emoji: "💧", tag: "useful" },
              { id: "u2l7b3", name: "Napkins", price: 2, emoji: "🧻", tag: "helpful" },
              { id: "u2l7b4", name: "Glow Straw", price: 5, emoji: "✨", tag: "extra" }
            ],
            correctItemIds: ["u2l7b1", "u2l7b2", "u2l7b3"]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Smart Shopper or Not?",
            scenarioText: "Sort the shopping actions into the best bucket.",
            heroEmoji: "🛍️",
            heroCaption: "Smart shoppers think before buying.",
            question: "Which habits are smart shopping habits and which are not?",
            generalHint: "Sort by whether the habit helps you shop wisely.",
            successMessage: "Great job! You sorted the shopping habits correctly.",
            items: [
              { id: "u2l7d1", label: "Compare prices", emoji: "🔍", bucket: "need" },
              { id: "u2l7d2", label: "Check if it fits budget", emoji: "📏", bucket: "need" },
              { id: "u2l7d3", label: "Think before buying", emoji: "🧠", bucket: "need" },
              { id: "u2l7d4", label: "Buy because of a sign", emoji: "📣", bucket: "want" },
              { id: "u2l7d5", label: "Spend without checking", emoji: "💸", bucket: "want" },
              { id: "u2l7d6", label: "Choose the first thing only", emoji: "🏃", bucket: "want" }
            ]
          }
        ]
      },
      {
        id: 8,
        title: "Class Party Planner",
        coinReward: 10,
        context: [
          {
            term: "Planning",
            definition:
              "Planning means thinking ahead so your money works better."
          }
        ],
        tips: "The most exciting choice is not always the smartest one.",
        questions: [
          {
            type: "budget-builder",
            scenarioTitle: "Party Table Plan",
            scenarioText: "You have $15 to help set up a simple class party table.",
            budget: 15,
            heroEmoji: "🎉",
            heroCaption: "Plan the table without overspending.",
            question: "Pick the smartest set of items.",
            generalHint: "Choose what the whole group needs first.",
            successMessage: "Nice planning! You used the money for a practical party setup.",
            showAnswerTip: true,
            items: [
              { id: "u2l8p1", name: "Cups", price: 3, emoji: "🥤", tag: "need" },
              { id: "u2l8p2", name: "Napkins", price: 2, emoji: "🧻", tag: "need" },
              { id: "u2l8p3", name: "Fruit Tray", price: 6, emoji: "🍉", tag: "shared food" },
              { id: "u2l8p4", name: "Glitter Banner", price: 7, emoji: "✨", tag: "extra" },
              { id: "u2l8p5", name: "Party Horns", price: 5, emoji: "📯", tag: "extra" }
            ],
            correctItemIds: ["u2l8p1", "u2l8p2", "u2l8p3"]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "One More Choice",
            scenarioText: "After buying the basics, you have a little money left.",
            walletAmount: 4,
            goal: "Keep the party useful and fun",
            heroEmoji: "🤝",
            heroCaption: "Think about the whole group.",
            question: "What is the smartest final choice?",
            generalHint: "Pick something that helps the group most.",
            options: [
              {
                text: "Save the extra money",
                subText: "No waste",
                emoji: "🐷",
                effect: "Great choice! Saving extra money is a smart way to avoid waste.",
                isBest: true
              },
              {
                text: "Buy random candy",
                subText: "Spend it anyway",
                emoji: "🍬",
                hint: "Spending just because money is left is not always smart.",
                effect: "Random spending is not the strongest plan.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Planner Clues",
            scenarioText: "A class party works better when you plan for everyone.",
            heroEmoji: "🧠",
            heroCaption: "Use clues to think like a planner.",
            question: "What should come first in a class plan?",
            generalHint: "Look for the clue about helping the whole group.",
            cards: [
              {
                id: "u2l8c1",
                coverEmoji: "🃏",
                emoji: "👥",
                title: "Clue 1",
                text: "A class party should work for the whole group."
              },
              {
                id: "u2l8c2",
                coverEmoji: "🃏",
                emoji: "🥤",
                title: "Clue 2",
                text: "Useful shared items usually matter more than flashy extras."
              },
              {
                id: "u2l8c3",
                coverEmoji: "🃏",
                emoji: "📋",
                title: "Clue 3",
                text: "Good planning means choosing the important things first."
              },
              {
                id: "u2l8c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Planning ahead helps money go further."
              }
            ],
            options: [
              {
                text: "Choose shared needs first",
                isBest: true,
                effect: "Exactly! Shared needs help the whole group."
              },
              {
                text: "Choose flashy extras first",
                isBest: false,
                hint: "The clues show that planning starts with what the group needs."
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Decoration Decision",
            scenarioText: "The table already has the basics, but you can add one more thing.",
            walletAmount: 5,
            goal: "Keep the party useful and simple",
            heroEmoji: "🎈",
            heroCaption: "Not every extra is needed.",
            question: "Which choice makes the most sense?",
            generalHint: "Think about whether the extra really helps.",
            options: [
              {
                text: "Save the money",
                subText: "Use it wisely",
                emoji: "💰",
                effect: "Correct! Saving leftover money can be the smartest choice.",
                isBest: true
              },
              {
                text: "Buy a glitter banner",
                subText: "Looks fun",
                emoji: "✨",
                hint: "It looks nice, but it is not the most useful choice.",
                effect: "The banner is extra, not the strongest final choice.",
                isBest: false
              },
              {
                text: "Buy party horns",
                subText: "Noisy extra",
                emoji: "📯",
                hint: "That is an extra, not something the group needs.",
                effect: "That choice adds fun, but not much usefulness.",
                isBest: false
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Party Needs or Extras",
            scenarioText: "Sort each party item into the right bucket.",
            heroEmoji: "🎊",
            heroCaption: "Good planners know what comes first.",
            question: "Which items are party needs and which are extras?",
            generalHint: "Think about what helps the group most.",
            successMessage: "Great sorting! You know how to plan a practical party.",
            items: [
              { id: "u2l8d1", label: "Cups", emoji: "🥤", bucket: "need" },
              { id: "u2l8d2", label: "Napkins", emoji: "🧻", bucket: "need" },
              { id: "u2l8d3", label: "Fruit Tray", emoji: "🍉", bucket: "need" },
              { id: "u2l8d4", label: "Glitter Banner", emoji: "✨", bucket: "want" },
              { id: "u2l8d5", label: "Party Horns", emoji: "📯", bucket: "want" },
              { id: "u2l8d6", label: "Candy Decoration", emoji: "🍬", bucket: "want" }
            ]
          }
        ]
      }
    ],
    unit3: [
      {
        id: 9,
        title: "Saving Step by Step",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=B3njsO5ewA8",
        context: [
          {
            term: "Small Steps",
            definition:
              "Big goals can be reached with many small saving steps."
          }
        ],
        tips: "You do not need all the money at once. Keep building.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Toy Fund",
            scenarioText: "A toy costs $24. You can save $4 each week.",
            walletAmount: 4,
            goal: "Buy the toy in a few weeks",
            heroEmoji: "🗓️",
            heroCaption: "Small weekly steps can reach a big goal.",
            question: "What should you do this week?",
            generalHint: "This week still matters, even if the goal is not finished yet.",
            options: [
              {
                text: "Save the $4",
                subText: "One more step",
                emoji: "💰",
                effect: "Correct! Saving this week moves you one step closer.",
                isBest: true
              },
              {
                text: "Spend it on a snack",
                subText: "Fun now",
                emoji: "🍪",
                hint: "That uses the money you wanted for the toy.",
                effect: "The snack was fun, but it slows your toy goal.",
                isBest: false
              },
              {
                text: "Buy stickers",
                subText: "Small extra",
                emoji: "🌟",
                hint: "Stickers are extra and use the money you planned to save.",
                effect: "That choice delays the toy a little more.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Halfway There",
            scenarioText: "You have saved $15 toward a $30 goal.",
            heroEmoji: "📈",
            heroCaption: "Tracking helps you see progress.",
            question: "What does this mean?",
            generalHint: "Think about how far $15 is toward $30.",
            cards: [
              {
                id: "u3l9c1",
                coverEmoji: "🃏",
                emoji: "1️⃣",
                title: "Clue 1",
                text: "$15 is exactly half of $30."
              },
              {
                id: "u3l9c2",
                coverEmoji: "🃏",
                emoji: "📍",
                title: "Clue 2",
                text: "Halfway means you still need the other half."
              },
              {
                id: "u3l9c3",
                coverEmoji: "🃏",
                emoji: "🙌",
                title: "Clue 3",
                text: "Being halfway is a good reason to keep going."
              },
              {
                id: "u3l9c4",
                coverEmoji: "🃏",
                emoji: "🚫",
                title: "Clue 4",
                text: "Halfway does not mean finished."
              }
            ],
            options: [
              {
                text: "You are halfway to the goal",
                isBest: true,
                effect: "Yes! You are halfway, which means your saving plan is working."
              },
              {
                text: "You should spend it now",
                isBest: false,
                hint: "Check the clues again. Is halfway the same as finished?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Weekly Plan",
            scenarioText: "You save a little each weekend for a goal.",
            walletAmount: 3,
            goal: "Keep your plan going",
            heroEmoji: "📅",
            heroCaption: "Consistency helps saving grow.",
            question: "Which choice is best this weekend?",
            generalHint: "Pick the option that keeps the saving plan strong.",
            options: [
              {
                text: "Save the $3",
                subText: "Stay consistent",
                emoji: "🐷",
                effect: "Great! Saving a little each time keeps the plan working.",
                isBest: true
              },
              {
                text: "Spend it because it is only $3",
                subText: "Seems small",
                emoji: "💸",
                hint: "Small amounts still matter when you add them over time.",
                effect: "Small amounts can still help a goal when you save them.",
                isBest: false
              },
              {
                text: "Forget about the goal",
                subText: "Give up",
                emoji: "😕",
                hint: "Goals often need many small steps.",
                effect: "Giving up stops the progress you were making.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Save and Track",
            scenarioText: "You have $7 and want to keep your saving habit strong.",
            budget: 7,
            heroEmoji: "📊",
            heroCaption: "A strong plan can include saving and tracking.",
            question: "Which set makes the most sense?",
            generalHint: "Choose the option that supports the goal instead of random spending.",
            successMessage: "Nice! You chose a plan that supports your saving goal.",
            showAnswerTip: true,
            items: [
              { id: "u3l9b1", name: "Save the Money", price: 0, emoji: "🐷", tag: "goal first" },
              { id: "u3l9b2", name: "Sticker Tracker", price: 2, emoji: "⭐", tag: "track progress" },
              { id: "u3l9b3", name: "Candy", price: 4, emoji: "🍬", tag: "extra" },
              { id: "u3l9b4", name: "Tiny Toy", price: 5, emoji: "🧸", tag: "extra" }
            ],
            correctItemIds: ["u3l9b1", "u3l9b2"]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Step-by-Step Habits",
            scenarioText: "Sort the actions into helpful saving habits and unhelpful habits.",
            heroEmoji: "👣",
            heroCaption: "Small steps build strong goals.",
            question: "Which habits help saving and which habits slow it down?",
            generalHint: "Think about whether the habit moves the goal forward.",
            successMessage: "Awesome! You sorted the saving habits correctly.",
            items: [
              { id: "u3l9d1", label: "Save each week", emoji: "📅", bucket: "need" },
              { id: "u3l9d2", label: "Track progress", emoji: "📈", bucket: "need" },
              { id: "u3l9d3", label: "Be patient", emoji: "⏳", bucket: "need" },
              { id: "u3l9d4", label: "Spend every time", emoji: "🍭", bucket: "want" },
              { id: "u3l9d5", label: "Quit halfway", emoji: "🛑", bucket: "want" },
              { id: "u3l9d6", label: "Ignore the plan", emoji: "🙈", bucket: "want" }
            ]
          }
        ]
      },
      {
        id: 10,
        title: "Goal Tracker Game",
        coinReward: 10,
        context: [
          {
            term: "Tracking",
            definition:
              "Tracking means checking how close you are to your goal."
          }
        ],
        tips: "Tracking can help you stay motivated and keep your plan going.",
        questions: [
          {
            type: "budget-builder",
            scenarioTitle: "Sticker Chart Supplies",
            scenarioText: "You are building a goal tracker chart. You have $8 for supplies.",
            budget: 8,
            heroEmoji: "📊",
            heroCaption: "Build a simple tracker without overspending.",
            question: "Pick the best supplies for the tracker.",
            generalHint: "Choose the items that help you track progress, not extra decorations first.",
            successMessage:
              "Great! You built a useful tracker and stayed on budget.",
            showAnswerTip: true,
            items: [
              { id: "u3l10i1", name: "Chart Paper", price: 3, emoji: "📄", tag: "need" },
              { id: "u3l10i2", name: "Marker", price: 2, emoji: "🖊️", tag: "need" },
              { id: "u3l10i3", name: "Star Stickers", price: 3, emoji: "⭐", tag: "helpful" },
              { id: "u3l10i4", name: "Toy Figure", price: 6, emoji: "🧸", tag: "not for tracking" }
            ],
            correctItemIds: ["u3l10i1", "u3l10i2", "u3l10i3"]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Keep Going",
            scenarioText: "Your goal is not finished yet, but you can see progress on your chart.",
            heroEmoji: "🚀",
            heroCaption: "Progress can keep you motivated.",
            question: "What should you do next?",
            generalHint: "Tracking helps you keep moving forward.",
            options: [
              {
                text: "Keep saving",
                subText: "Stay motivated",
                emoji: "🐷",
                effect: "Excellent! The tracker helps you keep going.",
                isBest: true
              },
              {
                text: "Quit because it is not done yet",
                subText: "Give up",
                emoji: "😕",
                hint: "A goal does not need to be finished right away to be working.",
                effect: "Tracking is meant to help you keep going, not quit.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "What Is Tracking?",
            scenarioText: "A goal tracker shows where you are on your path.",
            heroEmoji: "🧩",
            heroCaption: "Use clues to understand tracking.",
            question: "Why is tracking helpful?",
            generalHint: "Look for the clue about seeing progress.",
            cards: [
              {
                id: "u3l10c1",
                coverEmoji: "🃏",
                emoji: "📈",
                title: "Clue 1",
                text: "Tracking lets you see your progress."
              },
              {
                id: "u3l10c2",
                coverEmoji: "🃏",
                emoji: "🎯",
                title: "Clue 2",
                text: "Seeing progress can help you stay focused on the goal."
              },
              {
                id: "u3l10c3",
                coverEmoji: "🃏",
                emoji: "🙌",
                title: "Clue 3",
                text: "Small progress can still feel exciting when you can see it."
              },
              {
                id: "u3l10c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Tracking helps goals feel more real and possible."
              }
            ],
            options: [
              {
                text: "It helps you see progress",
                isBest: true,
                effect: "Correct! Tracking helps you see how close you are getting."
              },
              {
                text: "It makes the goal disappear",
                isBest: false,
                hint: "The clues show that tracking helps you understand progress."
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Chart Choice",
            scenarioText: "You are halfway to your goal and looking at your tracker.",
            heroEmoji: "📍",
            heroCaption: "Halfway is a strong place to be.",
            question: "What should you think now?",
            generalHint: "Halfway means progress, not the end.",
            options: [
              {
                text: "I am doing well, so I should keep going",
                subText: "Stay steady",
                emoji: "✅",
                effect: "Exactly! Halfway is a good reason to keep going.",
                isBest: true
              },
              {
                text: "I should stop now",
                subText: "Quit early",
                emoji: "🛑",
                hint: "Halfway means progress, not finished.",
                effect: "Stopping now would end the progress you already made.",
                isBest: false
              },
              {
                text: "Tracking does not matter",
                subText: "Ignore it",
                emoji: "🙈",
                hint: "The tracker helps you see your progress clearly.",
                effect: "Ignoring the tracker means losing a helpful tool.",
                isBest: false
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Tracker Helpers",
            scenarioText: "Sort the actions into tracker helpers and tracker blockers.",
            heroEmoji: "📋",
            heroCaption: "Some habits make tracking useful. Others do not.",
            question: "Which actions help with tracking and which do not?",
            generalHint: "Sort by whether the action helps you follow progress.",
            successMessage: "Great sorting! You understand good tracking habits.",
            items: [
              { id: "u3l10d1", label: "Mark progress each week", emoji: "🗓️", bucket: "need" },
              { id: "u3l10d2", label: "Check how much is left", emoji: "🔍", bucket: "need" },
              { id: "u3l10d3", label: "Celebrate small wins", emoji: "🎉", bucket: "need" },
              { id: "u3l10d4", label: "Never look at the chart", emoji: "🙈", bucket: "want" },
              { id: "u3l10d5", label: "Forget the goal", emoji: "😕", bucket: "want" },
              { id: "u3l10d6", label: "Stop tracking completely", emoji: "🛑", bucket: "want" }
            ]
          }
        ]
      },
      {
        id: 11,
        title: "Emergency or Extra",
        coinReward: 10,
        context: [
          {
            term: "Emergency Need",
            definition:
              "Sometimes money must be used for an important problem or need."
          }
        ],
        tips: "When a real need appears, it often comes before extras.",
        questions: [
          {
            type: "drag-drop",
            scenarioTitle: "Sort the Situations",
            scenarioText: "Sort each item into Needs or Wants.",
            heroEmoji: "🚨",
            heroCaption: "Some choices are more important because of the situation.",
            question: "Which items belong where?",
            successMessage: "Perfect! You understood which choices are urgent needs and which are extras.",
            generalHint:
              "A need solves a real problem. A want is extra fun or comfort.",
            items: [
              { id: "u3l11i1", label: "Medicine", emoji: "💊", bucket: "need" },
              { id: "u3l11i2", label: "New Lunch Box", emoji: "🥪", bucket: "need" },
              { id: "u3l11i3", label: "Umbrella in Rain", emoji: "☔", bucket: "need" },
              { id: "u3l11i4", label: "Warm Gloves", emoji: "🧤", bucket: "need" },
              { id: "u3l11i5", label: "Candy", emoji: "🍬", bucket: "want" },
              { id: "u3l11i6", label: "Glow Bracelet", emoji: "💫", bucket: "want" },
              { id: "u3l11i7", label: "Trading Cards", emoji: "🃏", bucket: "want" },
              { id: "u3l11i8", label: "Fancy Pencil Topper", emoji: "🎀", bucket: "want" }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Rainy Walk Home",
            scenarioText: "It is raining hard. You only have enough money for one item.",
            heroEmoji: "🌧️",
            heroCaption: "The situation can change what matters most.",
            question: "Which choice is smartest right now?",
            generalHint: "Think about what helps most in the weather today.",
            options: [
              {
                text: "Buy an umbrella",
                subText: "Useful today",
                emoji: "☔",
                effect: "Correct! The umbrella solves the important problem right now.",
                isBest: true
              },
              {
                text: "Buy a candy bar",
                subText: "Treat first",
                emoji: "🍫",
                hint: "Candy is extra, but the rain problem is more important.",
                effect: "Candy is a want. The umbrella is the important need today.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Emergency Clues",
            scenarioText: "Sometimes something unexpected happens and changes what matters most.",
            heroEmoji: "🩹",
            heroCaption: "Use clues to find the urgent need.",
            question: "What makes an emergency need different?",
            generalHint: "Look for the clue about solving a real problem.",
            cards: [
              {
                id: "u3l11c1",
                coverEmoji: "🃏",
                emoji: "🚨",
                title: "Clue 1",
                text: "An emergency need helps with a real problem right away."
              },
              {
                id: "u3l11c2",
                coverEmoji: "🃏",
                emoji: "🛡️",
                title: "Clue 2",
                text: "It often helps with safety, health, or daily life."
              },
              {
                id: "u3l11c3",
                coverEmoji: "🃏",
                emoji: "🍭",
                title: "Clue 3",
                text: "Extras can usually wait."
              },
              {
                id: "u3l11c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Urgent needs should come before fun items."
              }
            ],
            options: [
              {
                text: "It solves an important problem",
                isBest: true,
                effect: "Exactly! Emergency needs matter because they solve a real problem."
              },
              {
                text: "It is more fun than other items",
                isBest: false,
                hint: "The clues focus on safety and real problems, not fun."
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Cold Day Choice",
            scenarioText: "It is freezing outside. You can buy one thing.",
            heroEmoji: "🥶",
            heroCaption: "The situation changes what matters first.",
            question: "Which choice makes the most sense?",
            generalHint: "Pick the option that helps with the cold weather.",
            options: [
              {
                text: "Warm gloves",
                subText: "Need first",
                emoji: "🧤",
                effect: "Yes! Warm gloves help with the real problem.",
                isBest: true
              },
              {
                text: "Candy",
                subText: "Treat choice",
                emoji: "🍬",
                hint: "Candy does not solve the cold-weather problem.",
                effect: "Candy is extra, not the urgent need.",
                isBest: false
              },
              {
                text: "Glow bracelet",
                subText: "Fun item",
                emoji: "💫",
                hint: "That is fun, but it does not help you stay warm.",
                effect: "The bracelet is a want, not the best choice for today.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Real Need Plan",
            scenarioText: "You have $10 and need to solve an important problem first.",
            budget: 10,
            heroEmoji: "🧠",
            heroCaption: "Choose the items that solve the real problem.",
            question: "Which set makes the most sense?",
            generalHint: "Pick the practical choice before extras.",
            successMessage: "Nice work! You focused on the real need first.",
            showAnswerTip: true,
            items: [
              { id: "u3l11b1", name: "Umbrella", price: 6, emoji: "☔", tag: "need" },
              { id: "u3l11b2", name: "Medicine", price: 4, emoji: "💊", tag: "need" },
              { id: "u3l11b3", name: "Candy", price: 3, emoji: "🍬", tag: "extra" },
              { id: "u3l11b4", name: "Toy", price: 5, emoji: "🧸", tag: "extra" }
            ],
            correctItemIds: ["u3l11b1", "u3l11b2"]
          }
        ]
      },
      {
        id: 12,
        title: "Celebrate Smartly",
        coinReward: 10,
        context: [
          {
            term: "Balanced Choice",
            definition:
              "A balanced choice can include a little fun without forgetting your goal."
          }
        ],
        tips: "It is okay to enjoy small fun things when the plan still makes sense.",
        questions: [
          {
            type: "budget-builder",
            scenarioTitle: "Birthday Treat Plan",
            scenarioText: "You have $14. You want a small birthday treat but also want to save some money.",
            budget: 14,
            heroEmoji: "🎂",
            heroCaption: "Can you celebrate and still save?",
            question: "Choose the smartest plan.",
            generalHint: "Pick one small treat and keep part of the money safe.",
            successMessage:
              "Nice balance! You had a little celebration and still saved money.",
            showAnswerTip: true,
            items: [
              { id: "u3l12i1", name: "Cupcake", price: 3, emoji: "🧁", tag: "small treat" },
              { id: "u3l12i2", name: "Juice", price: 2, emoji: "🧃", tag: "drink" },
              { id: "u3l12i3", name: "Big Candy Box", price: 8, emoji: "🍬", tag: "larger extra" },
              { id: "u3l12i4", name: "Save the Rest", price: 0, emoji: "🐷", tag: "goal money" }
            ],
            correctItemIds: ["u3l12i1", "u3l12i4"]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "After the Celebration",
            scenarioText: "You still care about your bigger goal after your birthday.",
            heroEmoji: "🎯",
            heroCaption: "Fun and goals can work together when you plan.",
            question: "What should you remember next?",
            generalHint: "Think about how your plan helped you celebrate and still save.",
            options: [
              {
                text: "Keep saving after the small treat",
                subText: "Back to the plan",
                emoji: "💰",
                effect: "Exactly! A small treat is okay when you keep the bigger plan going.",
                isBest: true
              },
              {
                text: "Stop saving because you already had fun",
                subText: "Forget the goal",
                emoji: "🛑",
                hint: "A small celebration does not mean the goal disappears.",
                effect: "The strongest choice is to enjoy a little fun and still continue your goal.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Balanced Plan Clues",
            scenarioText: "You can have a little fun and still be smart with money.",
            heroEmoji: "⚖️",
            heroCaption: "Use clues to understand balance.",
            question: "What makes a celebration choice balanced?",
            generalHint: "Look for the clue about a little fun and a strong plan.",
            cards: [
              {
                id: "u3l12c1",
                coverEmoji: "🃏",
                emoji: "🧁",
                title: "Clue 1",
                text: "A small treat can be okay sometimes."
              },
              {
                id: "u3l12c2",
                coverEmoji: "🃏",
                emoji: "🐷",
                title: "Clue 2",
                text: "Saving some money still matters."
              },
              {
                id: "u3l12c3",
                coverEmoji: "🃏",
                emoji: "🎯",
                title: "Clue 3",
                text: "A good plan does not forget the bigger goal."
              },
              {
                id: "u3l12c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Balance means enjoying a little without losing the plan."
              }
            ],
            options: [
              {
                text: "Small fun plus continued saving",
                isBest: true,
                effect: "Yes! That is what a balanced choice looks like."
              },
              {
                text: "Spend everything because it is a special day",
                isBest: false,
                hint: "The clues show that balance still includes some saving."
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Celebration Gift",
            scenarioText: "You got birthday money and want to use it wisely.",
            walletAmount: 12,
            goal: "Celebrate and still think ahead",
            heroEmoji: "🎁",
            heroCaption: "Special days still need smart choices.",
            question: "What is the smartest plan?",
            generalHint: "Choose the option with a little fun and a little saving.",
            options: [
              {
                text: "Buy one small treat and save the rest",
                subText: "Balanced idea",
                emoji: "✨",
                effect: "Great choice! That keeps the celebration fun and smart.",
                isBest: true
              },
              {
                text: "Spend every dollar on candy",
                subText: "All now",
                emoji: "🍬",
                hint: "That leaves nothing for later.",
                effect: "That choice forgets about saving completely.",
                isBest: false
              },
              {
                text: "Hide all the money and never enjoy any of it",
                subText: "No fun at all",
                emoji: "🫙",
                hint: "Balance can include a little fun too.",
                effect: "A balanced plan is usually better than only one extreme.",
                isBest: false
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Balanced or Not?",
            scenarioText: "Sort the actions into balanced choices and not-balanced choices.",
            heroEmoji: "📦",
            heroCaption: "A smart celebration still uses planning.",
            question: "Which actions show balance and which do not?",
            generalHint: "Sort by whether the choice includes both fun and smart thinking.",
            successMessage: "Nice work! You know what a balanced choice looks like.",
            items: [
              { id: "u3l12d1", label: "One small treat and save the rest", emoji: "🧁", bucket: "need" },
              { id: "u3l12d2", label: "Enjoy a little and keep your goal", emoji: "🎯", bucket: "need" },
              { id: "u3l12d3", label: "Plan before spending", emoji: "📝", bucket: "need" },
              { id: "u3l12d4", label: "Spend all your money at once", emoji: "💸", bucket: "want" },
              { id: "u3l12d5", label: "Forget your goal", emoji: "😕", bucket: "want" },
              { id: "u3l12d6", label: "Buy treats just because", emoji: "🍭", bucket: "want" }
            ]
          }
        ]
      }
    ],
    unit4: [
      {
        id: 13,
        title: "Ways to Earn Money",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=ppnhNKRwKHg",
        context: [
          {
            term: "Earn",
            definition:
              "Earning money means doing helpful work or completing a useful task."
          }
        ],
        tips: "Money is often earned by helping, working, or doing a job well.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Helping at Home",
            scenarioText: "You want money for a goal.",
            walletAmount: 0,
            goal: "Find a good way to earn",
            heroEmoji: "🧹",
            heroCaption: "Helpful work can become earning.",
            question: "What is a good way to earn money?",
            generalHint: "Think about useful jobs you can do safely.",
            options: [
              {
                text: "Do chores",
                subText: "Helpful job",
                emoji: "🧹",
                effect: "Correct! Helping with chores can be a good way to earn money.",
                isBest: true
              },
              {
                text: "Wait and hope money appears",
                subText: "No plan",
                emoji: "💭",
                hint: "Money usually comes from a plan or effort.",
                effect: "Waiting without a plan is not a strong way to earn.",
                isBest: false
              },
              {
                text: "Spend before you earn",
                subText: "Wrong order",
                emoji: "💸",
                hint: "Spending comes after you have money, not before.",
                effect: "A smart plan starts with earning first.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Neighbor Helper",
            scenarioText: "A neighbor needs help watering plants.",
            heroEmoji: "🌱",
            heroCaption: "Use the clues to find the best earning habit.",
            question: "What makes this a smart earning choice?",
            generalHint: "Think about being helpful and responsible.",
            cards: [
              {
                id: "u4l13c1",
                coverEmoji: "🃏",
                emoji: "🤝",
                title: "Clue 1",
                text: "Helpful work can be a fair way to earn money."
              },
              {
                id: "u4l13c2",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 2",
                text: "Doing the job well matters."
              },
              {
                id: "u4l13c3",
                coverEmoji: "🃏",
                emoji: "🕒",
                title: "Clue 3",
                text: "Being on time and reliable is important."
              },
              {
                id: "u4l13c4",
                coverEmoji: "🃏",
                emoji: "💰",
                title: "Clue 4",
                text: "Money is usually earned after effort."
              }
            ],
            options: [
              {
                text: "Help and do the job well",
                isBest: true,
                effect: "Great! Helpful work done responsibly is a strong earning habit."
              },
              {
                text: "Ask for money without helping",
                isBest: false,
                hint: "Check the clues again. What comes before earning?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Pet Feeding Job",
            scenarioText: "A family friend asks if you can feed their pet while they are away.",
            walletAmount: 0,
            goal: "Earn in a responsible way",
            heroEmoji: "🐶",
            heroCaption: "Responsible work can become earning.",
            question: "What makes this a smart earning chance?",
            generalHint: "Think about helpful work and trust.",
            options: [
              {
                text: "It is a real helpful job",
                subText: "Earn fairly",
                emoji: "✅",
                effect: "Exactly! Helpful work can be a fair way to earn money.",
                isBest: true
              },
              {
                text: "You get money without doing much",
                subText: "Wrong reason",
                emoji: "🙈",
                hint: "Earning should come from doing the job well.",
                effect: "The strong reason is the helpful work, not just getting money.",
                isBest: false
              },
              {
                text: "You can ignore the task",
                subText: "Not responsible",
                emoji: "😕",
                hint: "Responsibility matters when you earn.",
                effect: "A job must be done properly to be a smart earning habit.",
                isBest: false
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Ways to Earn or Not",
            scenarioText: "Sort the actions into fair ways to earn and not good earning habits.",
            heroEmoji: "📦",
            heroCaption: "Earning usually comes from useful effort.",
            question: "Which actions belong where?",
            generalHint: "Sort by whether the action includes helpful work.",
            successMessage: "Nice sorting! You understand fair ways to earn.",
            items: [
              { id: "u4l13d1", label: "Do chores", emoji: "🧹", bucket: "need" },
              { id: "u4l13d2", label: "Water plants", emoji: "🌱", bucket: "need" },
              { id: "u4l13d3", label: "Help organize books", emoji: "📚", bucket: "need" },
              { id: "u4l13d4", label: "Ask for money without helping", emoji: "💭", bucket: "want" },
              { id: "u4l13d5", label: "Do the job carelessly", emoji: "😕", bucket: "want" },
              { id: "u4l13d6", label: "Spend before earning", emoji: "💸", bucket: "want" }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Earning Plan Board",
            scenarioText: "You want to make a simple board to track earning jobs. You have $6.",
            budget: 6,
            heroEmoji: "📋",
            heroCaption: "Planning can help earning stay organized.",
            question: "Which supplies make the most sense?",
            generalHint: "Choose the simple items that help you plan your jobs.",
            successMessage: "Great! You picked useful items for an earning plan.",
            showAnswerTip: true,
            items: [
              { id: "u4l13b1", name: "Paper", price: 2, emoji: "📄", tag: "need" },
              { id: "u4l13b2", name: "Marker", price: 2, emoji: "🖊️", tag: "need" },
              { id: "u4l13b3", name: "Sticker Stars", price: 2, emoji: "⭐", tag: "helpful" },
              { id: "u4l13b4", name: "Toy", price: 5, emoji: "🧸", tag: "not needed" }
            ],
            correctItemIds: ["u4l13b1", "u4l13b2", "u4l13b3"]
          }
        ]
      },
      {
        id: 14,
        title: "Spend, Save, Share",
        coinReward: 10,
        videoUrl: "https://www.youtube.com/watch?v=oqgtFqd8nHo",
        context: [
          {
            term: "Share",
            definition:
              "Sharing means using some of your money to help others."
          }
        ],
        tips: "A good money plan can include spending, saving, and sharing.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Three Good Uses",
            scenarioText: "You earned $12 this week.",
            walletAmount: 12,
            goal: "Use money wisely",
            heroEmoji: "🪙",
            heroCaption: "Balanced plans are strong plans.",
            question: "What is a balanced plan?",
            generalHint: "A smart plan can do more than one good thing.",
            options: [
              {
                text: "Spend some, save some, share some",
                subText: "Balanced plan",
                emoji: "⚖️",
                effect: "Excellent! That is a balanced and thoughtful money plan.",
                isBest: true
              },
              {
                text: "Spend every dollar",
                subText: "All now",
                emoji: "💸",
                hint: "Using all your money right away leaves nothing for later or for helping.",
                effect: "Spending all of it removes balance from your plan.",
                isBest: false
              },
              {
                text: "Hide every dollar forever",
                subText: "Only save",
                emoji: "🫙",
                hint: "Saving matters, but money can also be used wisely and kindly.",
                effect: "A stronger plan is usually more balanced than this.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Weekend Money Plan",
            scenarioText: "You have $10 for the weekend.",
            budget: 10,
            heroEmoji: "📅",
            heroCaption: "Can you make a balanced money plan?",
            question: "Pick the best set of choices.",
            generalHint: "Choose something for spending, something for saving, and something kind.",
            successMessage: "Nice work! You made a balanced spend-save-share plan.",
            showAnswerTip: true,
            items: [
              { id: "u4l14i1", name: "Small Treat", price: 2, emoji: "🍪", tag: "spend" },
              { id: "u4l14i2", name: "Save the Rest", price: 0, emoji: "🐷", tag: "save" },
              { id: "u4l14i3", name: "Charity Box", price: 2, emoji: "❤️", tag: "share" },
              { id: "u4l14i4", name: "Big Candy Bag", price: 6, emoji: "🍬", tag: "extra spend" },
              { id: "u4l14i5", name: "Toy Car", price: 8, emoji: "🧸", tag: "big spend" }
            ],
            correctItemIds: ["u4l14i1", "u4l14i2", "u4l14i3"]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Balanced Money Clues",
            scenarioText: "A strong money plan can do more than one good thing.",
            heroEmoji: "🧩",
            heroCaption: "Use clues to understand balance.",
            question: "What makes a money plan balanced?",
            generalHint: "Look for the clue about using money in more than one good way.",
            cards: [
              {
                id: "u4l14c1",
                coverEmoji: "🃏",
                emoji: "🍪",
                title: "Clue 1",
                text: "Spending a little can be okay."
              },
              {
                id: "u4l14c2",
                coverEmoji: "🃏",
                emoji: "🐷",
                title: "Clue 2",
                text: "Saving some money matters too."
              },
              {
                id: "u4l14c3",
                coverEmoji: "🃏",
                emoji: "❤️",
                title: "Clue 3",
                text: "Sharing can help other people."
              },
              {
                id: "u4l14c4",
                coverEmoji: "🃏",
                emoji: "⚖️",
                title: "Clue 4",
                text: "A balanced plan uses money in thoughtful ways."
              }
            ],
            options: [
              {
                text: "Spend some, save some, share some",
                isBest: true,
                effect: "Correct! That is what balance looks like here."
              },
              {
                text: "Spend everything right away",
                isBest: false,
                hint: "The clues show that a balanced plan includes more than one use."
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Kind Choice",
            scenarioText: "You have enough money for one small treat and still some left over.",
            walletAmount: 8,
            goal: "Make a balanced choice",
            heroEmoji: "🤝",
            heroCaption: "Sharing can be part of a smart money plan.",
            question: "What is the strongest plan?",
            generalHint: "Choose the option with balance, not only one use.",
            options: [
              {
                text: "Buy one small treat, save some, and share some",
                subText: "Balanced plan",
                emoji: "✅",
                effect: "Exactly! That uses money wisely in different good ways.",
                isBest: true
              },
              {
                text: "Spend it all on treats",
                subText: "Only spend",
                emoji: "🍬",
                hint: "That leaves no room for saving or sharing.",
                effect: "That plan is not balanced.",
                isBest: false
              },
              {
                text: "Hide all the money and do nothing else",
                subText: "Only save",
                emoji: "🫙",
                hint: "Saving is good, but balance includes more than one good use.",
                effect: "That plan misses the full idea of balance.",
                isBest: false
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Spend, Save, or Share?",
            scenarioText: "Sort each choice into the best bucket.",
            heroEmoji: "📦",
            heroCaption: "A balanced plan uses money in different ways.",
            question: "Where does each action belong?",
            generalHint: "Think about whether the action is spending, saving, or sharing.",
            successMessage: "Great sorting! You understand the three money choices.",
            items: [
              { id: "u4l14d1", label: "Buy a snack", emoji: "🍪", bucket: "need" },
              { id: "u4l14d2", label: "Put money in savings", emoji: "🐷", bucket: "need" },
              { id: "u4l14d3", label: "Give to a charity box", emoji: "❤️", bucket: "need" },
              { id: "u4l14d4", label: "Spend every dollar now", emoji: "💸", bucket: "want" },
              { id: "u4l14d5", label: "Forget about helping others", emoji: "🙈", bucket: "want" },
              { id: "u4l14d6", label: "Never plan your money", emoji: "😕", bucket: "want" }
            ]
          }
        ]
      },
      {
        id: 15,
        title: "Big Goals Take Time",
        coinReward: 10,
        context: [
          {
            term: "Long-Term Goal",
            definition:
              "A long-term goal is something that takes more time and patience to reach."
          }
        ],
        tips: "Big goals often need patience, planning, and regular saving.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "New Bike Plan",
            scenarioText: "A bike is expensive, so you need a plan.",
            walletAmount: 10,
            goal: "Save for a bike",
            heroEmoji: "🚲",
            heroCaption: "Big goals are built step by step.",
            question: "What is the strongest idea?",
            generalHint: "A big goal is usually not reached in one day.",
            options: [
              {
                text: "Save regularly over time",
                subText: "Keep building",
                emoji: "🐷",
                effect: "Correct! Big goals usually need regular saving.",
                isBest: true
              },
              {
                text: "Give up because it costs a lot",
                subText: "Too hard",
                emoji: "😕",
                hint: "Big goals can still be reached with a plan.",
                effect: "A good plan can make a big goal feel possible.",
                isBest: false
              },
              {
                text: "Spend your money on treats each week",
                subText: "Fun now",
                emoji: "🍭",
                hint: "Treats use the money that could build the bike fund.",
                effect: "Those treats slow the bike goal down.",
                isBest: false
              }
            ]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Stay Motivated",
            scenarioText: "Your goal still feels far away.",
            heroEmoji: "🎯",
            heroCaption: "Progress matters even before the finish line.",
            question: "What should you remember?",
            generalHint: "Big goals are often built from many small wins.",
            cards: [
              {
                id: "u4l15c1",
                coverEmoji: "🃏",
                emoji: "👣",
                title: "Clue 1",
                text: "Every small saving step matters."
              },
              {
                id: "u4l15c2",
                coverEmoji: "🃏",
                emoji: "📅",
                title: "Clue 2",
                text: "Saving often works better than waiting for one huge amount."
              },
              {
                id: "u4l15c3",
                coverEmoji: "🃏",
                emoji: "📈",
                title: "Clue 3",
                text: "Progress can be slow and still be real progress."
              },
              {
                id: "u4l15c4",
                coverEmoji: "🃏",
                emoji: "🙌",
                title: "Clue 4",
                text: "Staying patient helps long-term goals."
              }
            ],
            options: [
              {
                text: "Every small step counts",
                isBest: true,
                effect: "Correct! Small steps really do matter."
              },
              {
                text: "Only big amounts count",
                isBest: false,
                hint: "Look at the clues again. Can small steps still build a big goal?"
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Long Game",
            scenarioText: "A goal costs much more than you have today.",
            walletAmount: 5,
            goal: "Stay patient with a long-term goal",
            heroEmoji: "⏳",
            heroCaption: "Patience is part of the plan.",
            question: "What should you do now?",
            generalHint: "Choose the option that keeps the long-term goal alive.",
            options: [
              {
                text: "Save the $5 and keep going",
                subText: "Patient plan",
                emoji: "💰",
                effect: "Yes! Small saving now helps the long-term plan.",
                isBest: true
              },
              {
                text: "Quit because it is not enough yet",
                subText: "Give up",
                emoji: "🛑",
                hint: "Long-term goals take time.",
                effect: "Quitting stops the progress that could have grown.",
                isBest: false
              },
              {
                text: "Spend it because it is only $5",
                subText: "Small amount",
                emoji: "🍪",
                hint: "Small amounts still matter when the goal is long-term.",
                effect: "That choice slows the goal instead of helping it.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Goal Helper Kit",
            scenarioText: "You have $7 and want tools to help with a long-term goal.",
            budget: 7,
            heroEmoji: "🧰",
            heroCaption: "Good habits can help goals stay strong.",
            question: "Which set makes the most sense?",
            generalHint: "Choose the items that help with saving or tracking, not random extras.",
            successMessage: "Nice! You picked tools that support a long-term goal.",
            showAnswerTip: true,
            items: [
              { id: "u4l15b1", name: "Savings Jar", price: 3, emoji: "🫙", tag: "helpful" },
              { id: "u4l15b2", name: "Goal Chart", price: 2, emoji: "📊", tag: "track progress" },
              { id: "u4l15b3", name: "Marker", price: 2, emoji: "🖊️", tag: "useful" },
              { id: "u4l15b4", name: "Candy Box", price: 5, emoji: "🍬", tag: "extra" }
            ],
            correctItemIds: ["u4l15b1", "u4l15b2", "u4l15b3"]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Long-Term Goal Habits",
            scenarioText: "Sort the habits into helpful and not-helpful for long-term goals.",
            heroEmoji: "📦",
            heroCaption: "Big goals need strong habits.",
            question: "Which habits help and which habits get in the way?",
            generalHint: "Sort by whether the habit supports patience and saving.",
            successMessage: "Great job! You know what helps long-term goals.",
            items: [
              { id: "u4l15d1", label: "Save regularly", emoji: "📅", bucket: "need" },
              { id: "u4l15d2", label: "Track progress", emoji: "📈", bucket: "need" },
              { id: "u4l15d3", label: "Be patient", emoji: "⏳", bucket: "need" },
              { id: "u4l15d4", label: "Spend on treats every week", emoji: "🍭", bucket: "want" },
              { id: "u4l15d5", label: "Quit because it is slow", emoji: "😕", bucket: "want" },
              { id: "u4l15d6", label: "Ignore the plan", emoji: "🙈", bucket: "want" }
            ]
          }
        ]
      },
      {
        id: 16,
        title: "Money Mission Final Challenge",
        coinReward: 25,
        context: [
          {
            term: "Money Mission",
            definition:
              "A money mission is using everything you learned to make strong choices."
          }
        ],
        tips: "Use all your money skills together: think, compare, save, and choose wisely.",
        questions: [
          {
            type: "scenario-choice",
            scenarioTitle: "Mission 1",
            scenarioText: "You have $20. You need a notebook and want candy.",
            walletAmount: 20,
            goal: "Choose wisely",
            heroEmoji: "📓",
            heroCaption: "Needs first.",
            question: "What is the smartest plan?",
            generalHint: "Think about what matters most today.",
            options: [
              {
                text: "Buy the notebook first and save the rest",
                subText: "Need first",
                emoji: "✅",
                effect: "Excellent! You handled your need first and still saved money.",
                isBest: true
              },
              {
                text: "Buy lots of candy first",
                subText: "Treat first",
                emoji: "🍬",
                hint: "Candy is a want. What comes first?",
                effect: "Candy is a want, but the notebook is more important.",
                isBest: false
              },
              {
                text: "Spend all $20 on treats",
                subText: "Use it all",
                emoji: "💸",
                hint: "That leaves nothing for the notebook or savings.",
                effect: "That plan uses your money too quickly.",
                isBest: false
              }
            ]
          },
          {
            type: "budget-builder",
            scenarioTitle: "Mission 2 Basket",
            scenarioText: "You have $10 to prepare for a study night.",
            budget: 10,
            heroEmoji: "🧠",
            heroCaption: "Can you build a smart study basket?",
            question: "Pick the best set of items.",
            generalHint: "Choose useful items before extra treats.",
            successMessage: "Great job! You built a smart study plan.",
            showAnswerTip: true,
            items: [
              { id: "u4l16i1", name: "Notebook", price: 4, emoji: "📓", tag: "need" },
              { id: "u4l16i2", name: "Pencil", price: 2, emoji: "✏️", tag: "need" },
              { id: "u4l16i3", name: "Water", price: 2, emoji: "💧", tag: "helpful" },
              { id: "u4l16i4", name: "Candy Box", price: 6, emoji: "🍬", tag: "extra" }
            ],
            correctItemIds: ["u4l16i1", "u4l16i2", "u4l16i3"]
          },
          {
            type: "tap-reveal",
            scenarioTitle: "Mission 3 Clues",
            scenarioText: "A smart choice uses many money skills together.",
            heroEmoji: "🧩",
            heroCaption: "Use all your learning together.",
            question: "Which idea matches a strong money mission?",
            generalHint: "Look for the clue about using more than one skill.",
            cards: [
              {
                id: "u4l16c1",
                coverEmoji: "🃏",
                emoji: "🛑",
                title: "Clue 1",
                text: "Think before you spend."
              },
              {
                id: "u4l16c2",
                coverEmoji: "🃏",
                emoji: "🔍",
                title: "Clue 2",
                text: "Compare prices and value."
              },
              {
                id: "u4l16c3",
                coverEmoji: "🃏",
                emoji: "🐷",
                title: "Clue 3",
                text: "Save when a goal matters."
              },
              {
                id: "u4l16c4",
                coverEmoji: "🃏",
                emoji: "✅",
                title: "Clue 4",
                text: "Smart choices use many good habits together."
              }
            ],
            options: [
              {
                text: "Think, compare, and choose wisely",
                isBest: true,
                effect: "Exactly! A money mission uses many smart habits together."
              },
              {
                text: "Buy fast without planning",
                isBest: false,
                hint: "The clues show that good money choices are thoughtful."
              }
            ]
          },
          {
            type: "scenario-choice",
            scenarioTitle: "Mission 4 Choice",
            scenarioText: "You want something fun, but you also have a goal and a budget.",
            walletAmount: 12,
            goal: "Use all your money skills",
            heroEmoji: "🏆",
            heroCaption: "The final challenge uses everything together.",
            question: "Which choice is strongest?",
            generalHint: "Pick the option that uses needs, planning, and saving.",
            options: [
              {
                text: "Buy what you need, stay in budget, and save the rest",
                subText: "Smart mission",
                emoji: "🎯",
                effect: "Excellent! That uses many strong money skills together.",
                isBest: true
              },
              {
                text: "Spend it all because you want fun now",
                subText: "No plan",
                emoji: "💸",
                hint: "That ignores the budget and the goal.",
                effect: "That choice does not use the money skills you learned.",
                isBest: false
              },
              {
                text: "Buy the first thing you see",
                subText: "No comparing",
                emoji: "👀",
                hint: "A strong mission means thinking and comparing first.",
                effect: "That plan skips careful thinking.",
                isBest: false
              }
            ]
          },
          {
            type: "drag-drop",
            scenarioTitle: "Final Mission Sort",
            scenarioText: "Sort the actions into smart money mission habits and not-smart habits.",
            heroEmoji: "📦",
            heroCaption: "This is your final money skills test.",
            question: "Which actions show smart money habits and which do not?",
            generalHint: "Sort by whether the action uses what you learned in the unit.",
            successMessage: "Amazing! You completed the final money mission.",
            items: [
              { id: "u4l16d1", label: "Choose needs first", emoji: "📓", bucket: "need" },
              { id: "u4l16d2", label: "Compare prices", emoji: "🔍", bucket: "need" },
              { id: "u4l16d3", label: "Save for goals", emoji: "🐷", bucket: "need" },
              { id: "u4l16d4", label: "Spend without thinking", emoji: "💸", bucket: "want" },
              { id: "u4l16d5", label: "Ignore the budget", emoji: "🙈", bucket: "want" },
              { id: "u4l16d6", label: "Buy extras first", emoji: "🍬", bucket: "want" }
            ]
          }
        ]
      }
    ]
  }
};



export default lessonsData;