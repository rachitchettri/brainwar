// File: types/socket.ts
export interface QueueJoinPayload {
    category: string;
    elo: number;
  }
  
  export interface MatchFoundPayload {
    roomId: string;
    opponent?: {
      id: string;
      elo: number;
    };
  }
  
  export interface Question {
    id: string;
    content: string;
    options: string[];
    correct: number;
    category: string;
  }
  
  export interface GameStartPayload {
    questions: Question[];
  }
  
  export interface AnswerSubmission {
    roomId: string;
    userId: string;
    questionId: string;
    answerIndex: number;
  }