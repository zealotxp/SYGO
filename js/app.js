
// ===== Data Models =====
const drugsData = [
  { id:1, name:'静注人免疫球蛋白(pH4)', spec:'武汉中原瑞德生物制品', spec2:'2.5g/50ml/瓶', img:'images/drug1.jpg', category:'immunoglobulin', stock:'3家在售', indications:'1. 原发性免疫球蛋白缺乏症，如X联锁低免疫球蛋白血症，常见变异性免疫缺陷病，免疫球蛋白G亚型缺陷病等。<br>2. 继发性免疫球蛋白缺陷病，如重症感染，新生儿败血症等。<br>3. 自身免疫性疾病，如原发性血小板减少性紫癜，川崎病等。', usage:'静脉滴注或以5%葡萄糖溶液稀释后静脉滴注。开始滴注速度为1.0ml/分钟（约20滴/分钟），持续15分钟后若无不良反应，可逐渐加快速度。最快滴注速度不得超过3.0ml/分钟（约60滴/分钟）。', contraindications:'1. 对人免疫球蛋白过敏或有其他严重过敏史者。<br>2. 有抗IgA抗体的选择性IgA缺乏者。<br>3. 本品仅供静脉输注用。', precautions:'1. 本品专供静脉输注，应在有抢救条件的医疗机构使用。<br>2. 本品呈现混浊、沉淀、异物或瓶身有裂纹、过期失效等情况不得使用。<br>3. 开瓶后应一次用完，未用完部分应废弃。<br>4. 运输及贮存过程中严禁冻结。', merchants:[1,2,3] },
  { id:2, name:'静注人免疫球蛋白(pH4)', spec:'四川远大蜀阳药业', spec2:'2.5g/瓶', img:'images/drug2.jpg', category:'immunoglobulin', stock:'2家在售', indications:'1. 原发性免疫球蛋白缺乏症，如X联锁低免疫球蛋白血症，常见变异性免疫缺陷病，免疫球蛋白G亚型缺陷病等。<br>2. 继发性免疫球蛋白缺陷病，如重症感染，新生儿败血症等。<br>3. 自身免疫性疾病，如原发性血小板减少性紫癜，川崎病等。', usage:'静脉滴注或以5%葡萄糖溶液稀释后静脉滴注。开始滴注速度为1.0ml/分钟（约20滴/分钟），持续15分钟后若无不良反应，可逐渐加快速度。', contraindications:'1. 对人免疫球蛋白过敏或有其他严重过敏史者。<br>2. 有抗IgA抗体的选择性IgA缺乏者。', precautions:'1. 本品专供静脉输注，应在有抢救条件的医疗机构使用。<br>2. 本品呈现混浊、沉淀、异物或瓶身有裂纹、过期失效等情况不得使用。', merchants:[2,4] },
  { id:3, name:'人血白蛋白', spec:'瑞士杰特贝林生物制品', spec2:'10g(20% 50ml)', img:'images/drug3.jpg', category:'albumin', stock:'4家在售', indications:'1. 失血创伤、烧伤引起的休克。<br>2. 脑水肿及损伤引起的颅压升高。<br>3. 肝硬化及肾病引起的水肿或腹水。<br>4. 低蛋白血症的补充。<br>5. 新生儿高胆红素血症。', usage:'静脉滴注。用量视病情而定，一般每次5~10g，每日1次或每8小时1次。滴注速度每分钟不超过2ml为宜。', contraindications:'1. 对白蛋白有严重过敏者。<br>2. 高血压患者、急性心脏病者慎用。', precautions:'1. 本品开启后应一次输注完毕，不得分次或给第二人输用。<br>2. 输注过程中如发现不适反应，应立即停止输用。<br>3. 严重贫血、心力衰竭者应慎用。', merchants:[1,2,3,7] },
  { id:4, name:'人血白蛋白', spec:'山东泰邦生物制品', spec2:'10g(20% 50ml)', img:'images/drug4.jpg', category:'albumin', stock:'3家在售', indications:'1. 失血创伤、烧伤引起的休克。<br>2. 脑水肿及损伤引起的颅压升高。<br>3. 肝硬化及肾病引起的水肿或腹水。<br>4. 低蛋白血症的补充。', usage:'静脉滴注。用量视病情而定，一般每次5~10g。滴注速度每分钟不超过2ml为宜。', contraindications:'1. 对白蛋白有严重过敏者。<br>2. 高血压患者慎用。', precautions:'1. 本品开启后应一次输注完毕。<br>2. 输注过程中如发现不适反应，应立即停止输用。', merchants:[1,3,5] },
  { id:5, name:'人血白蛋白', spec:'四川远大蜀阳药业', spec2:'10g(20% 50ml)', img:'images/drug5.jpg', category:'albumin', stock:'2家在售', indications:'1. 失血创伤、烧伤引起的休克。<br>2. 脑水肿及损伤引起的颅压升高。<br>3. 肝硬化及肾病引起的水肿或腹水。', usage:'静脉滴注。用量视病情而定，一般每次5~10g。', contraindications:'1. 对白蛋白有严重过敏者。', precautions:'1. 本品开启后应一次输注完毕，不得分次使用。', merchants:[3,6] },
  { id:6, name:'人血白蛋白', spec:'武汉中原瑞德生物制品', spec2:'20% 50ml', img:'images/drug6.jpg', category:'albumin', stock:'3家在售', indications:'1. 失血创伤、烧伤引起的休克。<br>2. 脑水肿及损伤引起的颅压升高。<br>3. 低蛋白血症的补充。', usage:'静脉滴注。用量视病情而定，一般每次5~10g。滴注速度每分钟不超过2ml为宜。', contraindications:'1. 对白蛋白有严重过敏者。', precautions:'1. 本品开启后应一次输注完毕。', merchants:[1,5,7] },
  { id:7, name:'人血白蛋白(安博灵)', spec:'瑞士杰特贝林生物制品', spec2:'10g(20% 50ml)', img:'images/promo-main.png', category:'albumin', stock:'5家在售', indications:'1. 失血创伤、烧伤引起的休克。<br>2. 脑水肿及损伤引起的颅压升高。<br>3. 肝硬化及肾病引起的水肿或腹水。<br>4. 低蛋白血症的补充。<br>5. 新生儿高胆红素血症。', usage:'静脉滴注。用量视病情而定，一般每次5~10g。', contraindications:'1. 对白蛋白有严重过敏者。<br>2. 高血压患者慎用。', precautions:'1. 本品开启后应一次输注完毕。<br>2. 严重贫血、心力衰竭者应慎用。', merchants:[1,2,4,5,7] },
  { id:8, name:'破伤风人免疫球蛋白', spec:'华兰生物工程', spec2:'250IU/瓶', img:'', emoji:'💉', emojiBg:'var(--primary-light)', category:'immunoglobulin', stock:'2家在售', indications:'主要用于预防和治疗破伤风感染，特别适用于对破伤风类毒素过敏的患者。', usage:'臀部肌肉注射。预防剂量：250IU，治疗剂量：3000~6000IU。', contraindications:'1. 对人免疫球蛋白过敏者禁用。<br>2. 严重血小板减少者禁用。', precautions:'1. 本品仅供肌肉注射，不可静脉输注。<br>2. 注射后局部可有轻微红肿，一般自行消退。', merchants:[4,7] },
  { id:9, name:'人凝血因子VIII', spec:'上海莱士血液制品', spec2:'200IU/瓶', img:'', emoji:'🧪', emojiBg:'#FFF3E8', category:'factor', stock:'1家在售', indications:'主要用于甲型血友病患者出血的治疗和预防。', usage:'静脉滴注。剂量根据出血严重程度和患者体重计算。', contraindications:'1. 对本品过敏者禁用。', precautions:'1. 配制后应立即使用。<br>2. 输注速度不宜过快。', merchants:[7] },
  { id:10, name:'人凝血酶原复合物', spec:'华兰生物工程', spec2:'300IU/瓶', img:'', emoji:'💊', emojiBg:'#E8F0FE', category:'factor', stock:'1家在售', indications:'主要用于凝血因子II、VII、IX、X缺乏所致的出血。', usage:'静脉滴注。用量视病情和所需提升的凝血因子水平而定。', contraindications:'1. 对本品过敏者禁用。', precautions:'1. 配制后应立即使用。<br>2. 使用期间注意监测凝血功能。', merchants:[7] },
  { id:11, name:'人纤维蛋白原', spec:'上海莱士血液制品', spec2:'0.5g/瓶', img:'', emoji:'🩸', emojiBg:'#FCE8E8', category:'factor', stock:'2家在售', indications:'主要用于先天性或获得性纤维蛋白原减少症所致的出血。', usage:'静脉滴注。用量视病情而定，一般每次1~2g。', contraindications:'1. 对本品过敏者禁用。<br>2. 血栓性静脉炎者禁用。', precautions:'1. 配制后应立即使用。<br>2. 使用期间注意监测纤维蛋白原水平。', merchants:[5,6] },
  { id:12, name:'乙型肝炎人免疫球蛋白', spec:'四川远大蜀阳药业', spec2:'200IU/瓶', img:'', emoji:'🧬', emojiBg:'#F3E8FC', category:'immunoglobulin', stock:'3家在售', indications:'主要用于乙型肝炎的被动免疫预防，包括母婴阻断等。', usage:'肌肉注射。预防剂量：200IU，母婴阻断：新生儿出生后24小时内注射。', contraindications:'1. 对人免疫球蛋白过敏者禁用。', precautions:'1. 本品仅供肌肉注射。<br>2. 应尽早注射，越早效果越好。', merchants:[2,4,8] },
  { id:13, name:'狂犬病人免疫球蛋白', spec:'华兰生物工程', spec2:'200IU/瓶', img:'', emoji:'🔬', emojiBg:'#E8FCF3', category:'immunoglobulin', stock:'2家在售', indications:'主要用于狂犬病暴露后的被动免疫，与狂犬病疫苗联合使用。', usage:'伤口周围浸润注射。剂量按20IU/kg体重计算。', contraindications:'1. 对人免疫球蛋白过敏者禁用。', precautions:'1. 注射前须做皮试。<br>2. 不得与疫苗在同一部位注射。', merchants:[1,5] }
];

