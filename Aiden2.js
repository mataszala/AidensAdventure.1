// board
let board;
let boardWidth = 1200;
let boardHeight = 800;
let context;

//Aiden
let aidenWidth = 200;
let aidenHeight = 220;
let aidenX = 50;
let aidenY = boardHeight - aidenHeight - 100;
let aidenImg;


let aiden = {
    x : aidenX,
    y : aidenY,
    width : aidenWidth,
    height : aidenHeight
}

// land
const landWidth = 1200;
const landHeight = 100
const landX = 0;
const landY = boardHeight - landHeight;
let landImg;

const land = {
    x : landX,
    y : landY,
    width : landWidth,
    height : landHeight
}


//monsters
let monsterArray = [];
let monsterWidth = 150;
let monsterHeight = 150;
let monsterX = boardWidth;
let monsterY = 380;
let monsterImg;


//clouds
let cloudsArray = [];
let cloudsWidth = 241;
let cloudsHeight = 241;
let cloudsX = boardWidth;
let cloudsY = 50;
let cloudsImg;

// barriers
let barrierArray = [];

let barrier1Width = 80;
let barrier2Width = 120;
let barrier3Width = 150;

let barrierHeight = 170;
let barrierX = 1100;
let barrierY = boardHeight - barrierHeight - 100;

let barrier1Img;
let barrier2Img;
let barrier3Img;

//physic
let velocityX = -6; // barrier moving speed
let velocityY = 0;
let gravity = .3;
let bending = 0;
let monsterVelocityX = -2; //monster moving left speed;

let gameOver = false;
let score = 0;


window.onload = function() {
    showPopup();
}

function update() {

    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }

    context.clearRect(0, 0, board.width, board.height);

    // Aiden

    velocityY += gravity;
    aiden.y = Math.min(aiden.y + velocityY, aidenY);// apply gravity to current aiden.y
    aidenHeight += bending
    context.drawImage(aidenImg, aiden.x, aiden.y, aidenWidth, aidenHeight);


    //land
    context.drawImage(landImg, land.x, land.y, landWidth, landHeight);

    //clouds
    for (let i = 0; i < cloudsArray.length; i++) {
        let clouds = cloudsArray[i];
        clouds.x += velocityX
        context.drawImage(clouds.img, clouds.x, clouds.y, clouds.width, clouds.height);
        }

    //Barrier
    for (let i = 0; i < barrierArray.length; i++) {
        let barrier = barrierArray[i];
        barrier.x += velocityX
        context.drawImage(barrier.img, barrier.x, barrier.y, barrier.width, barrier.height);

        if (detectCollision(aiden,barrier)) {
            gameOver = true
            aidenImg.src = "Aiden-dead.png"
            aidenImg.onload = function () {
                context.drawImage(aidenImg, aiden.x, aiden.y, aiden.width, aiden.height);
            }
        }
    }


    // score
    context.fillStyle = "black";
    context.font = "40px courier";
    score++;
    context.fillText(score, 5, 50);
}

function placeMonsters() {


    let monster = {
        img : monsterImg,
        x : monsterX,
        y : monsterY,
        width : monsterWidth,
        height : monsterHeight,
        passed : false
    }
    monsterArray.push(monster);

    if (monsterArray.length > 10) {
        monsterArray.shift(); // remove the first element from the array

    }
}


function moveAiden(e) {
    if (gameOver) {
        return;
    }
    if ((e.code == "Space" || e.code == "ArrowUp" ) && aiden.y == aidenY) {
        // jump
        aidenImg.src = "Aiden.png";
        aidenWidth = 200;
        aidenHeight = 220;
        aidenX = 50;
        aidenY = boardHeight - aidenHeight - 100;
        velocityY = -15;
    }
    else if (e.code == "ArrowDown" && aiden.y == aidenY) {
        //duck
        aidenWidth = 300;
        aidenHeight = 210;
        aidenImg.src = "AidenDucking.png";
        aiden.x = 6;
        aidenY = boardHeight - aidenHeight - 55;
    }


}

function placeClouds() {

    let randomWidth = Math.random() * (cloudsWidth - 150) + 150
    cloudsHeight = randomWidth - 100

    let clouds = {
        img : cloudsImg,
        x : cloudsX,
        y : cloudsY,
        width : randomWidth,
        height : cloudsHeight,
        passed : false
    }
    cloudsArray.push(clouds);

    if (cloudsArray.length > 10) {
        cloudsArray.shift(); // remove the first element from the array

    }
}



function placeLand() {
    
}

