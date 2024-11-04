import User from "@/types/user/User";
import MainDiagnoseInputComponent from "@/components/prediction/MainDiagnoseInputComponent";
import AppLayout from "@/components/app/AppLayout";
import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import ProfileConfiguration from "@/components/profile/ProfileConfiguration/ProfileConfiguration.component";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
interface PageProps {
  user: User;
}

export default function ProfilePage({ user }: PageProps) {
  return (
    <AppLayout user={user}>
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
          <Tab>Plan</Tab>
        </TabList>
      <TabPanels>
        <TabPanel>
        <ProfileConfiguration user={user} />
        </TabPanel>
        <TabPanel>Plan</TabPanel>
      </TabPanels>
      </Tabs>
    </AppLayout>
  );
}

import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth].page";
import { getServerSession } from "next-auth";
import ProfilePic from "@/components/profile/ProfilePic/ProfilePic.component";

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
