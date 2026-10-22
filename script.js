/* ============================================================
   zj71's Game Hub — script.js
   ------------------------------------------------------------
   ADDING A NEW GAME: add one line to the GAMES array below:

     { title: 'My Game', desc: 'Short description',
       url: '/games/my-game/index.html', image: 'https://...' }

   • image is optional — a generated gradient tile is used instead.
   • Favorites (★) and Recently played (🕘) are saved in
     localStorage on this browser.
   • Games open inside game.html, which wraps them in a frame with
     a back / reload / fullscreen / device-info toolbar.
   ============================================================ */

'use strict';

/* ---------------- Data ---------------- */

const GAMES = [
  { title: 'Tab Chats',               desc: 'The ultimate LAN chatting platform', url: '/games/tc/index.html',            image: 'https://static.vecteezy.com/system/resources/thumbnails/006/692/321/small/chatting-message-icon-template-black-color-editable-chatting-message-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg' },
  { title: 'Random',                  desc: 'Random Shit',                        url: '/games/random/',                  image: '' },
  { title: 'Five Nights at Freddy\'s',desc: 'Survive five spooky nights',         url: '/games/fnaf/index.html',          image: 'https://play-lh.googleusercontent.com/myJ2kwywsCRglKkZuHBq6Aku9PX7HB75v-8KbnTK9JOPU6z0hpD9xtvjiTGqrn-e4eI' },
  { title: 'Legion Platforms',        desc: 'Jump across the platforms',          url: '/games/legion platforms/index.html', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMWJcFGLcnAWw-OyIklj9vSImhot9Qja_oVA&s' },
  { title: 'Minecraft',               desc: 'Classic sandbox building',           url: '/games/mc/index.html',            image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png' },
  { title: 'Geometry Dash',           desc: 'One-touch rhythm platformer',        url: '/games/gd/index.html',            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUiJgoAoVVcg9FA3_3NHHC4SkocpWthaYbg&s' },
  { title: 'Among Us',                desc: 'Find the impostor',                  url: '/games/Among Us.html',            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4pC911RR8_8f9fN7T2AYbgBWfH-lv8DX7w&s' },
  { title: 'Rob a Brainrot 2',        desc: 'The sequel heist',                   url: '/games/Rob a Brainrot 2.html',    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLxerHkBauEVpdGPdD-GOR2he4ASkez8ylQ&s' },
  { title: 'Happy Wheels',            desc: 'Physics-based mayhem',               url: '/games/Happy Wheels.html',        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcm4QoLNNEvP5lvZKJg9WgFLV_UW25k31GQ&s' },
  { title: 'Plants vs Brainrots',     desc: 'Defend the garden',                  url: '/games/Plants vs Brainrots.html', image: 'https://growagardenio.io/data/image/game/PlantsvsBrainrots.png' },
  { title: 'Steal Brainrots',         desc: 'Brainrot heist',                     url: '/games/Steal Brainrots.html',     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJc5XiKDhpXf5bxAcVmZRGS_tTTElL0eIKw&s' },
];

/* ---------------- Tiny helpers ---------------- */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}
function safeWrite(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode etc. */ }
}

/* ---------------- Toast ---------------- */

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 1800);
}

/* ============================================================
   PORTAL PAGE (index.html)
   ============================================================ */

const grid = $('#grid');
if (grid) {
  const searchInput = $('#searchInput');
  const countEl     = $('#gameCount');
  const chips       = $$('#chips .chip');

  let favorites = safeRead('zh_favs', []);      // array of game urls
  let recents   = safeRead('zh_recents', []);   // array of game urls, newest first
  let filter    = 'all';
  let firstRender = true;

  const isFav = url => favorites.includes(url);

  function hueFor(title) {
    let h = 0;
    for (const ch of title) h = (h * 31 + ch.charCodeAt(0)) % 360;
    return h;
  }

  function cardHTML(game, index) {
    const img = game.image
      ? `<img class="card-img" src="${game.image}" alt="" loading="lazy" decoding="async" onerror="this.remove()">`
      : '';
    const letter = game.title.trim().charAt(0).toUpperCase();
    const flag   = filter === 'all' && recents[0] === game.url ? '<div class="card-flag">🕘 Recent</div>' : '';
    const fav    = isFav(game.url);
    const delay  = firstRender ? ` style="--d:${Math.min(index * 45, 450)}ms"` : '';
    return `<a class="card" href="game.html?game=${encodeURIComponent(game.url)}" data-url="${game.url}"${delay}>
      <div class="card-media" style="--h:${hueFor(game.title)}">
        <div class="card-fallback"><span>${letter}</span></div>
        ${img}
        ${flag}
        <div class="play-badge">▶</div>
      </div>
      <button class="fav-btn${fav ? ' active' : ''}" data-url="${game.url}" title="Toggle favorite" aria-label="Toggle favorite for ${game.title}">${fav ? '★' : '☆'}</button>
      <div class="card-body">
        <div class="card-title">${game.title}</div>
        <div class="card-desc">${game.desc}</div>
      </div>
    </a>`;
  }

  function emptyHTML() {
    const q = searchInput.value.trim();
    let big, line1, line2;
    if (filter === 'favorites' && !favorites.length) {
      [big, line1, line2] = ['☆', 'No favorites yet', 'Hit the star on any game to pin it here.'];
    } else if (filter === 'recent' && !recents.length) {
      [big, line1, line2] = ['🕘', 'No history yet', 'Games you open will show up here.'];
    } else if (q) {
      [big, line1, line2] = ['🔍', 'No games found', `Nothing matches \u201C${q}\u201D.`];
    } else {
      [big, line1, line2] = ['👾', 'Nothing here', 'Try a different filter.'];
    }
    return `<div class="empty"><span class="big">${big}</span><p><strong>${line1}</strong><br>${line2}</p></div>`;
  }

  function refreshChips() {
    chips.forEach(chip => chip.classList.toggle('active', chip.dataset.filter === filter));
  }

  function applyFilter() {
    const q = searchInput.value.trim().toLowerCase();
    let list = GAMES.filter(g =>
      g.title.toLowerCase().includes(q) || g.desc.toLowerCase().includes(q)
    );

    if (filter === 'favorites') {
      list = list.filter(g => isFav(g.url));
    } else if (filter === 'recent') {
      list = recents
        .map(url => list.find(g => g.url === url))
        .filter(Boolean);
    }

    grid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : emptyHTML();

    firstRender = false;

    if (countEl) {
      countEl.textContent = `${list.length} game${list.length === 1 ? '' : 's'}` +
        (filter === 'all' ? ' loaded' : '');
    }
  }

  /* --- favorites + recently-played recording (event delegation) --- */
  grid.addEventListener('click', e => {
    const favBtn = e.target.closest('.fav-btn');
    if (favBtn) {
      e.preventDefault();
      e.stopPropagation();
      const url = favBtn.dataset.url;
      favorites = isFav(url) ? favorites.filter(u => u !== url) : [...favorites, url];
      safeWrite('zh_favs', favorites);
      favBtn.classList.toggle('active', isFav(url));
      favBtn.textContent = isFav(url) ? '★' : '☆';
      toast(isFav(url) ? 'Added to favorites ★' : 'Removed from favorites');
      if (filter === 'favorites') applyFilter(); // drop it from the grid live
      return;
    }

    const card = e.target.closest('a.card');
    if (card) {
      const url = card.dataset.url;
      recents = [url, ...recents.filter(u => u !== url)].slice(0, 12);
      safeWrite('zh_recents', recents);
    }
  });

  /* --- search --- */
  searchInput.addEventListener('input', applyFilter);
  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const first = grid.querySelector('a.card');
      if (first) first.click();
    } else if (e.key === 'Escape') {
      if (searchInput.value) {
        searchInput.value = '';
        applyFilter();
      }
      searchInput.blur();
    }
  });

  /* --- filter chips --- */
  chips.forEach(chip => chip.addEventListener('click', () => {
    filter = chip.dataset.filter;
    refreshChips();
    applyFilter();
  }));

  /* --- global keyboard shortcuts --- */
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const active = document.activeElement;
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return;
      e.preventDefault();
      searchInput.focus();
    }
  });

  refreshChips();
  applyFilter();
}

