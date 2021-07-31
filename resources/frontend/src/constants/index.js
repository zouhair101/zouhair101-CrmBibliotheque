export const constants = {
    IS_LOADING: 'IS_LOADING',
    SEARCH_ACTION: 'SEARCH_ACTION',
    SORT_ACTION: 'SORT_ACTION',
    FILTER_ACTION: 'FILTER_ACTION',
    TOGGLE_ACTION: 'TOGGLE_ACTION',
    ADD_TOAST: 'ADD_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST',
    ERROR_ACTION: 'ERROR_ACTION',
    GET_SET_CURRENCY: 'GET_SET_CURRENCY',
    CHANGE_PASSWORD_MODEL_ACTION: 'CHANGE_PASSWORD_MODEL_ACTION',
    CHANGE_LANGUAGE_MODAL_ACTION: 'CHANGE_LANGUAGE_MODAL_ACTION'
};

export const countryCode = {
    INR: 'INR',
    USD: 'USD',
    GBP: 'GBP',
    AED: 'AED',
    CAD: 'CAD',
    CNY: 'CNY',
    RUB: 'RUB',
    EUR: 'EUR',
    AUD: 'AUD',
};

export const Routes = {
    APP_HOME: '/',
    MEMBER_HOME: '/app/landing',
    MEMBER_LENDING: '/app/landing',
    MEMBER_LOGIN: '/app/login',
    MEMBER_REGISTRATION: '/app/registration',
    MEMBER_DEFAULT: '/app/books',
    ADMIN_LOGIN: '/app/admin/login',
    ADMIN_DEFAULT: '/app/admin/dashboard',
    BOOKS: '/app/admin/books/',
    MEMBERS: '/app/admin/members/',
    BOOKS_CIRCULATION: '/app/admin/books-circulation/',
    USERS: '/app/admin/users/',
    MEMBER_FORGOT_PASSWORD: '/app/forgot-password',
    MEMBER_RESET_PASSWORD: '/app/reset-password',
    ADMIN_FORGOT_PASSWORD: '/app/admin/forgot-password',
    ADMIN_RESET_PASSWORD: '/app/admin/reset-password',
    USER_PROFILE: '/app/admin/user-profile',
    MEMBER_PROFILE: '/app/member-profile',
};

export const Tokens = {
    ADMIN: 'authtoken',
    MEMBER: 'memberToken'
};

export const Filters = {
    PAGE: 1,
    OBJ: {
        order_By: '',
        limit: 10,
        skip: 0,
        direction: 'asc',
        search: ''
    }
};

export const Roles = {
    ADMIN_ROLE_NAME: 'admin'
};

export const FilterOption = {
    ALL: 'books-circulation.filter.all.label'
};

export const localStorageActionType = {
    GET_PROFILE: 'GET_PROFILE',
    SET_PROFILE: 'SET_PROFILE',
    CLEAR_PROFILE: 'CLEAR_PROFILE'
};

export const dateFormat = {
    DEFAULT_MOMENT: 'YYYY-MM-DD hh:mm:ss',
    NATIVE: 'YYYY-MM-DD',
    CHART_DATE: 'MMM,D,YYYY',
    CHART_CUSTOM_DATE: 'MMM_YYYY',
};

export const LocalStorageKey = {
    USER: 'user',
    MEMBER: 'member'
};

export const appSettingActionType = {
    FETCH_APP_SETTING: 'FETCH_APP_SETTING',
    EDIT_APP_SETTING: 'EDIT_APP_SETTING',
};

export const appSettingsKey = {
    LIBRARY_NAME: 'library_name',
    LIBRARY_LOGO: 'library_logo',
};

