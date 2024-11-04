import { DiagnosisQuestions } from "@/types/diagnosis/Diagnosis";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
interface Props {
  questions: DiagnosisQuestions[];
}
const QuestionsResume = ({ questions }: Props) => {
  return (
    <Accordion allowToggle>
      {questions.map((question) => {
        return (
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {question.question}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color={"brand.100"}>
              {question.answer}
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default QuestionsResume;
