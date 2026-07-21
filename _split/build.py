import re, os

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(BASE, 'index.html')
html = open(SRC, encoding='utf-8').read()

# ---------- 1) re-extract modals cleanly (each ends at next sibling marker) ----------
MODAL_IDS = ['locationModal','qrModal','successModal','verifyModal','cancelConfirmModal','merchantPicker','toast']
modal_pat = re.compile(r'<div[^>]*id="(' + '|'.join(MODAL_IDS) + r')"[^>]*>')
mmarks = [(mm.start(), mm.group(1)) for mm in modal_pat.finditer(html)]
login_start = html.index('id="loginPage"')
mmarks.append((login_start, '__login__'))
modals = {}
for i,(pos,mid) in enumerate(mmarks):
    if mid == '__login__':
        break
    end = mmarks[i+1][0]
    modals[mid] = html[pos:end].strip()

# ---------- 2) build js/app.js from app.raw.js ----------
raw = open(os.path.join(BASE, 'js', 'app.raw.js'), encoding='utf-8').read()

def rep(text, old, new):
    cnt = text.count(old)
    if cnt != 1:
        raise SystemExit('REPLACE FAILED (count=%d):\n%r' % (cnt, old[:80]))
    return text.replace(old, new, 1)

# (A) Navigation core
oldA = """// ===== Navigation =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('searchPage').classList.remove('active');
  document.getElementById('loginPage').classList.remove('active');
  
  if (pageId === 'search') {
    document.getElementById('searchPage').classList.add('active');
    setTimeout(() => document.getElementById('searchInput').focus(), 300);
  } else if (pageId === 'login') {
    document.getElementById('loginPage').classList.add('active');
  } else {
    document.getElementById(pageId + 'Page').classList.add('active');
  }
  // Tab bar visible on: home, search, myAppointments, profile
  const tabPages = ['home', 'search', 'myAppointments', 'profile'];
  document.getElementById('tabBar').style.display = tabPages.includes(pageId) ? 'flex' : 'none';
  currentPage = pageId;
  if (pageId === 'appointment') prefillAppointment();
  window.scrollTo(0, 0);
}

function switchTab(tab) {
  document.querySelectorAll('.tab-item').forEach((t, i) => {
    const tabMap = ['home', 'search', 'myAppointments', 'profile'];
    t.classList.toggle('active', tabMap[i] === tab);
  });
  pageHistory = [tab];
  if (tab === 'search') {
    showPage('search');
  } else if (tab === 'myAppointments') {
    showPage('myAppointments');
  } else {
    showPage(tab);
  }
}

function goBack() {
  if (pageHistory.length > 1) {
    pageHistory.pop();
    const prev = pageHistory[pageHistory.length - 1];
    showPage(prev);
    const tabPages = ['home','search','myAppointments','profile'];
    if (tabPages.includes(prev)) {
      document.querySelectorAll('.tab-item').forEach((t, i) => {
        const tabMap = ['home', 'search', 'myAppointments', 'profile'];
        t.classList.toggle('active', tabMap[i] === prev);
      });
    }
  } else {
    switchTab('home');
  }
}

function goHome() {
  pageHistory = ['home'];
  switchTab('home');
}"""
newA = """// ===== Navigation (MPA: 真实多页跳转) =====
const PAGE_FILE = {
  home:'index.html', search:'search.html', allDrugs:'all-drugs.html', allMerchants:'all-merchants.html',
  drugDetail:'drug-detail.html', merchantDetail:'merchant-detail.html', appointment:'appointment.html',
  myAppointments:'my-appointments.html', profile:'profile.html', about:'about.html',
  privacy:'privacy.html', agreement:'agreement.html', mapPicker:'map-picker.html', login:'login.html'
};
function getParam(name){ const p = new URLSearchParams(location.search); return p.get(name); }
function showPage(pageId){ const f = PAGE_FILE[pageId]; if (f) location.href = f; }
function switchTab(tab){ const map={home:'index.html',search:'search.html',myAppointments:'my-appointments.html',profile:'profile.html'}; location.href = map[tab] || 'index.html'; }
function goHome(){ location.href = 'index.html'; }
function goBack(){ if (history.length > 1) history.back(); else location.href = 'index.html'; }"""
raw = rep(raw, oldA, newA)

