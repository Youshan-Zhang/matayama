//基础部件对象
const le00                = document.getElementById('le00'               );
const re00                = document.getElementById('re00'               );
const leftEar             = document.getElementById('leftEar'            );  
const rightEar            = document.getElementById('rightEar'           );  
const mouth0              = document.getElementById('mouth0'             );
const mouth0c             = document.getElementById('mouth0c'            ); 
const mouth0c2            = document.getElementById('mouth0c2'            ); 
const leftRectangle       = document.getElementById('leftRectangle'      );
const rightRectangle      = document.getElementById('rightRectangle'     );
const leftRectangleLower  = document.getElementById('leftRectangleLower' );
const rightRectangleLower = document.getElementById('rightRectangleLower');

const pinkArrow    = document.getElementById('pinkArrow'   );
const blackSymbol1 = document.getElementById('blackSymbol1');
const blackSymbol2 = document.getElementById('blackSymbol2');
const blackSymbol3 = document.getElementById('blackSymbol3');
const blackSymbol4 = document.getElementById('blackSymbol4');
const blackSymbol5 = document.getElementById('blackSymbol5');
const blacksquare  = document.getElementById('blacksquare' );

const button  = document.querySelectorAll('.square-button');
const buttons = document.querySelectorAll('.buttons'      );
//按钮相关对象ᆺ
const cursorButton   = document.getElementById('cursor'  );
const fishButton     = document.getElementById('fish'    );
const snackButton    = document.getElementById('snack'   );
const brushButton    = document.getElementById('brush'   );
const settingsButton = document.getElementById('settings');
const body = document.body;

let mouseX = 0, mouseY = 0;  
let lx = 5  * window.innerWidth / 18, ly = 4 * window.innerHeight / 9;  
let rx = 13 * window.innerWidth / 18, ry = 4 * window.innerHeight / 9;  
let mx =      window.innerWidth / 2 , my = 5 * window.innerHeight / 9; 
const delay = 0.05;  
let   scope = 12  ;

let targetAngleLeftEar   = 0;
let currentAngleLeftEar  = 0;
let targetAngleRightEar  = 0;
let currentAngleRightEar = 0;

let earShakeAmount      = 4     ; // 控制耳朵晃动的幅度
let earShakeSpeed       = 0.0012; // 控制耳朵晃动的速度
let earShakeOffsetLeft  = 0     ; // 左耳的晃动偏移量
let earShakeOffsetRight = 0     ; // 右耳的晃动偏移量

let eyeBlinking   = false; // 标志位，控制是否正在眨眼
let blinkDuration = 500  ;  // 每次眨眼的持续时间
let blinkTime     = 0    ; // 记录眨眼的时间

// 鼠标移动事件
window.addEventListener
(
	'mousemove', (event) => { mouseX = event.clientX; mouseY = event.clientY; }
);

// 监听窗口大小变化，实时更新按钮大小
window.addEventListener('resize', () => {
    updateButtonSize();
    updateCircleSize();
    updateMouthSize(); 
    updateRectanglePositions(); 
});

// 初始化各个部件尺寸
function initializeSizes() {
    updateButtonSize();
    updateCircleSize();
    updateMouthSize(); 
    updateRectanglePositions(); 
}

// 更新按钮尺寸
function updateButtonSize() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const windowArea = windowWidth * windowHeight;

    const buttonSize = Math.sqrt(windowArea / 200); 

    button.forEach(button => {
        button.style.width = `${buttonSize}px`;
        button.style.height = `${buttonSize}px`;
        button.style.marginRight = `${buttonSize / 10}px`;
        button.style.fontSize = `${buttonSize * 0.5}px`; 
    });

    buttons.forEach(buttonsContainer => {
        buttonsContainer.style.width = `${27 * buttonSize / 5}px`;
        buttonsContainer.style.height = `${buttonSize}px`;
        buttonsContainer.style.padding = `${buttonSize / 10}px`;
    });
    
}

// 更新圆的尺寸，半径为窗口宽度的 1/20
function updateCircleSize() {
    const radius = window.innerWidth / (12 * scope / 7);
    le00.style.width = `${radius * 2}px`;
    le00.style.height = `${radius * 2}px`;
    re00.style.width = `${radius * 2}px`;
    re00.style.height = `${radius * 2}px`;

    const earSize = radius * 4;
    leftEar.style.fontSize = `${earSize}px`;
    rightEar.style.fontSize = `${earSize}px`;
}

