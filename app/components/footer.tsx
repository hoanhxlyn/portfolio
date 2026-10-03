export function Footer() {
  return (
    <footer className="border-t">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Andrew Nguyen
          </p>
          <nav
            className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground"
            aria-label="Footer"
          >
            {["About", "Skills", "Experience", "Projects", "Contact"].map(
              (label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="hover:text-primary transition-colors"
                >
                  {label}
                </a>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
