export interface Question {
  id: number
  text: string
  options: {
    A: string
    B: string
    C: string
    D: string
  }
  correctAnswers: string[] // Array of correct options (e.g., ["A", "C"])
}

export interface Exam {
  id: number
  title: string
  description?: string
  questions: Question[]
}

export interface UserAnswers {
  [questionId: number]: string[] // Array of selected options for each question
}

