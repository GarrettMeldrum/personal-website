// src/app/resume/page.tsx

export default function Page() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="/resume.pdf"
        className="w-full h-full border-none"
        title="Resume"
      />
    </div>
  );
}
