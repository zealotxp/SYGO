#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate sample Chinese academic PDFs for the 上药GO 学术园地 demo.
Each article gets a real PDF (with embedded subset CJK font) so that
预览/下载 buttons work end-to-end in the static prototype.
"""
import os, re, glob
from fontTools.subset import Subsetter, Options
from fontTools.ttLib import TTFont
from fpdf import FPDF

BASE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(BASE, 'articles')
os.makedirs(OUT, exist_ok=True)
FONT = r'C:/Windows/Fonts/simhei.ttf'

# Clean any previously generated pdfs
for f in glob.glob(os.path.join(OUT, '*.pdf')):
    os.remove(f)

# ---- Article dataset (mirrors js ARTICLES) ----
ARTICLES = [
    dict(id='a1', title='静注人免疫球蛋白在原发性免疫缺陷病中的应用专家共识', author='中国药师协会', date='2026-06-18',
         cat='c1-1-1', summary='本文系统阐述了静注人免疫球蛋白(IVIG)在原发性免疫缺陷病(PID)中的适应证、给药方案与安全性管理，为临床合理用药提供循证依据。'),
    dict(id='a2', title='人血白蛋白在肝硬化腹水治疗中的循证评价', author='中华医学会肝病学分会', date='2026-06-10',
         cat='c1-1-2', summary='综述人血白蛋白用于肝硬化腹水、自发性细菌性腹膜炎及肝肾综合征的循证证据，明确推荐剂量与疗程。'),
    dict(id='a3', title='慢病患者多重用药的风险识别与药物治疗管理', author='王立明 主任药师', date='2026-05-28',
         cat='c1-2-1', summary='针对老年慢病患者多重用药现状，提出用药风险筛查工具与药师主导的药物治疗管理路径。'),
    dict(id='a4', title='抗菌药物合理使用与耐药防控实践指南', author='医院感染管理专业委员会', date='2026-05-15',
         cat='c1-2-2', summary='围绕抗菌药物分级管理、围手术期预防用药及耐药菌防控，给出基层医疗机构落地操作建议。'),
    dict(id='a5', title='PD-1/PD-L1 单抗类药物的作用机制与临床研究进展', author='肿瘤药学协作组', date='2026-06-02',
         cat='c2-1-1', summary='梳理免疫检查点抑制剂的作用机制、获批适应证及真实世界安全性数据，展望联合治疗方向。'),
    dict(id='a6', title='重组人凝血因子Ⅷ在血友病A治疗中的应用', author='血液病药学组', date='2026-04-22',
         cat='c2-1-2', summary='比较重组与血浆源凝血因子Ⅷ的药效与免疫原性，规范按需与预防替代治疗策略。'),
    dict(id='a7', title='慢性肾病患者药代动力学特征与剂量调整', author='临床药理学杂志', date='2026-05-05',
         cat='c2-2-1', summary='阐述肾功能减退对药物清除的影响，建立基于估算肾小球滤过率的剂量调整框架与监护要点。'),
    dict(id='a8', title='药物基因组学指导华法林个体化用药专家意见', author='精准药学联盟', date='2026-04-12',
         cat='c2-2-2', summary='基于CYP2C9与VKORC1基因型制定华法林初始剂量算法，降低出血与血栓风险。'),
    dict(id='a9', title='药品经营质量管理规范(GSP)现场检查要点解读', author='药品监管科学研究会', date='2026-03-30',
         cat='c3-1-1', summary='逐条解读药品经营质量管理规范对冷链、储存与追溯的要求，梳理零售药店合规自查清单。'),
    dict(id='a10', title='处方审核管理办法与常见不合理处方分析', author='药事管理专业委员会', date='2026-03-18',
         cat='c3-1-2', summary='结合处方审核规范，归纳配伍禁忌、超剂量等典型问题处方并给出干预模板。'),
    dict(id='a11', title='新版国家医保药品目录调整趋势分析', author='医保政策研究中心', date='2026-02-25',
         cat='c3-2-1', summary='分析近年医保目录谈判准入特征，解读创新药补短板惠民生的遴选逻辑。'),
    dict(id='a12', title='药品集中带量采购对临床用药结构的影响', author='卫生经济与政策组', date='2026-02-10',
         cat='c3-2-2', summary='基于带量采购落地数据，评估中选药品替代、费用节约与供应保障情况。'),
]

BODY = (
    '随着医药卫生体制改革的不断深化，临床用药的安全、有效与经济性日益受到关注。'
    '本文在梳理国内外相关指南与临床研究证据的基础上，结合我国诊疗实际，对关键临床问题进行了系统阐述。'
    '文章首先明确了适用人群与禁忌证，并给出了基于体重或体表面积的推荐给药方案；'
    '随后针对常见不良反应提出了可操作的监测与处置流程，强调个体化治疗与全程药学监护的重要性。'
    '最后，作者呼吁建立多学科协作机制，推动循证证据向临床实践的转化，切实保障患者用药安全与可及性。'
)

HEADER_TXT = '上药GO · 学术园地（示例文档）'
FOOTER_TXT = '第 页'

def collect_chars():
    chars = set('，。、：；（）·—0123456789年月日 ')
    for a in ARTICLES:
        for v in (a['title'], a['author'], a['date'], a['summary'], BODY):
            chars.update(v)
    chars.update(HEADER_TXT + FOOTER_TXT)
    # labels hardcoded in build()
    chars.update('作者：发布日期：摘要正文')
    return ''.join(sorted(chars))

def subset_font(text):
    font = TTFont(FONT)
    opt = Options()
    opt.glyph_names = False
    opt.recalc_bounds = True
    opt.notdef_outline = True
    opt.drop_tables = []
    ss = Subsetter(options=opt)
    ss.populate(text=text)
    ss.subset(font)
    out = os.path.join(OUT, '_simhei.subset.ttf')
    font.save(out)
    return out

class PDF(FPDF):
    def header(self):
        self.set_font('CN', '', 9)
        self.set_text_color(150, 150, 150)
        self.cell(0, 8, '上药GO · 学术园地（示例文档）', align='R')
        self.ln(10)
    def footer(self):
        self.set_y(-15)
        self.set_font('CN', '', 9)
        self.set_text_color(150, 150, 150)
        self.cell(0, 10, f'第 {self.page_no()} 页', align='C')

def build():
    chars = collect_chars()
    fpath = subset_font(chars)
    for a in ARTICLES:
        pdf = PDF(format='A4')
        pdf.add_font('CN', '', fpath)
        pdf.set_auto_page_break(auto=True, margin=18)
        pdf.add_page()
        pdf.set_text_color(20, 20, 20)
        pdf.set_font('CN', '', 16)
        pdf.multi_cell(0, 9, a['title'])
        pdf.ln(2)
        pdf.set_text_color(110, 110, 110)
        pdf.set_font('CN', '', 10)
        pdf.cell(0, 7, f"作者：{a['author']}    发布日期：{a['date']}")
        pdf.ln(10)
        pdf.set_draw_color(220, 220, 220)
        pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
        pdf.ln(3)
        pdf.set_text_color(220, 80, 60)
        pdf.set_font('CN', '', 11)
        pdf.cell(0, 7, '摘要')
        pdf.ln(8)
        pdf.set_text_color(40, 40, 40)
        pdf.set_font('CN', '', 10.5)
        pdf.multi_cell(0, 6.5, a['summary'])
        pdf.ln(3)
        pdf.set_text_color(220, 80, 60)
        pdf.set_font('CN', '', 11)
        pdf.cell(0, 7, '正文')
        pdf.ln(8)
        pdf.set_text_color(40, 40, 40)
        pdf.set_font('CN', '', 10.5)
        pdf.multi_cell(0, 6.5, BODY)
        out = os.path.join(OUT, a['id'] + '.pdf')
        pdf.output(out)
        print('wrote', out, os.path.getsize(out), 'bytes')
    os.remove(fpath)
    print('PDF GEN DONE')

if __name__ == '__main__':
    build()
