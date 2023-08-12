import React, { useState, useEffect } from 'react';

const Clock = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    useEffect(() => {
        const timerID = setInterval(updateTime, 1000);
        updateTime();
        
        return () => {
            clearInterval(timerID);
        };
    }, []);

    const updateTime = () => {
        const cd = new Date();
        setTime(zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2));
        setDate(zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()]);
    };

    const zeroPadding = (num, digit) => {
        let zero = '';
        for (let i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    };

    return (
        <div id="clock">
            <p className="time">{time}</p>
            <p className="date">{date}</p>
        </div>
    );
};

export default Clock;
