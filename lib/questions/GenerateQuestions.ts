type Question = {
  id: string;
  content: string;
  options: string[];
  correct: number;
};

const mathQuestions: Question[] = [
  {
    id: "q1",
    content: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    correct: 2,
  },
  // Add more...
];

const gkQuestions: Question[] = [
  {
    id: "q2",
    content: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correct: 1,
  },
  // Add more...
];

export function generateQuestions(category: string, count: number = 5): Question[] {
  let pool: Question[];

  switch (category.toLowerCase()) {
    case "math":
      pool = mathQuestions;
      break;
    case "gk":
      pool = gkQuestions;
      break;
    default:
      pool = [];
  }

  return shuffle(pool).slice(0, count);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}
