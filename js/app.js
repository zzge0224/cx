/* ============================================================
   传讯 Mobile — app.js
   All-in-one application logic
   ============================================================ */
'use strict';

/* ── Constants ── */
const APP_KEY = 'CHUANXUN_MOBILE_V1';
const STORE = window.localforage || null;

const WELCOME_LINES = [
    { l1: '♡ 爱 ♡',     l2: '正在连接我们的思绪' },
    { l1: '𝑳𝒐𝒗𝒆',       l2: '若要由我来谈论爱的话' },
    { l1: 'Soulmate',    l2: '灵魂正在共振' },
    { l1: '絆',           l2: '看不见的羁绊' },
    { l1: '∞',           l2: '无限循环的思念' },
    { l1: '星轨',         l2: '交汇时互放的光亮' },
    { l1: 'Melody',      l2: '心跳的旋律为你奏响' },
    { l1: '量子纠缠',     l2: '超越距离的默契' },
    { l1: 'Serendipity', l2: '最美丽的意外' },
    { l1: '希望',         l2: '你就是我的希望' },
];

const MOOD_EMOJIS = [
    { e: '😊', label: '开心' }, { e: '🥰', label: '恋爱脑' },
    { e: '😍', label: '惊喜' }, { e: '😌', label: '平静' },
    { e: '🤩', label: '兴奋' }, { e: '😘', label: '想你' },
    { e: '🥳', label: '庆祝' }, { e: '😎', label: '自信' },
    { e: '🤔', label: '思考' }, { e: '😴', label: '困倦' },
    { e: '😞', label: '难过' }, { e: '😢', label: '伤心' },
    { e: '😡', label: '生气' }, { e: '😤', label: '委屈' },
    { e: '🤒', label: '不舒服' }, { e: '😕', label: '迷茫' },
    { e: '😫', label: '疲惫' }, { e: '🫶', label: '感恩' },
    { e: '🌸', label: '春天' }, { e: '☁️', label: '阴天' },
];

const AVATAR_EMOJIS = [
    '🌸','💛','🌙','⭐','🍀','🌊','🦋','🌺','💜','🌙',
    '🐱','🐰','🐻','🦊','🐼','🌻','🍓','🍒','🌷','💎',
    '🍵','🧸','🎀','🎵','🌿','🦄','🐬','🌈','✨','💫',
];

const CHAT_EMOJIS = [
    '😊','😄','😍','🥰','😘','😂','🤣','😅','😌','🤩',
    '😏','😢','😭','😡','🤔','😴','🥺','😎','🤭','😱',
    '❤️','🧡','💛','💚','💙','💜','🖤','🤍','💕','💖',
    '🌸','🌺','🌻','🌹','🌷','✨','⭐','🌙','☀️','🌈',
    '🎵','🎶','🎉','🎊','🎁','🍀','🦋','🐱','🐰','🐻',
    '👍','👏','🙌','🤝','💪','🫶','🤞','🙏','✌️','🤙',
];

/* ── Default Reply Library ── */
const DEFAULT_REPLIES = [
    '想你了 💕',
    '你最近怎么样呀？',
    '我在想你呢',
    '今天过得好吗？',
    '你知道吗，我很喜欢你',
    '能见到你就好了',
    '希望你今天一切都好',
    '想要抱抱你',
    '你笑起来好好看',
    '我好喜欢你哦 🥰',
    '你今天也很可爱呢',
    '最近有点想你',
    '你有空吗？好想和你聊聊天',
    '你是我很重要的人',
    '谢谢你一直在',
    '想和你一起看星星',
    '你有没有在想我？',
    '见到你的时候总是会不自觉地笑',
    '你睡了吗？做个好梦',
    '今天遇到了一件有趣的事，只想告诉你',
    '无论什么时候，我都支持你',
    '你让我觉得，生活是很美好的事',
    '等我哦',
    '我在呢',
    '好想你 🌙',
];

const TAROT_CARDS = [
    { name: '愚者', num: 'O',     symbol: '🃏', upright: '新的开始，纯真，冒险，无限可能', reversed: '鲁莽，迷失，犹豫不前' },
    { name: '魔术师', num: 'I',   symbol: '✨', upright: '意志力，创造力，技能，行动', reversed: '操控，意志力不足，浪费才能' },
    { name: '女祭司', num: 'II',  symbol: '🌙', upright: '直觉，神秘，内在知识，耐心', reversed: '秘密，直觉受阻，表面文章' },
    { name: '女皇', num: 'III',   symbol: '🌸', upright: '丰收，创造，母性，自然之美', reversed: '依赖，创作受阻，缺乏自爱' },
    { name: '皇帝', num: 'IV',    symbol: '👑', upright: '权威，结构，稳定，保护', reversed: '控制欲，刚愎自用，专制' },
    { name: '教皇', num: 'V',     symbol: '🕊️', upright: '精神引导，传统，信仰，忠诚', reversed: '质疑权威，打破规则，挑战传统' },
    { name: '恋人', num: 'VI',    symbol: '💕', upright: '爱情，和谐，价值观一致，选择', reversed: '价值观冲突，犹豫，不和谐' },
    { name: '战车', num: 'VII',   symbol: '⚡', upright: '意志力，专注，胜利，掌控', reversed: '失控，侵略，缺乏方向' },
    { name: '力量', num: 'VIII',  symbol: '🦁', upright: '内在力量，勇气，耐心，同情', reversed: '自我怀疑，软弱，缺乏信心' },
    { name: '隐士', num: 'IX',    symbol: '🕯️', upright: '内省，独处，自我发现，寻求答案', reversed: '孤立，退缩，迷失' },
    { name: '命运之轮', num: 'X', symbol: '🎡', upright: '命运，转机，好运，周期变化', reversed: '厄运，抵抗变化，失控' },
    { name: '正义', num: 'XI',    symbol: '⚖️', upright: '公正，真相，诚实，因果', reversed: '不公正，不诚实，逃避责任' },
    { name: '倒吊人', num: 'XII', symbol: '🙃', upright: '暂停，放手，新视角，牺牲', reversed: '延迟，抵抗，浪费时间' },
    { name: '死神', num: 'XIII',  symbol: '🌑', upright: '结束与转变，放下，新生', reversed: '抗拒改变，停滞，执念' },
    { name: '节制', num: 'XIV',   symbol: '🌊', upright: '平衡，耐心，目的，和谐', reversed: '失调，过度，缺乏耐心' },
    { name: '恶魔', num: 'XV',    symbol: '🌀', upright: '执念，物质主义，成瘾，受困', reversed: '解脱，觉醒，打破束缚' },
    { name: '塔', num: 'XVI',     symbol: '⚡', upright: '突然变化，混乱，启示', reversed: '逃避改变，拖延灾难' },
    { name: '星星', num: 'XVII',  symbol: '⭐', upright: '希望，灵感，平静，更新', reversed: '绝望，失去信心，幻灭' },
    { name: '月亮', num: 'XVIII', symbol: '🌙', upright: '幻觉，恐惧，潜意识，梦境', reversed: '困惑消散，摆脱恐惧，真相浮现' },
    { name: '太阳', num: 'XIX',   symbol: '☀️', upright: '喜悦，成功，活力，光明', reversed: '过度乐观，延误的成功' },
    { name: '审判', num: 'XX',    symbol: '🔔', upright: '反思，内心呼唤，原谅，重生', reversed: '自我怀疑，拒绝反思' },
    { name: '世界', num: 'XXI',   symbol: '🌍', upright: '完成，整合，成就，满足', reversed: '未竟之事，缺乏完结' },
];

/* ── Application State ── */
let state = {
    messages: [],
    settings: {
        myName: '宝贝',
        partnerName: '亲爱的',
        myEmoji: '💛',
        partnerEmoji: '🌸',
        partnerStatus: '在线',
        theme: 'light',
        color: 'pink',
        fontSize: 16,
        annDate: '',
        annName: '在一起',
        bgImage: '',
        autoReply: true,
        autoReplyDelay: 1500,
        autoReplyCount: 1,
    },
    moods: {},
    replyLibrary: [],   // [{ id, text }, ...]
    playlist: [],
    fortuneHistory: [],
    currentMoodMonth: { year: new Date().getFullYear(), month: new Date().getMonth() },
    selectedMoodDate: null,
    selectedMoodEmoji: null,
    currentTrackIndex: -1,
    isPlaying: false,
    isLoopOn: false,
    replyTo: null,
    currentFortuneCard: null,
    lastCoinResult: null,
};

