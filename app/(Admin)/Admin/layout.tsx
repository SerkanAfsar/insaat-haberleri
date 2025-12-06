import AdminContent from "@/components/admin/admin-content";
import AdminLeftMenu from "@/components/admin/admin-left-menu";
import AdminWrapper from "@/components/admin/admin-wrapper";
import { decrypt } from "@/lib/auth";
import AdminContextWrapper from "@/Providers/AdminContext";
import CustomQueryProvider from "@/Providers/CustomQueryProvider";

import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const user = await decrypt(
    cookieStore.get("accessToken")?.value ?? "",
    "accessToken",
  );
  return (
    <CustomQueryProvider>
      <AdminContextWrapper currentUserData={user}>
        <AdminWrapper>
          <AdminLeftMenu />
          <AdminContent>{children}</AdminContent>
        </AdminWrapper>
      </AdminContextWrapper>
    </CustomQueryProvider>
  );
}
