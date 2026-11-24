"use client";

import { motion, useReducedMotion } from "framer-motion";
import CurvedArrow from "@/components/shared/CurvedArrow";
import HandNote from "@/components/shared/HandNote";
import PageBase from "@/components/shared/PageBase";
import TypewriterText from "@/components/TypewriterText";
import { skillGroups, type Skill } from "@/lib/profile";

function SkillBar({
  skill,
  index,
  active,
}: {
  skill: Skill;
  index: number;
  active: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="skill-row">
      <div className="skill-label">
        <span>{skill.name}</span>
        <span className="skill-value">{skill.level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={{ width: active || reduceMotion ? `${skill.level}%` : 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.9,
            delay: reduceMotion ? 0 : 0.35 + index * 0.085,
            ease: [0.22, 0.8, 0.3, 1],
          }}
        >
          <span className="skill-spark" />
        </motion.div>
      </div>
    </div>
  );
}

export default function SkillsPage({
  active,
  runId,
}: {
  active: boolean;
  runId: number;
}) {
  const totalSkills = skillGroups.reduce(
    (total, group) => total + group.skills.length,
    0,
  );
  const totalAreas = skillGroups.length;

  return (
    <PageBase number={3} side="right" className="page-skills">
      <div className="skills-inner">
        <header className="page-head">
          <TypewriterText
            text="03 — HABILIDADES"
            className="eyebrow"
            active={active}
            runId={runId}
            speed={28}
          />
          <TypewriterText
            as="h2"
            text="Mi stack"
            className="page-title gradient-text"
            active={active}
            runId={runId}
            speed={60}
            delay={160}
          />
          <TypewriterText
            text="Herramientas que uso para dar forma a las ideas"
            className="page-subtitle"
            active={active}
            runId={runId}
            speed={22}
            delay={400}
          />
        </header>

        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <section className="skill-group" key={group.title}>
              <div className="skill-group-head">
                <span className="skill-group-sub">{group.subtitle}</span>
                <TypewriterText
                  text={group.title}
                  className="skill-group-title"
                  active={active}
                  runId={runId}
                  speed={34}
                  delay={500 + groupIndex * 110}
                />
              </div>
              <div className="skill-list">
                {group.skills.map((skill, index) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    index={index + groupIndex * 4}
                    active={active}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="skills-footer">
          <HandNote className="note-white">siempre aprendiendo algo nuevo</HandNote>
          <CurvedArrow className="skills-arrow" />
          <span className="skills-count">
            {totalSkills}{" "}
            {totalSkills === 1 ? "tecnología" : "tecnologías"} · {totalAreas}{" "}
            {totalAreas === 1 ? "área" : "áreas"}
          </span>
        </div>
      </div>
    </PageBase>
  );
}