// 更新猫嘴的尺寸
function updateMouthSize() {
    const mouthSize = window.innerWidth / 10; 
    mouth0.style.fontSize = `${mouthSize}px`;
    mouth0c.style.fontSize = `${mouthSize}px`;
    mouth0c2.style.fontSize = `${mouthSize}px`;
    pinkArrow.style.fontSize = `${mouthSize*0.86}px`;
    blackSymbol1.style.fontSize = `${mouthSize}px`;
    blackSymbol2.style.fontSize = `${mouthSize}px`;
    blackSymbol3.style.fontSize = `${mouthSize}px`;
    blackSymbol3.style.fontSize = `${mouthSize}px`;
    blackSymbol4.style.fontSize = `${mouthSize}px`;
    blackSymbol5.style.fontSize = `${mouthSize}px`;
    blacksquare.style.fontSize = `${mouthSize*1.4}px`;
    
}

// 更新长方体的位置
function updateRectanglePositions() {
    const radius = window.innerWidth / (12 * scope / 7); 
    const eyeDiameter = radius * 2; 

    leftRectangle.style.width = `${eyeDiameter}px`; 
    rightRectangle.style.width = `${eyeDiameter}px`; 
    leftRectangle.style.height = `${radius}px`; 
    rightRectangle.style.height = `${radius}px`; 

    leftRectangle.style.left = `${lx - eyeDiameter / 2}px`;
    leftRectangle.style.top = `${ly - 2 * radius}px`; 

    rightRectangle.style.left = `${rx - eyeDiameter / 2}px`;
    rightRectangle.style.top = `${ry - 2 * radius}px`; 

    leftRectangleLower.style.width = `${eyeDiameter}px`; 
    rightRectangleLower.style.width = `${eyeDiameter}px`; 
    leftRectangleLower.style.height = `${radius}px`; 
    rightRectangleLower.style.height = `${radius}px`; 

    leftRectangleLower.style.left = `${lx - eyeDiameter / 2}px`;
    leftRectangleLower.style.top = `${ly + radius}px`; 

    rightRectangleLower.style.left = `${rx - eyeDiameter / 2}px`;
    rightRectangleLower.style.top = `${ry + radius}px`; 
}

// 更新左边圆和耳朵的位置
function animateLeftCircle() {
    const radius = window.innerWidth / (12 * scope / 7);

    lx += (mouseX / scope - lx + ((scope - 1 - (scope / 2 - 1)) * window.innerWidth  / (2 * scope))) * delay;
    ly += (mouseY / scope - ly + ((scope - 2) * window.innerHeight / (2 * scope))) * delay;

    le00.style.left = `${lx - radius}px`;
    le00.style.top  = `${ly - radius}px`;

    leftEar.style.left = `${lx / 2 - radius}px`;
    leftEar.style.top = `${ly / 2 - 3 * radius}px`;

    targetAngleLeftEar = -55 + 0.05 * (window.innerWidth - mouseX);
    currentAngleLeftEar += (targetAngleLeftEar - currentAngleLeftEar) * delay;
    leftEar.style.transform = `rotate(${currentAngleLeftEar + 0}deg)`; 

    earShakeOffsetLeft = Math.sin(Date.now() * earShakeSpeed) * earShakeAmount; 

    updateRectanglePositions(); 
    requestAnimationFrame(animateLeftCircle);
}

// 更新右边圆和耳朵的位置
function animateRightCircle() {
    const radius = window.innerWidth / (12 * scope / 7);

    rx += (mouseX / scope - rx + ((scope - 1 + (scope / 2 - 1)) * window.innerWidth  / (2 * scope))) * delay;
    ry += (mouseY / scope - ry + ((scope - 2) * window.innerHeight / (2 * scope))) * delay;

    re00.style.left = `${rx - radius}px`;
    re00.style.top  = `${ry - radius}px`;

    rightEar.style.left = `${(window.innerWidth - rx) / 2 + rx - radius}px`;
    rightEar.style.top = `${ry / 2 - 3 * radius}px`;
    
    

    targetAngleRightEar = 15 + 0.05 * (window.innerWidth - mouseX); 
    currentAngleRightEar += (targetAngleRightEar - currentAngleRightEar) * delay;
    rightEar.style.transform = `rotate(${currentAngleRightEar + 0}deg)`; 

    earShakeOffsetRight = Math.sin(Date.now() * earShakeSpeed) * earShakeAmount; 

    updateRectanglePositions(); 
    requestAnimationFrame(animateRightCircle);
}

