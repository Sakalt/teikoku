// 初期データ
const defaultGameState = {
    resources: { food: 100, wood: 100, stone: 100, metal: 50, ruby: 0, sapphire: 0 },
    population: 5,
    buildings: { houses: 0, markets: 0, castles: 0, hexagons: 0, skyscrapers: 0 },
    map: []
};

let gameState = loadGameState() || defaultGameState;

// DOM要素の取得
const populationElement = document.getElementById('population');
const foodElement = document.getElementById('food');
const woodElement = document.getElementById('wood');
const stoneElement = document.getElementById('stone');
const metalElement = document.getElementById('metal');
const rubyElement = document.getElementById('ruby');
const sapphireElement = document.getElementById('sapphire');
const mapElement = document.getElementById('map');

// 資源を集める
function gatherResources() {
    if (Math.random() < 0.2) { // 20%の確率で失敗
        alert('資源収集に失敗しました。');
        return;
    }
    
    gameState.resources.food += Math.floor(Math.random() * 20);
    gameState.resources.wood += Math.floor(Math.random() * 15);
    gameState.resources.stone += Math.floor(Math.random() * 10);
    gameState.resources.metal += Math.floor(Math.random() * 5);
    updateUI();
}

// 土地を探索する
function exploreLand() {
    if (Math.random() < 0.2) { // 20%の確率で失敗
        alert('探索に失敗しました。');
        return;
    }

    const tileType = Math.random() < 0.1 ? 'ruby' : (Math.random() < 0.1 ? 'sapphire' : 'tile');
    const newTile = `Tile ${Math.floor(Math.random() * 100)}`;
    gameState.map.push({ type: tileType, label: newTile });
    
    if (Math.random() < 0.3) { // 30%の確率で住民が増える
        gameState.population += 1;
    }

    updateUI();
    updateMap();
}

// 家を建てる
function buildHouse() {
    if (gameState.resources.wood >= 20 && gameState.resources.stone >= 20) {
        gameState.resources.wood -= 20;
        gameState.resources.stone -= 20;
        gameState.buildings.houses += 1;

        // 家を建てたことで住民が増える確率が上がる
        if (Math.random() < 0.2) { // 20%の確率で住民が増える
            gameState.population += 1;
        }

        updateUI();
    } else {
        alert('木材または石材が不足しています。');
    }
}

// 市場を建てる
function buildMarket() {
    if (gameState.resources.wood >= 30 && gameState.resources.stone >= 30) {
        gameState.resources.wood -= 30;
        gameState.resources.stone -= 30;
        gameState.buildings.markets += 1;

        // 市場を建てたことで資源収集の効率が上がる
        // （具体的な効果は以下の例として追加しています）
        gameState.resources.food += 10;

        updateUI();
    } else {
        alert('木材または石材が不足しています。');
    }
}

// 城を建てる
function buildCastle() {
    if (gameState.resources.wood >= 50 && gameState.resources.stone >= 50 && gameState.resources.metal >= 50) {
        gameState.resources.wood -= 50;
        gameState.resources.stone -= 50;
        gameState.resources.metal -= 50;
        gameState.buildings.castles += 1;

        // 城を建てたことで住民が増える
        gameState.population += 25;

        updateUI();
    } else {
        alert('木材、石材、または金属が不足しています。');
    }
}

// 六角柱のビルを建てる
function buildHexagon() {
    if (gameState.resources.metal >= 96) {
        gameState.resources.metal -= 96;
        gameState.buildings.hexagons += 1;

        // 住民が増える確率が上がる
        if (Math.random() < 0.5) { // 50%の確率で住民が増える
            gameState.population += 1;
        }

        updateUI();
    } else {
        alert('金属が不足しています。');
    }
}

// 巨大ビルを建てる
function buildSkyscraper() {
    if (gameState.resources.metal >= 128 && gameState.resources.ruby >= 16 && gameState.resources.sapphire >= 16) {
        gameState.resources.metal -= 128;
        gameState.resources.ruby -= 16;
        gameState.resources.sapphire -= 16;
        gameState.buildings.skyscrapers += 1;

        // 巨大ビルを建てた時に人口が増える
        gameState.population += 125;

        updateUI();
    } else {
        alert('資源が不足しています。');
    }
}

// 保存する
function saveGame() {
    localStorage.setItem('gameState', JSON.stringify(gameState));
    alert('ゲームが保存されました。');
}

// ロードする
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    return savedState ? JSON.parse(savedState) : null;
}

// UIの更新
function updateUI() {
    populationElement.textContent = gameState.population;
    foodElement.textContent = gameState.resources.food;
    woodElement.textContent = gameState.resources.wood;
    stoneElement.textContent = gameState.resources.stone;
    metalElement.textContent = gameState.resources.metal;
    rubyElement.textContent = gameState.resources.ruby;
    sapphireElement.textContent = gameState.resources.sapphire;
}

function updateMap() {
    mapElement.innerHTML = gameState.map.map(tile => 
        `<div class="tile ${tile.type}">${tile.label}</div>`
    ).join('');
}

// 初期UI更新
updateUI();
updateMap();
