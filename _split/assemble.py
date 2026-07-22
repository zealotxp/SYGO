import re, os

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
MOD = lambda n: open(os.path.join(BASE, 'modals_raw', n + '.html'), encoding='utf-8').read().strip()
PAGE = lambda n: open(os.path.join(BASE, 'pages_raw', n + '.html'), encoding='utf-8').read()

LEAFLET_CSS = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" />'
LEAFLET_JS = '<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>'

TABBAR = '''  <div class="tab-bar" id="tabBar">
    <div class="tab-item{home}" onclick="switchTab('home')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
      <span>首页</span>
    </div>
    <div class="tab-item{academic}" onclick="switchTab('academic')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      <span>学术</span>
    </div>
    <div class="tab-item{ai}" onclick="switchTab('ai')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 9.5a1.5 1.5 0 1 1 1.5 1.5M15 9.5a1.5 1.5 0 1 1 1.5 1.5"/><path d="M8 15c1 1.3 2.5 2 4 2s3-.7 4-2"/></svg>
      <span>AI</span>
    </div>
    <div class="tab-item{appt}" onclick="goMyAppointments()">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      <span>预约</span>
    </div>
    <div class="tab-item{profile}" onclick="switchTab('profile')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      <span>我的</span>
    </div>
  </div>'''

# (file, srcPage, title, data-page, hasTab, tabActive, modals, leaflet, extra_replace)
PAGES = [
    ('index.html', 'homePage', '上药GO - 便民找药平台', 'home', True, 'home', ['locationModal','toast'], False, None),
    ('search.html', 'searchPage', '搜索 - 上药GO', 'search', True, None, ['toast'], False, None),
    ('academic.html', 'academicPage', '学术园地 - 上药GO', 'academic', True, 'academic', ['toast'], False, None),
    ('academic-detail.html', 'academicDetailPage', '文章详情 - 上药GO', 'academic-detail', False, None, ['toast'], False, None),
    ('academic-search.html', 'academicSearchPage', '文章搜索 - 上药GO', 'academic-search', False, None, ['toast'], False, None),
    ('ai.html', 'aiPage', 'AI 智能体 - 上药GO', 'ai', True, 'ai', ['toast','imagePreviewModal'], False, None),
    ('all-drugs.html', 'allDrugsPage', '全部药品 - 上药GO', 'allDrugs', False, None, ['toast'], False, None),
    ('all-merchants.html', 'allMerchantsPage', '全部商家 - 上药GO', 'allMerchants', False, None, ['locationModal','toast'], False, None),
    ('drug-detail.html', 'drugDetailPage', '药品详情 - 上药GO', 'drug-detail', False, None, ['qrModal','toast'], False, ('onclick="goAppointment()"', 'onclick="goAppointmentForDrug()"')),
    ('merchant-detail.html', 'merchantDetailPage', '商家详情 - 上药GO', 'merchant-detail', False, None, ['qrModal','toast','imagePreviewModal'], False, None),
    ('appointment.html', 'appointmentPage', '预约购药 - 上药GO', 'appointment', False, None, ['successModal','merchantPicker','toast'], False, None),
    ('my-appointments.html', 'myAppointmentsPage', '我的预约 - 上药GO', 'my-appointments', True, 'appt', ['toast'], False, None),
    ('profile.html', 'profilePage', '我的 - 上药GO', 'profile', True, 'profile', ['qrModal','toast'], False, None),
    ('about.html', 'aboutPage', '关于我们 - 上药GO', 'about', False, None, ['toast'], False, None),
    ('privacy.html', 'privacyPage', '隐私政策 - 上药GO', 'privacy', False, None, ['toast'], False, None),
    ('agreement.html', 'agreementPage', '用户协议 - 上药GO', 'agreement', False, None, ['toast'], False, None),
    ('map-picker.html', 'mapPickerPage', '选择位置 - 上药GO', 'map-picker', False, None, ['toast'], True, None),
    ('login.html', 'loginPage', '登录 - 上药GO', 'login', False, None, ['toast'], False, None),
    ('merchant-login.html', 'merchantLoginPage', '商家登录 - 上药GO', 'merchant-login', False, None, ['toast'], False, None),
    ('merchant.html', 'merchantPage', '商家中心 - 上药GO', 'merchant', False, None, ['toast'], False, None),
    ('merchant-orders.html', 'merchantOrdersPage', '预约订单 - 上药GO', 'merchant-orders', False, None, ['toast'], False, None),
    ('merchant-stats.html', 'merchantStatsPage', '订单统计 - 上药GO', 'merchant-stats', False, None, ['toast'], False, None),
    ('merchant-products.html', 'merchantProductsPage', '商品管理 - 上药GO', 'merchant-products', False, None, ['toast'], False, None),
    ('merchant-store.html', 'merchantStorePage', '店铺信息 - 上药GO', 'merchant-store', False, None, ['imagePreviewModal','toast'], False, None),
    ('merchant-change-password.html', 'merchantChangePasswordPage', '修改密码 - 上药GO', 'merchant-change-password', False, None, ['toast'], False, None),
]

for (file, src, title, page, hasTab, tabActive, modals, leaflet, extra) in PAGES:
    block = PAGE(src)
    # strip own-line HTML comments (next-page boundary comments etc.)
    block = re.sub(r'^\s*<!--.*-->\s*$', '', block, flags=re.M)
    # ensure the root page div is visible (add 'active' to its class, whatever the class is)
    block = re.sub(r'<div class="([^"]*)"', lambda m: '<div class="%s"' % (m.group(1) + ' active' if 'active' not in m.group(1) else m.group(1)), block, count=1)
    if extra:
        block = block.replace(extra[0], extra[1])
    modal_html = '\n'.join(MOD(m) for m in modals)
    tabbar = ''
    if hasTab:
        a = {'home':'','academic':'','ai':'','appt':'','profile':''}
        if tabActive: a[tabActive] = ' active'
        tabbar = TABBAR.format(**a)
    head = '''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>{title}</title>
<link rel="stylesheet" href="css/common.css">
{lfcss}
</head>
<body data-page="{page}">
<div class="app-container" id="app">
'''.format(title=title, lfcss=(LEAFLET_CSS+'\n') if leaflet else '', page=page)
    tail = '''
</div>
{lfjs}
<script src="js/app.js"></script>
</body>
</html>
'''.format(lfjs=('\n'+LEAFLET_JS) if leaflet else '')
    out = head + modal_html + '\n' + block + '\n' + tabbar + tail
    open(os.path.join(BASE, file), 'w', encoding='utf-8').write(out)
    print('wrote', file, len(out), 'bytes')

print('ASSEMBLE DONE')