# (B) goAllDrugs / goAllMerchants
raw = rep(raw, """// ===== Page Navigation =====
function goAllDrugs() {
  pageHistory.push(currentPage);
  showPage('allDrugs');
}

function goAllMerchants() {
  pageHistory.push(currentPage);
  showPage('allMerchants');
}""",
"""// ===== Page Navigation =====
function goAllDrugs() { location.href = 'all-drugs.html'; }
function goAllMerchants() { location.href = 'all-merchants.html'; }""")

# (C) goDrugDetail -> redirect + renderDrugDetail
oldC = """function goDrugDetail(id) {
  currentDrugId = id;
  const drug = drugsData.find(d => d.id === id) || drugsData[0];
  pageHistory.push(currentPage);

  // Update drug detail page dynamically
  const imgEl = document.querySelector('#drugDetailPage .drug-detail-img');
  if (drug.img) {
    imgEl.innerHTML = '<img src="' + drug.img + '" alt="' + drug.name + '">';
  } else {
    imgEl.innerHTML = '<span style="font-size:80px;">' + (drug.emoji || '💊') + '</span>';
    imgEl.style.background = drug.emojiBg || 'var(--primary-light)';
  }
  document.getElementById('drugDetailName').textContent = drug.name;
  document.getElementById('drugDetailSpec').textContent = drug.spec;
  document.getElementById('drugDetailSpec2').textContent = drug.spec2;

  // Update info section: 药品介绍下方放几个药品占位图（不再显示文字）
  const placeholderImgs = ['drug1.jpg','drug2.jpg','drug3.jpg','drug4.jpg','drug5.jpg','drug6.jpg'];
  let galleryHtml = '<div class="drug-intro-gallery">';
  placeholderImgs.forEach(src => {
    galleryHtml += '<div class="drug-intro-thumb"><img src="images/' + src + '" alt="药品占位图" loading="lazy"></div>';
  });
  galleryHtml += '</div>';
  const introEl = document.getElementById('drugDetailIntro');
  if (introEl) introEl.innerHTML = galleryHtml;

  // Update nearby merchants section
  const nearbySection = document.querySelector('#drugDetailPage .nearby-merchant-section');
  const nearbyItems = nearbySection.querySelectorAll('.nearby-merchant-item');
  const availableMerchants = merchantsData.filter(m => drug.merchants && drug.merchants.includes(m.id));
  let html = '<div class="drug-info-title">附近有货商家</div>';
  availableMerchants.forEach(m => {
    html += '<div class="nearby-merchant-item" onclick="goMerchantDetail(' + m.id + ')">'
      + '<div class="nearby-merchant-avatar">' + m.icon + '</div>'
      + '<div class="nearby-merchant-info">'
      + '<div class="nearby-merchant-name">' + m.name + '</div>'
      + '<div class="nearby-merchant-addr">' + m.addr + '</div>'
      + '</div>'
      + '<div class="nearby-merchant-right">'
      + '<div class="nearby-merchant-dist">' + m.distance + '</div>'
      + '<div class="nearby-merchant-stock">有货</div>'
      + '</div></div>';
  });
  html += '<div class="loading-more">— 已显示全部商家 —</div>';
  nearbySection.innerHTML = html;

  showPage('drugDetail');
}"""
newC = """function goDrugDetail(id) { location.href = 'drug-detail.html?id=' + id; }

// 药品详情渲染（在 drug-detail.html 加载时调用）
function renderDrugDetail(id) {
  currentDrugId = id;
  const drug = drugsData.find(d => d.id === id) || drugsData[0];
  const imgEl = document.querySelector('#drugDetailPage .drug-detail-img');
  if (imgEl) {
    if (drug.img) {
      imgEl.innerHTML = '<img src="' + drug.img + '" alt="' + drug.name + '">';
    } else {
      imgEl.innerHTML = '<span style="font-size:80px;">' + (drug.emoji || '💊') + '</span>';
      imgEl.style.background = drug.emojiBg || 'var(--primary-light)';
    }
  }
  const nEl = document.getElementById('drugDetailName'); if (nEl) nEl.textContent = drug.name;
  const sEl = document.getElementById('drugDetailSpec'); if (sEl) sEl.textContent = drug.spec;
  const s2El = document.getElementById('drugDetailSpec2'); if (s2El) s2El.textContent = drug.spec2;

  const placeholderImgs = ['drug1.jpg','drug2.jpg','drug3.jpg','drug4.jpg','drug5.jpg','drug6.jpg'];
  let galleryHtml = '<div class="drug-intro-gallery">';
  placeholderImgs.forEach(src => {
    galleryHtml += '<div class="drug-intro-thumb"><img src="images/' + src + '" alt="药品占位图" loading="lazy"></div>';
  });
  galleryHtml += '</div>';
  const introEl = document.getElementById('drugDetailIntro');
  if (introEl) introEl.innerHTML = galleryHtml;

  const nearbySection = document.querySelector('#drugDetailPage .nearby-merchant-section');
  if (nearbySection) {
    const availableMerchants = merchantsData.filter(m => drug.merchants && drug.merchants.includes(m.id));
    let html = '<div class="drug-info-title">附近有货商家</div>';
    availableMerchants.forEach(m => {
      html += '<div class="nearby-merchant-item" onclick="goMerchantDetail(' + m.id + ')">'
        + '<div class="nearby-merchant-avatar">' + m.icon + '</div>'
        + '<div class="nearby-merchant-info">'
        + '<div class="nearby-merchant-name">' + m.name + '</div>'
        + '<div class="nearby-merchant-addr">' + m.addr + '</div>'
        + '</div>'
        + '<div class="nearby-merchant-right">'
        + '<div class="nearby-merchant-dist">' + m.distance + '</div>'
        + '<div class="nearby-merchant-stock">有货</div>'
        + '</div></div>';
    });
    html += '<div class="loading-more">— 已显示全部商家 —</div>';
    nearbySection.innerHTML = html;
  }
}"""
raw = rep(raw, oldC, newC)

