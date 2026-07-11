/* ============================================================
   Static SPA — hash-based router + screen renderers
   ============================================================ */

const todayMap = {0:'glorious',1:'joyful',2:'sorrowful',3:'glorious',4:'luminous',5:'sorrowful',6:'joyful'};
const todayMystery = todayMap[new Date().getDay()];
const mysteryNames = {joyful:'Joyful Mysteries',sorrowful:'Sorrowful Mysteries',glorious:'Glorious Mysteries',luminous:'Luminous Mysteries'};

// ── Router ────────────────────────────────────────────────────

function navigate(hash) {
    location.hash = hash;
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);

function route() {
    const hash = location.hash.replace('#', '') || '/';
    const app = document.getElementById('app');

    if (hash === '/' || hash === '') {
        app.innerHTML = renderHome();
        initHome();
    } else if (hash === '/rosary') {
        app.innerHTML = renderMysteries();
        initMysteries();
    } else if (hash === '/intentions') {
        app.innerHTML = renderIntentions(null);
    } else if (hash.startsWith('/intentions/')) {
        const mystery = hash.replace('/intentions/', '');
        app.innerHTML = renderIntentions(mystery);
    } else if (hash.startsWith('/pray/')) {
        const mystery = hash.replace('/pray/', '');
        initPraySession(mystery);
    } else if (hash === '/other-prayers') {
        app.innerHTML = renderOtherPrayers();
    } else if (hash.startsWith('/prayer/')) {
        const slug = hash.replace('/prayer/', '');
        app.innerHTML = renderSinglePrayer(slug);
    } else {
        app.innerHTML = renderHome();
        initHome();
    }
}

// ── Screen: Home ──────────────────────────────────────────────

function renderHome() {
    return `
    <div class="home">
        <div class="home-header">
            <span class="cross">✝</span>
            <h1>Daily Prayer</h1>
            <p>Pray with Mary, Queen of Heaven</p>
        </div>
        <a href="#/intentions" class="mystery-card chaplet-card">
            <span class="icon">🙏</span>
            <span class="name">Intentions</span>
            <span class="days">Pray for others</span>
        </a>
        <a href="#/rosary" class="mystery-card chaplet-card">
            <span class="icon">📿</span>
            <span class="name">The Rosary</span>
            <span class="days" id="todayBadge"></span>
        </a>
        <a href="#/intentions/divine-mercy" class="mystery-card chaplet-card">
            <span class="icon">🩸</span>
            <span class="name">Divine Mercy Chaplet</span>
            <span class="days">Any day · 3 o'clock hour</span>
        </a>
        <a href="#/intentions/sacred-heart" class="mystery-card chaplet-card">
            <span class="icon">❤️</span>
            <span class="name">Sacred Heart Chaplet</span>
            <span class="days">Any day</span>
        </a>
        <a href="#/other-prayers" class="mystery-card chaplet-card">
            <span class="icon">📖</span>
            <span class="name">Other Prayers</span>
            <span class="days">Saints &amp; devotions</span>
        </a>
    </div>`;
}

function initHome() {
    const badge = document.getElementById('todayBadge');
    if (badge) badge.textContent = 'Today: ' + (mysteryNames[todayMystery] || '');
}

// ── Screen: Rosary mystery selection ─────────────────────────

function renderMysteries() {
    return `
    <div class="home">
        <div class="home-header">
            <a href="#/" class="btn-back" style="text-decoration:none;display:block;margin-bottom:12px;">← Back</a>
            <span class="cross">📿</span>
            <h1>The Rosary</h1>
            <p>Choose today's mysteries</p>
            <span class="today-badge" id="todayBadge2"></span>
        </div>
        <div class="mysteries-grid">
            <a href="#/intentions/joyful" class="mystery-card" id="card-joyful">
                <span class="icon">✨</span><span class="name">Joyful</span><span class="days">Mon · Sat</span>
            </a>
            <a href="#/intentions/sorrowful" class="mystery-card" id="card-sorrowful">
                <span class="icon">✝️</span><span class="name">Sorrowful</span><span class="days">Tue · Fri</span>
            </a>
            <a href="#/intentions/glorious" class="mystery-card" id="card-glorious">
                <span class="icon">👑</span><span class="name">Glorious</span><span class="days">Wed · Sun</span>
            </a>
            <a href="#/intentions/luminous" class="mystery-card" id="card-luminous">
                <span class="icon">☀️</span><span class="name">Luminous</span><span class="days">Thursday</span>
            </a>
        </div>
        <div class="intro-prayers">
            <h3>Opening Prayers</h3>
            <div class="prayer-preview">Apostles' Creed · Our Father · 3 Hail Marys · Glory Be<br>then 5 Decades · closing Hail Holy Queen</div>
        </div>
    </div>`;
}

