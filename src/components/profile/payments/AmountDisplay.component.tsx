import { Text } from "@chakra-ui/react";

interface AmountProps {
  amountInCents: number;
  currency?: "eur" | "usd";
}

export const AmountDisplay = ({ amountInCents, currency = "eur" }: AmountProps) => {
  // Convierte los centavos a la cantidad principal (ej., 1234 -> 12.34)
  const amount = (amountInCents / 100).toFixed(2);

  // Elige el símbolo de moneda según el valor de `currency`
  const currencySymbol = currency === "usd" ? "$" : "€";

  return (
    <Text>
      {currencySymbol} {amount}
    </Text>
  );
};