const merchantsData = [
  { id:1, name:'仁济诊所(浦东店)', addr:'浦东新区张杨路500号', phone:'021-5888-XXXX', hours:'08:00-22:00', distance:'580m', distNum:0.58, icon:'🏥', iconBg:'var(--orange-light)', certified:true, drugs:[1,3,4,6,7], tags:['静注人免疫球蛋白','人血白蛋白'], drugCount:5, is24h:false, hero:'images/store1.svg', certs:['images/cert-business.svg','images/cert-pharma.svg'] },
  { id:2, name:'国大诊所(徐汇店)', addr:'徐汇区漕溪北路200号', phone:'021-5466-XXXX', hours:'07:30-22:30', distance:'1.2km', distNum:1.2, icon:'🏪', iconBg:'var(--primary-light)', certified:true, drugs:[1,2,3,7], tags:['人血白蛋白','静注人免疫球蛋白'], drugCount:4, is24h:false, hero:'images/store2.svg', certs:['images/cert-business.svg','images/cert-pharma.svg'] },
  { id:3, name:'益丰诊所(静安店)', addr:'静安区南京西路1200号', phone:'021-6299-XXXX', hours:'08:00-21:30', distance:'2.1km', distNum:2.1, icon:'🏥', iconBg:'#E8F0FE', certified:true, drugs:[1,3,5], tags:['人血白蛋白','静注人免疫球蛋白'], drugCount:2, is24h:false, hero:'images/store3.svg', certs:['images/cert-business.svg','images/cert-pharma.svg'] },
  { id:4, name:'老百姓诊所(长宁店)', addr:'长宁区天山路800号', phone:'021-5207-XXXX', hours:'08:30-21:00', distance:'2.8km', distNum:2.8, icon:'🏪', iconBg:'#FFF3E8', certified:true, drugs:[2,7], tags:['人血白蛋白'], drugCount:2, is24h:false, hero:'images/store4.svg', certs:['images/cert-business.svg','images/cert-pharma.svg'] },
  { id:5, name:'华氏诊所(杨浦店)', addr:'杨浦区控江路1500号', phone:'021-6519-XXXX', hours:'24小时营业', distance:'3.5km', distNum:3.5, icon:'🏥', iconBg:'#F3E8FC', certified:true, drugs:[4,6,7,11,13], tags:['静注人免疫球蛋白','人血白蛋白'], drugCount:6, is24h:true, hero:'images/store5.svg', certs:['images/cert-business.svg','images/cert-pharma.svg','images/cert-gmp.svg'] },
  { id:6, name:'海王星辰诊所(虹口店)', addr:'虹口区四川北路1800号', phone:'021-6541-XXXX', hours:'08:00-22:00', distance:'4.2km', distNum:4.2, icon:'🏪', iconBg:'#E8FCF3', certified:true, drugs:[5,11], tags:['人血白蛋白'], drugCount:3, is24h:false, hero:'images/store6.svg', certs:['images/cert-business.svg','images/cert-pharma.svg'] },
  { id:7, name:'第一医药诊所(黄浦店)', addr:'黄浦区南京东路600号', phone:'021-6322-XXXX', hours:'07:00-23:00', distance:'5.0km', distNum:5.0, icon:'🏥', iconBg:'#FCE8E8', certified:true, drugs:[3,6,7,8,9,10], tags:['静注人免疫球蛋白','人血白蛋白','凝血因子'], drugCount:5, is24h:false, hero:'images/store7.svg', certs:['images/cert-business.svg','images/cert-pharma.svg','images/cert-gmp.svg'] },
  { id:8, name:'复美诊所(普陀店)', addr:'普陀区曹杨路800号', phone:'021-5290-XXXX', hours:'08:30-21:30', distance:'5.8km', distNum:5.8, icon:'🏪', iconBg:'#E8F0FE', certified:true, drugs:[12], tags:['人血白蛋白'], drugCount:1, is24h:false, hero:'images/store8.svg', certs:['images/cert-business.svg','images/cert-pharma.svg'] }
];

// Current selected drug/merchant for detail & appointment context
let currentDrugId = 1;
let currentMerchantId = 1;

// ===== State =====
let currentPage = 'home';
let pageHistory = ['home'];
let isLoggedIn = true;
let loginTargetPage = null;
let loginPhone = '13800138000';
let swiperIndex = 0;

