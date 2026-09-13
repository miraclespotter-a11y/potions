const introScreen = document.getElementById('intro-screen');
const labScreen = document.getElementById('lab-screen');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const fireBtn = document.getElementById('fire-btn');
const startStirBtn = document.getElementById('start-stir-btn');
const stirZone = document.getElementById('stir-zone');
const wandBtn = document.getElementById('wand-btn');
const cauldronImg = document.getElementById('cauldron-img');
const liquid = document.getElementById('cauldron-liquid');
const bubbles = document.querySelector('.bubbles');
const resultMessage = document.getElementById('result-message');
const ingredients = document.querySelectorAll('.ingredient');
const successContainer = document.getElementById('success-potion-container');
const successImg = document.getElementById('success-potion-img');

let addedIngredients = [];
let isFireOn = false;
let stirCount = 0;
let draggedItem = null;

const recipes = {
    pumpion: ['moth', 'bulb', 'foxglove'], 
    boils: ['fangs', 'slugs', 'quills'], 
    forgetfulness: ['lethe', 'valerian', 'mistletoe'] 
};

// دالة لتحديد لون المرجل بناءً على تسلسل المكونات الحالي
function getSequenceColor(sequenceArray) {
    const seq = sequenceArray.join(',');
    
    // مسار جرعة اليقطين
    if (seq === 'moth') return 'rgba(76, 175, 80, 0.8)'; // أخضر
    if (seq === 'moth,bulb') return 'rgba(244, 67, 54, 0.8)'; // أحمر
    if (seq === 'moth,bulb,foxglove') return 'rgba(255, 152, 0, 0.9)'; // برتقالي

    // مسار جرعة علاج الدمامل
    if (seq === 'fangs') return 'rgba(255, 235, 59, 0.8)'; // أصفر
    if (seq === 'fangs,slugs') return 'rgba(233, 30, 99, 0.8)'; // وردي
    if (seq === 'fangs,slugs,quills') return 'rgba(33, 150, 243, 0.8)'; // أزرق سماوي

    // مسار جرعة النسيان
    if (seq === 'lethe') return 'rgba(173, 216, 230, 0.8)'; // أزرق فاتح
    if (seq === 'lethe,valerian') return 'rgba(0, 0, 139, 0.8)'; // أزرق داكن
    if (seq === 'lethe,valerian,mistletoe') return 'rgba(128, 0, 128, 0.9)'; // بنفسجي

    // إذا خلط مكونات عشوائية بغير ترتيب
    return 'rgba(70, 70, 70, 0.9)'; // رمادي طيني
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
    cauldronImg.src = 'cauldron-empty.png';
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
    
    ingredients.forEach(img => {
        img.style.display = 'inline-block';
        img.style.position = 'static';
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
    draggedItem.style.left = e.clientX - 25 + 'px';
    draggedItem.style.top = e.clientY - 25 + 'px';
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
        cauldronImg.src = `cauldron-${step}.png`;

        // اللون يتغير بناءً على التسلسل الحالي
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
    stirCount = 0;
});

stirZone.addEventListener('pointermove', (e) => {
    if(e.buttons > 0 || e.pressure > 0) { 
        stirCount++;
        if (stirCount > 40) { 
            stirZone.style.display = 'none'; 
            wandBtn.style.display = 'block'; 
        }
    }
});

wandBtn.addEventListener('click', () => {
    checkRecipe();
    wandBtn.style.display = 'none';
});

function checkRecipe() {
    const hasPumpion = recipes.pumpion.every((ing, index) => addedIngredients[index] === ing);
    if (hasPumpion && addedIngredients.length === recipes.pumpion.length) {
        triggerSuccess('potion-pumpion.png', '🎃 لقد أعددت وصفة جرعة رأس اليقطين بنجاح! البروفيسور جوليوس فخور بك.', 'rgba(255, 140, 0, 0.9)', 'drop-shadow(0 0 35px rgba(255, 140, 0, 1))');
        return;
    }

    const hasBoils = recipes.boils.every((ing, index) => addedIngredients[index] === ing);
    if (hasBoils && addedIngredients.length === recipes.boils.length) {
        triggerSuccess('potion-boils.png', '🧪 لقد أعددت وصفة علاج الدمامل بنجاح! البروفيسور جوليوس فخور بك.', 'rgba(135, 206, 235, 0.9)', 'drop-shadow(0 0 35px rgba(135, 206, 235, 1))');
        return;
    }

    const hasForget = recipes.forgetfulness.every((ing, index) => addedIngredients[index] === ing);
    if (hasForget && addedIngredients.length === recipes.forgetfulness.length) {
        triggerSuccess('potion-forget.png', '🌌 لقد أعددت وصفة جرعة النسيان بنجاح! البروفيسور جوليوس فخور بك.', 'rgba(255, 69, 0, 0.9)', 'drop-shadow(0 0 35px rgba(255, 69, 0, 1))');
        return;
    }

    liquid.style.backgroundColor = 'transparent'; 
    bubbles.style.opacity = 0;
    cauldronImg.src = 'cauldron-exploded.png'; 
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
