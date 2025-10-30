import { GetSingleRoleById } from "@/Services/Role.service";
import AddRoleContainer from "../../Containers/add-role-container";
import { AddRoleType, ModuleClaimType } from "@/Types";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;

  const role = await GetSingleRoleById(Number(id));
  const data: AddRoleType = {
    claims: JSON.parse(role.claims) as ModuleClaimType,
    roleName: role.roleName,
  };
  return <AddRoleContainer defaultDataValues={data} type="UPDATE" />;
}
