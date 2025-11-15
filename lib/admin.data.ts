import { AdminDataType, ModuleClaimType } from "@/Types";
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
  ADALET_BIZ: "Adalet Biz",
} as const;

export const ModuleClaimsData = {
  Categories: {
    create: false,
    delete: false,
    read: false,
    update: false,
  },
  CategoryUrl: {
    create: false,
    delete: false,
    read: false,
    update: false,
  },
  Dashboard: {
    create: false,
    delete: false,
    read: false,
    update: false,
  },
  Roles: {
    create: false,
    delete: false,
    read: false,
    update: false,
  },
  Settings: {
    create: false,
    delete: false,
    read: false,
    update: false,
  },
  Users: {
    create: false,
    delete: false,
    read: false,
    update: false,
  },
} as const satisfies ModuleClaimType;

export const apiUrl = {
  Categories: "/api/category",
  CategoryUrl: "/api/categorysources",
  Users: "/api/users",
  Roles: "/api/roles",
} as const;

export const methodTypes = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
} as const;

export type ApiUrlType = typeof apiUrl;

export type MethodType = typeof methodTypes;

export type CrudType = {
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export type ApiRoleType = {
  [K in keyof ApiUrlType as ApiUrlType[K]]: {
    [M in keyof MethodType]: `${K}.${keyof CrudType}`;
  };
};

export const ApiCheckValue: ApiRoleType = {
  "/api/category": {
    delete: "Categories.delete",
    get: "Categories.read",
    post: "Categories.create",
    put: "Categories.update",
  },
  "/api/categorysources": {
    delete: "CategoryUrl.delete",
    get: "CategoryUrl.read",
    post: "CategoryUrl.create",
    put: "CategoryUrl.update",
  },
  "/api/roles": {
    delete: "Roles.delete",
    get: "Roles.read",
    post: "Roles.create",
    put: "Roles.update",
  },
  "/api/users": {
    delete: "Users.delete",
    get: "Users.read",
    post: "Users.create",
    put: "Users.update",
  },
};