/* ============================================================
   GAME PAGE (game.html)
   ============================================================ */

const frame = $('#gameFrame');
if (frame) {
  const params = new URLSearchParams(location.search);
  const url    = params.get('game');
  const titleEl = $('#gameTitle');

  if (url) {
    frame.src = url;
    const game = GAMES.find(g => g.url === url);
    const name = (game && game.title) || 'Game';
    document.title = `${name} — zj71's Game Hub`;
    if (titleEl) titleEl.textContent = name;
  } else {
    frame.src = '/';
    if (titleEl) titleEl.textContent = 'No game selected';
  }

  function goBack() {
    if (history.length > 1 && document.referrer) {
      history.back();
    } else {
      window.location.href = '/';
    }
  }
  window.goBack = goBack; // kept for older pages that call goBack()

  $('#backBtn')?.addEventListener('click', goBack);
  $('#reloadBtn')?.addEventListener('click', () => {
    try {
      frame.contentWindow.location.reload();
    } catch {
      frame.src = frame.src; // cross-origin fallback
    }
  });

  $('#fullscreenBtn')?.addEventListener('click', toggleFullscreen);
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      frame.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.();
    }
  }

  let autoHideTimer;
  const watermark = $('#deviceWatermark');
  function setTopbar(on) {
    document.body.classList.toggle('topbar-hidden', !on);
  }
  $('#hideBarBtn')?.addEventListener('click', () => setTopbar(false));
  $('#showBarBtn')?.addEventListener('click', () => setTopbar(true));

  $('#infoBtn')?.addEventListener('click', () => {
    clearTimeout(autoHideTimer);
    watermark?.classList.toggle('hidden');
  });

  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) setTopbar(!document.body.classList.contains('topbar-hidden'));
    if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) toggleFullscreen();
  });

  // Show device info briefly on open, then fade it out of the way
  watermark?.classList.remove('hidden');
  autoHideTimer = setTimeout(() => watermark?.classList.add('hidden'), 6000);
}

