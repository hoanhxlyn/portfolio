import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { projects } from "~/data/portfolio";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/project";

export function meta({ params }: Route.MetaArgs) {
  const project = projects.find((p) => p.slug === params.slug);
  return [{ title: project ? `${project.name} — Andrew Nguyen` : "Not found" }];
}

const stackRows = [
  ["Programming Language", "languages"],
  ["Framework", "frameworks"],
  ["Tool", "tools"],
  ["Platform, server and database", "platform"],
  ["Methodology", "methodology"],
] as const;

type Project = (typeof projects)[number];

/** A neighbouring project link: previous reads left, next reads right. */
function NeighborLink({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`${isPrev ? "Previous" : "Next"} project: ${project.name}`}
      className={cn(
        "group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary",
        !isPrev && "ml-auto flex-row-reverse text-right",
      )}
    >
      {isPrev ? (
        <ArrowLeftIcon size={18} className="shrink-0" />
      ) : (
        <ArrowRightIcon size={18} className="shrink-0" />
      )}
      <span className="max-w-[10rem] text-sm font-medium line-clamp-1">
        {project.name}
      </span>
    </Link>
  );
}

/**
 * Edge control for wide screens: a narrow pill that grows downward on hover to
 * reveal the project name, so it never widens into the article's gutter.
 */
function NeighborPill({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      to={`/projects/${project.slug}`}
      aria-label={`${isPrev ? "Previous" : "Next"} project: ${project.name}`}
      className="pointer-events-auto flex w-24 flex-col items-center gap-1 rounded-xl border bg-background/80 px-2 py-1.5 text-muted-foreground backdrop-blur transition-colors hover:border-primary/40 hover:text-primary"
    >
      {isPrev ? (
        <ArrowLeftIcon size={14} className="shrink-0" />
      ) : (
        <ArrowRightIcon size={14} className="shrink-0" />
      )}
      <span className="w-full text-center text-[11px] font-medium leading-tight line-clamp-1">
        {project.name}
      </span>
    </Link>
  );
}

export default function Project() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const navigate = useNavigate();

  // Every project opens at the top, including when arriving via prev/next or
  // the back button from another project.
  // biome-ignore lint/correctness/useExhaustiveDependencies: slug re-triggers the scroll on project change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  function goBack() {
    navigate("/");
  }

  if (index === -1) {
    return (
      <>
        <Header />
        <main className="pt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 text-center">
            <h1 className="text-2xl font-bold">Project not found</h1>
            <p className="mt-2 text-muted-foreground">
              The project you're looking for doesn't exist.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => navigate("/#projects")}
            >
              Back to projects
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const project = projects[index];
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <>
      <Header />
      <main className="pt-16">
        <article className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <Button variant="ghost" size="sm" onClick={goBack} className="-ml-3">
            <ArrowLeftIcon size={16} />
            Back
          </Button>

          <p className="mt-6 text-xs text-muted-foreground">{project.period}</p>
          <h1 className="mt-1 text-2xl md:text-3xl font-bold tracking-tight text-balance">
            {project.name}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {project.role} · Team: {project.teamSize}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>

          <p className="mt-8 text-muted-foreground leading-relaxed text-pretty">
            {project.description}
          </p>

          <dl className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-4 border-y py-6">
            <div>
              <dt className="text-xs text-muted-foreground">Client</dt>
              <dd className="mt-0.5 text-sm font-medium">{project.client}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Domain</dt>
              <dd className="mt-0.5 text-sm font-medium">{project.domain}</dd>
            </div>
          </dl>

          <section className="mt-10">
            <h2 className="text-lg font-semibold">Responsibilities</h2>
            <ul className="mt-4 space-y-2 list-disc pl-5 text-sm text-muted-foreground leading-relaxed">
              {project.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="text-lg font-semibold">Stack</h2>
            <dl className="mt-4 divide-y">
              {stackRows.map(([label, key]) => (
                <div
                  key={key}
                  className="grid sm:grid-cols-[12rem_1fr] gap-1 py-3"
                >
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-sm">{project.stack[key]}</dd>
                </div>
              ))}
            </dl>
          </section>

          {(prev || next) && (
            <nav className="mt-12 pt-6 border-t flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between xl:hidden">
              {prev ? (
                <NeighborLink project={prev} direction="prev" />
              ) : (
                <span />
              )}
              {next && <NeighborLink project={next} direction="next" />}
            </nav>
          )}
        </article>
      </main>

      {(prev || next) && (
        <nav
          aria-label="Project navigation"
          className="pointer-events-none fixed inset-y-0 inset-x-0 z-40 hidden xl:flex items-center justify-between px-3"
        >
          {prev && (
            <span className="pointer-events-auto">
              <NeighborPill project={prev} direction="prev" />
            </span>
          )}
          {next && (
            <span className="pointer-events-auto ml-auto">
              <NeighborPill project={next} direction="next" />
            </span>
          )}
        </nav>
      )}
      <Footer />
    </>
  );
}
