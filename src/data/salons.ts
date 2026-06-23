// Single source of truth for both salon membership offers.
// All numbers come verbatim from /Volumes/Claude/John/Membership/OFFER_SPEC.md.
// COPY RULE: zero em-dashes, zero emoji, zero discount/percent-off/sale language.
// The value is the stack. The per-visit price never moves.

export type SalonKey = 'deluxe' | 'zen';

export interface ValueLine {
  /** What the member gets. */
  label: string;
  /** Plain-language detail under the label. */
  detail: string;
  /** Dollar value that rolls into the running stack total. */
  value: number;
  /** True when this line is the anchored, paid-for core (the prepaid visits). */
  anchor?: boolean;
}

export interface Tier {
  id: string;
  /** Tier display name. */
  name: string;
  /** One-line who-it-is-for. */
  forWhom: string;
  /** Price the member pays. */
  price: number;
  /** Posted menu math that proves it is full price. */
  priceMath: string;
  /** Bullet perks specific to this tier. */
  perks: string[];
  /** Perceived stack value. */
  stackValue: number;
  /** Marks the tier a loyal regular most often picks (subtle, not a loud badge). */
  regularsPick?: boolean;
}

export interface Objection {
  q: string;
  a: string;
}

export interface Salon {
  key: SalonKey;
  /** Salon brand name. */
  name: string;
  city: string;
  /** Membership program name. */
  program: string;
  /** Short switcher label. */
  switchLabel: string;
  /** One-line promise under the program name. */
  promise: string;
  /** Eyebrow above the hero. */
  eyebrow: string;
  /** The hero tier value-stack (the entry membership). */
  valueStack: ValueLine[];
  /** Both tiers. */
  tiers: Tier[];
  objections: Objection[];
  /** Phone line and prefilled join text. */
  sms: { line: string; display: string; body: string };
}

const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
export const money = usd;

