"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Exam, UserAnswers } from "@/types/exam"

interface AnswerSheetProps {
    exam: Exam
    userAnswers: UserAnswers
    onAnswerToggle: (questionId: number, option: string) => void
    onSubmit: () => void
    onBackToExams: () => void
}

export default function AnswerSheet({ exam, userAnswers, onAnswerToggle, onSubmit, onBackToExams }: AnswerSheetProps) {
    const [activeTab, setActiveTab] = useState("answer-sheet")

    const options = ["A", "B", "C", "D"]

    const isAnswerSelected = (questionId: number, option: string) => {
        return userAnswers[questionId]?.includes(option) || false
    }

    const hasAnsweredAll = Object.values(userAnswers).every((answers) => answers.length > 0)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Button variant="outline" size="sm" onClick={onBackToExams}>
                    Back
                </Button>
                <h2 className="text-lg font-medium">{exam.title}</h2>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                {/* <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="answer-sheet">Answer Sheet</TabsTrigger>
                    <TabsTrigger value="questions">Questions</TabsTrigger>
                </TabsList> */}

                <TabsContent value="answer-sheet" className="mt-4">
                    <div className="border rounded-md overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-muted">
                                    <th className="p-2 text-left font-medium">Question</th>
                                    {options.map((option) => (
                                        <th key={option} className="p-2 text-center font-medium w-16">
                                            {option}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {exam.questions.map((question, index) => (
                                    <tr key={question.id} className="border-t">
                                        <td className="p-2 font-medium">{index + 1}</td>
                                        {options.map((option) => (
                                            <td key={option} className="p-2 text-center relative">
                                                <Checkbox
                                                    checked={isAnswerSelected(question.id, option)}
                                                    onCheckedChange={() => onAnswerToggle(question.id, option)}
                                                    className="mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                                />
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </TabsContent>

                <TabsContent value="questions" className="mt-4 space-y-6">
                    {exam.questions.map((question, index) => (
                        <div key={question.id} className="border rounded-md p-4">
                            <h3 className="font-medium mb-2">
                                Question {index + 1}: {question.text}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                                {Object.entries(question.options).map(([key, value]) => (
                                    <div key={key} className="flex items-start space-x-2">
                                        <Checkbox
                                            id={`q${question.id}-${key}`}
                                            checked={isAnswerSelected(question.id, key)}
                                            onCheckedChange={() => onAnswerToggle(question.id, key)}
                                        />
                                        <label htmlFor={`q${question.id}-${key}`} className="text-sm leading-tight cursor-pointer">
                                            <span className="font-medium">{key}:</span> {value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>

            <div className="flex justify-end pt-4">
                <Button onClick={onSubmit} disabled={!hasAnsweredAll}>
                    Submit Answers
                </Button>
            </div>
        </div>
    )
}

