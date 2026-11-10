export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-entrance">
      <div className="page-entrance__wipe" aria-hidden="true" />
      {children}
    </div>
  );
}
