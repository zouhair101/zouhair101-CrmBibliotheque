import React from 'react';

export const constants = {
    SET_TOTAL_RECORD: 'SET_TOTAL_RECORD',
    PENALTIY_MODAL_ACTION: 'PENALTIY_MODAL_ACTION',
    IMPORT_BOOK_MODAL_ACTION: 'IMPORT_BOOK_MODAL_ACTION'
};

export const genreActionType = {
    FETCH_GENRES: 'FETCH_GENRES',
    FETCH_GENRE: 'FETCH_GENRE',
    ADD_GENRE: 'ADD_GENRE',
    EDIT_GENRE: 'EDIT_GENRE',
    DELETE_GENRE: 'DELETE_GENRE',
};

export const cardActionType = {
    FETCH_CARDS: 'FETCH_CARDS',
    FETCH_CARD: 'FETCH_CARD',
    ADD_CARD: 'ADD_CARD',
    EDIT_CARD: 'EDIT_CARD',
    DELETE_CARD: 'DELETE_CARD',
}

export const fileActionType = {
    ADD_FILE: 'ADD_FILE',
}

export const penaltyActionType = {
    FETCH_PENALTY: 'FETCH_PENALTY',
};

export const passwordActionType = {
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
};

export const tagActionType = {
    FETCH_TAGS: 'FETCH_TAGS',
    FETCH_TAG: 'FETCH_TAG',
    ADD_TAG: 'ADD_TAG',
    EDIT_TAG: 'EDIT_TAG',
    DELETE_TAG: 'DELETE_TAG',
};

export const authorActionType = {
    FETCH_AUTHORS: 'FETCH_AUTHORS',
    FETCH_AUTHOR: 'FETCH_AUTHOR',
    ADD_AUTHOR: 'ADD_AUTHOR',
    EDIT_AUTHOR: 'EDIT_AUTHOR',
    DELETE_AUTHOR: 'DELETE_AUTHOR',
};

export const bookLanguageActionType = {
    FETCH_BOOK_LANGUAGES: 'FETCH_BOOK_LANGUAGES',
    FETCH_BOOK_LANGUAGE: 'FETCH_BOOK_LANGUAGE',
    ADD_BOOK_LANGUAGE: 'ADD_BOOK_LANGUAGE',
    EDIT_BOOK_LANGUAGE: 'EDIT_BOOK_LANGUAGE',
    DELETE_BOOK_LANGUAGE: 'DELETE_BOOK_LANGUAGE',
};

export const publisherActionType = {
    FETCH_PUBLISHERS: 'FETCH_PUBLISHERS',
    FETCH_PUBLISHER: 'FETCH_PUBLISHER',
    ADD_PUBLISHER: 'ADD_PUBLISHER',
    EDIT_PUBLISHER: 'EDIT_PUBLISHER',
    DELETE_PUBLISHER: 'DELETE_PUBLISHER',
};

export const membershipPlanActionType = {
    FETCH_MEMBERSHIP_PLANS: 'FETCH_MEMBERSHIP_PLANS',
    FETCH_MEMBERSHIP_PLAN: 'FETCH_MEMBERSHIP_PLAN',
    ADD_MEMBERSHIP_PLAN: 'ADD_MEMBERSHIP_PLAN',
    EDIT_MEMBERSHIP_PLAN: 'EDIT_PUBLISHER',
    DELETE_MEMBERSHIP_PLAN: 'DELETE_PUBLISHER',
};

export const membershipPlanFrequency = {
    MONTHLY: 1,
    YEARLY: 2,
};

export const membershipPlanFrequencyOptions = [
    { id: 1, name: 'membership-plans.filter.monthly.label' },
    { id: 2, name: 'membership-plans.filter.yearly.label' },
];

