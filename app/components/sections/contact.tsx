import {
  ChatCircleDotsIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { SectionWrapper } from "~/components/section-wrapper";
import { LinkButton } from "~/components/ui/button";
import { personalInfo } from "~/data/portfolio";

const { email, phone, linkedin } = personalInfo;

const zaloUrl = `https://zalo.me/${phone}`;

const socials = [
  {
    label: "Email",
    icon: <EnvelopeSimpleIcon size={20} />,
    href: `mailto:${email}`,
  },
  { label: "LinkedIn", icon: <LinkedinLogoIcon size={20} />, href: linkedin },
  { label: "Zalo", icon: <ChatCircleDotsIcon size={20} />, href: zaloUrl },
  { label: "Phone", icon: <PhoneIcon size={20} />, href: `tel:${phone}` },
];

export function Contact() {
  return (
    <SectionWrapper
      id="contact"
      title="Contact"
      subtitle="Let's build something"
      className="bg-muted/30"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Available for work
          </span>

          <div>
            <LinkButton href={`mailto:${email}`} size="lg">
              Say hi
            </LinkButton>
          </div>
        </div>

        <ul className="flex items-center gap-3">
          {socials.map(({ label, icon, href }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="inline-flex size-10 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
