

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