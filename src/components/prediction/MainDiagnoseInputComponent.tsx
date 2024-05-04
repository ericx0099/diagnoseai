import { Textarea, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ButtonGetDiagnosis from "@/components/prediction/ButtonGetDiagnosis";
import { useState } from "react";
import useApi from "@/hooks/api/useApi";
import Diagnosis from "@/types/diagnosis/Diagnosis";
import { useRouter } from "next/router";
const MainDiagnoseInputComponent = () => {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState<string>("");
  const toast = useToast();
  const {post} = useApi();
  const router = useRouter();
  const sendSymptoms = async () => {
    if (!(symptoms?.trim()?.length > 0)) {
      return toast({
        title: t("global:warning"),
        description: t("diagnosis:no_symptoms"),
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    const response = await post<Diagnosis>("/diagnosis",{symptoms});
    if(response?.success){
        router.push(`/my-diagnoses/${response.data.uuid}/answer`)
    }

    


  };
  return (
    <>
      <Textarea
        placeholder={t("predictions:mainInpuPlaceholder")}
        borderColor={"#3af05e"}
        borderRadius={"30px"}
        padding={4}
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value??'')}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
      />
      <ButtonGetDiagnosis callback={sendSymptoms} />
    </>
  );
};

export default MainDiagnoseInputComponent;
