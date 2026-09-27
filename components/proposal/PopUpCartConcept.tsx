/**
 * Indicative sketch of a foldable retail pop-up cart.
 * Deliberately drawn (not photographed) so it reads as a concept,
 * never as an existing unit. Dimensions are indicative only.
 */
export function PopUpCartConcept({ className }: { className?: string }) {
  const CARAMEL = "#C99565";
  const CREAM = "#F2E8D5";
  const CINNAMON = "#7A3E20";
  const COCOA = "#3B1F12";
  const ACCENT = "#FF4F87";

  return (
    <svg
      viewBox="0 0 880 560"
      className={className}
      role="img"
      aria-label="Concept sketch of a foldable Nömi retail pop-up cart"
    >
      {/* ---- sign board ---- */}
      <rect x="318" y="66" width="244" height="72" rx="10" fill={CINNAMON} />
      <text
        x="440"
        y="115"
        textAnchor="middle"
        fontFamily='"Fraunces", Georgia, serif'
        fontWeight="800"
        fontSize="42"
        letterSpacing="1"
        fill={CREAM}
      >
        N&#xD6;MI
      </text>

      {/* ---- awning ---- */}
      <path d="M232 150 h416 l-34 62 H266 Z" fill={CINNAMON} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M${262 + i * 54} 150 l-14 62 h26 l14 -62 Z`}
          fill={CREAM}
          opacity="0.9"
        />
      ))}
      <path d="M232 150 h416 l-34 62 H266 Z" fill="none" stroke={COCOA} strokeOpacity="0.35" strokeWidth="2" />

      {/* ---- support posts ---- */}
      <rect x="268" y="212" width="9" height="46" fill={CINNAMON} opacity="0.8" />
      <rect x="603" y="212" width="9" height="46" fill={CINNAMON} opacity="0.8" />

      {/* ---- counter top ---- */}
      <rect x="246" y="256" width="388" height="20" rx="5" fill={CREAM} stroke={COCOA} strokeOpacity="0.25" strokeWidth="2" />

      {/* ---- fold-out wing (hinged extension) ---- */}
      <g>
        <rect x="634" y="258" width="132" height="16" rx="5" fill={CREAM} opacity="0.75" stroke={CINNAMON} strokeWidth="2" strokeDasharray="7 5" />
        <line x1="634" y1="252" x2="634" y2="282" stroke={ACCENT} strokeWidth="3" />
        <path d="M700 274 v70" stroke={CINNAMON} strokeWidth="4" strokeDasharray="6 5" />
        <text x="700" y="364" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fill={COCOA} opacity="0.75">
          fold-out
        </text>
        <text x="700" y="382" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="15" fill={COCOA} opacity="0.75">
          service wing
        </text>
      </g>

      {/* ---- rolls on the counter ---- */}
      {[330, 400, 470, 540].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="243" r="15" fill={CARAMEL} />
          <circle cx={cx} cy="243" r="10" fill="none" stroke={CINNAMON} strokeWidth="2" opacity="0.7" />
          <circle cx={cx} cy="243" r="5" fill="none" stroke={CINNAMON} strokeWidth="2" opacity="0.7" />
        </g>
      ))}

      {/* ---- cart body ---- */}
      <rect x="262" y="276" width="356" height="176" rx="8" fill={CARAMEL} />
      {/* front panel seams: folds flat for storage */}
      <line x1="380" y1="276" x2="380" y2="452" stroke={COCOA} strokeOpacity="0.22" strokeWidth="2" strokeDasharray="8 6" />
      <line x1="500" y1="276" x2="500" y2="452" stroke={COCOA} strokeOpacity="0.22" strokeWidth="2" strokeDasharray="8 6" />
      {/* chilled / ambient display window */}
      <rect x="292" y="306" width="296" height="86" rx="6" fill={CREAM} opacity="0.55" stroke={CREAM} strokeWidth="2" />
      <text x="440" y="356" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fill={CINNAMON} opacity="0.85">
        glass display
      </text>
      {/* brand band */}
      <rect x="262" y="410" width="356" height="26" fill={CINNAMON} opacity="0.85" />
      <text x="440" y="429" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="13" letterSpacing="4" fill={CREAM}>
        ROLLS &amp; BAKERY
      </text>

      {/* ---- wheels (lockable, so the unit can be moved / stored) ---- */}
      {[330, 550].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="466" r="17" fill={COCOA} opacity="0.85" />
          <circle cx={cx} cy="466" r="6" fill={CREAM} opacity="0.7" />
        </g>
      ))}

      {/* ---- ground ---- */}
      <line x1="150" y1="484" x2="760" y2="484" stroke={COCOA} strokeOpacity="0.3" strokeWidth="2" />

      {/* ---- indicative dimensions ---- */}
      <g stroke={COCOA} strokeOpacity="0.55" strokeWidth="1.5" fontFamily="Inter, system-ui, sans-serif">
        <line x1="262" y1="512" x2="618" y2="512" />
        <line x1="262" y1="504" x2="262" y2="520" />
        <line x1="618" y1="504" x2="618" y2="520" />
        <text x="440" y="536" textAnchor="middle" fontSize="15" fill={COCOA} fillOpacity="0.7" stroke="none">
          ≈ 1.8 m footprint (indicative)
        </text>

        <line x1="200" y1="150" x2="200" y2="452" />
        <line x1="192" y1="150" x2="208" y2="150" />
        <line x1="192" y1="452" x2="208" y2="452" />
        <text
          x="182"
          y="305"
          textAnchor="middle"
          fontSize="15"
          fill={COCOA}
          fillOpacity="0.7"
          stroke="none"
          transform="rotate(-90 182 305)"
        >
          ≈ 2.2 m (indicative)
        </text>
      </g>

      {/* ---- concept watermark ---- */}
      <text
        x="790"
        y="120"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="13"
        fontWeight="700"
        letterSpacing="2"
        fill={ACCENT}
        transform="rotate(90 790 120)"
      >
        CONCEPT SKETCH
      </text>
    </svg>
  );
}
