import Diagnosis from "@/types/diagnosis/Diagnosis";
import { Box, Divider, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";

interface Props {
  diagnosis: Diagnosis;
}
const DiagnosisRow = ({ diagnosis }: Props) => {
  return (
    <Box
      className={
        "shadow-md p-3 rounded-xl  transition ease-in-out hover:cursor-pointer "
      }
      _hover={{ transform: "scale(1.01)" }}
    >
      <Text color={"brand.200"}  as={"span"}>Symptoms:</Text>{" "}
      <Text as={"span"}>{diagnosis.symptoms}</Text>
      <Divider />
      <Flex justifyContent={"space-between"} mt={2}>
        <Text color={"brand.100"} fontWeight={"bold"}><Link href={`/my-diagnoses/${diagnosis.uuid}`}>View More</Link></Text>
        <Text textAlign={"right"}>
          Created by <b>You</b> Monday, 12 of december
        </Text>
      </Flex>
    </Box>
  );
};

export default DiagnosisRow;
