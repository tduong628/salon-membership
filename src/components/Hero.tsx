import { motion } from 'framer-motion';
import type { Salon } from '../data/salons';
import { money, smsHref } from '../data/salons';
import { fadeUp, stagger, drawLine } from '../lib/motion';
import './hero.css';

interface Props {
  salon: Salon;
}

export function Hero({ salon }: Props) {
  const entry = salon.tiers[0];
  return (
    <section className="hero" id="hero" aria-labelledby="hero-heading">
      <motion.div
        className="hero__inner col"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.p className="eyebrow hero__eyebrow" variants={fadeUp}>
          {salon.eyebrow} · {salon.name}
        </motion.p>

        <motion.h1 id="hero-heading" className="hero__title" variants={fadeUp}>
          {salon.program}
        </motion.h1>
        <motion.span
          className="hero__rule"
          variants={drawLine}
          aria-hidden="true"
        />

        <motion.p className="hero__promise" variants={fadeUp}>
          {salon.promise}
        </motion.p>

        <motion.div className="hero__meta" variants={fadeUp}>
          <div className="hero__metaItem">
            <span className="hero__metaLabel">Starts at</span>
            <span className="hero__metaValue">{money(entry.price)}</span>
          </div>
          <span className="hero__metaDivider" aria-hidden="true" />
          <div className="hero__metaItem">
            <span className="hero__metaLabel">Value inside</span>
            <span className="hero__metaValue">about {money(entry.stackValue)}</span>
          </div>
        </motion.div>

        <motion.div className="hero__cta" variants={fadeUp}>
          <a
            className="btn btn--primary"
            href={smsHref(salon)}
            aria-label={`Join ${salon.program} by text`}
          >
            Join by text
          </a>
          <a className="btn btn--ghost" href="#value">
            See what is inside
          </a>
        </motion.div>

        <motion.p className="hero__note" variants={fadeUp}>
          {salon.city}
        </motion.p>
      </motion.div>
    </section>
  );
}
