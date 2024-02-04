
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const blockSize = 64
const endScreen = document.getElementById("endScreen")


// LET VARIABLES
let playerFacingRight = true;
let mouseDown = false;
let lastBoltTime = 0;
let lastBoltTimeLocation = 0;
let clientX;
let clientY;
let playerHealth = 100;
let playerDamageInterval;
let slimeIntervalMultiplier = 1;
const playerHealthPixelWidth = innerWidth / playerHealth / 2;

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
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
const visualObjectMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const trees = []
const grasses = []
const visualObjects = []
const boltsOnScreen = []
const mobs = []
const maxMobs = 150

// IMAGES

const grassImage = new Image()
grassImage.src = "Images/grass-default.png"
const grassImageBright = new Image()
grassImageBright.src = "Images/grass-bright.png"
const treeImage = new Image()
treeImage.src = "Images/tree.png"
const playerImage = new Image()
playerImage.src = "Images/player.png"
const playerImageLeft = new Image()
playerImageLeft.src = "Images/player facing left.png"
const playerImageShootingRight = new Image()
playerImageShootingRight.src = "Images/player shooting right.png"
const playerImageShootingLeft = new Image()
playerImageShootingLeft.src = "Images/player shooting left.png"
const playerRunningRight = new Image()
playerRunningRight.src = "Images/player running right.png"
const playerRunningLeft = new Image()
playerRunningLeft.src = "Images/player running left.png"
const blueSlime = new Image()
blueSlime.src = "Images/Blue Slime.png"
const blueSlimeAngry = new Image()
blueSlimeAngry.src = "Images/Blue Slime red eyes.png"
const blueSlimeDead = new Image()
blueSlimeDead.src = "Images/Blue Slime dead.png"
const houseImage = new Image()
houseImage.src = "Images/red house.png"
const boltImage = new Image()
boltImage.src = "Images/boltImage.png"

// AUDIO


