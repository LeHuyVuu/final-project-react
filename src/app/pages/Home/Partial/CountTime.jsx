import React, { useEffect, useState } from 'react';

export default function CountTime({ targetTime, onExpire }) {
    const calculateTimeLeft = () => Math.max(targetTime - Math.floor(Date.now() / 1000), 0);
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeLeft(calculateTimeLeft()); // Cập nhật lại timeLeft khi targetTime thay đổi
    }, [targetTime]);

    useEffect(() => {
        if (timeLeft <= 0) return; // Dừng nếu đã hết giờ
        
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onExpire && onExpire(); // Gọi API khi hết giờ
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const formatTime = (t) => String(Math.floor(t)).padStart(2, '0');

    return (
        <div className="flex gap-2">
            <span className="bg-red-500 text-white px-2 py-1 rounded">{formatTime(timeLeft / 3600)}</span> :
            <span className="bg-red-500 text-white px-2 py-1 rounded">{formatTime((timeLeft % 3600) / 60)}</span> :
            <span className="bg-red-500 text-white px-2 py-1 rounded">{formatTime(timeLeft % 60)}</span>
        </div>
    );
}