/* ── DOM helpers ── */
const $ = id => document.getElementById(id);
const q = sel => document.querySelector(sel);
const qa = sel => document.querySelectorAll(sel);

/* ── Toast ── */
function toast(msg, type = 'info', duration = 2500) {
    const icons = { success: 'fa-check-circle', warning: 'fa-exclamation-triangle', error: 'fa-times-circle', info: 'fa-info-circle' };
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i> ${msg}`;
    const container = $('toast-container');
    if (container) {
        container.appendChild(el);
        setTimeout(() => {
            el.classList.add('fade-out');
            setTimeout(() => el.remove(), 300);
        }, duration);
    }
}

/* ── Data persistence ── */
async function saveData() {
    try {
        const data = {
            messages: state.messages,
            settings: state.settings,
            moods: state.moods,
            replyLibrary: state.replyLibrary,
            playlist: state.playlist.map(t => ({ name: t.name })), // only names, not blobs
            fortuneHistory: state.fortuneHistory.slice(0, 50),
        };
        if (STORE) {
            await STORE.setItem(APP_KEY, JSON.stringify(data));
        } else {
            localStorage.setItem(APP_KEY, JSON.stringify(data));
        }
    } catch (e) {
        console.warn('[save] error:', e);
    }
}

async function loadData() {
    try {
        let raw = null;
        if (STORE) {
            raw = await STORE.getItem(APP_KEY);
        } else {
            raw = localStorage.getItem(APP_KEY);
        }
        if (!raw) return;
        const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
        if (data.messages)       state.messages       = data.messages;
        if (data.settings)       state.settings       = { ...state.settings, ...data.settings };
        if (data.moods)          state.moods          = data.moods;
        if (data.replyLibrary)   state.replyLibrary   = data.replyLibrary;
        if (data.fortuneHistory) state.fortuneHistory = data.fortuneHistory;
        normalizeReplyLibrary();
    } catch (e) {
        console.warn('[load] error:', e);
    }
}

let _saveTimer = null;
function scheduleSave() {
    clearTimeout(_saveTimer);
    _saveTimer = setTimeout(saveData, 800);
}

/* ── Render helpers ── */
function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
}
function formatDate(ts) {
    const d = new Date(ts);
    const today = new Date();
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
    if (d.toDateString() === today.toDateString()) return '今天';
    if (d.toDateString() === yesterday.toDateString()) return '昨天';
    return d.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** 从任意存储格式取出词条正文（兼容字符串、content 字段等） */
function getReplyEntryText(entry) {
    if (entry == null) return '';
    if (typeof entry === 'string') return entry.trim();
    if (typeof entry === 'object') {
        const t = entry.text ?? entry.content ?? entry.body ?? entry.reply ?? entry.value;
        return String(t != null ? t : '').trim();
    }
    return String(entry).trim();
}

/** 统一为 { id, text }，避免词条库不显示 */
function normalizeReplyLibrary() {
    if (!Array.isArray(state.replyLibrary)) state.replyLibrary = [];
    state.replyLibrary = state.replyLibrary.map((raw, i) => {
        let text = getReplyEntryText(raw);
        if (!text) text = '（未设置内容）';
        let id = 'e_' + i;
        if (raw && typeof raw === 'object' && raw.id != null) id = String(raw.id);
        else id = 'e_' + Date.now() + '_' + i + '_' + Math.random().toString(36).slice(2, 8);
        return { id, text };
    });
}

/* ── Message rendering ── */
function renderMessages() {
    const container = $('messages-list');
    if (!container) return;
    container.innerHTML = '';
    const empty = $('empty-state');

    if (state.messages.length === 0) {
        if (empty) empty.classList.remove('hidden');
        return;
    }
    if (empty) empty.classList.add('hidden');

    let lastDate = null;
    state.messages.forEach((msg, idx) => {
        const msgDate = formatDate(msg.time);
        if (msgDate !== lastDate) {
            lastDate = msgDate;
            container.appendChild(createDateDivider(msgDate));
        }
        container.appendChild(createMessageEl(msg, idx));
    });
}

function createDateDivider(text) {
    const el = document.createElement('div');
    el.className = 'msg-system';
    el.innerHTML = `<span class="msg-system-text">${escapeHtml(text)}</span>`;
    return el;
}

function createMessageEl(msg, idx) {
    if (msg.type === 'system') {
        const el = document.createElement('div');
        el.className = 'msg-system';
        el.innerHTML = `<span class="msg-system-text">${escapeHtml(msg.content)}</span>`;
        return el;
    }

    const isMe = msg.sender === 'me';
    const row = document.createElement('div');
    row.className = `msg-row ${isMe ? 'sent' : 'received'}`;
    row.dataset.idx = idx;

    let avatarHtml = '';
    if (!isMe) {
        avatarHtml = `<div class="msg-avatar">${escapeHtml(state.settings.partnerEmoji)}</div>`;
    }

    let replyHtml = '';
    if (msg.replyTo) {
        const whoName = msg.replyTo.sender === 'me' ? state.settings.myName : state.settings.partnerName;
        replyHtml = `<div class="msg-reply-quote">${escapeHtml(whoName)}: ${escapeHtml(msg.replyTo.text)}</div>`;
    }

    let bubbleHtml = '';
    if (msg.type === 'image') {
        bubbleHtml = `<img class="msg-image" src="${msg.content}" alt="图片" loading="lazy" data-msg-idx="${idx}">`;
    } else if (msg.type === 'fortune') {
        bubbleHtml = `<div class="msg-fortune">
            <div class="msg-fortune-name">${escapeHtml(msg.cardName || '')} ${escapeHtml(msg.cardSymbol || '')}</div>
            <div class="msg-fortune-meaning">${escapeHtml(msg.content)}</div>
        </div>`;
    } else {
        bubbleHtml = `<div class="msg-bubble" data-msg-idx="${idx}">${escapeHtml(msg.content)}</div>`;
    }

    row.innerHTML = `
        ${avatarHtml}
        <div class="msg-content">
            ${replyHtml}
            ${bubbleHtml}
            <span class="msg-time">${formatTime(msg.time)}</span>
        </div>
    `;

    // Long press for context menu
    const bubble = row.querySelector('.msg-bubble, .msg-image, .msg-fortune');
    if (bubble) {
        let pressTimer;
        bubble.addEventListener('touchstart', e => {
            pressTimer = setTimeout(() => showContextMenu(e, msg, idx), 500);
        }, { passive: true });
        bubble.addEventListener('touchend',   () => clearTimeout(pressTimer));
        bubble.addEventListener('touchmove',  () => clearTimeout(pressTimer));
        bubble.addEventListener('contextmenu', e => {
            e.preventDefault();
            showContextMenu(e, msg, idx);
        });
        // Image lightbox tap
        if (msg.type === 'image') {
            bubble.addEventListener('click', () => openLightbox(msg.content));
        }
    }

    return row;
}

function scrollToBottom(smooth = true) {
    const c = $('chat-container');
    if (!c) return;
    requestAnimationFrame(() => {
        c.scrollTo({ top: c.scrollHeight, behavior: smooth ? 'smooth' : 'instant' });
    });
}

/* ── Context menu ── */
let _contextMenu = null;
function showContextMenu(e, msg, idx) {
    closeContextMenu();
    const menu = document.createElement('div');
    menu.className = 'msg-context-menu';

    const items = [
        { icon: 'fa-reply',    label: '回复',    action: () => startReply(msg) },
        { icon: 'fa-copy',     label: '复制',    action: () => copyText(msg.content) },
        { icon: 'fa-trash-alt',label: '删除',    action: () => deleteMessage(idx), danger: true },
    ];

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = `msg-context-item${item.danger ? ' danger' : ''}`;
        el.innerHTML = `<i class="fas ${item.icon}"></i> ${item.label}`;
        el.addEventListener('click', () => { item.action(); closeContextMenu(); });
        menu.appendChild(el);
    });

    // Position
    const touch = e.changedTouches ? e.changedTouches[0] : e;
    let x = touch.clientX || e.clientX || 100;
    let y = touch.clientY || e.clientY || 200;
    menu.style.left = Math.min(x, window.innerWidth - 180) + 'px';
    menu.style.top  = Math.min(y, window.innerHeight - 150) + 'px';
    menu.style.position = 'fixed';
    document.body.appendChild(menu);
    _contextMenu = menu;

    document.addEventListener('click', closeContextMenu, { once: true });
    document.addEventListener('touchstart', closeContextMenu, { once: true, passive: true });
}
function closeContextMenu() {
    if (_contextMenu) { _contextMenu.remove(); _contextMenu = null; }
}

function copyText(text) {
    if (!text) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => toast('已复制', 'success'));
    } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); toast('已复制', 'success'); } catch (_) {}
        ta.remove();
    }
}

function startReply(msg) {
    state.replyTo = msg;
    const whoName = msg.sender === 'me' ? state.settings.myName : state.settings.partnerName;
    $('reply-preview-who').textContent = whoName;
    $('reply-preview-text').textContent = msg.type === 'image' ? '[图片]' : msg.content;
    $('reply-preview').classList.remove('hidden');
    $('message-input').focus();
}

function cancelReply() {
    state.replyTo = null;
    $('reply-preview').classList.add('hidden');
}

function deleteMessage(idx) {
    state.messages.splice(idx, 1);
    renderMessages();
    updateStats();
    scheduleSave();
    toast('已删除', 'info', 1500);
}

/* ── Send message ── */
function sendMessage(text, sender, type = 'text', extra = {}) {
    const msg = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        sender,
        type,
        content: text,
        time: Date.now(),
        replyTo: state.replyTo || null,
        ...extra,
    };
    state.messages.push(msg);
    state.replyTo = null;
    $('reply-preview').classList.add('hidden');
    renderMessages();
    scrollToBottom();
    updateStats();
    scheduleSave();
}

function handleSend() {
    const input = $('message-input');
    const text = input.value.trim();
    if (!text) return;
    sendMessage(text, 'me');
    input.value = '';
    input.style.height = '';
    closeEmojiPanel();
    triggerAutoReply();
}

/* ── Auto-reply from reply library ── */
let _autoReplyTimer = null;
function triggerAutoReply() {
    if (!state.settings.autoReply) return;
    if (state.replyLibrary.length === 0) return;
    clearTimeout(_autoReplyTimer);

    const delay = state.settings.autoReplyDelay || 1500;
    const count = Math.min(state.settings.autoReplyCount || 1, state.replyLibrary.length);

    // Show typing indicator while "partner" is composing
    showTyping(delay - 100);

    _autoReplyTimer = setTimeout(() => {
        // Randomly shuffle and pick `count` entries
        const shuffled = [...state.replyLibrary].sort(() => Math.random() - 0.5);
        const picks = shuffled.slice(0, count);
        picks.forEach((entry, i) => {
            setTimeout(() => {
                sendMessage(entry.text, 'partner');
                // Show typing again between multiple replies
                if (i < picks.length - 1) showTyping(350);
            }, i * 500);
        });
    }, delay);
}

/* ── Typing simulation ── */
let _typingTimer = null;
function showTyping(duration = 1800) {
    const ti = $('typing-indicator');
    if (!ti) return;
    $('typing-avatar').textContent = state.settings.partnerEmoji;
    ti.classList.remove('hidden');
    scrollToBottom();
    clearTimeout(_typingTimer);
    _typingTimer = setTimeout(() => ti.classList.add('hidden'), duration);
}

/* ── Image handling ── */
async function compressImage(file, maxSize = 800, quality = 0.75) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let { width, height } = img;
                if (width > maxSize || height > maxSize) {
                    const ratio = Math.min(maxSize / width, maxSize / height);
                    width  = Math.round(width  * ratio);
                    height = Math.round(height * ratio);
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', quality));
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

async function handleImageFiles(files) {
    const arr = Array.from(files).slice(0, 5);
    for (const file of arr) {
        if (file.size > 10 * 1024 * 1024) {
            toast('图片过大（最大10MB）', 'warning'); continue;
        }
        try {
            const base64 = await compressImage(file);
            sendMessage(base64, 'me', 'image');
        } catch (e) {
            toast('图片处理失败', 'error');
        }
    }
}

/* ── Emoji panel ── */
function initEmojiPanel() {
    const panel = $('emoji-panel');
    if (!panel) return;
    panel.innerHTML = '';
    CHAT_EMOJIS.forEach(emoji => {
        const btn = document.createElement('button');
        btn.textContent = emoji;
        btn.title = emoji;
        btn.addEventListener('click', () => {
            const input = $('message-input');
            const start = input.selectionStart;
            const end   = input.selectionEnd;
            input.value = input.value.slice(0, start) + emoji + input.value.slice(end);
            input.setSelectionRange(start + emoji.length, start + emoji.length);
            input.focus();
            autoResizeInput(input);
        });
        panel.appendChild(btn);
    });
}

function toggleEmojiPanel() {
    const panel = $('emoji-panel');
    const btn   = $('emoji-btn');
    if (!panel) return;
    const open = !panel.classList.contains('hidden');
    if (open) {
        closeEmojiPanel();
    } else {
        panel.classList.remove('hidden');
        btn && btn.classList.add('active');
        $('message-input').blur();
    }
}

function closeEmojiPanel() {
    const panel = $('emoji-panel');
    const btn   = $('emoji-btn');
    panel && panel.classList.add('hidden');
    btn   && btn.classList.remove('active');
}

/* ── Coin toss ── */
function openCoinToss() {
    const overlay = $('coin-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    state.lastCoinResult = null;
    $('coin-result').textContent = '';
    const coin = $('coin');
    coin.className = 'coin';
}

function tossCoin() {
    const coin = $('coin');
    const resultEl = $('coin-result');
    if (!coin || !resultEl) return;
    const isHeads = Math.random() > 0.5;
    state.lastCoinResult = isHeads ? '正面' : '反面';
    coin.className = 'coin spinning';
    resultEl.textContent = '';
    setTimeout(() => {
        coin.className = isHeads ? 'coin flip-heads' : 'coin flip-tails';
        resultEl.textContent = state.lastCoinResult;
    }, 1200);
}

/* ── Settings UI ── */
function initSettingsUI() {
    // Emoji pickers
    ['my', 'partner'].forEach(who => {
        const container = $(`${who}-emoji-picker`);
        if (!container) return;
        container.innerHTML = '';
        AVATAR_EMOJIS.forEach(em => {
            const btn = document.createElement('button');
            btn.textContent = em;
            btn.addEventListener('click', () => {
                container.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                $(`${who}-emoji-preview`).textContent = em;
            });
            container.appendChild(btn);
        });
    });
}

function openSettings(tab = 'appearance') {
    const modal = $('settings-modal');
    if (!modal) return;
    updateStats();
    // Fill current values
    $('my-name-input').value    = state.settings.myName;
    $('partner-name-input').value = state.settings.partnerName;
    $('partner-status-input').value = state.settings.partnerStatus || '';
    $('my-emoji-preview').textContent      = state.settings.myEmoji;
    $('partner-emoji-preview').textContent = state.settings.partnerEmoji;
    $('font-size-display').textContent = state.settings.fontSize + 'px';
    if (state.settings.annDate) $('ann-date-input').value = state.settings.annDate;
    if (state.settings.annName) $('ann-name-input').value = state.settings.annName;

    // Update theme button states
    const isLight = state.settings.theme === 'light';
    $('theme-light-btn').classList.toggle('active', isLight);
    $('theme-dark-btn').classList.toggle('active', !isLight);

    // Update color dots
    qa('#color-grid .color-dot').forEach(dot => {
        dot.classList.toggle('active', dot.dataset.color === state.settings.color);
    });

    showModal(modal, tab);
}

/**
 * 仅在指定弹窗内切换标签（避免「设置」与「词条库」两套 .tab/.tab-panel 互相冲突导致内容不显示）
 */
function switchTab(tabName, modalRoot) {
    const root = modalRoot || document;
    root.querySelectorAll('.tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabName);
    });
    root.querySelectorAll('.tab-panel').forEach(p => {
        p.classList.toggle('active', p.id === `tab-${tabName}`);
    });
}

function updateStats() {
    const msgCount  = state.messages.filter(m => m.type !== 'system').length;
    const photoCount = state.messages.filter(m => m.type === 'image').length;
    const moodCount = Object.keys(state.moods).length;
    $('stat-messages') && ($('stat-messages').textContent = msgCount);
    $('stat-moods')    && ($('stat-moods').textContent    = moodCount);
    $('stat-photos')   && ($('stat-photos').textContent   = photoCount);
    const days = calcAnnDays();
    $('stat-days') && ($('stat-days').textContent = days !== null ? days : '—');
}

function calcAnnDays() {
    if (!state.settings.annDate) return null;
    const start = new Date(state.settings.annDate);
    const now   = new Date();
    const diff  = Math.floor((now - start) / 86400000);
    return diff >= 0 ? diff : null;
}

function updateAnnBanner() {
    const banner = $('ann-banner');
    const days = calcAnnDays();
    if (days !== null) {
        $('ann-banner-text').textContent = `${state.settings.annName} 第 ${days + 1} 天`;
        banner && banner.classList.remove('hidden');
    } else {
        banner && banner.classList.add('hidden');
    }
}

/* ── Apply settings ── */
function applySettings() {
    const html = document.documentElement;
    html.dataset.theme = state.settings.theme;
    html.dataset.color = state.settings.color;
    document.body.style.setProperty('--font-size', state.settings.fontSize + 'px');

    // Header names
    const pn = $('partner-name'); if (pn) pn.textContent = state.settings.partnerName;
    const mn = $('my-name');      if (mn) mn.textContent = state.settings.myName;
    const pe = $('partner-emoji'); if (pe) pe.textContent = state.settings.partnerEmoji;
    const me = $('my-emoji');      if (me) me.textContent = state.settings.myEmoji;
    const pst = $('partner-status-text'); if (pst) pst.textContent = state.settings.partnerStatus || '在线';

    // Background
    const chat = $('chat-container');
    if (chat) {
        if (state.settings.bgImage) {
            chat.style.backgroundImage = `url(${state.settings.bgImage})`;
            chat.classList.add('has-bg');
        } else {
            chat.style.backgroundImage = '';
            chat.classList.remove('has-bg');
        }
    }
    updateAnnBanner();
}

/* ── Mood calendar ── */
function openMoodModal() {
    showModal($('mood-modal'));
    renderMoodCalendar();
}

function renderMoodCalendar() {
    const { year, month } = state.currentMoodMonth;
    const label = $('mood-month-label');
    if (label) label.textContent = `${year}年${month + 1}月`;

    const cal = $('mood-calendar');
    if (!cal) return;
    cal.innerHTML = '';

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Empty cells before first day
    for (let i = 0; i < firstDay; i++) {
        const el = document.createElement('div');
        el.className = 'mood-day empty';
        cal.appendChild(el);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
        const mood = state.moods[dateStr];
        const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;

        const el = document.createElement('div');
        el.className = `mood-day${mood ? ' has-mood' : ''}${isToday ? ' today' : ''}`;
        el.innerHTML = `<span class="mood-day-num">${d}</span>${mood ? `<span class="mood-day-emoji">${mood.emoji}</span>` : ''}`;
        el.addEventListener('click', () => openMoodEditor(dateStr, d));
        cal.appendChild(el);
    }

    // Legend
    const legend = $('mood-legend-list');
    if (legend) {
        legend.innerHTML = '';
        MOOD_EMOJIS.slice(0, 10).forEach(m => {
            const item = document.createElement('div');
            item.className = 'mood-legend-item';
            item.innerHTML = `<span>${m.e}</span><span>${m.label}</span>`;
            legend.appendChild(item);
        });
    }
}

function openMoodEditor(dateStr, dayNum) {
    const { year, month } = state.currentMoodMonth;
    const editor = $('mood-editor');
    if (!editor) return;

    state.selectedMoodDate = dateStr;
    state.selectedMoodEmoji = state.moods[dateStr]?.emoji || null;
    $('mood-editor-date').textContent = `${year}年${month + 1}月${dayNum}日`;

    // Emoji grid
    const grid = $('mood-emoji-grid');
    grid.innerHTML = '';
    MOOD_EMOJIS.forEach(m => {
        const btn = document.createElement('button');
        btn.className = `mood-emoji-btn${state.selectedMoodEmoji === m.e ? ' selected' : ''}`;
        btn.textContent = m.e;
        btn.title = m.label;
        btn.addEventListener('click', () => {
            state.selectedMoodEmoji = m.e;
            grid.querySelectorAll('.mood-emoji-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
        grid.appendChild(btn);
    });

    $('mood-note-input').value = state.moods[dateStr]?.note || '';
    editor.classList.remove('hidden');

    // Scroll to editor
    setTimeout(() => {
        editor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 50);
}

function saveMoodDay() {
    const dateStr = state.selectedMoodDate;
    if (!dateStr || !state.selectedMoodEmoji) {
        toast('请先选择一个心情表情', 'warning'); return;
    }
    state.moods[dateStr] = {
        emoji: state.selectedMoodEmoji,
        note: $('mood-note-input').value.trim(),
    };
    $('mood-editor').classList.add('hidden');
    renderMoodCalendar();
    updateStats();
    scheduleSave();
    toast('心情已记录 ' + state.selectedMoodEmoji, 'success', 1500);
}

/* ── Fortune ── */
function openFortuneModal() {
    showModal($('fortune-modal'));
    renderFortuneHistory();
    $('fortune-result').classList.add('hidden');
    $('fortune-deck').classList.remove('hidden');
}

function drawFortuneCard() {
    const card = TAROT_CARDS[Math.floor(Math.random() * TAROT_CARDS.length)];
    const isReversed = Math.random() > 0.65;
    state.currentFortuneCard = { ...card, isReversed };

    $('fortune-symbol').textContent = card.symbol;
    $('fortune-name').textContent   = card.name + (isReversed ? '（逆位）' : '');
    $('fortune-num').textContent    = card.num;
    $('fortune-meaning').innerHTML  = `<strong>${isReversed ? '逆位' : '正位'}：</strong>${isReversed ? card.reversed : card.upright}`;

    $('fortune-deck').classList.add('hidden');
    $('fortune-result').classList.remove('hidden');

    // Add to history
    state.fortuneHistory.unshift({
        name: card.name + (isReversed ? '（逆位）' : ''),
        symbol: card.symbol,
        meaning: isReversed ? card.reversed : card.upright,
        date: new Date().toLocaleDateString('zh-CN'),
    });
    if (state.fortuneHistory.length > 30) state.fortuneHistory.pop();
    scheduleSave();
    renderFortuneHistory();
}

function renderFortuneHistory() {
    const list = $('fortune-history-list');
    if (!list) return;
    list.innerHTML = '';
    if (state.fortuneHistory.length === 0) {
        list.innerHTML = '<div style="font-size:13px;color:var(--fg3);text-align:center;padding:8px">暂无记录</div>';
        return;
    }
    state.fortuneHistory.slice(0, 8).forEach(h => {
        const item = document.createElement('div');
        item.className = 'fortune-history-item';
        item.innerHTML = `
            <span class="fhi-symbol">${escapeHtml(h.symbol)}</span>
            <span class="fhi-name">${escapeHtml(h.name)}</span>
            <span class="fhi-date">${escapeHtml(h.date)}</span>
        `;
        list.appendChild(item);
    });
}

function sendFortune() {
    if (!state.currentFortuneCard) return;
    const c = state.currentFortuneCard;
    const text = `[${c.name}${c.isReversed ? '（逆位）' : ''}] ${c.isReversed ? c.reversed : c.upright}`;
    sendMessage(text, 'me', 'fortune', {
        cardName: c.name + (c.isReversed ? '（逆位）' : ''),
        cardSymbol: c.symbol,
    });
    closeModal($('fortune-modal'));
    toast('运势已发送', 'success', 1500);
}

/* ── Music Player ── */
const audioEl = () => $('audio-player');
let _objectURLs = []; // track for cleanup

function openMusicModal() {
    showModal($('music-modal'));
    renderPlaylist();
    updatePlayerUI();
}

function renderPlaylist() {
    const list = $('playlist');
    if (!list) return;
    list.innerHTML = '';
    if (state.playlist.length === 0) {
        list.innerHTML = '<div style="font-size:13px;color:var(--fg3);text-align:center;padding:16px">暂无歌曲，点击上方添加</div>';
        return;
    }
    state.playlist.forEach((track, i) => {
        const item = document.createElement('div');
        item.className = `playlist-item${i === state.currentTrackIndex ? ' active' : ''}`;
        item.innerHTML = `
            <div class="playlist-item-icon"><i class="fas fa-${i === state.currentTrackIndex && state.isPlaying ? 'music' : 'play'}"></i></div>
            <span class="playlist-item-name">${escapeHtml(track.name)}</span>
            <button class="playlist-item-del" data-idx="${i}" title="删除"><i class="fas fa-times"></i></button>
        `;
        item.querySelector('.playlist-item-del').addEventListener('click', e => {
            e.stopPropagation();
            removeTrack(i);
        });
        item.addEventListener('click', e => {
            if (!e.target.closest('.playlist-item-del')) playTrack(i);
        });
        list.appendChild(item);
    });
}

function playTrack(idx) {
    if (idx < 0 || idx >= state.playlist.length) return;
    const track = state.playlist[idx];
    if (!track.url) { toast('音频链接已失效，请重新添加', 'warning'); return; }
    state.currentTrackIndex = idx;
    const audio = audioEl();
    if (!audio) return;
    audio.src = track.url;
    audio.play().then(() => {
        state.isPlaying = true;
        updatePlayerUI();
        renderPlaylist();
        showMiniPlayer();
    }).catch(err => {
        console.warn('play error', err);
        toast('播放失败', 'error');
    });
}

function togglePlayPause() {
    const audio = audioEl();
    if (!audio || state.currentTrackIndex < 0) {
        if (state.playlist.length > 0) playTrack(0);
        return;
    }
    if (state.isPlaying) {
        audio.pause();
        state.isPlaying = false;
    } else {
        audio.play().catch(() => {});
        state.isPlaying = true;
    }
    updatePlayerUI();
}

function prevTrack() {
    const next = state.currentTrackIndex <= 0
        ? state.playlist.length - 1
        : state.currentTrackIndex - 1;
    playTrack(next);
}
function nextTrack() {
    if (state.playlist.length === 0) return;
    const next = (state.currentTrackIndex + 1) % state.playlist.length;
    playTrack(next);
}

function removeTrack(idx) {
    const track = state.playlist[idx];
    if (track.url) {
        try { URL.revokeObjectURL(track.url); } catch (_) {}
    }
    state.playlist.splice(idx, 1);
    if (state.currentTrackIndex === idx) {
        const audio = audioEl();
        if (audio) { audio.pause(); audio.src = ''; }
        state.currentTrackIndex = -1;
        state.isPlaying = false;
    } else if (state.currentTrackIndex > idx) {
        state.currentTrackIndex--;
    }
    renderPlaylist();
    updatePlayerUI();
    if (state.playlist.length === 0) hideMiniPlayer();
}

function handleMusicFiles(files) {
    Array.from(files).forEach(file => {
        const url = URL.createObjectURL(file);
        _objectURLs.push(url);
        state.playlist.push({
            name: file.name.replace(/\.[^.]+$/, ''),
            url,
        });
    });
    renderPlaylist();
    toast(`已添加 ${files.length} 首歌曲`, 'success', 1500);
}

function updatePlayerUI() {
    const track = state.playlist[state.currentTrackIndex];
    const titleEl  = $('music-title');
    const artistEl = $('music-artist');
    const playBtn  = $('music-play');
    const miniPlayBtn = $('mini-play');
    const miniTitle   = $('mini-title');
    const coverEl = $('music-cover');

    if (track) {
        if (titleEl)  titleEl.textContent  = track.name;
        if (artistEl) artistEl.textContent = '—';
        if (miniTitle) miniTitle.textContent = track.name;
    } else {
        if (titleEl)  titleEl.textContent  = '未播放';
        if (artistEl) artistEl.textContent = '—';
        if (miniTitle) miniTitle.textContent = '未播放';
    }

    const icon = state.isPlaying ? 'fa-pause' : 'fa-play';
    if (playBtn)    playBtn.innerHTML    = `<i class="fas ${icon}"></i>`;
    if (miniPlayBtn) miniPlayBtn.innerHTML = `<i class="fas ${icon}"></i>`;
    if (coverEl)    coverEl.classList.toggle('spinning', state.isPlaying);
}

function showMiniPlayer() {
    if (state.playlist.length > 0) {
        $('mini-player') && $('mini-player').classList.remove('hidden');
    }
}
function hideMiniPlayer() {
    $('mini-player') && $('mini-player').classList.add('hidden');
}

/* ── Export / Import ── */
function exportData() {
    const data = {
        version: '1.0',
        exportTime: new Date().toISOString(),
        messages: state.messages,
        settings: { ...state.settings, bgImage: '' }, // skip bg to reduce size
        moods: state.moods,
        fortuneHistory: state.fortuneHistory,
    };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `传讯备份_${new Date().toLocaleDateString('zh-CN').replace(/\//g,'-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast('数据已导出', 'success');
}

async function importData(file) {
    try {
        const text = await file.text();
        const data = JSON.parse(text);
        if (data.messages)       state.messages       = data.messages;
        if (data.settings)       state.settings       = { ...state.settings, ...data.settings };
        if (data.moods)          state.moods          = data.moods;
        if (data.replyLibrary)   state.replyLibrary   = data.replyLibrary;
        if (data.fortuneHistory) state.fortuneHistory = data.fortuneHistory;
        normalizeReplyLibrary();
        applySettings();
        renderMessages();
        scrollToBottom(false);
        updateStats();
        await saveData();
        toast('数据已导入', 'success');
    } catch (e) {
        toast('导入失败，请检查文件格式', 'error');
    }
}

function clearAllData() {
    if (!confirm('确定要清除所有数据吗？此操作不可恢复！')) return;
    state.messages       = [];
    state.moods          = {};
    state.fortuneHistory = [];
    state.replyLibrary   = DEFAULT_REPLIES.map((text, i) => ({ id: 'default_' + i, text }));
    state.settings = {
        myName: '宝贝', partnerName: '亲爱的',
        myEmoji: '💛', partnerEmoji: '🌸', partnerStatus: '在线',
        theme: 'light', color: 'pink', fontSize: 16,
        annDate: '', annName: '在一起', bgImage: '',
        autoReply: true, autoReplyDelay: 1500, autoReplyCount: 1,
    };
    applySettings();
    renderMessages();
    updateStats();
    saveData();
    toast('数据已清除', 'info');
}

/* ── Modal helpers ── */
function showModal(modal, tab) {
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (tab) switchTab(tab, modal);
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

/* ── Lightbox ── */
function openLightbox(src) {
    const lb = $('lightbox');
    if (!lb) return;
    $('lightbox-img').src = src;
    lb.classList.remove('hidden');
}
function closeLightbox() {
    $('lightbox') && $('lightbox').classList.add('hidden');
    $('lightbox-img').src = '';
}

/* ── Auto-resize textarea ── */
function autoResizeInput(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
}

/* ── Splash screen ── */
let _splashIdx = 0;
const SPLASH_TOTAL = 3;

function initSplash() {
    const PLEDGE = '我承诺善意使用，并对自己的行为负完全责任';
    updateSplashNav();

    $('splash-next').addEventListener('click', () => {
        if (_splashIdx < SPLASH_TOTAL - 1) {
            _splashIdx++;
            updateSplashSlide();
            updateSplashNav();
        }
    });
    $('splash-prev').addEventListener('click', () => {
        if (_splashIdx > 0) {
            _splashIdx--;
            updateSplashSlide();
            updateSplashNav();
        }
    });

    const pledgeInput = $('splash-pledge-input');
    const pledgeHint  = $('splash-pledge-hint');
    const enterBtn    = $('splash-enter');

    pledgeInput.addEventListener('input', () => {
        const val = pledgeInput.value;
        const valid = val === PLEDGE;
        pledgeInput.classList.toggle('valid', valid);
        pledgeHint.classList.toggle('valid', valid);
        pledgeHint.textContent = valid ? '✓ 承诺有效，可以进入' : '请完整输入上方承诺后方可进入';
        if (enterBtn) enterBtn.disabled = !valid;
    });

    enterBtn.addEventListener('click', () => {
        if (pledgeInput.value === PLEDGE) {
            enterApp();
        }
    });
}

function updateSplashSlide() {
    qa('.splash-slide').forEach(s => s.classList.toggle('active', +s.dataset.index === _splashIdx));
    qa('.sdot').forEach((d, i) => d.classList.toggle('active', i === _splashIdx));
    $('splash-page-num').textContent = `${_splashIdx + 1} / ${SPLASH_TOTAL}`;
}

function updateSplashNav() {
    const isLast = _splashIdx === SPLASH_TOTAL - 1;
    $('splash-prev').disabled = _splashIdx === 0;
    $('splash-next').style.display = isLast ? 'none' : '';
    const enterBtn = $('splash-enter');
    enterBtn.style.display = isLast ? '' : 'none';
    enterBtn.disabled = true; // re-evaluate when typing
}

function enterApp() {
    const splash = $('splash');
    splash.classList.add('fade-out');
    setTimeout(() => {
        splash.style.display = 'none';
        startWelcome();
    }, 800);
    try {
        localStorage.setItem('CHUANXUN_SEEN', '1');
    } catch (_) {}
}

/* ── Welcome animation ── */
function startWelcome() {
    const welcome = $('welcome');
    welcome.classList.remove('hidden');
    createWelcomeStars();
    createMeteors();

    const wl = WELCOME_LINES[Math.floor(Math.random() * WELCOME_LINES.length)];
    $('welcome-line1').textContent = wl.l1;
    $('welcome-line2').textContent = wl.l2;

    const bar  = $('welcome-loader-bar');
    const text = $('welcome-loader-text');
    const steps = [
        { w: '15%', t: '正在读取记忆存档…' },
        { w: '40%', t: '正在渲染我们的世界…' },
        { w: '70%', t: '正在连接情感网络…' },
        { w: '95%', t: '即将到达…' },
        { w: '100%', t: '欢迎回来 ♡' },
    ];
    const timings = [200, 600, 1200, 2000, 2600];

    timings.forEach((t, i) => {
        setTimeout(() => {
            bar.style.width  = steps[i].w;
            text.textContent = steps[i].t;
        }, t);
    });

    setTimeout(() => {
        welcome.classList.add('fade-out');
        setTimeout(() => {
            welcome.style.display = 'none';
            $('app').classList.remove('hidden');
            renderMessages();
            scrollToBottom(false);
            updateAnnBanner();
        }, 800);
    }, 3400);
}

function createWelcomeStars() {
    const container = $('welcome-stars');
    if (!container) return;
    for (let i = 0; i < 80; i++) {
        const s = document.createElement('span');
        const size = Math.random() * 2 + 1;
        s.style.cssText = `
            width:${size}px; height:${size}px;
            top:${Math.random() * 100}%; left:${Math.random() * 100}%;
            animation-delay:${Math.random() * 4}s;
            animation-duration:${2 + Math.random() * 4}s;
        `;
        container.appendChild(s);
    }
}

function createMeteors() {
    const container = $('welcome-meteors');
    if (!container) return;
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const m = document.createElement('div');
            m.className = 'welcome-meteor';
            m.style.cssText = `
                left:${Math.random() * 100}%; top:-60px;
                animation-duration:${0.8 + Math.random() * 0.8}s;
                animation-delay:${Math.random() * 0.3}s;
                opacity:0.6;
            `;
            container.appendChild(m);
            setTimeout(() => m.remove(), 1500);
        }, i * 400 + 600);
    }
}

