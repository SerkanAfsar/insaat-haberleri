"use client";
import {
  MoonStar,
  Search,
  SquareArrowLeft,
  SquareArrowRight,
} from "lucide-react";
import AdminTopWrapper from "./admin-top-wrapper";
import LastContactList from "./last-contact-list";
import { Input } from "../ui/input";
import UserInfo from "./user-info";
import { useAdminContext } from "@/Providers/AdminContext";

export default function AdminContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMenuOpened, setIsMenuOpened } = useAdminContext();
  return (
    <section className="flex h-full w-full flex-auto flex-col overflow-auto">
      <AdminTopWrapper className="sticky top-0 right-0 left-0 w-full justify-between border-b bg-white px-4 py-10">
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setIsMenuOpened((prev: boolean) => !prev)}
            className="flex h-10 w-12 cursor-pointer items-center justify-center rounded-sm border"
          >
            {isMenuOpened ? <SquareArrowLeft /> : <SquareArrowRight />}
          </button>
          <div className="relative flex items-stretch">
            <Search className="absolute top-[50%] left-2 -translate-y-1/2 text-gray-300" />
            <Input
              placeholder="Arama..."
              className="w-[200px] py-5 pl-10 outline-0 focus-visible:ring-1 md:w-[400px]"
            />
          </div>
        </div>
        <div className="relative flex items-center gap-4">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border">
            <MoonStar strokeWidth={1.25} />
          </button>
          <LastContactList />
          <UserInfo />
        </div>
      </AdminTopWrapper>
      <AdminContentWrapper>{children}</AdminContentWrapper>
    </section>
  );
}

function AdminContentWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-adminbg flex-auto p-5">
      <div className="min-h-full rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {children}
      </div>
    </div>
  );
}
