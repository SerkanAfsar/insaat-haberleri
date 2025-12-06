"use client";

import { SessionPayload } from "@/Types";
import React, { createContext, use, useState } from "react";

export type AdminContextType = {
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: SessionPayload | undefined;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);
export default function AdminContextWrapper({
  children,
  currentUserData,
}: {
  children: React.ReactNode;
  currentUserData: SessionPayload | undefined;
}) {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);

  return (
    <AdminContext.Provider
      value={{
        isMenuOpened,
        setIsMenuOpened,
        currentUser: currentUserData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export const useAdminContext = () => {
  const context = use(AdminContext);
  if (!context) {
    throw new Error("Admin Context is Not Defined");
  }
  return context;
};
