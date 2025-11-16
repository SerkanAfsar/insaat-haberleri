import { GetSingleRoleById } from "@/Services/Role.service";
import AddRoleContainer from "../../Containers/add-role-container";
import { AddRoleType, ModuleClaimType } from "@/Types";
import { convertToClaimData } from "@/lib/admin.data";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const role = await GetSingleRoleById(Number(id));

  const claimData = convertToClaimData(
    JSON.parse(role.claims) as string[],
  ) as ModuleClaimType;

  const data: AddRoleType = {
    claims: claimData,
    roleName: role.roleName,
  };

  return <AddRoleContainer defaultDataValues={data} type="UPDATE" />;
}
