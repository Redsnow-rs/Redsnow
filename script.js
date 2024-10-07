// 初始属性值
const initialStats = {
    wisdom: 0,
    strength: 0,
    wealth: 0,
    luck: 0
};

// MBTI 加成
const mbtiBonus = {
    INTJ: { wisdom: 10, strength: 5, wealth: 5, luck: 0 },
    INTP: { wisdom: 15, strength: 0, wealth: 5, luck: 0 },
    ENTJ: { wisdom: 5, strength: 10, wealth: 5, luck: 0 },
    ENTP: { wisdom: 10, strength: 0, wealth: 5, luck: 5 },
    INFJ: { wisdom: 10, strength: 5, wealth: 0, luck: 5 },
    INFP: { wisdom: 10, strength: 0, wealth: 0, luck: 10 },
    ENFJ: { wisdom: 5, strength: 5, wealth: 5, luck: 5 },
    ENFP: { wisdom: 5, strength: 0, wealth: 5, luck: 10 },
    ISTJ: { wisdom: 5, strength: 10, wealth: 10, luck: 0 },
    ISFJ: { wisdom: 5, strength: 5, wealth: 5, luck: 5 },
    ESTJ: { wisdom: 0, strength: 15, wealth: 10, luck: 0 },
    ESFJ: { wisdom: 0, strength: 10, wealth: 5, luck: 5 },
    ISTP: { wisdom: 0, strength: 15, wealth: 5, luck: 5 },
    ISFP: { wisdom: 0, strength: 10, wealth: 0, luck: 10 },
    ESTP: { wisdom: 0, strength: 10, wealth: 10, luck: 5 },
    ESFP: { wisdom: 0, strength: 5, wealth: 5, luck: 10 }
};

     const events = [
        { description: "你在本里出了一件特效武器，没拍过别人，只能拿工资了，财力增加10点。", effect: { wealth: 10 } },
        { description: "你去野团打到了DPS第一，武力增加10点。", effect: { strength: 10 } },
        { description: "你遇到了憨憨团长，替他上麦指挥过了Boss，智慧增加10点。", effect: { wisdom: 10 } },
        { description: "你今天的运气特别好，出了大铁，运气增加10点。", effect: { luck: 10 } },
        { description: "你在本里被牢了，武力减少5点。", effect: { strength: -10 } },
        { description: "你收外观卡框被骗了，财力减少5点。", effect: { wealth: -5 } },
        { description: "你打本的时候没躲技能死了，武力减少5点。", effect: { strength: -5 } },
        { description: "你的多段宏没卡好，DPS很捞，智慧减少5点。", effect: { wisdom: -5 } },
        { description: "你在拍卖行中捡漏了一个低价无界，财力增加15点。", effect: { wealth: 15 } },
        { description: "你蹭了其他帮会的帮会约战，智慧增加15点。", effect: { wisdom: 15 } },
        { description: "你在副本中被给了弘法，武力增加15点。", effect: { strength: 15 } },
        { description: "你在野外被玩PVP的当蘑菇给杀了，武力减少10点。", effect: { strength: -10 } },
        { description: "你在副本里拍装备被人抬价了，财力减少10点。", effect: { wealth: -10 } },
        { description: "你在帮会中表现突出，智慧增加10点。", effect: { wisdom: 10 } },
        { description: "你在副本中掉线，被罚款了，财力减少10点。", effect: { wealth: -10 } },
        { description: "你在副本里当工具人，财力增加10点。", effect: { wealth: 10 } },
        { description: "你在本里没按打断，智慧减少10点。", effect: { wisdom: -10 } },
        { description: "你跟狗王打好关系，狗王让你看守帮会仓库，财力增加20点。", effect: { wealth: 20 } },
        { description: "你在副本中获得了稀有掉落，财力增加20点。", effect: { wealth: 20 } },
        { description: "你在副本中DPS打到茄子团的第一页，智慧增加20点。", effect: { wisdom: 20 } },
        { description: "你在副本里拍装备被人抬价了，财力减少15点。", effect: { wealth: -15 } },
        { description: "你在本里没按打断，智慧减少15点。", effect: { wisdom: -15 } },
        { description: "你在副本中被奶妈拉了，运气增加15点。", effect: { luck: 15 } },
    ];

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let stats = { ...initialStats };
let actionsLeft = 5;
let daysLeft = 10; // 将剩余天数改为10
let playerName, playerAge, playerMbti;

