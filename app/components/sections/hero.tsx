import { ArrowDownIcon } from "@phosphor-icons/react";
import { motion } from "motion/react";
import { LinkButton } from "~/components/ui/button";
import { personalInfo } from "~/data/portfolio";
import { fadeUp, stagger } from "~/lib/motion";

const { englishName, title, objective } = personalInfo;

export function Hero() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center px-4 sm:px-6">
      <motion.div
        className="max-w-3xl w-full text-center"
        variants={stagger(0.1)}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={fadeUp}
          className="text-sm font-medium text-primary tracking-widest uppercase mb-4"
        >
          {title}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-balance"
        >
          {englishName}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          className="mt-3 text-lg text-muted-foreground font-light tracking-tight"
        >
          Building interfaces that feel inevitable.
        </motion.p>
        <motion.p
          variants={fadeUp}
          className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed text-pretty"
        >
          {objective[0]}
        </motion.p>
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <LinkButton href="#projects" size="lg">
            View My Work
          </LinkButton>
          <LinkButton href="#contact" variant="outline" size="lg">
            Get In Touch
          </LinkButton>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse">
        <ArrowDownIcon
          size={20}
          className="text-muted-foreground"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
