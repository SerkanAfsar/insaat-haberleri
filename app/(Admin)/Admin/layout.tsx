import AdminContent from "@/components/admin/admin-content";
import AdminLeftMenu from "@/components/admin/admin-left-menu";
import AdminWrapper from "@/components/admin/admin-wrapper";
import AdminContextWrapper from "@/Providers/AdminContext";
import CustomQueryProvider from "@/Providers/CustomQueryProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CustomQueryProvider>
      <AdminContextWrapper>
        <AdminWrapper>
          <AdminLeftMenu />
          <AdminContent>{children}</AdminContent>
        </AdminWrapper>
      </AdminContextWrapper>
    </CustomQueryProvider>
  );
}
