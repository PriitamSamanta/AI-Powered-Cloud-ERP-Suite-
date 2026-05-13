export default function TableWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">{children}</div>
  );
}
