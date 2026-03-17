/**
 * 八字核心计算逻辑
 */


const stemsMap = {
    "甲": { elem: "木", desc: "正直、仁爱、上进，有如参天大树，庇护他人但易折。" },
    "乙": { elem: "木", desc: "柔韧、灵活、善良，如藤蔓般适应力强，外柔内刚。" },
    "丙": { elem: "火", desc: "热情、开朗、急躁，如同太阳般耀眼，充满感染力。" },
    "丁": { elem: "火", desc: "温和、细心、敏感，如烛火般细腻，洞察人心。" },
    "戊": { elem: "土", desc: "稳重、厚重、固执，如同高山大地，值得信赖且包容。" },
    "己": { elem: "土", desc: "包容、随和、内向，如田园之土，滋养万物而不争。" },
    "庚": { elem: "金", desc: "刚毅、果断、讲义气，如刀剑般锐利，执行力极强。" },
    "辛": { elem: "金", desc: "细腻、精致、追求完美，如珠玉般珍贵，气质高雅。" },
    "壬": { elem: "水", desc: "聪慧、变通、活跃，如江河之水，奔流不息，胸怀大志。" },
    "癸": { elem: "水", desc: "柔和、含蓄、敏感，如雨露之水，润物细无声，内心深邃。" }
};


const branchesMap = {
    "子": { desc: "机智、灵活、好动，善于捕捉机会。" },
    "丑": { desc: "踏实、勤奋



、固执。" },
    "寅": { desc: "勇敢、积极、有冲劲，具备开创精神与野心。" },
    "卯": { desc: "温和、文雅、敏感，心思细腻且富有浪漫情怀。" },
    "辰": { desc: "包容、多变、有领导力，气场宏大，深不可测。" },
    "巳": { desc: "热情、急躁、善变，内心充满能量，极具爆发力。" },
    "午": { desc: "直率、冲动、爱表现，像烈火般明艳，极具个人魅力。" },
    "未": { desc: "温和、有耐心、内向，擅长默默付出，极具亲和力。" },
    "申": { desc: "果断、刚强、好胜，行动力极佳，不甘落后。" },
    "酉": { desc: "细腻、严谨、有原则，注重细节与完美，气质清冷。" },
    "戌": { desc: "忠诚、保守、固执，坚守自我底线，重情重义。" },
    "亥": { desc: "聪明、随和、适应力强，心胸开阔，不拘小节。" }
};

const stemsList = Object.keys(stemsMap);
const branchesList = Object.keys(branchesMap);


function getHighest(scores, filterList) {
    let maxScore = -1;
    let result = filterList[0];
    
    for (const item of filterList) {
        if ((scores[item] || 0) > maxScore) {
            maxScore = scores[item] || 0;
            result = item;
        }
    }
    return result;
}


function getRandom(list, exclude) {
    const filtered = list.filter(item => item !== exclude);
    return filtered[Math.floor(Math.random() * filtered.length)];
}

export function generateResult(scores) {

    const dayStem = getHighest(scores, stemsList);
    const dayBranch = getHighest(scores, branchesList);
    

    const monthStem = getRandom(stemsList, dayStem);
    const monthBranch = getRandom(branchesList, dayBranch);
    const hourStem = getRandom(stemsList, dayStem);
    const hourBranch = getRandom(branchesList, dayBranch);


    const characterDesc = `${dayStem}${dayBranch}作为主干：\n【${dayStem}】${stemsMap[dayStem].desc}\n【${dayBranch}】${branchesMap[dayBranch].desc}`;
    
    const elements = [stemsMap[dayStem].elem, stemsMap[monthStem].elem, stemsMap[hourStem].elem];
    const missingElements =["金","木","水","火","土"].filter(e => !elements.includes(e));
    const missingText = missingElements.length > 0 ? `命局中偏弱或缺【${missingElements.join('、')}】。` : "五行相对均衡。";

    const readingText = `此命盘以${dayStem}木/火/土/金/水（${stemsMap[dayStem].elem}）为核心底色，${missingText}。TA在人生轨迹中，往往表现出强烈的${stemsMap[dayStem].desc.split('，')[0]}特质。月柱${monthStem}${monthBranch}暗示了TA早年或外在表现的侧面，而时柱${hourStem}${hourBranch}则揭示了TA内心深处或晚年的归宿。整体而言，这是一个极具张力与故事性的灵魂。`;

    return {
        pillars: {
            month: [monthStem, monthBranch],
            day: [dayStem, dayBranch],
            hour: [hourStem, hourBranch]
        },
        character: characterDesc,
        reading: readingText
    };
}
