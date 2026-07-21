# 更新记录

## [1.2.5] - 2026-07-21
- 我的预约每单显示下单时间+预约时间，顶部加下单时间筛选(全部/今天/本周/本月)

## [1.2.4] - 2026-07-21
- 我的预约改为动态列表(localStorage)：去掉待到店/已到店/已取消状态与筛选tab，列表展示预约药品数量

## [1.2.3] - 2026-07-21
- 商家详情页门头照/资质证书支持点击查看大图（新增灯箱 + SVG 占位图）

## [1.2.2] - 2026-07-21
- 修复搜索页白屏：assemble 给根 div 补 active 类（search-results-page 无 page 类导致未加 active）

## [1.2.1] - 2026-07-21
- 修复白屏：去除误注入的未闭合 login-page 遮罩，登录页改为 display:block

## [1.2.0] - 2026-07-21
- 单 HTML SPA 拆分为真实多页 MPA：每页独立 html 文件，导航由 showPage/state 改为 `location.href` + URL 参数
- 抽取共享资源：`css/common.css`（原内联样式）、`js/app.js`（原内联脚本逻辑），14 个页面统一引用
- 页面清单（含首页 index.html）：index / search / all-drugs / all-merchants / drug-detail / merchant-detail / appointment / my-appointments / profile / about / privacy / agreement / map-picker / login
- 跨页传参：药品/商家详情按 `?id=` 渲染（新增 renderDrugDetail / renderMerchantDetail）；预约按 `?drug=&merchant=` 预填；登录按 `?redirect=` 登录后回跳
- 跨页临时态用 `sessionStorage`（userLocation / redirectAfterLogin）；返回用 `history.back()`
- `body[data-page]` 属性驱动 DOMContentLoaded 分派各页初始化逻辑

## [1.1.3] - 2026-07-21
- 预约商家改为点击弹出底部抽屉选择器：按距离（distNum）升序推荐离我最近的 5 家门店
- 抽屉内仅「有货」（当前预约药品在售）门店可点选，无货门店置灰显示「无货」且不可选择
- 可手动切换门店，选中项高亮；点击遮罩或关闭按钮收起抽屉，选中所选门店回填预约商家字段并同步 currentMerchantId

## [1.1.2] - 2026-07-21
- 调整预约页表单顺序：「药品数量」选择器从「预约商家」下方移至「预约药品」下方、紧邻「预约日期」上方

## [1.1.1] - 2026-07-21
- 预约购药页新增「药品数量」步进选择器（−/＋，范围 1~99，默认 1），提交成功提示展示数量
- 登录页新增手机号输入框，登录时记录用于登录的手机号（loginPhone）；进入预约页时自动填入该手机号并校验
- showPage 切换到 appointment 时调用 prefillAppointment() 重置数量为 1 并自动填手机号，覆盖全部入口（含登录后跳转）

## [1.1.0] - 2026-07-21
- 商家详情页：移除底部「立即预约」固定操作栏（.bottom-action-bar）
- 在售药品列表每行右侧新增「预约」按钮，点击跳转预约页并预填该药品与商家（bookDrugAtMerchant(drugId,merchantId)），按钮 onclick 用 event.stopPropagation 避免触发行跳转
- 在售药品行右侧列改为 flex 纵向排列（库存 + 预约按钮，gap6）

## [1.0.9] - 2026-07-21
- 药品详情页「药品介绍」区块改为药品占位图画廊：移除文字介绍，展示 6 张药品占位图（images/drug1~6.jpg，3 列网格，圆角封面）
- goDrugDetail 不再拼装 indications/usage/contraindications/precautions 富文本，改为渲染 .drug-intro-gallery

## [1.0.8] - 2026-07-21
- 收紧首页元素间距，确保首屏可见 banner + 4 个主推药品 + 1 个附近商家
- 搜索栏/定位栏 padding 下调；轮播高度 160→110px；section-header padding 20/12→12/8；分类TAB padding 10/4→8/2；药品图 82→70px；商家卡 padding 14→10、头像 72→64px

## [1.0.7] - 2026-07-21
- 药品详情页：移除「适应症 / 用法用量 / 禁忌 / 注意事项」四个独立区块，合并为单个「药品介绍」富文本区块
- 富文本内容由 drugsData 的 indications/usage/contraindications/precautions 字段动态拼装（带小标题），保留全部信息；新增 p 段落间距样式

## [1.0.6] - 2026-07-21
- 主推药品每个分类 TAB 仅展示前 4 个药品（renderFeaturedDrugs 增加 slice(0,4)），2×2 紧凑网格
- 主推药品卡片再次缩小：图高 104px→82px、字号与内边距进一步下调，保证首屏同时露出药品与下方部分附近商家

## [1.0.5] - 2026-07-21
- 首页「主推药品」区新增分类切换 TAB（全部 / 免疫球蛋白 / 人血白蛋白 / 凝血因子，按 drugsData 实际分类自动生成）
- 切换 TAB 时下方药品网格同步过滤（renderFeaturedDrugs + switchFeaturedTab），点击卡片进入药品详情
- 主推药品展示区整体尺寸缩小：卡片图高 140px→104px，名称/规格/价格字号下调，信息区内边距收紧

## [1.0.4] - 2026-07-21
- 修复：点击「搜索」按钮地图不跳转。新增 doSearch()，搜索后地图直接定位到第一个匹配地点
- 搜索范围扩展为跨城市：当前城市无结果时自动在其它城市匹配，命中后联动切换省/市/区并跳转
- searchMapPlaces 支持指定城市参数（用于跨城结果展示）

## [1.0.3] - 2026-07-21
- 地图选点页升级：城市选择改为省 / 市 / 区 三级联动（REGION_DATA，含 15 省市主要区县坐标）
- 地名搜索框后新增「搜索」按钮（保留输入实时联想）

## [1.0.2] - 2026-07-21
- 首页顶部新增刷新定位与手动定位：地图选点页支持城市选择、地名搜索、点击/拖动地图选点

## [1.0.1] - 2026-07-21
- 初始化版本管理：添加 package.json 与 CHANGELOG.md

## [1.0.0] - 2026-05-22
- 初始版本：上药GO-便民找药平台（首页/搜索/预约/个人中心）
- 部署至 GitHub Pages: https://zealotxp.github.io/SYGO/
