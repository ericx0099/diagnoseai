import { Textarea } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { BsStars } from "react-icons/bs";
import { useTranslation } from 'react-i18next';
import ButtonGetDiagnosis from './ButtonGetDiagnosis';
const MainDiagnoseInputComponent = () => {
    const {t} = useTranslation();

    return (
        <>
            <Textarea placeholder={t("predictions:mainInpuPlaceholder")} borderColor={"#3af05e"} borderRadius={"30px"} padding={4} boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"} />
            <ButtonGetDiagnosis />
        </>
    )
}

export default MainDiagnoseInputComponent;