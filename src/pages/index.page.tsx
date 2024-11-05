import CallToActionWithIllustration from "@/components/public/InitialHomeComponent";
import User from "@/types/user/User";
import Head from "next/head";
import PublicLayout from "@/components/public/PublicLayout";
import { useTranslation } from "react-i18next";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME!;
export default function Home({ user }: { user: User | null }) {
  const {t} = useTranslation();
  return (
    <PublicLayout user={user}>
      <Head>
        <title>{APP_NAME} - {t('public_pages:get_diagnosed_with_ai')}</title>
      </Head>
      <CallToActionWithIllustration />
      <ThreeTierPricing user={user} />
    </PublicLayout>
  );
}

import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from "next";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth].page";
import ThreeTierPricing from "@/components/shared/Pricing.component";
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
