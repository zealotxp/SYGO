# -*- coding: utf-8 -*-
"""生成商家门头照(store1~8.svg)与资质证书(cert-*.svg)占位图到 images/。
这些 SVG 是原型占位图，正式上线时把 merchantsData 的 hero/certs 换成真实图片 URL 即可。
"""
import os

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
IMG = os.path.join(BASE, 'images')
os.makedirs(IMG, exist_ok=True)

# (id, 商家名) —— 与 js/app.js 的 merchantsData 保持一致
MERCHANTS = [
    (1, '仁济诊所(浦东店)'),
    (2, '国大诊所(徐汇店)'),
    (3, '益丰诊所(静安店)'),
    (4, '老百姓诊所(长宁店)'),
    (5, '华氏诊所(杨浦店)'),
    (6, '海王星辰诊所(虹口店)'),
    (7, '第一医药诊所(黄浦店)'),
    (8, '复美诊所(普陀店)'),
]

GREEN = '#07c160'
GREEN_L = '#eafaf1'


def storefront_svg(name):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="400" height="220" viewBox="0 0 400 220">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cdeede"/>
      <stop offset="1" stop-color="#eafaf1"/>
    </linearGradient>
    <linearGradient id="bld" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#f1f6f3"/>
    </linearGradient>
  </defs>
  <rect width="400" height="220" fill="url(#sky)"/>
  <rect x="70" y="72" width="260" height="118" fill="url(#bld)" stroke="#d7e3dd"/>
  <rect x="60" y="60" width="280" height="20" fill="{GREEN}"/>
  <g fill="#ffffff" opacity="0.85">
    <rect x="60" y="60" width="28" height="20"/>
    <rect x="116" y="60" width="28" height="20"/>
    <rect x="172" y="60" width="28" height="20"/>
    <rect x="228" y="60" width="28" height="20"/>
    <rect x="284" y="60" width="28" height="20"/>
    <rect x="340" y="60" width="20" height="20"/>
  </g>
  <rect x="92" y="92" width="216" height="30" rx="6" fill="{GREEN}"/>
  <text x="200" y="113" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="15" fill="#ffffff" font-weight="700">{name}</text>
  <rect x="100" y="134" width="42" height="56" fill="#dff3e8" stroke="#cfe6dc"/>
  <rect x="258" y="134" width="42" height="56" fill="#dff3e8" stroke="#cfe6dc"/>
  <g fill="{GREEN}">
    <rect x="193" y="150" width="14" height="5"/>
    <rect x="197.5" y="145.5" width="5" height="14"/>
  </g>
  <rect x="0" y="190" width="400" height="30" fill="#e4ece8"/>
</svg>
'''


def cert_svg(title, code):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="420" height="580" viewBox="0 0 420 580">
  <rect width="420" height="580" fill="#fbfbf7"/>
  <rect x="14" y="14" width="392" height="552" fill="none" stroke="#c9a24b" stroke-width="3"/>
  <rect x="22" y="22" width="376" height="536" fill="none" stroke="#c9a24b" stroke-width="1"/>
  <circle cx="210" cy="118" r="46" fill="{GREEN}"/>
  <text x="210" y="132" text-anchor="middle" font-size="42" fill="#ffffff">✚</text>
  <text x="210" y="222" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, serif" font-size="28" font-weight="800" fill="#b8860b">{title}</text>
  <text x="210" y="256" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="14" fill="#888">上药GO · 便民找药平台</text>
  <g font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="14" fill="#555">
    <text x="60" y="320">统一社会信用代码：{code}</text>
    <text x="60" y="352">名　　称：示例医疗机构</text>
    <text x="60" y="384">类　　型：营利性医疗机构</text>
    <text x="60" y="416">经营范围：血液制品及处方药零售</text>
    <text x="60" y="448">有效期至：2029-12-31</text>
  </g>
  <circle cx="322" cy="500" r="40" fill="none" stroke="#d33" stroke-width="3"/>
  <text x="322" y="496" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="13" fill="#d33" font-weight="700">认证专用章</text>
  <text x="322" y="514" text-anchor="middle" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="11" fill="#d33">上药GO</text>
</svg>
'''


def main():
    for mid, name in MERCHANTS:
        p = os.path.join(IMG, f'store{mid}.svg')
        with open(p, 'w', encoding='utf-8') as f:
            f.write(storefront_svg(name))
        print('wrote', os.path.relpath(p, BASE))
    certs = [
        ('cert-business.svg', '营业执照', '91310000XXXXXXXXXX'),
        ('cert-pharma.svg', '药品经营许可证', '沪证字 YP2024XXXX'),
        ('cert-gmp.svg', '药品GSP认证', 'GSP-2024-XXXXXX'),
    ]
    for fn, title, code in certs:
        p = os.path.join(IMG, fn)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(cert_svg(title, code))
        print('wrote', os.path.relpath(p, BASE))
    print('DONE')


if __name__ == '__main__':
    main()
