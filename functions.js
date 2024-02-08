let littleSlimeInterval
let bigSlimeInterval

function drawScene() {
    grasses.forEach((grass) => {
        grass.draw()
    })
    trees.forEach((tree) => {
        tree.draw()
    })
}

function movePlayer() {
    if (!keys.w.pressed && !keys.s.pressed) {
        player.velocity.y = 0
    }
    if (!keys.a.pressed && !keys.d.pressed) {
        player.velocity.x = 0
    }
    if (keys.w.pressed && !keys.s.pressed) {
        player.velocity.y = -Player.speed
    } else if (keys.s.pressed && !keys.w.pressed) {
        player.velocity.y = Player.speed
    } else if (keys.w.pressed && keys.s.pressed) {
        if (lastKey != "s") {
            player.velocity.y = -Player.speed
        } else if (lastKey != "w") {
            player.velocity.y = Player.speed
        }
    }
    if (keys.a.pressed && !keys.d.pressed) {
        player.velocity.x = -Player.speed
    } else if (keys.d.pressed && !keys.a.pressed) {
        player.velocity.x = Player.speed
    } else if (keys.a.pressed && keys.d.pressed) {
        if (lastKey != "d") {
            player.velocity.x = -Player.speed
        } else if (lastKey != "a") {
            player.velocity.x = Player.speed
        }
    }
    if (player.velocity.x > 0) {
        playerFacingRight = true
    }
    if (player.velocity.x < 0) {
        playerFacingRight = false
    }
}

function outOfBounds() {
    if (player.velocity.x < 0) {
        if (player.position.x - player.velocity.x > 0) {
            player.position.x += player.velocity.x
        }
    } else if (player.velocity.x > 0) {
        if (player.position.x + player.velocity.x + Player.width < innerWidth) {
            player.position.x += player.velocity.x
        }
    }
    if (player.velocity.y < 0) {
        if (player.position.y - player.velocity.y > 0) {
            player.position.y += player.velocity.y
        }
    } else if (player.velocity.y > 0) {
        if (player.position.y + player.velocity.y + Player.height < innerHeight) {
            player.position.y += player.velocity.y
        }
    }
}

function spawnSlimes() {
    littleSlimeInterval = setInterval(() => {
        mobs.push(new Slime({
            mood: "none",
            position: {
                x: Math.random() * innerWidth,
                y: Math.random() * innerHeight
            },
            velocity: {
                x: 0,
                y: 0
            }
        }))
    }, 1000 * (3 / slimeIntervalMultiplier))
    bigSlimeInterval = setInterval(() => {
        mobs.push(new Slime({
            mood: "angry",
            position: {
                x: Math.random() * innerWidth,
                y: Math.random() * innerHeight
            },
            velocity: {
                x: 0,
                y: 0
            }
        }))
    }, 1000 * (5 / slimeIntervalMultiplier))
    setTimeout(() => {
        clearInterval(littleSlimeInterval)
        clearInterval(bigSlimeInterval)
    }, 1000 * waveLength[wave])
}

function shootBolt() {
    if (mouseDown && player.hasBolt && Date.now() - lastBulletTime > 500) {
        bulletsOnScreen.push(new Bolt({
            position: {
                x: player.position.x + Player.width / 2,
                y: player.position.y + Player.height / 2
            }
            }))
        boltInterval = setInterval(() => {
            bulletsOnScreen.push(new Bolt({
                position: {
                    x: player.position.x + Player.width / 2,
                    y: player.position.y + Player.height / 2
                }
            }))
        }, 1000 * 0.5)
    }
}

function shootBullet() {
    if (mouseDown && player.weapon != "none") {
        bulletsOnScreen.push(new Bullet({
            position: {
                x: player.position.x + Player.width / 2,
                y: player.position.y + Player.height / 2
            }
            }))
        bulletInterval = setInterval(() => {
            bulletsOnScreen.push(new Bullet({
                position: {
                    x: player.position.x + Player.width / 2,
                    y: player.position.y + Player.height / 2
                }
            }))
        }, 1000 * 0.17)
    }
}