// ===== Swiper =====
function initSwiper() {
  setInterval(() => {
    swiperIndex = (swiperIndex + 1) % 3;
    document.getElementById('swiperTrack').style.transform = `translateX(-${swiperIndex * 100}%)`;
    document.querySelectorAll('.swiper-dot').forEach((d, i) => {
      d.classList.toggle('active', i === swiperIndex);
    });
  }, 3500);
}

// ===== Date Selector =====
function ymd(d) {
  const p = n => (n < 10 ? '0' : '') + n;
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}

function initDateSelector() {
  const container = document.getElementById('dateSelector');
  const weekdays = ['周日','周一','周二','周三','周四','周五','周六'];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const item = document.createElement('div');
    item.className = 'date-item' + (i === 0 ? ' selected' : '');
    item.innerHTML = `<span class="weekday">${i === 0 ? '今天' : weekdays[d.getDay()]}</span><span class="day">${d.getDate()}</span>`;
    item.dataset.date = ymd(d);
    item.onclick = function() {
      document.querySelectorAll('.date-item').forEach(el => el.classList.remove('selected'));
      this.classList.add('selected');
    };
    container.appendChild(item);
  }
}

// ===== Location =====
function showLocationModal() {
  document.getElementById('locationModal').classList.add('show');
}
function allowLocation() {
  const m = document.getElementById('locationModal'); if (m) m.classList.remove('show');
  const t = document.getElementById('locText'); if (t) t.textContent = '上海市浦东新区张杨路';
  try { sessionStorage.setItem('userLocation', '上海市浦东新区张杨路'); } catch(e) {}
}
function denyLocation() {
  const m = document.getElementById('locationModal'); if (m) m.classList.remove('show');
  const t = document.getElementById('locText'); if (t) t.textContent = '未获取定位 · 点击选择';
}

// ===== 手动定位：地图选点 =====
// ===== 省 / 市 / 区 三级联动数据 (含中心坐标, 用于地图定位) =====
const REGION_DATA = {
  '北京市': { center:[39.9042, 116.4074], cities: {
    '北京市': { center:[39.9042, 116.4074], districts: {
      '东城区':[39.9175, 116.4167], '西城区':[39.9152, 116.3660], '朝阳区':[39.9219, 116.4435],
      '海淀区':[39.9599, 116.2981], '丰台区':[39.8585, 116.2867], '通州区':[39.9097, 116.6569]
    }}
  }},
  '上海市': { center:[31.2304, 121.4737], cities: {
    '上海市': { center:[31.2304, 121.4737], districts: {
      '黄浦区':[31.2304, 121.4844], '徐汇区':[31.1886, 121.4371], '长宁区':[31.2205, 121.4243],
      '静安区':[31.2290, 121.4485], '浦东新区':[31.2217, 121.5440], '杨浦区':[31.2593, 121.5266]
    }}
  }},
  '广东省': { center:[23.1291, 113.2644], cities: {
    '广州市': { center:[23.1291, 113.2644], districts: {
      '天河区':[23.1247, 113.3614], '越秀区':[23.1289, 113.2676], '海珠区':[23.0838, 113.3170], '番禺区':[22.9371, 113.3846]
    }},
    '深圳市': { center:[22.5429, 114.0596], districts: {
      '福田区':[22.5212, 114.0589], '南山区':[22.5318, 114.0750], '罗湖区':[22.5559, 114.1235], '宝安区':[22.5559, 113.8831]
    }},
    '东莞市': { center:[23.0207, 113.7518], districts: {
      '莞城街道':[23.0207, 113.7518], '南城街道':[23.0078, 113.7583]
    }}
  }},
  '江苏省': { center:[32.0603, 118.7969], cities: {
    '南京市': { center:[32.0603, 118.7969], districts: {
      '玄武区':[32.0586, 118.7976], '鼓楼区':[32.0625, 118.7784], '江宁区':[31.9517, 118.8283]
    }},
    '苏州市': { center:[31.2989, 120.5853], districts: {
      '姑苏区':[31.3098, 120.5872], '工业园区':[31.3361, 120.6994], '吴中区':[31.2615, 120.6120]
    }},
    '无锡市': { center:[31.4912, 120.3119], districts: {
      '梁溪区':[31.4839, 120.3017], '滨湖区':[31.5028, 120.2138]
    }}
  }},
  '浙江省': { center:[30.2741, 120.1551], cities: {
    '杭州市': { center:[30.2741, 120.1551], districts: {
      '上城区':[30.2427, 120.1690], '西湖区':[30.2588, 120.1302], '滨江区':[30.2084, 120.2110], '余杭区':[30.2994, 120.2986]
    }},
    '宁波市': { center:[29.8683, 121.5440], districts: {
      '海曙区':[29.8719, 121.5434], '江北区':[29.8845, 121.5503], '鄞州区':[29.8167, 121.5466]
    }}
  }},
  '四川省': { center:[30.5728, 104.0668], cities: {
    '成都市': { center:[30.5728, 104.0668], districts: {
      '锦江区':[30.6566, 104.0909], '武侯区':[30.6417, 104.0431], '高新区':[30.5946, 104.0667], '成华区':[30.6598, 104.1015]
    }}
  }},
  '湖北省': { center:[30.5928, 114.3055], cities: {
    '武汉市': { center:[30.5928, 114.3055], districts: {
      '江汉区':[30.6156, 114.2687], '武昌区':[30.5876, 114.3043], '洪山区':[30.5192, 114.3947], '江岸区':[30.6035, 114.2919]
    }}
  }},
  '湖南省': { center:[28.2282, 112.9388], cities: {
    '长沙市': { center:[28.2282, 112.9388], districts: {
      '芙蓉区':[28.1957, 112.9931], '岳麓区':[28.2259, 112.9430], '雨花区':[28.1593, 113.0273]
    }}
  }},
  '河南省': { center:[34.7466, 113.6253], cities: {
    '郑州市': { center:[34.7466, 113.6253], districts: {
      '金水区':[34.7676, 113.6656], '二七区':[34.7233, 113.6169], '中原区':[34.7489, 113.5815]
    }},
    '洛阳市': { center:[34.6200, 112.4536], districts: {
      '西工区':[34.6691, 112.4346], '涧西区':[34.6593, 112.3829]
    }}
  }},
  '陕西省': { center:[34.3416, 108.9398], cities: {
    '西安市': { center:[34.3416, 108.9398], districts: {
      '雁塔区':[34.2203, 108.9470], '碑林区':[34.2519, 108.9606], '未央区':[34.3416, 108.9398]
    }}
  }},
  '山东省': { center:[36.6512, 117.1201], cities: {
    '济南市': { center:[36.6512, 117.1201], districts: {
      '历下区':[36.6612, 117.1120], '市中区':[36.6500, 117.0000]
    }},
    '青岛市': { center:[36.0671, 120.3826], districts: {
      '市南区':[36.0626, 120.3831], '市北区':[36.0989, 120.3706], '崂山区':[36.0951, 120.4827]
    }}
  }},
  '福建省': { center:[26.0745, 119.2965], cities: {
    '福州市': { center:[26.0745, 119.2965], districts: {
      '鼓楼区':[26.0875, 119.3030], '台江区':[26.0615, 119.3110]
    }},
    '厦门市': { center:[24.4798, 118.0894], districts: {
      '思明区':[24.4600, 118.0950], '湖里区':[24.5200, 118.1400]
    }}
  }},
  '辽宁省': { center:[41.8057, 123.4315], cities: {
    '沈阳市': { center:[41.8057, 123.4315], districts: {
      '和平区':[41.7922, 123.3840], '沈河区':[41.7968, 123.4520]
    }},
    '大连市': { center:[38.9140, 121.6147], districts: {
      '中山区':[38.9180, 121.6380], '西岗区':[38.9180, 121.6190]
    }}
  }},
  '天津市': { center:[39.3434, 117.3616], cities: {
    '天津市': { center:[39.3434, 117.3616], districts: {
      '和平区':[39.1230, 117.2000], '河西区':[39.1130, 117.2200], '南开区':[39.1330, 117.1800]
    }}
  }},
  '重庆市': { center:[29.5630, 106.5516], cities: {
    '重庆市': { center:[29.5630, 106.5516], districts: {
      '渝中区':[29.5600, 106.5700], '江北区':[29.5800, 106.5600], '南岸区':[29.5300, 106.5800]
    }}
  }}
};

