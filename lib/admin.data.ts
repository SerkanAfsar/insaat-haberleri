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
    title: "Haberler",
    icon: ChartBarStacked,
    subItems: [
      {
        icon: Plus,
        title: "Haber Ekle",
        href: "/Admin/News/Add",
      },
      {
        icon: List,
        title: "Haber Listesi",
        href: "/Admin/News",
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
  INSAAT_DERYASI: {
    title: "İnşaat Deryası",
    url: "https://www.insaatderyasi.com/",
    categoryNodeKey: ".col-xs-12.col-ms-6.col-md-4 a",
    newsDetail: {
      title: ".content-title",
      subTitle: ".content-description summary",
      content: ".text-content",
      imageSourceNode: ".imgc.image img",
    },
  },
  YAPI_COMTR: {
    title: "Yapı Com Tr",
    url: "https://www.yapi.com.tr/",
    categoryNodeKey: ".mid-news-bar a",
    newsDetail: {
      title: ".news-detail-title",
      subTitle: ".subinfo",
      content: ".news_detail_paged_content",
      imageSourceNode: ".detay-poster",
    },
  },
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
  Newses: {
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
  Newses: "/api/newses",
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
  "/api/newses": {
    delete: "Newses.delete",
    get: "Newses.read",
    post: "Newses.create",
    put: "Newses.update",
  },
};

export const convertToClaimData = (data: string[]) => {
  if (data.length == 0) return;

  const arrList = [
    "Categories",
    "CategoryUrl",
    "Dashboard",
    "Roles",
    "Settings",
    "Users",
    "Newses",
  ];

  return arrList.reduce((acc, next) => {
    const readAction = `${next}.read`;
    const createAction = `${next}.create`;
    const updateAction = `${next}.update`;
    const deleteAction = `${next}.delete`;

    return {
      ...acc,
      [next]: {
        create: data.indexOf(createAction) > -1,
        read: data.indexOf(readAction) > -1,
        update: data.indexOf(updateAction) > -1,
        delete: data.indexOf(deleteAction) > -1,
      },
    };
  }, {});
};

export const encodeClaims = <T extends object>(claims: T) => {
  const arr: string[] = [];
  Object.entries(claims).forEach(([key, permissions]) => {
    Object.entries(permissions).forEach(([permKey, value]) => {
      if (value) arr.push(`${key}.${permKey}`);
    });
  });
  return JSON.stringify(arr);
};
