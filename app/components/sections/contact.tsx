import {
  EnvelopeSimpleIcon,
  MapPinIcon,
  PhoneIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { SectionWrapper } from "~/components/section-wrapper";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface ContactProps {
  email: string;
  phone: string;
  location: string;
}

export function Contact({ email, phone, location }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <SectionWrapper
      id="contact"
      title="Contact"
      subtitle="Let's work together"
      className="bg-muted/30"
    >
      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Get in touch</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3">
              <EnvelopeSimpleIcon size={20} className="text-primary shrink-0" />
              <a
                href={`mailto:${email}`}
                className="hover:text-primary transition-colors"
              >
                {email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <PhoneIcon size={20} className="text-primary shrink-0" />
              <span>{phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPinIcon size={20} className="text-primary shrink-0" />
              <span>{location}</span>
            </li>
          </ul>
        </div>

        <div>
          {submitted ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-lg text-muted-foreground">
                Thanks for reaching out! I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  rows={4}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
