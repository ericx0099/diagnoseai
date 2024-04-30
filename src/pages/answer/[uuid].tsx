interface PageProps {
  user: User;
  uuid: string;
}
import { ReactNode, useEffect, useState } from "react";
import useApi from "@/hooks/api/useApi";
import AppContainer from "@/components/app/AppContainer";
import AppLayout from "@/components/app/AppLayout";
import { useTranslation } from "react-i18next";
import { Text } from "@chakra-ui/react";
export default function AnswerDiagnosePage({ user, uuid }: PageProps) {
  const { get } = useApi();
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();
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
      
        <Text>
          <Text as="span" mr={3}>Symptoms:</Text>
          {diagnosis?.symptoms}
        </Text>
    
    </AppLayout>
  );
}

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import User from "@/types/user/User";
import Diagnosis from "@/types/diagnosis/Diagnosis";

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
