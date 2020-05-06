export const VERSION = "0.1.0";
// export const FRAMEBOX_API_URL = 'http://192.168.1.50:3000/api/v1'
export const FRAMEBOX_API_URL = process.env.VUE_APP_API;

export const BOOTSTRAP_PAGINATION_CLASSES = {
    ul: 'pagination',
    li: 'page-item',
    liActive: 'active',
    liDisable: 'disabled',
    button: 'page-link'
}