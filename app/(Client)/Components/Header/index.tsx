import dynamic from "next/dynamic";
import { getCategoryListClientService } from "@/ClientServices/news.clientservice";
const HeaderContainer = dynamic(() => import("./header-container"));

export default async function Header() {
  const result = await getCategoryListClientService();
  return <HeaderContainer categories={result} />;
}
