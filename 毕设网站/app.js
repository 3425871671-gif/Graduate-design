// app.js

// 模拟数据
const practiceData = [
    {
        id: 1,
        test: "Test2",
        passage: "Passage1 The Kiwi",
        category: "生物研究",
        difficulty: "Medium",
        difficultyColor: "yellow",
        participants: 5576,
        accuracy: "45%",
        tags: ["判断题", "填空题"],
        lastPractice: "2天前"
    },
    {
        id: 2,
        test: "Test2",
        passage: "Passage2 Return of the elms: reintroducing the beloved tree to Britain",
        category: "环境保护",
        difficulty: "Medium",
        difficultyColor: "yellow",
        participants: 4137,
        accuracy: "41%",
        tags: ["段落匹配", "填空题"],
        lastPractice: "未练习"
    },
    {
        id: 3,
        test: "Test2",
        passage: "Passage3 How stress affects judgement",
        category: "医疗健康",
        difficulty: "Hard",
        difficultyColor: "red",
        participants: 3457,
        accuracy: "34%",
        tags: ["单选题", "判断题"],
        lastPractice: "未练习"
    },
    {
        id: 4,
        test: "Test3",
        passage: "Passage1 Manutrition",
        category: "社会问题",
        difficulty: "Easy",
        difficultyColor: "green",
        participants: 2942,
        accuracy: "72%",
        tags: ["填空题", "判断题"],
        lastPractice: "昨天"
    },
    {
        id: 5,
        test: "Test3",
        passage: "Passage2 Procrastination",
        category: "心理学",
        difficulty: "Medium",
        difficultyColor: "yellow",
        participants: 2827,
        accuracy: "52%",
        tags: ["段落匹配", "填空题"],
        lastPractice: "未练习"
    },
    {
        id: 6,
        test: "Test3",
        passage: "Passage3 Invasion of the Robot Snatchers",
        category: "科技",
        difficulty: "Hard",
        difficultyColor: "red",
        participants: 2634,
        accuracy: "38%",
        tags: ["判断题", "段落匹配", "单选题"],
        lastPractice: "未练习"
    },
    {
        id: 7,
        test: "Test4",
        passage: "Passage1 Frozen Food",
        category: "历史发展",
        difficulty: "Easy",
        difficultyColor: "green",
        participants: 2131,
        accuracy: "68%",
        tags: ["填空题", "判断题"],
        lastPractice: "3天前"
    },
    {
        id: 8,
        test: "Test4",
        passage: "Passage2 Can the planet's coral reefs be saved?",
        category: "海洋生态",
        difficulty: "Medium",
        difficultyColor: "yellow",
        participants: 1951,
        accuracy: "45%",
        tags: ["段落匹配", "单选题"],
        lastPractice: "未练习"
    },
    {
        id: 9,
        test: "Test4",
        passage: "Passage3 The search for the anti-aging pill",
        category: "医疗科技",
        difficulty: "Hard",
        difficultyColor: "red",
        participants: 1820,
        accuracy: "40%",
        tags: ["单选题", "判断题"],
        lastPractice: "未练习"
    },
    {
        id: 10,
        test: "Test5",
        passage: "Passage1 Georgia O'Keeffe",
        category: "人物传记",
        difficulty: "Easy",
        difficultyColor: "green",
        participants: 1680,
        accuracy: "75%",
        tags: ["填空题", "判断题"],
        lastPractice: "今天"
    }
];

// 难度颜色映射
const difficultyColors = {
    Easy: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', label: '简单' },
    Medium: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', label: '中等' },
    Hard: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', label: '困难' }
};

// 标签颜色映射
const tagColors = {
    '判断题': 'bg-blue-50 text-blue-600 border-blue-200',
    '填空题': 'bg-purple-50 text-purple-600 border-purple-200',
    '单选题': 'bg-orange-50 text-orange-600 border-orange-200',
    '段落匹配': 'bg-pink-50 text-pink-600 border-pink-200',
    '多选题': 'bg-teal-50 text-teal-600 border-teal-200'
};

