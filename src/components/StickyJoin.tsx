import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Salon } from '../data/salons';
import { money, smsHref } from '../data/salons';
import { springSettle } from '../lib/motion';
import './sticky-join.css';

interface Props {
  salon: Salon;
}

/** Mobile-only sticky join bar. Appears after the hero scrolls past. */
export function StickyJoin({ salon }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="stickyjoin"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={springSettle}
        >
          <div className="stickyjoin__text">
            <span className="stickyjoin__name">{salon.program}</span>
            <span className="stickyjoin__price">from {money(salon.tiers[0].price)}</span>
          </div>
          <a
            className="btn btn--accent stickyjoin__btn"
            href={smsHref(salon)}
            aria-label={`Join ${salon.program} by text`}
          >
            Join by text
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
