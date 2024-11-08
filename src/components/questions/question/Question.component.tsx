import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { DiagnosisQuestions } from "@/types/diagnosis/Diagnosis";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MdArrowBackIos } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { MdSkipNext } from "react-icons/md";
interface QuestionProps {
  questionData: DiagnosisQuestions;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  updateAnswer: (index: number, answer: string | null) => void;
  index: number;
  displayFinishButton?: boolean;
  onFinish: () => void;
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
  index,
  displayFinishButton,
  onFinish
}) => {
  const [answer, setAnswer] = useState<string | null>(questionData.answer);
  const { t } = useTranslation();
  const ref = useRef<HTMLTextAreaElement>(null);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = event.target.value;
    setAnswer(newAnswer);
    updateAnswer(index, newAnswer);
  };
  useEffect(() => {
    if (ref.current && typeof window !== "undefined") {
      ref.current.focus();
    }
  }, [index]);

  return (
    <motion.article
      initial="hidden"
      animate={"enter"}
      exit="exit"
      variants={variants}
      transition={{ duration: 0.4, type: "easeInOut" }}
    >
      <Card p={3} shadow={"xl"} variant={"outline"}>
        <Text fontSize={"3xl"} maxH={300} overflow={"auto"} color={"brand.100"}>
          {questionData.question}
        </Text>
        <Textarea
          value={answer || ""}
          onChange={handleChange}
          my={2}
          ref={ref}
          placeholder={t("diagnosis:explain_yourself")}
          borderColor={"brand.100"}
        />
        <Flex justifyContent={"space-between"}>
          <Button
            colorScheme="red"
            leftIcon={<Icon as={MdArrowBackIos} />}
            onClick={onBack}
          >
            {t("diagnosis:back")}
          </Button>
          <Box>
            <Button
              rightIcon={<Icon as={MdSkipNext} />}
              onClick={onSkip}
              mr={1}
              colorScheme="blue"
            >
              {t("diagnosis:ommit")}
            </Button>
            <Button
              rightIcon={<Icon as={MdArrowForwardIos} />}
              onClick={onNext}
              colorScheme="green"
            >
              {t("diagnosis:next")}
            </Button>
            {displayFinishButton && (
              <Button
                variant={"outline"}
                rightIcon={<Icon as={IoIosSend} />}
                onClick={onFinish}
                ml={1}
                colorScheme="green"
              >
                {t("diagnosis:finish")}
              </Button>
            )}
          </Box>
        </Flex>
      </Card>
    </motion.article>
  );
};

export default Question;
