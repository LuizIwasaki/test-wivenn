const getJWTBody = <T>(token: string): T => {
    const parts = token.split('.'); // JWT Format: <ALGO>.<PAYLOAD>.<SIGN>
    if (parts.length !== 3) throw new Error(`Invalid JWT: ${token}`);
    const body = parts[1];
    return JSON.parse(b64DecodeUnicode(body)) as T;
}

function b64DecodeUnicode(str: string) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
}

export {
    getJWTBody, b64DecodeUnicode
}