function initMysteries() {
    const card = document.getElementById('card-' + todayMystery);
    if (card) {
        card.classList.add('today');
        const tag = document.createElement('span');
        tag.className = 'today-tag';
        tag.textContent = 'TODAY';
        card.insertBefore(tag, card.firstChild);
    }
    const badge = document.getElementById('todayBadge2');
    if (badge) badge.textContent = 'Today: ' + (mysteryNames[todayMystery] || '');
}

// ── Screen: Intentions ────────────────────────────────────────

function renderIntentions(mystery) {
    const btnHref = mystery ? `#/pray/${mystery}` : '#/';
    const btnText = mystery ? 'Begin Prayer' : 'Back to Home';
    return `
    <div class="intentions-screen">
        <div class="intentions-header">
            <a href="${mystery ? '#/rosary' : '#/'}" class="btn-back">←</a>
            <div>
                <div class="mystery-name">Before we begin</div>
                <div class="step-label">Offer your intentions</div>
            </div>
        </div>
        <div class="intentions-list">
            <p class="intentions-intro">Let us pray this prayer for the following intentions:</p>
            <ol>${INTENTIONS.map(i => `<li>${i}</li>`).join('')}</ol>
        </div>
        <div class="intentions-footer">
            <a href="${btnHref}" class="btn-next" style="text-decoration:none;display:block;text-align:center;">${btnText}</a>
        </div>
    </div>`;
}

// ── Screen: Other Prayers ─────────────────────────────────────

function renderOtherPrayers() {
    return `
    <div class="home">
        <div class="home-header">
            <a href="#/" style="text-decoration:none;font-size:1.4rem;color:var(--text-muted);display:block;margin-bottom:12px;">← Back</a>
            <span class="cross">🙏</span>
            <h1>Other Prayers</h1>
        </div>
        <a href="#/prayer/st-michael" class="mystery-card chaplet-card"><span class="icon">⚔️</span><span class="name">Prayer to Saint Michael</span><span class="days">Defender against evil</span></a>
        <a href="#/prayer/consecration-to-jesus" class="mystery-card chaplet-card"><span class="icon">✝️</span><span class="name">Consecration to Jesus</span><span class="days">In the Holy Spirit, with Mary</span></a>
        <a href="#/prayer/st-joseph" class="mystery-card chaplet-card"><span class="icon">🌿</span><span class="name">Invocation to Saint Joseph</span><span class="days">Patron of the Universal Church</span></a>
        <a href="#/prayer/carlo-acutis" class="mystery-card chaplet-card"><span class="icon">💻</span><span class="name">Prayer to Saint Carlo Acutis</span><span class="days">Patron of the Internet</span></a>
        <a href="#/prayer/channel-of-peace" class="mystery-card chaplet-card"><span class="icon">☮️</span><span class="name">Make Me a Channel of Your Peace</span><span class="days">Prayer of Saint Francis</span></a>
    </div>`;
}

// ── Screen: Single Prayer ─────────────────────────────────────

