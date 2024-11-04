import AppLayout from "@/components/app/AppLayout";
import useApi from "@/hooks/api/useApi";
import {
  Box,
  Grid,
  Text,
  Card,
  CardHeader,
  Icon,
  Divider,
  CardBody,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { RiMentalHealthLine } from "react-icons/ri";
import moment from "moment";
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
        <Card variant={"outline"} w={"100%"} my={3}>
          <CardHeader>
            <Text fontWeight={"bold"} color={"brand.100"}>
              <Icon as={RiMentalHealthLine} />
              {t("diagnosis:initial_symptoms")}
            </Text>
          </CardHeader>
          <Divider />
          <CardBody>
            <Text>{diagnosis?.symptoms}</Text>
          </CardBody>
        </Card>
        <Grid
          gridTemplateColumns={{ base: "auto", lg: "66% 1fr" }}
          gridGap={"10px"}
        >
          {diagnosis && diagnosis.diagnosis_generated ? (
            <Box>
              <Text color={"brand.100"} fontWeight={"bold"} fontSize={"xl"}>
                {t("diagnosis:diagnosis_results")}:
              </Text>
              <DiagnosisResults diagnosis={diagnosis} />
            </Box>
          ) : (
            diagnosis && <AlertNotAnswered diagnose={diagnosis} />
          )}
          <Box>
            {diagnosis && (
              <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList>
                  <Tab>{t("diagnosis:complementary_questions")}</Tab>
                  <Tab>{t("diagnosis:chat_with_ai")}</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {" "}
                    <QuestionsResume questions={diagnosis?.questions} />
                  </TabPanel>
                  <TabPanel>Work In Progress</TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </Box>
        </Grid>
        <Text marginTop={10} textAlign={"right"}>
          {" "}
          {t("diagnosis:created_by")} <b>{t("diagnosis:you")}</b> -{" "}
          {moment(diagnosis?.created_at).format("DD/MM/YYYY")}
        </Text>
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

import Diagnosis from "@/types/diagnosis/Diagnosis";
import { useCallback, useEffect, useState } from "react";
import DiagnosisResults from "@/components/diagnoses/DiagnosisResults/DiagnosisResults.component";
import QuestionsResume from "@/components/questions/QuestionsResume/QuestionsResume.component";
import AlertNotAnswered from "@/components/diagnoses/AlertNotAnswered/AlertNotAnswered.component";

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
