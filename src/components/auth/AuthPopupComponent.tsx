import GoogleButtonComponent from "./GoogleButtonComponent";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const AuthPopupComponent = ({ isOpen, onClose }: Props) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('auth:login')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
         <GoogleButtonComponent />
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={onClose}>
            {t('global:close')}
          </Button>
     
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthPopupComponent;
