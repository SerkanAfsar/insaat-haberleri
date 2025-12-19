export default function FooterBottom() {
  return (
    <section className="mt-4 flex w-full flex-col items-center justify-between gap-2 border-t border-[#ffffff1a] pt-4 lg:flex-row">
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
