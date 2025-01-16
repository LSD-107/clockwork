window.onload = () => {
	updateCounterDisplay();
	updateButtonStates();
};

const audio = new Audio("musiques/index.mp3");
    audio.loop = true;
	audio.volume = 0.5;

document.addEventListener("click", () => {
    audio.play().catch(err => {
    console.error("La lecture de la musique a échoué : ", err);
});
}, { once: true });

const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

window.addEventListener('resize', () => {
    resizeCanvas();
    particlesArray = [];
    initParticles();
});

const particlesArray = [];
const numberOfParticles = 300;

class Particle {
    constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
}

draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,250, 250, 0.6)'; 
    ctx.fill();
}

update() {
    this.x += this.speedX;
    this.y += this.speedY;

if (this.x < 0 || this.x > canvas.width) {
    this.speedX *= -1;
}
if (this.y < 0 || this.y > canvas.height) {
    this.speedY *= -1;
}
}
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 1.5; 
        const speedY = (Math.random() - 0.5) * 1.5;
        particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Nettoie l'écran

    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
});

	requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particlesArray.length = 0;
});


let counter = parseInt(localStorage.getItem('clickCount')) || 0;
let clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
let trophies = JSON.parse(localStorage.getItem('trophies')) || [];
let buildings = JSON.parse(localStorage.getItem('buildings')) || {
    'cadran-solaire': 0,
    'sablier': 0,
    'horloge-a-coucou': 0,
    'montre-de-poche': 0,
    'calendrier-perpetuel': 0,
    'reveil': 0,
    'tourdelhorloge': 0,
    'temple-du-temps': 0,
    'chronometre-universel': 0,
    'machine-a-remonter-le-temps': 0,
    'spirale-temporelle': 0,
    'station-temporelle': 0,
    'astrolabe-mystique': 0,
    'cristal-du-temps': 0,
    'observatoire-temporel': 0
};
let buildingPrices = JSON.parse(localStorage.getItem('buildingPrices')) || {
    'cadran-solaire': 15,
    'sablier': 100,
    'horloge-a-coucou' : 1100,
    'montre-de-poche': 12000,
    'calendrier-perpetuel': 130000,
    'reveil': 1400000,
    'tourdelhorloge': 20000000,
    'temple-du-temps': 330000000,
    'chronometre-universel': 5100000000,
    'machine-a-remonter-le-temps': 75000000000,
    'spirale-temporelle': 1000000000000,
    'station-temporelle': 14000000000000,
    'astrolabe-mystique': 170000000000000,
    'cristal-du-temps': 2100000000000000,
    'observatoire-temporel': 26000000000000000
};

let currentUpgradeIndex = parseInt(localStorage.getItem('currentUpgradeIndex')) || 0;
let upgrades = [
    { id: 'double-click', name: '1 clic = 2 points', cost: 100, increment: 2 },
    { id: 'quad-click', name: '1 clic = 4 points', cost: 500, increment: 4 },
    { id: 'octo-click', name: '1 clic = 8 points', cost: 10000, increment: 8 },
    { id: 'leneuf-click', name: '1 clic = 20 points', cost: 50000, increment: 12 },
    { id: 'super-click', name: '1 clic = 40 points', cost: 100000, increment: 40 },
    { id: 'mega-click', name: '1 clic = 400 points', cost: 10000000, increment: 400 },
    { id: 'ultra-click', name: '1 clic = 8000 points', cost: 100000000, increment: 8000 },
    { id: 'god-click', name: '1 clic = 160 000 points', cost: 10000000000, increment: 160000 },
    { id: 'legendary-click', name: '1 clic = 3200000 points', cost: 10000000000000, increment: 3200000 },
    { id: 'divine-click', name: '1 clic = 64000000 points', cost: 10000000000000000, increment: 64000000 }
];

const counterDisplay = document.getElementById('counter');
const compteurButton = document.getElementById('compteur');
const cpsDisplay = document.getElementById('cps');
const upgradeDescription = document.getElementById('upgrade-description');
const buyUpgradeButton = document.getElementById('buy-upgrade');

function updateCounterDisplay() {
    counterDisplay.textContent = counter.toFixed(0);
    updateUpgradeInfo();
}

