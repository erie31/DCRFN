document.addEventListener('DOMContentLoaded', () => {
    const enemySelect = document.getElementById('enemy-select');
    const enemyStats = document.getElementById('enemy-stats');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultsArea = document.getElementById('results');
    const diceContainer = document.getElementById('dice-container');
    const rollMessage = document.getElementById('roll-message');

    // Stats displays
    const expDisplay = document.getElementById('exp-value');
    const goldDisplay = document.getElementById('gold-value');
    const equipDisplay = document.getElementById('equip-value');
    const equipCard = document.getElementById('equip-card');
    const miscList = document.getElementById('misc-list');

    // Populate enemy list
    ALL_DATA.enemies.forEach(enemy => {
        const option = document.createElement('option');
        option.value = enemy.id;
        option.textContent = `Lvl ${enemy.level} - ${enemy.name}`;
        enemySelect.appendChild(option);
    });

    // Handle selection
    enemySelect.addEventListener('change', (e) => {
        const enemy = ALL_DATA.enemies.find(en => en.id == e.target.value);
        if (enemy) {
            enemyStats.innerHTML = `
                <div class="stats-grid">
                    <div class="stat-item"><b>HP:</b> ${enemy.hp}</div>
                    <div class="stat-item"><b>ATK:</b> ${enemy.atk}</div>
                    <div class="stat-item"><b>DEF:</b> ${enemy.def}</div>
                    <div class="stat-item"><b>MAG:</b> ${enemy.mag}</div>
                </div>
                <div style="margin-top:10px; font-style: italic;">"${enemy.ability}"</div>
            `;
            enemyStats.classList.remove('hidden');
            calculateBtn.classList.remove('hidden');
            resultsArea.classList.add('hidden');
        }
    });

    // Roll logic
    calculateBtn.addEventListener('click', async () => {
        const enemyId = enemySelect.value;
        const enemyCount = parseInt(document.getElementById('enemy-count').value) || 1;
        const enemy = ALL_DATA.enemies.find(en => en.id == enemyId);

        if (!enemy) return;

        // Visual effects
        calculateBtn.disabled = true;
        resultsArea.classList.remove('hidden');
        resultsArea.scrollIntoView({ behavior: 'smooth' });

        // --- Reset display ---
        let totalExp = 0;
        let totalGold = 0;
        let droppedEquipment = [];
        let allMiscItems = [];

        diceContainer.textContent = "...";
        rollMessage.textContent = `Procesando combate contra ${enemyCount} enemigos...`;
        miscList.innerHTML = "";

        // --- Calculation Loop ---
        for (let i = 0; i < enemyCount; i++) {
            // EXP
            totalExp += enemy.exp;

            // Gold
            const gold = Math.floor(Math.random() * (enemy.gold.max - enemy.gold.min + 1)) + enemy.gold.min;
            totalGold += gold;

            // Equipment Roll (1d6, only on 6)
            const equipRoll = Math.floor(Math.random() * 6) + 1;
            if (equipRoll === 6 && enemy.equipmentIds.length > 0) {
                const randomEquipId = enemy.equipmentIds[Math.floor(Math.random() * enemy.equipmentIds.length)];
                const item = ALL_DATA.equipment[randomEquipId];
                if (item) droppedEquipment.push(item);
            }

            // Misc Drops (100% chance, 1d3 items)
            const miscCount = Math.floor(Math.random() * 3) + 1;
            const availableMisc = [...enemy.miscIds];
            for (let j = 0; j < miscCount; j++) {
                if (availableMisc.length === 0) break;
                const randomIndex = Math.floor(Math.random() * availableMisc.length);
                const itemId = availableMisc.splice(randomIndex, 1)[0];
                const item = ALL_DATA.miscItems[itemId];
                if (item) allMiscItems.push(item);
            }
        }

        // --- Visual Delay for "Dice Roll" ---
        diceContainer.classList.add('rolling');
        await new Promise(r => setTimeout(r, 1200));
        diceContainer.classList.remove('rolling');
        diceContainer.textContent = "⚔️";

        // --- Update UI with aggregated results ---
        expDisplay.textContent = `${totalExp} XP`;
        goldDisplay.textContent = `${totalGold} PO`;

        if (droppedEquipment.length > 0) {
            equipDisplay.innerHTML = droppedEquipment.map(item =>
                `<div style="margin-bottom:5px; border-bottom: 1px dashed rgba(255,215,0,0.2)">
                    <span style="color:#ffd700">${item.name}</span><br>
                    <small>${item.stat}</small>
                </div>`
            ).join('');
            equipCard.style.borderColor = "#ffd700";
        } else {
            equipDisplay.textContent = "Nada esta vez";
            equipCard.style.borderColor = "rgba(255,255,255,0.2)";
        }

        if (allMiscItems.length > 0) {
            // Group duplicate items
            const counts = {};
            allMiscItems.forEach(item => {
                counts[item.name] = (counts[item.name] || 0) + 1;
            });

            Object.keys(counts).forEach(name => {
                const item = allMiscItems.find(it => it.name === name);
                const itemDiv = document.createElement('div');
                itemDiv.className = "misc-item";
                itemDiv.innerHTML = `<strong>${counts[name]}x ${item.name}</strong> - ${item.desc}`;
                miscList.appendChild(itemDiv);
            });
        } else {
            miscList.innerHTML = "<em>Los bolsillos están vacíos...</em>";
        }

        calculateBtn.disabled = false;
        rollMessage.textContent = `¡Batalla finalizada! (${enemyCount} oponentes)`;
    });

    // PWA Install Logic
    let deferredPrompt;
    const installBtn = document.getElementById('install-btn');

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.classList.remove('hidden');
    });

    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                installBtn.classList.add('hidden');
            }
            deferredPrompt = null;
        }
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('SW Registered'))
                .catch(err => console.log('SW Registration Failed', err));
        });
    }
});