function placeBarrier(score) {
    
    if (gameOver) {
       return;
    }

    //place barrier
    let barrier = {
        img : null,
        x : barrierX,
        y : barrierY,
        width: null,
        height : barrierHeight

    }


    let monster = {
        img : monsterImg,
        x : monsterX,
        y : monsterY,
        width : monsterWidth,
        height : monsterHeight,
        passed : false
    }


    if (monsterArray.length > 10) {
        monsterArray.shift(); // remove the first element from the array

    }

    let placeBarriersChance = Math.random();

    if(score < 1500){
    if (placeBarriersChance > .90) { // 10% of chance to get barrier3
        barrier.img = barrier3Img;
        barrier.width = barrier3Width;
        barrierArray.push(barrier);
    }
    else if (placeBarriersChance > .70) { // 30% of chance to get barrier2
        barrier.img = barrier2Img;
        barrier.width = barrier2Width;
        barrierArray.push(barrier);
    }
    else if (placeBarriersChance > .50) { // 50% of chance to get barrier1
        barrier.img = barrier1Img;
        barrier.width = barrier1Width;
        barrierArray.push(barrier);
    }

    if (barrierArray.length > 10) {
        barrierArray.shift(); // remove the first element from the array

    }
    }else{
    if (placeBarriersChance > .80) { // 10% of chance to get barrier3
        barrier.img = barrier3Img;
        barrier.width = barrier3Width;
        barrierArray.push(barrier);
    }
    else if (placeBarriersChance > .60) { // 30% of chance to get barrier2
        barrier.img = barrier2Img;
        barrier.width = barrier2Width;
        barrierArray.push(barrier);
    }
    else if (placeBarriersChance > .40) { // 50% of chance to get barrier1
        barrier.img = barrier1Img;
        barrier.width = barrier1Width;
        barrierArray.push(barrier);

    }
    else if (placeBarriersChance > .10){
        barrier.img = monsterImg;
        barrier.x = monsterX;
        barrier.y = monsterY;
        barrier.width = monsterWidth;
        barrierArray.push(monster);}
    }
    }

    if (barrierArray.length > 10) {
        barrierArray.shift(); // remove the first element from the array}
}

function detectCollision(a, b) {
    return a.x < b.x + b.width &&   //a's top left corner doesn't reach b's top right corner
           a.x + a.width > b.x &&   //a's top right corner passes b's top left corner
           a.y < b.y + b.height &&  //a's top left corner doesn't reach b's bottom left corner
           a.y + a.height > b.y;    //a's bottom left corner passes b's top left corner
}


function showPopup() {
    console.log('1');
    const overlay = document.getElementById("overlay");
    console.log('overlay', overlay);
    const popup = document.getElementById("popup");
    console.log('popup', popup);

    overlay.style.display = "flex";
    popup.style.animationName = "slideIn";
    popup.style.animationDirection = "normal";
    popup.style.animationFillMode = "both";
    popup.style.opacity = "1";

    popup.addEventListener("click", hidePopup);
}

function hidePopup() {
    console.log('hidePopup');
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
    var popup2 = document.getElementById("popup2");

    if (popup.style.display !== "none") {
        popup.style.animationName = "slideOut";
        // popup.style.animationDirection = "reverse";
        // popup.style.animationFillMode = "both";
        popup.addEventListener("animationend", function() {
            popup.style.display = "none";
            popup2.style.display = "block";
            popup2.style.animationName = "slideIn2";
            popup2.style.animationDirection = "normal";
            popup2.style.animationFillMode = "both";
            popup2.addEventListener("click",startGame)
        });
    }
}

function startGame() {
    var popup2 = document.getElementById("popup2");
    popup2.style.animationName = "slideOut";
    popup2.addEventListener("animationend", function() {
        board = document.getElementById("board");
    
        board.height = boardHeight;
        board.width = boardWidth;
    
        context = board.getContext("2d"); // used for drawing on the board
    
        //draw initial Aiden
        //context.fillStyle = "green";
        //context.fillRect(aiden.x, aiden.y, aidenWidth, aidenHeight);
    
        aidenImg = new Image();
        aidenImg.src = "Aidenrun.png";
        aidenImg.onload = function() {
            context.drawImage(aidenImg, aiden.x, aiden.y, aidenWidth, aidenHeight);
        }
    
        cloudsImg = new Image();
        cloudsImg.src = "./cloud1.png";
    
        monsterImg = new Image();
        monsterImg.src = "./monster.png"
    
        barrier1Img = new Image();
        barrier1Img.src = "rock.png";
    
        barrier2Img = new Image();
        barrier2Img.src = "bush.png";
    
        barrier3Img = new Image();
        barrier3Img.src = "sheep.png";
    
        landImg = new Image();
        landImg.src = "land.png";
        landImg.onload = function() {
            context.drawImage(landImg, land.x, land.y, landWidth, landHeight);
        }
    
        requestAnimationFrame(update);
        setInterval(placeBarrier, 2000); //1000milisecunds = 1 secunds
        setInterval(placeMonsters, 300); //every 6.5 seconds
        setInterval(placeClouds,800); // every 2 sek
        document.addEventListener("keydown", moveAiden);
    });



    


}