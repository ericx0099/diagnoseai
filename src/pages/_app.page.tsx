import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18next from "i18next";
import common_en from "@/locales/en";
import common_es from "@/locales/es";
import common_ca from "@/locales/ca";
import { AuthProvider } from "@/utils/Providers";
import theme from "@/lib/theme"
import Fonts from "@/components/shared/Fonts";
import { useEffect } from "react";
const progress = new ProgressBar({
  size: 6,
  color: "#348f6c",
  className: "z-50",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: common_en,
    es: common_es,
    ca: common_ca
  },
});
export default function App({ Component, pageProps }: AppProps) {
  const {i18n} = useTranslation();
  useEffect(() => {
    if(pageProps.user){
      if(pageProps.user.language){
        i18next.changeLanguage(pageProps.user.language)
      }
    }
  },[])

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <I18nextProvider i18n={i18next}>
          <Component {...pageProps} />
        </I18nextProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}