function createSplashStars() {
    const container = $('splash-stars');
    if (!container) return;
    for (let i = 0; i < 60; i++) {
        const s = document.createElement('span');
        const size = Math.random() * 2 + 0.5;
        s.style.cssText = `
            width:${size}px; height:${size}px;
            top:${Math.random() * 100}%; left:${Math.random() * 100}%;
            animation-delay:${Math.random() * 3}s;
            animation-duration:${2 + Math.random() * 3}s;
        `;
        container.appendChild(s);
    }
}

/* ============================================================
   REPLY LIBRARY
   ============================================================ */

function openReplyModal() {
    showModal($('reply-modal'), 'reply-list');
    renderReplyList();
    syncReplySettings();
}

function renderReplyList() {
    const list = $('rl-list');
    const countEl = $('rl-count');
    if (!list) return;
    list.innerHTML = '';
    if (countEl) countEl.textContent = `共 ${state.replyLibrary.length} 条`;

    if (state.replyLibrary.length === 0) {
        list.innerHTML = `<div class="rl-empty">
            <span class="rl-empty-icon">📭</span>
            词条库为空<br>
            <small>添加词条后，对方会自动从中随机回复</small>
        </div>`;
        return;
    }

    state.replyLibrary.forEach((entry, idx) => {
        list.appendChild(createReplyCard(entry, idx));
    });
}