function renderSinglePrayer(slug) {
    const p = SINGLE_PRAYERS[slug];
    if (!p) return renderHome();
    const intentionsHtml = p.intentions ? `
        <div class="intentions-list" style="margin-top:24px;">
            <ol>${INTENTIONS.map(i => `<li>${i}</li>`).join('')}</ol>
        </div>` : '';
    const closingHtml = p.closing ? `<div class="prayer-text" style="margin-top:24px;color:var(--gold-light);font-style:italic;">${p.closing}</div>` : '';
    return `
    <div class="pray-screen">
        <div class="pray-header">
            <a href="#/other-prayers" class="btn-back">←</a>
            <div class="pray-header-info">
                <div class="mystery-name">Other Prayers</div>
                <div class="step-label">${p.title}</div>
            </div>
            <div class="counter-badge">${p.icon}</div>
        </div>
        <div class="prayer-area" style="overflow-y:auto;-webkit-overflow-scrolling:touch;display:block;padding:24px;">
            <div class="prayer-type-tag">${p.subtitle}</div>
            <div class="mystery-title" style="margin-bottom:20px;">${p.title}</div>
            <div class="prayer-text">${p.text.replace(/\n/g, '<br>')}</div>
            ${intentionsHtml}
            ${closingHtml}
        </div>
        <div class="pray-footer">
            <a href="#/other-prayers" class="btn-next" style="text-decoration:none;display:block;text-align:center;">Back</a>
        </div>
    </div>`;
}

// ── Prayer session ────────────────────────────────────────────
// All session logic runs inline — adapted from rosary.js

const PRAYERS = {
    lordOpenMyLips: { title: "Lord, Open Our Lips", text: `Lord, open our lips,\nand our tongues shall announce thy praise.` },
    inclineToMyAid: { title: "O God, Come to Our Aid", text: `Incline to our aid, O God;\nO Lord, make haste to help us.` },
    apostlesCreed: { title: "Apostles' Creed", text: `I believe in God, the Father Almighty, Creator of Heaven and earth;\nand in Jesus Christ, His only Son Our Lord,\nWho was conceived by the Holy Spirit, born of the Virgin Mary,\nsuffered under Pontius Pilate, was crucified, died, and was buried.\nHe descended into Hell; the third day He rose again from the dead;\nHe ascended into Heaven, and sits at the right hand of God, the Father Almighty;\nfrom there He shall come to judge the living and the dead.\nI believe in the Holy Spirit, the holy Catholic Church,\nthe communion of saints, the forgiveness of sins,\nthe resurrection of the body and life everlasting. Amen.` },
    ourFather: { title: "Our Father", text: `Our Father, Who art in heaven,\nhallowed be Thy name;\nThy kingdom come,\nThy will be done on earth as it is in Heaven.\nGive us this day our daily bread;\nand forgive us our trespasses,\nas we forgive those who trespass against us;\nand lead us not into temptation,\nbut deliver us from evil. Amen.` },
    hailMary: { title: "Hail Mary", text: `Hail Mary, full of grace,\nthe Lord is with thee.\nBlessed art thou among women,\nand blessed is the fruit of thy womb, Jesus.\nHoly Mary, Mother of God,\npray for us sinners,\nnow and at the hour of our death. Amen.` },
    gloryBe: { title: "Glory Be", text: `Glory be to the Father, and to the Son,\nand to the Holy Spirit;\nas it was in the beginning, is now,\nand ever shall be,\nworld without end. Amen.` },
    fatimaPrayer: { title: "Fatima Prayer", text: `O my Jesus, forgive us our sins,\nsave us from the fires of Hell,\nlead all souls to Heaven,\nespecially those who are in most need of Thy mercy. Amen.` },
    hailHolyQueen: { title: "Hail, Holy Queen", text: `Hail, Holy Queen, Mother of Mercy,\nour life, our sweetness, and our hope!\nTo thee do we cry, poor banished children of Eve;\nto thee do we send up our sighs,\nmourning and weeping in this valley of tears.\nTurn then, most gracious Advocate,\nthine eyes of mercy toward us;\nand after this our exile,\nshow unto us the blessed fruit of thy womb, Jesus.\nO clement, O loving, O sweet Virgin Mary.\nPray for us, O Holy Mother of God,\nthat we may be made worthy of the promises of Christ. Amen.` },
    closingPrayer: { title: "Closing Prayer", text: `O God, whose only begotten Son,\nby His life, death, and resurrection,\nhas purchased for us the rewards of eternal life,\ngrant, we beseech Thee,\nthat meditating upon these mysteries\nof the Most Holy Rosary of the Blessed Virgin Mary,\nwe may imitate what they contain\nand obtain what they promise,\nthrough the same Christ Our Lord. Amen.` },
};