compteurButton.addEventListener('click', () => {
	counter += clickValue;
	updateCounterDisplay();
	checkForTrophies();  
	localStorage.setItem('clickCount', counter);
});

compteurButton.addEventListener('click', () => {
compteurButton.classList.add('active');
		
setTimeout(() => {
	compteurButton.classList.remove('active');
}, 100);
});
		
		
function updateButtonStates() {
    const buttons = document.querySelectorAll('.shop .building button'); 
    buttons.forEach(button => {
        const buildingId = button.id.replace('b', ''); 
        const cost = buildingPrices[Object.keys(buildingPrices)[buildingId - 1]];

        if (counter >= cost) {
            button.disabled = false;
            button.style.backgroundColor = "white";
            button.style.color = "black";
            button.style.cursor = "pointer";
        } else {
            button.disabled = true;
            button.style.backgroundColor = "lightgray";
            button.style.color = "gray";
            button.style.cursor = "not-allowed";
        }
    });
}


function formatNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateCounterDisplay() {
	counterDisplay.textContent = formatNumber(counter.toFixed(0));
	updateUpgradeInfo();
	updateButtonStates(); // Ajouter cet appel ici
}


function formatNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateBuildingPrices() {
	document.getElementById('b1').textContent = `${formatNumber(buildingPrices['cadran-solaire'])} points = Cadran solaire (+0.1/s) [x${buildings['cadran-solaire']}]`;
	document.getElementById('b2').textContent = `${formatNumber(buildingPrices['sablier'])} points = Sablier (+1/s) [x${buildings['sablier']}]`;
	document.getElementById('b3').textContent = `${formatNumber(buildingPrices['horloge-a-coucou'])} points = Horloge à coucou (+8/s) [x${buildings['horloge-a-coucou']}]`;
	document.getElementById('b4').textContent = `${formatNumber(buildingPrices['montre-de-poche'])} points = Montre de poche (+47/s) [x${buildings['montre-de-poche']}]`;
	document.getElementById('b5').textContent = `${formatNumber(buildingPrices['calendrier-perpetuel'])} points = Calendrier perpétuel (+260/s) [x${buildings['calendrier-perpetuel']}]`;
	document.getElementById('b6').textContent = `${formatNumber(buildingPrices['reveil'])} points = Réveil (+1400/s) [x${buildings['reveil']}]`;
	document.getElementById('b7').textContent = `${formatNumber(buildingPrices['tourdelhorloge'])} points = Tour de l'horloge (+7800/s) [x${buildings['tourdelhorloge']}]`;
	document.getElementById('b8').textContent = `${formatNumber(buildingPrices['temple-du-temps'])} points = Machine à remonter le temps (+40000/s) [x${buildings['temple-du-temps']}]`;
	document.getElementById('b9').textContent = `${formatNumber(buildingPrices['chronometre-universel'])} points = Chronomètre universel (+260000/s) [x${buildings['chronometre-universel']}]`;
	document.getElementById('b10').textContent = `${formatNumber(buildingPrices['machine-a-remonter-le-temps'])} points = Temple du temps (+1600000/s) [x${buildings['machine-a-remonter-le-temps']}]`;
	document.getElementById('b11').textContent = `${formatNumber(buildingPrices['spirale-temporelle'])} points = Spirale temporelle (+10000000/s) [x${buildings['spirale-temporelle']}]`;
	document.getElementById('b12').textContent = `${formatNumber(buildingPrices['station-temporelle'])} points = Station temporelle (+65000000/s) [x${buildings['station-temporelle']}]`;
	document.getElementById('b13').textContent = `${formatNumber(buildingPrices['astrolabe-mystique'])} points = Astrolabe mystique (+430000000/s) [x${buildings['astrolabe-mystique']}]`;
	document.getElementById('b14').textContent = `${formatNumber(buildingPrices['cristal-du-temps'])} points = Cristal du temps (+2900000000/s) [x${buildings['cristal-du-temps']}]`;
	document.getElementById('b15').textContent = `${formatNumber(buildingPrices['observatoire-temporel'])} points = Observatoire temporel (+21000000000/s) [x${buildings['observatoire-temporel']}]`;

	updateButtonStates();
}

function formatNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
function updateCPSDisplay() {
	let cps = (buildings['cadran-solaire'] * 0.1) + (buildings['sablier'] * 1) + (buildings['horloge-a-coucou'] * 8) + (buildings['montre-de-poche'] * 47) + (buildings['calendrier-perpetuel'] * 260) + (buildings['reveil'] * 1400) + (buildings['tourdelhorloge'] * 7800) + (buildings['temple-du-temps'] * 40000) + (buildings['chronometre-universel'] * 260000) + (buildings['machine-a-remonter-le-temps'] * 1600000) + (buildings['spirale-temporelle'] * 10000000) + (buildings['station-temporelle'] * 65000000) + (buildings['astrolabe-mystique'] * 430000000) + (buildings['cristal-du-temps'] * 2900000000) + (buildings['observatoire-temporel'] * 21000000000);
	cpsDisplay.innerHTML = `
		<span>Points par seconde :</span><br>
		<span>${formatNumber(cps.toFixed(1))}</span>
	`;
}

function applyCPS() {
    let cps = (buildings['cadran-solaire'] * 0.1) + (buildings['sablier'] * 1) + (buildings['horloge-a-coucou'] * 8) + (buildings['montre-de-poche'] * 47) + (buildings['calendrier-perpetuel'] * 260) + (buildings['reveil'] * 1400) + (buildings['tourdelhorloge'] * 7800) + (buildings['temple-du-temps'] * 40000) + (buildings['chronometre-universel'] * 260000) + (buildings['machine-a-remonter-le-temps'] * 1600000) + (buildings['spirale-temporelle'] * 10000000) + (buildings['station-temporelle'] * 65000000) + (buildings['astrolabe-mystique'] * 430000000) + (buildings['cristal-du-temps'] * 2900000000) + (buildings['observatoire-temporel'] * 21000000000);
    counter += cps / 10;
    updateCounterDisplay();
    localStorage.setItem('clickCount', counter);
}

setInterval(() => {
	localStorage.setItem('clickCount', counter);
	localStorage.setItem('buildings', JSON.stringify(buildings));
	localStorage.setItem('trophies', JSON.stringify(trophies));
}, 5000);


const trophyList = document.getElementById('trophy-list');
displayTrophies();

const clickThresholds = [10, 50, 100, 1000, 10000, 100000, 1000000];
const buildingThresholds = [1, 10, 50, 100, 500, 1000, 10000, 100000, 1000000];

setInterval(() => {
	localStorage.setItem('trophies', JSON.stringify(trophies));
}, 5000);

function displayTrophies() {
    trophyList.innerHTML = '';
    trophies.forEach(trophy => {
        const li = document.createElement('li');
        li.textContent = trophy;
        li.className = 'trophy';
        trophyList.appendChild(li);
    });
}

function addTrophy(trophyName) {
    if (!trophies.includes(trophyName)) {
        trophies.push(trophyName);
        console.log(`Nouveau trophée obtenu : ${trophyName}`);
        localStorage.setItem('trophies', JSON.stringify(trophies));
        displayTrophies();
    }
}

function checkForTrophies() {
    clickThresholds.forEach(threshold => {
        const trophyName = `Atteint ${threshold} points`;
        if (counter >= threshold && !trophies.includes(trophyName)) {
            addTrophy(trophyName);
        }
    });

Object.keys(buildings).forEach(building => {
    buildingThresholds.forEach(threshold => {
        const trophyName = `${threshold}x ${getBuildingName(building)}`;
			if (buildings[building] >= threshold && !trophies.includes(trophyName)) {
				addTrophy(trophyName);
            }
		});
    });
}

function getBuildingName(buildingId) {
	const buildingNames = {
		'cadran-solaire': 'Cadran Solaire',
		'sablier': 'Sablier',
		'horloge-a-coucou': 'Horloge à Coucou',
		'montre-de-poche': 'Montre de Poche',
		'calendrier-perpetuel': 'Calendrier Perpétuel',
		'reveil': 'Réveil',
		'tourdelhorloge': 'Tour de l’Horloge',
		'temple-du-temps': 'Machine à Remonter le Temps',
		'chronometre-universel': 'Chronomètre Universel',
		'machine-a-remonter-le-temps': 'Temple du Temps',
		'spirale-temporelle': 'Spirale Temporelle',
		'station-temporelle': 'Station Temporelle',
		'astrolabe-mystique': 'Astrolabe Mystique',
		'cristal-du-temps': 'Cristal du Temps',
		'observatoire-temporel': 'Observatoire Temporel'
	};
return buildingNames[buildingId] || buildingId;
}