export const bookActionType = {
    FETCH_BOOKS: 'FETCH_BOOKS',
    FETCH_BOOKS_BY_MEMBER: 'FETCH_BOOKS_BY_MEMBER',
    FETCH_BOOK: 'FETCH_BOOK',
    ADD_BOOK: 'ADD_BOOK',
    EDIT_BOOK: 'EDIT_BOOK',
    DELETE_BOOK: 'DELETE_BOOK',
    EXPORT_BOOK: 'EXPORT_BOOK'
};

export const availableBookActionType = {
    FETCH_AVAILABLE_BOOKS: 'FETCH_AVAILABLE_BOOKS',
};

export const bookFormatConstant = {
    FORMAT_HARDCOVER: 1,
    FORMAT_PAPERBACK: 2,
    FORMAT_E_BOOK: 3
};

export const bookStatusConstant = {
    STATUS_NOT_AVAILABLE: 0,
    STATUS_AVAILABLE: 1
};

export const bookFormatOptions = [
    { id: 1, name: 'books-items.filter.format.hardcover.label' },
    { id: 2, name: 'books-items.filter.format.paperback.label' },
    { id: 3, name: 'books-items.filter.format.e-book.label' },
];

const bookStatus = [
    { id: 1, name: 'books-circulation.filter.reserved.label', defaultValue: 'Reserved' },
    { id: 2, name: 'books-circulation.filter.issued.label', defaultValue: 'Issued' },
    { id: 3, name: 'books-circulation.filter.returned.label', defaultValue: 'Returned' },
    { id: 4, name: 'books-circulation.filter.available.label', defaultValue: 'Available' },
    { id: 5, name: 'books-circulation.filter.unreserved.label', defaultValue: 'Unreserved' },
    { id: 6, name: 'books-circulation.filter.lost.label', defaultValue: 'Lost' },
    { id: 7, name: 'books-circulation.filter.damaged.label', defaultValue: 'Damaged' },
];
export const bookStatusOptions = bookStatus;

export const errorMessage = {
    TOKEN_NOT_PROVIDED: 'Token not provided',
    TOKEN_EXPIRED: 'Token has expired'
};

export const userActionType = {
    FETCH_USERS: 'FETCH_USERS',
    FETCH_USER: 'FETCH_USER',
    ADD_USER: 'ADD_USER',
    EDIT_USER: 'EDIT_USER',
    SET_ACTIVE_DE_ACTIVE: 'SET_ACTIVE_DE_ACTIVE',
    DELETE_USER: 'DELETE_USER'
};

export const memberActionType = {
    FETCH_MEMBERS: 'FETCH_MEMBERS',
    FETCH_MEMBER: 'FETCH_MEMBER',
    ADD_MEMBER: 'ADD_MEMBER',
    EDIT_MEMBER: 'EDIT_MEMBER',
    DELETE_MEMBER: 'DELETE_MEMBER',
    SET_ACTIVE_DE_ACTIVE: 'SET_ACTIVE_DE_ACTIVE'
};

export const roleActionType = {
    FETCH_ROLES: 'FETCH_ROLES',
    FETCH_ROLE: 'FETCH_ROLE',
    ADD_ROLE: 'ADD_ROLE',
    EDIT_ROLE: 'EDIT_ROLE',
    DELETE_ROLE: 'DELETE_ROLE'
};

export const permissionActionType = {
    FETCH_PERMISSIONS: 'FETCH_PERMISSIONS',
};

export const bookCirculationActionType = {
    FETCH_BOOKS_CIRCULATION: 'FETCH_BOOKS_CIRCULATION',
    FETCH_BOOK_CIRCULATION: 'FETCH_BOOK_CIRCULATION',
    DELETE_BOOK_CIRCULATION: 'DELETE_BOOK_CIRCULATION',
    EXCEL_FILE_CIRCULATION: 'EXCEL_FILE_CIRCULATION',
};

export const bookCirculationStatusOptions = [
    { id: 1, name: 'Reserve' },
    { id: 2, name: 'Issue' },
    { id: 3, name: 'Return' },
    // {id: 4, name: 'Lost'},
    // {id: 5, name: 'Damaged'},
];

