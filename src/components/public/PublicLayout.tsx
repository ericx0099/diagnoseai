import PublicLayoutProps from "@/types/layout/Layout";
import NavBarComponent from "@/components/public/NavBarComponent";
import { Box,Container } from "@chakra-ui/react";
import { UserDataProvider } from "@/contexts/UserDataContext";
const PublicLayout = ({ user, children }: PublicLayoutProps) => {
  return (
    <>
     <UserDataProvider>
     <NavBarComponent user={user} />
      <Box   > 
      {children}
      </Box>
     </UserDataProvider>
    </>
  );
};

export default PublicLayout;
