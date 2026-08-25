/* Bellwork motion figures — inline SVG + CSS animation per exercise */
(() => {
  const KB = "#d06a2b";
  const INK = "#f3ead8";
  const MUTED = "#8a8f7a";

  function bell(x, y, s = 1, flip = false) {
    const w = 14 * s, h = 12 * s, hw = 8 * s;
    const rot = flip ? ` transform="rotate(180 ${x} ${y})"` : "";
    return `<g class="kb"${rot}>
      <path d="M${x - hw / 2} ${y - h * 0.55} C${x - hw / 2} ${y - h * 0.95} ${x + hw / 2} ${y - h * 0.95} ${x + hw / 2} ${y - h * 0.55}"
        fill="none" stroke="${KB}" stroke-width="${1.6 * s}" />
      <ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="${KB}" />
      <ellipse cx="${x}" cy="${y - 1 * s}" rx="${w * 0.22}" ry="${h * 0.18}" fill="#f0b07a" opacity="0.35"/>
    </g>`;
  }

  function floor() {
    return `<path d="M12 88 H88" stroke="${MUTED}" stroke-width="1.2" opacity="0.45"/>`;
  }

  function bar(y = 10) {
    return `<path d="M22 ${y} H78" stroke="${MUTED}" stroke-width="2.2" stroke-linecap="round"/>`;
  }

  function head(x, y, r = 6) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${INK}" stroke-width="1.8"/>`;
  }

  /* Generic stick athlete. Joints are explicit so CSS can animate groups. */
  function athlete(p) {
    const {
      hx = 50, hy = 20,
      sx = 50, sy = 32,
      hipx = 50, hipy = 50,
      lx1 = 42, ly1 = 68, lx2 = 38, ly2 = 86,
      rx1 = 58, ry1 = 68, rx2 = 62, ry2 = 86,
      lax = 38, lay = 44, lhx = 30, lhy = 56,
      rax = 62, ray = 44, rhx = 70, rhy = 56,
      extra = "",
      bodyClass = "body"
    } = p;
    return `<g class="${bodyClass}">
      ${head(hx, hy)}
      <path class="spine" d="M${sx} ${sy} L${hipx} ${hipy}" stroke="${INK}" stroke-width="2.2" stroke-linecap="round"/>
      <path class="arm-l" d="M${sx} ${sy + 2} L${lax} ${lay} L${lhx} ${lhy}" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="arm-r" d="M${sx} ${sy + 2} L${rax} ${ray} L${rhx} ${rhy}" stroke="${INK}" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="leg-l" d="M${hipx} ${hipy} L${lx1} ${ly1} L${lx2} ${ly2}" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="leg-r" d="M${hipx} ${hipy} L${rx1} ${ry1} L${rx2} ${ry2}" stroke="${INK}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      ${extra}
    </g>`;
  }

  const stand = {
    hx: 50, hy: 18, sx: 50, sy: 26, hipx: 50, hipy: 50,
    lx1: 44, ly1: 68, lx2: 40, ly2: 86,
    rx1: 56, ry1: 68, rx2: 60, ry2: 86,
    lax: 40, lay: 40, lhx: 36, lhy: 54,
    rax: 60, ray: 40, rhx: 64, rhy: 54
  };

  function wrap(cls, inner) {
    return `<svg class="ex-svg ${cls}" viewBox="0 0 100 100" aria-hidden="true">${floor()}${inner}</svg>`;
  }

  const poses = {
    "kb-swing": () => wrap("art-swing",
      athlete({ ...stand, hy: 22, sy: 30, hipx: 56, hipy: 52, lx2: 36, rx2: 64, lax: 44, lay: 48, lhx: 40, lhy: 62, rax: 48, ray: 48, rhx: 42, rhy: 62 })
      + `<g class="prop swing-bell">${bell(40, 70, 1)}</g>`
    ),
    "kb-2h-swing": () => wrap("art-swing",
      athlete({ ...stand, hipx: 56, hipy: 52, lax: 46, lay: 50, lhx: 42, lhy: 64, rax: 50, ray: 50, rhx: 44, rhy: 64 })
      + `<g class="prop swing-bell">${bell(42, 72, 1.05)}</g>`
    ),
    "kb-1h-swing": () => wrap("art-swing",
      athlete({ ...stand, hipx: 55, hipy: 52, lax: 36, lay: 38, lhx: 28, lhy: 32, rax: 50, ray: 50, rhx: 44, rhy: 66 })
      + `<g class="prop swing-bell">${bell(43, 72, 1)}</g>`
    ),
    "kb-double-swing": () => wrap("art-swing",
      athlete({ ...stand, hipx: 56, hipy: 52, lax: 40, lay: 50, lhx: 34, lhy: 66, rax: 54, ray: 50, rhx: 48, rhy: 66 })
      + `<g class="prop swing-bell">${bell(34, 72, 0.85)}${bell(48, 72, 0.85)}</g>`
    ),
    "kb-deadlift": () => wrap("art-hinge",
      athlete({ hx: 58, hy: 28, sx: 56, sy: 36, hipx: 54, hipy: 52, lx2: 36, rx2: 66, lax: 50, lay: 48, lhx: 46, lhy: 64, rax: 52, ray: 48, rhx: 48, rhy: 64 })
      + `<g class="prop">${bell(48, 78, 1)}</g>`
    ),
    "kb-sumo-dl": () => wrap("art-hinge",
      athlete({ hx: 50, hy: 26, sx: 50, sy: 34, hipx: 50, hipy: 50, lx1: 36, ly1: 64, lx2: 26, ly2: 86, rx1: 64, ry1: 64, rx2: 74, ry2: 86, lax: 46, lay: 48, lhx: 44, lhy: 64, rax: 54, ray: 48, rhx: 56, rhy: 64 })
      + `<g class="prop">${bell(50, 76, 1)}</g>`
    ),
    "kb-single-leg-rdl": () => wrap("art-rdl",
      athlete({ hx: 60, hy: 24, sx: 56, sy: 32, hipx: 50, hipy: 48, lx1: 46, ly1: 66, lx2: 42, ly2: 86, rx1: 62, ry1: 56, rx2: 78, ry2: 48, lax: 48, lay: 44, lhx: 44, lhy: 60, rax: 44, ray: 38, rhx: 36, rhy: 48 })
      + `<g class="prop">${bell(42, 64, 0.9)}</g>`
    ),
    "kb-good-morning": () => wrap("art-hinge",
      athlete({ hx: 64, hy: 26, sx: 58, sy: 34, hipx: 50, hipy: 50, lx2: 38, rx2: 62, lax: 54, lay: 30, lhx: 62, lhy: 20, rax: 56, ray: 30, rhx: 66, rhy: 20 })
      + `<g class="prop">${bell(62, 16, 0.75)}</g>`
    ),
    "kb-goblet-squat": () => wrap("art-squat",
      athlete({ hx: 50, hy: 26, sx: 50, sy: 34, hipx: 50, hipy: 58, lx1: 40, ly1: 70, lx2: 32, ly2: 86, rx1: 60, ry1: 70, rx2: 68, ry2: 86, lax: 46, lay: 42, lhx: 46, lhy: 50, rax: 54, ray: 42, rhx: 54, rhy: 50 })
      + `<g class="prop">${bell(50, 46, 0.85)}</g>`
    ),
    "kb-front-squat": () => wrap("art-squat",
      athlete({ hx: 50, hy: 24, sx: 50, sy: 32, hipx: 50, hipy: 56, lx1: 40, ly1: 70, lx2: 34, ly2: 86, rx1: 60, ry1: 70, rx2: 66, ry2: 86, lax: 42, lay: 36, lhx: 40, lhy: 30, rax: 58, ray: 36, rhx: 56, rhy: 30 })
      + `<g class="prop">${bell(42, 28, 0.72)}</g>`
    ),
    "kb-double-front-squat": () => wrap("art-squat",
      athlete({ hx: 50, hy: 24, sx: 50, sy: 32, hipx: 50, hipy: 56, lx1: 40, ly1: 70, lx2: 34, ly2: 86, rx1: 60, ry1: 70, rx2: 66, ry2: 86, lax: 40, lay: 36, lhx: 38, lhy: 30, rax: 60, ray: 36, rhx: 62, rhy: 30 })
      + `<g class="prop">${bell(36, 28, 0.68)}${bell(64, 28, 0.68)}</g>`
    ),
    "kb-rack-squat": () => wrap("art-squat",
      athlete({ hx: 50, hy: 24, sx: 50, sy: 32, hipx: 50, hipy: 56, lx1: 40, ly1: 70, lx2: 34, ly2: 86, rx1: 60, ry1: 70, rx2: 66, ry2: 86, lax: 40, lay: 36, lhx: 38, lhy: 28, rax: 60, ray: 42, rhx: 64, rhy: 54 })
      + `<g class="prop">${bell(36, 26, 0.72)}</g>`
    ),
    "kb-lunge": () => wrap("art-lunge",
      athlete({ hx: 48, hy: 20, sx: 48, sy: 28, hipx: 48, hipy: 48, lx1: 40, ly1: 66, lx2: 30, ly2: 86, rx1: 58, ry1: 64, rx2: 70, ry2: 78, lax: 44, lay: 40, lhx: 42, lhy: 50, rax: 52, ray: 40, rhx: 54, rhy: 50 })
      + `<g class="prop">${bell(48, 48, 0.8)}</g>`
    ),
    "kb-forward-lunge": () => wrap("art-lunge",
      athlete({ hx: 52, hy: 20, sx: 52, sy: 28, hipx: 50, hipy: 48, lx1: 58, ly1: 64, lx2: 70, ly2: 86, rx1: 42, ry1: 66, rx2: 34, ry2: 80, lax: 48, lay: 40, lhx: 46, lhy: 52, rax: 56, ray: 40, rhx: 58, rhy: 52 })
      + `<g class="prop">${bell(40, 58, 0.75)}</g>`
    ),
    "kb-walking-lunge": () => wrap("art-walk art-lunge",
      athlete({ hx: 50, hy: 18, sx: 50, sy: 26, hipx: 50, hipy: 48, lx1: 42, ly1: 64, lx2: 34, ly2: 86, rx1: 62, ry1: 62, rx2: 72, ry2: 78, lax: 38, lay: 40, lhx: 32, lhy: 50, rax: 60, ray: 38, rhx: 68, rhy: 48 })
      + `<g class="prop">${bell(32, 54, 0.7)}${bell(70, 50, 0.7)}</g>`
    ),
    "kb-cossack": () => wrap("art-cossack",
      athlete({ hx: 42, hy: 28, sx: 42, sy: 36, hipx: 44, hipy: 56, lx1: 36, ly1: 70, lx2: 30, ly2: 86, rx1: 62, ry1: 62, rx2: 80, ry2: 78, lax: 40, lay: 46, lhx: 40, lhy: 56, rax: 50, ray: 46, rhx: 52, rhy: 56 })
      + `<g class="prop">${bell(42, 52, 0.75)}</g>`
    ),
    "kb-press": () => wrap("art-press",
      athlete({ ...stand, lax: 40, lay: 36, lhx: 38, lhy: 28, rax: 62, ray: 34, rhx: 64, rhy: 18 })
      + `<g class="prop press-bell">${bell(64, 12, 0.75)}</g>`
    ),
    "kb-push-press": () => wrap("art-pushpress",
      athlete({ hx: 50, hy: 22, sx: 50, sy: 30, hipx: 50, hipy: 54, lx1: 44, ly1: 68, lx2: 40, ly2: 86, rx1: 56, ry1: 68, rx2: 60, ry2: 86, lax: 40, lay: 36, lhx: 38, lhy: 28, rax: 62, ray: 30, rhx: 64, rhy: 16 })
      + `<g class="prop press-bell">${bell(64, 10, 0.75)}</g>`
    ),
    "kb-double-press": () => wrap("art-press",
      athlete({ ...stand, lax: 38, lay: 30, lhx: 36, lhy: 16, rax: 62, ray: 30, rhx: 64, rhy: 16 })
      + `<g class="prop press-bell">${bell(36, 10, 0.68)}${bell(64, 10, 0.68)}</g>`
    ),
    "kb-bottoms-up-press": () => wrap("art-press",
      athlete({ ...stand, rax: 62, ray: 30, rhx: 64, rhy: 16, lax: 40, lay: 40, lhx: 36, lhy: 52 })
      + `<g class="prop press-bell">${bell(64, 10, 0.7, true)}</g>`
    ),
    "kb-floor-press": () => wrap("art-floor",
      `<g class="body">
        ${head(22, 40)}
        <path d="M28 42 L62 44" stroke="${INK}" stroke-width="2.2"/>
        <path d="M40 44 L38 58 L70 60" stroke="${INK}" stroke-width="1.8" fill="none"/>
        <path d="M40 44 L42 58 L72 62" stroke="${INK}" stroke-width="1.8" fill="none"/>
        <path d="M58 44 L70 28" stroke="${INK}" stroke-width="1.8"/>
      </g>${bell(72, 22, 0.8)}`
    ),
    "kb-tgu": () => wrap("art-tgu",
      `<g class="body">
        ${head(30, 30)}
        <path d="M34 36 L50 50 L46 70 L38 86" stroke="${INK}" stroke-width="2" fill="none" stroke-linejoin="round"/>
        <path d="M50 50 L66 62 L74 86" stroke="${INK}" stroke-width="2" fill="none"/>
        <path d="M46 40 L58 24" stroke="${INK}" stroke-width="1.8"/>
        <path d="M40 42 L28 54" stroke="${INK}" stroke-width="1.8"/>
      </g>${bell(60, 16, 0.75)}`
    ),
    "kb-windmill": () => wrap("art-windmill",
      athlete({ hx: 62, hy: 16, sx: 58, sy: 24, hipx: 50, hipy: 50, lx1: 42, ly1: 66, lx2: 34, ly2: 86, rx1: 62, ry1: 66, rx2: 70, ry2: 86, lax: 44, lay: 48, lhx: 40, lhy: 68, rax: 62, ray: 20, rhx: 64, rhy: 10 })
      + `<g class="prop">${bell(64, 6, 0.7)}</g>`
    ),
    "kb-clean": () => wrap("art-clean",
      athlete({ ...stand, lax: 40, lay: 36, lhx: 38, lhy: 28, rax: 60, ray: 42, rhx: 64, rhy: 54 })
      + `<g class="prop clean-bell">${bell(38, 24, 0.75)}</g>`
    ),
    "kb-double-clean": () => wrap("art-clean",
      athlete({ ...stand, lax: 40, lay: 34, lhx: 38, lhy: 26, rax: 60, ray: 34, rhx: 62, rhy: 26 })
      + `<g class="prop clean-bell">${bell(36, 22, 0.68)}${bell(64, 22, 0.68)}</g>`
    ),
    "kb-snatch": () => wrap("art-snatch",
      athlete({ ...stand, rax: 62, ray: 28, rhx: 64, rhy: 12, lax: 40, lay: 38, lhx: 34, lhy: 48 })
      + `<g class="prop snatch-bell">${bell(64, 6, 0.75)}</g>`
    ),
    "kb-snatch-test": () => wrap("art-snatch",
      athlete({ ...stand, rax: 62, ray: 28, rhx: 64, rhy: 12, lax: 42, lay: 40, lhx: 38, lhy: 52 })
      + `<g class="prop snatch-bell">${bell(64, 6, 0.75)}</g>`
    ),
    "kb-high-pull": () => wrap("art-highpull",
      athlete({ hx: 54, hy: 18, sx: 52, sy: 26, hipx: 52, hipy: 50, lax: 48, lay: 36, lhx: 52, lhy: 24, rax: 50, ray: 36, rhx: 54, rhy: 24 })
      + `<g class="prop">${bell(54, 20, 0.8)}</g>`
    ),
    "kb-row": () => wrap("art-row",
      athlete({ hx: 68, hy: 24, sx: 62, sy: 32, hipx: 50, hipy: 48, lx2: 36, rx2: 58, lax: 56, lay: 40, lhx: 44, lhy: 36, rax: 54, ray: 44, rhx: 62, rhy: 52 })
      + `<g class="prop row-bell">${bell(40, 34, 0.8)}</g>`
    ),
    "kb-renegade-row": () => wrap("art-plank art-row",
      `<g class="body">
        ${head(20, 36)}
        <path d="M26 38 L72 40" stroke="${INK}" stroke-width="2.2"/>
        <path d="M32 40 L30 62" stroke="${INK}" stroke-width="1.8"/>
        <path class="arm-r" d="M60 40 L58 28" stroke="${INK}" stroke-width="1.8"/>
        <path d="M72 40 L76 62" stroke="${INK}" stroke-width="2"/>
        <path d="M70 40 L66 62" stroke="${INK}" stroke-width="2"/>
      </g>${bell(30, 68, 0.7)}${bell(56, 22, 0.7)}`
    ),
    "kb-farmer-carry": () => wrap("art-walk",
      athlete({ ...stand, lax: 36, lay: 44, lhx: 32, lhy: 62, rax: 64, ray: 44, rhx: 68, rhy: 62, lx2: 36, rx2: 66 })
      + `<g class="prop">${bell(32, 68, 0.75)}${bell(68, 68, 0.75)}</g>`
    ),
    "kb-suitcase-carry": () => wrap("art-walk",
      athlete({ ...stand, lax: 36, lay: 44, lhx: 32, lhy: 62, rax: 62, ray: 38, rhx: 66, rhy: 50 })
      + `<g class="prop">${bell(32, 68, 0.8)}</g>`
    ),
    "kb-rack-carry": () => wrap("art-walk",
      athlete({ ...stand, lax: 40, lay: 34, lhx: 38, lhy: 26, rax: 62, ray: 40, rhx: 66, rhy: 52 })
      + `<g class="prop">${bell(36, 22, 0.72)}</g>`
    ),
    "kb-oh-carry": () => wrap("art-walk",
      athlete({ ...stand, rax: 62, ray: 28, rhx: 64, rhy: 12, lax: 40, lay: 40, lhx: 36, lhy: 52 })
      + `<g class="prop">${bell(64, 6, 0.72)}</g>`
    ),
    "kb-thruster": () => wrap("art-squat art-press",
      athlete({ hx: 50, hy: 22, sx: 50, sy: 30, hipx: 50, hipy: 56, lx1: 40, ly1: 70, lx2: 34, ly2: 86, rx1: 60, ry1: 70, rx2: 66, ry2: 86, lax: 40, lay: 34, lhx: 38, lhy: 22, rax: 60, ray: 34, rhx: 62, rhy: 22 })
      + `<g class="prop press-bell">${bell(38, 16, 0.7)}${bell(62, 16, 0.7)}</g>`
    ),
    "kb-clean-press": () => wrap("art-clean art-press",
      athlete({ ...stand, lax: 40, lay: 34, lhx: 38, lhy: 16, rax: 60, ray: 38, rhx: 64, rhy: 50 })
      + `<g class="prop press-bell">${bell(38, 10, 0.72)}</g>`
    ),
    "kb-clean-squat": () => wrap("art-clean art-squat",
      athlete({ hx: 50, hy: 24, sx: 50, sy: 32, hipx: 50, hipy: 56, lx1: 40, ly1: 70, lx2: 34, ly2: 86, rx1: 60, ry1: 70, rx2: 66, ry2: 86, lax: 40, lay: 34, lhx: 38, lhy: 26, rax: 60, ray: 40, rhx: 64, rhy: 52 })
      + `<g class="prop">${bell(36, 22, 0.72)}</g>`
    ),
    "kb-halo": () => wrap("art-halo",
      athlete({ ...stand, lax: 36, lay: 28, lhx: 42, lhy: 14, rax: 64, ray: 28, rhx: 58, rhy: 14 })
      + `<g class="prop halo-bell">${bell(50, 8, 0.7)}</g>`
    ),
    "kb-around-the-world": () => wrap("art-orbit",
      athlete({ ...stand })
      + `<g class="prop orbit-bell">${bell(28, 52, 0.75)}</g>`
    ),
    "kb-figure-8": () => wrap("art-figure8",
      athlete({ hx: 50, hy: 18, sx: 50, sy: 26, hipx: 50, hipy: 48, lx1: 38, ly1: 64, lx2: 32, ly2: 86, rx1: 62, ry1: 64, rx2: 68, ry2: 86, lax: 40, lay: 44, lhx: 44, lhy: 60, rax: 60, ray: 44, rhx: 56, rhy: 60 })
      + `<g class="prop f8-bell">${bell(50, 68, 0.75)}</g>`
    ),

    "bw-pushup": () => wrap("art-pushup", plankFig()),
    "bw-knee-pushup": () => wrap("art-pushup",
      `<g class="body push-body">${head(22, 34)}
        <path d="M28 36 L70 40" stroke="${INK}" stroke-width="2.2" fill="none"/>
        <path d="M32 38 L30 56" stroke="${INK}" stroke-width="1.8" fill="none"/>
        <path d="M66 40 L74 56" stroke="${INK}" stroke-width="1.8" fill="none"/>
        <path d="M54 40 L50 62" stroke="${INK}" stroke-width="2" fill="none"/>
        <path d="M56 40 L70 62" stroke="${INK}" stroke-width="2" fill="none"/>
      </g>`
    ),
    "bw-decline-pushup": () => wrap("art-pushup",
      `<g class="body">${head(24, 40)}<path d="M30 42 L74 28" stroke="${INK}" stroke-width="2.2"/><path d="M36 40 L32 62" stroke="${INK}" stroke-width="1.8"/><path d="M70 30 L78 22" stroke="${INK}" stroke-width="2"/></g>
      <rect x="72" y="18" width="14" height="6" rx="1" fill="none" stroke="${MUTED}"/>`
    ),
    "bw-diamond-pushup": () => wrap("art-pushup",
      plankFig() + `<path d="M48 58 L50 52 L52 58" fill="none" stroke="${KB}" stroke-width="1.4"/>`
    ),
    "bw-archer-pushup": () => wrap("art-pushup",
      `<g class="body">${head(28, 34)}<path d="M34 36 L76 40" stroke="${INK}" stroke-width="2.2"/><path d="M42 38 L40 60" stroke="${INK}" stroke-width="1.8"/><path d="M60 40 L78 52" stroke="${INK}" stroke-width="1.8"/><path d="M74 40 L78 62" stroke="${INK}" stroke-width="2"/></g>`
    ),
    "bw-pike-pushup": () => wrap("art-pike",
      `<g class="body">${head(28, 48)}<path d="M34 46 L50 22 L74 50" stroke="${INK}" stroke-width="2.2" fill="none"/><path d="M38 44 L30 62" stroke="${INK}" stroke-width="1.8"/><path d="M70 48 L78 62" stroke="${INK}" stroke-width="1.8"/></g>`
    ),
    "bw-handstand-hold": () => wrap("art-hs",
      `<g class="body">${head(50, 72)}<path d="M50 64 L50 36" stroke="${INK}" stroke-width="2.2"/><path d="M50 56 L40 70" stroke="${INK}" stroke-width="1.8"/><path d="M50 56 L60 70" stroke="${INK}" stroke-width="1.8"/><path d="M50 36 L46 18" stroke="${INK}" stroke-width="1.8"/><path d="M50 36 L54 18" stroke="${INK}" stroke-width="1.8"/></g>
      <path d="M78 12 V86" stroke="${MUTED}" stroke-width="1.4" opacity="0.5"/>`
    ),
    "bw-dip": () => wrap("art-dip",
      `<rect x="18" y="48" width="64" height="6" rx="1" fill="none" stroke="${MUTED}"/>
      <g class="body">${head(50, 22)}<path d="M50 30 L50 46" stroke="${INK}" stroke-width="2"/><path d="M50 36 L28 50" stroke="${INK}" stroke-width="1.8"/><path d="M50 36 L72 50" stroke="${INK}" stroke-width="1.8"/><path d="M50 46 L42 70 L40 86" stroke="${INK}" stroke-width="2" fill="none"/><path d="M50 46 L58 70 L60 86" stroke="${INK}" stroke-width="2" fill="none"/></g>`
    ),
    "bw-pullup": () => wrap("art-pull",
      bar(14) + `<g class="body pull-body">${head(50, 36)}<path d="M50 44 L50 60" stroke="${INK}" stroke-width="2"/><path d="M50 46 L28 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 46 L72 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 60 L42 78" stroke="${INK}" stroke-width="2"/><path d="M50 60 L58 78" stroke="${INK}" stroke-width="2"/></g>`
    ),
    "bw-chinup": () => wrap("art-pull",
      bar(14) + `<g class="body pull-body">${head(50, 34)}<path d="M50 42 L50 58" stroke="${INK}" stroke-width="2"/><path d="M50 44 L32 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 44 L68 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 58 L44 76" stroke="${INK}" stroke-width="2"/><path d="M50 58 L56 76" stroke="${INK}" stroke-width="2"/></g>`
    ),
    "bw-inverted-row": () => wrap("art-invrow",
      `<path d="M20 28 H80" stroke="${MUTED}" stroke-width="2"/>
      <g class="body">${head(22, 48)}<path d="M28 50 L74 50" stroke="${INK}" stroke-width="2.2"/><path d="M34 50 L32 30" stroke="${INK}" stroke-width="1.8"/><path d="M70 50 L78 70" stroke="${INK}" stroke-width="2"/></g>`
    ),
    "bw-scap-hang": () => wrap("art-hang",
      bar(14) + `<g class="body">${head(50, 48)}<path d="M50 56 L50 72" stroke="${INK}" stroke-width="2"/><path d="M50 54 L28 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 54 L72 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 72 L44 86" stroke="${INK}" stroke-width="2"/><path d="M50 72 L56 86" stroke="${INK}" stroke-width="2"/></g>`
    ),
    "bw-squat": () => wrap("art-squat",
      athlete({ hx: 50, hy: 26, sx: 50, sy: 34, hipx: 50, hipy: 58, lx1: 40, ly1: 70, lx2: 32, ly2: 86, rx1: 60, ry1: 70, rx2: 68, ry2: 86, lax: 38, lay: 44, lhx: 32, lhy: 56, rax: 62, ray: 44, rhx: 68, rhy: 56 })
    ),
    "bw-pulse-squat": () => wrap("art-pulse",
      athlete({ hx: 50, hy: 28, sx: 50, sy: 36, hipx: 50, hipy: 60, lx1: 40, ly1: 72, lx2: 32, ly2: 86, rx1: 60, ry1: 72, rx2: 68, ry2: 86, lax: 38, lay: 46, lhx: 32, lhy: 58, rax: 62, ray: 46, rhx: 68, rhy: 58 })
    ),
    "bw-split-squat": () => wrap("art-lunge",
      athlete({ hx: 48, hy: 20, sx: 48, sy: 28, hipx: 48, hipy: 48, lx1: 40, ly1: 66, lx2: 30, ly2: 86, rx1: 60, ry1: 64, rx2: 72, ry2: 76, lax: 40, lay: 40, lhx: 34, lhy: 52, rax: 56, ray: 40, rhx: 62, rhy: 52 })
    ),
    "bw-reverse-lunge": () => wrap("art-lunge",
      athlete({ hx: 48, hy: 20, sx: 48, sy: 28, hipx: 48, hipy: 48, lx1: 40, ly1: 66, lx2: 30, ly2: 86, rx1: 58, ry1: 64, rx2: 70, ry2: 78, lax: 42, lay: 40, lhx: 36, lhy: 50, rax: 54, ray: 40, rhx: 60, rhy: 50 })
    ),
    "bw-walking-lunge": () => wrap("art-walk art-lunge",
      athlete({ hx: 50, hy: 18, sx: 50, sy: 26, hipx: 50, hipy: 48, lx1: 42, ly1: 64, lx2: 34, ly2: 86, rx1: 62, ry1: 62, rx2: 72, ry2: 78, lax: 38, lay: 38, lhx: 32, lhy: 48, rax: 62, ray: 38, rhx: 70, rhy: 48 })
    ),
    "bw-stepup": () => wrap("art-step",
      `<rect x="58" y="64" width="24" height="22" fill="none" stroke="${MUTED}"/>
      ${athlete({ hx: 46, hy: 16, sx: 46, sy: 24, hipx: 46, hipy: 46, lx1: 42, ly1: 60, lx2: 40, ly2: 66, rx1: 54, ry1: 62, rx2: 58, ry2: 86, lax: 38, lay: 36, lhx: 32, lhy: 46, rax: 56, ray: 34, rhx: 64, rhy: 42 })}`
    ),
    "bw-pistol": () => wrap("art-pistol",
      athlete({ hx: 46, hy: 22, sx: 46, sy: 30, hipx: 46, hipy: 54, lx1: 40, ly1: 70, lx2: 34, ly2: 86, rx1: 62, ry1: 50, rx2: 78, ry2: 46, lax: 40, lay: 40, lhx: 32, lhy: 48, rax: 56, ray: 38, rhx: 68, rhy: 42 })
    ),
    "bw-cossack": () => wrap("art-cossack",
      athlete({ hx: 40, hy: 28, sx: 40, sy: 36, hipx: 42, hipy: 56, lx1: 34, ly1: 70, lx2: 28, ly2: 86, rx1: 60, ry1: 60, rx2: 80, ry2: 76, lax: 36, lay: 46, lhx: 32, lhy: 56, rax: 50, ray: 44, rhx: 56, rhy: 52 })
    ),
    "bw-glute-bridge": () => wrap("art-bridge",
      `<g class="body">${head(20, 58)}<path class="spine" d="M26 56 L74 48" stroke="${INK}" stroke-width="2.2"/><path d="M70 50 L78 70" stroke="${INK}" stroke-width="2"/><path d="M66 50 L62 70" stroke="${INK}" stroke-width="2"/><path d="M32 56 L24 70" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-single-bridge": () => wrap("art-bridge",
      `<g class="body">${head(20, 58)}<path d="M26 56 L72 46" stroke="${INK}" stroke-width="2.2"/><path d="M68 48 L76 70" stroke="${INK}" stroke-width="2"/><path d="M60 48 L78 36" stroke="${INK}" stroke-width="1.8"/><path d="M32 56 L24 70" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-hip-thrust": () => wrap("art-bridge",
      `<rect x="14" y="50" width="22" height="8" fill="none" stroke="${MUTED}"/>
      <g class="body">${head(18, 42)}<path d="M28 48 L74 46" stroke="${INK}" stroke-width="2.2"/><path d="M70 48 L78 70" stroke="${INK}" stroke-width="2"/><path d="M64 48 L60 70" stroke="${INK}" stroke-width="2"/></g>`
    ),
    "bw-plank": () => wrap("art-plank", plankFig(false)),
    "bw-side-plank": () => wrap("art-sideplank",
      `<g class="body">${head(22, 42)}<path d="M28 44 L78 46" stroke="${INK}" stroke-width="2.2"/><path d="M32 44 L26 62" stroke="${INK}" stroke-width="1.8"/><path d="M76 46 L80 62" stroke="${INK}" stroke-width="2"/><path d="M50 45 L50 30" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-hollow": () => wrap("art-hollow",
      `<g class="body">${head(22, 50)}<path d="M28 52 C46 44 60 44 80 52" stroke="${INK}" stroke-width="2.2" fill="none"/><path d="M32 50 L16 42" stroke="${INK}" stroke-width="1.6"/><path d="M76 52 L90 44" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-dead-bug": () => wrap("art-bug",
      `<g class="body">${head(28, 36)}<path d="M34 40 L70 42" stroke="${INK}" stroke-width="2"/><path d="M42 42 L30 22" stroke="${INK}" stroke-width="1.6"/><path d="M42 42 L44 62" stroke="${INK}" stroke-width="1.6"/><path d="M62 42 L78 24" stroke="${INK}" stroke-width="1.6"/><path d="M62 42 L70 64" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-bird-dog": () => wrap("art-birddog",
      `<g class="body">${head(22, 40)}<path d="M28 42 L70 44" stroke="${INK}" stroke-width="2.2"/><path d="M34 42 L18 32" stroke="${INK}" stroke-width="1.6"/><path d="M36 44 L34 64" stroke="${INK}" stroke-width="1.8"/><path d="M66 44 L68 64" stroke="${INK}" stroke-width="1.8"/><path d="M70 44 L86 36" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-hanging-knee": () => wrap("art-hang-knee",
      bar(14) + `<g class="body">${head(50, 36)}<path d="M50 44 L50 58" stroke="${INK}" stroke-width="2"/><path d="M50 46 L28 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 46 L72 16" stroke="${INK}" stroke-width="1.8"/><path d="M50 58 L40 62 L38 74" stroke="${INK}" stroke-width="2" fill="none"/><path d="M50 58 L60 62 L62 74" stroke="${INK}" stroke-width="2" fill="none"/></g>`
    ),
    "bw-situp": () => wrap("art-situp",
      `<g class="body sit-body">${head(36, 30)}<path d="M40 36 L62 58" stroke="${INK}" stroke-width="2.2"/><path d="M62 58 L86 58" stroke="${INK}" stroke-width="2"/><path d="M38 38 L28 24" stroke="${INK}" stroke-width="1.6"/><path d="M42 38 L32 48" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-leg-raise": () => wrap("art-legraise",
      `<g class="body">${head(20, 58)}<path d="M26 56 L50 56" stroke="${INK}" stroke-width="2.2"/><path class="legs-up" d="M50 56 L78 34" stroke="${INK}" stroke-width="2"/><path d="M22 56 L14 48" stroke="${INK}" stroke-width="1.5"/></g>`
    ),
    "bw-burpee": () => wrap("art-burpee",
      athlete({ ...stand, lax: 36, lay: 36, lhx: 30, lhy: 22, rax: 64, ray: 36, rhx: 70, rhy: 22 })
    ),
    "bw-mountain": () => wrap("art-mountain",
      `<g class="body">${head(22, 34)}<path d="M28 36 L74 40" stroke="${INK}" stroke-width="2.2"/><path d="M34 38 L30 62" stroke="${INK}" stroke-width="1.8"/><path class="knee" d="M70 40 L50 62" stroke="${INK}" stroke-width="2"/><path d="M72 40 L80 62" stroke="${INK}" stroke-width="2"/></g>`
    ),
    "bw-jump-squat": () => wrap("art-jump",
      athlete({ hx: 50, hy: 14, sx: 50, sy: 22, hipx: 50, hipy: 44, lx1: 42, ly1: 60, lx2: 36, ly2: 74, rx1: 58, ry1: 60, rx2: 64, ry2: 74, lax: 36, lay: 32, lhx: 28, lhy: 24, rax: 64, ray: 32, rhx: 72, rhy: 24 })
    ),
    "bw-skater": () => wrap("art-skater",
      athlete({ hx: 58, hy: 18, sx: 56, sy: 26, hipx: 52, hipy: 46, lx1: 44, ly1: 62, lx2: 30, ly2: 78, rx1: 62, ry1: 60, rx2: 74, ry2: 50, lax: 44, lay: 34, lhx: 32, lhy: 28, rax: 64, ray: 36, rhx: 76, rhy: 42 })
    ),
    "bw-high-knees": () => wrap("art-knees",
      athlete({ hx: 50, hy: 16, sx: 50, sy: 24, hipx: 50, hipy: 46, lx1: 44, ly1: 58, lx2: 42, ly2: 86, rx1: 58, ry1: 52, rx2: 62, ry2: 40, lax: 38, lay: 34, lhx: 32, lhy: 24, rax: 62, ray: 36, rhx: 70, rhy: 46 })
    ),
    "bw-jumping-jack": () => wrap("art-jack",
      athlete({ hx: 50, hy: 16, sx: 50, sy: 24, hipx: 50, hipy: 46, lx1: 38, ly1: 64, lx2: 26, ly2: 82, rx1: 62, ry1: 64, rx2: 74, ry2: 82, lax: 36, lay: 32, lhx: 24, lhy: 18, rax: 64, ray: 32, rhx: 76, rhy: 18 })
    ),
    "bw-bear-crawl": () => wrap("art-crawl",
      `<g class="body">${head(22, 40)}<path d="M28 42 L70 44" stroke="${INK}" stroke-width="2.2"/><path d="M34 42 L28 62" stroke="${INK}" stroke-width="1.8"/><path d="M46 44 L50 62" stroke="${INK}" stroke-width="1.8"/><path d="M62 44 L58 62" stroke="${INK}" stroke-width="1.8"/><path d="M70 44 L76 62" stroke="${INK}" stroke-width="1.8"/></g>`
    ),
    "bw-crab-walk": () => wrap("art-crab",
      `<g class="body">${head(78, 36)}<path d="M72 40 L28 44" stroke="${INK}" stroke-width="2.2"/><path d="M68 42 L74 64" stroke="${INK}" stroke-width="1.8"/><path d="M34 44 L26 64" stroke="${INK}" stroke-width="1.8"/><path d="M60 42 L62 64" stroke="${INK}" stroke-width="1.8"/><path d="M40 44 L42 64" stroke="${INK}" stroke-width="1.8"/></g>`
    ),
    "bw-inchworm": () => wrap("art-inch",
      `<g class="body">${head(24, 36)}<path d="M30 38 C44 36 50 50 74 62" stroke="${INK}" stroke-width="2.2" fill="none"/><path d="M34 38 L28 60" stroke="${INK}" stroke-width="1.8"/><path d="M70 60 L78 62" stroke="${INK}" stroke-width="1.8"/></g>`
    ),
    "bw-world-greatest": () => wrap("art-wgs",
      athlete({ hx: 40, hy: 22, sx: 42, sy: 30, hipx: 44, hipy: 50, lx1: 36, ly1: 66, lx2: 28, ly2: 86, rx1: 60, ry1: 64, rx2: 76, ry2: 78, lax: 34, lay: 44, lhx: 28, lhy: 62, rax: 56, ray: 28, rhx: 66, rhy: 18 })
    ),
    "bw-hip-opener": () => wrap("art-hips",
      `<g class="body">${head(50, 22)}<path d="M50 30 L50 48" stroke="${INK}" stroke-width="2"/><path d="M50 48 L32 56 L24 70" stroke="${INK}" stroke-width="2" fill="none"/><path d="M50 48 L68 56 L76 70" stroke="${INK}" stroke-width="2" fill="none"/><path d="M40 36 L32 44" stroke="${INK}" stroke-width="1.6"/><path d="M60 36 L68 44" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-cat-cow": () => wrap("art-catcow",
      `<g class="body catcow">${head(22, 42)}<path class="spine" d="M28 44 C46 36 60 36 76 46" stroke="${INK}" stroke-width="2.2" fill="none"/><path d="M32 44 L26 62" stroke="${INK}" stroke-width="1.8"/><path d="M72 46 L78 62" stroke="${INK}" stroke-width="1.8"/></g>`
    ),
    "bw-thoracic-rot": () => wrap("art-book",
      `<g class="body">${head(50, 28)}<path d="M40 50 L70 52" stroke="${INK}" stroke-width="2"/><path d="M44 50 L36 66" stroke="${INK}" stroke-width="1.8"/><path d="M48 50 L46 36" stroke="${INK}" stroke-width="1.6"/><path class="open-arm" d="M52 50 L62 28" stroke="${INK}" stroke-width="1.6"/></g>`
    ),
    "bw-down-dog": () => wrap("art-dog",
      `<g class="body">${head(26, 50)}<path d="M32 48 L50 24 L76 58" stroke="${INK}" stroke-width="2.2" fill="none"/><path d="M36 46 L28 64" stroke="${INK}" stroke-width="1.8"/><path d="M72 56 L80 64" stroke="${INK}" stroke-width="1.8"/></g>`
    ),
    "bw-couch-stretch": () => wrap("art-couch",
      `<rect x="62" y="18" width="8" height="68" fill="none" stroke="${MUTED}"/>
      ${athlete({ hx: 40, hy: 22, sx: 40, sy: 30, hipx: 42, hipy: 50, lx1: 36, ly1: 68, lx2: 30, ly2: 86, rx1: 56, ry1: 58, rx2: 64, ry2: 36, lax: 36, lay: 40, lhx: 30, lhy: 50, rax: 50, ray: 38, rhx: 56, rhy: 46 })}`
    ),
    "bw-child": () => wrap("art-child",
      `<g class="body">${head(28, 48)}<path d="M34 50 C48 62 60 66 78 64" stroke="${INK}" stroke-width="2.2" fill="none"/><path d="M70 64 L74 78" stroke="${INK}" stroke-width="1.8"/><path d="M62 66 L58 78" stroke="${INK}" stroke-width="1.8"/><path d="M36 52 L20 48" stroke="${INK}" stroke-width="1.6"/></g>`
    )
  };

  function plankFig() {
    return `<g class="body push-body">${head(20, 36)}<path d="M26 38 L74 40" stroke="${INK}" stroke-width="2.2"/><path d="M32 38 L28 62" stroke="${INK}" stroke-width="1.8"/><path d="M44 40 L42 62" stroke="${INK}" stroke-width="1.6"/><path d="M72 40 L78 62" stroke="${INK}" stroke-width="2"/><path d="M68 40 L64 62" stroke="${INK}" stroke-width="2"/></g>`;
  }

  function fallback() {
    return wrap("art-idle", athlete(stand));
  }

  window.BellworkArt = {
    svg(id) {
      const fn = poses[id];
      return fn ? fn() : fallback();
    }
  };
})();
