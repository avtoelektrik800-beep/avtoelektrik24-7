/* ============================================================
   Admin parol. Quyidagi qiymatni o‘zgartiring!
   Diqqat: bu faqat oddiy qulf. Parol fayl ichida ochiq turadi,
   haqiqiy himoya emas (batafsil “Yordam” bo‘limida).
   Sayt matnlari faqat RUS tilida kiritiladi.
   ============================================================ */
const ADMIN_PASS = 'admin123';
const LS_KEY = 'avto_blue_v2';

const ICON_NAMES = {
  battery: 'Akkumulyator', key: 'Kalit / mashinani ochish', pump: 'Benzonasos', gen: 'Generator', starter: 'Starter',
  diag: 'Kompyuter diagnostikasi', tire: 'Shinomontaj', spare: 'Zaxira g‘ildirak', susp: 'Yurish qismi (podveska)',
  wire: 'Simlar', lock: 'Yoqish qulfi'
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- model <-> data.js ---------- */
function fromData(d) {
  const cfg = d.config || {};
  return {
    config: Object.assign({ phone: '', phoneShow: '', telegram: '', whatsapp: '', fee: '' }, cfg, { live: Object.assign({ masters: '', avg: '', month: '', rating: '' }, cfg.live) }),
    services: (d.services || []).map(s => ({ icon: s[0], name: s[1], price: s[2] })),
    stats: (d.stats || []).map(s => ({ n: s[0], s: s[1], label: s[2], desc: s[3] })),
    reviews: (d.reviews || []).map(v => ({ name: v[0], date: v[1], text: v[2] })),
    faq: (d.faq || []).map(q => ({ q: q[0], a: q[1] }))
  };
}
const toData = m => ({
  config: m.config,
  services: m.services.map(s => [s.icon, s.name, s.price]),
  stats: m.stats.map(s => [s.n, s.s, s.label, s.desc]),
  reviews: m.reviews.map(v => [v.name, v.date, v.text]),
  faq: m.faq.map(q => [q.q, q.a])
});
const toFile = m => '/* Данные сайта. Файл, скачанный из админ-панели, заменяет этот файл. */\nwindow.SITE_DATA = ' + JSON.stringify(toData(m), null, 2) + ';\n';

/* ---------- state ---------- */
let M, tab = 'config', dirty = false;
function load() {
  let d = window.SITE_DATA || {};
  try { const raw = localStorage.getItem(LS_KEY); if (raw) d = JSON.parse(raw); } catch (e) {}
  M = fromData(d);
}
function persist() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(toData(M))); } catch (e) { toast('Brauzerda saqlab bo‘lmadi'); }
  dirty = true;
  const s = $('#state'); s.classList.add('dirty');
  s.textContent = 'Brauzerda saqlandi. Internetga chiqarish uchun “data.js yuklab olish” ni bosing va faylni hostingga yuklang.';
}
function toast(t) { const el = $('#toast'); el.textContent = t; el.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), 2600); }

/* ---------- field helpers ---------- */
const get = (o, p) => p.split('.').reduce((a, k) => a?.[k], o);
function set(o, p, v) { const k = p.split('.'); const last = k.pop(); k.reduce((a, x) => a[x], o)[last] = v; }
const field = (p, label, opt = {}) => {
  const v = esc(get(M, p));
  const inner = opt.area ? `<textarea data-p="${p}">${v}</textarea>` : `<input data-p="${p}" value="${v}"${opt.ph ? ` placeholder="${esc(opt.ph)}"` : ''}>`;
  return `<label class="${opt.full ? 'full' : ''}">${label}${inner}${opt.hint ? `<span class="hint">${opt.hint}</span>` : ''}</label>`;
};
const bar = (kind, i, n, title) => `
  <div class="item__bar"><b>${esc(title) || '(nomsiz)'}</b>
    <button class="btn btn--sm" data-act="up" data-k="${kind}" data-i="${i}" ${i === 0 ? 'disabled' : ''} title="Yuqoriga">↑</button>
    <button class="btn btn--sm" data-act="down" data-k="${kind}" data-i="${i}" ${i === n - 1 ? 'disabled' : ''} title="Pastga">↓</button>
    <button class="btn btn--sm btn--danger" data-act="del" data-k="${kind}" data-i="${i}">O‘chirish</button>
  </div>`;

