/* ============================================================
   Rosary App — Prayer session engine
   ============================================================ */

const PRAYERS = {
    apostlesCreed: {
        title: "Apostles' Creed",
        text: `I believe in God, the Father Almighty, Creator of Heaven and earth;
and in Jesus Christ, His only Son Our Lord,
Who was conceived by the Holy Spirit, born of the Virgin Mary,
suffered under Pontius Pilate, was crucified, died, and was buried.
He descended into Hell; the third day He rose again from the dead;
He ascended into Heaven, and sitteth at the right hand of God, the Father Almighty;
from thence He shall come to judge the living and the dead.
I believe in the Holy Spirit, the holy Catholic Church,
the communion of saints, the forgiveness of sins,
the resurrection of the body and life everlasting. Amen.`
    },

    ourFather: {
        title: "Our Father",
        text: `Our Father, Who art in heaven,
hallowed be Thy name;
Thy kingdom come,
Thy will be done on earth as it is in Heaven.
Give us this day our daily bread;
and forgive us our trespasses,
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil. Amen.`
    },

    hailMary: {
        title: "Hail Mary",
        text: `Hail Mary, full of grace,
the Lord is with thee.
Blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death. Amen.`
    },

    gloryBe: {
        title: "Glory Be",
        text: `Glory be to the Father, and to the Son,
and to the Holy Spirit;
as it was in the beginning, is now,
and ever shall be,
world without end. Amen.`
    },

    fatimaPrayer: {
        title: "Fatima Prayer",
        text: `O my Jesus, forgive us our sins,
save us from the fires of Hell,
lead all souls to Heaven,
especially those who are in most need of Thy mercy. Amen.`
    },

    hailHolyQueen: {
        title: "Hail, Holy Queen",
        text: `Hail, Holy Queen, Mother of Mercy,
our life, our sweetness, and our hope!
To thee do we cry, poor banished children of Eve;
to thee do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious Advocate,
thine eyes of mercy toward us;
and after this our exile,
show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary.
Pray for us, O Holy Mother of God,
that we may be made worthy of the promises of Christ. Amen.`
    },

    lordOpenMyLips: {
        title: "Lord, Open My Lips",
        text: `Lord, open my lips,
and my tongue shall announce thy praise.`
    },

    inclineToMyAid: {
        title: "O God, Come to My Aid",
        text: `Incline to my aid, O God;
O Lord, make haste to help me.`
    },

    closingPrayer: {
        title: "Closing Prayer",
        text: `O God, whose only begotten Son,
by His life, death, and resurrection,
has purchased for us the rewards of eternal life,
grant, we beseech Thee,
that meditating upon these mysteries
of the Most Holy Rosary of the Blessed Virgin Mary,
we may imitate what they contain
and obtain what they promise,
through the same Christ Our Lord. Amen.`
    }
};

// ── Divine Mercy Chaplet prayers ────────────────────────────

const CHAPLET_PRAYERS = {
    openingPrayer: {
        title: "Opening Prayer",
        text: `You expired, Jesus, but the source of life gushed forth for souls,
and the ocean of mercy opened up for the whole world.
O Fount of Life, unfathomable Divine Mercy,
envelop the whole world and empty Yourself out upon us.`
    },
    oBloodAndWater: {
        title: "O Blood and Water",
        text: `O Blood and Water,
which gushed forth from the Heart of Jesus
as a font of Mercy for us,
I trust in You.`,
        repeat: 3
    },
    eternalFather: {
        title: "Eternal Father",
        text: `Eternal Father,
I offer You the Body and Blood,
Soul and Divinity
of Your Dearly Beloved Son,
Our Lord, Jesus Christ,
in atonement for our sins
and those of the whole world.`
    },
    forTheSake: {
        title: "For the sake of His sorrowful Passion",
        text: `For the sake of His sorrowful Passion,
have mercy on us
and on the whole world.`
    },
    holyGod: {
        title: "Holy God",
        text: `Holy God,
Holy Mighty One,
Holy Immortal One,
have mercy on us
and on the whole world.`,
        repeat: 3
    },
    closingPrayer: {
        title: "Closing Prayer",
        text: `Eternal God, in whom mercy is endless
and the treasury of compassion inexhaustible,
look kindly upon us and increase Your mercy in us,
that in difficult moments we might not despair
nor become despondent,
but with great confidence
submit ourselves to Your holy will,
which is Love and Mercy itself. Amen.`
    }
};