const CHAPLET_PRAYERS = {
    openingPrayer: { title: "Opening Prayer", text: `You expired, Jesus, but the source of life gushed forth for souls,\nand the ocean of mercy opened up for the whole world.\nO Fount of Life, unfathomable Divine Mercy,\nenvelop the whole world and empty Yourself out upon us.` },
    oBloodAndWater: { title: "O Blood and Water", text: `O Blood and Water,\nwhich gushed forth from the Heart of Jesus\nas a font of Mercy for us,\nI trust in You.`, repeat: 3 },
    eternalFather: { title: "Eternal Father", text: `Eternal Father,\nI offer You the Body and Blood,\nSoul and Divinity\nof Your Dearly Beloved Son,\nOur Lord, Jesus Christ,\nin atonement for our sins\nand those of the whole world.` },
    forTheSake: { title: "For the sake of His sorrowful Passion", text: `For the sake of His sorrowful Passion,\nhave mercy on us\nand on the whole world.` },
    holyGod: { title: "Holy God", text: `Holy God,\nHoly Mighty One,\nHoly Immortal One,\nhave mercy on us\nand on the whole world.`, repeat: 3 },
    closingPrayer: { title: "Closing Prayer", text: `Eternal God, in whom mercy is endless\nand the treasury of compassion inexhaustible,\nlook kindly upon us and increase Your mercy in us,\nthat in difficult moments we might not despair\nnor become despondent,\nbut with great confidence\nsubmit ourselves to Your holy will,\nwhich is Love and Mercy itself. Amen.` },
};

const SACRED_HEART_PRAYERS = {
    ourFather: { title: "Jesus, meek and humble of heart", text: `Jesus, meek and humble of heart,\nmake my heart like yours.` },
    hailMary:  { title: "Sacred Heart of Jesus", text: `Sacred Heart of Jesus,\nI trust in You.` },
    gloryBe:   { title: "Most gentle and humble Heart of Jesus", text: `Most gentle and humble Heart of Jesus,\ngive me the grace to be like You,\nmeek and humble of heart.` },
    closing:   { title: "Closing Prayer", text: `May the Sacred Heart of Jesus\nin the most Blessed Sacrament of the Altar,\nbe praised, adored and loved\nwith grateful affection\nin all the Tabernacles of the world,\never to the end of time. Amen.` },
};

let steps = [], currentStep = 0, hailMaryCount = 0, mysteryData = null, currentSlide = null;

function initPraySession(mystery) {
    currentStep = 0; hailMaryCount = 0; currentSlide = null;
    mysteryData = MYSTERIES[mystery] || CHAPLETS[mystery];
    if (!mysteryData) { navigate('/'); return; }
    if (mysteryData.type === 'chaplet') steps = buildChapletSteps();
    else if (mysteryData.type === 'sacred-heart') steps = buildSacredHeartSteps(mysteryData);
    else steps = buildSteps(mysteryData);
    document.getElementById('app').innerHTML = '';
    renderScreen();
}

function buildSteps(data) {
    const s = [];
    s.push({ type:'prayer', prayer:'lordOpenMyLips', section:'Opening' });
    s.push({ type:'prayer', prayer:'inclineToMyAid', section:'Opening' });
    s.push({ type:'prayer', prayer:'gloryBe', section:'Opening' });
    s.push({ type:'prayer', prayer:'apostlesCreed', section:'Opening' });
    s.push({ type:'prayer', prayer:'ourFather',     section:'Opening' });
    s.push({ type:'hailMary-group', count:3,        section:'Opening', label:'3 Hail Marys for Faith, Hope & Charity' });
    s.push({ type:'prayer', prayer:'gloryBe',       section:'Opening' });
    for (let d = 0; d < 5; d++) {
        const dec = data.decades[d];
        s.push({ type:'mystery-announce', decade:d+1, mystery:dec, section:`Decade ${d+1}` });
        s.push({ type:'prayer', prayer:'ourFather',  section:`Decade ${d+1}` });
        s.push({ type:'hailMary-decade', decade:d+1, section:`Decade ${d+1}` });
        s.push({ type:'prayer', prayer:'gloryBe',    section:`Decade ${d+1}` });
        s.push({ type:'prayer', prayer:'fatimaPrayer', section:`Decade ${d+1}` });
    }
    s.push({ type:'prayer', prayer:'hailHolyQueen', section:'Closing' });
    s.push({ type:'prayer', prayer:'closingPrayer', section:'Closing' });
    s.push({ type:'finished' });
    return s;
}

