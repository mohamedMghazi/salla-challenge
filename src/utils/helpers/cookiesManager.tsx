/**
 * Set a cookie with a name, value and expiration date in days
 * @param name { string } - cookie name
 * @param value { any } - cookie value
 * @param expire { number } - expiration date in days
 */
export function setCookie(name: string, value: any, expire: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + expire);

    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
    )}; expires=${expirationDate.toUTCString()}; path=/`;
}

export function removeCookie(name: string) {
    document.cookie =
        encodeURIComponent(name) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function getCookie(name: string) {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const trimmedCookie = cookie.trim();
        if (trimmedCookie.startsWith(`${encodeURIComponent(name)}=`)) {
            return decodeURIComponent(trimmedCookie.substring(name.length + 1));
        }
    }
    return null;
}