// 各城市预设地名 (用于搜索定位)
const MAP_POIS = {
  '上海市': [
    { name:'人民广场', coord:[31.2304, 121.4737] },
    { name:'陆家嘴', coord:[31.2397, 121.4998] },
    { name:'徐家汇', coord:[31.1951, 121.4371] },
    { name:'静安寺', coord:[31.2240, 121.4453] },
    { name:'五角场', coord:[31.3037, 121.5158] },
    { name:'世纪公园', coord:[31.2186, 121.5500] },
    { name:'浦东新区张杨路', coord:[31.2284, 121.5234] }
  ],
  '北京市': [
    { name:'天安门广场', coord:[39.9055, 116.3976] },
    { name:'王府井', coord:[39.9149, 116.4109] },
    { name:'中关村', coord:[39.9836, 116.3164] },
    { name:'三里屯', coord:[39.9367, 116.4554] },
    { name:'西单', coord:[39.9075, 116.3739] }
  ],
  '广州市': [
    { name:'广州塔', coord:[23.1066, 113.3245] },
    { name:'北京路', coord:[23.1290, 113.2677] },
    { name:'天河体育中心', coord:[23.1413, 113.3230] },
    { name:'珠江新城', coord:[23.1190, 113.3232] }
  ],
  '深圳市': [
    { name:'华强北', coord:[22.5446, 114.0857] },
    { name:'深圳湾', coord:[22.5055, 113.9375] },
    { name:'东门老街', coord:[22.5470, 114.1230] },
    { name:'福田中心', coord:[22.5410, 114.0570] }
  ],
  '杭州市': [
    { name:'西湖', coord:[30.2592, 120.1490] },
    { name:'武林广场', coord:[30.2741, 120.1630] },
    { name:'钱江新城', coord:[30.2470, 120.2110] },
    { name:'杭州东站', coord:[30.2900, 120.2120] }
  ],
  '成都市': [
    { name:'春熙路', coord:[30.6530, 104.0810] },
    { name:'宽窄巷子', coord:[30.6690, 104.0560] },
    { name:'天府广场', coord:[30.6570, 104.0660] },
    { name:'高新南区', coord:[30.5500, 104.0670] }
  ],
  '南京市': [
    { name:'新街口', coord:[32.0430, 118.7900] },
    { name:'夫子庙', coord:[32.0210, 118.7900] },
    { name:'玄武湖', coord:[32.0680, 118.7970] },
    { name:'河西万达', coord:[32.0400, 118.7450] }
  ],
  '武汉市': [
    { name:'江汉路', coord:[30.5820, 114.2840] },
    { name:'光谷广场', coord:[30.5060, 114.3990] },
    { name:'黄鹤楼', coord:[30.5460, 114.3060] },
    { name:'武汉天地', coord:[30.6060, 114.3120] }
  ],
  '重庆市': [
    { name:'解放碑', coord:[29.5640, 106.5780] },
    { name:'洪崖洞', coord:[29.5630, 106.5780] },
    { name:'观音桥', coord:[29.5750, 106.5400] },
    { name:'南坪', coord:[29.5300, 106.5700] }
  ],
  '西安市': [
    { name:'钟楼', coord:[34.2610, 108.9480] },
    { name:'大雁塔', coord:[34.2180, 108.9640] },
    { name:'小寨', coord:[34.2250, 108.9420] },
    { name:'高新路', coord:[34.2400, 108.9150] }
  ]
};

let mapPickerMap = null;
let mapPickerMarker = null;
let currentPickerProvince = '上海市';
let currentPickerCity = '上海市';
let currentPickerDistrict = '浦东新区';
let selectedLocation = { province:'上海市', city:'上海市', district:'浦东新区', name:'', lat:31.2217, lng:121.5440 };

// ===== 省 / 市 / 区 三级联动渲染 =====
function renderRegionColumn(colEl, items, activeName, onPick) {
  colEl.innerHTML = '';
  items.forEach(name => {
    const opt = document.createElement('div');
    opt.className = 'region-opt' + (name === activeName ? ' active' : '');
    opt.textContent = name;
    opt.onclick = () => onPick(name);
    colEl.appendChild(opt);
  });
}

function renderProvinceCol() {
  const col = document.getElementById('regionProvinceCol');
  renderRegionColumn(col, Object.keys(REGION_DATA), currentPickerProvince, pickProvince);
  renderCityCol();
}

function renderCityCol() {
  const col = document.getElementById('regionCityCol');
  const cities = REGION_DATA[currentPickerProvince] ? Object.keys(REGION_DATA[currentPickerProvince].cities) : [];
  if (!cities.includes(currentPickerCity)) currentPickerCity = cities[0];
  renderRegionColumn(col, cities, currentPickerCity, pickCity);
  renderDistrictCol();
}

function renderDistrictCol() {
  const col = document.getElementById('regionDistrictCol');
  const city = REGION_DATA[currentPickerProvince] && REGION_DATA[currentPickerProvince].cities[currentPickerCity];
  const districts = city ? Object.keys(city.districts) : [];
  if (!districts.includes(currentPickerDistrict)) currentPickerDistrict = districts[0];
  renderRegionColumn(col, districts, currentPickerDistrict, pickDistrict);
}

function pickProvince(p) {
  currentPickerProvince = p;
  currentPickerCity = Object.keys(REGION_DATA[p].cities)[0];
  const city = REGION_DATA[p].cities[currentPickerCity];
  currentPickerDistrict = Object.keys(city.districts)[0];
  renderProvinceCol();
  applyRegionToMap();
}

function pickCity(c) {
  currentPickerCity = c;
  const city = REGION_DATA[currentPickerProvince].cities[c];
  currentPickerDistrict = Object.keys(city.districts)[0];
  renderCityCol();
  applyRegionToMap();
}

function pickDistrict(d) {
  currentPickerDistrict = d;
  renderDistrictCol();
  applyRegionToMap();
}

