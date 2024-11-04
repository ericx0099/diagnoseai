import User from "@/types/user/User";
import MainDiagnoseInputComponent from "@/components/prediction/MainDiagnoseInputComponent";
import AppLayout from "@/components/app/AppLayout";
import { Stack, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
interface PageProps {
  user: User;
}

export default function NewDiagnosePage({ user }: PageProps) {
  const {t} = useTranslation();
  return (
    <AppLayout user={user}>
      <Stack mx={{ base: 1, lg: 10 }} mt={3}>
        <Text  fontSize="4xl" fontWeight={"bold"} >{t('diagnosis:get_new_diagnosis')}</Text>
      <p>{t('diagnosis:input_label')}</p>
        <MainDiagnoseInputComponent />
      </Stack>
    </AppLayout>
  );
}

import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth].page";
import { getServerSession } from "next-auth";

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
