import AppLayout from "@/components/app/AppLayout";
import User from "@/types/user/User";
import useApi from "@/hooks/api/useApi";
import DiagnosisRow from "@/components/diagnoses/DiagnosisRow/DiagnosisRow.component";
import { useTranslation } from "react-i18next";
interface PageProps {
  user: User;
}
export default function MyDiagnosesIndexPage({ user }: PageProps) {
  const { t } = useTranslation();
  const { get, loading } = useApi();
  const [diagnoses, setDiagnosis] = useState<Diagnosis[]>([]);
  const fetchDiagnosis = async () => {
    const result = await get<Diagnosis[]>("/diagnosis");
    if (result && result.success) {
      setDiagnosis(result.data);
    }
  };
  useEffect(() => {
    fetchDiagnosis();
  }, []);
  return (
    <AppLayout user={user}>
      <Box>
        <Text fontWeight={"bold"} color={"brand.300"} fontSize={"3xl"}>
          {t("diagnosis:your_diagnoses")}:
        </Text>
        <Box my={2}>
          {diagnoses.map((diagnosis) => {
            return <DiagnosisRow diagnosis={diagnosis} />;
          })}
        </Box>
      </Box>
    </AppLayout>
  );
}

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].page";
import { GetServerSidePropsContext } from "next";
import Diagnosis from "@/types/diagnosis/Diagnosis";
import { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";

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

  return {
    props: { user },
  };
};