function applyRegionToMap() {
  const city = REGION_DATA[currentPickerProvince].cities[currentPickerCity];
  const coord = city.districts[currentPickerDistrict];
  document.getElementById('pickerCityName').textContent = currentPickerProvince + ' · ' + currentPickerCity + ' · ' + currentPickerDistrict;
  selectedLocation = { province:currentPickerProvince, city:currentPickerCity, district:currentPickerDistrict, name:'', lat:coord[0], lng:coord[1] };
  updateSelectedText();
  if (mapPickerMap) {
    mapPickerMap.setView(coord, 14);
    addOrMoveMarker(coord);
  }
  document.getElementById('mapSearchInput').value = '';
  document.getElementById('mapSearchResults').style.display = 'none';
}

function toggleCityList() {
  const panel = document.getElementById('cityPanel');
  const arrow = document.getElementById('cityArrow');
  const open = panel.style.display !== 'none';
  if (open) {
    panel.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    panel.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
    renderProvinceCol();
  }
}

function showMapPicker() { location.href = 'map-picker.html'; }

function initMapPicker() {
  const container = document.getElementById('mapContainer');
  if (!window.L) {
    container.innerHTML = '<div style="padding:50px 20px;text-align:center;color:#999;font-size:14px;">地图组件加载失败<br>请检查网络后重试</div>';
    return;
  }
  const coord = REGION_DATA[currentPickerProvince].cities[currentPickerCity].districts[currentPickerDistrict];
  if (!mapPickerMap) {
    mapPickerMap = L.map('mapContainer').setView(coord, 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }).addTo(mapPickerMap);
    mapPickerMap.on('click', function(e) {
      const ll = [e.latlng.lat, e.latlng.lng];
      addOrMoveMarker(ll);
      selectedLocation.lat = ll[0];
      selectedLocation.lng = ll[1];
      selectedLocation.name = '';
      updateSelectedText();
    });
  } else {
    mapPickerMap.invalidateSize();
  }
  mapPickerMap.setView(coord, 14);
  addOrMoveMarker(coord);
}

function addOrMoveMarker(coord) {
  if (!mapPickerMap) return;
  if (mapPickerMarker) {
    mapPickerMarker.setLatLng(coord);
  } else {
    mapPickerMarker = L.marker(coord, { draggable:true }).addTo(mapPickerMap);
    mapPickerMarker.on('dragend', function(e) {
      const p = e.target.getLatLng();
      selectedLocation.lat = p.lat;
      selectedLocation.lng = p.lng;
      selectedLocation.name = '';
      updateSelectedText();
    });
  }
}

function updateSelectedText() {
  const region = selectedLocation.province + '·' + selectedLocation.city + '·' + selectedLocation.district;
  const txt = selectedLocation.name ? region + ' ' + selectedLocation.name : region;
  document.getElementById('mapSelectedText').textContent = txt;
}

function doSearch() {
  const kw = (document.getElementById('mapSearchInput').value || '').trim();
  if (kw === '') { searchMapPlaces(''); return; }
  // 优先当前城市
  let match = (MAP_POIS[currentPickerCity] || []).filter(p => p.name.indexOf(kw) !== -1);
  let hitProvince = currentPickerProvince;
  let hitCity = currentPickerCity;
  // 当前城市无结果则跨城市搜索
  if (match.length === 0) {
    outer:
    for (const prov in REGION_DATA) {
      for (const c in REGION_DATA[prov].cities) {
        const found = (MAP_POIS[c] || []).filter(p => p.name.indexOf(kw) !== -1);
        if (found.length > 0) { match = found; hitProvince = prov; hitCity = c; break outer; }
      }
    }
  }
  if (match.length > 0 && mapPickerMap) {
    // 命中其它城市时，联动切换到该城市
    if (hitCity !== currentPickerCity) {
      currentPickerProvince = hitProvince;
      currentPickerCity = hitCity;
      currentPickerDistrict = Object.keys(REGION_DATA[hitProvince].cities[hitCity].districts)[0];
      document.getElementById('pickerCityName').textContent = currentPickerProvince + ' · ' + currentPickerCity + ' · ' + currentPickerDistrict;
      if (document.getElementById('cityPanel').style.display !== 'none') renderProvinceCol();
    }
    mapPickerMap.setView(match[0].coord, 15);
    addOrMoveMarker(match[0].coord);
    selectedLocation = { province:currentPickerProvince, city:currentPickerCity, district:currentPickerDistrict, name:'', lat:match[0].coord[0], lng:match[0].coord[1] };
    updateSelectedText();
  }
  // 下拉框展示命中城市的结果
  searchMapPlaces(kw, hitCity);
}

function searchMapPlaces(keyword, cityName) {
  const city = cityName || currentPickerCity;
  const box = document.getElementById('mapSearchResults');
  const kw = (keyword || '').trim();
  if (kw === '') {
    box.style.display = 'none';
    box.innerHTML = '';
    return;
  }
  const list = (MAP_POIS[city] || []).filter(p => p.name.indexOf(kw) !== -1);
  if (list.length === 0) {
    box.innerHTML = '<div class="map-search-empty">未找到相关地点</div>';
    box.style.display = 'block';
    return;
  }
  box.innerHTML = '';
  list.forEach(p => {
    const item = document.createElement('div');
    item.className = 'map-search-item';
    item.innerHTML = '<span>📍 ' + p.name + '</span><span style="color:#999;font-size:12px;">' + currentPickerProvince + '·' + city + '</span>';
    item.onclick = () => {
      selectedLocation.name = p.name;
      selectedLocation.lat = p.coord[0];
      selectedLocation.lng = p.coord[1];
      if (mapPickerMap) {
        mapPickerMap.setView(p.coord, 15);
        addOrMoveMarker(p.coord);
      }
      updateSelectedText();
      document.getElementById('mapSearchInput').value = p.name;
      box.style.display = 'none';
    };
    box.appendChild(item);
  });
  box.style.display = 'block';
}

function confirmLocation() {
  const region = selectedLocation.province + '·' + selectedLocation.city + '·' + selectedLocation.district;
  const addr = selectedLocation.name ? region + ' ' + selectedLocation.name : region;
  try { sessionStorage.setItem('userLocation', addr); } catch(e) {}
  showToast('已更新定位：' + addr);
  location.href = 'index.html';
}

// ===== 刷新定位 =====
function refreshLocation() {
  const btns = document.querySelectorAll('.loc-btn');
  btns.forEach(b => { b.disabled = true; b.style.opacity = '0.6'; });
  showToast('正在获取您的位置…');
  setTimeout(() => {
    document.getElementById('locText').textContent = '上海市·浦东新区张杨路';
    selectedLocation = { province:'上海市', city:'上海市', district:'浦东新区', name:'张杨路', lat:31.2284, lng:121.5234 };
    btns.forEach(b => { b.disabled = false; b.style.opacity = '1'; });
    showToast('已更新您的位置');
  }, 1000);
}

// ===== Navigation (MPA: 真实多页跳转) =====
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
function goBack(){ if (history.length > 1) history.back(); else location.href = 'index.html'; }

// ===== Page Navigation =====
function goAllDrugs() { location.href = 'all-drugs.html'; }
function goAllMerchants() { location.href = 'all-merchants.html'; }

function filterDrugs(el, category) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const items = document.querySelectorAll('#allDrugsPage .all-drug-item');
  let visibleCount = 0;
  items.forEach(item => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = '';
      visibleCount++;
    } else {
      item.style.display = 'none';
    }
  });
  const countEl = document.querySelector('#allDrugsPage .drug-count-num');
  if (countEl) countEl.textContent = visibleCount;
}