// 分页状态
let currentPage = 1;
const totalPages = 21;
let currentView = 'home';

function switchView(view) {
    currentView = view;
    
    // 隐藏所有视图
    document.getElementById('home-view').classList.add('hidden');
    document.getElementById('developing-view').classList.add('hidden');
    document.getElementById('banner-section').style.display = 'none';
    
    // 更新导航状态
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    if (view === 'home') {
        document.getElementById('home-view').classList.remove('hidden');
        document.getElementById('banner-section').style.display = 'block';
        document.getElementById('nav-home').classList.add('active');
        renderContent();
    } else {
        document.getElementById('developing-view').classList.remove('hidden');
        // 根据视图类型高亮对应导航
        const navMap = {
            'developing': 'nav-ai',
            'error': 'nav-error',
            'favorite': 'nav-favorite',
            'report': 'nav-report'
        };
        const navId = navMap[view] || 'nav-ai';
        const navElement = document.getElementById(navId);
        if (navElement) navElement.classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPracticeList() {
    return practiceData.map(item => {
        const diffStyle = difficultyColors[item.difficulty];
        return `
            <div class="practice-item glass-card rounded-xl p-4 md:p-5 cursor-pointer group mb-3">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div class="flex-1 space-y-2">
                        <div class="flex items-center gap-2 flex-wrap">
                            <span class="px-2 py-1 bg-sky-100 text-sky-700 rounded text-xs font-bold border border-sky-200">
                                ${item.test}
                            </span>
                            <h3 class="text-slate-800 font-semibold text-base md:text-lg group-hover:text-sky-600 transition-colors line-clamp-1">
                                ${item.passage}
                            </h3>
                        </div>
                        
                        <div class="flex items-center gap-4 text-sm text-slate-500 flex-wrap">
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                </svg>
                                <span>${item.category}</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                </svg>
                                <span>${item.participants.toLocaleString()}人练习</span>
                            </div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>平均正确率 ${item.accuracy}</span>
                            </div>
                        </div>

                        <div class="flex items-center gap-2 pt-1">
                            ${item.tags.map(tag => `
                                <span class="tag-pop px-2 py-0.5 rounded text-xs border ${tagColors[tag] || 'bg-slate-50 text-slate-600 border-slate-200'}">
                                    ${tag}
                                </span>
                            `).join('')}
                        </div>
                    </div>

                    <div class="flex items-center gap-3 md:flex-col md:items-end md:gap-2">
                        <div class="flex items-center gap-2">
                            <span class="difficulty-badge px-3 py-1 rounded-full text-xs font-medium border ${diffStyle.bg} ${diffStyle.text} ${diffStyle.border}">
                                ${diffStyle.label}
                            </span>
                        </div>
                        
                        <div class="flex items-center gap-2">
                            <button onclick="switchView('developing')" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 hover:border-sky-300">
                                上次练习
                            </button>
                            <button onclick="switchView('developing')" class="btn-secondary px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 border border-slate-200 hover:border-sky-300">
                                详解
                            </button>
                            <button onclick="switchView('developing')" class="btn-primary px-4 py-1.5 rounded-lg text-xs font-medium text-white shadow-md">
                                去作答
                            </button>
                        </div>
                        
                        ${item.lastPractice !== '未练习' ? `
                            <div class="text-xs text-slate-400 hidden md:block">
                                ${item.lastPractice}练习过
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function renderEmptyPage(pageNum) {
    return `
        <div class="empty-page glass-card">
            <div class="text-6xl mb-4">📄</div>
            <h2 class="text-2xl font-bold text-slate-700 mb-2">这是第${pageNum}页</h2>
            <p class="text-slate-500 text-sm">该页面暂无内容，请点击其他页码查看</p>
            <button onclick="goToPage(1)" class="mt-6 px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium">
                返回首页
            </button>
        </div>
    `;
}

function renderPagination() {
    let html = '';
    
    html += `<button onclick="changePage(${currentPage - 1})" class="pagination-btn px-3 py-2 rounded-lg border border-slate-200 text-slate-600" ${currentPage === 1 ? 'disabled' : ''}>
        上一页
    </button>`;
    
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    if (startPage > 1) {
        html += `<button onclick="goToPage(1)" class="pagination-btn px-4 py-2 rounded-lg border border-slate-200 text-slate-600 ${currentPage === 1 ? 'active' : ''}">1</button>`;
        if (startPage > 2) {
            html += `<span class="px-2 text-slate-400">...</span>`;
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        if (i === 1 || i === totalPages) continue;
        html += `<button onclick="goToPage(${i})" class="pagination-btn px-4 py-2 rounded-lg border border-slate-200 text-slate-600 ${currentPage === i ? 'active' : ''}">${i}</button>`;
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<span class="px-2 text-slate-400">...</span>`;
        }
        html += `<button onclick="goToPage(${totalPages})" class="pagination-btn px-4 py-2 rounded-lg border border-slate-200 text-slate-600 ${currentPage === totalPages ? 'active' : ''}">${totalPages}</button>`;
    }
    
    html += `<button onclick="changePage(${currentPage + 1})" class="pagination-btn px-3 py-2 rounded-lg border border-slate-200 text-slate-600" ${currentPage === totalPages ? 'disabled' : ''}>
        下一页
    </button>`;
    
    html += `
        <div class="flex items-center gap-2 ml-4 text-sm text-slate-600">
            <span>跳至</span>
            <input type="number" id="jumpInput" min="1" max="${totalPages}" class="w-16 px-2 py-1 border border-slate-200 rounded text-center focus:outline-none focus:border-sky-500" value="${currentPage}" onkeypress="if(event.key==='Enter') jumpToPage()">
            <span>页</span>
            <button onclick="jumpToPage()" class="ml-1 px-3 py-1 bg-sky-50 text-sky-600 rounded hover:bg-sky-100 transition-colors text-xs font-medium border border-sky-200">
                跳转
            </button>
        </div>
    `;
    
    document.getElementById('paginationContainer').innerHTML = html;
}

function renderContent() {
    if (currentView !== 'home') return;
    
    const contentArea = document.getElementById('contentArea');
    contentArea.innerHTML = '';
    contentArea.classList.remove('page-transition');
    void contentArea.offsetWidth;
    contentArea.classList.add('page-transition');
    
    if (currentPage === 1) {
        contentArea.innerHTML = `<div class="space-y-3">${renderPracticeList()}</div>`;
    } else {
        contentArea.innerHTML = renderEmptyPage(currentPage);
    }
    
    renderPagination();
}

function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function changePage(delta) {
    const newPage = currentPage + delta;
    goToPage(newPage);
}

function jumpToPage() {
    const input = document.getElementById('jumpInput');
    const page = parseInt(input.value);
    if (page >= 1 && page <= totalPages) {
        goToPage(page);
    } else {
        showToast('⚠️', `请输入1-${totalPages}之间的页码`);
    }
}

function showNotification() {
    showToast('🔔', '功能上线后将第一时间通知您！');
}

function showFeatureDetail(feature) {
    const details = {
        'ai': 'AI智能精讲将为您提供个性化的题目解析',
        'error': '智能错题本将自动分析您的薄弱环节',
        'report': '学习报告将可视化展示您的学习进度'
    };
    showToast('💡', details[feature] || '敬请期待');
}

function showToast(icon, message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastIcon').textContent = icon;
    document.getElementById('toastMessage').textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none');
    toast.style.transform = 'translate(-50%, 0)';
    
    setTimeout(() => {
        toast.classList.add('opacity-0', 'pointer-events-none');
        toast.style.transform = 'translate(-50%, -20px)';
    }, 3000);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    renderContent();

    // 搜索功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            if (currentPage !== 1 || currentView !== 'home') return;
            const keyword = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.practice-item');
            items.forEach((item, index) => {
                const text = practiceData[index].passage.toLowerCase();
                if (text.includes(keyword)) {
                    item.style.display = 'block';
                    item.style.animation = 'popIn 0.3s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
});