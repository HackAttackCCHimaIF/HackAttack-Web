import { useState } from "react";

export function useCopyToClipboard(timeout = 800) {
  const [isCopying, setIsCopying] = useState(false);

  const copy = async (text: string) => {
    if (isCopying) return;

    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    } finally {
      setTimeout(() => setIsCopying(false), timeout);
    }
  };

  return { isCopying, copy };
}
