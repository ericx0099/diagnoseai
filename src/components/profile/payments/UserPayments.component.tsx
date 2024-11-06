import useApi from "@/hooks/api/useApi";
import { Payment } from "@/types/payments/Payment";
import User from "@/types/user/User";
import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Alert,
  AlertIcon,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { AmountDisplay } from "./AmountDisplay.component";

interface UserPaymentProps {
  user: User;
}

export const PaymentsTable = ({ payments }: { payments: Payment[] }) => {
  const { t } = useTranslation();
  return (
    <Box overflowX="auto" shadow={"lg"}>
      <Table variant="striped" colorScheme="green">
        <Thead>
          <Tr>
            <Th>{t("plans:status")}</Th>
            <Th>{t("plans:amount_paid")}</Th>

            <Th>{t("plans:invoice_pdf_url")}</Th>
            <Th>{t("plans:created_at")}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {payments.map((payment) => (
            <Tr key={payment.stripeInvoiceId}>
              <Td>
                <Badge colorScheme="green">{payment.status}</Badge>
              </Td>

              <Td>
                <AmountDisplay
                  amountInCents={payment.amount_paid}
                  currency={payment.currency ? payment.currency : "eur"}
                />
              </Td>
              <Td>
                {payment.invoice_pdf_url ? (
                  <a
                    href={payment.invoice_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PDF <Icon as={FaExternalLinkAlt} />
                  </a>
                ) : (
                  "N/A"
                )}
              </Td>
              <Td>{new Date(payment.createdAt).toLocaleDateString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};
const UserPayments = ({ user }: UserPaymentProps) => {
  const { get, loading } = useApi();
  const { t } = useTranslation();
  const [payments, setPayments] = useState<Payment[]>([]);
  const fetchPayments = async () => {
    const response = await get<Payment[]>("/payments");
    if (response?.success) {
      setPayments(response.data);
    }
  };
  useEffect(() => {
    fetchPayments();
  }, []);

  return loading ? (
    <></>
  ) : payments.length > 0 ? (
    <PaymentsTable payments={payments} />
  ) : (
    <Alert status="info">
      <AlertIcon />
      {t("plans:you_have_no_payments")}
    </Alert>
  );
};

export default UserPayments;
