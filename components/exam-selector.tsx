"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Exam } from "@/types/exam"

interface ExamSelectorProps {
    exams: Exam[]
    onSelectExam: (exam: Exam) => void
}

export default function ExamSelector({ exams, onSelectExam }: ExamSelectorProps) {
    return (
        <div className="space-y-4">
            {/* <h2 className="text-xl font-semibold text-center mb-4">Select an Exam</h2> */}
            <div className="grid gap-3">
                {exams.map((exam) => (
                    <Card
                        key={exam.id}
                        className="cursor-pointer hover:bg-accent transition-colors"
                        onClick={() => onSelectExam(exam)}
                    >
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-medium">{exam.title}</h3>
                                {/* <p className="text-sm text-muted-foreground">{exam.questions.length} questions</p> */}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

