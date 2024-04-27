import CallToActionWithIllustration from "@/components/public/InitialHomeComponent";
import User from "@/types/user/User";
import PublicLayout from "@/components/public/PublicLayout";
export default function Home({ user }: { user: User | null }) {
  return (
    <PublicLayout user={user}>
      <CallToActionWithIllustration />
    </PublicLayout>
  );
}

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  let user = null;
  if (session && session.user) {
    user = session.user;
  }

  return {
    props: { user },
  };
};
