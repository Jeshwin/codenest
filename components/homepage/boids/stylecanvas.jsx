import React, { useRef, useEffect, useState } from "react"

const StyleCanvas = () => {
    const canvasRef = useRef(null)
    const numCircles = 10
    const [canvasSize, setCanvasSize] = useState({ width: 1920, height: 1080 })

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const circleRadiusRange = [200, 300] // Range for circle radius and path radius
        const circleSpeedRange = [0.001, 0.003] // Range for circle speed
        const centerPoints = [] // Array to store center points for each circle
        const circles = []

        // Define your color palette
        const colorPalette = [
            "#9a8ef580",
            "#d3cff280",
            "#78c9d380",
            "#160a7180",
            "#110d3080",
            "#2c7c8780",
        ]

        // Function to select a random color from the palette
        const randomColor = () => {
            const randomIndex = Math.floor(Math.random() * colorPalette.length)
            return colorPalette[randomIndex]
        }

        // Function to create a circle object
        const createCircle = (isCenterCircle = false) => {
            let centerX, centerY
            if (isCenterCircle) {
                centerX = canvas.width / 2
                centerY = canvas.height / 2
            } else {
                centerX = Math.random() * canvas.width
                centerY = Math.random() * canvas.height
            }

            return {
                angle: Math.random() * Math.PI * 2, // Initial angle
                radius:
                    Math.random() *
                        (circleRadiusRange[1] - circleRadiusRange[0]) +
                    circleRadiusRange[0],
                color: randomColor(),
                speed:
                    Math.random() *
                        (circleSpeedRange[1] - circleSpeedRange[0]) +
                    circleSpeedRange[0],
                centerIndex: isCenterCircle
                    ? -1
                    : Math.floor(Math.random() * centerPoints.length),
                centerX,
                centerY,
            }
        }

        // Initialize center points
        for (let i = 0; i < numCircles; i++) {
            centerPoints.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
            })
        }

        // Initialize circles
        for (let i = 0; i < numCircles; i++) {
            circles.push(createCircle())
        }

        // Manually add a circle revolving around the center
        circles.push(createCircle(true))

        // Function to draw a circle
        const drawCircle = (circle) => {
            let x, y
            if (circle.centerIndex === -1) {
                x = circle.centerX + Math.cos(circle.angle) * circle.radius * 2
                y = circle.centerY + Math.sin(circle.angle) * circle.radius * 2
            } else {
                const centerX = centerPoints[circle.centerIndex].x
                const centerY = centerPoints[circle.centerIndex].y
                x = centerX + Math.cos(circle.angle) * circle.radius
                y = centerY + Math.sin(circle.angle) * circle.radius
            }

            ctx.beginPath()
            ctx.arc(x, y, circle.radius, 0, Math.PI * 2)
            ctx.fillStyle = circle.color
            ctx.fill()
        }

        // Function to update circle positions
        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            circles.forEach((circle) => {
                circle.angle += circle.speed

                drawCircle(circle)
            })

            requestAnimationFrame(update)
        }

        update()

        // Cleanup function
        return () => cancelAnimationFrame(update)
    }, [])

    // Function to update canvas size based on parent container size
    const updateCanvasSize = () => {
        const parent = canvasRef.current.parentElement
        setCanvasSize({
            width: parent.offsetWidth,
            height: parent.offsetHeight,
        })
    }

    useEffect(() => {
        // Update canvas size when the window is resized
        window.addEventListener("resize", updateCanvasSize)
        updateCanvasSize() // Initial update
        return () => window.removeEventListener("resize", updateCanvasSize)
    }, [])

    return (
        <canvas
            className="w-full h-screen mt-10 bg-transparent blur-3xl"
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
        />
    )
}

export default StyleCanvas
