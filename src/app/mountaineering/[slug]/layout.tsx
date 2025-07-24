// app/mountaineering/[slug]/layout.tsx
export default function PostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="rounded-lg shadow-lg p-6 bg-neutral-900 prose prose-medium prose-invert">
        {children}
      </div>
    </div>
  );
}