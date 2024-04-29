interface PageProps {
  user: User;
  uuid: string;
}
import { useEffect, useState } from "react";
import useApi from "@/hooks/api/useApi";
export default function AnswerDiagnosePage({ user, uuid }: PageProps) {
  const {get} = useApi();
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();
  useEffect(() => {
 (async () => {
  const response = await get<Diagnosis>(`/diagnosis/${uuid}`);
  if(response?.success){
    setDiagnosis(response.data);
  }
 })();
  },[uuid])
  return <PublicLayout user={user}>
    <p>{diagnosis?.symptoms}</p>
  </PublicLayout>
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
import PublicLayout from "@/components/public/PublicLayout";
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  let user = null;
  if (session && session.user) {
    user = session.user;
  }
  const {
    query: { uuid },
  } = context;

  return {
    props: { user, uuid },
  };
};
