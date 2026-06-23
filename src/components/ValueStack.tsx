import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { Salon } from '../data/salons';
import { money } from '../data/salons';
import { fadeUp, stagger, drawLine, inView } from '../lib/motion';
import { useCountUp } from '../lib/useCountUp';
import './value-stack.css';

interface Props {
  salon: Salon;
}

export function ValueStack({ salon }: Props) {
  const entry = salon.tiers[0];
  const [counting, setCounting] = useState(false);
  const totalRef = useRef<HTMLDivElement>(null);

  const total = useCountUp({ to: entry.stackValue, active: counting });

  const formatValue = (v: number) => (v > 0 ? money(v) : 'Included');

  return (
    <section className="value" id="value" aria-labelledby="value-heading">
      <div className="value__inner shell">
        <motion.div className="value__head col" {...inView} variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>
            What you get
          </motion.p>
          <motion.h2 id="value-heading" className="value__title" variants={fadeUp}>
            The value, line by line.
          </motion.h2>
          <motion.span className="value__rule" variants={drawLine} aria-hidden="true" />
          <motion.p className="value__lede" variants={fadeUp}>
            Every visit is the full price posted on the wall. Nothing here is a markdown.
            The membership simply hands you the perks our regulars keep asking for.
          </motion.p>
        </motion.div>

        <motion.ul
          className="ledger col"
          {...inView}
          variants={stagger}
          onAnimationStart={() => setCounting(true)}
        >
          {salon.valueStack.map((line) => (
            <motion.li
              className="ledger__row"
              data-anchor={line.anchor ? 'true' : undefined}
              key={line.label}
              variants={fadeUp}
            >
              <div className="ledger__text">
                <span className="ledger__label">{line.label}</span>
                <span className="ledger__detail">{line.detail}</span>
              </div>
              <span className="ledger__value" data-zero={line.value === 0 ? 'true' : undefined}>
                {formatValue(line.value)}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div className="value__totals col" ref={totalRef} {...inView} variants={fadeUp}>
          <div className="value__totalsRow value__totalsRow--perceived">
            <span className="value__totalsLabel">Everything above is worth about</span>
            <span className="value__totalsBig">{money(total)}</span>
          </div>
          <div className="value__totalsRow value__totalsRow--pay">
            <span className="value__totalsLabel">You pay</span>
            <span className="value__totalsPay">{money(entry.price)}</span>
          </div>
          <p className="value__totalsNote">
            Per-visit price unchanged. The gap is the stack of perks, not a discount.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