export const bookCirculationStatusConstant = {
    BOOK_RESERVED: 1,
    BOOK_ISSUED: 2,
    BOOK_RETURNED: 3,
    BOOK_AVAILABLE: 4,
    BOOK_UN_RESERVED: 5,
    BOOK_LOST: 6,
    BOOK_DAMAGED: 7
};

export const toastType = {
    ERROR: 'error'
};

export const bookSeriesActionType = {
    FETCH_BOOKS_SERIES: 'FETCH_BOOKS_SERIES',
    FETCH_BOOK_SERIES: 'FETCH_BOOK_SERIES',
    ADD_BOOK_SERIES: 'ADD_BOOK_SERIES',
    EDIT_BOOK_SERIES: 'EDIT_BOOK_SERIES',
    DELETE_BOOK_SERIES: 'DELETE_BOOK_SERIES'
};

export const configActionType = {
    FETCH_CONFIG: 'FETCH_CONFIG',
};

export const Permissions = {
    MANAGE_BOOKS: 'manage_books',
    ISSUE_BOOKS: 'issue_books',
    MANAGE_MEMBERS: 'manage_members',
    MANAGE_FINANCE: 'manage_finance',
    MANAGE_SETTINGS: 'manage_settings',
    MANAGE_ROLES: 'manage_roles',
    MANAGE_AUTHORS: 'manage_authors',
    MANAGE_PUBLISHERS: 'manage_publishers',
    MANAGE_BOOK_SERIES: 'manage_book_series',
    MANAGE_BOOK_LANGUAGES: 'manage_book_languages',
    MANAGE_PLANS: 'manage_plans',
    MANAGE_TAGS: 'manage_tags',
    MANAGE_GENRES: 'manage_genres',
    MANAGE_PENALTIES: 'manage_penalties',
    MANAGE_USERS: 'manage_users',
    MANANGE_BOOK_REQUEST: 'manage_book_requests'
};

export const memberBookHistoryActionType = {
    FETCH_MEMBER_BOOK_HISTORY: 'FETCH_MEMBER_BOOK_HISTORY',
    EDIT_MEMBER_BOOK_HISTORY: 'EDIT_MEMBER_BOOK_HISTORY',
};

export const countryActionType = {
    FETCH_COUNTRIES: 'FETCH_COUNTRIES'
};

export const userProfileActionType = {
    FETCH_USER_PROFILE: 'FETCH_USER_PROFILE',
    EDIT_USER_PROFILE: 'EDIT_USER_PROFILE',
};

export const settingsActionsType = {
    FETCH_SETTINGS: 'FETCH_SETTINGS',
    POST_SETTINGS: 'POST_SETTINGS',
    POST_LOGO: 'POST_LOGO',
    POST_FAVICON: 'POST_FAVICON',
    FETCH_CURRENCIES: 'FETCH_CURRENCIES',
};

export const settingsKey = {
    CURRENCY: 'currency',
    ISSUE_DUE_DAYS: 'reserve_due_days',
    RETURN_DUE_DAYS: 'return_due_days',
    LIBRARY_NAME: 'library_name',
    LIBRARY_LOGO: 'library_logo',
    LIBRARY_FAVICON: 'favicon_icon',
    LANGUAGE: 'language',
    ISSUE_BOOKS_LIMIT: 'issue_books_limit',
    RESERVE_BOOKS_LIMIT: 'reserve_books_limit',
    PENALTY_PER_DAY: 'penalty_per_day',
    BOOK_DUE_REMINDER_BEFORE_DAYS: 'book_due_reminder_before_days'
};

export const settingsDisplayName = {
    ISSUE_DUE_DAYS: 'Reserve Due Days',
    APP_NAME: 'App Name',
    LIBRARY_LOGO: 'Library Logo',
    RETURN_DUE_DAYS: 'Return Due Days',
    ISSUE_BOOKS_LIMIT: 'Max Issue Books Limit',
    RESERVE_BOOKS_LIMIT: 'Max Reserve Books Limit',
    PENALTY_PER_DAY: 'Penalty Per Day',
    BOOK_DUE_REMINDER_BEFORE_DAYS: 'Book Due Reminder Before Days'
};