document.getElementById('start-form').addEventListener('submit', function (e) {
    e.preventDefault();

    playerName = document.getElementById('name').value;
    playerAge = document.getElementById('age').value;
    playerMbti = document.getElementById('mbti').value;

    // 初始化属性值
    stats = {
        wisdom: getRandomValue(10, 100) + mbtiBonus[playerMbti].wisdom,
        strength: getRandomValue(10, 100) + mbtiBonus[playerMbti].strength,
        wealth: getRandomValue(10, 100) + mbtiBonus[playerMbti].wealth,
        luck: getRandomValue(10, 100) + mbtiBonus[playerMbti].luck
    };

    // 显示玩家信息
    document.getElementById('player-info').innerHTML = `
        姓名: ${playerName} <br>
        年龄: ${playerAge} <br>
        MBTI: ${playerMbti}
    `;

    // 显示事件页面
    document.getElementById('start-container').classList.add('hidden');
    document.getElementById('event-container').classList.remove('hidden');

    updateStats();
});

document.getElementById('action-button').addEventListener('click', function () {
    if (actionsLeft > 0) {
        const event = events[Math.floor(Math.random() * events.length)];
        stats.wisdom += event.effect.wisdom || 0;
        stats.strength += event.effect.strength || 0;
        stats.wealth += event.effect.wealth || 0;
        stats.luck += event.effect.luck || 0;

        const eventLog = document.getElementById('event-log');
        const eventItem = document.createElement('div');
        eventItem.textContent = event.description;
        eventLog.appendChild(eventItem);
        eventLog.scrollTop = eventLog.scrollHeight; // 自动滚动到最新事件

        actionsLeft--;
        updateStats();
    } else {
        if (daysLeft > 0) {
            daysLeft--;
            actionsLeft = 5;
            updateStats();
        } else {
            showEnding();
        }
    }
});

function updateStats() {
    document.getElementById('wisdom').textContent = stats.wisdom;
    document.getElementById('strength').textContent = stats.strength;
    document.getElementById('wealth').textContent = stats.wealth;
    document.getElementById('luck').textContent = stats.luck;
    document.getElementById('actions-left').textContent = actionsLeft;
    document.getElementById('days-left').textContent = daysLeft;

    // 检查是否有任何属性值为负数
    if (stats.wisdom < 0 || stats.strength < 0 || stats.wealth < 0 || stats.luck < 0) {
        showFailureEnding();
        return;
    }

    if (daysLeft === 0) {
        document.getElementById('action-button').textContent = '查看结局';
    } else if (actionsLeft === 0) {
        document.getElementById('action-button').textContent = '下一天';
    } else {
        document.getElementById('action-button').textContent = '行动';
    }
}

    function showEnding() {
        document.getElementById('event-container').classList.add('hidden');
        document.getElementById('end-container').classList.remove('hidden');

        const ending = document.getElementById('ending');
        let endingText = '';

        if (stats.wisdom > 80 && stats.strength > 80 && stats.wealth > 80 && stats.luck > 80) {
            endingText = '你成为了剑网三最强的PVE团长，将茄子发扬光大！你是超越了老狗的最牛逼的老茄！老狗算个der，随便殴打了';
        } else if (stats.wisdom > 60 && stats.strength > 60 && stats.wealth > 60 && stats.luck > 60) {
            endingText = '你成为了一个优秀的PVE团长，受人尊敬，一周开20车普通，有时候觉得累的一，虽然没出玄晶，但是痛并快乐着。';
        } else if (stats.wisdom > 40 && stats.strength > 40 && stats.wealth > 40 && stats.luck > 40) {
            endingText = '你成为了一个普通的PVE团长，其他团长不在的时候你偶尔替补一下，也能开开过时的老本，大多数时候在百战';
        } else if (stats.wisdom > 90) {
            endingText = '你凭借超高的智慧成为了剑网三中最具战略眼光的PVE团长，开本从不翻车。大家都尊称你为“智者茄”。';
        } else if (stats.strength > 90) {
            endingText = '你凭借超高的武力成为了剑网三中最强的战士，一边指挥还能一边打出超高的DPS。大家都尊称你为“战神茄”。';
        } else if (stats.wealth > 90) {
            endingText = '你凭借超高的财力成为了剑网三中最富有的团长，车车工资10Z。大家都尊称你为“财神茄”。（黑笔茄子团临死前的幻想罢了）';
        } else if (stats.luck > 90) {
            endingText = '你凭借超高的运气成为了剑网三中最幸运的团长，双闪随随便便！大家都尊称你为“幸运星茄”。（黑笔茄子团临死前的幻想罢了）';
        } else {
            endingText = '你未能成为一个成功的PVE团长，只能被老狗叫去在各个游戏里当黑奴，起早贪黑。';
        }

        ending.textContent = endingText;
    }
