/* Контент (услуги, цены, отзывы, вопросы, контакты) лежит в data.js — редактируйте его через admin.html.
   Этот файл содержит только тексты интерфейса и логику. */

/* ---------- icons ---------- */
const ICON_DIR = 'img/';
const ICON_EXT = { battery:'png', key:'png', pump:'png', gen:'png', starter:'png', diag:'png', tire:'svg', spare:'svg', susp:'svg', wire:'svg', lock:'svg' };
const iconSrc = k => ICON_DIR + (ICON_EXT[k] ? k : 'battery') + '.' + (ICON_EXT[k] || 'png');

const MINI = {
  clock: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12.500 3 3 5-6"/></svg>',
  shield: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 4 6v6c0 5 3.500 8 8 9 4.500-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  tag: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.500" cy="8.500" r="1.300"/></svg>'
};

/* ---------- тексты интерфейса ---------- */
const T = {
  title: 'Автоэлектрик Ташкент 24/7 — выездной автоэлектрик',
  desc: 'Выездной автоэлектрик в Ташкенте 24/7: прикурить аккумулятор, вскрыть авто, ремонт стартера и генератора, компьютерная диагностика. Приедем за 20 минут.',
  brand: 'Автоэлектрик', logo_sub: 'ташкент · круглосуточно', call_free: 'звонок бесплатный',
  nav_prices: 'Цены', nav_reviews: 'Отзывы', nav_faq: 'FAQ', nav_contact: 'Контакты',
  badge1: 'Выезд 24/7', badge2: 'Работаем по Ташкенту',
  h1a: 'Прикурим, вскроем авто, заведём', h1b: 'машину в Ташкенте',
  lead: 'Выездной автоэлектрик 24/7. <b>Приедем за 20 минут.</b> Диагностика бесплатно — цену назовём до начала работ.',
  cta_call: 'Вызвать автоэлектрика', cta_tg: 'Узнать стоимость в Telegram',
  note: 'Ответим за 5 минут. Можно прислать фото или видео проблемы.',
  live_masters: '{n} мастеров на смене', live_today: 'сегодня в Ташкенте',
  live_avg: 'Среднее время выезда', live_avg_v: '{n} мин', live_month: 'Выездов за месяц', live_rating: 'Рейтинг клиентов',
  live_online: 'Сейчас на линии — <b>принимаем заявки</b>',
  feat: [['clock','Выезд за 30 минут','По Ташкенту и области'],['check','Диагностика бесплатно','цену назовём до начала работ'],['shield','Гарантия на работы','без отговорок'],['tag','Цена фиксированная','без скрытых доплат']],
  pr_eyebrow: 'Цены', pr_title: 'Стоимость услуг', price_fmt: 'от {p} сум', fee_line: '+ выезд {fee} сум',
  pr_note: '+ выезд по Ташкенту — {fee} сум. Мастер назовёт точную стоимость до начала работ.', pr_cta: 'Узнать точную стоимость',
  adv_eyebrow: 'Преимущества', adv_title: 'Почему выбирают нас',
  proc_eyebrow: 'Процесс', proc_title: 'Как мы работаем',
  steps: [['Звонок','Позвоните или напишите в Telegram — опишите проблему.'],['Выезд','Мастер выезжает в течение 30 минут по всему Ташкенту.'],['Диагностика','Определяем причину на месте и называем точную стоимость.'],['Ремонт и оплата','Устраняем проблему — платите только за результат.']],
  ord_eyebrow: 'Вызов', ord_title: 'Вызвать автоэлектрика', ord_lead: 'Оставьте имя и телефон — мастер уточнит проблему и выедет в течение 20 минут по Ташкенту.',
  ord_1: 'Ответим за 5 минут', ord_2: 'Диагностика бесплатно', ord_3: 'Работаем без выходных',
  f_name: 'Ваше имя', f_name_ph: 'Например, Азиз', f_phone: 'Номер телефона', f_problem: 'Что случилось?',
  f_send: 'Вызвать мастера', f_tiny: 'После нажатия откроется Telegram с готовым сообщением.',
  f_err_name: 'Введите имя.', f_err_phone: 'Введите номер телефона полностью.', f_other: 'Другая проблема', f_ok: 'Открываем Telegram…',
  msg: (n, p, pr) => `Здравствуйте! Нужен автоэлектрик.\nИмя: ${n}\nТелефон: ${p}\nПроблема: ${pr}`,
  rev_eyebrow: 'Отзывы', rev_title: 'Отзывы клиентов', rev_lead: 'Более 200 отзывов в Google Maps и 2GIS',
  more: 'Читать далее', less: 'Свернуть',
  faq_eyebrow: 'FAQ', faq_title: 'Часто задаваемые вопросы',
  seo_title: 'Выездной автоэлектрик в Ташкенте — круглосуточно',
  seo_text: 'Выездной автоэлектрик в Ташкенте — приедем за 20 минут в любой район города. Прикурим аккумулятор, вскроем автомобиль, проведём компьютерную диагностику, проверим и отремонтируем на месте стартер, генератор, бензонасос и замок зажигания. Работаем 24/7 без выходных.',
  foot_text: 'Выездной автоэлектрик в Ташкенте с 2016 года.', foot_srv: 'Услуги', foot_nav: 'Навигация', foot_contact: 'Контакты',
  foot_hours: 'Работаем 24/7', foot_city: 'Ташкент, Узбекистан', rights: 'Все права защищены'
};