// ── Sacred Heart Chaplet prayers ─────────────────────────────

const SACRED_HEART_PRAYERS = {
    ourFather: {
        title: "Jesus, meek and humble of heart",
        text: `Jesus, meek and humble of heart,
make my heart like yours.`
    },
    hailMary: {
        title: "Sacred Heart of Jesus",
        text: `Sacred Heart of Jesus,
I trust in You.`
    },
    gloryBe: {
        title: "Most gentle and humble Heart of Jesus",
        text: `Most gentle and humble Heart of Jesus,
give me the grace to be like You,
meek and humble of heart.`
    },
    closing: {
        title: "Closing Prayer",
        text: `May the Sacred Heart of Jesus
in the most Blessed Sacrament of the Altar,
be praised, adored and loved
with grateful affection
in all the Tabernacles of the world,
even to the end of time. Amen.`
    }
};

function buildSacredHeartSteps(data) {
    const steps = [];

    // Opening
    steps.push({ type: 'prayer', prayer: 'ourFather',     section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'hailMary',      section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'apostlesCreed', section: 'Opening' });

    // 5 decades using Sorrowful Mystery titles
    for (let d = 0; d < 5; d++) {
        const dec = data.decades[d];
        steps.push({ type: 'sh-announce', decade: d + 1, mystery: dec, section: `Decade ${d + 1}` });
        steps.push({ type: 'sh-our-father',  section: `Decade ${d + 1}`, decade: d + 1 });
        steps.push({ type: 'sh-decade',      section: `Decade ${d + 1}`, decade: d + 1 });
        steps.push({ type: 'sh-glory-be',    section: `Decade ${d + 1}`, decade: d + 1 });
    }

    // Closing
    steps.push({ type: 'sh-closing', section: 'Closing' });
    steps.push({ type: 'finished' });

    return steps;
}

function buildChapletSteps() {
    const steps = [];
    steps.push({ type: 'chaplet-prayer', prayer: 'openingPrayer', section: 'Opening' });
    steps.push({ type: 'chaplet-repeat', prayer: 'oBloodAndWater', section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'ourFather', section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'hailMary', section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'apostlesCreed', section: 'Opening' });

    for (let d = 1; d <= 5; d++) {
        steps.push({ type: 'chaplet-prayer', prayer: 'eternalFather', section: `Decade ${d}`, decade: d });
        steps.push({ type: 'chaplet-decade', section: `Decade ${d}`, decade: d });
    }

    steps.push({ type: 'chaplet-repeat', prayer: 'holyGod', section: 'Closing' });
    steps.push({ type: 'chaplet-prayer', prayer: 'closingPrayer', section: 'Closing' });
    steps.push({ type: 'finished' });

    return steps;
}

// ── Build the step sequence ──────────────────────────────────

function buildSteps(mysteryData) {
    const steps = [];

    // Opening
    steps.push({ type: 'prayer', prayer: 'lordOpenMyLips', section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'inclineToMyAid', section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'gloryBe', section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'apostlesCreed', section: 'Opening' });
    steps.push({ type: 'prayer', prayer: 'ourFather', section: 'Opening' });
    steps.push({ type: 'hailMary-group', count: 3, section: 'Opening', label: '3 Hail Marys for Faith, Hope & Charity' });
    steps.push({ type: 'prayer', prayer: 'gloryBe', section: 'Opening' });

    // 5 Decades
    for (let d = 0; d < 5; d++) {
        const dec = mysteryData.decades[d];
        steps.push({ type: 'mystery-announce', decade: d + 1, mystery: dec, section: `Decade ${d + 1}` });
        steps.push({ type: 'prayer', prayer: 'ourFather', section: `Decade ${d + 1}` });
        steps.push({ type: 'hailMary-decade', decade: d + 1, section: `Decade ${d + 1}` });
        steps.push({ type: 'prayer', prayer: 'gloryBe', section: `Decade ${d + 1}` });
        steps.push({ type: 'prayer', prayer: 'fatimaPrayer', section: `Decade ${d + 1}` });
    }

    // Closing
    steps.push({ type: 'prayer', prayer: 'hailHolyQueen', section: 'Closing' });
    steps.push({ type: 'prayer', prayer: 'closingPrayer', section: 'Closing' });
    steps.push({ type: 'finished' });

    return steps;
}