/* ---------- tabs ---------- */
const VIEWS = {
  config() {
    return `<div class="box"><h2>Aloqa ma’lumotlari</h2><p>Sayt bo‘ylab telefon, Telegram va WhatsApp tugmalari shu yerdan olinadi.</p>
      <div class="grid">
        ${field('config.phone', 'Telefon (qo‘ng‘iroq uchun)', { ph: '+998901234567', hint: 'Probelsiz, + bilan boshlang.' })}
        ${field('config.phoneShow', 'Saytda ko‘rinadigan raqam', { ph: '+998 90 123 45 67' })}
        ${field('config.telegram', 'Telegram username', { ph: 'avtoelektrik_uz', hint: '@ belgisiz yozing.' })}
        ${field('config.whatsapp', 'WhatsApp raqami', { ph: '998901234567', hint: '+ belgisiz, faqat raqamlar.' })}
        ${field('config.fee', 'Chiqish narxi (сум)', { ph: '100 000', hint: 'Narxlar va FAQ ichida avtomatik chiqadi.' })}
      </div></div>
      <div class="box"><h2>“Сейчас на линии” kartochkasi</h2><p>Bosh sahifadagi o‘ng tomondagi kartochka raqamlari.</p>
      <div class="grid">
        ${field('config.live.masters', 'Smenadagi ustalar soni', { ph: '8' })}
        ${field('config.live.avg', 'O‘rtacha yetib borish (daqiqa)', { ph: '20' })}
        ${field('config.live.month', 'Oyiga chiqishlar', { ph: '968' })}
        ${field('config.live.rating', 'Reyting', { ph: '4.8', hint: 'Faqat haqiqiy reytingni yozing.' })}
      </div></div>`;
  },
  services() {
    const list = M.services.map((s, i) => `
      <div class="item">${bar('services', i, M.services.length, s.name)}
        <div class="item__body"><div class="grid">
          ${field(`services.${i}.name`, 'Название (rus tilida)')}
          ${field(`services.${i}.price`, 'Narxi', { ph: '100 000', hint: 'Raqam yozsangiz: “от 100 000 сум”. Matn yozsangiz (masalan “По договорённости”) o‘sha holda chiqadi.' })}
          <label class="full">Ikonka<select data-p="services.${i}.icon">${Object.entries(ICON_NAMES).map(([k, n]) => `<option value="${k}"${k === s.icon ? ' selected' : ''}>${n}</option>`).join('')}</select></label>
        </div></div></div>`).join('');
    return `<div class="box"><h2>Xizmatlar va narxlar</h2><p>Qo‘shing, tahrirlang, tartibini o‘zgartiring yoki o‘chiring.</p></div>${list}<button class="add" data-act="add" data-k="services">+ Yangi xizmat qo‘shish</button>`;
  },
  stats() {
    const list = M.stats.map((s, i) => `
      <div class="item">${bar('stats', i, M.stats.length, s.n + (s.s || '') + ' ' + s.label)}
        <div class="item__body"><div class="grid">
          ${field(`stats.${i}.n`, 'Katta raqam', { ph: '10', hint: 'Masalan: 10, 24/7, 900.' })}
          ${field(`stats.${i}.s`, 'Raqamdan keyingi yozuv', { ph: ' лет', hint: 'Masalan “ лет”, “+”, “ сум”.' })}
          ${field(`stats.${i}.label`, 'Заголовок')}
          ${field(`stats.${i}.desc`, 'Пояснение', { area: 1 })}
        </div></div></div>`).join('');
    return `<div class="box"><h2>Afzalliklar</h2><p>“Почему выбирают нас” bo‘limidagi raqamli kartochkalar.</p></div>${list}<button class="add" data-act="add" data-k="stats">+ Kartochka qo‘shish</button>`;
  },
  reviews() {
    const list = M.reviews.map((v, i) => `
      <div class="item">${bar('reviews', i, M.reviews.length, v.name)}
        <div class="item__body"><div class="grid">
          ${field(`reviews.${i}.name`, 'Имя')}
          ${field(`reviews.${i}.date`, 'Когда', { ph: '1 месяц назад' })}
          <div class="full">${field(`reviews.${i}.text`, 'Текст отзыва', { area: 1 })}</div>
        </div></div></div>`).join('');
    return `<div class="box"><h2>Mijozlar sharhlari</h2><p>Faqat haqiqiy mijozlar sharhlarini qo‘ying.</p></div>${list}<button class="add" data-act="add" data-k="reviews">+ Sharh qo‘shish</button>`;
  },
  faq() {
    const list = M.faq.map((q, i) => `
      <div class="item">${bar('faq', i, M.faq.length, q.q)}
        <div class="item__body">
          ${field(`faq.${i}.q`, 'Вопрос')}<div style="height:10px"></div>${field(`faq.${i}.a`, 'Ответ', { area: 1 })}
        </div></div>`).join('');
    return `<div class="box"><h2>Ko‘p beriladigan savollar</h2><p>Javob ichida <code>{fee}</code> yozsangiz, u chiqish narxi bilan almashadi.</p></div>${list}<button class="add" data-act="add" data-k="faq">+ Savol qo‘shish</button>`;
  },
  help() {
    return `<div class="box help"><h2>Qanday ishlaydi</h2>
      <ol>
        <li>O‘zgartirishlarni kiriting (sayt matnlari faqat rus tilida): ular avtomatik <b>shu brauzerda</b> saqlanadi.</li>
        <li><b>“Saytda ko‘rish”</b> tugmasi saytni yangi o‘zgarishlar bilan ochadi (faqat sizga ko‘rinadi).</li>
        <li>Hammasi to‘g‘ri bo‘lsa, <b>“data.js yuklab olish”</b> ni bosing.</li>
        <li>Yuklab olingan <code>data.js</code> faylni hostingdagi (GitHub’dagi) eski <code>data.js</code> o‘rniga qo‘ying.</li>
      </ol>
      <div class="warn"><b>Muhim:</b> bu panel serversiz ishlaydi, shuning uchun o‘zgarishlar hamma uchun faqat <code>data.js</code> yangilanganda paydo bo‘ladi. Parol <code>admin.js</code> ichida ochiq turadi: u tasodifan kirib qolishdan saqlaydi, xaker uchun to‘siq emas. <code>admin.html</code> havolasini boshqalarga bermang.</div>
      <p style="margin-top:14px"><button class="btn btn--danger" data-act="reset">Brauzerdagi o‘zgarishlarni bekor qilish</button></p>
    </div>`;
  }
};
const BLANK = {
  services: () => ({ icon: 'battery', name: 'Новая услуга', price: 'По договорённости' }),
  stats: () => ({ n: '0', s: '', label: '', desc: '' }),
  reviews: () => ({ name: '', date: '', text: '' }),
  faq: () => ({ q: '', a: '' })
};

