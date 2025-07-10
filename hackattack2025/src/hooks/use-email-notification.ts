import { useState } from "react";
import {
  EmailNotificationService,
  EmailServiceResponse,
} from "@/lib/email-service";

export interface UseEmailNotificationReturn {
  email: string;
  isLoading: boolean;
  message: string;
  isSuccess: boolean;
  isError: boolean;
  setEmail: (email: string) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearMessage: () => void;
}

export function useEmailNotification(): UseEmailNotificationReturn {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address");
      setIsError(true);
      setIsSuccess(false);
      return;
    }

    setIsLoading(true);
    setMessage("");
    setIsError(false);
    setIsSuccess(false);

    try {
      const response: EmailServiceResponse =
        await EmailNotificationService.subscribeEmail(email.trim());

      setMessage(response.message);
      setIsSuccess(response.success);
      setIsError(!response.success);

      if (response.success) {
        setEmail(""); // Clear form on success
      }
    } catch (error) {
      setMessage("An unexpected error occurred. Please try again.");
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessage = () => {
    setMessage("");
    setIsError(false);
    setIsSuccess(false);
  };

  return {
    email,
    isLoading,
    message,
    isSuccess,
    isError,
    setEmail,
    handleSubmit,
    clearMessage,
  };
}