// ── State ────────────────────────────────────────────────────

let steps = [];
let currentStep = 0;
let hailMaryCount = 0;   // for decade hail marys
let mysteryData = null;
let currentSlide = null;

// ── DOM helpers ──────────────────────────────────────────────

function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
}

function formatPrayer(text) {
    return text.trim().replace(/\n/g, '<br>');
}

// ── Render the full screen ───────────────────────────────────

function renderScreen() {
    const step = steps[currentStep];
    if (!step) return;

    if (step.type === 'finished') {
        renderFinished();
        return;
    }

    // Build the pray-screen if needed
    let screen = document.getElementById('pray-screen');
    if (!screen) {
        screen = buildPrayScreen();
        document.getElementById('app').appendChild(screen);
    }

    updateProgress();
    updateBeadTrack();
    renderSlide(step);
}

function buildPrayScreen() {
    const screen = el('div', 'pray-screen');
    screen.id = 'pray-screen';

    // Progress bar
    const pb = el('div', 'progress-bar-wrap');
    pb.innerHTML = '<div class="progress-bar-fill" id="progressFill"></div>';
    screen.appendChild(pb);

    // Header
    const hdr = el('div', 'pray-header');
    const back = document.createElement('a');
    back.href = '/';
    back.className = 'btn-back';
    back.textContent = '←';
    hdr.appendChild(back);

    const info = el('div', 'pray-header-info');
    info.innerHTML = `<div class="mystery-name" id="hdrMystery">${mysteryData.icon} ${mysteryData.name}</div>
                      <div class="step-label" id="hdrStep"></div>`;
    hdr.appendChild(info);

    const badge = el('div', 'counter-badge');
    badge.id = 'counterBadge';
    hdr.appendChild(badge);
    screen.appendChild(hdr);

    // Decade dots
    const dots = el('div', 'decade-dots', '');
    dots.id = 'decadeDots';
    dots.style.cssText = 'justify-content:center;padding:8px 0 4px;display:flex;gap:8px;';
    for (let i = 0; i < 5; i++) {
        const d = el('div', 'decade-dot');
        d.dataset.decade = i + 1;
        dots.appendChild(d);
    }
    screen.appendChild(dots);

    // Bead track
    const bt = el('div', 'bead-track');
    bt.id = 'beadTrack';
    screen.appendChild(bt);

    // Prayer area
    const area = el('div', 'prayer-area');
    area.id = 'prayerArea';
    screen.appendChild(area);

    // Footer
    const footer = el('div', 'pray-footer');
    footer.id = 'prayFooter';
    const prevBtn = el('button', 'btn-hail-minus');
    prevBtn.id = 'btnPrev';
    prevBtn.textContent = '← Previous';
    prevBtn.addEventListener('click', goBack);
    footer.appendChild(prevBtn);
    const btn = el('button', 'btn-next');
    btn.id = 'btnNext';
    btn.textContent = 'Continue';
    btn.addEventListener('click', advance);
    footer.appendChild(btn);
    footer.appendChild(el('div', 'swipe-hint', 'Tap to continue'));
    screen.appendChild(footer);

    // Swipe support
    setupSwipe(screen);

    return screen;
}

function updateProgress() {
    const total = steps.length - 1; // exclude 'finished'
    const pct = Math.round((currentStep / total) * 100);
    const fill = document.getElementById('progressFill');
    if (fill) fill.style.width = pct + '%';

    const badge = document.getElementById('counterBadge');
    if (badge) badge.textContent = currentStep + ' / ' + total;

    const prevBtn = document.getElementById('btnPrev');
    if (prevBtn) prevBtn.disabled = (currentStep === 0 && hailMaryCount === 0);
}

