import PublicLayoutProps from "@/types/layout/Layout";
import NavBarComponent from "@/components/public/NavBarComponent";
import { Box, Card, Container, useColorModeValue } from "@chakra-ui/react";
import AppContainer from "./AppContainer";
import Sidebar from "./AppSideBar";
import useWindow from "@/hooks/window/useWindow";
const AppLayout = ({ user, children }: PublicLayoutProps) => {
  const { isMobile } = useWindow();
  return (
    <Box bg={useColorModeValue("#E5E5E5","")} h={"100vh"}>
      <NavBarComponent user={user} />

      <Box mt={5} />
      <AppContainer>
        {!isMobile && <Sidebar />}

        <Card ml={{ base: 0, md: 60 }}  boxShadow={" rgba(58, 240, 94, 0.5) 0px 10px 36px 0px,rgba(58, 240, 94, 0.5) 0px 0px 0px 1px;"}  h="87vh" p={5} >{children}</Card>
      </AppContainer>
    </Box>
  );
};

export default AppLayout;