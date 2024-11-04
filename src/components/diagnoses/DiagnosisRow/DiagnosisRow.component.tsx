import Diagnosis from "@/types/diagnosis/Diagnosis";
import { Box, Divider, Text, Flex, Card } from "@chakra-ui/react";
import Link from "next/link";
import moment from 'moment';
import { useTranslation } from "react-i18next";

interface Props {
  diagnosis: Diagnosis;
}
const DiagnosisRow = ({ diagnosis }: Props) => {
  const formattedDate = moment(diagnosis.created_at).format("DD/MM/YYYY");
  const {t} = useTranslation();
  return (
    <Link href={`/my-diagnoses/${diagnosis.uuid}`}>
    <Card
    variant={"outline"}
      className={
        "p-3 rounded-xl  transition ease-in-out hover:cursor-pointer "
      }
      _hover={{ transform: "scale(1.01)" }}
      my={1}
    >
      {" "}
      <Text as={"span"}><Text color={"brand.200"}  as={"span"}>{t('diagnosis:symptoms')}:</Text> {diagnosis.symptoms}</Text>
      <Divider />
      <Flex justifyContent={"space-between"} mt={2}>
       <Text  color={"brand.200"} >{t('diagnosis:veure_mes')}</Text>
        <Text textAlign={"right"} >
         {t("diagnosis:created_by")} <b>{t("diagnosis:you")}</b> {formattedDate}
        </Text>
      </Flex>
    </Card>
    </Link>
  );
};

export default DiagnosisRow;
