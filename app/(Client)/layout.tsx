import dynamic from "next/dynamic";
import Footer from "./Components/Footer";
const Header = dynamic(() => import("./Components/Header"));

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrapper flex min-h-screen flex-col">
      <Header />
      <main className="mb-4">{children}</main>
      <Footer />
    </div>
  );
}
