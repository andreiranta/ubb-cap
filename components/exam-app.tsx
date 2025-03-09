"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ExamSelector from "@/components/exam-selector"
import AnswerSheet from "@/components/answer-sheet"
import ExamResults from "@/components/exam-results"
import { exams } from "@/data/exams"
import type { Exam, UserAnswers } from "@/types/exam"

export default function ExamApp() {
    const [selectedExam, setSelectedExam] = useState<Exam | null>(null)
    const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
    const [showResults, setShowResults] = useState(false)

    const handleExamSelect = (exam: Exam) => {
        setSelectedExam(exam)

        // Initialize empty answers for each question
        const initialAnswers: UserAnswers = {}
        exam.questions.forEach((question) => {
            initialAnswers[question.id] = []
        })

        setUserAnswers(initialAnswers)
        setShowResults(false)
    }

    const handleAnswerToggle = (questionId: number, option: string) => {
        setUserAnswers((prev) => {
            const currentAnswers = [...(prev[questionId] || [])]

            // Toggle the answer (add if not present, remove if present)
            const index = currentAnswers.indexOf(option)
            if (index === -1) {
                currentAnswers.push(option)
            } else {
                currentAnswers.splice(index, 1)
            }

            return {
                ...prev,
                [questionId]: currentAnswers,
            }
        })
    }

    const handleSubmit = () => {
        setShowResults(true)
    }

    const handleRetry = () => {
        if (selectedExam) {
            // Reset answers but keep them initialized
            const initialAnswers: UserAnswers = {}
            selectedExam.questions.forEach((question) => {
                initialAnswers[question.id] = []
            })
            setUserAnswers(initialAnswers)
        }
        setShowResults(false)
    }

    const handleBackToExams = () => {
        setSelectedExam(null)
        setUserAnswers({})
        setShowResults(false)
    }

    return (
        <Card className="overflow-y-auto overflow-x-hidden w-full h-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-center">Select a subject</CardTitle>
                {/* <CardDescription className="text-center">Select your answers and check your grade</CardDescription> */}
            </CardHeader>
            <CardContent>
                {!selectedExam ? (
                    <ExamSelector exams={exams} onSelectExam={handleExamSelect} />
                ) : !showResults ? (
                    <AnswerSheet
                        exam={selectedExam}
                        userAnswers={userAnswers}
                        onAnswerToggle={handleAnswerToggle}
                        onSubmit={handleSubmit}
                        onBackToExams={handleBackToExams}
                    />
                ) : (
                    <ExamResults
                        exam={selectedExam}
                        userAnswers={userAnswers}
                        onRetry={handleRetry}
                        onBackToExams={handleBackToExams}
                    />
                )}
            </CardContent>
        </Card>
    )
}

