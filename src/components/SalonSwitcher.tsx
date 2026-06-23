import { motion } from 'framer-motion';
import { SALONS, type SalonKey } from '../data/salons';
import { springSettle } from '../lib/motion';
import './salon-switcher.css';

interface Props {
  active: SalonKey;
  onChange: (key: SalonKey) => void;
}

const ORDER: SalonKey[] = ['deluxe', 'zen'];

export function SalonSwitcher({ active, onChange }: Props) {
  return (
    <div
      className="switcher"
      role="radiogroup"
      aria-label="Choose a salon"
    >
      {ORDER.map((key) => {
        const salon = SALONS[key];
        const selected = key === active;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={selected}
            className="switcher__option"
            data-selected={selected}
            onClick={() => onChange(key)}
          >
            {selected && (
              <motion.span
                layoutId="switcher-pill"
                className="switcher__pill"
                transition={springSettle}
                aria-hidden="true"
              />
            )}
            <span className="switcher__label">{salon.switchLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
