import AppLayout from "@/components/app/AppLayout";
import useApi from "@/hooks/api/useApi";
import { Box, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
interface PageProps {
  user: User;
  uuid: string;
}
export default function DiagnosePage({ user, uuid }: PageProps) {
  const { get } = useApi();
  const { t } = useTranslation();

  const [diagnosis, setDiagnosis] = useState<Diagnosis>();

  const fetchDiagnosis = useCallback(async () => {
    const response = await get<Diagnosis>(`/diagnosis/${uuid}`);
    if (response?.success) {
      setDiagnosis(response.data);
    }
  }, [uuid, get]);

  useEffect(() => {
    fetchDiagnosis();
  }, [uuid]);
  return (
    <AppLayout user={user}>
      <Box>
        <Box my={3}>
          {" "}
          <Text as={"span"} fontWeight={"bold"} color={"brand.100"} fontSize={"3xl"}>
            {t("diagnosis:initial_symptoms")}:{" "}
          </Text>
          <Text as={"span"} fontSize={"3xl"}>{diagnosis?.symptoms}</Text>
        </Box>
        {diagnosis && diagnosis.diagnosis_generated && (
        <DiagnosisResults diagnosis={diagnosis} />
        )}
      </Box>
    </AppLayout>
  );
}

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].page";
import User from "@/types/user/User";
import diagnosis from "@/locales/en/diagnosis";
import Diagnosis from "@/types/diagnosis/Diagnosis";
import { useCallback, useEffect, useState } from "react";
import DiagnosisResults from "@/components/diagnoses/DiagnosisResults/DiagnosisResults.component";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  let user = null;
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  user = session.user;
  const {
    query: { uuid },
  } = context;

  return {
    props: { user, uuid },
  };
};