export const SALONS: Record<SalonKey, Salon> = {
  deluxe: {
    key: 'deluxe',
    name: 'Deluxe Nail Spa',
    city: 'Cary, North Carolina',
    program: 'The Deluxe Standing',
    switchLabel: 'Deluxe',
    promise: 'Your standing appointment, prepaid at the price on the wall, with the perks our regulars actually want.',
    eyebrow: 'Membership',
    valueStack: [
      {
        label: 'Five gel manicures',
        detail: "At today's posted menu price of $37 each. The refill habit you already keep, prepaid.",
        value: 185,
        anchor: true,
      },
      {
        label: 'A free design accent every visit',
        detail: 'French, chrome, or a single statement nail. Yours on every visit at no added charge.',
        value: 60,
      },
      {
        label: 'The Standing Window',
        detail: 'Member-only Tuesday through Thursday priority, plus Friday and Saturday slots held before public booking.',
        value: 0,
      },
      {
        label: 'Skip the wait on walk-in days',
        detail: 'Your chair is held. You walk past the wait.',
        value: 0,
      },
      {
        label: 'A free sixth gel manicure',
        detail: 'After your fifth visit, the next one is on us.',
        value: 37,
      },
      {
        label: 'A birthday-month add-on',
        detail: 'Paraffin or a callus treatment, our gift in your birthday month.',
        value: 10,
      },
      {
        label: 'Your price locked for the year',
        detail: "When the menu rises, your rate holds at today's price.",
        value: 0,
      },
      {
        label: 'No expiration, fully transferable',
        detail: 'Use them on your own timeline, or gift a visit to family or a friend.',
        value: 0,
      },
    ],
    tiers: [
      {
        id: 'standing',
        name: 'The Standing',
        forWhom: 'For the every-few-weeks gel manicure regular.',
        price: 185,
        priceMath: 'Five gel manicures at the posted $37 each.',
        perks: [
          'Five gel manicures, prepaid at full menu price',
          'Free design accent every visit',
          'The Standing Window: member priority booking',
          'Skip the wait on walk-in days',
          'Free sixth gel manicure after visit five',
          'Birthday-month paraffin or callus add-on',
          'Price locked for the year',
          'No expiration, fully transferable',
        ],
        stackValue: 352,
        regularsPick: true,
      },
      {
        id: 'signature',
        name: 'The Signature',
        forWhom: 'For the mani-and-pedi regular who books both.',
        price: 435,
        priceMath: 'Five gel manicure and gel pedicure visits at the posted $87 each.',
        perks: [
          'Five gel manicure + gel pedicure visits, full menu price',
          'Everything in The Standing',
          'Free paraffin on every visit',
          'Free sixth combo visit after visit five',
          'Birthday upgrade to a premium spa pedicure',
          'No expiration, fully transferable',
        ],
        stackValue: 640,
      },
    ],
    objections: [
      {
        q: 'Why prepay?',
        a: "It is the same price you already pay. You lock today's rate for the year and add the design accent, weekend priority, and a free sixth visit on top.",
      },
      {
        q: 'What if I cannot use them all?',
        a: 'There is no expiration. Anything left over you can gift to a friend or family member.',
      },
      {
        q: 'Is this a discount or a gimmick?',
        a: 'The opposite. Every visit is full menu price you can verify on the wall. What you gain is the set of perks our regulars value most.',
      },
    ],
    sms: {
      line: '+19199165963',
      display: '(919) 916-5963',
      body: "Hi! I'd like to join The Deluxe Standing membership.",
    },
  },
  zen: {
    key: 'zen',
    name: 'Zen Nail Spa',
    city: 'Durham, North Carolina',
    program: 'The Zen Set',
    switchLabel: 'Zen',
    promise: 'A set of visits prepaid at the price on the wall, with member perks and a chair held for our community of regulars.',
    eyebrow: 'Membership',
    valueStack: [
      {
        label: 'Five gel manicures',
        detail: "At today's posted menu price of $40 each. The visits you already come in for, set aside.",
        value: 200,
        anchor: true,
      },
      {
        label: 'A free design accent every visit',
        detail: 'French, chrome, or a single statement nail. On the house, every time you sit down.',
        value: 60,
      },
      {
        label: 'The member window',
        detail: 'Tuesday through Thursday priority, plus early Friday and Saturday slots held before public booking.',
        value: 0,
      },
      {
        label: 'Skip the wait on walk-in days',
        detail: 'Your seat is waiting. No line.',
        value: 0,
      },
      {
        label: 'A free sixth gel manicure',
        detail: 'After your fifth visit, the next one is on us.',
        value: 40,
      },
      {
        label: 'A birthday-month add-on',
        detail: 'Paraffin or a callus treatment, our gift in your birthday month.',
        value: 10,
      },
      {
        label: 'Your price locked for the year',
        detail: "When the menu rises, your rate holds at today's price.",
        value: 0,
      },
      {
        label: 'No expiration, fully transferable',
        detail: 'Use them whenever, or pass a visit to a friend or family member.',
        value: 0,
      },
    ],
    tiers: [
      {
        id: 'set',
        name: 'The Set',
        forWhom: 'For the regular who comes in for a gel manicure.',
        price: 200,
        priceMath: 'Five gel manicures at the posted $40 each.',
        perks: [
          'Five gel manicures, prepaid at full menu price',
          'Free design accent every visit',
          'Member priority booking window',
          'Skip the wait on walk-in days',
          'Free sixth gel manicure after visit five',
          'Birthday-month paraffin or callus add-on',
          'Price locked for the year',
          'No expiration, fully transferable',
        ],
        stackValue: 380,
        regularsPick: true,
      },
      {
        id: 'signature-set',
        name: 'The Signature Set',
        forWhom: 'For the regular who books a mani and a pedi.',
        price: 475,
        priceMath: 'Five gel manicure and gel pedicure visits at the posted $95 each.',
        perks: [
          'Five gel manicure + gel pedicure visits, full menu price',
          'Everything in The Set',
          'Free paraffin on every visit',
          'Free sixth combo visit after visit five',
          'Birthday upgrade to a premium spa pedicure',
          'No expiration, fully transferable',
        ],
        stackValue: 700,
      },
    ],
    objections: [
      {
        q: 'Why prepay?',
        a: "Same price you already pay. You lock today's rate for the year and get the design accent, the booking window, and a free sixth visit on top.",
      },
      {
        q: 'What if I cannot use them all?',
        a: 'No expiration. Whatever is left you can gift to a friend or family member.',
      },
      {
        q: 'Is this a discount or a gimmick?',
        a: 'Neither. Every visit is full menu price you can check on the wall. The value is the perks our regulars love.',
      },
    ],
    sms: {
      line: '+19193167856',
      display: '(919) 316-7856',
      body: "Hi! I'd like to join The Zen Set membership.",
    },
  },
};

/** Build the sms: deep link with a URL-encoded prefilled body. */
export function smsHref(salon: Salon): string {
  return `sms:${salon.sms.line}?&body=${encodeURIComponent(salon.sms.body)}`;
}
