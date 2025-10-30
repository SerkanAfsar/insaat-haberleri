"use client";
import React, { createContext, use, useState } from "react";

export type AdminContextType = {
  isMenuOpened: boolean;
  setIsMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);
export default function AdminContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true);
  return (
    <AdminContext.Provider
      value={{
        isMenuOpened,
        setIsMenuOpened,
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
