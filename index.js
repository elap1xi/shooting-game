


function sleep(s) { return new Promise(resolve => setTimeout(resolve, s * 1000)); }

document.querySelector('#start').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('mainpg').classList.add('hide');
    document.getElementById('transpg').classList.remove('hide');
    document.getElementById('start_rec').innerHTML = "Ready";
    setTimeout(()=>{ document.getElementById('start_rec').innerHTML = "3"; }, 2000);
    setTimeout(()=>{ document.getElementById('start_rec').innerHTML = "2"; }, 3000);
    setTimeout(()=>{ document.getElementById('start_rec').innerHTML = "1"; }, 4000);
    setTimeout(()=>{ document.getElementById('start_rec').classList.add('hide'); any_move = true; score = 5000; }, 5000);
});

// ======= CONFIG ========
let level = 1;
let score = 5000;
let user_h = 30;
let user_hh = 2;
let bullet_term = 50;   // ms
let bullet_speed = 7;
// =======================
var lf = Date.now();
var bullets = [];
var bullet_e = [];
var chk_lvl = [];
var keyPressed = [];
let any_move = false;
let started = false;
let lv_5 = true;   let lv_6 = true;
let lv_9 = true;   let lv_10 = true;
image_enemy.style.visibility = "hidden";    image_enemy_1.style.visibility = "hidden";
image_enemy_2.style.visibility = "hidden";  image_enemy_3.style.visibility = "hidden";
image_enemy_4.style.visibility = "hidden";  rec_n_spoiler.style.visibility = "hidden";
const image = document.getElementById("image");
const imagePosition = document.getElementById("imagePosition");

// user =========================================
const centerX = window.innerWidth / 2;
const centerY = window.innerHeight * 0.8;

let imageX = centerX - image.width / 2;
let imageY = centerY - image.height / 2;

image.style.left = imageX + "px";
image.style.top = imageY + "px";
// ==============================================
// 이미지 위치 제한 범위
const imageMinX = window.innerWidth*0.26; // 왼쪽 수직선 오른쪽 끝
const imageMaxX = window.innerWidth*0.7; // 오른쪽 수직선 왼쪽 끝
// ==============================================

let enemy_random_pos = 0;
let enemy_vertical_pos = 0;

function pos(image, enemy_random_pos, enemy_vertical_pos) {
    image.style.left = enemy_random_pos + "%";
    image.style.top = enemy_vertical_pos + "%";
    image.style.opacity = "100%";
    image.style.visibility = null;
}

function set_health() {
    e14_z = 19; e14_z2 = 19; e14_z3 = 19; e14_z4 = 19;
    e5_b = 99;
    e5_z = 19; e5_z2 = 19; e5_z3 = 19; e5_z4 = 19;
    e68_z = 39; e68_z2 = 39; e68_z3 = 39; e68_z4 = 39;
    e9_b = 149;
    e9_z = 49; e9_z2 = 49; e9_z3 = 49; e9_z4 = 49;
    e10_b = 199;
}

function rdm_x(v) {
    if (v == 'x') {
        return Math.floor(Math.random() * (70 - (25) + 1)) + 25;
    } else if (v == 'y-1') {
        return Math.floor(Math.random() * (10 + 1));
    } else if (v == 'y-2') {
        return Math.floor(Math.random() * (20 - (15) + 1)) + 15;
    } else if (v == 'y-3') {
        return Math.floor(Math.random() * (30 - (25) + 1)) + 25;
    } else if (v == 'y-4') {
        return Math.floor(Math.random() * (50 - (45) + 1)) + 45;
    } else if (v == 'y-5') {
        return Math.floor(Math.random() * (40 - (35) + 1)) + 35;
    }
}

function move(img, x){
    img.style.left = `${x}%`;
    setTimeout(()=>{
        img.style.transition = '';
    }, 3000);
}

