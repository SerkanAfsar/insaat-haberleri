import AdminContent from "@/components/admin/admin-content";
import AdminLeftMenu from "@/components/admin/admin-left-menu";
import AdminWrapper from "@/components/admin/admin-wrapper";

import AdminContextWrapper from "@/Providers/AdminContext";
import CustomQueryProvider from "@/Providers/CustomQueryProvider";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const cookieStore = await cookies();
  // const user = await decrypt(
  //   cookieStore.get("accessToken")?.value ?? "",
  //   "accessToken",
  // );
  return (
    <CustomQueryProvider>
      <AdminContextWrapper currentUserData={undefined}>
        <AdminWrapper>
          <AdminLeftMenu />
          <AdminContent>{children}</AdminContent>
        </AdminWrapper>
      </AdminContextWrapper>
    </CustomQueryProvider>
  );
}
