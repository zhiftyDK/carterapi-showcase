const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width=1920;
const CANVAS_HEIGHT = canvas.height=1080;

    //1 -idle frames
    //2- start speak frames
    //3- end speak frames //last frame (15) used for space b, m, p
    //4- AEILUTH frames
    //5- CDGKNSTXYZFV frames
    //6- CHSHJR frames
    //7- O frames
    //8- QW frames
let sheet1='./frames/idle frames.png';
let sheet2='./frames/start speak frames.png';
let sheet3='./frames/end speak frames.png';
let sheet4='./frames/AEILUTH frames.png';
let sheet5='./frames/CDGKNSTXYZFV frames.png';
let sheet6='./frames/CHSHJR frames.png';
let sheet7='./frames/O frames.png';
let sheet8='./frames/QW frames.png';

const spriteWidth = 1920;
const spriteHeight = 1080;
let frameX = 0;
let frameY = 0;
let maxFrame = 29;
let gameFrame = 0;
const staggerFrames = 5;


function animate() {
    const playerImage = new Image();
    playerImage.src = sheet1;
    setTimeout(() => {
        
        // switch (frameY){
        //     case 0:
        //         maxFrame=6;
        //     break;
        //     case 4:
        //         maxFrame=10;
        //     break;
        //     case 5:
        //         maxFrame=4;
        //     break;
        //     default:
        //         maxFrame=0;
        // }
    
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
    }, );
}
animate();