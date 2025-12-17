import ContainerWrapper from "../Common/container-wrapper";
import FooterAbout from "./footer-about";
import FooterBottom from "./footer-bottom";
import FooterLinks from "./footer-links";

export default function Footer() {
  return (
    <footer className="border-theme-primary mt-auto w-full gap-4 border-t-4 bg-[#333] p-4 text-[#999]">
      <ContainerWrapper className="flex flex-col md:flex-row">
        <FooterAbout />
        <FooterLinks />
      </ContainerWrapper>
      <ContainerWrapper>
        <FooterBottom />
      </ContainerWrapper>
    </footer>
  );
}
