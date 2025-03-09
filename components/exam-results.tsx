"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle } from "lucide-react"
import type { Exam, UserAnswers } from "@/types/exam"

interface ExamResultsProps {
    exam: Exam
    userAnswers: UserAnswers
    onRetry: () => void
    onBackToExams: () => void
}

export default function ExamResults({ exam, userAnswers, onRetry, onBackToExams }: ExamResultsProps) {
    const modifier = 90 / exam.questions.length;
    const total = exam.questions.reduce((total, question, i) => {
        const userSelectedAnswers = userAnswers[question.id] || [];
        const correctAnswers = question.correctAnswers;

        let score = 0;
        const p = 1, t = correctAnswers.length;
        for (const answer of userSelectedAnswers) {
            if (correctAnswers.includes(answer)) {
                score += p / t;
            } else {
                score -= 0.66 * p / t;
            }
        }

        if (score < 0) score = 0;
        
        return total + modifier * score;
    }, 0) + 10;

    const getGradeLabel = (score: number) => {
        if (score >= 95) return "Excellent"
        if (score >= 92) return "Very Good"
        if (score >= 90) return "Good"
        if (score >= 88) return "Satisfactory"
        return "Needs Improvement"
    }

    const getAnswerStatus = (question: any, userSelectedAnswers: string[]) => {
        const correctAnswers = question.correctAnswers

        // All correct and no wrong answers
        if (
            userSelectedAnswers.every((answer) => correctAnswers.includes(answer)) &&
            // @ts-ignore
            correctAnswers.every((answer) => userSelectedAnswers.includes(answer))
        ) {
            return "correct"
        }

        // Some correct answers but not all, or some wrong answers
        if (userSelectedAnswers.some((answer) => correctAnswers.includes(answer))) {
            return "partial"
        }

        // No correct answers
        return "incorrect"
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Your Results</h2>
                <div className="text-4xl font-bold">{total.toFixed(0)}%</div>
                <div className="text-lg font-medium">{getGradeLabel(total)}</div>
            </div>

            <div className="space-y-4 mt-6">
                <h3 className="font-medium text-lg">Question Review</h3>
                {exam.questions.map((question, index) => {
                    const userSelectedAnswers = userAnswers[question.id] || []
                    const status = getAnswerStatus(question, userSelectedAnswers)

                    return (
                        <div key={question.id} className="border rounded-md p-4 space-y-2">
                            <div className="flex items-start gap-2">
                                {status === "correct" ? (
                                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                                ) : status === "partial" ? (
                                    <AlertCircle className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                                ) : (
                                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                )}
                                <div className="w-full">
                                    <p className="font-medium">
                                        Question {index + 1}: {question.text}
                                    </p>

                                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {Object.entries(question.options).map(([key, value]) => {
                                            const isSelected = userSelectedAnswers.includes(key)
                                            const isCorrect = question.correctAnswers.includes(key)

                                            let className = "text-sm p-2 rounded border"

                                            if (isSelected && isCorrect) {
                                                className += " bg-green-100 border-green-300 dark:bg-green-900/30 dark:border-green-800"
                                            } else if (isSelected && !isCorrect) {
                                                className += " bg-red-100 border-red-300 dark:bg-red-900/30 dark:border-red-800"
                                            } else if (!isSelected && isCorrect) {
                                                className += " bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800"
                                            }

                                            return (
                                                <div key={key} className={className}>
                                                    <span className="font-medium">{key}:</span> {value}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={onBackToExams} className="flex-1">
                    Back
                </Button>
                <Button onClick={onRetry} className="flex-1">
                    Retry
                </Button>
            </div>
        </div>
    )
}
