const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width=600;
const CANVAS_HEIGHT = canvas.height=600;

const playerImage = new Image();
playerImage.src = "shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 0;
let maxFrame = 0;
let gameFrame = 0;
const staggerFrames = 5;

function animate() {
    setTimeout(() => {
        
        switch (frameY){
            case 0:
                maxFrame=6;
            break;
            case 4:
                maxFrame=10;
            break;
            case 5:
                maxFrame=4;
            break;
            default:
                maxFrame=0;
        }
    
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.drawImage(
            playerImage,
            frameX * spriteWidth,
            frameY * spriteHeight,
            spriteWidth,
            spriteHeight,
            0,
            0,
            spriteWidth,
            spriteHeight
        );
        if(gameFrame % staggerFrames == 0) {
            if(frameX < maxFrame) frameX++;
            else frameX = 0;
        }
        gameFrame++;
        requestAnimationFrame(animate);
    }, 10);
}
animate();