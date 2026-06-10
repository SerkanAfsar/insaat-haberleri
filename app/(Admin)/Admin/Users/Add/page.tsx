import { prisma } from "@/lib/db";
import AddUpdateUserContainer from "../Containers/add-update-user-container";

import { ConvertData } from "@/lib/utils";
import { cacheTag } from "next/cache";
import { Suspense } from "react";

async function getData() {
  "use cache";
  cacheTag("roles");

  const roleList = await prisma.roles.findMany({
    orderBy: { id: "asc" },
    select: {
      roleName: true,
      id: true,
    },
  });

  const roleData = ConvertData(roleList, "id", "roleName");
  return roleData;
}

export default async function Users() {
  const result = await getData();
  return (
    <>
      <h1 className="block border-b p-4">Kullanıcı Ekle / Güncelle</h1>
      <Suspense>
        <div className="p-4">
          <AddUpdateUserContainer roleList={result} type="ADD" />
        </div>
      </Suspense>
    </>
  );
}
