import { motion, useScroll, useSpring } from 'framer-motion';
import { SalonSwitcher } from './SalonSwitcher';
import type { SalonKey } from '../data/salons';
import './top-bar.css';

interface Props {
  active: SalonKey;
  onChange: (key: SalonKey) => void;
}

export function TopBar({ active, onChange }: Props) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <header className="topbar">
      <div className="topbar__inner shell">
        <a href="#hero" className="topbar__wordmark">
          <span className="topbar__mark">Membership</span>
        </a>
        <SalonSwitcher active={active} onChange={onChange} />
      </div>
      <motion.div className="topbar__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}
