const introScreen = document.getElementById('intro-screen');
const labScreen = document.getElementById('lab-screen');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const fireBtn = document.getElementById('fire-btn');
const startStirBtn = document.getElementById('start-stir-btn');
const stirZone = document.getElementById('stir-zone');
const stirIcon = document.getElementById('stir-icon');
const wandBtn = document.getElementById('wand-btn');
const cauldronImg = document.getElementById('cauldron-img');
const liquid = document.getElementById('cauldron-liquid');
const bubbles = document.querySelector('.bubbles');
const resultMessage = document.getElementById('result-message');
const ingredients = document.querySelectorAll('.ingredient-item');
const successContainer = document.getElementById('success-potion-container');
const successImg = document.getElementById('success-potion-img');

let addedIngredients = [];
let isFireOn = false;
let draggedItem = null;

let totalRotation = 0;
let lastAngle = null;

const recipes = {
    pumpion: ['moth', 'bulb', 'foxglove'], 
    boils: ['fangs', 'slugs', 'quills'], 
    forgetfulness: ['lethe', 'valerian', 'mistletoe'] 
};

function getSequenceColor(sequenceArray) {
    const seq = sequenceArray.join(',');
    if (seq === 'moth') return 'rgba(76, 175, 80, 0.8)'; 
    if (seq === 'moth,bulb') return 'rgba(244, 67, 54, 0.8)'; 
    if (seq === 'moth,bulb,foxglove') return 'rgba(255, 152, 0, 0.9)'; 
    if (seq === 'fangs') return 'rgba(255, 235, 59, 0.8)'; 
    if (seq === 'fangs,slugs') return 'rgba(233, 30, 99, 0.8)'; 
    if (seq === 'fangs,slugs,quills') return 'rgba(33, 150, 243, 0.8)'; 
    if (seq === 'lethe') return 'rgba(173, 216, 230, 0.8)'; 
    if (seq === 'lethe,valerian') return 'rgba(0, 0, 139, 0.8)'; 
    if (seq === 'lethe,valerian,mistletoe') return 'rgba(128, 0, 128, 0.9)'; 
    return 'rgba(70, 70, 70, 0.9)'; 
}

startBtn.addEventListener('click', () => {
    introScreen.style.display = 'none';
    labScreen.style.display = 'block';
});

fireBtn.addEventListener('click', () => {
    isFireOn = true;
    fireBtn.style.background = 'orange';
    fireBtn.innerText = 'النيران مشتعلة 🔥';
    if(addedIngredients.length > 0) bubbles.style.opacity = 1; 
});

resetBtn.addEventListener('click', () => {
    addedIngredients = [];
    cauldronImg.src = 'images/cauldron-empty.png'; 
    liquid.style.backgroundColor = 'transparent';
    bubbles.style.opacity = 0;
    isFireOn = false;
    fireBtn.style.background = '#5c162e';
    fireBtn.innerText = 'أشعل النيران 🔥';
    startStirBtn.style.display = 'none';
    stirZone.style.display = 'none';
    wandBtn.style.display = 'none';
    resultMessage.style.display = 'none';
    successContainer.classList.remove('show');
    
    ingredients.forEach(item => {
        item.style.display = 'flex';
        item.style.position = 'static';
    });
});

ingredients.forEach(item => item.addEventListener('pointerdown', startDrag));

function startDrag(e) {
    draggedItem = e.target;
    draggedItem.style.position = 'absolute';
    draggedItem.style.zIndex = 1000;
    document.addEventListener('pointermove', dragMove);
    document.addEventListener('pointerup', dropItem);
}

function dragMove(e) {
    if (!draggedItem) return;
    draggedItem.style.left = e.clientX - 35 + 'px'; 
    draggedItem.style.top = e.clientY - 35 + 'px';
}