function buildChapletSteps() {
    const s = [];
    s.push({ type:'chaplet-prayer', prayer:'openingPrayer', section:'Opening' });
    s.push({ type:'chaplet-repeat', prayer:'oBloodAndWater', section:'Opening' });
    s.push({ type:'prayer', prayer:'ourFather',  section:'Opening' });
    s.push({ type:'prayer', prayer:'hailMary',   section:'Opening' });
    s.push({ type:'prayer', prayer:'apostlesCreed', section:'Opening' });
    for (let d = 1; d <= 5; d++) {
        s.push({ type:'chaplet-prayer', prayer:'eternalFather', section:`Decade ${d}`, decade:d });
        s.push({ type:'chaplet-decade', section:`Decade ${d}`, decade:d });
    }
    s.push({ type:'chaplet-repeat', prayer:'holyGod', section:'Closing' });
    s.push({ type:'chaplet-prayer', prayer:'closingPrayer', section:'Closing' });
    s.push({ type:'finished' });
    return s;
}

function buildSacredHeartSteps(data) {
    const s = [];
    s.push({ type:'prayer', prayer:'ourFather',     section:'Opening' });
    s.push({ type:'prayer', prayer:'hailMary',      section:'Opening' });
    s.push({ type:'prayer', prayer:'apostlesCreed', section:'Opening' });
    for (let d = 0; d < 5; d++) {
        const dec = data.decades[d];
        s.push({ type:'sh-announce',   decade:d+1, mystery:dec, section:`Decade ${d+1}` });
        s.push({ type:'sh-our-father', section:`Decade ${d+1}`, decade:d+1 });
        s.push({ type:'sh-decade',     section:`Decade ${d+1}`, decade:d+1 });
        s.push({ type:'sh-glory-be',   section:`Decade ${d+1}`, decade:d+1 });
    }
    s.push({ type:'sh-closing', section:'Closing' });
    s.push({ type:'finished' });
    return s;
}

function fp(text) { return text.replace(/\n/g, '<br>'); }
function ord(n) { return n===1?'st':n===2?'nd':n===3?'rd':'th'; }

function renderScreen() {
    const step = steps[currentStep];
    if (!step) return;
    if (step.type === 'finished') { renderFinished(); return; }

    let screen = document.getElementById('pray-screen');
    if (!screen) { screen = buildPrayScreen(); document.getElementById('app').appendChild(screen); }

    updateProgress();
    updateBeadTrack();
    renderSlide(step);
}

function buildPrayScreen() {
    const screen = document.createElement('div');
    screen.className = 'pray-screen'; screen.id = 'pray-screen';

    const pb = document.createElement('div');
    pb.className = 'progress-bar-wrap';
    pb.innerHTML = '<div class="progress-bar-fill" id="progressFill"></div>';
    screen.appendChild(pb);

    const hdr = document.createElement('div');
    hdr.className = 'pray-header';
    hdr.innerHTML = `
        <a href="#/" class="btn-back">←</a>
        <div class="pray-header-info">
            <div class="mystery-name">${mysteryData.icon} ${mysteryData.name}</div>
            <div class="step-label" id="hdrStep"></div>
        </div>
        <div class="counter-badge" id="counterBadge"></div>`;
    screen.appendChild(hdr);

    const dots = document.createElement('div');
    dots.id = 'decadeDots';
    dots.style.cssText = 'justify-content:center;padding:8px 0 4px;display:flex;gap:8px;';
    for (let i = 0; i < 5; i++) {
        const d = document.createElement('div');
        d.className = 'decade-dot'; d.dataset.decade = i + 1;
        dots.appendChild(d);
    }
    screen.appendChild(dots);

    const bt = document.createElement('div');
    bt.className = 'bead-track'; bt.id = 'beadTrack';
    screen.appendChild(bt);

    const area = document.createElement('div');
    area.className = 'prayer-area'; area.id = 'prayerArea';
    screen.appendChild(area);

    const footer = document.createElement('div');
    footer.className = 'pray-footer'; footer.id = 'prayFooter';
    const prevBtn = document.createElement('button');
    prevBtn.className = 'btn-next secondary'; prevBtn.id = 'btnPrev'; prevBtn.textContent = '← Previous';
    prevBtn.addEventListener('click', goBack);
    footer.appendChild(prevBtn);
    const btn = document.createElement('button');
    btn.className = 'btn-next'; btn.id = 'btnNext'; btn.textContent = 'Continue';
    btn.addEventListener('click', advance);
    footer.appendChild(btn);
    footer.appendChild(Object.assign(document.createElement('div'), { className:'swipe-hint', textContent:'Tap to continue' }));
    screen.appendChild(footer);

    let startX = 0;
    screen.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive:true });
    screen.addEventListener('touchend',   e => {
        const dx = startX - e.changedTouches[0].clientX;
        if (dx > 60) advance();
        else if (dx < -60) goBack();
    }, { passive:true });

    return screen;
}

