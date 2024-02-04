
let boltInterval


addEventListener("keydown", (e) => {
    switch(e.key) {
        case "0":
            location.reload()
            break;
        case "w":
            keys.w.pressed = true
            lastKey = "w"
            break;
        case "a":
            keys.a.pressed = true
            lastKey = "a"
            break;
        case "s":
            keys.s.pressed = true
            lastKey = "s"
            break;
        case "d":
            keys.d.pressed = true
            lastKey = "d"
            break;
        
    }
})

addEventListener("keyup", (e) => {
    switch(e.key) {
        case "0":
            location.reload()
            break;
        case "w":
            keys.w.pressed = false
            lastKey = "w"
            break;
        case "a":
            keys.a.pressed = false
            lastKey = "a"
            break;
        case "s":
            keys.s.pressed = false
            lastKey = "s"
            break;
        case "d":
            keys.d.pressed = false
            lastKey = "d"
            break;
        
    }
})

addEventListener("mousedown", (e) => {
    mouseDown = true
    // SHOOT
    let direction = {
        x: clientX - player.position.x - Player.width / 2,
        y: clientY - player.position.y - Player.height / 2
    }
    let distance = Math.sqrt(direction.x ** 2 + direction.y ** 2)
    let boltDirection = {
        x: direction.x / distance,
        y: direction.y / distance
    }
    boltsOnScreen.push(new Bolt({
        position: {
            x: player.position.x + Player.width / 2,
            y: player.position.y + Player.height / 2
        },
        velocity: {
            x: boltDirection.x * Bolt.speed,
            y: boltDirection.y * Bolt.speed
        }
        }))
    boltInterval = setInterval(() => {
        let direction = {
            x: clientX - player.position.x - Player.width / 2,
            y: clientY - player.position.y - Player.height / 2
        }
        let distance = Math.sqrt(direction.x ** 2 + direction.y ** 2)
    
        let boltDirection = {
            x: direction.x / distance,
            y: direction.y / distance
        }
        boltsOnScreen.push(new Bolt({
            position: {
                x: player.position.x + Player.width / 2,
                y: player.position.y + Player.height / 2
            },
            velocity: {
                x: boltDirection.x * Bolt.speed,
                y: boltDirection.y * Bolt.speed
            }
        }))
    }, 1000 * 0.2)
})

addEventListener("mousemove", (e) => {
    clientX = e.clientX
    clientY = e.clientY
})

addEventListener("mouseup", (e) => {
    mouseDown = false
    clearInterval(boltInterval)
})