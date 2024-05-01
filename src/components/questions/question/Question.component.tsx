import { Box, Button, Card, Flex, Text, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { DiagnosisQuestions } from "@/types/diagnosis/Diagnosis";
import { motion } from "framer-motion";

interface QuestionProps {
  questionData: DiagnosisQuestions;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  updateAnswer: (index: number, answer: string | null) => void;
  index: number;
}
const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};
const Question: React.FC<QuestionProps> = ({
  questionData,
  onNext,
  onBack,
  onSkip,
  updateAnswer,
  index
}) => {
  const [answer, setAnswer] = useState<string | null>(questionData.answer);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    updateAnswer(index, newAnswer); 
  };
  

  return (
    <motion.article
      initial="hidden"
      animate={"enter"}
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
    >
      <Card p={3} shadow={"2xl"} border="2px solid green.200">
        <Text fontSize={"3xl"} maxH={300} overflow={"auto"}>{questionData.question}</Text>
        <Textarea  value={answer || ""} onChange={handleChange} my={2} />
        <Flex justifyContent={"space-between"}>
          <Button colorScheme="red" onClick={onBack}>Atrás</Button>
          <Box>
            <Button onClick={onSkip} mr={1} colorScheme="blue">
              Omitir
            </Button>
            <Button onClick={onNext} colorScheme="green">Siguiente</Button>
          </Box>
        </Flex>
      </Card>
    </motion.article>
  );
};

export default Question;