# (D) goMerchantDetail -> redirect + renderMerchantDetail
oldD = """function goMerchantDetail(id) {
  currentMerchantId = id;
  const merchant = merchantsData.find(m => m.id === id) || merchantsData[0];
  pageHistory.push(currentPage);

  // Update merchant detail page dynamically
  const hero = document.querySelector('#merchantDetailPage .merchant-detail-hero');
  hero.textContent = merchant.icon;

  const card = document.querySelector('#merchantDetailPage .merchant-detail-card');
  card.querySelector('.merchant-detail-name').innerHTML = merchant.name + (merchant.certified ? ' <span class="cert-badge">✓ 执业资质</span>' : '');
  const rows = card.querySelectorAll('.merchant-detail-row');
  rows[0].querySelector('span').textContent = merchant.addr;
  rows[1].querySelector('a').textContent = merchant.phone;
  rows[2].querySelector('span').textContent = '营业时间：' + merchant.hours;

  // Update drugs on sale section
  const drugSection = document.querySelector('#merchantDetailPage .nearby-merchant-section');
  const availableDrugs = drugsData.filter(d => merchant.drugs && merchant.drugs.includes(d.id));
  let html = '<div class="drug-info-title">在售药品</div>';
  availableDrugs.forEach(d => {
    const imgHtml = d.img
      ? '<div class="nearby-merchant-avatar"><img src="' + d.img + '" alt=""></div>'
      : '<div class="nearby-merchant-avatar" style="font-size:20px;">' + (d.emoji || '💊') + '</div>';
    html += '<div class="nearby-merchant-item" onclick="goDrugDetail(' + d.id + ')">'
      + imgHtml
      + '<div class="nearby-merchant-info">'
      + '<div class="nearby-merchant-name">' + d.name + '</div>'
      + '<div class="nearby-merchant-addr">' + d.spec + ' · ' + d.spec2 + '</div>'
      + '</div>'
      + '<div class="nearby-merchant-right">'
      + '<div class="nearby-merchant-stock">有货</div>'
      + '<button class="btn-sm btn-sm-primary merchant-book-btn" onclick="event.stopPropagation(); bookDrugAtMerchant(' + d.id + ',' + merchant.id + ')">预约</button>'
      + '</div></div>';
  });
  drugSection.innerHTML = html;

  showPage('merchantDetail');
}"""
newD = """function goMerchantDetail(id) { location.href = 'merchant-detail.html?id=' + id; }

// 商家详情渲染（在 merchant-detail.html 加载时调用）
function renderMerchantDetail(id) {
  currentMerchantId = id;
  const merchant = merchantsData.find(m => m.id === id) || merchantsData[0];
  const hero = document.querySelector('#merchantDetailPage .merchant-detail-hero');
  if (hero) hero.textContent = merchant.icon;

  const card = document.querySelector('#merchantDetailPage .merchant-detail-card');
  if (card) {
    const nameEl = card.querySelector('.merchant-detail-name');
    if (nameEl) nameEl.innerHTML = merchant.name + (merchant.certified ? ' <span class="cert-badge">✓ 执业资质</span>' : '');
    const rows = card.querySelectorAll('.merchant-detail-row');
    if (rows[0]) { const s = rows[0].querySelector('span'); if (s) s.textContent = merchant.addr; }
    if (rows[1]) { const a = rows[1].querySelector('a'); if (a) a.textContent = merchant.phone; }
    if (rows[2]) { const s = rows[2].querySelector('span'); if (s) s.textContent = '营业时间：' + merchant.hours; }
  }

  const drugSection = document.querySelector('#merchantDetailPage .nearby-merchant-section');
  if (drugSection) {
    const availableDrugs = drugsData.filter(d => merchant.drugs && merchant.drugs.includes(d.id));
    let html = '<div class="drug-info-title">在售药品</div>';
    availableDrugs.forEach(d => {
      const imgHtml = d.img
        ? '<div class="nearby-merchant-avatar"><img src="' + d.img + '" alt=""></div>'
        : '<div class="nearby-merchant-avatar" style="font-size:20px;">' + (d.emoji || '💊') + '</div>';
      html += '<div class="nearby-merchant-item" onclick="goDrugDetail(' + d.id + ')">'
        + imgHtml
        + '<div class="nearby-merchant-info">'
        + '<div class="nearby-merchant-name">' + d.name + '</div>'
        + '<div class="nearby-merchant-addr">' + d.spec + ' · ' + d.spec2 + '</div>'
        + '</div>'
        + '<div class="nearby-merchant-right">'
        + '<div class="nearby-merchant-stock">有货</div>'
        + '<button class="btn-sm btn-sm-primary merchant-book-btn" onclick="event.stopPropagation(); bookDrugAtMerchant(' + d.id + ',' + merchant.id + ')">预约</button>'
        + '</div></div>';
    });
    drugSection.innerHTML = html;
  }
}"""
raw = rep(raw, oldD, newD)

