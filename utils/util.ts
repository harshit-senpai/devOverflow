export const getTimeStamp = (createdAt: Date): string => {
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();

    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;
    const year = 365* day;

    if(timeDiff < minute) {
        const seconds = Math.floor(timeDiff / 1000);
        return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`
    }
    if(timeDiff < hour) {
        const minutes = Math.floor(timeDiff / minute);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`
    }
    if(timeDiff < day) {
        const hours = Math.floor(timeDiff / hour)
        return `${hours} ${hours === 1 ? 'hour': 'hours'} ago`
    }
    if(timeDiff < week) {
        const days = Math.floor(timeDiff / day)
        return `${days} ${days === 1 ? 'day': 'days'} ago`
    }
    if(timeDiff < month) {
        const weeks = Math.floor(timeDiff / week)
        return `${weeks} ${weeks === 1 ? 'week': 'weeks'} ago`
    }
    if(timeDiff < year) {
        const months = Math.floor(timeDiff / month)
        return `${months} ${months === 1 ? 'month': 'months'} ago`
    }
    const years = Math.floor(timeDiff / year);
    return `${years} ${years === 1 ? 'year' : 'years'} ago`;
}

export const formatNumber = (num: number): string => {
    if(num >= 1000000) {
        const formattedNumber = (num / 1000000).toFixed(1)
        return `${formattedNumber} M`
    }
    if(num >= 1000) {
        const formattedNumber = (num / 1000).toFixed(1)
        return `${formattedNumber} K`
    }
    return num.toString();
}