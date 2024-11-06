import User from "@/types/user/User";
import MainDiagnoseInputComponent from "@/components/prediction/MainDiagnoseInputComponent";
import AppLayout from "@/components/app/AppLayout";
import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import ProfileConfiguration from "@/components/profile/ProfileConfiguration/ProfileConfiguration.component";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Head from "next/head";

interface PageProps {
  user: User;
}

export default function ProfilePage({ user }: PageProps) {
  const {t} = useTranslation();
  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
  return (
    <AppLayout user={user}>
      <Head>
        <title>{t('global:profile')} - {APP_NAME}</title>
      </Head>
      <Box display={"flex"} mt={10}>
        <ProfilePic src={user.image} />
        <Text fontSize={"4xl"} fontWeight={"bold"} mt={2}>
          {user.name}
        </Text>
      </Box>
      <Divider my={6} />
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          <Tab>Profile Configuration</Tab>
          <Tab>Payments</Tab>
          <Tab>Plan</Tab>
        </TabList>
      <TabPanels>
        <TabPanel>
        <ProfileConfiguration user={user} />
        </TabPanel>
        <TabPanel>
          <UserPayments user={user} />
        </TabPanel>
        <TabPanel>
          <UserPlan user={user} />
        </TabPanel>
      </TabPanels>
      </Tabs>
    </AppLayout>
  );
}

import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth].page";
import { getServerSession } from "next-auth";
import ProfilePic from "@/components/profile/ProfilePic/ProfilePic.component";
import { useTranslation } from "react-i18next";
import UserPayments from "@/components/profile/payments/UserPayments.component";
import UserPlan from "@/components/profile/plan/UserPlan.component";

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
