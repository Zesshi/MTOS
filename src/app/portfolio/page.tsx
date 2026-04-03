import Image from "next/image";
import type { Metadata } from "next";
import { AccordionSection } from "@/components/accordion-section";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { siteConfig } from "@/lib/site";

const experience = [
  {
    role: "IT Coach and Vocational Trainer",
    organization: "Swiss Post, Bern",
    period: "2020 - Present",
    summary:
      "Coaching and training with a strong focus on secure architecture, secure development practices, code quality, and practical security thinking in engineering environments.",
  },
  {
    role: "IPA Examination Expert",
    organization: "ICT Vocational Education Switzerland, Bern",
    period: "2024 - Present",
    summary:
      "Assessment of implementation projects with attention to quality, maintainability, architecture decisions, and security-relevant design choices.",
  },
  {
    role: "DevOps Engineer",
    organization: "PostFinance AG, Bern",
    period: "2019 - 2020",
    summary:
      "Worked on CI/CD pipelines, platform stability, process quality, and reproducible delivery workflows in a regulated environment.",
  },
  {
    role: "Application Developer",
    organization: "PostFinance AG, Bern",
    period: "2015 - 2019",
    summary:
      "Built and maintained business applications in Java, collaborated on frontend and backend components, and supported operational troubleshooting.",
  },
];

const certifications = [
  "Cyber Security Specialist (Swiss Federal Diploma)",
  "CompTIA Security+",
  "Microsoft Certified: Azure Fundamentals (AZ-900)",
  "Microsoft Certified: Azure AI Fundamentals (AI-900)",
  "SVEB Trainer Certificate - Conducting Learning Events",
];

const focusAreas = [
  "Threat modeling and risk analysis",
  "Secure software design and OWASP Top 10 fundamentals",
  "Authentication and authorization",
  "Code reviews for security, maintainability, and quality",
  "Security awareness and training delivery",
  "CI/CD reliability and traceable engineering workflows",
  "NIST Cybersecurity Framework familiarity",
  "Incident response and log analysis at a conceptual level",
];

function ActionIcon({
  type,
}: {
  type: "github" | "linkedin";
}) {
  if (type === "github") {
    return (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
        <path d="M10 2.6a7.4 7.4 0 0 0-2.34 14.42c.37.07.5-.16.5-.36v-1.26c-2.03.44-2.46-.86-2.46-.86-.33-.84-.8-1.06-.8-1.06-.66-.45.05-.44.05-.44.72.05 1.1.74 1.1.74.65 1.1 1.7.78 2.12.6.07-.46.25-.78.46-.96-1.62-.18-3.33-.8-3.33-3.6 0-.8.29-1.47.75-1.99-.08-.18-.33-.93.07-1.94 0 0 .61-.19 2 .76a6.8 6.8 0 0 1 3.64 0c1.39-.95 2-.76 2-.76.4 1.01.15 1.76.07 1.94.47.52.75 1.19.75 1.99 0 2.8-1.72 3.41-3.35 3.59.26.23.5.68.5 1.37v2.03c0 .2.13.43.5.36A7.4 7.4 0 0 0 10 2.6Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M5.94 7.14a1.19 1.19 0 1 1 0-2.38a1.19 1.19 0 0 1 0 2.38Zm-1 1.6h2v6.5h-2v-6.5Zm3.14 0h1.92v.89h.03c.27-.5.92-1.03 1.9-1.03c2.03 0 2.4 1.26 2.4 2.9v3.74h-2v-3.31c0-.79-.01-1.8-1.11-1.8c-1.11 0-1.28.84-1.28 1.74v3.37h-1.98v-6.5Z" />
    </svg>
  );
}

function ActionButton({
  label,
  href,
  type,
}: {
  label: string;
  href: string;
  type: "github" | "linkedin";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-copy transition-colors hover:border-accent/30 hover:bg-accent/[0.05]"
    >
      <span className="text-accent">
        <ActionIcon type={type} />
      </span>
      <span>{label}</span>
    </a>
  );
}

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Work history, certifications, and the areas I spend most of my time on.",
};

export default function PortfolioPage() {
  return (
    <Container className="py-16">
      <SectionHeader
        eyebrow="Portfolio"
        title="Profile and experience."
        description="A short overview of my work, background, and focus areas."
      />

      <div className="mt-10 space-y-5">
        <section className="rounded-[1.75rem] border border-white/10 bg-panel/75 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)]">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                Profile
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-copy">
                {siteConfig.name}
              </h2>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                {siteConfig.role}
              </p>
            </div>

            <div className="w-24 shrink-0 sm:w-28">
              <div className="relative aspect-square overflow-hidden rounded-[1.1rem] border border-white/10 bg-ink-950/80">
                <Image
                  src="/images/profile-placeholder.svg"
                  alt="Portrait placeholder for Michael Moser"
                  fill
                  priority
                  sizes="112px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted">
            I work across cybersecurity, software engineering, and technical training, with a
            focus on making security decisions practical and understandable.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ActionButton label="GitHub" href={siteConfig.github} type="github" />
            <ActionButton label="LinkedIn" href={siteConfig.linkedin} type="linkedin" />
          </div>
          <div className="mt-6 border-t border-white/8 pt-6">
            <p className="max-w-3xl text-sm leading-7 text-muted">
              Most of my work sits somewhere between secure application design, review, coaching,
              and hands-on engineering. I like turning messy technical topics into something clear
              enough to use.
            </p>
          </div>
        </section>

        <AccordionSection
          eyebrow="Experience"
          title="Professional experience"
          summary="A short work history across engineering, security, and training."
        >
          <div className="space-y-5">
            {experience.map((item) => (
              <article
                key={`${item.role}-${item.period}`}
                className="border-t border-white/8 pt-5 first:border-none first:pt-0"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-copy">{item.role}</h3>
                    <p className="mt-1 text-sm text-muted">{item.organization}</p>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
                    {item.period}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </AccordionSection>

        <AccordionSection
          eyebrow="Credentials"
          title="Certifications"
          summary="Security and teaching credentials."
        >
          <ul className="space-y-3 text-sm leading-7 text-muted">
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </AccordionSection>

        <AccordionSection
          eyebrow="Focus"
          title="Core focus areas"
          summary="Topics that come up most often in my work."
        >
          <div className="grid gap-3 md:grid-cols-2">
            {focusAreas.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 text-sm leading-7 text-muted"
              >
                {item}
              </div>
            ))}
          </div>
        </AccordionSection>
      </div>
    </Container>
  );
}
