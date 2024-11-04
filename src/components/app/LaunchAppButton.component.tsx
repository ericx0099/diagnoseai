import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { FaExternalLinkAlt } from "react-icons/fa";
const LaunchAppButton = () => {
    const router = useRouter();
    const {t} = useTranslation();

    const handleClick = () => {
        router.push("/my-diagnoses")
    }

    return <Button onClick={handleClick} colorScheme="green" className="font-bold"> <FaExternalLinkAlt /> &nbsp; {t("global:app")}</Button>
}

export default LaunchAppButton;