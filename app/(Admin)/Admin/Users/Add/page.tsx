import prisma from "@/lib/db";
import AddUpdateUserContainer from "../Containers/add-update-user-container";

import { ConvertData } from "@/lib/utils";

export default async function Users() {
  const roleList = await prisma.roles.findMany({
    orderBy: { id: "asc" },
    select: {
      roleName: true,
      id: true,
    },
  });

  const roleData = ConvertData(roleList, "id", "roleName");
  return (
    <>
      <h1 className="block border-b p-4">Kullanıcı Ekle / Güncelle</h1>
      <div className="p-4">
        <AddUpdateUserContainer roleList={roleData} type="ADD" />
      </div>
    </>
  );
}
