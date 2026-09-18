import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold tracking-tight">Andrew Nguyen</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Software Engineer specializing in frontend development.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {["About", "Skills", "Experience", "Projects", "Contact"].map(
                (label) => (
                  <li key={label}>
                    <a
                      href={`#${label.toLowerCase()}`}
                      className="hover:text-primary transition-colors"
                    >
                      {label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <EnvelopeSimple size={16} />
                <a
                  href="mailto:ngphuchoanganh@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  ngphuchoanganh@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>0962120898</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Hoai Duc, Ha Noi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          {new Date().getFullYear()} Andrew Nguyen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
