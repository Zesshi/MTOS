type ResumeDownloadCardProps = {
  href: string;
  available: boolean;
};

export function ResumeDownloadCard({ href, available }: ResumeDownloadCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-panel/75 p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Resume</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-copy">Download or replace</h2>
      <p className="mt-3 text-sm leading-7 text-muted">
        Drop a PDF into <code>/public/resume/resume.pdf</code> and the download button will light
        up automatically.
      </p>
      {available ? (
        <a
          href={href}
          className="mt-5 inline-flex rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/15 hover:text-copy"
        >
          Download resume PDF
        </a>
      ) : (
        <div className="mt-5 inline-flex rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted">
          Resume PDF not added yet
        </div>
      )}
    </section>
  );
}