function buyBuilding(buildingId, cost, increment) {
	if (counter >= cost) {
		counter -= cost;
		buildings[buildingId]++;
		buildingPrices[buildingId] = Math.ceil(buildingPrices[buildingId] * 1.15);
		updateCounterDisplay();
		updateCPSDisplay();
		updateBuildingPrices();
		checkForTrophies();  
		localStorage.setItem('clickCount', counter);
		localStorage.setItem('buildings', JSON.stringify(buildings));
		localStorage.setItem('buildingPrices', JSON.stringify(buildingPrices));
	} else {
		alert("Vous n'avez pas assez de points !");
	}
}

document.getElementById('b1').addEventListener('click', () => {
    buyBuilding('cadran-solaire', buildingPrices['cadran-solaire'], 0.1);
});

document.getElementById('b2').addEventListener('click', () => {
    buyBuilding('sablier', buildingPrices['sablier'], 1);
});
    
document.getElementById('b3').addEventListener('click', () => {
    buyBuilding('horloge-a-coucou', buildingPrices['horloge-a-coucou'], 8);
});

document.getElementById('b4').addEventListener('click', () => {
    buyBuilding('montre-de-poche', buildingPrices['montre-de-poche'], 47);
});

document.getElementById('b5').addEventListener('click', () => {
    buyBuilding('calendrier-perpetuel', buildingPrices['calendrier-perpetuel'], 260);
});

document.getElementById('b6').addEventListener('click', () => {
    buyBuilding('reveil', buildingPrices['reveil'], 1400);
});

document.getElementById('b7').addEventListener('click', () => {
    buyBuilding('tourdelhorloge', buildingPrices['tourdelhorloge'], 7800);
});

 document.getElementById('b8').addEventListener('click', () => {
    buyBuilding('temple-du-temps', buildingPrices['temple-du-temps'], 40000);
});

document.getElementById('b9').addEventListener('click', () => {
    buyBuilding('chronometre-universel', buildingPrices['chronometre-universel'], 260000);
});

document.getElementById('b10').addEventListener('click', () => {
    buyBuilding('machine-a-remonter-le-temps', buildingPrices['machine-a-remonter-le-temps'], 1600000);
});

document.getElementById('b11').addEventListener('click', () => {
    buyBuilding('spirale-temporelle', buildingPrices['spirale-temporelle'], 10000000);
});

document.getElementById('b12').addEventListener('click', () => {
    buyBuilding('station-temporelle', buildingPrices['station-temporelle'], 65000000);
});

document.getElementById('b13').addEventListener('click', () => {
    buyBuilding('astrolabe-mystique', buildingPrices['astrolabe-mystique'], 430000000);
});

document.getElementById('b14').addEventListener('click', () => {
    buyBuilding('cristal-du-temps', buildingPrices['cristal-du-temps'], 2900000000);
});

document.getElementById('b15').addEventListener('click', () => {
    buyBuilding('observatoire-temporel', buildingPrices['observatoire-temporel'], 21000000000);
});

buyUpgradeButton.addEventListener('click', () => {
    const upgrade = upgrades[currentUpgradeIndex];
    if (counter >= upgrade.cost) {
        counter -= upgrade.cost;
        clickValue = upgrade.increment;
        currentUpgradeIndex++;
        localStorage.setItem('clickValue', clickValue);
        localStorage.setItem('currentUpgradeIndex', currentUpgradeIndex);
        updateCounterDisplay();
    } 
	else {
        alert("Vous n'avez pas assez de points !");
    }
});

let buttonVisible = false; 

function createRandomButton() {
	if (buttonVisible) {
		return; 
	}

const button = document.createElement('img');
button.src = 'images/button.png'; 
button.style.width = '100px'; 
button.style.height = '100px'; 
button.style.position = 'absolute';
button.style.cursor = 'pointer';        
		
const x = Math.random() * window.innerWidth - 100;
const y = Math.random() * window.innerHeight - 100;
button.style.left = `${Math.max(0, x)}px`;
button.style.top = `${Math.max(0, y)}px`;

buttonVisible = true;
	button.addEventListener('click', () => {
	const addition = Math.random() < 0.5 ? 0.4 : 0.6; 
	const additionValue = Math.floor(counter * addition); 
	counter += additionValue; 
	updateCounterDisplay(); 
		showCustomAlert(`+${additionValue} points`);
		localStorage.setItem('clickCount', counter); 
		document.body.removeChild(button);
	buttonVisible = false; 
});

document.body.appendChild(button);

setTimeout(() => {
	if (document.body.contains(button)) {
		document.body.removeChild(button);
		buttonVisible = false; 
	}
}, 25000); // 25 seconde
}

