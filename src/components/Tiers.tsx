import { motion } from 'framer-motion';
import type { Salon } from '../data/salons';
import { money, smsHref } from '../data/salons';
import { fadeUp, stagger, drawLine, inView, springSnap } from '../lib/motion';
import './tiers.css';

interface Props {
  salon: Salon;
}

export function Tiers({ salon }: Props) {
  return (
    <section className="tiers" id="tiers" aria-labelledby="tiers-heading">
      <div className="tiers__inner shell">
        <motion.div className="tiers__head col" {...inView} variants={stagger}>
          <motion.p className="eyebrow" variants={fadeUp}>
            Two ways in
          </motion.p>
          <motion.h2 id="tiers-heading" className="tiers__title" variants={fadeUp}>
            Pick the one that matches how you book.
          </motion.h2>
          <motion.span className="tiers__rule" variants={drawLine} aria-hidden="true" />
        </motion.div>

        <motion.div className="tiers__grid" {...inView} variants={stagger}>
          {salon.tiers.map((tier) => (
            <motion.article
              key={tier.id}
              className="tier"
              data-pick={tier.regularsPick ? 'true' : undefined}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={springSnap}
            >
              {tier.regularsPick && (
                <span className="tier__flag">Where most regulars start</span>
              )}

              <header className="tier__head">
                <h3 className="tier__name">{tier.name}</h3>
                <p className="tier__for">{tier.forWhom}</p>
              </header>

              <div className="tier__price">
                <span className="tier__priceValue">{money(tier.price)}</span>
                <span className="tier__priceUnit">one membership</span>
              </div>
              <p className="tier__math">{tier.priceMath}</p>

              <div className="tier__worth">
                <span className="tier__worthLabel">Value inside</span>
                <span className="tier__worthValue">about {money(tier.stackValue)}</span>
              </div>

              <ul className="tier__perks">
                {tier.perks.map((perk) => (
                  <li className="tier__perk" key={perk}>
                    <Check />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              <a
                className={`btn btn--block ${tier.regularsPick ? 'btn--primary' : 'btn--accent'}`}
                href={smsHref(salon)}
                aria-label={`Join ${tier.name} at ${salon.name} by text`}
              >
                Join by text
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg
      className="tier__check"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="9" fill="currentColor" opacity="0.12" />
      <path
        d="M5.25 9.25 7.75 11.75 12.75 6.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
