import { Textarea, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import ButtonGetDiagnosis from "@/components/prediction/ButtonGetDiagnosis";
import { useState } from "react";
import useApi from "@/hooks/api/useApi";
import Diagnosis from "@/types/diagnosis/Diagnosis";
import { useRouter } from "next/router";
import { useUserData } from "@/contexts/UserDataContext";
const MainDiagnoseInputComponent = () => {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState<string>("");
  const toast = useToast();
  const { post, loading } = useApi();
  const router = useRouter();
  const {diagnoses} = useUserData();
  const sendSymptoms = async () => {
      if(! (diagnoses > 0)){
        return toast({
          title: t("global:error"),
          description: t("diagnosis:no_diagnosis_available"),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    if (!(symptoms?.trim()?.length > 0)) {
      return toast({
        title: t("global:warning"),
        description: t("diagnosis:no_symptoms"),
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    }
    const response = await post<Diagnosis>("/diagnosis", { symptoms });
    if (response?.success) {
      router.push(`/my-diagnoses/${response.data.uuid}/answer`);
    } else {
      if (response) {
        toast({
          title: t("global:error"),
          description: t(response?.message),
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: t("global:error"),
          description: "Something wen't wrong..",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
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
        onChange={(e) => setSymptoms(e.target.value ?? "")}
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
      />
      <ButtonGetDiagnosis callback={sendSymptoms} isLoading={loading} />
    </>
  );
};

export default MainDiagnoseInputComponent;