// 更新猫嘴的位置
function animateMouth() {
    const radius = window.innerWidth / (12 * scope / 7);

    mx += (mouseX / (3 * scope / 2) - mx + (((3 * scope / 2) - 1) * window.innerWidth  / (3 * scope))) * delay;
    my += (mouseY / (3 * scope / 2) - my + (((3 * scope / 2) + 1) * window.innerHeight / (3 * scope))-radius/2) * delay;
    
    mouth0.style.left = `${mx}px`;
    mouth0.style.top  = `${my+radius}px`;
    mouth0c.style.left = `${mx}px`;
    mouth0c.style.top = `${my+0.8*radius}px`;
    mouth0c2.style.left  = `${mx}px`;
    mouth0c2.style.top  = `${my+0.7*radius}px`;
    pinkArrow.style.left = `${mx}px`;
    pinkArrow.style.top = `${my-0*radius}px`;
    blackSymbol1.style.left = `${mx}px`;
    blackSymbol1.style.top = `${my+0.85*radius}px`;
    blackSymbol2.style.left = `${mx}px`;
    blackSymbol2.style.top = `${my+0.7*radius}px`;
    blackSymbol3.style.left = `${mx}px`;
    blackSymbol3.style.top = `${my+0.55*radius}px`;
    blackSymbol4.style.left = `${mx}px`;
    blackSymbol4.style.top = `${my+0.4*radius}px`;
    blackSymbol5.style.left = `${mx}px`;
    blackSymbol5.style.top = `${my+0.25*radius}px`;
    blacksquare.style.left = `${mx}px`;
    blacksquare.style.top = `${my-0.4*radius}px`;

    requestAnimationFrame(animateMouth);
}

// 启动眨眼
function startBlinking() {
    if (!eyeBlinking) {
        eyeBlinking = true;
        blinkTime = 0;
        animateBlink();
    }
}

// 眨眼动画的实现
function animateBlink() {
    const radius = window.innerWidth / (12 * scope / 7); 
    const blinkProgress = blinkTime / blinkDuration;
    const easingFactor = Math.pow(1 - blinkProgress, 3); 

    const upperBlinkMovement = Math.sin(easingFactor * Math.PI) * radius; 
    const lowerBlinkMovement = Math.sin(easingFactor * Math.PI) * -radius;

    leftRectangle.style.top = `${ly - 2 * radius + upperBlinkMovement}px`;
    rightRectangle.style.top = `${ry - 2 * radius + upperBlinkMovement}px`;

    leftRectangleLower.style.top = `${ly + radius + lowerBlinkMovement}px`;
    rightRectangleLower.style.top = `${ry + radius + lowerBlinkMovement}px`;

    blinkTime += delay * 550;

    if (blinkTime >= blinkDuration) {
        blinkTime = 0;
        eyeBlinking = false;
        const randomBlinkInterval = getRandomBlinkInterval();
        setTimeout(startBlinking, randomBlinkInterval);
    } else {
        requestAnimationFrame(animateBlink);
    }
}

// 随机眨眼间隔
function getRandomBlinkInterval() {
    return Math.random() * (2500 - 1800) + 1800; // 随机间隔 1-2秒
}

// 按钮点击事件，改变光标为不同的 emoji
fishButton.addEventListener('click', () => {
    const radius = window.innerWidth / (12 * scope / 7); // 计算半径
    changeCursorToEmoji("🐟", radius);  // 鱼按钮，改变为鱼 emoji
});

cursorButton.addEventListener('click', () => {
    resetCursor();  // 恢复默认光标
});

snackButton.addEventListener('click', () => {
    const radius = window.innerWidth / (12 * scope / 7); // 计算半径
    changeCursorToEmoji("🥛", radius);  // 牛奶按钮，改变为牛奶 emoji
});

brushButton.addEventListener('click', () => {
    const radius = window.innerWidth / (12 * scope / 7); // 计算半径
    changeCursorToEmoji("🪥", radius);  // 牙刷按钮，改变为牙刷 emoji
});

settingsButton.addEventListener('click', () => {
    const radius = window.innerWidth / (12 * scope / 7); // 计算半径
    changeCursorToEmoji("⚙️", radius);  // 设置按钮，改变为齿轮 emoji
});

// 修改光标为指定的 emoji
// 修改光标为指定的 emoji，大小为给定的半径
function changeCursorToEmoji(emoji, radius) {
    // 设置光标为指定的 emoji，大小根据传入的 radius 动态调整
    document.body.style.cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${radius * 2}" height="${radius * 2}"><text x="0" y="${radius}" font-size="${radius}">${emoji}</text></svg>'), auto`;
}

// 恢复默认电脑光标
function resetCursor() {
    document.body.style.cursor = "default";  // 恢复为默认光标
}

// 启动第一次眨眼
const initialBlinkInterval = getRandomBlinkInterval();
setTimeout(startBlinking, initialBlinkInterval);

// 启动动画
initializeSizes();
animateLeftCircle(); 
animateRightCircle(); 
animateMouth();