# (E) appointment navigations
raw = rep(raw, """function goAppointment() {
  if (!isLoggedIn) {
    loginTargetPage = 'appointment';
    showPage('login');
    return;
  }
  pageHistory.push(currentPage);
  // Pre-fill drug from current drug detail context
  const drug = drugsData.find(d => d.id === currentDrugId);
  if (drug) {
    document.getElementById('appointDrug').value = drug.name + ' ' + drug.spec2;
  }
  showPage('appointment');
}""",
"""function goAppointment() {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html'); return; }
  location.href = 'appointment.html';
}
function goAppointmentForDrug() {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html?drug=' + currentDrugId); return; }
  location.href = 'appointment.html?drug=' + currentDrugId;
}""")

raw = rep(raw, """function goAppointmentWithMerchant() {
  if (!isLoggedIn) {
    loginTargetPage = 'appointment';
    showPage('login');
    return;
  }
  pageHistory.push(currentPage);
  // Pre-fill both drug and merchant from current context
  const drug = drugsData.find(d => d.id === currentDrugId);
  const merchant = merchantsData.find(m => m.id === currentMerchantId);
  if (drug) {
    document.getElementById('appointDrug').value = drug.name + ' ' + drug.spec2;
  }
  if (merchant) {
    document.getElementById('appointMerchantText').textContent = merchant.name;
  }
  showPage('appointment');
}""",
"""function goAppointmentWithMerchant() {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html'); return; }
  location.href = 'appointment.html';
}""")

raw = rep(raw, """function bookDrugAtMerchant(drugId, merchantId) {
  if (!isLoggedIn) {
    loginTargetPage = 'appointment';
    showPage('login');
    return;
  }
  currentDrugId = drugId;
  currentMerchantId = merchantId;
  const drug = drugsData.find(d => d.id === drugId);
  const merchant = merchantsData.find(m => m.id === merchantId);
  if (drug) {
    document.getElementById('appointDrug').value = drug.name + ' ' + drug.spec2;
  }
  if (merchant) {
    document.getElementById('appointMerchantText').textContent = merchant.name;
  }
  pageHistory.push(currentPage);
  showPage('appointment');
}""",
"""function bookDrugAtMerchant(drugId, merchantId) {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html?drug=' + drugId + '&merchant=' + merchantId); return; }
  location.href = 'appointment.html?drug=' + drugId + '&merchant=' + merchantId;
}""")

