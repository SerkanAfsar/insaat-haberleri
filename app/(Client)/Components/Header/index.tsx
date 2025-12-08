import { getCategoryListClientService } from "@/ClientServices/news.clientservice";
import HeaderContainer from "./header-container";

export default async function Header() {
  const result = await getCategoryListClientService();
  return <HeaderContainer categories={result} />;
}