function updateBeadTrack() {
    const track = document.getElementById('beadTrack');
    if (!track) return;
    track.innerHTML = '';

    // We show opening + 5 decades visually
    // Opening: 1 Our Father bead + 3 hail mary + 1 glory = compact
    // Each decade: 1 OF + 10 HM + 1 GB
    // We'll build a bead chain that matches progress

    const beadStates = getBeadStates();

    for (let i = 0; i < beadStates.length; i++) {
        const state = beadStates[i];
        if (state.sep) {
            track.appendChild(el('div', 'bead-sep'));
        } else {
            const b = el('div', state.large ? 'bead our-father' : 'bead');
            if (state.done) b.classList.add('done');
            if (state.current) b.classList.add('current');
            track.appendChild(b);
        }
    }

    // Update decade dots
    const step = steps[currentStep];
    const currentDecade = getCurrentDecade();
    document.querySelectorAll('.decade-dot').forEach(d => {
        const n = parseInt(d.dataset.decade);
        d.className = 'decade-dot';
        if (n < currentDecade) d.classList.add('done');
        else if (n === currentDecade) d.classList.add('current');
    });
}

function getCurrentDecade() {
    for (let i = currentStep; i >= 0; i--) {
        if (steps[i].decade) return steps[i].decade;
    }
    return 0;
}

function getBeadStates() {
    // Build compact bead representation
    // We count how many "bead-slots" have been completed
    const beads = [];

    // Opening: 1 cross (large) + 3 HM
    beads.push({ large: true, id: 'open-cross' });
    for (let i = 0; i < 3; i++) beads.push({ id: `open-hm-${i}` });
    beads.push({ sep: true });

    // 5 decades
    for (let d = 0; d < 5; d++) {
        beads.push({ large: true, id: `d${d}-of` });
        for (let h = 0; h < 10; h++) beads.push({ id: `d${d}-hm-${h}` });
        if (d < 4) beads.push({ sep: true });
    }

    // Determine current bead slot from step + hailMaryCount
    let beadIndex = 0;
    const step = steps[currentStep];

    // Map step index → bead positions
    beadIndex = stepToBeadIndex(currentStep, hailMaryCount);

    for (let i = 0; i < beads.length; i++) {
        if (beads[i].sep) continue;
        if (i < beadIndex) beads[i].done = true;
        else if (i === beadIndex) beads[i].current = true;
    }

    return beads;
}

function stepToBeadIndex(stepIdx, hailCount) {
    if (mysteryData.type === 'sacred-heart') return shBeadIndex(stepIdx, hailCount);
    if (mysteryData.type === 'chaplet')      return chapletBeadIndex(stepIdx, hailCount);
    return rosaryBeadIndex(stepIdx, hailCount);
}

function rosaryBeadIndex(stepIdx, hailCount) {
    if (stepIdx <= 4) return 0;  // lordOpenMyLips, inclineToMyAid, gloryBe, apostlesCreed, ourFather
    if (stepIdx === 5) return 1 + hailCount;
    if (stepIdx === 6) return 3;

    const decadeIdx   = Math.floor((stepIdx - 7) / 5);
    const posInDecade = (stepIdx - 7) % 5;
    const beadOffset  = 5 + decadeIdx * 12;

    if (posInDecade === 0) return beadOffset;
    if (posInDecade === 1) return beadOffset;
    if (posInDecade === 2) return beadOffset + 1 + hailCount;
    if (posInDecade === 3) return beadOffset + 10;
    if (posInDecade === 4) return beadOffset + 10;
    return 0;
}

function shBeadIndex(stepIdx, hailCount) {
    // Opening: OF(0), HM(1), Creed(2) — 4 steps per decade: announce, OF, decade×10, GB
    if (stepIdx === 0) return 0;
    if (stepIdx === 1) return 1;
    if (stepIdx === 2) return 3;

    const decadeIdx   = Math.floor((stepIdx - 3) / 4);
    const posInDecade = (stepIdx - 3) % 4;
    const beadOffset  = 5 + decadeIdx * 12;

    if (posInDecade === 0) return beadOffset;
    if (posInDecade === 1) return beadOffset;
    if (posInDecade === 2) return beadOffset + 1 + hailCount;
    if (posInDecade === 3) return beadOffset + 10;
    return beadOffset;
}

