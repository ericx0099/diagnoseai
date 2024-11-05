import { Box, Text, Badge, HStack, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
interface DiagnosticsProps {
  number: number;
}

const AvailableDiagnostics: React.FC<DiagnosticsProps> = ({ number }) => {
    const {t} = useTranslation();
  return (
    <Box
      backgroundColor="green.100" // Light green background for the entire component
      borderRadius="md" // Rounded corners
      padding={4} // Padding around the component
      boxShadow="md" // Optional: adds a shadow for depth
    >
      <HStack spacing={2}>
        <Text color={useColorModeValue('black','black')}>{t('diagnosis:available_diagnosis')}</Text>
        <Badge
          colorScheme="green"
          variant="solid"
          backgroundColor="green.600" // Darker green background for the number

          paddingX={4}
          paddingY={1}
          borderRadius="md"
        >
          {number}
        </Badge>
      </HStack>
    </Box>
  );
};

export default AvailableDiagnostics;