setInterval(() => {
    if (level >= 1 && level <= 4) {
        if(image_enemy_1.style.visibility !== "hidden")move(image_enemy_1, rdm_x('x'));
        if(image_enemy_2.style.visibility !== "hidden")move(image_enemy_2, rdm_x('x'));
        if(image_enemy_3.style.visibility !== "hidden")move(image_enemy_3, rdm_x('x'));
    }
    else if (level == 5) {
        if(image_enemy.style.visibility !== "hidden")move(image_enemy, rdm_x('x'));
        if(image_enemy_1.style.visibility !== "hidden")move(image_enemy_1, rdm_x('x'));
        if(image_enemy_2.style.visibility !== "hidden")move(image_enemy_2, rdm_x('x'));
        if(image_enemy_3.style.visibility !== "hidden")move(image_enemy_3, rdm_x('x'));
    }
    else if (level >= 6 && level <= 8) {
        if(image_enemy_1.style.visibility !== "hidden")move(image_enemy_1, rdm_x('x'));
        if(image_enemy_2.style.visibility !== "hidden")move(image_enemy_2, rdm_x('x'));
        if(image_enemy_3.style.visibility !== "hidden")move(image_enemy_3, rdm_x('x'));
        if(image_enemy_4.style.visibility !== "hidden")move(image_enemy_4, rdm_x('x'));
    }
    else if (level == 9) {
        if(image_enemy.style.visibility !== "hidden")move(image_enemy, rdm_x('x'));
        if(image_enemy_1.style.visibility !== "hidden")move(image_enemy_1, rdm_x('x'));
        if(image_enemy_2.style.visibility !== "hidden")move(image_enemy_2, rdm_x('x'));
        if(image_enemy_3.style.visibility !== "hidden")move(image_enemy_3, rdm_x('x'));
        if(image_enemy_4.style.visibility !== "hidden")move(image_enemy_4, rdm_x('x'));
    }
    else if (level == 10) {
        if(image_enemy.style.visibility !== "hidden")move(image_enemy, rdm_x('x'));
    } else {
        // win
    }
}, 5000);

function spawn(level) {
    setTimeout(()=> {
        if (level >= 1 && level <= 4) {
            set_health();
            pos(image_enemy, -500, -500);
            pos(image_enemy_1, rdm_x('x'), rdm_x('y-1'));
            pos(image_enemy_2, rdm_x('x'), rdm_x('y-2'));
            pos(image_enemy_3, rdm_x('x'), rdm_x('y-3'));
            pos(image_enemy_4, -500, -500);
            started = true;
        }
        else if (level == 5) {
            set_health();
            pos(image_enemy, rdm_x('x'), rdm_x('y-5'));
            pos(image_enemy_1, rdm_x('x'), rdm_x('y-1'));
            pos(image_enemy_2, rdm_x('x'), rdm_x('y-2'));
            pos(image_enemy_3, rdm_x('x'), rdm_x('y-3'));
            pos(image_enemy_4, -500, -500);
        }
        else if (level >= 6 && level <= 8) {
            set_health();
            pos(image_enemy, -500, -500);
            pos(image_enemy_1, rdm_x('x'), rdm_x('y-1'));
            pos(image_enemy_2, rdm_x('x'), rdm_x('y-2'));
            pos(image_enemy_3, rdm_x('x'), rdm_x('y-3'));
            pos(image_enemy_4, rdm_x('x'), rdm_x('y-4'));
        }
        else if (level == 9) {
            set_health();
            pos(image_enemy, rdm_x('x'), rdm_x('y-5'));
            pos(image_enemy_1, rdm_x('x'), rdm_x('y-1'));
            pos(image_enemy_2, rdm_x('x'), rdm_x('y-2'));
            pos(image_enemy_3, rdm_x('x'), rdm_x('y-3'));
            pos(image_enemy_4, rdm_x('x'), rdm_x('y-4'));
        }
        else if (level == 10) {
            set_health();
            pos(image_enemy, rdm_x('x'), rdm_x('y-2'));
            pos(image_enemy_1, -500, -500);
            pos(image_enemy_2, -500, -500);
            pos(image_enemy_3, -500, -500);
            pos(image_enemy_4, -500, -500);
        } else {
            // win
        }
    }, 500)
}

spawn(level);
set_health();
function level_change() {
    any_move = false;
    level = level + 1;
    document.getElementById('lvl_chg_rec').innerHTML = `Lv. ${level}`;
    document.getElementById('lvl_chg_rec').classList.remove('hide');
    setTimeout(() => { 
        any_move = true;
        rec_n_spoiler.style.visibility = "hidden";
        document.getElementById('lvl_chg_rec').classList.add('hide');
    }, 3000)
}

const score_interval = setInterval(() => {
    score -= 1;
    if (level === 11) {
        console.log(score);
        clearInterval(intervalId);
    }
}, 1000);

