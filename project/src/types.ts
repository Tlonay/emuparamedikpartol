export interface Student {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  name: string;
  slides: string[];
  notes: string[];
  quizzes: Quiz[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}