import { motion } from 'framer-motion';
import type { Salon } from '../data/salons';
import { smsHref } from '../data/salons';
import { fadeUp, stagger, inView } from '../lib/motion';
import './closing-cta.css';

interface Props {
  salon: Salon;
}

export function ClosingCta({ salon }: Props) {
  return (
    <section className="cta" id="join" aria-labelledby="cta-heading">
      <motion.div className="cta__inner col" {...inView} variants={stagger}>
        <motion.p className="eyebrow cta__eyebrow" variants={fadeUp}>
          Join {salon.program}
        </motion.p>
        <motion.h2 id="cta-heading" className="cta__title" variants={fadeUp}>
          Text us and you are in.
        </motion.h2>
        <motion.p className="cta__body" variants={fadeUp}>
          One text opens your membership. We confirm the rest by reply, and your visits are on
          file from your very next appointment.
        </motion.p>

        <motion.a
          className="btn btn--accent btn--block cta__btn"
          href={smsHref(salon)}
          variants={fadeUp}
          aria-label={`Join ${salon.program} by text`}
        >
          Join by text
        </motion.a>

        <motion.p className="cta__alt" variants={fadeUp}>
          or just ask at your next checkout.
        </motion.p>

        <motion.p className="cta__line" variants={fadeUp}>
          {salon.name} · {salon.sms.display}
        </motion.p>
      </motion.div>
    </section>
  );
}