function createReplyCard(entry, idx) {
    const card = document.createElement('div');
    card.className = 'rl-card';
    card.dataset.idx = idx;

    // View mode
    const view = document.createElement('div');
    view.className = 'rl-card-view';
    const entryText = getReplyEntryText(entry);
    view.innerHTML = `
        <span class="rl-card-num">${idx + 1}</span>
        <span class="rl-card-text">${escapeHtml(entryText)}</span>
        <div class="rl-card-actions">
            <button class="rl-act-btn send" title="发送到对话"><i class="fas fa-paper-plane"></i></button>
            <button class="rl-act-btn edit" title="编辑"><i class="fas fa-pen"></i></button>
            <button class="rl-act-btn danger delete" title="删除"><i class="fas fa-times"></i></button>
        </div>
    `;

    // Edit mode (hidden)
    const editMode = document.createElement('div');
    editMode.className = 'rl-card-edit hidden';
    editMode.innerHTML = `
        <textarea class="rl-edit-input" rows="3">${escapeHtml(entryText)}</textarea>
        <div class="rl-edit-btns">
            <button class="rl-edit-btn cancel">取消</button>
            <button class="rl-edit-btn save">保存</button>
        </div>
    `;

    card.appendChild(view);
    card.appendChild(editMode);

    // Events
    view.querySelector('.rl-act-btn.send').addEventListener('click', () => {
        sendMessage(entryText, 'partner');
        closeModal($('reply-modal'));
        toast('词条已发送', 'success', 1500);
    });
    view.querySelector('.rl-act-btn.edit').addEventListener('click', () => {
        view.classList.add('hidden');
        editMode.classList.remove('hidden');
        editMode.querySelector('.rl-edit-input').focus();
    });
    view.querySelector('.rl-act-btn.delete').addEventListener('click', () => {
        deleteReplyEntry(idx);
    });
    editMode.querySelector('.rl-edit-btn.cancel').addEventListener('click', () => {
        editMode.classList.add('hidden');
        view.classList.remove('hidden');
    });
    editMode.querySelector('.rl-edit-btn.save').addEventListener('click', () => {
        const newText = editMode.querySelector('.rl-edit-input').value.trim();
        if (!newText) { toast('词条内容不能为空', 'warning'); return; }
        editReplyEntry(idx, newText);
    });

    // Long press to quick-send
    let pressTimer;
    view.addEventListener('touchstart', () => {
        pressTimer = setTimeout(() => {
            sendMessage(entryText, 'partner');
            closeModal($('reply-modal'));
            toast('词条已发送 ✓', 'success', 1500);
        }, 600);
    }, { passive: true });
    view.addEventListener('touchend',  () => clearTimeout(pressTimer));
    view.addEventListener('touchmove', () => clearTimeout(pressTimer));

    return card;
}

