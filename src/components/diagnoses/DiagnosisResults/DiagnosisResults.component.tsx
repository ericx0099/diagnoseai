import Diagnosis from "@/types/diagnosis/Diagnosis";
import {
  Box,
  Text,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Icon
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { GiHealthCapsule } from "react-icons/gi";
import { RiHealthBookLine } from "react-icons/ri";
import { TbFileDescription } from "react-icons/tb";
interface Props {
  diagnosis: Diagnosis;
}
const DiagnosisResults = ({ diagnosis }: Props) => {
  const { t } = useTranslation();
  return (
    <Box maxH={"100%"} overflowY={"auto"} p={1}>
      <Card variant={"outline"} w={"100%"}>
        <CardHeader>
          <Text fontWeight={"bold"} color={"brand.100"}>
            <Icon as={RiHealthBookLine} />
            {t("diagnosis:health_issue")}
          </Text>
        </CardHeader>
        <Divider />
        <CardBody>
          <Text>{diagnosis.health_issue}</Text>
        </CardBody>
      </Card>
      <Card variant={"outline"} w={"100%"} my={2}>
        <CardHeader>
          <Text fontWeight={"bold"} color={"brand.100"}>
          <Icon as={TbFileDescription} />
            {t("diagnosis:problem_description")}
          </Text>
        </CardHeader>
        <Divider />
        <CardBody>
          <Text>{diagnosis.problem_description}</Text>
        </CardBody>
      </Card>
      <Card variant={"outline"} w={"100%"}>
        <CardHeader>
          <Text fontWeight={"bold"} color={"brand.100"}>
          <Icon as={GiHealthCapsule} />
            {t("diagnosis:help_recomendations")}
          </Text>
        </CardHeader>
        <Divider />
        <CardBody>
          <Text>{diagnosis.help_recomendations}</Text>
        </CardBody>
      </Card>
    </Box>
  );
};

export default DiagnosisResults;