function sortDrugs(el, type) {
  el.parentElement.querySelectorAll('.sort-item').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  const listContainer = document.querySelector('#allDrugsPage .all-drug-list');
  const items = Array.from(listContainer.querySelectorAll('.all-drug-item'));
  items.sort((a, b) => {
    if (type === 'distance') return parseFloat(a.getAttribute('data-distance')) - parseFloat(b.getAttribute('data-distance'));
    if (type === 'stock') return parseInt(b.getAttribute('data-stock')) - parseInt(a.getAttribute('data-stock'));
    return parseInt(a.getAttribute('data-id')) - parseInt(b.getAttribute('data-id'));
  });
  items.forEach(item => listContainer.appendChild(item));
}

function filterMerchants(el, category) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const items = document.querySelectorAll('#allMerchantsPage .all-merchant-item');
  items.forEach(item => {
    const itemCat = item.getAttribute('data-filter');
    if (category === 'all') {
      item.style.display = '';
    } else if (category === 'nearest' && parseFloat(item.getAttribute('data-distance')) <= 2) {
      item.style.display = '';
    } else if (category === 'mostDrugs' && parseInt(item.getAttribute('data-drugcount')) >= 4) {
      item.style.display = '';
    } else if (category === 'certified' && item.getAttribute('data-certified') === 'true') {
      item.style.display = '';
    } else if (category === '24h' && item.getAttribute('data-24h') === 'true') {
      item.style.display = '';
    } else if (category === 'all') {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
  // For "all", show everything; for specific filters, hide non-matching
  if (category === 'all') {
    items.forEach(item => item.style.display = '');
  }
}

/* ===== Home Featured Drugs: category TAB + dynamic grid ===== */
const CATEGORY_LABELS = {
  immunoglobulin: '免疫球蛋白',
  albumin: '人血白蛋白',
  factor: '凝血因子',
  vaccine: '疫苗制品'
};
const FEATURED_TAB_ORDER = ['immunoglobulin', 'albumin', 'factor', 'vaccine'];
let currentFeaturedCategory = 'all';

function getFeaturedCategoryList() {
  const present = [];
  FEATURED_TAB_ORDER.forEach(c => {
    if (drugsData.some(d => d.category === c)) present.push(c);
  });
  return [{ key: 'all', label: '全部' }].concat(
    present.map(c => ({ key: c, label: CATEGORY_LABELS[c] || c }))
  );
}

function renderFeaturedTabs() {
  const box = document.getElementById('featuredTabs');
  if (!box) return;
  box.innerHTML = '';
  getFeaturedCategoryList().forEach(t => {
    const el = document.createElement('div');
    el.className = 'featured-tab' + (t.key === currentFeaturedCategory ? ' active' : '');
    el.textContent = t.label;
    el.onclick = () => switchFeaturedTab(t.key);
    box.appendChild(el);
  });
}

function switchFeaturedTab(category) {
  if (category === currentFeaturedCategory) return;
  currentFeaturedCategory = category;
  renderFeaturedTabs();
  renderFeaturedDrugs();
}

function renderFeaturedDrugs() {
  const grid = document.getElementById('featuredDrugGrid');
  if (!grid) return;
  const list = currentFeaturedCategory === 'all'
    ? drugsData
    : drugsData.filter(d => d.category === currentFeaturedCategory);
  // 每个 TAB 最多展示 4 个药品，保证首屏能同时看到药品与下方商家
  const display = list.slice(0, 4);
  grid.innerHTML = '';
  display.forEach(d => {
    const card = document.createElement('div');
    card.className = 'drug-card';
    card.setAttribute('onclick', 'goDrugDetail(' + d.id + ')');
    const bg = d.img ? '#fff' : (d.emojiBg || 'var(--primary-light)');
    const imgHtml = d.img
      ? '<img src="' + d.img + '" alt="' + d.name + '">'
      : '<div style="font-size:34px;">' + (d.emoji || '💊') + '</div>';
    card.innerHTML =
      '<div class="drug-card-img" style="background:' + bg + ';">' + imgHtml + '</div>' +
      '<div class="drug-card-info">' +
        '<div class="drug-card-name">' + d.name + '</div>' +
        '<div class="drug-card-spec">' + d.spec + (d.spec2 ? ' · ' + d.spec2 : '') + '</div>' +
        '<div class="drug-card-bottom">' +
          '<div class="drug-card-price"><span class="yen">¥</span>--</div>' +
          '<div class="drug-card-stock">' + d.stock + '</div>' +
        '</div>' +
      '</div>';
    grid.appendChild(card);
  });
}

function initFeaturedSection() {
  renderFeaturedTabs();
  renderFeaturedDrugs();
}

function goDrugDetail(id) { location.href = 'drug-detail.html?id=' + id; }

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
}

function goMerchantDetail(id) { location.href = 'merchant-detail.html?id=' + id; }

// 商家详情渲染（在 merchant-detail.html 加载时调用）
function renderMerchantDetail(id) {
  currentMerchantId = id;
  const merchant = merchantsData.find(m => m.id === id) || merchantsData[0];
  const hero = document.querySelector('#merchantDetailPage .merchant-detail-hero');
  if (hero) hero.innerHTML = merchant.hero
    ? '<img class="merchant-detail-hero-img" src="' + merchant.hero + '" alt="商家门头照" onclick="openImagePreview(\'' + merchant.hero + '\')">'
    : merchant.icon;

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

  const certWrap = document.querySelector('#merchantDetailPage .cert-images');
  if (certWrap && merchant.certs && merchant.certs.length) {
    certWrap.innerHTML = merchant.certs.map(function (c) {
      return '<img class="cert-img" src="' + c + '" alt="资质证书" onclick="openImagePreview(\'' + c + '\')">';
    }).join('');
  }
}

function goAppointment() {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html'); return; }
  location.href = 'appointment.html';
}
function goAppointmentForDrug() {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html?drug=' + currentDrugId); return; }
  location.href = 'appointment.html?drug=' + currentDrugId;
}

function goAppointmentWithMerchant() {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html'); return; }
  location.href = 'appointment.html';
}

function bookDrugAtMerchant(drugId, merchantId) {
  if (!isLoggedIn) { location.href = 'login.html?redirect=' + encodeURIComponent('appointment.html?drug=' + drugId + '&merchant=' + merchantId); return; }
  location.href = 'appointment.html?drug=' + drugId + '&merchant=' + merchantId;
}

function goMyAppointments() { location.href = 'my-appointments.html'; }

function goMerchantLogin() { location.href = 'merchant-login.html'; }

function doMerchantLogin() {
  const phone = document.getElementById('merchantLoginPhone');
  const pwd = document.getElementById('merchantLoginPwd');
  const phoneVal = phone ? phone.value.trim() : '';
  if (!phoneVal || !/^1[3-9]\d{9}$/.test(phoneVal)) {
    showToast('请输入正确的商家手机号');
    return;
  }
  if (!pwd || !pwd.value) {
    showToast('请输入登录密码');
    return;
  }
  showToast('商家登录成功');
  setTimeout(() => { location.href = 'profile.html'; }, 1200);
}

function goSearch() { location.href = 'search.html'; }

// ===== Search =====
function handleSearch() {
  const val = document.getElementById('searchInput').value.trim();
  const clearBtn = document.querySelector('.clear-btn');
  clearBtn.style.display = val ? 'block' : 'none';

  if (val.length > 0) {
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('searchResultList').style.display = 'block';
    const kw = val.toLowerCase();
    const matchedDrugs = drugsData.filter(d => d.name.toLowerCase().includes(kw) || d.spec.toLowerCase().includes(kw) || d.spec2.toLowerCase().includes(kw));
    const matchedMerchants = merchantsData.filter(m => m.name.toLowerCase().includes(kw) || m.addr.toLowerCase().includes(kw));

    let html = '';
    if (matchedMerchants.length > 0) {
      html += '<div style="font-size:14px;font-weight:600;margin-bottom:8px;">相关商家</div>';
      matchedMerchants.forEach(m => {
        html += '<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick="goMerchantDetail(' + m.id + ')">'
          + '<div style="width:48px;height:48px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:22px;background:' + m.iconBg + ';flex-shrink:0;">' + m.icon + '</div>'
          + '<div style="flex:1;min-width:0;"><div style="font-weight:600;">' + m.name + '</div>'
          + '<div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">' + m.addr + '</div>'
          + '<div style="font-size:12px;color:var(--orange);margin-top:2px;">距您 ' + m.distance + '</div>'
          + '</div></div>';
      });
    }
    if (matchedDrugs.length > 0) {
      html += '<div style="font-size:14px;font-weight:600;margin:12px 0 8px;">相关药品</div>';
      matchedDrugs.forEach(d => {
        const imgHtml = d.img
          ? '<div style="width:60px;height:60px;border-radius:8px;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;border:1px solid var(--border);"><img src="' + d.img + '" style="width:100%;height:100%;object-fit:contain;padding:2px;"></div>'
          : '<div style="width:60px;height:60px;border-radius:8px;background:' + (d.emojiBg||'var(--primary-light)') + ';display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:28px;">' + (d.emoji||'💊') + '</div>';
        html += '<div style="display:flex;gap:12px;padding:12px 0;border-bottom:1px solid var(--border);cursor:pointer;" onclick="goDrugDetail(' + d.id + ')">'
          + imgHtml
          + '<div style="flex:1;"><div style="font-weight:600;">' + d.name + '</div>'
          + '<div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">' + d.spec + ' · ' + d.spec2 + '</div>'
          + '<div style="font-size:12px;color:var(--primary);margin-top:4px;">' + d.stock + '</div>'
          + '</div></div>';
      });
    }
    if (matchedDrugs.length === 0 && matchedMerchants.length === 0) {
      html = '<div style="text-align:center;padding:40px 0;"><div style="font-size:40px;margin-bottom:12px;">🔍</div><div style="font-size:14px;color:var(--text-secondary);">未找到相关结果</div></div>';
    }
    document.getElementById('searchResultList').innerHTML = html;
  } else {
    document.getElementById('searchResults').style.display = 'block';
    document.getElementById('searchResultList').style.display = 'none';
  }
}

function searchFor(keyword) {
  document.getElementById('searchInput').value = keyword;
  handleSearch();
}

function clearSearch() {
  document.getElementById('searchInput').value = '';
  handleSearch();
}

// ===== Appointment =====
function selectTime(el) {
  if (el.classList.contains('disabled')) return;
  document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
}

function changeQty(delta) {
  const el = document.getElementById('appointQty');
  if (!el) return;
  let v = parseInt(el.textContent, 10) || 1;
  v = Math.max(1, Math.min(99, v + delta));
  el.textContent = v;
}

function prefillAppointment() {
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
}

// ===== Merchant Picker =====
function showMerchantPicker() {
  const drug = drugsData.find(d => d.id === currentDrugId);
  const inStockIds = (drug && drug.merchants) ? drug.merchants : [];
  // 离我最近的 5 个商家（按 distNum 升序）
  const nearest = merchantsData.slice().sort((a, b) => a.distNum - b.distNum).slice(0, 5);
  let html = '<div class="merchant-picker-hint">已按距离为您推荐最近的 5 家门店，仅「有货」门店可预约</div>';
  nearest.forEach(m => {
    const hasStock = inStockIds.includes(m.id);
    const selected = (m.id === currentMerchantId);
    html += '<div class="merchant-pick-item' + (selected ? ' selected' : '') + (hasStock ? '' : ' disabled') + '"'
      + (hasStock ? ' onclick="selectMerchant(' + m.id + ')"' : '') + '>'
      + '<div class="merchant-pick-avatar" style="background:' + m.iconBg + ';">' + m.icon + '</div>'
      + '<div class="merchant-pick-info">'
      + '<div class="merchant-pick-name">' + m.name + '</div>'
      + '<div class="merchant-pick-addr">' + m.addr + '</div>'
      + '</div>'
      + '<div class="merchant-pick-right">'
      + '<div class="merchant-pick-dist">距您 ' + m.distance + '</div>'
      + '<div class="merchant-pick-stock ' + (hasStock ? 'in' : 'out') + '">' + (hasStock ? '有货' : '无货') + '</div>'
      + '</div></div>';
  });
  document.getElementById('merchantPickerList').innerHTML = html;
  document.getElementById('merchantPicker').classList.add('show');
}

function selectMerchant(id) {
  const merchant = merchantsData.find(m => m.id === id);
  if (!merchant) return;
  const drug = drugsData.find(d => d.id === currentDrugId);
  if (drug && drug.merchants && !drug.merchants.includes(id)) {
    showToast('该门店暂无可预约药品');
    return;
  }
  currentMerchantId = id;
  const t = document.getElementById('appointMerchantText');
  if (t) t.textContent = merchant.name;
  closeMerchantPicker();
}

function closeMerchantPicker() {
  document.getElementById('merchantPicker').classList.remove('show');
}

function submitAppointment() {
  const name = document.getElementById('appointName').value.trim();
  const phone = document.getElementById('appointPhone').value.trim();
  const qtyEl = document.getElementById('appointQty');
  const qty = qtyEl ? (parseInt(qtyEl.textContent, 10) || 1) : 1;
  const selectedTime = document.querySelector('.time-slot.selected');

  let hasError = false;

  if (!name) {
    document.getElementById('appointName').classList.add('error');
    document.getElementById('nameError').classList.add('show');
    hasError = true;
  }

  if (!phone || !/^1[3-9]\d{9}$/.test(phone)) {
    document.getElementById('appointPhone').classList.add('error');
    document.getElementById('phoneError').classList.add('show');
    hasError = true;
  }

  if (!selectedTime) {
    alert('请选择预约时段');
    hasError = true;
  }

  if (hasError) return;

  const drug = drugsData.find(x => x.id === currentDrugId);
  const merchant = merchantsData.find(x => x.id === currentMerchantId);
  const dateItem = document.querySelector('.date-item.selected');
  const dateText = dateItem && dateItem.dataset.date ? dateItem.dataset.date : '';
  const timeText = selectedTime ? selectedTime.textContent.trim() : '';
  const time = (dateText + ' ' + timeText).trim() || '待定';

  const orderNo = 'YY' + Date.now().toString().slice(-10);
  const appointment = {
    orderNo: orderNo,
    drugName: drug ? drug.name : document.getElementById('appointDrug').value,
    drugSpec: drug ? (drug.spec2 || '') : '',
    img: (drug && drug.img) ? drug.img : 'images/drug1.jpg',
    merchantName: merchant ? merchant.name : (document.getElementById('appointMerchantText') ? document.getElementById('appointMerchantText').textContent : ''),
    time: time,
    qty: qty,
    status: 'success',
    createdAt: Date.now()
  };
  let list = getMyAppointments();
  if (!list) { seedAppointments(); list = getMyAppointments() || []; }
  list.push(appointment);
  saveMyAppointments(list);

  document.getElementById('successDetail').innerHTML = `
    您的预约已提交成功！<br>预约单号：<span style="color:var(--primary);font-weight:600;">${orderNo}</span><br>药品数量：${qty} 份<br>请按时到店核销
  `;
  document.getElementById('successModal').classList.add('show');
}

function validateName(el) {
  if (el.value.trim()) {
    el.classList.remove('error');
    document.getElementById('nameError').classList.remove('show');
  }
}

function validatePhone(el) {
  const phone = el.value.trim();
  if (phone && /^1[3-9]\d{9}$/.test(phone)) {
    el.classList.remove('error');
    document.getElementById('phoneError').classList.remove('show');
  }
}

function closeSuccessModal() {
  const m = document.getElementById('successModal'); if (m) m.classList.remove('show');
  location.href = 'index.html';
}

// ===== My Appointments (dynamic list, no status lifecycle) =====
const APPOINTMENTS_KEY = 'sygo_appointments';
let currentOrderDate = '';

function getMyAppointments() {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return null;
}

function saveMyAppointments(list) {
  try { localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(list)); } catch (e) {}
}

