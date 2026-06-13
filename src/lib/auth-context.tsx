import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type User = { name: string; phone?: string; email?: string; method: "google" | "apple" | "phone" | "email" };

type Ctx = {
  user: User | null;
  isLoggedIn: boolean;
  isGuest: boolean;
  login: (u: User) => void;
  logout: () => void;
  /** open the auth modal; optional reason shown as subheading */
  requireAuth: (reason?: string) => void;
  /** internal: modal state */
  _modalOpen: boolean;
  _reason: string;
  _close: () => void;
};

const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem("cc-user");
    if (raw) { try { setUser(JSON.parse(raw)); } catch {} }
  }, []);

  const login = (u: User) => {
    setUser(u);
    if (typeof window !== "undefined") sessionStorage.setItem("cc-user", JSON.stringify(u));
    setModalOpen(false);
  };
  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") sessionStorage.removeItem("cc-user");
  };
  const requireAuth = (r?: string) => { setReason(r ?? ""); setModalOpen(true); };
  const _close = () => setModalOpen(false);

  return (
    <AuthCtx.Provider value={{
      user, isLoggedIn: !!user, isGuest: !user,
      login, logout, requireAuth,
      _modalOpen: modalOpen, _reason: reason, _close,
    }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
