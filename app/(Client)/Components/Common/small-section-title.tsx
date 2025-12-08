export type SmallSectionTitleProps = {
  title: string;
};
export default function SmallSectionTitle({ title }: SmallSectionTitleProps) {
  return (
    <div className="font-oswald block w-full bg-[#eee] uppercase">
      <span className="bg-theme-primary inline-block p-2 text-white">
        {title}
      </span>
    </div>
  );
}
