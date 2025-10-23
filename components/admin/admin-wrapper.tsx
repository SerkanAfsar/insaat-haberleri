export default function AdminWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-outfit flex h-screen w-full">{children}</div>;
}
