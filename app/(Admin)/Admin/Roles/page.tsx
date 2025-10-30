import RoleListContainer from "./Containers/role-list-container";

export default function Page() {
  return (
    <>
      <h1 className="border-b p-4">Rol Listesi</h1>
      <div className="m-4">
        <RoleListContainer />
      </div>
    </>
  );
}
