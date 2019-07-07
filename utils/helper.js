export const secondsToMS = seconds => {
    const d = new Date(seconds * 1000).toISOString();
    const hms  = seconds < 3600 ? d.substr(14, 5) : d.substr(11, 8);
    return hms;
};