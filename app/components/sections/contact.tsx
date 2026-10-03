import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { SectionWrapper } from "~/components/section-wrapper";
import { personalInfo } from "~/data/portfolio";

const { email, phone, location } = personalInfo;

const links = [
  {
    icon: <EnvelopeSimpleIcon size={20} />,
    label: "Email",
    value: email,
    href: `mailto:${email}`,
  },
  {
    icon: <PhoneIcon size={20} />,
    label: "Phone",
    value: phone,
    href: `tel:${phone}`,
  },
  {
    icon: <MapPinIcon size={20} />,
    label: "Location",
    value: location,
    href: null,
  },
];

export function Contact() {
  return (
    <SectionWrapper
      id="contact"
      title="Contact"
      subtitle="Let's work together"
      className="bg-muted/30"
    >
      <div className="max-w-xl">
        <ul className="space-y-0">
          {links.map((link) => (
            <li
              key={link.label}
              className="flex items-center gap-4 py-5 border-b border-border/50 last:border-0"
            >
              <div className="text-primary shrink-0" aria-hidden="true">
                {link.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  {link.label}
                </p>
                {link.href ? (
                  <a
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {link.value}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{link.value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
