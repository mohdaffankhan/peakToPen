export async function requestNotificationPermission() {
    if ("Notification" in window) {
        if(Notification.permission === "granted") return true
        if (Notification.permission === "denied") return false
        try {
            const permission = await Notification.requestPermission()
            return permission 
        } catch (error) {
            console.log(error)
        }
    }

}