function updateProgress() {
    const total = steps.length - 1;
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
    const beads = [];
    beads.push({ large:true, id:'open-cross' });
    for (let i = 0; i < 3; i++) beads.push({ id:`open-hm-${i}` });
    beads.push({ sep:true });
    for (let d = 0; d < 5; d++) {
        beads.push({ large:true, id:`d${d}-of` });
        for (let h = 0; h < 10; h++) beads.push({ id:`d${d}-hm-${h}` });
        if (d < 4) beads.push({ sep:true });
    }
    const beadIndex = stepToBeadIndex(currentStep, hailMaryCount);
    for (let i = 0; i < beads.length; i++) {
        const state = beads[i];
        if (state.sep) { const s = document.createElement('div'); s.className='bead-sep'; track.appendChild(s); continue; }
        const b = document.createElement('div');
        b.className = state.large ? 'bead our-father' : 'bead';
        if (i < beadIndex) b.classList.add('done');
        else if (i === beadIndex) b.classList.add('current');
        track.appendChild(b);
    }
    const currentDecade = getCurrentDecade();
    document.querySelectorAll('.decade-dot').forEach(d => {
        const n = parseInt(d.dataset.decade);
        d.className = 'decade-dot';
        if (n < currentDecade) d.classList.add('done');
        else if (n === currentDecade) d.classList.add('current');
    });
}

function getCurrentDecade() {
    for (let i = currentStep; i >= 0; i--) { if (steps[i].decade) return steps[i].decade; }
    return 0;
}

function stepToBeadIndex(stepIdx, hailCount) {
    if (mysteryData.type === 'sacred-heart') return shBeadIndex(stepIdx, hailCount);
    if (mysteryData.type === 'chaplet')      return chapletBeadIndex(stepIdx, hailCount);
    return rosaryBeadIndex(stepIdx, hailCount);
}
function rosaryBeadIndex(stepIdx, hailCount) {
    if (stepIdx <= 4) return 0; // lordOpenMyLips, inclineToMyAid, gloryBe, apostlesCreed, ourFather
    if (stepIdx === 5) return 1 + hailCount;
    if (stepIdx === 6) return 3;
    const di = Math.floor((stepIdx-7)/5), pos = (stepIdx-7)%5, bo = 5+di*12;
    if (pos===0||pos===1) return bo; if (pos===2) return bo+1+hailCount;
    if (pos===3||pos===4) return bo+10; return 0;
}
function shBeadIndex(stepIdx, hailCount) {
    if (stepIdx===0) return 0; if (stepIdx===1) return 1; if (stepIdx===2) return 3;
    const di = Math.floor((stepIdx-3)/4), pos = (stepIdx-3)%4, bo = 5+di*12;
    if (pos===0||pos===1) return bo; if (pos===2) return bo+1+hailCount;
    if (pos===3) return bo+10; return bo;
}
function chapletBeadIndex(stepIdx, hailCount) {
    if (stepIdx===0) return 0; if (stepIdx===1) return 1+hailCount;
    if (stepIdx<=4) return 3;
    const di = Math.floor((stepIdx-5)/2), pos = (stepIdx-5)%2, bo = 5+di*12;
    if (pos===0) return bo; if (pos===1) return bo+1+hailCount; return bo;
}