function render() {
  const y = scrollY;
  $('#panel').innerHTML = VIEWS[tab]();
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
  scrollTo(0, y);
}

/* ---------- events ---------- */
const onField = e => { const p = e.target.dataset.p; if (!p) return; set(M, p, e.target.value); persist(); };
$('#panel').addEventListener('input', onField);
$('#panel').addEventListener('change', onField);
$('#panel').addEventListener('click', e => {
  const b = e.target.closest('[data-act]'); if (!b) return;
  const { act, k } = b.dataset, i = +b.dataset.i;
  if (act === 'add') { M[k].push(BLANK[k]()); persist(); render(); scrollTo(0, document.body.scrollHeight); return; }
  if (act === 'del') { if (confirm('O‘chirilsinmi?')) { M[k].splice(i, 1); persist(); render(); } return; }
  if (act === 'up' || act === 'down') { const j = act === 'up' ? i - 1 : i + 1; if (j < 0 || j >= M[k].length) return; [M[k][i], M[k][j]] = [M[k][j], M[k][i]]; persist(); render(); return; }
  if (act === 'reset') {
    if (!confirm('Brauzerda saqlangan o‘zgarishlar o‘chadi va data.js holatiga qaytiladi. Davom etasizmi?')) return;
    try { localStorage.removeItem(LS_KEY); } catch (er) {}
    load(); dirty = false; $('#state').classList.remove('dirty'); $('#state').textContent = 'Asl holatga qaytarildi'; render();
  }
});
$('#tabs').addEventListener('click', e => { const b = e.target.closest('button'); if (b) { tab = b.dataset.tab; render(); scrollTo(0, 0); } });
$('#btnPreview').addEventListener('click', () => window.open('index.html?preview=1', '_blank'));
$('#btnDownload').addEventListener('click', () => {
  const blob = new Blob([toFile(M)], { type: 'text/javascript;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'data.js';
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  dirty = false; toast('data.js yuklab olindi. Uni hostingdagi eski fayl o‘rniga qo‘ying.');
});
$('#btnLogout').addEventListener('click', () => { try { sessionStorage.removeItem('avto_blue_admin'); } catch (e) {} location.reload(); });

/* ---------- login ---------- */
function enter() { $('#login').hidden = true; $('#app').hidden = false; load(); render(); }
$('#loginForm').addEventListener('submit', e => {
  e.preventDefault();
  if ($('#pass').value === ADMIN_PASS) { try { sessionStorage.setItem('avto_blue_admin', '1'); } catch (er) {} enter(); }
  else $('#loginErr').textContent = 'Parol noto‘g‘ri';
});
try { if (sessionStorage.getItem('avto_blue_admin') === '1') enter(); } catch (e) {}
window.addEventListener('beforeunload', e => { if (dirty) { e.preventDefault(); e.returnValue = ''; } });
