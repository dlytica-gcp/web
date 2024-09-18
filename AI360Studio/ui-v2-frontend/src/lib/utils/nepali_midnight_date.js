
export default function getMidnightExpirationInNepalTime() {
    const now = new Date();
   
    // Get the current time in UTC
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
 
    // Create a new date object for the current time in UTC
    const utcDate = new Date(utcTime);
   
    // Adjust to Nepali time (UTC+5:45)
    const nepalTime = new Date(utcDate);
    nepalTime.setHours(nepalTime.getHours() + 5);
    nepalTime.setMinutes(nepalTime.getMinutes() + 45);
 
    // Set time to midnight (12:00 AM) in Nepali time
    const midnightNepalTime = new Date(nepalTime);
    midnightNepalTime.setHours(24, 0, 0, 0);
 
    // Convert the Nepali midnight time to UTC for the cookie expiration
    const expirationTime = new Date(midnightNepalTime.getTime() - (now.getTimezoneOffset() * 60 * 1000));
 
    return expirationTime;
}