function chapletBeadIndex(stepIdx, hailCount) {
    // Opening: prayer(0), O Blood×3(1), OF(2), HM(3), Creed(4) — 2 steps per decade
    if (stepIdx === 0) return 0;
    if (stepIdx === 1) return 1 + hailCount;
    if (stepIdx <= 4)  return 3;

    const decadeIdx   = Math.floor((stepIdx - 5) / 2);
    const posInDecade = (stepIdx - 5) % 2;
    const beadOffset  = 5 + decadeIdx * 12;

    if (posInDecade === 0) return beadOffset;
    if (posInDecade === 1) return beadOffset + 1 + hailCount;
    return beadOffset;
}

function renderSlide(step) {
    const area = document.getElementById('prayerArea');
    const hdr = document.getElementById('hdrStep');
    const btn = document.getElementById('btnNext');

    // Build new slide content
    const slide = el('div', 'prayer-slide');

    if (step.type === 'prayer') {
        const p = PRAYERS[step.prayer];
        hdr.textContent = step.section;
        slide.innerHTML = `
            <div class="prayer-scroll">
                <div class="prayer-type-tag">${step.section}</div>
                <div class="mystery-title">${p.title}</div>
                <div class="prayer-text">${formatPrayer(p.text)}</div>
            </div>`;
        btn.textContent = 'Amen · Continue';
        btn.className = 'btn-next';

    } else if (step.type === 'hailMary-group') {
        hdr.textContent = step.label;
        const done = Math.min(hailMaryCount + 1, step.count);
        slide.innerHTML = `
            <div class="prayer-type-tag">${step.section}</div>
            <div class="hail-count">${done}</div>
            <div class="hail-of">of ${step.count} Hail Marys</div>
            <div class="mystery-title">Hail Mary</div>
            <div class="prayer-text prayer-scroll">${formatPrayer(PRAYERS.hailMary.text)}</div>
            <div class="hail-hint">${done < step.count ? `Tap to continue (${step.count - done} remaining)` : 'Final Hail Mary — tap to continue'}</div>`;
        btn.textContent = done < step.count ? `Next Hail Mary (${done + 1}/${step.count})` : 'Glory Be →';
        btn.className = 'btn-next';

    } else if (step.type === 'hailMary-decade') {
        hdr.textContent = `Decade ${step.decade}`;
        const done = Math.min(hailMaryCount + 1, 10);
        slide.innerHTML = `
            <div class="prayer-type-tag">Decade ${step.decade} · Hail Mary</div>
            <div class="hail-count">${done}</div>
            <div class="hail-of">of 10 Hail Marys</div>
            <div class="mystery-title">Hail Mary</div>
            <div class="prayer-text prayer-scroll">${formatPrayer(PRAYERS.hailMary.text)}</div>
            <div class="hail-hint">${done < 10 ? `${10 - done} remaining` : 'Final Hail Mary — tap to continue'}</div>`;
        btn.textContent = done < 10 ? `Next Hail Mary (${done + 1}/10)` : 'Glory Be →';
        btn.className = 'btn-next';

    } else if (step.type === 'chaplet-prayer') {
        const p = CHAPLET_PRAYERS[step.prayer];
        hdr.textContent = step.section;
        slide.innerHTML = `
            <div class="prayer-scroll">
                <div class="prayer-type-tag">${step.section}</div>
                <div class="mystery-title">${p.title}</div>
                <div class="prayer-text">${formatPrayer(p.text)}</div>
            </div>`;
        btn.textContent = 'Continue →';
        btn.className = 'btn-next';

    } else if (step.type === 'chaplet-repeat') {
        const p = CHAPLET_PRAYERS[step.prayer];
        const done = hailMaryCount + 1;
        const total = p.repeat;
        hdr.textContent = step.section;
        slide.innerHTML = `
            <div class="prayer-scroll">
                <div class="prayer-type-tag">${step.section}</div>
                <div class="hail-count">${done}</div>
                <div class="hail-of">of ${total}</div>
                <div class="mystery-title">${p.title}</div>
                <div class="prayer-text">${formatPrayer(p.text)}</div>
            </div>`;
        btn.textContent = done < total ? `Again (${done + 1}/${total})` : 'Continue →';
        btn.className = 'btn-next';

    } else if (step.type === 'chaplet-decade') {
        const done = hailMaryCount + 1;
        hdr.textContent = step.section;
        slide.innerHTML = `
            <div class="prayer-type-tag">Decade ${step.decade} · Chaplet Bead</div>
            <div class="hail-count">${done}</div>
            <div class="hail-of">of 10</div>
            <div class="mystery-title">For the sake of His sorrowful Passion</div>
            <div class="prayer-text prayer-scroll">${formatPrayer(CHAPLET_PRAYERS.forTheSake.text)}</div>
            <div class="hail-hint">${done < 10 ? `${10 - done} remaining` : 'Last one — tap to continue'}</div>`;
        btn.textContent = done < 10 ? `Next (${done + 1}/10)` : 'Continue →';
        btn.className = 'btn-next';

    } else if (step.type === 'sh-announce') {
        const m = step.mystery;
        hdr.textContent = `Mystery ${step.decade} of 5`;
        slide.innerHTML = `
            <div class="prayer-type-tag">The ${step.decade}${ordSuffix(step.decade)} Mystery</div>
            <div class="mystery-title">${m.title}</div>`;
        btn.textContent = 'Begin Decade →';
        btn.className = 'btn-next';

    } else if (step.type === 'sh-our-father') {
        const p = SACRED_HEART_PRAYERS.ourFather;
        hdr.textContent = step.section;
        slide.innerHTML = `
            <div class="prayer-scroll">
                <div class="prayer-type-tag">${step.section}</div>
                <div class="mystery-title">${p.title}</div>
                <div class="prayer-text">${formatPrayer(p.text)}</div>
            </div>`;
        btn.textContent = 'Continue →';
        btn.className = 'btn-next';

    } else if (step.type === 'sh-decade') {
        const p = SACRED_HEART_PRAYERS.hailMary;
        const done = hailMaryCount + 1;
        hdr.textContent = step.section;
        slide.innerHTML = `
            <div class="prayer-type-tag">Decade ${step.decade} · Sacred Heart Bead</div>
            <div class="hail-count">${done}</div>
            <div class="hail-of">of 10</div>
            <div class="mystery-title">${p.title}</div>
            <div class="prayer-text">${formatPrayer(p.text)}</div>
            <div class="hail-hint">${done < 10 ? `${10 - done} remaining` : 'Last one — tap to continue'}</div>`;
        btn.textContent = done < 10 ? `Next (${done + 1}/10)` : 'Continue →';
        btn.className = 'btn-next';

    } else if (step.type === 'sh-glory-be') {
        const p = SACRED_HEART_PRAYERS.gloryBe;
        hdr.textContent = step.section;
        slide.innerHTML = `
            <div class="prayer-scroll">
                <div class="prayer-type-tag">${step.section}</div>
                <div class="mystery-title">${p.title}</div>
                <div class="prayer-text">${formatPrayer(p.text)}</div>
            </div>`;
        btn.textContent = 'Continue →';
        btn.className = 'btn-next';

    } else if (step.type === 'sh-closing') {
        const p = SACRED_HEART_PRAYERS.closing;
        hdr.textContent = 'Closing';
        slide.innerHTML = `
            <div class="prayer-scroll">
                <div class="prayer-type-tag">Closing Prayer</div>
                <div class="mystery-title">${p.title}</div>
                <div class="prayer-text">${formatPrayer(p.text)}</div>
            </div>`;
        btn.textContent = 'Amen · Finish';
        btn.className = 'btn-next';

    } else if (step.type === 'mystery-announce') {
        const m = step.mystery;
        hdr.textContent = `Mystery ${step.decade} of 5`;
        const scriptureHtml = m.scripture
            ? `<div class="scripture-wrap"><div class="scripture-text">${m.scripture}</div></div>`
            : '';
        slide.innerHTML = `
            <div class="prayer-scroll">
                <div class="prayer-type-tag">The ${step.decade}${ordSuffix(step.decade)} Mystery</div>
                <div class="mystery-title">${m.title}</div>
                <div class="mystery-desc">${m.description}</div>
                <div class="mystery-meditation">${m.meditation}</div>
                <div class="fruit-wrap"><span class="fruit-label">Fruit</span><span class="fruit-text">${m.fruit}</span></div>
                ${scriptureHtml}
            </div>`;
        btn.textContent = 'Our Father →';
        btn.className = 'btn-next';
    }

    // Animate out old slide, in new
    if (currentSlide) {
        currentSlide.classList.add('exit');
        const old = currentSlide;
        setTimeout(() => old.remove(), 350);
    }

    area.appendChild(slide);
    requestAnimationFrame(() => {
        requestAnimationFrame(() => slide.classList.add('active'));
    });
    currentSlide = slide;
}