const backgroundMusic = new Audio()
backgroundMusic.src = "audio/bloodForestBeat.mp3"
backgroundMusic.load()
backgroundMusic.volume = 0.5
const oliverDeathSound = new Audio()
oliverDeathSound.src = "audio/oliver slime death.mp3"
oliverDeathSound.load()
oliverDeathSound.currentTime = 0.5
oliverDeathSound.volume = 0.5

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
    constructor({position}) {
        this.position = position
        this.image = treeImage
    }
    draw() {        
        c.drawImage(this.image,
            0,
            0,
            128,
            128,
            this.position.x - Tree.width / 4,
            this.position.y - Tree.width / 2,
            Tree.width,
            Tree.width)
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
}
class Player {
    static width = 45
    static widthShooting = 60.58
    static widthRunning = 55.38
    static height = 90
    static speed = 3
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
        this.image = playerImage
        this.imageLeft = playerImageLeft
        this.imageShootingRight = playerImageShootingRight
        this.imageShootingLeft = playerImageShootingLeft
        this.frame = {value: 0, elapsed : 0}
        this.collidingSlime = false
    }
    draw() {
        if (playerFacingRight) {
            if (mouseDown) {
                c.drawImage(this.imageShootingRight, this.position.x, this.position.y, Player.widthShooting, Player.height)
            }
            if (keys.w.pressed || keys.s.pressed|| keys.d.pressed) {
                this.frame.elapsed++
                c.drawImage(playerRunningRight,
                    this.frame.value * 64,
                    0,
                    64,
                    104,
                    this.position.x - 4,
                    this.position.y,
                    Player.widthRunning,
                    Player.height)
                if (this.frame.elapsed % 3 == 0) {
                    if (this.frame.value < 5) {
                        this.frame.value ++
                    } else {
                        this.frame.value = 0
                    }
                }
            } else if (!mouseDown) {
                c.drawImage(this.image, this.position.x, this.position.y, Player.width, Player.height)
            }
        }
        if (!playerFacingRight) {
            if (mouseDown) {
                c.drawImage(this.imageShootingLeft, this.position.x - (Player.widthShooting - Player.width), this.position.y, Player.widthShooting, Player.height)
            }
            if (keys.w.pressed || keys.s.pressed|| keys.a.pressed) {
                this.frame.elapsed++
                c.drawImage(playerRunningLeft,
                    320 - this.frame.value * 64,
                    0,
                    64,
                    104,
                    this.position.x - 8,
                    this.position.y,
                    Player.widthRunning,
                    Player.height)
                if (this.frame.elapsed % 3 == 0) {
                    if (this.frame.value < 5) {
                        this.frame.value ++
                    } else {
                        this.frame.value = 0
                    }
                }
            } else if (!mouseDown) {
                c.drawImage(this.imageLeft, this.position.x, this.position.y, Player.width, Player.height)
            }
        }
    }
    update() {
        this.draw()
        outOfBounds()
        mobs.forEach((slime) => {
            if (slime.mood == "none") {
                if (this.position.x >= slime.position.x - slime.width * 2 &&
                    this.position.x <= slime.position.x + slime.width / 2 &&
                    this.position.y + Player.height >= slime.position.y - slime.height / 2 &&
                    this.position.y <= slime.position.y + slime.height / 2)
                    {
                        this.collidingSlime = true
                    } else {
                        this.collidingSlime = false
                    }
            } else if (slime.mood == "angry") {
                if (this.position.x + Player.width >= slime.position.x - slime.width / 4 &&
                this.position.x <= slime.position.x + slime.width / 1.3 &&
                this.position.y + Player.height >= slime.position.y - slime.height / 4 &&
                this.position.y <= slime.position.y + slime.height / 1.5)
                    {
                        this.collidingSlime = true
                    } else {
                        this.collidingSlime = false
                    }
            }
            if (this.collidingSlime == true && !slime.shot && slime.mood == "none") {
                playerHealth -= 0.05
            }
            if (this.collidingSlime == true && !slime.shot && slime.mood == "angry") {
                playerHealth -= 0.1
            }
        })
    }
}
class Bolt {
    static speed = 15
    constructor({position, velocity}) {
        this.position = position
        this.velocity = velocity
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
        lastBoltTimeLocation = Date.now()
    }
    draw() {
        c.beginPath()
        c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        c.fillStyle = "hsl(220, 100%, 60%)"
        c.fill()
        c.closePath()
        c.drawImage(boltImage,
            0,
            0,
            168,
            168,
            this.position.x - this.radius,
            this.position.y - this.radius,
            this.radius * 2,
            this.radius * 2
            )
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}
class Slime {
    // image dimensions 80 x 112
    static width = 32
    static height = 22.86
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
    }
    draw() {
        if (this.mood == "none") {
            this.width = Slime.width
            this.height = Slime.height
            c.drawImage(blueSlime,
                0,
                0,
                112,
                80,
                this.position.x - Slime.width / 2,
                this.position.y - Slime.height / 2,
                this.width,
                this.height)
        } else if (this.mood == "angry") {
            this.width = Slime.width * 2
            this.height = Slime.height * 2
            c.drawImage(blueSlimeAngry,
                0,
                0,
                112,
                80,
                this.position.x - Slime.width / 2,
                this.position.y - Slime.height / 2,
                this.width,
                this.height)
        }
    }
    update() {
        if (this.shot == false) {
            this.draw()
            this.timer++
            if (this.timer % 10 == 0) {
                if (this.mood == "none") {
                    if (this.position.x > player.position.x + Player.width / 2) {
                        this.position.x -= Slime.speed
                    } else {
                        this.position.x += Slime.speed
                    }
                    if (this.position.y > player.position.y + Player.height / 2) {
                        this.position.y -= Slime.speed
                    } else {
                        this.position.y += Slime.speed
                    }
                } else if (this.mood == "angry") {
                    if (this.position.x > player.position.x + Player.width / 2) {
                        this.position.x -= Slime.speed * 2
                    } else {
                        this.position.x += Slime.speed * 2
                    }
                    if (this.position.y > player.position.y + Player.height / 2) {
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
                    194,
                    142,
                    this.position.x - Slime.width * 0.95,
                    this.position.y - Slime.height * 1.4,
                    Slime.width * 2,
                    Slime.height * 2
                )
            } else if (this.mood == "angry") {
                c.drawImage(blueSlimeDead, // 194 x 142
                    0,
                    0,
                    194,
                    142,
                    this.position.x - Slime.width * 1.45,
                    this.position.y - Slime.height * 2.4,
                    Slime.width * 4,
                    Slime.height * 4
                    )
            }
        }
        boltsOnScreen.forEach((bolt) => {
            if (this.mood == "none") {
                if (bolt.position.x + bolt.radius >= this.position.x - Slime.width / 2 &&
                bolt.position.x - bolt.radius <= this.position.x + Slime.width  - Slime.width / 2 &&
                bolt.position.y + bolt.radius >= this.position.y - Slime.height / 2 &&
                bolt.position.y - bolt.radius <= this.position.y + Slime.height - Slime.height / 2) {
                    this.shot = true
                }
            } else if (this.mood == "angry") {
                if (bolt.position.x + bolt.radius >= this.position.x - Slime.width / 2 &&
                bolt.position.x - bolt.radius <= this.position.x + Slime.width * 1.5 &&
                bolt.position.y + bolt.radius >= this.position.y - Slime.height / 2 &&
                bolt.position.y - bolt.radius <= this.position.y + Slime.height * 1.5) {
                    this.shot = true
                }
            }
        })
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
    }
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
            
        }
    })
})

// CREATE SLIMES

setInterval(() => {
    slimeIntervalMultiplier += 0.07
    Slime.speed += 0.1
    spawnSlimes()
}, 1000 * 10)