/* ============================================================
   DEVICE-INFO WATERMARK (any page containing #deviceWatermark)
   ============================================================ */

const watermarkEl = document.getElementById('deviceWatermark');
if (watermarkEl) {
  let frames = 0, lastTick = performance.now(), fps = 60;

  function tickFPS(now) {
    frames++;
    if (now - lastTick >= 500) {
      fps = Math.round(frames * 1000 / (now - lastTick));
      frames = 0;
      lastTick = now;
    }
    requestAnimationFrame(tickFPS);
  }
  requestAnimationFrame(tickFPS);

  let batteryAsked = false;
  let battery = 'N/A';

  function updateDeviceInfo() {
    const nav = navigator;
    if (typeof nav.getBattery === 'function' && !batteryAsked) {
      batteryAsked = true;
      nav.getBattery().then(b => {
        battery = `${Math.round(b.level * 100)}%${b.charging ? ' ⚡' : ''}`;
      }).catch(() => {});
    }
    const mem = nav.deviceMemory !== undefined ? `${nav.deviceMemory} GB` : 'N/A';
    const conn = nav.connection && nav.connection.effectiveType ? nav.connection.effectiveType : 'N/A';

    watermarkEl.textContent =
`— zj71's benchmarker —
TIME      ${new Date().toLocaleTimeString()}
FPS       ${fps}

PLATFORM  ${nav.platform}
CPU       ${nav.hardwareConcurrency || '?'} cores · RAM ${mem}
TOUCH     ${nav.maxTouchPoints > 0 ? 'yes' : 'no'}
DISPLAY   ${screen.width}×${screen.height} @ ${window.devicePixelRatio}x

NETWORK   ${conn}
BATTERY   ${battery}`;
  }

  setInterval(updateDeviceInfo, 500);
  updateDeviceInfo();
}
