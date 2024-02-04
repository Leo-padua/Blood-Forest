

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight)
    // BACKGROUND
    if (canvas.width != innerWidth || canvas.height != innerHeight) {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    grasses.forEach((grass) => {
        grass.draw()
    })
    visualObjects.forEach((house) => {
        house.draw()
    })
    trees.forEach((tree) => {
        tree.draw()
    })
    //MOBS
    if (mobs.length > maxMobs) {
        mobs.shift()
    }
    mobs.forEach((slime) => {
        slime.update()
        if (slime.shot && !slime.counted) {
            slimesKilled++
            slime.counted = true
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
    // BOLTS
    boltsOnScreen.forEach((bolt) => {
        bolt.update()
        lastBoltTime = lastBoltTimeLocation
    })
    // GAME OVER
    if (playerHealth <= 0) {
        endScreen.style.display = "flex"
    }
    requestAnimationFrame(animate)
} animate()