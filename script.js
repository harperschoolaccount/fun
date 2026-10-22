/* ============================================================
   zj71's Game Hub — script.js
   ------------------------------------------------------------
   ADDING A NEW GAME: add one line to the GAMES array below:

     { title: 'My Game', desc: 'Short description',
       url: 'games/my-game/index.html', image: 'https://...' }

   • Paths are relative to this file — no leading slash — so the
     hub works whether it's hosted at the domain root or a subfolder.
   • image is optional — a generated gradient tile is used instead.
   • Favorites (★) and Recently played (🕘) are saved in
     localStorage on this browser.
   • Games open directly inside game.html (external sites are
     framed straight from their own URLs), with a back / reload /
     pop-out / fullscreen toolbar. If a site refuses to be
     embedded, a styled notice explains it with a one-click
     "open in new tab" fallback.
   ============================================================ */

'use strict';

/* ---------------- Data ---------------- */

const GAMES = [
  { title: 'FNAF 1',              desc: 'Survive five spooky nights',         url: 'https://ozgames.io/five-nights-at-freddys.embed',     image: 'https://play-lh.googleusercontent.com/myJ2kwywsCRglKkZuHBq6Aku9PX7HB75v-8KbnTK9JOPU6z0hpD9xtvjiTGqrn-e4eI' },
  { title: 'Geometry Dash',       desc: 'One-touch rhythm platformer',        url: 'https://ozgames.io/geometry-dash.embed',              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUiJgoAoVVcg9FA3_3NHHC4SkocpWthaYbg&s' },
  { title: 'GD World',            desc: 'A new Geometry Dash journey',        url: 'https://ozgames.io/geometry-dash-world.embed',        image: 'https://play-lh.googleusercontent.com/eu0Lv1QtDbCdVvuphJh84zxKNURIEcXjmZPhAv4NM4Xacfjum9TspfYkzRcBKv4zpDk=w240-h480-rw' },
  { title: 'Geometry Vibes',      desc: 'Another GD-style challenge',         url: 'https://ozgames.io/geometry-dash-wave.embed',         image: 'https://play-lh.googleusercontent.com/FRj1dX1U-hdtQVSZkEtjzyo1iRh-cVGidQwMo_Mcp_-HBvVw7ojiEhayL7wrsOQNLOk' },
  { title: 'Minecraft',           desc: 'Eaglercraft 1.8, in your browser',   url: 'games/mc/ULTIMATE 1.8 zj71 eagler craft.html',        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png' },
  { title: 'Minecraft 1.12',      desc: 'Eaglercraft 1.12, in your browser',  url: 'games/mc/Eaglercraft_1.12_Offline_en_US.html',        image: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Minecraft_2024_cover_art.png/250px-Minecraft_2024_cover_art.png' },
  { title: 'Among Us',            desc: 'Find the impostor',                  url: 'https://ozgames.io/among-us.embed',                   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL4pC911RR8_8f9fN7T2AYbgBWfH-lv8DX7w&s' },
  { title: 'Happy Wheels',        desc: 'Physics-based mayhem',               url: 'https://ozgames.io/happy-wheels.embed',               image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcm4QoLNNEvP5lvZKJg9WgFLV_UW25k31GQ&s' },
  { title: 'Kour.io',             desc: 'Online FPS battles',                 url: 'https://kour.io',                                     image: 'https://play-lh.googleusercontent.com/-7D4gqeabC8nF4bSxsrTf3IgnbVP7fL-Bq3jLo6507VcwNe28WSR8ufykib-QZULrq8=w240-h480-rw' },
  { title: 'Kourstrike.io',       desc: 'Tactical shooter',                   url: 'https://kourstrike.io',                               image: 'https://legionmain.netlify.app/res/scopeditems/kourstrike.io.png' },
  { title: 'Overtide.io',         desc: 'Multiplayer shooter',                url: 'https://overtide.io',                                 image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4igXR8ZVbHu1uKa7r8nM8wVFJDFjBmrN81w&s' },
  { title: 'Veck.io',             desc: 'Fast arena shooter',                 url: 'https://veck.io',                                     image: 'https://kizgame.com/thumbs/veck-io_2.webp' },
  { title: 'UNO Online',          desc: 'Shed your cards first to win',       url: 'https://ozgames.io/uno-online.embed',                 image: '' },
  { title: 'Ragdoll Playground',  desc: 'Physics sandbox ragdolls',           url: 'https://ozgames.io/ragdoll-playground.embed',         image: '' },
  { title: 'Plants vs Brainrots', desc: 'Defend the garden',                  url: 'https://ozgames.io/plants-vs-brainrots-online.embed', image: 'https://growagardenio.io/data/image/game/PlantsvsBrainrots.png' },
  { title: 'Steal Brainrots',     desc: 'Brainrot heist',                     url: 'https://ozgames.io/steal-brainrots.embed',            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZJc5XiKDhpXf5bxAcVmZRGS_tTTElL0eIKw&s' },
  { title: 'Rob a Brainrot 2',    desc: 'The sequel heist',                   url: 'https://ozgames.io/rob-brainrot-2-0.embed',           image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdLxerHkBauEVpdGPdD-GOR2he4ASkez8ylQ&s' },
  { title: 'Tab Chats',           desc: 'The ultimate LAN chatting platform', url: 'https://tabchats.lovable.app/',                       image: 'https://static.vecteezy.com/system/resources/thumbnails/006/692/321/small/chatting-message-icon-template-black-color-editable-chatting-message-icon-symbol-flat-illustration-for-graphic-and-web-design-free-vector.jpg' },
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

/* ---------------- Back navigation ---------------- */

// Defined globally so the legacy game wrappers (whose Home buttons call
// goBack()) always work — whether loaded standalone or inside the
// game.html viewer frame.
window.goBack = function () {
  let w = window;
  try {
    if (window.parent && window.parent !== window) {
      // Inside the viewer's frame: send the parent back instead, so the
      // toolbar stays out of the returned page.
      w = window.parent;
      if (w.history.length > 1 && w.document.referrer) { w.history.back(); return; }
    }
  } catch { /* cross-origin parent — fall through */ }
  if (history.length > 1 && document.referrer) {
    history.back();
  } else {
    window.location.href = './index.html';
  }
};

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

  // Guard against corrupt or tampered localStorage payloads, and
  // migrate entries saved by older versions (root-relative paths,
  // wrapper pages, group pages) to the current direct game URLs.
  const LEGACY_URL_MAP = {
    'games/tc/index.html':                    'https://tabchats.lovable.app/',
    'games/fnaf/index.html':                  'https://ozgames.io/five-nights-at-freddys.embed',
    'games/fnaf/FNAF.html':                   'https://ozgames.io/five-nights-at-freddys.embed',
    'games/gd/index.html':                    'https://ozgames.io/geometry-dash.embed',
    'games/gd/Geometry Dash (kids).html':     'https://ozgames.io/geometry-dash.embed',
    'games/gd/GD World.html':                 'https://ozgames.io/geometry-dash-world.embed',
    'games/gd/Geometry Vibes.html':           'https://ozgames.io/geometry-dash-wave.embed',
    'games/mc/index.html':                    'games/mc/ULTIMATE 1.8 zj71 eagler craft.html',
    'games/Among Us.html':                    'https://ozgames.io/among-us.embed',
    'games/Happy Wheels.html':                'https://ozgames.io/happy-wheels.embed',
    'games/UNO Online.html':                  'https://ozgames.io/uno-online.embed',
    'games/Ragdoll Playground.html':          'https://ozgames.io/ragdoll-playground.embed',
    'games/Plants vs Brainrots.html':         'https://ozgames.io/plants-vs-brainrots-online.embed',
    'games/Steal Brainrots.html':             'https://ozgames.io/steal-brainrots.embed',
    'games/Rob a Brainrot 2.html':            'https://ozgames.io/rob-brainrot-2-0.embed',
    'games/legion platforms/index.html':      'https://kour.io',
    'games/legion platforms/kour.io.html':    'https://kour.io',
    'games/legion platforms/kourstrike.io.html': 'https://kourstrike.io',
    'games/legion platforms/overtide.io.html':   'https://overtide.io',
    'games/legion platforms/veck.io.html':       'https://veck.io',
    'games/random/':                          null, // placeholder page, not a real game — drop it
  };
  const migrateUrl = stored => {
    const cleaned = String(stored).replace(/^\/+/, '');
    return cleaned in LEGACY_URL_MAP ? LEGACY_URL_MAP[cleaned] : cleaned;
  };
  const asUrlList = v => Array.isArray(v)
    ? v.filter(u => typeof u === 'string').map(migrateUrl).filter(Boolean)
    : [];
  let favorites = asUrlList(safeRead('zh_favs', []));      // array of game urls
  let recents   = asUrlList(safeRead('zh_recents', []));   // array of game urls, newest first
  let filter    = 'all';
  let firstRender = true;
  let lastRenderKey = null;

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
    const flag   = filter === 'all' && recents[0] === game.url ? '<div class="card-flag">Recent</div>' : '';
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
    let line1, line2;
    if (filter === 'favorites' && !favorites.length) {
      [line1, line2] = ['No favorites yet', 'Hit the star on any game to pin it here.'];
    } else if (filter === 'recent' && !recents.length) {
      [line1, line2] = ['No history yet', 'Games you open will show up here.'];
    } else if (q) {
      [line1, line2] = ['No games found', `Nothing matches \u201C${q}\u201D.`];
    } else {
      [line1, line2] = ['Nothing here', 'Try a different filter.'];
    }
    return `<div class="empty"><p><strong>${line1}</strong><br>${line2}</p></div>`;
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

    // Only touch the DOM when the visible list actually changes —
    // skips redundant rebuilds (and image re-fetch flashes) while typing.
    const key = list.length
      ? `${filter}:${list.map(g => g.url).join('|')}`
      : `empty:${filter}:${q}`;
    firstRender = false;
    if (key === lastRenderKey) return;
    lastRenderKey = key;

    grid.innerHTML = list.length
      ? list.map(cardHTML).join('')
      : emptyHTML();

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
   LEGACY GROUP PAGES (games/gd/, games/mc/, games/fnaf/, …)
   Old menu pages whose buttons carry data-url. The hub now links
   to individual games directly, but these pages can still be
   reached via old saved "Recent" entries — so make them work.
   ============================================================ */

document.querySelectorAll('.card-button[data-url]').forEach(btn => {
  const dest = btn.dataset.url;
  if (dest) btn.addEventListener('click', () => { window.location.href = dest; });
});

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
    frame.src = './index.html';
    if (titleEl) titleEl.textContent = 'No game selected';
  }

  $('#backBtn')?.addEventListener('click', window.goBack);
  $('#reloadBtn')?.addEventListener('click', () => {
    try {
      frame.contentWindow.location.reload();
    } catch {
      frame.src = frame.src; // cross-origin fallback
    }
  });

  $('#openBtn')?.addEventListener('click', () => {
    // Escape hatch for sites that refuse to be embedded. If the popup
    // is blocked, navigate this window instead so the button always
    // does something.
    if (!url) return;
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
  });

  // Detect embedding refused by the site (X-Frame-Options / CSP /
  // server-side 403). A cross-origin load throws on access — that
  // means it loaded fine. A refused frame reports either a null
  // document (Chromium) or an about:blank document (Firefox).
  const notice = $('#frameNotice');
  let host = '';
  try { host = url ? new URL(url, location.href).hostname : ''; } catch { /* relative */ }

  frame.addEventListener('load', () => {
    setTimeout(() => {
      if (!url) return;
      try {
        const doc = frame.contentDocument;
        const href = doc && doc.location ? doc.location.href : null;
        if (doc === null || href === 'about:blank') {
          if (host) {
            const el = $('#noticeText');
            el.innerHTML = `<strong>${host} won't run inside the frame</strong><br>this portal only allows embedding from sites it has approved — play it directly instead.`;
          }
          notice.hidden = false;
        }
      } catch { /* cross-origin page loaded successfully */ }
    }, 150);
  });

  $('#noticePlayBtn')?.addEventListener('click', () => {
    if (!url) return;
    const win = window.open(url, '_blank', 'noopener');
    if (!win) window.location.href = url;
  });

  $('#noticeRetryBtn')?.addEventListener('click', () => {
    notice.hidden = true;
    frame.src = url; // re-attempt the frame load
  });

  $('#fullscreenBtn')?.addEventListener('click', toggleFullscreen);
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      frame.requestFullscreen?.().catch(() => {});
    }
  }

  function setTopbar(on) {
    document.body.classList.toggle('topbar-hidden', !on);
  }
  $('#hideBarBtn')?.addEventListener('click', () => setTopbar(false));
  $('#showBarBtn')?.addEventListener('click', () => setTopbar(true));

  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.metaKey) setTopbar(!document.body.classList.contains('topbar-hidden'));
    if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) toggleFullscreen();
  });
}