# (F) goMyAppointments / goSearch
raw = rep(raw, """function goMyAppointments() {
  pageHistory = ['myAppointments'];
  showPage('myAppointments');
  document.querySelectorAll('.tab-item').forEach((t, i) => {
    const tabMap = ['home', 'search', 'myAppointments', 'profile'];
    t.classList.toggle('active', tabMap[i] === 'myAppointments');
  });
}""",
"""function goMyAppointments() { location.href = 'my-appointments.html'; }""")

raw = rep(raw, """function goSearch() {
  pageHistory = ['search'];
  showPage('search');
  document.querySelectorAll('.tab-item').forEach((t, i) => {
    const tabMap = ['home', 'search', 'myAppointments', 'profile'];
    t.classList.toggle('active', tabMap[i] === 'search');
  });
}""",
"""function goSearch() { location.href = 'search.html'; }""")

# (G) showMapPicker
raw = rep(raw, """function showMapPicker() {
  pageHistory.push(currentPage);
  showPage('mapPicker');
  document.getElementById('pickerCityName').textContent = currentPickerProvince + ' · ' + currentPickerCity + ' · ' + currentPickerDistrict;
  setTimeout(() => initMapPicker(), 200);
}""",
"""function showMapPicker() { location.href = 'map-picker.html'; }""")

# (H) confirmLocation
raw = rep(raw, """function confirmLocation() {
  const region = selectedLocation.province + '·' + selectedLocation.city + '·' + selectedLocation.district;
  const addr = selectedLocation.name ? region + ' ' + selectedLocation.name : region;
  document.getElementById('locText').textContent = addr;
  showToast('已更新定位：' + addr);
  goBack();
}""",
"""function confirmLocation() {
  const region = selectedLocation.province + '·' + selectedLocation.city + '·' + selectedLocation.district;
  const addr = selectedLocation.name ? region + ' ' + selectedLocation.name : region;
  try { sessionStorage.setItem('userLocation', addr); } catch(e) {}
  showToast('已更新定位：' + addr);
  location.href = 'index.html';
}""")

# (I) allowLocation / denyLocation guard
raw = rep(raw, """function allowLocation() {
  document.getElementById('locationModal').classList.remove('show');
  document.getElementById('locText').textContent = '上海市浦东新区张杨路';
}
function denyLocation() {
  document.getElementById('locationModal').classList.remove('show');
  document.getElementById('locText').textContent = '未获取定位 · 点击选择';
}""",
"""function allowLocation() {
  const m = document.getElementById('locationModal'); if (m) m.classList.remove('show');
  const t = document.getElementById('locText'); if (t) t.textContent = '上海市浦东新区张杨路';
  try { sessionStorage.setItem('userLocation', '上海市浦东新区张杨路'); } catch(e) {}
}
function denyLocation() {
  const m = document.getElementById('locationModal'); if (m) m.classList.remove('show');
  const t = document.getElementById('locText'); if (t) t.textContent = '未获取定位 · 点击选择';
}""")

# (J) prefillAppointment
raw = rep(raw, """function prefillAppointment() {
  const phoneEl = document.getElementById('appointPhone');
  if (phoneEl) {
    phoneEl.value = loginPhone || '';
    validatePhone(phoneEl);
  }
  const qtyEl = document.getElementById('appointQty');
  if (qtyEl) qtyEl.textContent = '1';
}""",
"""function prefillAppointment() {
  const drugId = parseInt(getParam('drug')) || currentDrugId;
  const merchantId = parseInt(getParam('merchant')) || currentMerchantId;
  if (drugId) {
    currentDrugId = drugId;
    const d = drugsData.find(x => x.id === drugId);
    const de = document.getElementById('appointDrug');
    if (d && de) de.value = d.name + ' ' + d.spec2;
  }
  if (merchantId) {
    currentMerchantId = merchantId;
    const m = merchantsData.find(x => x.id === merchantId);
    const me = document.getElementById('appointMerchantText');
    if (m && me) me.textContent = m.name;
  }
  const phoneEl = document.getElementById('appointPhone');
  if (phoneEl) {
    phoneEl.value = loginPhone || '';
    validatePhone(phoneEl);
  }
  const qtyEl = document.getElementById('appointQty');
  if (qtyEl) qtyEl.textContent = '1';
}""")

