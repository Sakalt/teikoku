// 初期データ
const defaultGameState = {
    resources: { food: 100, wood: 100, stone: 100, metal: 50 },
    population: 5,
    buildings: { houses: 0, markets: 0, castles: 0 },
    map: []
};

let gameState = loadGameState() || defaultGameState;

// DOM要素の取得
const populationElement = document.getElementById('population');
const foodElement = document.getElementById('food');
const woodElement = document.getElementById('wood');
const stoneElement = document.getElementById('stone');
const metalElement = document.getElementById('metal');
const mapElement = document.getElementById('map');

// 資源を集める
function gatherResources() {
    gameState.resources.food += Math.floor(Math.random() * 20);
    gameState.resources.wood += Math.floor(Math.random() * 15);
    gameState.resources.stone += Math.floor(Math.random() * 10);
    gameState.resources.metal += Math.floor(Math.random() * 5);
    updateUI();
}

// 土地を探索する
function exploreLand() {
    const newTile = `Tile ${Math.floor(Math.random() * 100)}`;
    gameState.map.push(newTile);
    updateMap();
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
}

function updateMap() {
    mapElement.innerHTML = gameState.map.join('<br>');
}

// 初期UI更新
updateUI();
updateMap();
