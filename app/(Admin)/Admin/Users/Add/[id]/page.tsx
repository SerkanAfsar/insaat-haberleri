import prisma from "@/lib/db";
import { ConvertData } from "@/lib/utils";
import AddUpdateUserContainer from "../../Containers/add-update-user-container";
import { AddUserType } from "@/Types";
import { GetUserById } from "@/Services/Users.service";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const roleList = await prisma.roles.findMany({
    orderBy: { id: "asc" },
    select: {
      roleName: true,
      id: true,
    },
  });

  const roleData = ConvertData(roleList, "id", "roleName");

  const user = await GetUserById(Number(id));
  if (!user) {
    return notFound();
  }

  const defaultDataValues: AddUserType = {
    email: user.email,
    name: user.name,
    password: "",
    rePassword: "",
    roles: user.UserRoles.map((item) => item.rolesId),
    surname: user.surname,
  };

  return (
    <>
      <h1 className="block border-b p-4">Kullanıcı Ekle / Güncelle</h1>
      <div className="p-4">
        <AddUpdateUserContainer
          defaultDataValues={defaultDataValues}
          roleList={roleData}
          type="UPDATE"
        />
      </div>
    </>
  );
}
