import PublicLayoutProps from "@/types/layout/Layout";
import NavBarComponent from "@/components/public/NavBarComponent";
import { Box, Card, Container, useColorModeValue } from "@chakra-ui/react";
import AppContainer from "./AppContainer";
import Sidebar from "./AppSideBar";
import useWindow from "@/hooks/window/useWindow";
import Nav from "./NavBar";
const AppLayout = ({ user, children }: PublicLayoutProps) => {
  const { isMobile } = useWindow();
  return (
    <Box
      bg={"#f5ead7"}
      h={"100vh"}
      w={"100vw"}
      maxW={"100vw !important"}
      maxH={"100vh !important"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      
    >
      <Box p={5} h={"95%"} w={{ base: "98%", lg: "85%" }}  display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}>
        <Box
          bg={"brand.100"}
          h={"93%"}
          w={"93%"}
          borderRadius={20}
          boxShadow={"rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;"}
        >
          <Box p={3} h={"100%"}>
            <Box display={"flex"} h={"100%"}>
              {!isMobile && <Sidebar />}

              <Box
                h="100%"
                w={"100%"}
                p={5}
                bg="#F8F8F8"
                borderRadius={20}
                shadow={"xl"}
              >
                <Nav user={user} />
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AppLayout;