export const bookItemActionType = {
    SET_BOOKS_ITEMS: 'SET_BOOKS_ITEMS',
    ADD_BOOK_ITEM: 'ADD_BOOK_ITEM',
    DELETE_BOOK_ITEM: 'DELETE_BOOK_ITEM'
};

export const maxDigits = {
    BOOK_CODE: 8,
    PHONE_NUMBER: 10
};

export const bookItemStatusConstants = {
    AVAILABLE: 1,
    UNAVAILABLE: 2,
    LOST: 3,
    DAMAGE: 4
};

export const bookItemStatusOptions = [
    { id: 1, name: 'books-items.filter.available.label' },
    { id: 2, name: 'books-items.filter.unavailable.label' },
    { id: 3, name: 'books-items.filter.lost.label' },
    { id: 4, name: 'books-items.filter.damaged.label' },
];

export const bookCirculationFilterOptions = [
    { id: 1, name: 'books-circulation.filter.all.label', defaultValue: '' },
    { id: 2, name: 'books-circulation.filter.issued.label', defaultValue: 'Issued' },
    { id: 3, name: 'books-circulation.filter.returned.label', defaultValue: 'Returned' },
    { id: 4, name: 'books-circulation.filter.reserved.label', defaultValue: 'Reserved' },
    { id: 5, name: 'books-circulation.filter.unreserved.label', defaultValue: 'Unreserved' },
    { id: 6, name: 'books-circulation.filter.damaged.label', defaultValue: 'Damaged' },
    { id: 7, name: 'books-circulation.filter.lost.label', defaultValue: 'Lost' },
    { id: 8, name: 'books-circulation.filter.archived.label', defaultValue: 'Archived' },
    { id: 9, name: 'books-circulation.filter.overdue.label', defaultValue: 'Overdue' },
    { id: 10, name: 'books-circulation.filter.Reservedue.label', defaultValue: 'Reservedue' }
];

export const bookFilterOptions = [
    { id: 1, name: 'books.filter.e-book.label', defaultValue: 1 }
]

export const importActionType = {
    FETCH_IMPORT_BOOK: 'FETCH_IMPORT_BOOK',
    CLEAR_IMPORT_BOOK: 'CLEAR_IMPORT_BOOK',
};

export const storageKey = {
    BOOK_CIRCULATION: 'book_circulation',
    MEMBERS: 'members',
    BOOK: 'book',
};

export const languageOptions = [
    { id: 'ar', name: 'settings.select.language.arabic.label', display_name: 'Arabic' },
    { id: 'cn', name: 'settings.select.language.chinese.label', display_name: 'Chinese' },
    { id: 'en', name: 'settings.select.language.english.label', display_name: 'English' },
    { id: 'fr', name: 'settings.select.language.french.label', display_name: 'French' },
    { id: 'gr', name: 'settings.select.language.german.label', display_name: 'German' },
    { id: 'it', name: 'settings.select.language.italian.label', display_name: 'Italian' },
    { id: 'pe', name: 'settings.select.language.persian.label', display_name: 'Persian' },
    { id: 'po', name: 'settings.select.language.portuguese.label', display_name: 'Portuguese' },
    { id: 'ru', name: 'settings.select.language.russian.label', display_name: 'Russian' },
    { id: 'sp', name: 'settings.select.language.spanish.label', display_name: 'Spanish' },
    { id: 'tr', name: 'settings.select.language.turkish.label', display_name: 'Turkish' },
];

export const authActionType = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    RESET_PASSWORD: 'RESET_PASSWORD',
    ADMIN_FORGOT_PASSWORD: 'ADMIN_FORGOT_PASSWORD',
    ADMIN_RESET_PASSWORD: 'ADMIN_RESET_PASSWORD',
};

