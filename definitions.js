
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const blockSize = 64
const endScreen = document.getElementById("endScreen")


// LET VARIABLES
let playerFacingRight = true;
let mouseDown = false;
let lastBulletTime = 0;
let lastBulletTimeLocation = 0;
let clientX;
let clientY;
let playerHealth = 100;
let playerDamageInterval;
let slimeIntervalMultiplier = 1;
let slimesKilled = 0;
let wave = 1;
let bulletSpawnSide;
const playerHealthPixelWidth = innerWidth / playerHealth / 2;
const killCount = document.getElementById("killCount");
const killCountNumber = document.getElementById("killCountSpan");

canvas.width = innerWidth;
canvas.height = innerHeight;

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    e: {
        pressed: false
    },
}

const grassMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
    [0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
    [2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0],
    [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
]
const treeMap = [
    [0, 3, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 4, 0, 1],
    [0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 4, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 4, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
const visualObjectMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const trees = []
const grasses = []
const visualObjects = []
const bulletsOnScreen = []
const mobs = []
const maxMobs = 400
const weapons = ["none", "glock", "ak47"]
const currentBulletDirection = {x: 0, y: 0}
const waveLength = [0, 20.5, 30, 40, 50]

// IMAGES

const grassImage = new Image()
grassImage.src = "Images/grass-default.png"
const grassImageBright = new Image()
grassImageBright.src = "Images/grass-bright.png"
const treeImage = new Image()
treeImage.src = "Images/tree.png"
const bushImage = new Image()
bushImage.src = "Images/bush.png"
const qualmImage = new Image()
qualmImage.src = "Images/qualm.png"
const playerImage = new Image()
playerImage.src = "Images/player.png"
const playerImageLeft = new Image()
playerImageLeft.src = "Images/player facing left.png"
const playerTopRight = new Image()
playerTopRight.src = "Images/player top.png"
const playerTopLeft = new Image()
playerTopLeft.src = "Images/player top left.png"
const playerImageShootingRight = new Image()
playerImageShootingRight.src = "Images/player shooting right.png"
const playerImageShootingLeft = new Image()
playerImageShootingLeft.src = "Images/player shooting left.png"
const playerRunningRight = new Image()
playerRunningRight.src = "Images/player running right.png"
const playerRunningLeft = new Image()
playerRunningLeft.src = "Images/player running left.png"
const ak47Right = new Image()
ak47Right.src = "Images/playerAK47.png"
const ak47Left = new Image()
ak47Left.src = "Images/playerAK47LEFT.png"
const glockRight = new Image()
glockRight.src = "Images/glock shooting right.png"
const glockLeft = new Image()
glockLeft.src = "Images/glock shooting left.png"
const blueSlime = new Image()
blueSlime.src = "Images/Blue Slime.png"
const blueSlimeAngry = new Image()
blueSlimeAngry.src = "Images/Blue Slime red eyes.png"
const blueSlimeDead = new Image()
blueSlimeDead.src = "Images/Blue Slime dead.png"
const blueSlimeDamage = new Image()
blueSlimeDamage.src = "Images/Blue Slime damage.png"
const houseImage = new Image()
houseImage.src = "Images/red house.png"
const boltImage = new Image()
boltImage.src = "Images/boltImage.png"
const dropoffImage = new Image()
dropoffImage.src = "Images/skeleton dropoff.png"
const dropoffGlock = new Image()
dropoffGlock.src = "Images/skeleton dropoff glock.png"
const dropoffAk47 = new Image()
dropoffAk47.src = "Images/skeleton dropoff ak47.png"
const eKeyImage = new Image()
eKeyImage.src = "Images/E key.png"
const waveShrineImage = new Image()
waveShrineImage.src = "Images/wave stand.png"
const waveShrineFire = new Image()
waveShrineFire.src = "Images/wave stand fire.png"
const eKeyStart = new Image()
eKeyStart.src = "Images/E key start.png"
const youNeedWeapon = new Image()
youNeedWeapon.src = "Images/you need a weapon.png"

const dropoffImages = [dropoffImage, dropoffGlock, dropoffAk47]

// AUDIO


const backgroundMusic = new Audio()
backgroundMusic.src = "audio/bloodForestBeat.mp3"
backgroundMusic.load()
backgroundMusic.volume = 0.5
const bulletSound = new Audio()
bulletSound.src = "audio/gun sound.mp3"
bulletSound.load()

// BUTTONS

const backgroundMusicButton = document.getElementById("music")
backgroundMusicButton.onclick = function() {
    if (backgroundMusic.paused) {
        backgroundMusic.play()
    } else {
        backgroundMusic.pause()
    }
}

// CLASSES

class Grass {
    static width = 64
    constructor({position, type}) {
        this.position = position
        this.image = grassImage
        this.image2 = grassImageBright
        this.type = type
    }
    draw() {
        if (this.type == "grass") {
        c.drawImage(this.image,
            0,
            0,
            128,
            128,
            this.position.x,
            this.position.y,
            Grass.width,
            Grass.width)
        } else if (this.type == "grassBright") {
            c.drawImage(this.image2,
            0,
            0,
            256,
            256,
            this.position.x,
            this.position.y,
            Grass.width,
            Grass.width)
        }
    }    
}
class Tree {
    static width = 128
    constructor({position, type}) {
        this.position = position
        this.image = treeImage
        this.type = type
    }
    draw() {    
        if (this.type == "tree") {  
        c.drawImage(this.image,
            0,
            0,
            128,
            128,
            this.position.x - Tree.width / 4,
            this.position.y - Tree.width / 2,
            Tree.width,
            Tree.width)
        } else if (this.type == "bush") {
            c.drawImage(bushImage,
            0,
            0,
            128,
            128,
            this.position.x,
            this.position.y,
            Grass.width,
            Grass.width)
        } else if (this.type == "qualm") {
            c.drawImage(qualmImage,
            0,
            0,
            128,
            256,
            this.position.x,
            this.position.y,
            Grass.width,
            Grass.width * 2)
        }
    }    
}
class House {
    // 80 x 113
    static width = 128
    static height = 180.8
    constructor({position}) {
        this.position = position
        this.image = houseImage
    }
    draw() {        
        c.drawImage(this.image,
            0,
            0,
            160,
            226,
            this.position.x,
            this.position.y,
            House.width,
            House.height)
    }
    update() {
        this.draw()
    }
}
class Dropoff {
    constructor({position}) {
        this.position = position
        this.image = dropoffImages[wave]
        this.width = 128
        this.keyWidth = 96
        this.appear = true
        this.frame = {value: 0, elapsed: 0}
    }
    draw() {
        const playerCenter = {
            x: player.position.x + Player.width / 2,
            y: player.position.y + Player.width / 2,
        }
        const dropoffCenter = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.width / 2,
        }
        c.drawImage(this.image,
            0,
            0,
            256,
            256,
            this.position.x,
            this.position.y,
            this.width,
            this.width)
        if (Math.abs(playerCenter.x - dropoffCenter.x) < this.width / 2 &&
            Math.abs(playerCenter.y - dropoffCenter.y) < this.width / 2) {
            c.drawImage(eKeyImage,
                0,
                0,
                256,
                256,
                this.position.x + this.keyWidth / 6,
                this.position.y - this.keyWidth,
                this.keyWidth,
                this.keyWidth
                )
            if (keys.e.pressed) {
                player.weapon = weapons[wave]
                this.appear = false
            }
        }        
    }
    update() {
        if (this.appear == true) {
            this.draw()
        } else {
            if (this.frame.elapsed < 15)
            this.frame.elapsed++
            if (this.frame.elapsed % 3 == 0) {
                if (this.frame.value < 5) {
                    this.frame.value ++
                }
            }
            c.drawImage(dropoffImage,
                this.frame.value * 256,
                0,
                256,
                256,
                this.position.x,
                this.position.y,
                this.width,
                this.width)
        }
    }
}
class WaveShrine {
    constructor({position}) {
        this.position = position
        this.frame = {value: 0, elapsed: 0}
        this.appear = true
        this.lit = false
        this.width = 128
        this.frame = {value: 0, elapsed: 0}
        this.keyWidth = 96
    }
    draw() {
        const playerCenter = {
            x: player.position.x + Player.width / 2,
            y: player.position.y + Player.width / 2,
        }
        const dropoffCenter = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.width / 2,
        }
        if (this.appear) {
            if (!this.lit) {
                c.drawImage(waveShrineImage,
                    0,
                    0,
                    256,
                    256,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.width)
                if (Math.abs(playerCenter.x - dropoffCenter.x) < this.width / 2 &&
                    Math.abs(playerCenter.y - dropoffCenter.y) < this.width / 2) {
                    c.drawImage(eKeyStart,
                        0,
                        0,
                        256,
                        256,
                        this.position.x + this.keyWidth / 6,
                        this.position.y - this.keyWidth / 2,
                        this.keyWidth,
                        this.keyWidth
                    )
                    // START WAVE
                    if (keys.e.pressed) {
                        if (player.weapon != "none") {
                            this.lit = true
                            backgroundMusic.play()
                            spawnSlimes()
                            // END WAVE
                            setTimeout(() => {
                                this.lit = false
                                backgroundMusic.pause()
                                backgroundMusic.currentTime = 0
                            }, 1000 * waveLength[wave])
                        } else {
                            c.drawImage(youNeedWeapon,
                                0,
                                0,
                                256,
                                64,
                                this.position.x + this.width * 0.75,
                                this.position.y + this.width * 0.25,
                                this.width * 1.2,
                                this.width / 4 * 1.2
                                )
                        }
                    }
                }
            } else if (this.lit) {
                this.frame.elapsed++
                if (this.frame.elapsed % 9 == 0) {
                    if (this.frame.value < 3) {
                        this.frame.value++
                    } else {
                        this.frame.value = 0
                    }
                }
                c.drawImage(waveShrineFire,
                    this.frame.value * 256,
                    0,
                    256,
                    256,
                    this.position.x,
                    this.position.y,
                    this.width,
                    this.width)
            }
        }

    }
    update() {
        this.draw()
    }
}
class Player {
    static width = 90
    static widthShooting = 60.58
    static widthRunning = 55.38
    static height = 90
    static speed = 3
    constructor({position, velocity, weapon}) {
        this.position = position
        this.velocity = velocity
        this.image = playerImage
        this.imageLeft = playerImageLeft
        this.imageShootingRight = playerImageShootingRight
        this.imageShootingLeft = playerImageShootingLeft
        this.frame = {value: 0, elapsed : 0}
        this.weaponFrame = {value: 0, elapsed : 0}
        this.collidingSlime = false
        this.weapon = weapon
        this.hasBolt = false
    }
    draw() {
        if (playerFacingRight) {
            
            if (mouseDown) {
                if (this.weapon == "none") {
                    c.drawImage(playerImageShootingRight,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width)
                } else if (this.weapon == "ak47") {
                    c.drawImage(ak47Right,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                } else if (this.weapon == "glock") {
                    this.weaponFrame.elapsed++
                    c.drawImage(glockRight,
                        this.weaponFrame.value * 128,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                    if (this.weaponFrame.elapsed % 3 == 0) {
                        if (this.weaponFrame.value < 2) {
                            this.weaponFrame.value ++
                        } else {
                            this.weaponFrame.value = 0
                        }
                    }
                }
            } else if (!mouseDown) {
                if (this.weapon == "none") {
                    c.drawImage(playerTopRight,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width)
                } else if (this.weapon == "ak47") {
                    c.drawImage(ak47Right,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                } else if (this.weapon == "glock") {
                    this.weaponFrame.elapsed++
                    c.drawImage(glockRight,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                }
            }
            if (keys.w.pressed || keys.s.pressed|| keys.d.pressed) {
                this.frame.elapsed++
                c.drawImage(playerRunningRight,
                    this.frame.value * 128,
                    0,
                    128,
                    128,
                    this.position.x,
                    this.position.y,
                    Player.width,
                    Player.width)
                if (this.frame.elapsed % 3 == 0) {
                    if (this.frame.value < 5) {
                        this.frame.value ++
                    } else {
                        this.frame.value = 0
                    }
                }
            } else {
                c.drawImage(this.image,
                    0,
                    0,
                    128,
                    128,
                    this.position.x,
                    this.position.y,
                    Player.width,
                    Player.width)
            }
        } else if (!playerFacingRight) {
            if (mouseDown) {
                if (this.weapon == "none") {
                    c.drawImage(playerImageShootingLeft,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width)
                } else if (this.weapon == "ak47") {
                    c.drawImage(ak47Left,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                } else if (this.weapon == "glock") {
                    this.weaponFrame.elapsed++
                    c.drawImage(glockLeft,
                        256 - this.weaponFrame.value * 128,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                    if (this.weaponFrame.elapsed % 3 == 0) {
                        if (this.weaponFrame.value < 2) {
                            this.weaponFrame.value ++
                        } else {
                            this.weaponFrame.value = 0
                        }
                    }
                }
            } else if (!mouseDown) {
                if (this.weapon == "none") {
                    c.drawImage(playerTopLeft,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width)
                } else if (this.weapon == "ak47") {
                    c.drawImage(ak47Left,
                        0,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                } else if (this.weapon == "glock") {
                    c.drawImage(glockLeft,
                        256,
                        0,
                        128,
                        128,
                        this.position.x,
                        this.position.y,
                        Player.width,
                        Player.width
                        )
                }
            }
            if (keys.w.pressed || keys.s.pressed|| keys.a.pressed) {
                this.frame.elapsed++
                c.drawImage(playerRunningLeft,
                    640 - this.frame.value * 128,
                    0,
                    128,
                    128,
                    this.position.x,
                    this.position.y,
                    Player.width,
                    Player.width)
                if (this.frame.elapsed % 3 == 0) {
                    if (this.frame.value < 5) {
                        this.frame.value ++
                    } else {
                        this.frame.value = 0
                    }
                }
            } else {
                c.drawImage(this.imageLeft,
                    0,
                    0,
                    128,
                    128,
                    this.position.x,
                    this.position.y,
                    Player.width,
                    Player.width)
            }
        }
    }
    update() {
        this.draw()
        outOfBounds()
        mobs.forEach((slime) => {
            if (slime.mood == "none") {
                if (this.position.x + Player.width * 0.75 >= slime.position.x + slime.width * 0.25 &&
                    this.position.x + Player.width * 0.25 <= slime.position.x + slime.width * 0.75 &&
                    this.position.y + Player.height >= slime.position.y + slime.width * 0.75 &&
                    this.position.y + Player.width * 0.2 <= slime.position.y + slime.width)
                    {
                        this.collidingSlime = true
                    } else {
                        this.collidingSlime = false
                    }
            } else if (slime.mood == "angry") {
                if (this.position.x + Player.width * 0.75 >= slime.position.x + slime.width * 0.25 &&
                    this.position.x + Player.width * 0.25 <= slime.position.x + slime.width * 0.75 &&
                    this.position.y + Player.height >= slime.position.y + slime.width * 0.75 &&
                    this.position.y + Player.width * 0.2 <= slime.position.y + slime.width)
                    {
                        this.collidingSlime = true
                    } else {
                        this.collidingSlime = false
                    }
            }
            if (this.collidingSlime == true && !slime.shot && slime.mood == "none") {
                playerHealth -= 0.02
            }
            if (this.collidingSlime == true && !slime.shot && slime.mood == "angry") {
                playerHealth -= 0.1
            }
        })
    }
}
class Bolt {
    static speed = 8
    constructor({position}) {
        this.position = position
        this.radius = 15
        this.image = boltImage
        let boltSound = new Audio()
        boltSound.src = "audio/shoot sound 1.mp3"
        boltSound.load()
        boltSound.currentTime = 10.42
        boltSound.volume = 0.1
        boltSound.play()
        setTimeout(() => {
            boltSound.volume -= 0.05
        }, 1000 * 0.1)
        setTimeout(() => {
            boltSound.pause()
            boltSound.currentTime = 10.42
        }, 1000 * 0.4)
        lastBulletTimeLocation = Date.now()
        if (playerFacingRight) {
            this.spawnSide = -Player.width / 2.3
        } else if (!playerFacingRight) {
            this.spawnSide = Player.width / 2.3
        }
        const direction = {
            x: clientX - player.position.x - Player.width / 2 + this.spawnSide,
            y: clientY - player.position.y - Player.width / 2
        }
        let distance = Math.sqrt(direction.x ** 2 + direction.y ** 2)
        this.bulletDirectionX = (clientX - player.position.x - Player.width / 2 + this.spawnSide) / distance
        this.bulletDirectionY = (clientY - player.position.y - Player.width / 2) / distance
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x - this.spawnSide, this.position.y, 1, 0, Math.PI * 2)
        c.closePath()
        c.drawImage(boltImage,
            0,
            0,
            168,
            168,
            this.position.x - this.spawnSide - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2
            )
    }
    update() {
        this.draw()
        this.position.x += this.bulletDirectionX * Bolt.speed
        this.position.y += this.bulletDirectionY * Bolt.speed
    }
}
class Bullet {
    static glockBulletSpeed = 20
    constructor({position}) {
        this.position = position
        this.radius = {glockBullet: 2}
        lastBulletTimeLocation = Date.now()
        let bulletSound = new Audio()
        bulletSound.src = "audio/gun sound.mp3"
        bulletSound.load()
        bulletSound.currentTime = 1.12
        bulletSound.volume = 0.07
        bulletSound.play()
        this.counted = false
        setTimeout(() => {
            bulletSound.volume -= 0.03
        }, 1000 * 0.08)
        setTimeout(() => {
            bulletSound.pause()
        }, 1000 * 0.21)
        if (playerFacingRight) {
            this.spawnSide = -Player.width / 2.3
        } else if (!playerFacingRight) {
            this.spawnSide = Player.width / 2.3
        }
        const direction = {
            x: clientX - player.position.x - Player.width / 2 + this.spawnSide,
            y: clientY - player.position.y - Player.width / 2
        }
        let distance = Math.sqrt(direction.x ** 2 + direction.y ** 2)
        this.bulletDirectionX = (clientX - player.position.x - Player.width / 2 + this.spawnSide) / distance
        this.bulletDirectionY = (clientY - player.position.y - Player.width / 2) / distance
    }
    draw() {
        if (player.weapon == "glock") {
            if (playerFacingRight) {
                c.beginPath()
                c.fillStyle = "hsl(20, 100%, 40%)"
                c.arc(this.position.x - this.spawnSide, this.position.y - 2, this.radius.glockBullet, 0, Math.PI * 2)
                c.fill()
                c.closePath()
            } else if (!playerFacingRight) {
                c.beginPath()
                c.fillStyle = "hsl(40, 100%, 50%)"
                c.arc(this.position.x - this.spawnSide, this.position.y - 2, this.radius.glockBullet, 0, Math.PI * 2)
                c.fill()
                c.closePath()
            }
        } else if (player.weapon == "ak47") {
            if (playerFacingRight) {
                c.beginPath()
                c.fillStyle = "hsl(20, 100%, 0%)"
                c.arc(this.position.x - this.spawnSide, this.position.y + 11, this.radius.glockBullet, 0, Math.PI * 2)
                c.fill()
                c.closePath()
            } else if (!playerFacingRight) {
                c.beginPath()
                c.fillStyle = "hsl(20, 100%, 0%)"
                c.arc(this.position.x - this.spawnSide, this.position.y + 11, this.radius.glockBullet, 0, Math.PI * 2)
                c.fill()
                c.closePath()
            }
        }
    }
    update() {
        this.draw()
        this.position.x += this.bulletDirectionX * Bullet.glockBulletSpeed
        this.position.y += this.bulletDirectionY * Bullet.glockBulletSpeed
    }
}
class Slime {
    // slime dimensions 80 x 112 top: 176 left: 72
    static width = 64
    static speed = 2
    constructor({mood, position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.image = blueSlime
        this.timer = 0
        this.mood = mood
        this.shot = false
        this.width = 0
        this.height = 0
        if (this.mood == "none")
        this.health = 1
        if (this.mood == "angry")
        this.health = 2
    }
    draw() {
        if (this.mood == "none") {
            this.width = Slime.width
            c.drawImage(blueSlime,
                0,
                0,
                256,
                256,
                this.position.x,
                this.position.y,
                Slime.width,
                Slime.width)
        } else if (this.mood == "angry") {
            this.width = Slime.width * 2
            c.drawImage(blueSlimeAngry,
                0,
                0,
                256,
                256,
                this.position.x,
                this.position.y,
                this.width,
                this.width)
        }
    }
    update() {
        if (this.shot == false) {
            this.draw()
            this.timer++
            if (this.timer % 10 == 0) {
                if (this.mood == "none") {
                    if (this.position.x >= player.position.x) {
                        this.position.x -= Slime.speed
                    } else {
                        this.position.x += Slime.speed
                    }
                    if (this.position.y >= player.position.y) {
                        this.position.y -= Slime.speed
                    } else {
                        this.position.y += Slime.speed
                    }
                } else if (this.mood == "angry") {
                    if (this.position.x >= player.position.x - this.width / 4) {
                        this.position.x -= Slime.speed * 2
                    } else {
                        this.position.x += Slime.speed * 2
                    }
                    if (this.position.y >= player.position.y - this.width / 2) {
                        this.position.y -= Slime.speed * 2
                    } else {
                        this.position.y += Slime.speed * 2
                    }
                }
            }
        } else if (this.shot == true) {
            if (this.mood == "none") {
                c.drawImage(blueSlimeDead, // 194 x 142
                    0,
                    0,
                    256,
                    256,
                    this.position.x,
                    this.position.y,
                    Slime.width,
                    Slime.width
                )
            } else if (this.mood == "angry") {
                c.drawImage(blueSlimeDead, // 194 x 142
                    0,
                    0,
                    256,
                    256,
                    this.position.x,
                    this.position.y,
                    Slime.width * 2,
                    Slime.width * 2
                    )
            }
        }
        bulletsOnScreen.forEach((bullet) => {
            if (this.mood == "none" && !this.shot) {
                if (bullet.position.x + bullet.radius.glockBullet - bullet.spawnSide >= this.position.x + (72 * Slime.width / 256) &&
                bullet.position.x - bullet.radius.glockBullet - bullet.spawnSide <= this.position.x + Slime.width - (72 * Slime.width / 256) &&
                bullet.position.y + bullet.radius.glockBullet >= this.position.y + (176 * Slime.width / 256) &&
                bullet.position.y - bullet.radius.glockBullet <= this.position.y + Slime.width) {
                    if (!bullet.counted) {
                        this.health--
                        bullet.counted = true
                    }
                    if (this.health < 1) {
                        this.shot = true
                    }
                }
            } else if (this.mood == "angry" && !this.shot) {
                if (bullet.position.x + bullet.radius.glockBullet - bullet.spawnSide >= this.position.x + (72 * 2 * Slime.width / 256)&&
                bullet.position.x - bullet.radius.glockBullet - bullet.spawnSide <= this.position.x + 2 * Slime.width - (72 * 2 * Slime.width / 256) &&
                bullet.position.y + bullet.radius.glockBullet >= this.position.y + (176 * 2 * Slime.width / 256) &&
                bullet.position.y - bullet.radius.glockBullet <= this.position.y + Slime.width * 2) {
                    if (!bullet.counted) {
                        this.health--
                        bullet.counted = true
                    }
                    if (this.health < 1) {
                        this.shot = true
                    } else if (this.health <= 1) {
                        c.drawImage(blueSlimeDamage,
                            0,
                            0,
                            256,
                            256,
                            this.position.x,
                            this.position.y,
                            this.width,
                            this.width
                            )
                    }
                }
            }
        })
        bulletsOnScreen.forEach((bolt) => {
            if (this.mood == "none") {
                if (bolt.position.x + bolt.radius - bolt.spawnSide >= this.position.x + (72 * Slime.width / 256) &&
                bolt.position.x - bolt.radius - bolt.spawnSide <= this.position.x + Slime.width - (72 * Slime.width / 256) &&
                bolt.position.y + bolt.radius >= this.position.y + (176 * Slime.width / 256) &&
                bolt.position.y - bolt.radius <= this.position.y + Slime.width) {
                    this.shot = true
                }
            } else if (this.mood == "angry") {
                if (bolt.position.x + bolt.radius - bolt.spawnSide >= this.position.x + (72 * 2 * Slime.width / 256)&&
                bolt.position.x - bolt.radius - bolt.spawnSide <= this.position.x + 2 * Slime.width - (72 * 2 * Slime.width / 256)&&
                bolt.position.y + bolt.radius >= this.position.y + (176 * 2 * Slime.width / 256)&&
                bolt.position.y - bolt.radius <= this.position.y + Slime.width * 2) {
                    this.shot = true
                }
            }
        })
    }
    playDeathSound() {
        const oliverDeathSound = new Audio()
        oliverDeathSound.src = "audio/oliver slime death.mp3"
        oliverDeathSound.load()
        oliverDeathSound.currentTime = 0.7
        oliverDeathSound.volume = 0.5
        oliverDeathSound.playbackRate = 10
        oliverDeathSound.play()
    }
}

// PLAYER

const player = new Player({
    position: {
        x: 600,
        y: 288
    },
    velocity: {
        x: 0,
        y: 0
    },
    weapon: "none"
})

// PUT MAP BLOCKS INTO ARRAYS

grassMap.forEach((row, i) => {
    row.forEach((char, j) => {
        switch(char) {
            case 0:
                grasses.push(
                    new Grass({
                        type: "grass",
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
            case 2:
                grasses.push(
                    new Grass({
                        type: "grassBright",
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
        }
    })
})
treeMap.forEach((row, i) => {
    row.forEach((char, j) => {
        switch(char) {
            case 1:
                trees.push(
                    new Tree({
                        type: "tree",
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
            case 3:
                grasses.push(
                    new Tree({
                        type: "bush",
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
            case 4:
                grasses.push(
                    new Tree({
                        type: "qualm",
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
        }
    })
})
visualObjectMap.forEach((row, i) => {
    row.forEach((char, j) => {
        switch(char) {
            case 1:
                visualObjects.push(
                    new House({
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
            case 2:
                visualObjects.push(
                    new Dropoff({
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
            case 3:
                visualObjects.push(
                    new WaveShrine({
                        position: {
                            x: j * blockSize,
                            y: i * blockSize
                        }
                    })
                )
                break;
        }
    })
})

// WAVE