function renderSlide(step) {
    const area = document.getElementById('prayerArea');
    const hdr  = document.getElementById('hdrStep');
    const btn  = document.getElementById('btnNext');
    const slide = document.createElement('div');
    slide.className = 'prayer-slide';

    if (step.type === 'prayer') {
        const p = PRAYERS[step.prayer];
        hdr.textContent = step.section;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">${step.section}</div><div class="mystery-title">${p.title}</div><div class="prayer-text">${fp(p.text)}</div></div>`;
        btn.textContent = 'Amen · Continue'; btn.className = 'btn-next';

    } else if (step.type === 'hailMary-group') {
        const done = hailMaryCount + 1;
        hdr.textContent = `Hail Mary ${done} of ${step.count}`;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">${step.section}</div><div class="mystery-title">Hail Mary</div><div class="prayer-text">${fp(PRAYERS.hailMary.text)}</div></div>`;
        btn.textContent = done < step.count ? `Next Hail Mary (${done+1}/${step.count})` : 'Glory Be →'; btn.className = 'btn-next';

    } else if (step.type === 'hailMary-decade') {
        const done = hailMaryCount + 1;
        hdr.textContent = `Hail Mary ${done} of 10`;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">Decade ${step.decade}</div><div class="mystery-title">Hail Mary</div><div class="prayer-text">${fp(PRAYERS.hailMary.text)}</div></div>`;
        btn.textContent = done < 10 ? `Next Hail Mary (${done+1}/10)` : 'Glory Be →'; btn.className = 'btn-next';

    } else if (step.type === 'mystery-announce') {
        const m = step.mystery;
        hdr.textContent = `Mystery ${step.decade} of 5`;
        const scriptureHtml = m.scripture ? `<div class="scripture-wrap"><div class="scripture-text">${m.scripture}</div></div>` : '';
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">The ${step.decade}${ord(step.decade)} Mystery</div><div class="mystery-title">${m.title}</div><div class="mystery-desc">${m.description}</div><div class="fruit-wrap"><span class="fruit-label">Fruit</span><span class="fruit-text">${m.fruit}</span></div><div class="mystery-meditation">${m.meditation}</div>${scriptureHtml}</div>`;
        btn.textContent = 'Our Father →'; btn.className = 'btn-next';

    } else if (step.type === 'chaplet-prayer') {
        const p = CHAPLET_PRAYERS[step.prayer];
        hdr.textContent = step.section;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">${step.section}</div><div class="mystery-title">${p.title}</div><div class="prayer-text">${fp(p.text)}</div></div>`;
        btn.textContent = 'Continue →'; btn.className = 'btn-next';

    } else if (step.type === 'chaplet-repeat') {
        const p = CHAPLET_PRAYERS[step.prayer];
        const done = hailMaryCount + 1;
        hdr.textContent = step.section;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">${step.section}</div><div class="hail-count">${done}</div><div class="hail-of">of ${p.repeat}</div><div class="mystery-title">${p.title}</div><div class="prayer-text">${fp(p.text)}</div></div>`;
        btn.textContent = done < p.repeat ? `Again (${done+1}/${p.repeat})` : 'Continue →'; btn.className = 'btn-next';

    } else if (step.type === 'chaplet-decade') {
        const done = hailMaryCount + 1;
        hdr.textContent = step.section;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">Decade ${step.decade}</div><div class="mystery-title">For the sake of His sorrowful Passion</div><div class="prayer-text">${fp(CHAPLET_PRAYERS.forTheSake.text)}</div><div class="hail-hint">${done < 10 ? `${10-done} remaining` : 'Last one'}</div></div>`;
        btn.textContent = done < 10 ? `Next (${done+1}/10)` : 'Continue →'; btn.className = 'btn-next';

    } else if (step.type === 'sh-announce') {
        const m = step.mystery;
        hdr.textContent = `Mystery ${step.decade} of 5`;
        slide.innerHTML = `<div class="prayer-type-tag">The ${step.decade}${ord(step.decade)} Mystery</div><div class="mystery-title">${m.title}</div>`;
        btn.textContent = 'Begin Decade →'; btn.className = 'btn-next';

    } else if (step.type === 'sh-our-father') {
        const p = SACRED_HEART_PRAYERS.ourFather;
        hdr.textContent = step.section;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">${step.section}</div><div class="mystery-title">${p.title}</div><div class="prayer-text">${fp(p.text)}</div></div>`;
        btn.textContent = 'Continue →'; btn.className = 'btn-next';

    } else if (step.type === 'sh-decade') {
        const done = hailMaryCount + 1;
        hdr.textContent = step.section;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">Decade ${step.decade}</div><div class="mystery-title">${SACRED_HEART_PRAYERS.hailMary.title}</div><div class="prayer-text">${fp(SACRED_HEART_PRAYERS.hailMary.text)}</div><div class="hail-hint">${done < 10 ? `${10-done} remaining` : 'Last one'}</div></div>`;
        btn.textContent = done < 10 ? `Next (${done+1}/10)` : 'Continue →'; btn.className = 'btn-next';

    } else if (step.type === 'sh-glory-be') {
        const p = SACRED_HEART_PRAYERS.gloryBe;
        hdr.textContent = step.section;
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">${step.section}</div><div class="mystery-title">${p.title}</div><div class="prayer-text">${fp(p.text)}</div></div>`;
        btn.textContent = 'Continue →'; btn.className = 'btn-next';

    } else if (step.type === 'sh-closing') {
        const p = SACRED_HEART_PRAYERS.closing;
        hdr.textContent = 'Closing';
        slide.innerHTML = `<div class="prayer-scroll"><div class="prayer-type-tag">Closing Prayer</div><div class="mystery-title">${p.title}</div><div class="prayer-text">${fp(p.text)}</div></div>`;
        btn.textContent = 'Amen · Finish'; btn.className = 'btn-next';
    }

    if (currentSlide) { currentSlide.classList.add('exit'); const old = currentSlide; setTimeout(() => old.remove(), 350); }
    area.appendChild(slide);
    requestAnimationFrame(() => requestAnimationFrame(() => slide.classList.add('active')));
    currentSlide = slide;
}

