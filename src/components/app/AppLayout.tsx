import PublicLayoutProps from "@/types/layout/Layout";
import NavBarComponent from "@/components/public/NavBarComponent";
import { Box, Card, Container, useColorModeValue } from "@chakra-ui/react";
import AppContainer from "./AppContainer";
import Sidebar from "./AppSideBar";
import useWindow from "@/hooks/window/useWindow";
import Nav from "./NavBar";
import { useTranslation } from "react-i18next";
import { UserDataProvider } from "@/contexts/UserDataContext";
const AppLayout = ({ user, children }: PublicLayoutProps) => {
  const { isMobile } = useWindow();

  return (
    <Box bg={"white"}>
      <UserDataProvider>
        <Box
          overflow={"hidden"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          height={"100vh"}
        >
          <Box
            bg={"brand.100"}
            overflow={"hidden"}
            m={2}
            boxShadow={
              " rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
            }
            borderRadius={20}
            height={"98vh"}
          >
            <Box p={3} h={"100%"}>
              <Box display={"flex"} h={"100%"}>
                <Sidebar />

                <Card
                  p={5}
                  borderRadius={20}
                  shadow={"xl"}
                  w={"98vw"}
                  maxH={"95vh"}
                  overflow={"scroll"}
                  overflowX={"hidden"}
                >
                  <Nav user={user} />
                  {children}
                </Card>
              </Box>
            </Box>
          </Box>
        </Box>
      </UserDataProvider>
    </Box>
  );
};

export default AppLayout;
