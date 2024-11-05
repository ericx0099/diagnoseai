import React, { createContext, useContext, useEffect, useState } from 'react';
import useApi from '@/hooks/api/useApi';

interface UserDataContextType {
  loading: boolean;
  diagnoses: number; // Ajusta el tipo de dato según el esquema de datos de "diagnoses"
  aiTokens: number; // Ajusta el tipo de dato según el esquema de datos de "aitokens"
  fetchData: () => void;
}
interface UserData {
    diagnoses: number; // Ajusta el tipo según tu estructura de datos
    aiTokens: number; // Ajusta el tipo según tu estructura de datos
  }

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, get } = useApi();
  const [diagnoses, setDiagnoses] = useState<number>(0);
  const [aiTokens, setAiTokens] = useState<number>(0);
  const fetchData = async () => {
    try {
      const response = await get<UserData>('/users/me');
      if (response) {
        setDiagnoses(response.data.diagnoses);
        setAiTokens(response.data.aiTokens);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <UserDataContext.Provider value={{ loading, diagnoses, aiTokens,fetchData }}>
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
