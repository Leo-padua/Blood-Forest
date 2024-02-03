

function animate() {
    c.clearRect(0, 0, innerWidth, innerHeight)
    // BACKGROUND
    grasses.forEach((grass) => {
        grass.draw()
    })
    visualObjects.forEach((house) => {
        house.draw()
    })
    mobs.forEach((slime) => {
        slime.update()
    })
    player.update()
    trees.forEach((tree) => {
        tree.draw()
    })
    //MOBS
    if (mobs.length > maxMobs) {
        mobs.shift()
    }
    // PLAYER
    movePlayer()
    // BOLTS
    boltsOnScreen.forEach((bolt) => {
        bolt.update()
    })
    requestAnimationFrame(animate)
} animate()