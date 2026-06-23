import { SALONS, type SalonKey } from '../data/salons';
import './footer.css';

interface Props {
  active: SalonKey;
  onChange: (key: SalonKey) => void;
}

export function Footer({ active, onChange }: Props) {
  const other: SalonKey = active === 'deluxe' ? 'zen' : 'deluxe';
  const otherSalon = SALONS[other];

  return (
    <footer className="footer">
      <div className="footer__inner shell">
        <p className="footer__cross">
          Looking for {otherSalon.name}?{' '}
          <button type="button" className="footer__link" onClick={() => onChange(other)}>
            See {otherSalon.program}
          </button>
        </p>
        <p className="footer__legal">
          Membership visits are prepaid at full posted menu price. No expiration. Fully
          transferable. Tracked at checkout.
        </p>
        <p className="footer__brands">
          Deluxe Nail Spa, Cary &nbsp;·&nbsp; Zen Nail Spa, Durham
        </p>
      </div>
    </footer>
  );
}
