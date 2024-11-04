import Diagnosis from "@/types/diagnosis/Diagnosis";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Flex
} from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
interface Props {
  diagnose: Diagnosis;
}

const AlertNotAnswered = ({ diagnose }: Props) => {
  const { t } = useTranslation();
  return (
    <Alert
      status="warning"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      borderRadius={20}
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {t("diagnosis:not_generated_title")}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
      {t("diagnosis:not_generated")}.
      </AlertDescription>
      <Flex mt={1}>
        <Link href={`/my-diagnoses/${diagnose.uuid}/answer`}><Button >{t("diagnosis:butt_answer_q")}</Button></Link>
      </Flex>
    </Alert>
  );
};

export default AlertNotAnswered;
