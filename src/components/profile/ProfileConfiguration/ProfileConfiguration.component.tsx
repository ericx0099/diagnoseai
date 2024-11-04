import User from "@/types/user/User";
import { Box, Button, Grid, Select, Text } from "@chakra-ui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Language } from "@/types/language/language";
import useApi from "@/hooks/api/useApi";
import { useTranslation } from "react-i18next";

interface ProfileConfigurationProps {
  user: User;
}

interface FormData {
  language: string;
}

const ProfileConfiguration = ({ user }: ProfileConfigurationProps) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const { get, post } = useApi();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    language: user.language,
  });

  const fetchLanguages = async () => {
    const response = await get<Language[]>("/languages");
    if (response?.success) {
      setLanguages(response.data);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log({ ...formData, [name]: value }); // Para verificar el cambio en el estado
  };

  const handleSubmit = async () => {
    const response = await post<boolean>(
      "/users/update-configuration",
      formData
    );
    if (response?.success) {
      i18n.changeLanguage(formData.language);
    }
  };

  return (
    <Box as={"form"}>
      <Grid gridTemplateColumns={{ base: "1fr", md: "1fr 1fr 1fr" }}>
        <Box>
          <Text mb="8px">{t("languages:choose_language")}</Text>
          <Select
            name="language" // Asegúrate de que el nombre coincida con la clave del estado
            value={formData.language}
            placeholder="Select A LANGUAGE"
            onChange={handleChange}
            my={1}
          >
            {languages?.map((language) => {
              return (
                <option key={language.code} value={language.code}>
                  {t(`languages:${language.code}`)}
                </option>
              );
            })}
          </Select>
        </Box>
      </Grid>
      <Button type="button" colorScheme="green" onClick={handleSubmit} mt={2}>
        {t("global:save")}
      </Button>
    </Box>
  );
};

export default ProfileConfiguration;
