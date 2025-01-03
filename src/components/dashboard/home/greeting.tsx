"use client";

import {AuthUser, getCurrentUser} from "aws-amplify/auth";
import {useEffect, useState} from "react";

export default function Greeting() {
    const [currentUser, setCurrentUser] = useState<AuthUser>();
    const [timeOfDay, setTimeOfDay] = useState<string>();

    useEffect(() => {
        const getData = async () => {
            const data = await getCurrentUser();
            setCurrentUser(data);
        };
        getData();
    }, []);

    useEffect(() => {
        const updateTimeOfDay = () => {
            const currentHour = new Date().getHours();
            if (currentHour < 12) {
                setTimeOfDay("Morning");
            } else if (currentHour < 18) {
                setTimeOfDay("Afternoon");
            } else {
                setTimeOfDay("Evening");
            }
        };

        updateTimeOfDay();

        // Optional: Update the time of day dynamically every hour
        const interval = setInterval(updateTimeOfDay, 60 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-5xl">
            Good {timeOfDay}, Jeshwin
            {/* Good {timeOfDay}, {currentUser?.signInDetails?.loginId} */}
        </div>
    );
}
