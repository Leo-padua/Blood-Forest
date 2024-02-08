

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight)
    // BACKGROUND
    if (canvas.width != innerWidth || canvas.height != innerHeight) {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    grasses.forEach((x) => {
        x.draw()
    })
    visualObjects.forEach((x) => {
        x.update()
    })
    trees.forEach((x) => {
        x.draw()
    })
    //MOBS
    if (mobs.length > maxMobs) {
        mobs.shift()
    }
    mobs.forEach((i) => {
        i.update()
        // DEAD MOBS
        if (i.shot && !i.counted) {
            slimesKilled++
            i.counted = true
            i.playDeathSound()
        }
    })
    killCountNumber.innerText = slimesKilled
    // PLAYER
    player.update()
    movePlayer()
    c.fillStyle = "black"
    c.fillRect(innerWidth * 0.25, 10, innerWidth * 0.5, 10)
    for (let i = 0; i < playerHealth; i++) {
    let x = i * playerHealthPixelWidth
    c.fillStyle = "hsl(0, 100%, 40%)"
    c.fillRect(x + innerWidth * 0.25, 10, playerHealthPixelWidth, 10)
    }
    // BULLETS
    bulletsOnScreen.forEach((i) => {
        i.update()
        lastBulletTime = lastBulletTimeLocation
    })
    if (bulletsOnScreen.length > 100) {
        bulletsOnScreen.shift()
    }
    // GAME OVER
    if (playerHealth <= 0) {
        endScreen.style.display = "flex"
    }
    requestAnimationFrame(animate)
} animate()