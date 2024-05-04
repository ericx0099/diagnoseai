interface PageProps {
    user: User;
    uuid: string;
  }
  import { ReactNode, useEffect, useState } from "react";
  import useApi from "@/hooks/api/useApi";
  import AppContainer from "@/components/app/AppContainer";
  import AppLayout from "@/components/app/AppLayout";
  import { useTranslation } from "react-i18next";
  import Diagnosis from "@/types/diagnosis/Diagnosis";
  import DiagnosisQuestionsComponent from "@/components/questions/DiagnosisQuestionsComponent/DiagnosisQuestions.component";
  import { Text } from "@chakra-ui/react";
  export default function AnswerDiagnosePage({ user, uuid }: PageProps) {
    const { get } = useApi();
    const [diagnosis, setDiagnosis] = useState<Diagnosis | null>(null);
    const { t } = useTranslation();
    useEffect(() => {
      (async () => {
        const response = await get<Diagnosis>(`/diagnosis/${uuid}`);
        if (response?.success) {
          setDiagnosis(response.data);
        }
      })();
    }, [uuid]);
    return (
      <AppLayout user={user}>
        <Text as={"h1"} color={"brand.300"} fontSize={"3xl"}>
          {t("diagnosis:answer_questions")}
        </Text>
        <Text color={"brand.400"}>{t("diagnosis:anwer_the_questions")}</Text>
        <Text as="h1" mr={3} my={5} fontWeight={"bold"}>
          <Text as={"span"} fontSize={"xl"} >
            {" "}
            {t("diagnosis:initial_symptoms")}:
          </Text>
          <Text as="span" color={"brand.100"} > {diagnosis?.symptoms}</Text>
        </Text>
        {diagnosis ? (
          <DiagnosisQuestionsComponent diagnosisData={diagnosis} />
        ) : (
          <Text>Loading...</Text>
        )}
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
  