function repeatMaxFor(step) {
    if (step.type === 'hailMary-group') return step.count - 1;
    if (step.type === 'hailMary-decade') return 9;
    if (step.type === 'chaplet-repeat') return CHAPLET_PRAYERS[step.prayer].repeat - 1;
    if (step.type === 'chaplet-decade' || step.type === 'sh-decade') return 9;
    return 0;
}

function advance() {
    const step = steps[currentStep];
    if (hailMaryCount < repeatMaxFor(step)) { hailMaryCount++; renderSlide(step); updateBeadTrack(); updateProgress(); return; }
    hailMaryCount = 0; currentStep++;
    renderScreen();
}

function goBack() {
    if (currentStep === 0 && hailMaryCount === 0) return;
    if (hailMaryCount > 0) { hailMaryCount--; renderSlide(steps[currentStep]); updateBeadTrack(); updateProgress(); return; }
    currentStep--;
    hailMaryCount = repeatMaxFor(steps[currentStep]);
    renderScreen();
}

function renderFinished() {
    const closings = {
        'chaplet':      { icon:'🩸', title:'Chaplet Complete', msg:'May the Divine Mercy of Jesus bring peace to your soul and the souls of the whole world.' },
        'sacred-heart': { icon:'❤️', title:'Chaplet Complete', msg:'May the Sacred Heart of Jesus be praised, adored and loved in all the Tabernacles of the world.' },
    };
    const c = closings[mysteryData.type] || { icon:'🌹', title:'Rosary Complete', msg:'May Our Lady intercede for you and bring your prayers before her Son.' };
    document.getElementById('app').innerHTML = `
        <div class="finished-screen">
            <div class="crown">${c.icon}</div>
            <h1>${c.title}</h1>
            <p>You have completed the ${mysteryData.name}.<br>${c.msg}</p>
            <a href="#/" class="btn-home">Back to Home</a>
        </div>`;
}