function addReplyEntry(text) {
    const trimmed = text.trim();
    if (!trimmed) return false;
    state.replyLibrary.push({ id: Date.now().toString(), text: trimmed });
    renderReplyList();
    scheduleSave();
    return true;
}

function editReplyEntry(idx, newText) {
    if (idx < 0 || idx >= state.replyLibrary.length) return;
    state.replyLibrary[idx].text = newText;
    renderReplyList();
    scheduleSave();
    toast('词条已更新', 'success', 1500);
}

function deleteReplyEntry(idx) {
    state.replyLibrary.splice(idx, 1);
    renderReplyList();
    scheduleSave();
    toast('已删除', 'info', 1200);
}

function bulkImportReplies(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) { toast('未发现有效词条', 'warning'); return; }
    lines.forEach(line => state.replyLibrary.push({ id: Date.now().toString() + Math.random(), text: line }));
    renderReplyList();
    scheduleSave();
    toast(`已导入 ${lines.length} 条词条`, 'success');
}

function exportReplyLibrary() {
    if (state.replyLibrary.length === 0) { toast('词条库为空', 'warning'); return; }
    const text = state.replyLibrary.map(e => e.text).join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `词条库_${new Date().toLocaleDateString('zh-CN').replace(/\//g,'-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast('词条库已导出', 'success');
}

function resetReplyLibrary() {
    if (!confirm(`将恢复为 ${DEFAULT_REPLIES.length} 条默认词条，现有词条将被替换，确认吗？`)) return;
    state.replyLibrary = DEFAULT_REPLIES.map((text, i) => ({ id: 'default_' + i, text }));
    renderReplyList();
    scheduleSave();
    toast('已恢复默认词条', 'success');
}

function syncReplySettings() {
    const toggle = $('auto-reply-toggle');
    if (toggle) toggle.checked = !!state.settings.autoReply;
    // Highlight active delay
    qa('#delay-options .rl-option-btn').forEach(btn => {
        btn.classList.toggle('active', +btn.dataset.delay === state.settings.autoReplyDelay);
    });
    // Highlight active count
    qa('#count-options .rl-option-btn').forEach(btn => {
        btn.classList.toggle('active', +btn.dataset.count === state.settings.autoReplyCount);
    });
}

function randomPreviewReplies() {
    if (state.replyLibrary.length === 0) {
        $('rl-preview-content').textContent = '词条库为空，请先添加词条';
        return;
    }
    const count = Math.min(state.settings.autoReplyCount || 1, state.replyLibrary.length);
    const shuffled = [...state.replyLibrary].sort(() => Math.random() - 0.5);
    const picks = shuffled.slice(0, count);
    $('rl-preview-content').textContent = picks.map(e => e.text).join('\n\n');
}

/* ── Event Listeners ── */
function setupListeners() {
    // Send button
    $('send-btn').addEventListener('click', handleSend);
    $('message-input').addEventListener('keydown', e => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
    $('message-input').addEventListener('input', function() {
        autoResizeInput(this);
        closeEmojiPanel();
    });

    // Emoji panel
    $('emoji-btn').addEventListener('click', toggleEmojiPanel);

    // Image input
    $('image-btn').addEventListener('click', () => $('image-input').click());
    $('image-input').addEventListener('change', e => {
        if (e.target.files.length) handleImageFiles(e.target.files);
        e.target.value = '';
    });

    // Sticker (same as image for now)
    $('sticker-btn').addEventListener('click', () => $('image-input').click());

    // Coin toss
    $('coin-btn').addEventListener('click', openCoinToss);
    $('coin-backdrop').addEventListener('click', () => $('coin-overlay').classList.add('hidden'));
    $('coin-cancel').addEventListener('click', () => $('coin-overlay').classList.add('hidden'));
    $('coin').addEventListener('click', tossCoin);
    $('coin-send').addEventListener('click', () => {
        if (!state.lastCoinResult) { tossCoin(); return; }
        sendMessage(`🪙 硬币结果：${state.lastCoinResult}`, 'me', 'system');
        $('coin-overlay').classList.add('hidden');
        state.lastCoinResult = null;
        toast('结果已发送', 'success', 1500);
    });


    // Reply preview close
    $('reply-preview-close').addEventListener('click', cancelReply);

    // Header buttons
    $('settings-btn').addEventListener('click', () => openSettings('appearance'));
    $('fortune-btn').addEventListener('click', openFortuneModal);
    $('mood-btn').addEventListener('click', openMoodModal);
    $('music-btn').addEventListener('click', openMusicModal);
    $('reply-lib-btn').addEventListener('click', openReplyModal);
    $('ann-edit-btn') && $('ann-edit-btn').addEventListener('click', () => openSettings('profile'));

    // ── Reply Library ──
    $('rl-add-btn').addEventListener('click', () => {
        const input = $('rl-add-input');
        const text = input.value.trim();
        if (!text) { toast('请输入词条内容', 'warning'); return; }
        if (addReplyEntry(text)) {
            input.value = '';
            input.style.height = '';
            toast('词条已添加 ✓', 'success', 1500);
        }
    });
    $('rl-add-input').addEventListener('keydown', e => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            $('rl-add-btn').click();
        }
    });
    $('rl-import-btn').addEventListener('click', () => {
        $('rl-import-textarea').value = '';
        showModal($('rl-import-modal'));
    });
    $('rl-import-confirm').addEventListener('click', () => {
        const text = $('rl-import-textarea').value;
        bulkImportReplies(text);
        closeModal($('rl-import-modal'));
    });
    $('rl-export-btn').addEventListener('click', exportReplyLibrary);
    $('rl-reset-btn').addEventListener('click', resetReplyLibrary);
    $('rl-clear-btn').addEventListener('click', () => {
        if (state.replyLibrary.length === 0) { toast('词条库已经是空的', 'info'); return; }
        if (!confirm('确定要清空所有词条吗？')) return;
        state.replyLibrary = [];
        renderReplyList();
        scheduleSave();
        toast('词条库已清空', 'info');
    });

    // Auto-reply settings
    $('auto-reply-toggle').addEventListener('change', e => {
        state.settings.autoReply = e.target.checked;
        scheduleSave();
        toast(e.target.checked ? '自动回复已开启 ✓' : '自动回复已关闭', 'info', 1500);
    });
    qa('#delay-options .rl-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.settings.autoReplyDelay = +btn.dataset.delay;
            qa('#delay-options .rl-option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            scheduleSave();
        });
    });
    qa('#count-options .rl-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            state.settings.autoReplyCount = +btn.dataset.count;
            qa('#count-options .rl-option-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            scheduleSave();
        });
    });
    $('rl-preview-btn').addEventListener('click', randomPreviewReplies);

    // Partner / my avatar click -> settings
    $('partner-avatar-btn').addEventListener('click', () => openSettings('profile'));
    $('my-avatar-btn').addEventListener('click', () => openSettings('profile'));

    // Modal overlays and close buttons (delegated)
    document.addEventListener('click', e => {
        const closeTarget = e.target.dataset.close;
        if (closeTarget) closeModal($(closeTarget));
    });

    // Settings / 词条库 tabs（必须在对应 .modal 内切换，否则会互相覆盖 active）
    qa('.tab').forEach(t => {
        t.addEventListener('click', () => {
            const root = t.closest('.modal');
            if (root) switchTab(t.dataset.tab, root);
        });
    });

    // Theme toggle
    $('theme-light-btn').addEventListener('click', () => {
        state.settings.theme = 'light';
        applySettings();
        $('theme-light-btn').classList.add('active');
        $('theme-dark-btn').classList.remove('active');
        scheduleSave();
    });
    $('theme-dark-btn').addEventListener('click', () => {
        state.settings.theme = 'dark';
        applySettings();
        $('theme-dark-btn').classList.add('active');
        $('theme-light-btn').classList.remove('active');
        scheduleSave();
    });

    // Color dots
    qa('#color-grid .color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            state.settings.color = dot.dataset.color;
            applySettings();
            qa('#color-grid .color-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            scheduleSave();
        });
    });

    // Font size
    $('font-minus').addEventListener('click', () => {
        if (state.settings.fontSize > 12) {
            state.settings.fontSize -= 1;
            $('font-size-display').textContent = state.settings.fontSize + 'px';
            document.body.style.setProperty('--font-size', state.settings.fontSize + 'px');
            scheduleSave();
        }
    });
    $('font-plus').addEventListener('click', () => {
        if (state.settings.fontSize < 22) {
            state.settings.fontSize += 1;
            $('font-size-display').textContent = state.settings.fontSize + 'px';
            document.body.style.setProperty('--font-size', state.settings.fontSize + 'px');
            scheduleSave();
        }
    });

    // Background image
    $('bg-btn').addEventListener('click', () => $('bg-input').click());
    $('bg-input').addEventListener('change', async e => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            const base64 = await compressImage(file, 1200, 0.7);
            state.settings.bgImage = base64;
            applySettings();
            scheduleSave();
            toast('背景已设置', 'success', 1500);
        } catch (_) { toast('设置背景失败', 'error'); }
        e.target.value = '';
    });
    $('bg-clear-btn').addEventListener('click', () => {
        state.settings.bgImage = '';
        applySettings();
        scheduleSave();
        toast('背景已清除', 'info', 1500);
    });

    // Partner status
    $('partner-status-input').addEventListener('input', e => {
        state.settings.partnerStatus = e.target.value;
        const el = $('partner-status-text'); if (el) el.textContent = e.target.value || '在线';
        scheduleSave();
    });

    // Save profile
    $('save-profile-btn').addEventListener('click', () => {
        const mName = $('my-name-input').value.trim();
        const pName = $('partner-name-input').value.trim();
        const mEmoji = $('my-emoji-preview').textContent;
        const pEmoji = $('partner-emoji-preview').textContent;
        if (mName) state.settings.myName    = mName;
        if (pName) state.settings.partnerName = pName;
        state.settings.myEmoji      = mEmoji;
        state.settings.partnerEmoji = pEmoji;
        applySettings();
        renderMessages();
        scheduleSave();
        toast('资料已保存', 'success', 1500);
    });

    // Anniversary
    $('save-ann-btn').addEventListener('click', () => {
        const d = $('ann-date-input').value;
        const n = $('ann-name-input').value.trim();
        if (!d) { toast('请选择纪念日期', 'warning'); return; }
        state.settings.annDate = d;
        state.settings.annName = n || '在一起';
        updateAnnBanner();
        scheduleSave();
        toast('纪念日已保存 ❤️', 'success', 2000);
    });

    // Data export/import/clear
    $('export-btn').addEventListener('click', exportData);
    $('import-input').addEventListener('change', e => {
        if (e.target.files[0]) importData(e.target.files[0]);
        e.target.value = '';
    });
    $('clear-btn').addEventListener('click', clearAllData);

    // Mood navigation
    $('mood-prev-month').addEventListener('click', () => {
        let { year, month } = state.currentMoodMonth;
        month--;
        if (month < 0) { month = 11; year--; }
        state.currentMoodMonth = { year, month };
        renderMoodCalendar();
    });
    $('mood-next-month').addEventListener('click', () => {
        let { year, month } = state.currentMoodMonth;
        month++;
        if (month > 11) { month = 0; year++; }
        state.currentMoodMonth = { year, month };
        renderMoodCalendar();
    });
    $('mood-cancel').addEventListener('click', () => $('mood-editor').classList.add('hidden'));
    $('mood-save').addEventListener('click', saveMoodDay);

    // Fortune
    $('fortune-draw-btn').addEventListener('click', drawFortuneCard);
    $('fortune-again').addEventListener('click', () => {
        $('fortune-result').classList.add('hidden');
        $('fortune-deck').classList.remove('hidden');
    });
    $('fortune-send').addEventListener('click', sendFortune);

    // Music
    $('music-play').addEventListener('click', togglePlayPause);
    $('music-prev').addEventListener('click', prevTrack);
    $('music-next').addEventListener('click', nextTrack);
    $('music-loop').addEventListener('click', () => {
        state.isLoopOn = !state.isLoopOn;
        $('music-loop').classList.toggle('loop-on', state.isLoopOn);
        const audio = audioEl();
        if (audio) audio.loop = state.isLoopOn;
    });
    $('music-input').addEventListener('change', e => {
        if (e.target.files.length) handleMusicFiles(e.target.files);
        e.target.value = '';
    });
    $('music-progress-track').addEventListener('click', e => {
        const audio = audioEl();
        if (!audio || !audio.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const pct = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pct * audio.duration;
    });
    const audio = audioEl();
    if (audio) {
        audio.addEventListener('timeupdate', () => {
            if (!audio.duration) return;
            const pct = (audio.currentTime / audio.duration) * 100;
            const fill = $('music-progress-fill'); if (fill) fill.style.width = pct + '%';
            const cur  = $('music-current');  if (cur)  cur.textContent  = fmtTime(audio.currentTime);
            const dur  = $('music-duration'); if (dur)  dur.textContent  = fmtTime(audio.duration);
        });
        audio.addEventListener('ended', () => {
            if (!state.isLoopOn) nextTrack();
        });
        audio.addEventListener('pause', () => { state.isPlaying = false; updatePlayerUI(); });
        audio.addEventListener('play',  () => { state.isPlaying = true;  updatePlayerUI(); });
    }

    // Mini player
    $('mini-play').addEventListener('click', togglePlayPause);
    $('mini-prev').addEventListener('click', prevTrack);
    $('mini-next').addEventListener('click', nextTrack);
    $('mini-close').addEventListener('click', () => {
        const audio = audioEl();
        if (audio) { audio.pause(); audio.src = ''; }
        state.isPlaying = false;
        state.currentTrackIndex = -1;
        hideMiniPlayer();
        updatePlayerUI();
    });

    // Lightbox
    $('lightbox-bg').addEventListener('click', closeLightbox);
    $('lightbox-close').addEventListener('click', closeLightbox);
    $('lightbox-save').addEventListener('click', () => {
        const src = $('lightbox-img').src;
        if (src) { sendMessage(src, 'me', 'image'); closeLightbox(); }
    });

    // Profile emoji pickers (avatar preview click selects next emoji)
    $('my-avatar-preview').addEventListener('click', () => {
        const btns = [...$('my-emoji-picker').querySelectorAll('button')];
        const selected = btns.findIndex(b => b.classList.contains('selected'));
        const next = (selected + 1) % btns.length;
        btns.forEach(b => b.classList.remove('selected'));
        btns[next].classList.add('selected');
        $('my-emoji-preview').textContent = btns[next].textContent;
    });
    $('partner-avatar-preview').addEventListener('click', () => {
        const btns = [...$('partner-emoji-picker').querySelectorAll('button')];
        const selected = btns.findIndex(b => b.classList.contains('selected'));
        const next = (selected + 1) % btns.length;
        btns.forEach(b => b.classList.remove('selected'));
        btns[next].classList.add('selected');
        $('partner-emoji-preview').textContent = btns[next].textContent;
    });

    // Close emoji panel on outside tap
    document.addEventListener('touchstart', e => {
        if (!e.target.closest('#emoji-panel') && !e.target.closest('#emoji-btn')) {
            closeEmojiPanel();
        }
    }, { passive: true });

    // Keyboard open: scroll to bottom
    window.addEventListener('resize', () => {
        scrollToBottom(false);
    });

    // Save on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') saveData();
    });
    window.addEventListener('pagehide', saveData);

    // Auto-save every 2 minutes
    setInterval(saveData, 2 * 60 * 1000);
}

function fmtTime(sec) {
    if (!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
}

/* ── Boot ── */
async function init() {
    createSplashStars();

    // Check if first visit
    const seen = localStorage.getItem('CHUANXUN_SEEN');

    // Load data
    await loadData();

    // Always show splash on first visit, skip it if returning
    if (seen) {
        $('splash').style.display = 'none';
        startWelcome();
    } else {
        initSplash();
    }

    // Initialize reply library with defaults if empty
    if (state.replyLibrary.length === 0) {
        state.replyLibrary = DEFAULT_REPLIES.map((text, i) => ({ id: 'default_' + i, text }));
    }
    normalizeReplyLibrary();

    // Apply settings
    applySettings();
    initEmojiPanel();
    initSettingsUI();
    setupListeners();
    syncReplySettings();

    // Mark selected emoji in pickers
    const myEIdx   = AVATAR_EMOJIS.indexOf(state.settings.myEmoji);
    const pEIdx    = AVATAR_EMOJIS.indexOf(state.settings.partnerEmoji);
    const myPicker = $('my-emoji-picker');
    const pPicker  = $('partner-emoji-picker');
    if (myPicker && myEIdx >= 0) myPicker.querySelectorAll('button')[myEIdx]?.classList.add('selected');
    if (pPicker  && pEIdx  >= 0) pPicker.querySelectorAll('button')[pEIdx]?.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', init);