function seedAppointments() {
  const now = Date.now();
  const DAY = 86400000;
  const seed = [
    { orderNo: 'YY20260721001', drugName: '静注人免疫球蛋白(pH4)', drugSpec: '2.5g/50ml', img: 'images/drug1.jpg', merchantName: '仁济诊所(浦东店)', time: ymd(new Date(now)) + ' 14:00', qty: 2, status: 'success', createdAt: now - 3600000 },
    { orderNo: 'YY20260720003', drugName: '人血白蛋白(安博灵)', drugSpec: '10g/50ml', img: 'images/drug3.jpg', merchantName: '国大诊所(徐汇店)', time: ymd(new Date(now - DAY)) + ' 10:00', qty: 1, status: 'success', createdAt: now - DAY },
    { orderNo: 'YY20260609005', drugName: '人血白蛋白(蜀阳)', drugSpec: '10g/50ml', img: 'images/drug5.jpg', merchantName: '益丰诊所(静安店)', time: ymd(new Date(now - 40 * DAY)) + ' 15:00', qty: 3, status: 'success', createdAt: now - 40 * DAY }
  ];
  saveMyAppointments(seed);
}

function escHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function formatDateTime(ts) {
  const d = new Date(ts);
  const p = n => (n < 10 ? '0' : '') + n;
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
}

