"use client"

import { useEffect, useRef } from "react"
import { Vec2D, Boid } from "./boidSimulation"

export default function BoidBackground() {
    const canvasRef = useRef(null)
    const boids = useRef([])
    const mousePos = useRef(new Vec2D())

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        const createBoids = () => {
            for (let i = 0; i < 128; i++) {
                const x = Math.random() * canvas.width
                const y = Math.random() * canvas.height
                boids.current.push(new Boid(x, y))
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            for (const boid of boids.current) {
                boid.makeToroidal(canvas)
                boid.updateAcceleration(boids.current, mousePos.current)
            }

            for (const boid of boids.current) {
                boid.updatePosition()
                boid.draw(ctx)
            }

            requestAnimationFrame(animate)
        }

        const handleMouseMove = (event) => {
            const rect = canvas.getBoundingClientRect()
            mousePos.current.set(
                event.clientX - rect.left,
                event.clientY - rect.top
            )
        }

        window.addEventListener("resize", resizeCanvas)
        canvas.addEventListener("mousemove", handleMouseMove)

        resizeCanvas()
        createBoids()
        animate()

        return () => {
            window.removeEventListener("resize", resizeCanvas)
            canvas.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    return <canvas width={100} height={100} ref={canvasRef} />
}