setInterval(
    function () {
        document.getElementById('log').innerHTML = `level : ${level}<br>lv_5 : ${lv_5}<br>lv_6 : ${lv_6}<br>lv_9 : ${lv_9}<br>lv_10 : ${lv_10}<br>moving : ${any_move}<br>-- health --<br>${e14_z} ${e14_z2} ${e14_z3} ${e14_z4}<br>${e5_b} ${e5_z} ${e5_z2} ${e5_z3} ${e5_z4}<br>${e68_z} ${e68_z2} ${e68_z3} ${e68_z4}<br>${e9_b} ${e9_z} ${e9_z2} ${e9_z3} ${e9_z4}<br>${e10_b}<br><br>Score : ${score}`;
        if(started){
            if (lv_5 && lv_6 && lv_9 && lv_10) {
                if (image_enemy_1.style.visibility == "hidden" && image_enemy_2.style.visibility == "hidden" && image_enemy_3.style.visibility == "hidden") {
                    rec_n_spoiler.style.visibility = null;
                    level_change()
                    if (level == 5) {
                        lv_5 = false;
                        spawn(level)
                    } else {
                        spawn(level)
                    }
                }
            } else if (!lv_5 && lv_6 && lv_9 && lv_10) {
                if (image_enemy.style.visibility == "hidden" && image_enemy_1.style.visibility == "hidden" && image_enemy_2.style.visibility == "hidden" && image_enemy_3.style.visibility == "hidden") {
                    level_change()
                    if (level == 6) {
                        lv_6 = false;
                        spawn(6)
                    }
                }
            } else if (!lv_5 && !lv_6 && lv_9 && lv_10) {
                if (image_enemy_1.style.visibility == "hidden" && image_enemy_2.style.visibility == "hidden" && image_enemy_3.style.visibility == "hidden" && image_enemy_4.style.visibility == "hidden") {
                    level_change()
                    if (level == 9) {
                        lv_9 = false;
                        spawn(level)
                    } else {
                        spawn(level)
                    }
                }
            } else if (!lv_5 && !lv_6 && !lv_9 && lv_10) {
                if (image_enemy.style.visibility == "hidden" && image_enemy_1.style.visibility == "hidden" && image_enemy_2.style.visibility == "hidden" && image_enemy_3.style.visibility == "hidden" && image_enemy_4.style.visibility == "hidden") {
                    level_change()
                    if (level == 10) {
                        lv_10 = false;
                        spawn(10)
                    }
                }
            } else if (!lv_5 && !lv_6 && !lv_9 && !lv_10) {
                console.log("AA");
                if (image_enemy.style.visibility == "hidden") {
                    console.log("Game over");
                    document.getElementById('lvl_chg_rec').innerHTML = `Level Complete!`;
                    document.getElementById('lvl_chg_rec').classList.remove('hide');
                }
            }
        }
    }, 1000
);

// ========== Key Down ==========
window.onload = function () {
    setInterval(key_update, 50);
}

window.onkeydown = function (e) {
    keyPressed[e.keyCode] = true;
}

window.onkeyup = function (e) {
    keyPressed[e.keyCode] = false;
}

function key_update() {
    if(any_move){
        var press = false;
        if (keyPressed[65]) {
            moveImage("a");
        }
        if (keyPressed[68]) {
            moveImage("d");
        }
        if (keyPressed[75]) {
            var now = Date.now();
            if (now - lf > bullet_term) {
                var bullet = document.createElement('div');
                bullet.style.width = '4px';
                bullet.style.height = '12px';
                bullet.style.backgroundColor = 'grey';
                bullet.style.position = 'absolute';
                bullet.style.left = image.offsetLeft + 28 + 'px';
                bullet.style.top = image.offsetTop + 'px';
                document.body.appendChild(bullet);
                bullets.push(bullet);
                lf = now;
            }
        }
    }

}

function moveImage(direction) {
    if (direction === "a" && imageX > imageMinX) {
        imageX -= 10;
    } else if (direction === "d" && imageX < imageMaxX) {
        imageX += 10;
    }
    image.style.left = imageX + "px";
}

