import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (p: IconProps) => ({
  width: p.size ?? 18,
  height: p.size ?? 18,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  ...p,
});

export const SwissCross = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#D9342B" stroke="none" />
    <rect x="10.5" y="6" width="3" height="12" fill="white" stroke="none" />
    <rect x="6" y="10.5" width="12" height="3" fill="white" stroke="none" />
  </svg>
);

export const Globe = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a13.5 13.5 0 010 18M12 3a13.5 13.5 0 000 18" />
  </svg>
);

export const Flame = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3s4 4 4 8a4 4 0 11-8 0c0-1.5.5-2.5 1-3 0 0 0 2 1.5 2 1 0-1.5-3 1.5-7z" />
    <path d="M9 17a3 3 0 006 0" />
  </svg>
);

export const Snowflake = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v18M3 12h18M5 5l14 14M19 5L5 19" />
    <path d="M9 4l3 2 3-2M9 20l3-2 3 2M4 9l2 3-2 3M20 9l-2 3 2 3" />
  </svg>
);

export const Search = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const Sliders = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
    <circle cx="14" cy="6" r="2" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

export const X = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

export const Check = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m4 12 5 5L20 6" />
  </svg>
);

export const Plus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const Minus = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14" />
  </svg>
);

export const Star = (p: IconProps & { filled?: boolean }) => (
  <svg
    {...base(p)}
    fill={p.filled ? '#B89855' : 'none'}
    stroke={p.filled ? '#B89855' : 'currentColor'}
  >
    <path d="M12 3l2.7 5.7 6.3.9-4.6 4.4 1.1 6.3L12 17.8 6.5 20.3l1.1-6.3L3 9.6l6.3-.9L12 3z" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
    <path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />
  </svg>
);

export const QR = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <path d="M14 14h3v3h-3zM20 14h1M14 20h3M20 17v4" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ChevronRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Bell = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6 8a6 6 0 0112 0c0 7 3 7 3 9H3c0-2 3-2 3-9z" />
    <path d="M10 21a2 2 0 004 0" />
  </svg>
);

// Allergen icons — refined minimal
export const AllergenIcon = ({
  kind,
  ...p
}: IconProps & { kind: string }) => {
  switch (kind) {
    case 'gluten':
      return (
        <svg {...base(p)}>
          <path d="M12 3v18" />
          <path d="M12 7c-2 0-3 1-3 2s1 2 3 2M12 7c2 0 3 1 3 2s-1 2-3 2" />
          <path d="M12 12c-2 0-3 1-3 2s1 2 3 2M12 12c2 0 3 1 3 2s-1 2-3 2" />
          <path d="M12 17c-2 0-3 1-3 2M12 17c2 0 3 1 3 2" />
        </svg>
      );
    case 'dairy':
      return (
        <svg {...base(p)}>
          <path d="M8 3h8v3l-1 2v9a3 3 0 01-3 3h0a3 3 0 01-3-3V8L8 6V3z" />
        </svg>
      );
    case 'nuts':
      return (
        <svg {...base(p)}>
          <path d="M12 3c4 0 6 4 6 8s-2 10-6 10-6-6-6-10 2-8 6-8z" />
          <path d="M12 7v12M9 10h6M9 14h6" />
        </svg>
      );
    case 'shellfish':
      return (
        <svg {...base(p)}>
          <path d="M4 14a8 8 0 0116 0H4z" />
          <path d="M8 14v3M12 14v4M16 14v3M6 11l1-2M18 11l-1-2M12 8V5" />
        </svg>
      );
    case 'eggs':
      return (
        <svg {...base(p)}>
          <ellipse cx="12" cy="13" rx="6" ry="8" />
        </svg>
      );
    case 'soy':
      return (
        <svg {...base(p)}>
          <path d="M7 17a6 6 0 1110-10" />
          <circle cx="9" cy="15" r="1.5" />
          <circle cx="14" cy="10" r="1.5" />
          <circle cx="13" cy="16" r="1.5" />
        </svg>
      );
    case 'sesame':
      return (
        <svg {...base(p)}>
          <ellipse cx="8" cy="9" rx="2" ry="1.2" transform="rotate(-20 8 9)" />
          <ellipse cx="14" cy="11" rx="2" ry="1.2" transform="rotate(20 14 11)" />
          <ellipse cx="10" cy="14" rx="2" ry="1.2" transform="rotate(-10 10 14)" />
          <ellipse cx="15" cy="16" rx="2" ry="1.2" transform="rotate(15 15 16)" />
        </svg>
      );
    default:
      return null;
  }
};

export const DietIcon = ({ kind, ...p }: IconProps & { kind: string }) => {
  switch (kind) {
    case 'vegetarian':
      return (
        <svg {...base(p)}>
          <path d="M5 14c2-6 8-9 14-9-1 8-6 13-12 13-2 0-3-1-3-2 0-1 0-1 1-2z" />
        </svg>
      );
    case 'vegan':
      return (
        <svg {...base(p)}>
          <path d="M12 21c-5 0-8-4-8-9 0-3 2-6 4-7 0 4 2 6 4 6s4-2 4-6c2 1 4 4 4 7 0 5-3 9-8 9z" />
        </svg>
      );
    case 'gluten-free':
      return (
        <svg {...base(p)}>
          <path d="M12 4v16" />
          <path d="M12 8c-2 0-3 1-3 2s1 2 3 2M12 8c2 0 3 1 3 2s-1 2-3 2" />
          <path d="M5 19L19 5" />
        </svg>
      );
    case 'halal-friendly':
      return (
        <svg {...base(p)}>
          <path d="M19 12a7 7 0 11-3-5.7" />
          <path d="M19 4v5h-5" />
        </svg>
      );
    case 'nut-free':
      return (
        <svg {...base(p)}>
          <path d="M12 3c4 0 6 4 6 8s-2 10-6 10-6-6-6-10 2-8 6-8z" />
          <path d="M5 19L19 5" />
        </svg>
      );
    case 'dairy-free':
      return (
        <svg {...base(p)}>
          <path d="M8 3h8v3l-1 2v9a3 3 0 01-3 3h0a3 3 0 01-3-3V8L8 6V3z" />
          <path d="M5 19L19 5" />
        </svg>
      );
    default:
      return null;
  }
};