function randomButtonGenerator(){ 
	const randomTime = Math.random() *  600000; //10 minutes
	setTimeout(() => {
		createRandomButton();  
		randomButtonGenerator(); 
	}, randomTime); 
}

function showCustomAlert(message) {
	const alertBox = document.createElement('div');
	alertBox.innerText = message;
	alertBox.style.position = 'fixed';
	alertBox.style.top = '10%';
	alertBox.style.left = '50%';
	alertBox.style.transform = 'translateX(-50%)';
	alertBox.style.padding = '10px 30px';
	alertBox.style.backgroundColor = '#4CAF50';
	alertBox.style.color = 'white';
	alertBox.style.fontSize = '40px';
	alertBox.style.borderRadius = '10px';
	alertBox.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
	alertBox.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
	alertBox.style.transform = 'translateX(-50%) translateY(40px)';

document.body.appendChild(alertBox);

setTimeout(() => {
	alertBox.style.opacity = '1';
	alertBox.style.transform = 'translateX(-50%) translateY(0)';
}, 10);

setTimeout(() => {
	alertBox.style.opacity = '0';
	alertBox.style.transform = 'translateX(-50%) translateY(20px)';
	setTimeout(() => {
		document.body.removeChild(alertBox);
	}, 500);
}, 3000);
}

randomButtonGenerator();

function formatNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateUpgradeInfo() {
	if (currentUpgradeIndex < upgrades.length) {
		const upgrade = upgrades[currentUpgradeIndex];
		upgradeDescription.textContent = `Prochaine amélioration : ${upgrade.name} (${formatNumber(upgrade.cost)} points)`;
		buyUpgradeButton.disabled = counter < upgrade.cost;
	} else {
		upgradeDescription.textContent = "Toutes les améliorations ont été achetées.";
		buyUpgradeButton.disabled = true;
	}
}

document.getElementById('reset').addEventListener('click', () => {
if(confirm("Êtes-vous sûr de vouloir rénitialiser votre partie ?"))
    counter = 0;
    clickValue = 1;
    currentUpgradeIndex = 0;
    buildings = {
        'cadran-solaire': 0,
        'sablier': 0,
        'horloge-a-coucou': 0,
        'montre-de-poche': 0,
        'calendrier-perpetuel': 0,
        'reveil': 0,
        'tourdelhorloge': 0,
        'machine-a-remonter-le-temps': 0,
        'chronometre-universel': 0,
        'temple-du-temps': 0,
        'spirale-temporelle': 0,
        'station-temporelle': 0,
        'astrolabe-mystique': 0,
        'cristal-du-temps': 0,
        'observatoire-temporel': 0
    };

buildingPrices = {
    'cadran-solaire': 15,
    'sablier': 100,
    'horloge-a-coucou': 1100,
    'montre-de-poche': 12000,
    'calendrier-perpetuel': 130000,
    'reveil': 1400000,
    'tourdelhorloge': 20000000,
    'machine-a-remonter-le-temps': 330000000,
    'chronometre-universel': 5100000000,
    'temple-du-temps': 75000000000,
    'spirale-temporelle': 1000000000000,
    'station-temporelle': 14000000000000,
    'astrolabe-mystique': 170000000000000,
    'cristal-du-temps': 2100000000000000,
    'observatoire-temporel': 26000000000000000
};
let trophies = []; 

const trophyList = document.getElementById('trophy-list');
if (trophyList) {
	trophyList.innerHTML = ''; 
}
localStorage.clear();
updateCounterDisplay();
updateCPSDisplay();
updateBuildingPrices();
updateUpgradeInfo();

location.reload();
location.reload();
});


updateCounterDisplay();
updateCPSDisplay();
updateBuildingPrices();
updateButtonStates();
updateUpgradeInfo();
setInterval(applyCPS, 100);
