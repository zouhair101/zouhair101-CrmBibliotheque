export const constants = {
    IS_LOADING: 'IS_LOADING',
    SEARCH_ACTION: 'SEARCH_ACTION',
    SORT_ACTION: 'SORT_ACTION',
    FILTER_ACTION: 'FILTER_ACTION',
    TOGGLE_ACTION: 'TOGGLE_ACTION',
    ADD_TOAST: 'ADD_TOAST',
    REMOVE_TOAST: 'REMOVE_TOAST',
    ERROR_ACTION: 'ERROR_ACTION',
    CHANGE_PROFILE_ACTION: 'CHANGE_PROFILE_ACTION'
};

export const routePath = {
    ADMIN_ROUTE_PATH: '#/app/admin',
    MEMBER_ROUTE_PATH: '#/app',
};

export const errorMessage = {
    TOKEN_NOT_PROVIDED: 'Token not provided',
    TOKEN_EXPIRED: 'Token has expired',
    TOKEN_INVALID: 'Could not decode token: Error while decoding to JSON: Syntax error',
    TOKEN_INVALID_SIGNATURE: 'Token Signature could not be verified.',
    MEMBER_OR_USER_DEACTIVATE: 'Your account is not active.'
};

export const publicImagePath = {
    USER_AVATAR: 'images/user-avatar.png',
    BOOK_AVATAR: 'images/book-avatar.png',
    APP_LOGO: 'images/logo-blue-black.png',
    APP_FAVICON: 'images/favicon/android-icon-36x36.png'
};

export const publicImagePathURL = {
    USER_AVATAR_URL: 'uploads/users/',
    TESTIMONIAL_AVATAR_URL: 'uploads/testimonials/',
    MEMBER_AVATAR_URL: 'uploads/members/',
    BOOK_AVATAR_URL: 'uploads/books/',
    IMAGE_URL: 'uploads/images/'
};

export const settingsKey = {
    LANGUAGE: 'language',
    DEFAULT_LOCALE: 'en',
    LOCALE_ARABIC: 'ar',
    LOCALE_PERSIAN: 'pe'
};