# (K) closeSuccessModal
raw = rep(raw, """function closeSuccessModal() {
  document.getElementById('successModal').classList.remove('show');
  goHome();
}""",
"""function closeSuccessModal() {
  const m = document.getElementById('successModal'); if (m) m.classList.remove('show');
  location.href = 'index.html';
}""")

# (L) doLogin
raw = rep(raw, """function doLogin() {
  const lp = (document.getElementById('loginPhone')?.value || '').trim();
  if (lp && /^1[3-9]\\d{9}$/.test(lp)) {
    loginPhone = lp;
  }
  isLoggedIn = true;
  document.getElementById('loginPage').classList.remove('active');
  // Login success - go to the page that was being accessed before login
  const targetPage = loginTargetPage || 'home';
  loginTargetPage = null;
  if (['home','search','myAppointments','profile'].includes(targetPage)) {
    switchTab(targetPage);
  } else {
    pageHistory.push(currentPage);
    showPage(targetPage);
  }
}""",
"""function doLogin() {
  const lp = (document.getElementById('loginPhone')?.value || '').trim();
  if (lp && /^1[3-9]\\d{9}$/.test(lp)) {
    loginPhone = lp;
  }
  isLoggedIn = true;
  const redirect = getParam('redirect') || sessionStorage.getItem('redirectAfterLogin') || 'index.html';
  try { sessionStorage.removeItem('redirectAfterLogin'); } catch(e) {}
  location.href = redirect;
}""")

# (M) showAbout / showPrivacy / showUserAgreement
raw = rep(raw, """function showAbout() {
  pageHistory.push(currentPage);
  showPage('about');
}
function showPrivacy() {
  pageHistory.push(currentPage);
  showPage('privacy');
}
function showUserAgreement() {
  pageHistory.push(currentPage);
  showPage('agreement');
}""",
"""function showAbout() { location.href = 'about.html'; }
function showPrivacy() { location.href = 'privacy.html'; }
function showUserAgreement() { location.href = 'agreement.html'; }""")

# (N) cancelSearch
raw = rep(raw, """function cancelSearch() {
  document.getElementById('searchInput').value = '';
  clearSearch();
  switchTab('home');
}""",
"""function cancelSearch() { location.href = 'index.html'; }""")

# (O) DOMContentLoaded init
raw = rep(raw, """// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  initSwiper();
  initDateSelector();
  initFeaturedSection();
  // Show location permission on first visit
  setTimeout(() => showLocationModal(), 1000);
});""",
"""// ===== Init (按页面分发) =====
function restoreLocation() {
  const t = document.getElementById('locText');
  if (!t) return;
  let addr = '';
  try { addr = sessionStorage.getItem('userLocation') || ''; } catch(e) {}
  t.textContent = addr || '上海市浦东新区张杨路';
}
document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page;
  if (page === 'home') {
    restoreLocation();
    initSwiper();
    initFeaturedSection();
    setTimeout(() => showLocationModal(), 1000);
  } else if (page === 'drug-detail') {
    renderDrugDetail(parseInt(getParam('id')) || 1);
  } else if (page === 'merchant-detail') {
    renderMerchantDetail(parseInt(getParam('id')) || 1);
  } else if (page === 'appointment') {
    initDateSelector();
    prefillAppointment();
  } else if (page === 'map-picker') {
    setTimeout(() => initMapPicker(), 200);
  }
});""")

open(os.path.join(BASE, 'js', 'app.js'), 'w', encoding='utf-8').write(raw)
print('app.js written, bytes:', len(raw))

# save modals for assembly
import json
os.makedirs(os.path.join(BASE, 'modals_raw'), exist_ok=True)
for k,v in modals.items():
    open(os.path.join(BASE, 'modals_raw', k + '.html'), 'w', encoding='utf-8').write(v)
print('modals extracted:', list(modals.keys()))
print('BUILD STEP 2 DONE')
