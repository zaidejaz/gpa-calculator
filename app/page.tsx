"use client"
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Subject = {
  grade: string;
  credit: number | undefined;
};

const CalculateGPA: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      grade: "",
      credit: undefined,
    },
    {
      grade: "",
      credit: undefined,
    },
  ]);

  const [gpa, setGpa] = useState<number>(0);

  const handleGradeChange = (index: number, value: string) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject, i) =>
        i === index ? { ...subject, grade: value } : subject
      )
    );
  };

  const handleCreditChange = (index: number, value: number) => {
    setSubjects((prevSubject) =>
      prevSubject.map((subject, i) =>
        i === index ? { ...subject, credit: value } : subject
      )
    );
  };

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCreditHours = 0;

    subjects.forEach((subject) => {
      let gradePoint: number;

      switch (subject.grade.toUpperCase()) {
        case "A":
          gradePoint = 4.0;
          break;
        case "B+":
          gradePoint = 3.5;
          break;
        case "B":
          gradePoint = 3.0;
          break;
        case "C+":
          gradePoint = 2.5;
          break;
        case "C":
          gradePoint = 2.0;
          break;
        case "D+":
          gradePoint = 1.5;
          break;
        case "D":
          gradePoint = 1.0;
          break;
        case "F":
          gradePoint = 0.0;
          break;
        default:
          console.log("Invalid Grade Entered");
          return 0;
      }

      if (subject.credit !== undefined) {
        totalGradePoints += gradePoint * subject.credit;
        totalCreditHours += subject.credit;
      }
    });

    if (totalCreditHours === 0) {
      console.log("No credit hours entered.");
      return;
    }

    const cgpa = totalGradePoints / totalCreditHours;
    setGpa(cgpa);
  };

  const addField = () => {
    const subject = {
      grade: "",
      credit: undefined,
    };
    setSubjects([...subjects, subject]);
  };

  return (
    <div className=" max-w-4xl mx-auto p-2  md:p-10 rounded-xl">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-4">
        Calculate GPA
      </h1>
      <p className="leading-7 mb-4">According to the standards of International Islamic University Islamabad</p>
      {subjects.map((subject, index) => (
        <div className="flex md:items-center" key={index}>
          <p className="px-2 md:px-4 mt-4 md:mt-0">{index + 1}.</p>
          <div className="flex flex-col md:flex-row md:gap-4">
            <Input
              type="text"
              value={subject.grade}
              onChange={(e) => handleGradeChange(index, e.target.value)}
              placeholder="Enter Grade"
            />
            <Input
              type="number"
              value={subject.credit}
              onChange={(e) =>
                handleCreditChange(index, parseInt(e.target.value))
              }
              placeholder="Enter Credit Hours"
            />
          </div>
        </div>
      ))}
      <div className="text-center space-y-2 md:my-0 m-4 space-x-4">
        <Button onClick={addField}>Add another subject</Button>
        <Button onClick={() => calculateGPA()}>Calculate CGPA</Button>
      </div>

      {gpa > 0 ? <p className="text-center leading-7 [&:not(:first-child)]:mt-6">Your GPA is {gpa.toFixed(2)}</p> : <p></p>}
    </div>
  );
};

export default CalculateGPA;
