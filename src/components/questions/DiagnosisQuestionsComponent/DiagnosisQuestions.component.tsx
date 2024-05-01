import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";

import Question from "../question/Question.component";
import Diagnosis from "@/types/diagnosis/Diagnosis";

interface DiagnosisQuestionsProps {
  diagnosisData: Diagnosis;
}

const DiagnosisQuestionsComponent: React.FC<DiagnosisQuestionsProps> = ({
  diagnosisData,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(string | null)[]>(Array(diagnosisData.questions.length).fill(null));
  const [diagnosis, setDiagnosis] = useState<Diagnosis>(diagnosisData);

  const handleNext = () => {
    if (currentQuestionIndex < diagnosisData.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Aquí puedes manejar lo que deseas hacer cuando se responde a todas las preguntas.
      console.log("Se han respondido todas las preguntas");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleSkip = () => {
    // Puedes manejar el comportamiento de omitir preguntas aquí.
    console.log("Se ha omitido la pregunta actual");
    handleNext();
  };

  const updateAnswer = (index: number, answer: string | null) => {
    const updatedDiagnosisData = { ...diagnosisData };
    updatedDiagnosisData.questions[index].answer = answer;
    // Actualiza diagnosisData con la nueva respuesta
    setDiagnosis(updatedDiagnosisData);
  };

  return (
    <Box>
      <Text textAlign={"center"}>
        Question {currentQuestionIndex + 1} of {diagnosis.questions.length}
      </Text>
      {diagnosis.questions.map((questionData, index) => {
        if (index === currentQuestionIndex) {
          return (
            <Question
              key={questionData.uuid}
              questionData={questionData}
              onNext={handleNext}
              onBack={handleBack}
              index={index}
              onSkip={handleSkip}
              updateAnswer={updateAnswer}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};

export default DiagnosisQuestionsComponent;
