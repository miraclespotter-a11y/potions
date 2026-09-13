/* ربط الخط الذي قمتِ برفعه */
@font-face {
    font-family: 'Tajawal';
    src: url('Tajawal-Bold.ttf') format('truetype');
}

body, html {
    margin: 0; padding: 0; width: 100%; height: 100%;
    font-family: 'Tajawal', 'Tahoma', sans-serif; /* استخدام الخط هنا */
    overflow: hidden; 
    background-color: #111;
}

#intro-screen {
    width: 100%; height: 100%; background: url('lab-bg.jpg') center/cover;
    display: flex; justify-content: center; align-items: center;
}
.intro-box {
    background: rgba(0, 0, 0, 0.8); color: gold; padding: 30px; 
    border-radius: 15px; text-align: center; border: 2px solid gold;
}
button {
    background: #5c162e; color: white; border: 2px solid gold;
    padding: 10px 20px; font-size: 18px; border-radius: 8px;
    cursor: pointer; font-weight: bold; margin: 5px;
    font-family: 'Tajawal', sans-serif; /* للزرارات أيضاً */
}
#reset-btn {
    position: absolute; top: 10px; right: 10px; z-index: 20;
    background: #8b0000; font-size: 14px;
}
#lab-screen {
    width: 100%; height: 100%; background: url('cauldron-top-bg.jpg') center/cover;
    position: relative;
}
#ingredients-shelf {
    display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;
    background: rgba(0,0,0,0.6); padding: 15px 10px 10px; 
    position: absolute; top: 50px; width: 100%; z-index: 10;
}

/* تنسيق المكونات والأسماء باللون الأبيض */
.ingredient-item {
    display: flex; flex-direction: column; align-items: center;
    cursor: grab; touch-action: none;
    width: 70px;
}
.ingredient-item img {
    width: 50px; height: 50px; 
    pointer-events: none; /* لمنع المؤشر من الإمساك بالصورة بدلاً من العنصر ككل */
}
.ingredient-item span {
    color: white;
    font-size: 12px;
    margin-top: 5px;
    text-align: center;
    pointer-events: none;
}

#cauldron-area {
    position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%);
    width: 300px; height: 300px;
}
#cauldron-img {
    width: 100%; height: 100%; position: absolute; z-index: 5; pointer-events: none;
}
#cauldron-liquid {
    position: absolute; top: 15%; left: 15%; width: 70%; height: 70%; 
    border-radius: 50%; background-color: transparent; 
    transition: background-color 1s; z-index: 2; overflow: hidden;
}
.bubbles {
    width: 100%; height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.4) 10%, transparent 20%);
    background-size: 30px 30px; opacity: 0; transition: opacity 0.5s;
    animation: boil 2s infinite linear;
}
@keyframes boil { 0% { background-position: 0 0; } 100% { background-position: 0 -30px; } }

#success-potion-container {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, 50%); 
    opacity: 0; z-index: 30; pointer-events: none; transition: all 1s ease-out;
}
#success-potion-container.show { transform: translate(-50%, -70%); opacity: 1; }
#success-potion-img { width: 150px; animation: float-glow 2s infinite alternate; }
@keyframes float-glow {
    0% { transform: translateY(0px); filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
    100% { transform: translateY(-10px); filter: drop-shadow(0 0 35px rgba(255, 215, 0, 1)); }
}

#controls {
    position: absolute; bottom: 20px; width: 100%; text-align: center; z-index: 10;
}

/* تصميم الدائرة للتقليب لتصبح داخل المرجل */
#stir-zone {
    position: absolute; top: 15%; left: 15%; width: 70%; height: 70%; /* تطابق سائل المرجل تماماً */
    background: rgba(255,255,255,0.1); border: 2px dashed rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    touch-action: none; cursor: crosshair; z-index: 20;
}
#stir-text {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    color: white; text-shadow: 1px 1px 3px black; pointer-events: none; font-size: 16px; font-weight: bold;
}
#stir-icon {
    width: 35px; position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -100%) rotate(0deg); 
    transform-origin: bottom center; pointer-events: none; z-index: 25;
}

#wand-icon { width: 30px; vertical-align: middle; margin-left: 10px; transform: rotate(-45deg); }
#wand-btn { background: #2e165c; display: block; margin: 10px auto; }

#result-message {
    position: absolute; top: 30%; left: 50%; transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.9); color: gold; padding: 25px;
    font-size: 22px; font-weight: bold; border-radius: 10px;
    display: none; z-index: 40; text-align: center; border: 2px solid gold; width: 80%; line-height: 1.5;
}
