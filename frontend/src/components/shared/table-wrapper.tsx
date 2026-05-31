export default function TableWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        {children}
      </div>
    </div>
  );
}