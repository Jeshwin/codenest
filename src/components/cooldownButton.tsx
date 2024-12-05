import React, {useState, useEffect} from "react";
import {Button} from "./ui/button";

export default function CooldownButton({onClick, variant, children}) {
    const cooldownTime = 60; // Cooldown time in seconds
    const [isDisabled, setIsDisabled] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(0);

    useEffect(() => {
        const storedCooldown = localStorage.getItem("cooldownEndTime");
        if (storedCooldown) {
            const cooldownEndTime = parseInt(storedCooldown, 10);
            const currentTime = Math.floor(Date.now() / 1000);

            if (cooldownEndTime > currentTime) {
                const remainingTime = cooldownEndTime - currentTime;
                setIsDisabled(true);
                setTimeRemaining(remainingTime);
                startCountdown(remainingTime);
            }
        }
    }, []);

    const startCountdown = duration => {
        let secondsLeft = duration;

        const interval = setInterval(() => {
            secondsLeft -= 1;
            setTimeRemaining(secondsLeft);

            if (secondsLeft <= 0) {
                clearInterval(interval);
                setIsDisabled(false);
                localStorage.removeItem("cooldownEndTime");
            }
        }, 1000);
    };

    const handleClick = () => {
        setIsDisabled(true);
        onClick();
        setTimeRemaining(cooldownTime);

        const cooldownEndTime = Math.floor(Date.now() / 1000) + cooldownTime;
        localStorage.setItem("cooldownEndTime", `${cooldownEndTime}`);

        startCountdown(cooldownTime);

        // Perform your button action here
        console.log("Button clicked!");
    };

    return (
        <>
            <Button
                variant={variant}
                onClick={handleClick}
                disabled={isDisabled}
                className="disabled:brightness-50 disabled:cursor-not-allowed"
            >
                {children}
            </Button>
            {isDisabled && (
                <div className="text-xs text-center">
                    You can press the button in {timeRemaining} seconds
                </div>
            )}
        </>
    );
}
