// ��ʼ����ֵ
const initialStats = {
    wisdom: 0,
    strength: 0,
    wealth: 0,
    luck: 0
};

// MBTI �ӳ�
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
        { description: "���ڱ������һ����Ч������û�Ĺ����ˣ�ֻ���ù����ˣ���������10�㡣", effect: { wealth: 10 } },
        { description: "��ȥҰ�Ŵ���DPS��һ����������10�㡣", effect: { strength: 10 } },
        { description: "�������˺����ų�����������ָ�ӹ���Boss���ǻ�����10�㡣", effect: { wisdom: 10 } },
        { description: "�����������ر�ã����˴�������������10�㡣", effect: { luck: 10 } },
        { description: "���ڱ��ﱻ���ˣ���������5�㡣", effect: { strength: -10 } },
        { description: "������ۿ���ƭ�ˣ���������5�㡣", effect: { wealth: -5 } },
        { description: "��򱾵�ʱ��û�㼼�����ˣ���������5�㡣", effect: { strength: -5 } },
        { description: "��Ķ�κ�û���ã�DPS���̣��ǻۼ���5�㡣", effect: { wisdom: -5 } },
        { description: "�����������м�©��һ���ͼ��޽磬��������15�㡣", effect: { wealth: 15 } },
        { description: "������������İ��Լս���ǻ�����15�㡣", effect: { wisdom: 15 } },
        { description: "���ڸ����б����˺뷨����������15�㡣", effect: { strength: 15 } },
        { description: "����Ұ�ⱻ��PVP�ĵ�Ģ����ɱ�ˣ���������10�㡣", effect: { strength: -10 } },
        { description: "���ڸ�������װ������̧���ˣ���������10�㡣", effect: { wealth: -10 } },
        { description: "���ڰ���б���ͻ�����ǻ�����10�㡣", effect: { wisdom: 10 } },
        { description: "���ڸ����е��ߣ��������ˣ���������10�㡣", effect: { wealth: -10 } },
        { description: "���ڸ����ﵱ�����ˣ���������10�㡣", effect: { wealth: 10 } },
        { description: "���ڱ���û����ϣ��ǻۼ���10�㡣", effect: { wisdom: -10 } },
        { description: "���������ù�ϵ���������㿴�ذ��ֿ⣬��������20�㡣", effect: { wealth: 20 } },
        { description: "���ڸ����л����ϡ�е��䣬��������20�㡣", effect: { wealth: 20 } },
        { description: "���ڸ�����DPS�������ŵĵ�һҳ���ǻ�����20�㡣", effect: { wisdom: 20 } },
        { description: "���ڸ�������װ������̧���ˣ���������15�㡣", effect: { wealth: -15 } },
        { description: "���ڱ���û����ϣ��ǻۼ���15�㡣", effect: { wisdom: -15 } },
        { description: "���ڸ����б��������ˣ���������15�㡣", effect: { luck: 15 } },
    ];

const getRandomValue = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

let stats = { ...initialStats };
let actionsLeft = 5;
let daysLeft = 10; // ��ʣ��������Ϊ10
let playerName, playerAge, playerMbti;

document.getElementById('start-form').addEventListener('submit', function (e) {
    e.preventDefault();

    playerName = document.getElementById('name').value;
    playerAge = document.getElementById('age').value;
    playerMbti = document.getElementById('mbti').value;

    // ��ʼ������ֵ
    stats = {
        wisdom: getRandomValue(10, 100) + mbtiBonus[playerMbti].wisdom,
        strength: getRandomValue(10, 100) + mbtiBonus[playerMbti].strength,
        wealth: getRandomValue(10, 100) + mbtiBonus[playerMbti].wealth,
        luck: getRandomValue(10, 100) + mbtiBonus[playerMbti].luck
    };

    // ��ʾ�����Ϣ
    document.getElementById('player-info').innerHTML = `
        ����: ${playerName} <br>
        ����: ${playerAge} <br>
        MBTI: ${playerMbti}
    `;

    // ��ʾ�¼�ҳ��
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
        eventLog.scrollTop = eventLog.scrollHeight; // �Զ������������¼�

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

    // ����Ƿ����κ�����ֵΪ����
    if (stats.wisdom < 0 || stats.strength < 0 || stats.wealth < 0 || stats.luck < 0) {
        showFailureEnding();
        return;
    }

    if (daysLeft === 0) {
        document.getElementById('action-button').textContent = '�鿴���';
    } else if (actionsLeft === 0) {
        document.getElementById('action-button').textContent = '��һ��';
    } else {
        document.getElementById('action-button').textContent = '�ж�';
    }
}

    function showEnding() {
        document.getElementById('event-container').classList.add('hidden');
        document.getElementById('end-container').classList.remove('hidden');

        const ending = document.getElementById('ending');
        let endingText = '';

        if (stats.wisdom > 80 && stats.strength > 80 && stats.wealth > 80 && stats.luck > 80) {
            endingText = '���Ϊ�˽�������ǿ��PVE�ų��������ӷ��������ǳ�Խ���Ϲ�����ţ�Ƶ����ѣ��Ϲ����der�����Ź����';
        } else if (stats.wisdom > 60 && stats.strength > 60 && stats.wealth > 60 && stats.luck > 60) {
            endingText = '���Ϊ��һ�������PVE�ų��������𾴣�һ�ܿ�20����ͨ����ʱ������۵�һ����Ȼû������������ʹ�������š�';
        } else if (stats.wisdom > 40 && stats.strength > 40 && stats.wealth > 40 && stats.luck > 40) {
            endingText = '���Ϊ��һ����ͨ��PVE�ų��������ų����ڵ�ʱ����ż���油һ�£�Ҳ�ܿ�����ʱ���ϱ��������ʱ���ڰ�ս';
        } else if (stats.wisdom > 90) {
            endingText = '��ƾ�賬�ߵ��ǻ۳�Ϊ�˽����������ս���۹��PVE�ų��������Ӳ���������Ҷ������Ϊ�������ѡ���';
        } else if (stats.strength > 90) {
            endingText = '��ƾ�賬�ߵ�������Ϊ�˽���������ǿ��սʿ��һ��ָ�ӻ���һ�ߴ�����ߵ�DPS����Ҷ������Ϊ��ս���ѡ���';
        } else if (stats.wealth > 90) {
            endingText = '��ƾ�賬�ߵĲ�����Ϊ�˽���������е��ų�����������10Z����Ҷ������Ϊ�������ѡ������ڱ�����������ǰ�Ļ�����ˣ�';
        } else if (stats.luck > 90) {
            endingText = '��ƾ�賬�ߵ�������Ϊ�˽������������˵��ų���˫�������㣡��Ҷ������Ϊ���������ѡ������ڱ�����������ǰ�Ļ�����ˣ�';
        } else {
            endingText = '��δ�ܳ�Ϊһ���ɹ���PVE�ų���ֻ�ܱ��Ϲ���ȥ�ڸ�����Ϸ�ﵱ��ū������̰�ڡ�';
        }

        ending.textContent = endingText;
    }
