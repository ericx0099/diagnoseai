import { Box, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import Question from "../question/Question.component";

import Diagnosis from "@/types/diagnosis/Diagnosis";
import useApi from "@/hooks/api/useApi";
import { useTranslation } from "react-i18next";
interface DiagnosisQuestionsProps {
  diagnosisData: Diagnosis;
}

const DiagnosisQuestionsComponent: React.FC<DiagnosisQuestionsProps> = ({
  diagnosisData,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(diagnosisData.questions.length).fill(null)
  );
  const router = useRouter();
  const [diagnosis, setDiagnosis] = useState<Diagnosis>(diagnosisData);
  const { post } = useApi();
  const { t } = useTranslation();
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

  const updateAnswer = useCallback(
    async (index: number, answer: string | null) => {
      const updatedDiagnosisData = { ...diagnosisData };
      updatedDiagnosisData.questions[index].answer = answer;
      // Actualiza diagnosisData con la nueva respuesta
      setDiagnosis(updatedDiagnosisData);
      const toPost = {
        answer: answer,
        diagnosis_uuid: diagnosis.uuid,
        answer_uuid: updatedDiagnosisData.questions[index].uuid,
      };
      const response = await post("/diagnosis/update-answer", toPost);
    },
    [diagnosisData, diagnosis.uuid]
  );

  const handleFinish = async () => {
    const response = await post(
      `/diagnosis/${diagnosis.uuid}/generate-diagnosis`
    );
    if(response?.success){
      router.push(`/my-diagnoses/${diagnosis.uuid}`);
    }
  };
  return (
    <Box>
      <Text textAlign={"center"} as={"span"}>
        {t("diagnosis:question")}{" "}
        <Text as={"span"} color={"brand.100"}>
          {currentQuestionIndex + 1}
        </Text>{" "}
        of{" "}
        <Text as={"span"} color={"brand.100"}>
          {diagnosis.questions.length}
        </Text>
      </Text>
      <Box mb={5} />
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
              displayFinishButton={index + 1 === diagnosis.questions.length}
              onFinish={handleFinish}
            />
          );
        }
        return null;
      })}
    </Box>
  );
};

export default DiagnosisQuestionsComponent;