function renderMyAppointments() {
  const listEl = document.getElementById('appointmentList');
  if (!listEl) return;
  let list = getMyAppointments();
  if (!list) { seedAppointments(); list = getMyAppointments(); }
  const filtered = (list || []).filter(a => {
    if (!currentOrderDate) return true;
    const d = new Date(a.createdAt || 0);
    const p = n => (n < 10 ? '0' : '') + n;
    const ds = d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
    return ds === currentOrderDate;
  });
  if (!filtered.length) {
    listEl.innerHTML = '<div class="empty-tip">该日期暂无预约记录</div>';
    return;
  }
  filtered.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  listEl.innerHTML = filtered.map(a => `
    <div class="appointment-item">
      <div class="appointment-item-header">
        <span class="appointment-order-no">单号：${escHtml(a.orderNo)}</span>
        <span class="appointment-status status-success">预约成功</span>
      </div>
      <div class="appointment-item-body">
        <div class="appointment-item-icon"><img src="${escHtml(a.img || 'images/drug1.jpg')}" alt=""></div>
        <div class="appointment-item-info">
          <div class="appointment-item-drug">${escHtml(a.drugName)}</div>
          <div class="appointment-item-merchant">${escHtml(a.merchantName)}</div>
          <div class="appointment-item-time">🕒 下单时间：${escHtml(formatDateTime(a.createdAt))}</div>
          <div class="appointment-item-time">📅 预约时间：${escHtml(a.time)}</div>
          <div class="appointment-item-qty">📦 数量：${escHtml(a.qty)} 份</div>
        </div>
      </div>
    </div>
  `).join('');
}

function filterByOrderDate(val) {
  currentOrderDate = val || '';
  renderMyAppointments();
}

function resetOrderDate() {
  currentOrderDate = '';
  const el = document.getElementById('orderDateFilter');
  if (el) el.value = '';
  renderMyAppointments();
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// ===== QR Code =====
function showQR() {
  document.getElementById('qrModal').classList.add('show');
}
function closeQR() {
  document.getElementById('qrModal').classList.remove('show');
}

// ===== Navigation =====
function navigateTo() {
  alert('正在唤起第三方地图导航...');
}

function callMerchant() {
  window.location.href = 'tel:0215888XXXX';
}

function openImagePreview(src) {
  const img = document.getElementById('imagePreviewImg');
  if (img) img.src = src;
  const m = document.getElementById('imagePreviewModal');
  if (m) m.classList.add('show');
}
function closeImagePreview() {
  const m = document.getElementById('imagePreviewModal');
  if (m) m.classList.remove('show');
}
function previewCert(index) {
  const m = merchantsData.find(x => x.id === currentMerchantId) || merchantsData[0];
  const src = (m.certs && m.certs[index - 1]) ? m.certs[index - 1] : 'images/cert-business.svg';
  openImagePreview(src);
}

// ===== Login =====
function doLogin() {
  const lp = (document.getElementById('loginPhone')?.value || '').trim();
  if (lp && /^1[3-9]\d{9}$/.test(lp)) {
    loginPhone = lp;
  }
  isLoggedIn = true;
  const redirect = getParam('redirect') || sessionStorage.getItem('redirectAfterLogin') || 'index.html';
  try { sessionStorage.removeItem('redirectAfterLogin'); } catch(e) {}
  location.href = redirect;
}

// ===== Profile =====
function changeAvatar() {
  alert('选择头像图片...');
}
function editName() {
  const name = prompt('修改昵称：', '微信用户');
  if (name) {
    document.querySelector('.profile-name').textContent = name;
  }
}

// ===== About / Privacy =====
function showAbout() { location.href = 'about.html'; }
function showPrivacy() { location.href = 'privacy.html'; }
function showUserAgreement() { location.href = 'agreement.html'; }
function showAboutIntro() {
  alert('上药GO是上海医药旗下便民找药平台，致力于为患者提供血液制品等特殊药品的在线查询与预约购药服务。我们与上海地区正规资质诊所深度合作，确保药品来源正规、品质放心。');
}
function showOfficialAccount() {
  alert('请搜索微信公众号"上药GO"关注我们，获取最新药品资讯和优惠活动信息。');
}
function cancelSearch() { location.href = 'index.html'; }

// ===== Init (按页面分发) =====
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
  } else if (page === 'my-appointments') {
    renderMyAppointments();
  } else if (page === 'map-picker') {
    setTimeout(() => initMapPicker(), 200);
  }
});
