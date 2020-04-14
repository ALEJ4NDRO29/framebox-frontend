const name = 'Token';

export const Jwt = {
    get() {
        return localStorage.getItem(name)
    },
    set(token) {
        localStorage.setItem(name, token);
    },
    remove() {
        localStorage.removeItem(name);
    }
}
