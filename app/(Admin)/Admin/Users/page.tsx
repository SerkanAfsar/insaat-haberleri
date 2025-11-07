import UserListContainer from "./Containers/user-list.container";

export default function Users() {
  return (
    <>
      <h1 className="border-b p-4">Kullanıcı Listesi</h1>
      <div className="m-4">
        <UserListContainer />
      </div>
    </>
  );
}
