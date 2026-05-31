interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-3">
      <label
        className="
          text-sm
          font-semibold
          text-slate-700
        "
      >
        {label}
      </label>

      {children}
    </div>
  );
}