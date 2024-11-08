import { Button, ButtonGroup } from "@chakra-ui/react";
import { Icon, useDisclosure } from "@chakra-ui/react";
import { BsStars } from "react-icons/bs";
import AuthPopupComponent from "../auth/AuthPopupComponent";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { useUserData } from "@/contexts/UserDataContext";


interface Props {
  callback: () => void;
  isLoading: boolean;
}

const ButtonGetDiagnosis = ({ callback, isLoading }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();



  const handleClick = () => {
    
    if (session && session.user) {
   
  
      //DO STUFF
      callback();
    } else {
      onOpen();
    }
  };

  const { t } = useTranslation();
  return (
    <>
      <Button colorScheme={"green"} onClick={handleClick} isLoading={isLoading} loadingText={t("global:obtaining_diagnosis")}>
        {t("global:get_diagnosis")} <Icon ml={2} as={BsStars} />
      </Button>

      <AuthPopupComponent isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ButtonGetDiagnosis;
