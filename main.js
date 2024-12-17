const player = document.createElement("div");
player.className = "player";
document.body.appendChild(player);

const ground = document.createElement("div");
ground.className = "ground";
document.body.appendChild(ground);

const groundTop = document.createElement("div");
groundTop.className = "groundTop";
document.body.appendChild(groundTop);

function getKey() {
    document.getElementById("getKey").value = event.keyCode;
}

function updateSprites() {
    player.style.left = posX - player.offsetWidth / 2 + "px";
    player.style.bottom = posY - cameraY + "px";
    player.style.transform = "rotate(" + direction + "deg)";
    ground.style.bottom = 0 - cameraY + "px";
    groundTop.style.bottom = (-2 + ground.offsetHeight) - cameraY + "px";
}

speedX = 0;
speedY = 0;
posX = 0;
posY = 0;
direction = 0;
cameraX = 0;
cameraY = 0;
groundY = 62;

updateSprites();
setInterval(function (gameLoop) {
    moveCamera();
    fixCollision();
    updateSprites();
    speedX += 0.1 * ((document.getElementById("getKey").value == 39) - (document.getElementById("getKey").value == 37));
    if (speedY > -10) {
        speedY -= 0.1;
    }
    posX += speedX;
    posY += speedY;
    speedX -= 0.05 * speedX;
    direction += (posY - player.offsetHeight / 2 > groundY) * speedX;
});

function moveCamera() {
    offsetX = -40;
    offsetY = 500;
    if (posX > offsetX) {
        cameraX = posX - offsetX;
    }
    if (posY > offsetY) {
        cameraY = posY - offsetY;
    }
}

function fixCollision() {
    if (posY - player.offsetHeight / 2 <= groundY) {
        speedY = 0;
        posY = groundY + player.offsetHeight / 2;
        direction += (2 - speedY) * Math.sin(direction % 90 / 10);
        if (document.getElementById("getKey").value == 38) {
            speedY = 6;
        }
    }
}