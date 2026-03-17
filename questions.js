/**
 * 题目数据与计分模型
 * 每个选项关联特定的天干/地支，累加对应得分。
 * 此处提供核心的题库，可通过代码扩展到50题以模拟完整测试。
 */

const baseQuestions =[
    {
        question: "当你的OC面对强大的敌人或不可逆转的困境时，TA通常会？",
        options:[
            { text: "迎难而上，硬刚到底，宁折不弯", scores: { "庚": 2, "申": 1, "甲": 1 } },
            { text: "表面退让，暗中寻找破绽，智取取胜", scores: { "乙": 2, "壬": 1, "子": 1 } },
            { text: "寻求同伴帮助，或者利用环境资源", scores: { "己": 2, "未": 1, "辰": 1 } },
            { text: "默默忍耐，积蓄力量等待时机", scores: { "癸": 2, "丑": 1, "戌": 1 } }
        ]
    },
    {
        question: "在团队或群体中，TA通常扮演什么样的角色？",
        options:[
            { text: "绝对的领导者，发号施令", scores: { "丙": 2, "午": 1, "辰": 1 } },
            { text: "军师或智囊，提供策略", scores: { "壬": 2, "子": 1, "亥": 1 } },
            { text: "后勤或调解员，照顾大家情绪", scores: { "己": 2, "丁": 1, "未": 1 } },
            { text: "独狼，游离在边缘但关键时刻出手", scores: { "辛": 2, "酉": 1, "寅": 1 } }
        ]
    },
    {
        question: "关于TA的感情观，以下哪种描述最准确？",
        options:[
            { text: "炽热直白，爱憎分明，全心投入", scores: { "丙": 2, "巳": 1, "午": 1 } },
            { text: "细水长流，温柔细腻，包容对方", scores: { "丁": 2, "卯": 1, "癸": 1 } },
            { text: "理智克制，讲究对等和原则", scores: { "辛": 2, "酉": 1, "申": 1 } },
            { text: "深沉内敛，不善言辞但行动证明", scores: { "戊": 2, "戌": 1, "丑": 1 } }
        ]
    },
    {
        question: "TA追求的最终目标或人生信条是什么？",
        options:[
            { text: "自由自在，不受任何拘束", scores: { "壬": 2, "寅": 1, "亥": 1 } },
            { text: "建功立业，证明自己的价值", scores: { "甲": 2, "庚": 1, "辰": 1 } },
            { text: "守护重要的人或平静的生活", scores: { "己": 2, "未": 1, "丑": 1 } },
            { text: "探寻真理，追求完美与极致", scores: { "辛": 2, "酉": 1, "子": 1 } }
        ]
    },
    {
        question: "当遭遇背叛时，TA的反应是？",
        options:[
            { text: "暴怒，立刻报复回去", scores: { "丙": 2, "庚": 1, "午": 1 } },
            { text: "不可置信，陷入自我怀疑与悲伤", scores: { "癸": 2, "卯": 1, "亥": 1 } },
            { text: "冷酷断绝关系，将其踢出自己的世界", scores: { "辛": 2, "酉": 1, "申": 1 } },
            { text: "表面平静，但在心里记下一笔，慢慢清算", scores: { "乙": 2, "巳": 1, "戌": 1 } }
        ]
    }
];


export const questions = [];
const multipliers =[1, 1.2, 0.8]; // 用于略微改变权重分布

for (let i = 0; i < 15; i++) {
    const base = baseQuestions[i % baseQuestions.length];
    const m = multipliers[i % multipliers.length];
    

    const q = {
        question: `(场景 ${i + 1}) ` + base.question,
        options: base.options.map(opt => {
            const newScores = {};
            for (const[key, val] of Object.entries(opt.scores)) {
                newScores[key] = val * m;
            }
            return { text: opt.text, scores: newScores };
        })
    };
    questions.push(q);
}
