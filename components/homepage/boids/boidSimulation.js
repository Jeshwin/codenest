const boidSize = 6

const boidRadius = 64
const minVelocity = 3
const maxVelocity = 6

const separationStrength = 1.1
const alignmentStrength = 0.9
const cohesionStrength = 1

const repelRadius = 96
const repelStrength = 8

export class Vec2D {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }

    set(x, y) {
        this.x = x
        this.y = y
    }

    clone() {
        return new Vec2D(this.x, this.y)
    }

    to_string() {
        return `< ${this.x} , ${this.y} >`
    }

    static randomVector(l) {
        const angle = Math.random() * 2 * Math.PI
        return new Vec2D(l * Math.cos(angle), l * Math.sin(angle))
    }

    static distanceVec(v1, v2) {
        return new Vec2D(v2.x - v1.x, v2.y - v1.y)
    }

    add(value) {
        if (typeof value === "number") {
            this.x += value
            this.y += value
        } else if (value instanceof Vec2D) {
            this.x += value.x
            this.y += value.y
        } else {
            console.error("Invalid type for 'add' operation")
        }
    }

    sub(value) {
        if (typeof value === "number") {
            this.x -= value
            this.y -= value
        } else if (value instanceof Vec2D) {
            this.x -= value.x
            this.y -= value.y
        } else {
            console.error("Invalid type for 'add' operation")
        }
    }

    mult(n) {
        this.x *= n
        this.y *= n
    }

    div(n) {
        this.x /= n
        this.y /= n
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalize() {
        this.div(this.magnitude())
    }

    setMagnitude(n) {
        this.normalize()
        this.mult(n)
    }

    clamp(minMagnitude, maxMagnitude) {
        const currentMagnitude = this.magnitude()
        if (currentMagnitude < minMagnitude) {
            this.normalize()
            this.mult(minMagnitude)
        } else if (currentMagnitude > maxMagnitude) {
            this.normalize()
            this.mult(maxMagnitude)
        }
    }

    makeToroidal(canvas) {
        if (this.x < 0) {
            this.x = canvas.width
        } else if (this.x > canvas.width) {
            this.x = 0
        }
        if (this.y < 0) {
            this.y = canvas.height
        } else if (this.y > canvas.height) {
            this.y = 0
        }
    }
}

function getRandomColor() {
    const colors = [
        "red",
        "green",
        "yellow",
        "blue",
        "magenta",
        "cyan",
        "white",
    ]

    const isBlack = Math.random() < 0.75
    if (isBlack) {
        return getComputedStyle(document.documentElement).getPropertyValue(
            "--term-black"
        )
    }

    const randomIndex = Math.floor(Math.random() * (colors.length - 1))
    return getComputedStyle(document.documentElement).getPropertyValue(
        `--term-${colors[randomIndex]}`
    )
}

export class Boid {
    static nextId = 0

    constructor(x, y) {
        this.position = new Vec2D(x, y)
        const randomAngle = Math.random() * 2 * Math.PI
        this.velocity = new Vec2D(
            maxVelocity * Math.cos(randomAngle),
            maxVelocity * Math.sin(randomAngle)
        )
        this.acceleration = new Vec2D()
        this.color = getRandomColor()
        this.id = Boid.nextId++
    }

    calculateSeparation(boids) {
        let separationForce = new Vec2D()
        let total = 0
        for (let other of boids) {
            let d = Vec2D.distanceVec(this.position, other.position).magnitude()
            if (this != other && d < boidRadius) {
                let currDistance = Vec2D.distanceVec(
                    other.position,
                    this.position
                )
                currDistance.normalize()
                currDistance.div(d)
                separationForce.add(currDistance)
                total++
            }
        }
        if (total != 0) {
            // Get average direction
            separationForce.div(total)
            // Set magnitude to max velocity
            separationForce.setMagnitude(maxVelocity)
            // Get difference from current velocity
            separationForce.sub(this.velocity)
            // Clamp maximum force
            separationForce.clamp(0, 0.5)
        }
        return separationForce
    }

    calculateAlignment(boids) {
        let alignmentForce = new Vec2D()
        let total = 0
        for (let other of boids) {
            const d = Vec2D.distanceVec(
                this.position,
                other.position
            ).magnitude()
            if (this != other && d < boidRadius) {
                alignmentForce.add(other.velocity)
                total++
            }
        }
        if (total != 0) {
            // Get average direction
            alignmentForce.div(total)
            // Set magnitude to max velocity
            alignmentForce.setMagnitude(maxVelocity)
            // Get difference from current velocity
            alignmentForce.sub(this.velocity)
            // Clamp maximum force
            alignmentForce.clamp(0, 0.5)
        }
        return alignmentForce
    }

    calculateCohesion(boids) {
        let cohesionForce = new Vec2D()
        let total = 0
        for (let other of boids) {
            const d = Vec2D.distanceVec(
                this.position,
                other.position
            ).magnitude()
            if (this != other && d < boidRadius) {
                cohesionForce.add(other.position)
                total++
            }
        }
        if (total != 0) {
            // Get average direction
            cohesionForce.div(total)
            // Get difference in position
            cohesionForce.sub(this.position)
            // Set magnitude to max velocity
            cohesionForce.setMagnitude(maxVelocity)
            // Get difference from current velocity
            cohesionForce.sub(this.velocity)
            // Clamp maximum force
            cohesionForce.clamp(0, 0.5)
        }
        return cohesionForce
    }

    calculateMouseForce(mousePos) {
        const mouseForce = Vec2D.distanceVec(mousePos, this.position)
        const mouseDistance = mouseForce.magnitude()
        if (mouseDistance < repelRadius) {
            mouseForce.normalize()
            mouseForce.div(mouseDistance)
            mouseForce.setMagnitude(maxVelocity)
            mouseForce.sub(this.velocity)
            mouseForce.clamp(0, 0.5)
            return mouseForce
        }
        return new Vec2D()
    }

    makeToroidal(canvas) {
        this.position.makeToroidal(canvas)
    }

    updateAcceleration(boids, mousePos) {
        this.acceleration.set(0, 0)
        // Do boid calculations
        let separation = this.calculateSeparation(boids)
        let alignment = this.calculateAlignment(boids)
        let cohesion = this.calculateCohesion(boids)
        // Multiply by strength
        separation.mult(separationStrength)
        alignment.mult(alignmentStrength)
        cohesion.mult(cohesionStrength)
        // Update acceleration
        this.acceleration.add(separation)
        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        // Mouse interaction
        let mouseForce = this.calculateMouseForce(mousePos)
        mouseForce.mult(repelStrength)
        this.acceleration.add(mouseForce)
    }

    updatePosition() {
        // Update velocity
        this.velocity.add(this.acceleration)
        // Clamp velocity
        this.velocity.clamp(minVelocity, maxVelocity)
        // Update position
        this.position.add(this.velocity)
    }

    draw(ctx) {
        ctx.save()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(Math.atan2(this.velocity.y, this.velocity.x) + Math.PI / 2)

        ctx.beginPath()
        ctx.moveTo(0, -boidSize)
        ctx.lineTo(boidSize, boidSize)
        ctx.moveTo(0, -boidSize)
        ctx.lineTo(-boidSize, boidSize)

        ctx.strokeStyle = this.color
        ctx.lineWidth = boidSize / 2
        ctx.lineCap = "round"
        ctx.stroke()

        ctx.restore()
    }
}