function dropItem(e) {
    document.removeEventListener('pointermove', dragMove);
    document.removeEventListener('pointerup', dropItem);
    
    if (!draggedItem) return;

    const cauldronRect = document.getElementById('cauldron-area').getBoundingClientRect();
    if (e.clientX > cauldronRect.left && e.clientX < cauldronRect.right &&
        e.clientY > cauldronRect.top && e.clientY < cauldronRect.bottom) {
        
        const itemName = draggedItem.getAttribute('data-name');
        addedIngredients.push(itemName);
        draggedItem.style.display = 'none'; 
        
        const step = Math.min(addedIngredients.length, 3);
        cauldronImg.src = `images/cauldron-${step}.png`; 

        liquid.style.backgroundColor = getSequenceColor(addedIngredients); 
        if(isFireOn) bubbles.style.opacity = 1;

        startStirBtn.style.display = 'inline-block';
        stirZone.style.display = 'none';
        wandBtn.style.display = 'none';
    } else {
        draggedItem.style.position = 'static';
    }
    draggedItem = null;
}

startStirBtn.addEventListener('click', () => {
    startStirBtn.style.display = 'none';
    stirZone.style.display = 'block';
    totalRotation = 0;
    lastAngle = null;
    stirIcon.style.transform = `translate(-50%, -100%) rotate(0rad)`;
});

stirZone.addEventListener('pointerdown', (e) => {
    const rect = stirZone.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    lastAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
});

stirZone.addEventListener('pointermove', (e) => {
    if(e.buttons > 0 || e.pressure > 0) { 
        const rect = stirZone.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
        
        if (lastAngle !== null) {
            let delta = angle - lastAngle;
            
            if (delta > Math.PI) delta -= 2 * Math.PI;
            if (delta < -Math.PI) delta += 2 * Math.PI;
            
            totalRotation += Math.abs(delta);
            
            stirIcon.style.transform = `translate(-50%, -100%) rotate(${angle + Math.PI/2}rad)`;
            
            if (totalRotation > 15) { 
                stirZone.style.display = 'none'; 
                wandBtn.style.display = 'block'; 
                totalRotation = 0;
                lastAngle = null;
            }
        }
        lastAngle = angle;
    }
});

stirZone.addEventListener('pointerup', () => {
    lastAngle = null;
});

wandBtn.addEventListener('click', () => {
    checkRecipe();
    wandBtn.style.display = 'none';
});

function checkRecipe() {
    const hasPumpion = recipes.pumpion.every((ing, index) => addedIngredients[index] === ing);
    if (hasPumpion && addedIngredients.length === recipes.pumpion.length) {
        triggerSuccess('images/potion-pumpion.png', '🎃 لقد أعددت وصفة جرعة رأس اليقطين بنجاح! البروفيسور جوليوس فخور بك.', 'rgba(255, 140, 0, 0.9)', 'drop-shadow(0 0 35px rgba(255, 140, 0, 1))');
        return;
    }

    const hasBoils = recipes.boils.every((ing, index) => addedIngredients[index] === ing);
    if (hasBoils && addedIngredients.length === recipes.boils.length) {
        triggerSuccess('images/potion-boils.png', '🧪 لقد أعددت وصفة علاج الدمامل بنجاح! البروفيسور جوليوس فخور بك.', 'rgba(135, 206, 235, 0.9)', 'drop-shadow(0 0 35px rgba(135, 206, 235, 1))');
        return;
    }

    const hasForget = recipes.forgetfulness.every((ing, index) => addedIngredients[index] === ing);
    if (hasForget && addedIngredients.length === recipes.forgetfulness.length) {
        triggerSuccess('images/potion-forget.png', '🌌 لقد أعددت وصفة جرعة النسيان بنجاح! البروفيسور جوليوس فخور بك.', 'rgba(255, 69, 0, 0.9)', 'drop-shadow(0 0 35px rgba(255, 69, 0, 1))');
        return;
    }

    liquid.style.backgroundColor = 'transparent'; 
    bubbles.style.opacity = 0;
    cauldronImg.src = 'images/cauldron-exploded.png'; 
    showResult('💥 بوم! يبدو أنك أضفت مكونات خاطئة أو بترتيب غير صحيح، المرجل احترق!');
}

function triggerSuccess(imgSrc, msg, finalColor, shadowColor) {
    liquid.style.backgroundColor = finalColor; 
    successImg.src = imgSrc;
    successImg.style.filter = shadowColor;
    successContainer.classList.add('show'); 
    showResult(msg);
}

function showResult(text) {
    resultMessage.innerText = text;
    resultMessage.style.display = 'block';
}
