import PublicLayoutProps from "@/types/layout/Layout";
import NavBarComponent from "@/components/public/NavBarComponent";
import { Box,Container } from "@chakra-ui/react";
const PublicLayout = ({ user, children }: PublicLayoutProps) => {
  return (
    <>
      <NavBarComponent user={user} />
      <Box   > 
      {children}
      </Box>
    </>
  );
};

export default PublicLayout;