function check_enemy_health(image) {
    if (image == image_enemy) {
        if (level == 5) {
            if (e5_b == 0) {
                return true;
            } else {
                e5_b--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 9) {
            if (e9_b == 0) {
                return true;
            } else {
                e9_b--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 10) {
            if (e10_b == 0) {
                return true;
            } else {
                e10_b--;
                enemy_heart(image);
                return false;
            }
        }
    }
    if (image == image_enemy_1) {
        if (level == 1 || level == 2 || level == 3 || level == 4) {
            if (e14_z == 0) {
                return true;
            } else {
                e14_z--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 5) {
            if (e5_z == 0) {
                return true;
            } else {
                e5_z--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 6 || level == 7 || level == 8) {
            if (e68_z == 0) {
                return true;
            } else {
                e68_z--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 9) {
            if (e9_z == 0) {
                return true;
            } else {
                e9_z--;
                enemy_heart(image);
                return false;
            }
        }
    }
    if (image == image_enemy_2) {
        if (level == 1 || level == 2 || level == 3 || level == 4) {
            if (e14_z2 == 0) {
                return true;
            } else {
                e14_z2--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 5) {
            if (e5_z2 == 0) {
                return true;
            } else {
                e5_z2--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 6 || level == 7 || level == 8) {
            if (e68_z2 == 0) {
                return true;
            } else {
                e68_z2--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 9) {
            if (e9_z2 == 0) {
                return true;
            } else {
                e9_z2--;
                enemy_heart(image);
                return false;
            }
        }
    }
    if (image == image_enemy_3) {
        if (level == 1 || level == 2 || level == 3 || level == 4) {
            if (e14_z3 == 0) {
                return true;
            } else {
                e14_z3--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 5) {
            if (e5_z3 == 0) {
                return true;
            } else {
                e5_z3--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 6 || level == 7 || level == 8) {
            if (e68_z3 == 0) {
                return true;
            } else {
                e68_z3--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 9) {
            if (e9_z3 == 0) {
                return true;
            } else {
                e9_z3--;
                enemy_heart(image);
                return false;
            }
        }
    }
    if (image == image_enemy_4) {
        if (level == 1 || level == 2 || level == 3 || level == 4) {
            if (e14_z4 == 0) {
                return true;
            } else {
                e14_z4--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 5) {
            if (e5_z4 == 0) {
                return true;
            } else {
                e5_z4--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 6 || level == 7 || level == 8) {
            if (e68_z4 == 0) {
                return true;
            } else {
                e68_z4--;
                enemy_heart(image);
                return false;
            }
        } else if (level == 9) {
            if (e9_z4 == 0) {
                return true;
            } else {
                e9_z4--;
                enemy_heart(image);
                return false;
            }
        }
    }
}

// 이미지가 bullet 충돌시 깜빡임 효과
async function enemy_heart(image) {
    image.style.opacity = "30%";
    await sleep(0.05);
    image.style.opacity = "100%";
}

// 이미지 사라짐 효과 (죽임) 
async function killed_enemy(image) {
    for (k = 0; k < 5; k++) {
        image.style.opacity = "100%";
        await sleep(0.08);
        image.style.opacity = "30%";
        await sleep(0.08);
    }
    image.style.visibility = "hidden";
    image.style.left = `0%`;
}

// 이미지와 bullet의 충돌 체크
function checkCollision(bullet, image) {
    try {
        var rect1 = bullet.getBoundingClientRect(); // 총알의 위치와 크기 정보
        var rect2 = image.getBoundingClientRect(); // 이미지의 위치와 크기 정보
        return !(rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom);
    } catch {
        return false;
    }
}

setInterval(
    function () {
        for (var i = 0; i < bullets.length; i++) {
            try {
                if(!any_move){
                    document.body.removeChild(bullets[i]);
                    bullets.splice(i, 1);
                } else {
                    if (checkCollision(bullets[i], image_enemy)) {
                        document.body.removeChild(bullets[i]);
                        bullets.splice(i, 1);
                        if (check_enemy_health(image_enemy)) {
                            killed_enemy(image_enemy);
                        }
                    
                    } else if (checkCollision(bullets[i], image_enemy_1)) {
                        document.body.removeChild(bullets[i]);
                        bullets.splice(i, 1);
                        if (check_enemy_health(image_enemy_1)) {
                            killed_enemy(image_enemy_1);
                        }
                    
                    } else if (checkCollision(bullets[i], image_enemy_2)) {
                        document.body.removeChild(bullets[i]);
                        bullets.splice(i, 1);
                        if (check_enemy_health(image_enemy_2)) {
                            killed_enemy(image_enemy_2);
                        }
                    
                    } else if (checkCollision(bullets[i], image_enemy_3)) {
                        document.body.removeChild(bullets[i]);
                        bullets.splice(i, 1);
                        if (check_enemy_health(image_enemy_3)) {
                            killed_enemy(image_enemy_3);
                        }
                    
                    } else if (checkCollision(bullets[i], image_enemy_4)) {
                        document.body.removeChild(bullets[i]);
                        bullets.splice(i, 1);
                        if (check_enemy_health(image_enemy_4)) {
                            killed_enemy(image_enemy_4);
                        }
                    
                    } else if (bullets[i].offsetTop <= 0) {
                        document.body.removeChild(bullets[i]);
                        bullets.splice(i, 1); // 배열에서도 해당 요소를 제거
                    } else {
                        bullets[i].style.top = (bullets[i].offsetTop - bullet_speed) + "px";
                    }
                }
            } catch {

            }
        }
    }, 10
);