export const apiBaseURL = {
    AUTHOR: 'authors',
    BOOK_LANGUAGE: 'book-languages',
    BOOK_REQUEST: 'book-requests',
    E_BOOK: 'e-books',
    BOOK: 'books',
    BOOK_DETAILS: 'get-book-details',
    BOOK_LIMIT: 'books',
    BOOK_HISTORY: 'books-history',
    BOOK_ITEM: 'book-items',
    BOOK_SERIES: 'book-series',
    TOTAL_BOOKS: 'total-books',
    CURRENCY: 'currencies',
    CONFIG: 'config',
    COUNTRY: 'countries',
    DASHBOARD_DETAILS: 'dashboard-details',
    GENRE: 'genres',
    ABOUT_US_CARD: 'about-us-cards',
    PENALTY: 'penalties',
    ISSUED_BOOK: 'issued-books',
    ADMIN_FORGOT_PASSWORD: 'send-reset-password-link',
    ADMIN_RESET_PASSWORD: 'reset-password',
    MEMBER_FORGOT_PASSWORD: 'send-reset-member-password-link',
    MEMBER_RESET_PASSWORD: 'reset-member-password',
    MEMBER: 'members',
    MEMBER_LOGIN: 'member-login',
    MEMBER_REGISTRATION: 'v1/register-member',
    MEMBER_PLAN: 'membership-plans',
    PERMISSION: 'permissions',
    PUBLISHER: 'publishers',
    ROLE: 'roles',
    SETTING: 'settings',
    HOME_SETTING: 'homepage-settings',
    SEARCH_BOOK: 'search-books',
    TAG: 'tags',
    UPLOAD_LOGO: 'upload-logo',
    UPLOAD_FAVICON: 'upload-favicon',
    USER: 'users',
    TESTIMONIAL: 'testimonials',
    USER_LOGIN: 'login',
    USER_DETAILS: 'user-details',
    USER_PROFILE_UPDATE: 'update-user-profile',
    CHANGE_PASSWORD: 'change-password',
    MY_SETTINGS: 'my-settings',
    UPDATE_SETTINGS: 'update-settings',
    BOOKS_EXPORT: 'books-export',
    BOOKS_IMPORT: 'books-import',
    EXPORT_BOOKS_CIRCULATION: 'export-books-circulation',
};

export const bookRequestConstants = {
    PENDING: 0,
    APPROVED: 1,
    AVAILABLE: 2,
    CANCELLED: 3
};

export const loggedConstant = {
    IS_USER_LOGOUT: 'isUserLogout',
    IS_MEMBER_LOGOUT: 'isMemberLogout'
};

// used in admin and member both
export const homeSettingsActionsType = {
    FETCH_HOME_SETTINGS: 'FETCH_HOME_SETTINGS',
    PUT_HOME_SETTINGS: 'PUT_HOME_SETTINGS',
};

export const homeSettingsKey = {
    FACEBOOK: 'facebook',
    GITHUB: 'github',
    LINKEDIN: 'linkedin',
    TWITTER: 'twitter',
    CONTACT_EMAIl: 'contact_email',
    CONTACT_PHONE: 'contact_phone',
    COMPANY_DESCRIPTION: 'company_description',
    WEBSITE: 'website',
    HERO_IMAGE_TITLE: 'hero_image_title',
    HERO_IMAGE_DESCRIPTION: 'hero_image_description',
    ABOUT_US_TEXT: 'about_us_text',
    GENRES_TEXT: 'genres_text',
    POPULAR_BOOKS_TEXT: 'popular_books_text'
};

export const homeSettingsDisplayName = {
    FACEBOOK: 'Facebook',
    GITHUB: 'Github',
    LINKEDIN: 'Linkedin',
    TWITTER: 'Twitter',
    CONTACT_EMAIl: 'Contact Email',
    CONTACT_PHONE: 'Contact Phone',
    COMPANY_DESCRIPTION: 'Company Description',
    WEBSITE:'Website',
    HERO_IMAGE_TITLE: 'Hero Image Title',
    HERO_IMAGE_DESCRIPTION: 'Hero Image Description',
    ABOUT_US_TEXT: 'About us Text',
    GENRES_TEXT: 'Genres Text',
    POPULAR_BOOKS_TEXT: 'Popular Books Text'
};

export const icon = {
    BOOK: 'fa fa-2x fa-book',
    BOOK_CIRCULATION: 'fas fa-2x fa-book-reader',
    MEMBER: 'fas fa-2x fa-users',
    GENRES: 'fas fa-2x fa-layer-group',
    AUTHORS: 'fas fa-2x fa-user-friends',
    PUBLISHER: 'fas fa-2x fa-atlas',
    BOOK_LANGUAGE: 'fa fa-2x fa-globe',
    TAG: 'fas fa-2x fa-tags',
    USERS: 'fa fa-2x fa-user',
    ROLE: 'fas fa-2x fa-user-shield',
    MEMBER_PLAN: 'fa-2x icon-docs',
    BOOK_SERIES: 'fas fa-2x fa-swatchbook',
    BOOK_REQUEST: 'fas fa-2x fa-book',
    TESTIMONIAL: 'fa fa-2x fa-quote-left',
    RUPEE: 'fa fa-2x fa-rupee',
};
