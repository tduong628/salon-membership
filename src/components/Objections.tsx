import { motion } from 'framer-motion';
import type { Salon } from '../data/salons';
import { fadeUp, stagger, drawLine, inView } from '../lib/motion';
import './objections.css';

interface Props {
  salon: Salon;
}

export function Objections({ salon }: Props) {
  return (
    <section className="obj" id="questions" aria-labelledby="obj-heading">
      <div className="obj__inner shell">
        <motion.div className="obj__head col" {...inView} variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>
            Straight answers
          </motion.p>
          <motion.h2 id="obj-heading" className="obj__title" variants={fadeUp}>
            The honest version.
          </motion.h2>
          <motion.span className="obj__rule" variants={drawLine} aria-hidden="true" />
        </motion.div>

        <motion.div className="obj__grid col" {...inView} variants={stagger}>
          {salon.objections.map((item) => (
            <motion.div className="qa" key={item.q} variants={fadeUp}>
              <h3 className="qa__q">{item.q}</h3>
              <p className="qa__a">{item.a}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.dl className="obj__terms col" {...inView} variants={fadeUp}>
          <div className="term">
            <dt className="term__t">No expiration</dt>
            <dd className="term__d">Use your visits on your own timeline.</dd>
          </div>
          <div className="term">
            <dt className="term__t">Fully transferable</dt>
            <dd className="term__d">Gift a visit to family or a friend any time.</dd>
          </div>
          <div className="term">
            <dt className="term__t">Tracked at checkout</dt>
            <dd className="term__d">One visit deducted per appointment, kept on file for you.</dd>
          </div>
        </motion.dl>
      </div>
    </section>
  );
}