// ── Advance / go-back logic ──────────────────────────────────

function repeatMaxFor(step) {
    if (step.type === 'hailMary-group') return step.count - 1;
    if (step.type === 'hailMary-decade') return 9;
    if (step.type === 'chaplet-repeat') return CHAPLET_PRAYERS[step.prayer].repeat - 1;
    if (step.type === 'chaplet-decade' || step.type === 'sh-decade') return 9;
    return 0;
}

function advance() {
    const step = steps[currentStep];

    if (hailMaryCount < repeatMaxFor(step)) {
        hailMaryCount++;
        renderSlide(step);
        updateBeadTrack();
        updateProgress();
        return;
    }

    hailMaryCount = 0;
    currentStep++;
    renderScreen();
}

function goBack() {
    if (currentStep === 0 && hailMaryCount === 0) return;

    if (hailMaryCount > 0) {
        hailMaryCount--;
        renderSlide(steps[currentStep]);
        updateBeadTrack();
        updateProgress();
        return;
    }

    currentStep--;
    hailMaryCount = repeatMaxFor(steps[currentStep]);
    renderScreen();
}

// ── Finished ─────────────────────────────────────────────────

function renderFinished() {
    const closings = {
        'chaplet':      { icon: '🩸', title: 'Chaplet Complete',  msg: 'May the Divine Mercy of Jesus bring peace to your soul and the souls of the whole world.' },
        'sacred-heart': { icon: '❤️', title: 'Chaplet Complete',  msg: 'May the Sacred Heart of Jesus be praised, adored and loved in all the Tabernacles of the world.' },
    };
    const c = closings[mysteryData.type] || { icon: '🌹', title: 'Rosary Complete', msg: 'May Our Lady intercede for you and bring your prayers before her Son.' };
    document.getElementById('app').innerHTML = `
        <div class="finished-screen">
            <div class="crown">${c.icon}</div>
            <h1>${c.title}</h1>
            <p>You have completed the ${mysteryData.name}.<br>${c.msg}</p>
            <a href="/" class="btn-home">Back to Home</a>
        </div>`;
}

// ── Swipe support ─────────────────────────────────────────────

function setupSwipe(el) {
    let startX = 0;
    el.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', e => {
        const dx = startX - e.changedTouches[0].clientX;
        if (dx > 60) advance();
        else if (dx < -60) goBack();
    }, { passive: true });
}

// ── Utils ─────────────────────────────────────────────────────

function ordSuffix(n) {
    if (n === 1) return 'st';
    if (n === 2) return 'nd';
    if (n === 3) return 'rd';
    return 'th';
}

// ── Boot ──────────────────────────────────────────────────────

const appEl = document.getElementById('app');
mysteryData = JSON.parse(appEl.dataset.mysteryJson);
if (mysteryData.type === 'chaplet') steps = buildChapletSteps();
else if (mysteryData.type === 'sacred-heart') steps = buildSacredHeartSteps(mysteryData);
else steps = buildSteps(mysteryData);
renderScreen();
