import { writeFile } from "fs/promises";

const s: any[] = [];
const r = [
    "B",
    "AD",
    "D",
    "C",
    "BCD",
    "C",
    "A",
    "B",
    "AB",
    "BD",
    "A",
    "AD",
    "AB",
    "ABC",
    "ABC",
    "C",
    "AC",
    "BCD",
    "B",
    "ACD",
    "C",
    "BC",
    "A",
    "CD"
]

r.forEach((value, index) => {
    s.push({
        id: 101 + index,
        text: "",
        options: {
            A: "",
            B: "",
            C: "",
            D: "",
        },
        correctAnswers: value.split(""),
    });
});

writeFile("x.json", JSON.stringify(s, null, 4));