/* ---------- data (data.js, либо при ?preview=1 — копия из админки) ---------- */
const LS_KEY = 'avto_blue_v2';
let DATA = window.SITE_DATA || { config: {} };
try {
  if (new URLSearchParams(location.search).get('preview') === '1') {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) DATA = JSON.parse(raw);
  }
} catch (e) {}

/* ---------- helpers ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sub = (s, o) => String(s ?? '').replace(/\{(\w+)\}/g, (_, k) => o[k] ?? '');

function applyContacts() {
  const c = DATA.config || {};
  $$('.js-tel').forEach(a => a.href = 'tel:' + (c.phone || ''));
  $$('.js-tel-text').forEach(s => s.textContent = c.phoneShow || c.phone || '');
  $$('.js-tg').forEach(a => a.href = 'https://t.me/' + (c.telegram || ''));
  $$('.js-wa').forEach(a => a.href = 'https://wa.me/' + (c.whatsapp || ''));
}

function priceHtml(p) {
  // есть цифры -> «от 100 000 сум», иначе показываем текст как есть («По договорённости»)
  return /\d/.test(p) ? sub(T.price_fmt, { p: `<b>${esc(p)}</b>` }) : `<b class="pc__t">${esc(p)}</b>`;
}

/* ---------- render ---------- */
function render() {
  const c = DATA.config || {}, live = c.live || {}, fee = c.fee || '';

  $('#liveMasters').textContent = sub(T.live_masters, { n: live.masters });
  $('#liveAvg').textContent = sub(T.live_avg_v, { n: live.avg });
  $('#liveMonth').textContent = live.month || '';
  $('#liveRating').textContent = live.rating || '';

  $('#feat').innerHTML = T.feat.map(f => `<li><span class="feat__ic">${MINI[f[0]]}</span><div><b>${f[1]}</b><span>${f[2]}</span></div></li>`).join('');

  const sv = DATA.services || [];
  $('#prices-list').innerHTML = sv.map(s => `
    <article class="pc">
      <div class="pc__ic"><img src="${iconSrc(s[0])}" alt="" loading="lazy" width="72" height="72"></div>
      <h3>${esc(s[1])}</h3>
      <p class="pc__p">${priceHtml(s[2])}</p>
      <p class="pc__f">${esc(sub(T.fee_line, { fee }))}</p>
    </article>`).join('');
  $('#prNote').textContent = sub(T.pr_note, { fee });
  $('#foot-srv').innerHTML = sv.slice(0, 5).map(s => `<li>${esc(s[1])}</li>`).join('');

  $('#stats').innerHTML = (DATA.stats || []).map(s => `
    <div class="st"><div class="st__n">${esc(s[0])}${s[1] ? `<small>${esc(s[1])}</small>` : ''}</div><b>${esc(s[2])}</b><p>${esc(s[3])}</p></div>`).join('');

  $('#steps').innerHTML = T.steps.map(s => `<li><h3>${s[0]}</h3><p>${s[1]}</p></li>`).join('');

  const rv = DATA.reviews || [];
  $('#rev').innerHTML = rv.map(r => {
    const ini = String(r[0]).split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
    return `<article class="rv"><div class="rv__top"><div class="rv__av">${esc(ini)}</div><div><div class="rv__n">${esc(r[0])}</div><div class="rv__d">${esc(r[1])}</div></div><span class="stars" aria-label="5/5">★★★★★</span></div><p class="clamp">${esc(r[2])}</p><button type="button" class="more" hidden>${T.more}</button></article>`;
  }).join('');
  $('#dots').innerHTML = rv.map((_, i) => `<i data-i="${i}"></i>`).join('');
  $$('#dots i').forEach(i => i.addEventListener('click', () => goRev(+i.dataset.i)));
  updateDots();

  $('#faq-list').innerHTML = (DATA.faq || []).map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f[0])}</summary><p>${esc(sub(f[1], { fee }))}</p></details>`).join('');

  $('#fProblem').innerHTML = sv.map(s => `<option value="${esc(s[1])}">${esc(s[1])}</option>`).join('') + `<option value="${esc(T.f_other)}">${esc(T.f_other)}</option>`;

  requestAnimationFrame(setupClamps);
}

function setupClamps() {
  $$('.rv').forEach(card => {
    const p = $('p', card), b = $('.more', card);
    p.classList.remove('open'); b.textContent = T.more;
    b.hidden = !(p.scrollHeight > p.clientHeight + 2);
    b.onclick = () => { const o = p.classList.toggle('open'); b.textContent = o ? T.less : T.more; };
  });
  const sp = $('#seoText'), sb = $('#seoMore');
  sp.classList.remove('open'); sb.textContent = T.more;
  sb.hidden = !(sp.scrollHeight > sp.clientHeight + 2);
  sb.onclick = () => { const o = sp.classList.toggle('open'); sb.textContent = o ? T.less : T.more; };
}

/* ---------- статические тексты ---------- */
function applyText() {
  document.title = T.title;
  const md = $('meta[name="description"]'); if (md) md.content = T.desc;
  $$('[data-i18n]').forEach(el => { const v = T[el.dataset.i18n]; if (typeof v === 'string') el.textContent = v; });
  $$('[data-i18n-html]').forEach(el => { const v = T[el.dataset.i18nHtml]; if (typeof v === 'string') el.innerHTML = v; });
  $$('[data-i18n-ph]').forEach(el => { el.placeholder = T[el.dataset.i18nPh] || ''; });
}

/* ---------- слайдер отзывов ---------- */
const rev = $('#rev');
function step() { const c = $('.rv', rev); return c ? c.offsetWidth + 18 : 0; }
function goRev(i) { rev.scrollTo({ left: i * step(), behavior: 'smooth' }); }
function updateDots() { const i = Math.round(rev.scrollLeft / (step() || 1)); $$('#dots i').forEach((d, k) => d.classList.toggle('is-on', k === i)); }
rev.addEventListener('scroll', () => requestAnimationFrame(updateDots), { passive: true });
$('#revPrev').addEventListener('click', () => rev.scrollBy({ left: -step(), behavior: 'smooth' }));
$('#revNext').addEventListener('click', () => {
  const end = rev.scrollLeft + rev.clientWidth >= rev.scrollWidth - 4;
  end ? rev.scrollTo({ left: 0, behavior: 'smooth' }) : rev.scrollBy({ left: step(), behavior: 'smooth' });
});

/* ---------- FAQ: открыт один пункт ---------- */
$('#faq-list').addEventListener('toggle', e => {
  if (e.target.open) $$('#faq-list details').forEach(d => { if (d !== e.target) d.open = false; });
}, true);

/* ---------- форма -> Telegram ---------- */
function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 3200); }
$('#form').addEventListener('submit', e => {
  e.preventDefault();
  const n = $('#fName'), p = $('#fPhone'), err = $('#fErr');
  n.classList.remove('bad'); p.classList.remove('bad'); err.textContent = '';
  if (n.value.trim().length < 2) { n.classList.add('bad'); err.textContent = T.f_err_name; n.focus(); return; }
  if (p.value.replace(/\D/g, '').length < 9) { p.classList.add('bad'); err.textContent = T.f_err_phone; p.focus(); return; }
  toast(T.f_ok);
  const tg = (DATA.config || {}).telegram || '';
  window.open('https://t.me/' + tg + '?text=' + encodeURIComponent(T.msg(n.value.trim(), p.value.trim(), $('#fProblem').value)), '_blank', 'noopener');
});
$('#fPhone').addEventListener('input', e => { e.target.value = e.target.value.replace(/[^\d+\s()-]/g, ''); });

let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(setupClamps, 200); });

/* ---------- init ---------- */
$('#year').textContent = new Date().getFullYear();
applyContacts();
applyText();
render();
