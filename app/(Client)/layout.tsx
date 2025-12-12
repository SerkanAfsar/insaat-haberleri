import dynamic from "next/dynamic";
const Header = dynamic(() => import("./Components/Header"));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
