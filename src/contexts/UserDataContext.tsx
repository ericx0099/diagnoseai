import React, { createContext, useContext, useEffect, useState } from 'react';
import useApi from '@/hooks/api/useApi';
import { Language } from '@/types/language/language';

interface UserDataContextType {
  loading: boolean;
  diagnoses: number; // Ajusta el tipo de dato según el esquema de datos de "diagnoses"
  aiTokens: number; // Ajusta el tipo de dato según el esquema de datos de "aitokens"
  fetchData: () => void;
  language: Language | null;
}
interface UserData {
    diagnoses: number; // Ajusta el tipo según tu estructura de datos
    aiTokens: number; // Ajusta el tipo según tu estructura de datos
    language: Language | null;
  }

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, get } = useApi();
  const [diagnoses, setDiagnoses] = useState<number>(0);
  const [aiTokens, setAiTokens] = useState<number>(0);
  const [language, setLanguage] = useState<Language | null>(null);
  const fetchData = async () => {
    try {
      const response = await get<UserData>('/users/me');
      if (response) {
        setDiagnoses(response.data.diagnoses);
        setAiTokens(response.data.aiTokens);
        setLanguage(response.data.language);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    console.log("im rerendering")
    fetchData();
  }, []);

  return (
    <UserDataContext.Provider value={{ loading, diagnoses, aiTokens,fetchData, language }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};
