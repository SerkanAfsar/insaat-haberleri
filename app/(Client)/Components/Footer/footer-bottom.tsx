export default function FooterBottom() {
  return (
    <section className="mt-4 flex w-full items-center justify-between border-t border-[#ffffff1a] pt-4">
      <span>İnşaat Haberleri © {new Date().getFullYear()}</span>
      <div>
        Powered By{" "}
        <span className="text-theme-primary font-bold underline underline-offset-2">
          JesterColony
        </span>
      </div>
    </section>
  );
}