export const dashBoardActionType = {
    FETCH_DASHBOARD_DETAILS: 'FETCH_DASHBOARD_DETAILS',
    FETCH_DASHBOARD_DETAILS_BY_TODAY: 'FETCH_DASHBOARD_DETAILS_BY_TODAY',
    FETCH_DASHBOARD_DETAILS_BY_CURRENT_WEEK: 'FETCH_DASHBOARD_DETAILS_BY_CURRENT_WEEK',
    FETCH_DASHBOARD_DETAILS_BY_LAST_WEEK: 'FETCH_DASHBOARD_DETAILS_BY_LAST_WEEK',
    FETCH_DASHBOARD_DETAILS_BY_CURRENT_MONTH: 'FETCH_DASHBOARD_DETAILS_BY_CURRENT_MONTH',
    FETCH_DASHBOARD_DETAILS_BY_LAST_MONTH: 'FETCH_DASHBOARD_DETAILS_BY_LAST_MONTH',
    FETCH_DASHBOARD_DETAILS_BETWEEN_MONTHS: 'FETCH_DASHBOARD_DETAILS_BETWEEN_MONTHS',
};

export const chartLabels = [
    { name: 'dashboard.chart.book.label' },
    { name: 'dashboard.chart.member.label' },
    { name: 'dashboard.chart.issue-book.label' },
    { name: 'dashboard.chart.reserve-book.label' },
    { name: 'dashboard.chart.overdue-book.label' },
];

export const chartLabelSelector = {
    TODAY: 'today',
    THIS_WEEK: 'this_week',
    LAST_WEEK: 'last_week',
    THIS_MONTH: 'this_month',
    LAST_MONTH: 'last_month',
    CUSTOM: 'custom',
};

export const bookRequestActionType = {
    FETCH_ADMIN_BOOKS_REQUEST: 'FETCH_ADMIN_BOOKS_REQUEST',
    FETCH_ADMIN_BOOK_REQUEST: 'FETCH_ADMIN_BOOK_REQUEST',
    ADD_ADMIN_BOOK_REQUEST: 'ADD_ADMIN_BOOK_REQUEST',
    EDIT_ADMIN_BOOK_REQUEST: 'EDIT_ADMIN_BOOK_REQUEST',
    DELETE_ADMIN_BOOK_REQUEST: 'DELETE_ADMIN_BOOK_REQUEST',
};

export const bookRequestStatusOptions = [
    { id: 0, name: 'book-request.filter.pending.label' },
    { id: 1, name: 'book-request.filter.approved.label' },
    { id: 2, name: 'book-request.filter.available.label' },
    { id: 3, name: 'book-request.filter.cancel.label' }
];

export const bookRequestStatus = {
    PENDING: 0,
    APPROVED: 1,
    AVAILABLE: 2,
    CANCEL: 3
};

export const availableBookLimitActionType = {
    FETCH_AVAILABLE_ISSUE_BOOK_LIMIT: 'FETCH_AVAILABLE_ISSUE_BOOK_LIMIT',
    FETCH_AVAILABLE_RESERVE_BOOK_LIMIT: 'FETCH_AVAILABLE_RESERVE_BOOK_LIMIT',
    CLEAR_AVAILABLE_RESERVE_BOOK_LIMIT: 'CLEAR_AVAILABLE_RESERVE_BOOK_LIMIT',
};

export const testimonialActionType = {
    FETCH_TESTIMONIALS: 'FETCH_TESTIMONIALS',
    FETCH_TESTIMONIAL: 'FETCH_TESTIMONIAL',
    ADD_TESTIMONIAL: 'ADD_TESTIMONIAL',
    EDIT_TESTIMONIAL: 'EDIT_TESTIMONIAL',
    DELETE_TESTIMONIAL: 'DELETE_TESTIMONIAL'
};
