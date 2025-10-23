import { AdminDataType } from "@/Types";
import {
  ChartBarStacked,
  LayoutDashboard,
  List,
  Plus,
  User,
} from "lucide-react";

export const AdminMenuList: AdminDataType[] = [
  {
    title: "Dashboard",
    href: "/Admin/Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Kategoriler",
    icon: ChartBarStacked,
    subItems: [
      {
        icon: Plus,
        title: "Kategori Ekle",
        href: "/Admin/Categories/Add",
      },
      {
        icon: List,
        title: "Kategori Listesi",
        href: "/Admin/Categories",
      },
    ],
  },
  {
    title: "Kategoriler Url",
    icon: ChartBarStacked,
    subItems: [
      {
        icon: Plus,
        title: "Kategori Url Ekle",
        href: "/Admin/CategoryUrl/Add",
      },
      {
        icon: List,
        title: "Kategoriler Url Listesi",
        href: "/Admin/CategoryUrl",
      },
    ],
  },
  {
    title: "Kullanıcılar ve Roller",
    icon: User,
    subItems: [
      {
        icon: Plus,
        title: "Kullanıcı Ekle",
        href: "/Admin/Users/Add",
      },
      {
        icon: List,
        title: "Kullanıcı Listesi",
        href: "/Admin/Users",
      },
      {
        icon: Plus,
        title: "Rol Ekle",
        href: "/Admin/Roles/Add",
      },
      {
        icon: List,
        title: "Roller Listesi",
        href: "/Admin/Roles",
      },
    ],
  },
];

export const NEWS_SOURCES = {
  HUKUKI_HABER: "Hukuki Haber",
  ADALET_BIZ: "Adaler Biz",
} as const;
