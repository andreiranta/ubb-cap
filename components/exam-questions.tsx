"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Exam, UserAnswers } from "@/types/exam"

interface ExamQuestionsProps {
  exam: Exam
  userAnswers: UserAnswers
  onAnswerSelect: (questionId: number, answer: string) => void
  onSubmit: () => void
  onBackToExams: () => void
}

export default function ExamQuestions({
  exam,
  userAnswers,
  onAnswerSelect,
  onSubmit,
  onBackToExams,
}: ExamQuestionsProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const currentQuestion = exam.questions[currentQuestionIndex]

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const isLastQuestion = currentQuestionIndex === exam.questions.length - 1
  const answeredCount = Object.keys(userAnswers).length
  const totalQuestions = exam.questions.length
  const canSubmit = answeredCount === totalQuestions

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" onClick={onBackToExams}>
          Back to Exams
        </Button>
        <span className="text-sm font-medium">
          Question {currentQuestionIndex + 1} of {exam.questions.length}
        </span>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">{currentQuestion.text}</h2>

        <RadioGroup
        //@ts-ignore
          value={userAnswers[currentQuestion.id] || ""}
          onValueChange={(value) => onAnswerSelect(currentQuestion.id, value)}
          className="space-y-3"
        >
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-accent"
              onClick={() => onAnswerSelect(currentQuestion.id, key)}
            >
              <RadioGroupItem value={key} id={`option-${key}`} />
              <Label htmlFor={`option-${key}`} className="flex-grow cursor-pointer">
                <span className="font-medium mr-2">{key}:</span> {value}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between items-center pt-4">
        <Button variant="outline" onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>

        {isLastQuestion ? (
          <Button onClick={onSubmit} disabled={!canSubmit}>
            Submit ({answeredCount}/{totalQuestions})
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  )
}

