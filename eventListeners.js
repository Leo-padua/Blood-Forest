
let boltInterval
let bulletInterval


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
        case "e":
            keys.e.pressed = true
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
        case "e":
            keys.e.pressed = false
            break;
    }
})

addEventListener("mousedown", (e) => {
    if (e.which == "1") {
        mouseDown = true
    }
    clientX = e.clientX
    clientY = e.clientY
    // SHOOT
    shootBullet()
    shootBolt()
})

addEventListener("mousemove", (e) => {
    clientX = e.clientX
    clientY = e.clientY
})

addEventListener("mouseup", (e) => {
    if (e.which == "1") {
        mouseDown = false
    }
    clearInterval(boltInterval)
    clearInterval(bulletInterval)
})

addEventListener("contextmenu", (e) => {
    e.preventDefault()
})