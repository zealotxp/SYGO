import re, os

SRC = os.path.join(os.path.dirname(__file__), '..', 'index.html')
SRC = os.path.abspath(SRC)
html = open(SRC, encoding='utf-8').read()

base = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))

# ---- CSS ----
m = re.search(r'<style>(.*?)</style>', html, re.S)
open(os.path.join(base, 'css', 'common.css'), 'w', encoding='utf-8').write(m.group(1))
print('CSS bytes:', len(m.group(1)))

# ---- main inline script (the one without src, containing drugsData) ----
scripts = re.findall(r'<script>(.*?)</script>', html, re.S)
appjs = max(scripts, key=len)  # the big one
open(os.path.join(base, 'js', 'app.raw.js'), 'w', encoding='utf-8').write(appjs)
print('app.raw.js bytes:', len(appjs))

# ---- pages ----
PAGE_IDS = ['loginPage','homePage','allDrugsPage','allMerchantsPage','searchPage',
            'drugDetailPage','merchantDetailPage','appointmentPage','myAppointmentsPage',
            'profilePage','aboutPage','privacyPage','agreementPage','mapPickerPage']
page_pat = re.compile(r'<div[^>]*id="(' + '|'.join(PAGE_IDS) + r')"[^>]*>')
marks = [(mm.start(), mm.group(1)) for mm in page_pat.finditer(html)]
script_start = html.index('<script>', marks[0][0])
for i,(pos,pid) in enumerate(marks):
    end = marks[i+1][0] if i+1 < len(marks) else script_start
    block = html[pos:end]
    open(os.path.join(base, 'pages_raw', pid + '.html'), 'w', encoding='utf-8').write(block)
    print('page', pid, 'bytes', len(block))

# ---- modals (sequential siblings before loginPage) ----
MODAL_IDS = ['locationModal','qrModal','successModal','verifyModal','cancelConfirmModal','merchantPicker']
modal_pat = re.compile(r'<div[^>]*id="(' + '|'.join(MODAL_IDS) + r')"[^>]*>')
mmarks = [(mm.start(), mm.group(1)) for mm in modal_pat.finditer(html)]
login_start = html.index('id="loginPage"')
mmarks.append((login_start, '__login__'))
for i,(pos,mid) in enumerate(mmarks):
    if mid == '__login__':
        break
    end = mmarks[i+1][0]
    block = html[pos:end]
    open(os.path.join(base, 'modals_raw', mid + '.html'), 'w', encoding='utf-8').write(block)
    print('modal', mid, 'bytes', len(block))

# toast
tm = re.search(r'<div class="toast" id="toast">.*?</div>', html, re.S)
open(os.path.join(base, 'modals_raw', 'toast.html'), 'w', encoding='utf-8').write(tm.group(0))
print('toast bytes', len(tm.group(0)))
print('DONE')
