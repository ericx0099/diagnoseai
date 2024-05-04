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
      overflow={"hidden"}
    >
      <Box
        overflow={"hidden"}
        h={"99%"}
        w={{ base: "98%", lg: "85%" }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          bg={"brand.100"}
          overflow={"hidden"}
          h={"93%"}
          w={"93%"}
          borderRadius={20}
          boxShadow={
          " rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;"
          }
        >
          <Box p={3} h={"100%"}>
            <Box display={"flex"} h={"100%"}>
              {!isMobile && <Sidebar />}

              <Box
                h="100%"
                w={"100%"}
                p={5}
                bg="white"
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
