import { Box, Text, Badge, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
interface AITokensProps {
  number: number;
}

const AvailableAITokens: React.FC<AITokensProps> = ({ number }) => {
    const {t} = useTranslation();
  return (
    <Box
      backgroundColor="blue.100" // Light blue background for the entire component
      borderRadius="md" // Rounded corners
      padding={4} // Padding around the component
      boxShadow="md" // Optional: adds a shadow for depth
    >
      <HStack spacing={2}>
        <Text color="black">{t('diagnosis:available_aitokens')}</Text>
        <Badge
          colorScheme="blue"
          variant="solid"
          backgroundColor="blue.600" // Darker blue background for the number
          color="white" // Default text color for the badge
          paddingX={3}
          paddingY={1}
          borderRadius="md"
        >
          {number}
        </Badge>
      </HStack>
    </Box>
  );
};

export default AvailableAITokens;
