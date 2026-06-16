import { useState } from "react";

export function useFirstSession(key: string): boolean {
  const [isFirst] = useState(() => {
    try {
      if (sessionStorage.getItem(key)) return false;
      sessionStorage.setItem(key, "1");
      return true;
    } catch {
      return false;
    }
  });
  return isFirst;
}
