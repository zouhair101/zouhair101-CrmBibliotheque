import {Permissions} from '../constants';
import {getFormattedMessage} from "../../shared/sharedMethod";

export default {
    items: [
        {
            name: getFormattedMessage('dashboard.title'),
            url: '/app/admin/dashboard',
            icon: 'icon-speedometer',
            permission: Permissions.MANAGE_BOOKS,
        },
        {
            name: getFormattedMessage('books.title'),
            url: '/app/admin/books',
            icon: 'fa fa-book',
            permission: Permissions.MANAGE_BOOKS,
        },
        {
            name: getFormattedMessage('books-circulation.title'),
            url: '/app/admin/books-circulation',
            icon: 'fas fa-book-reader',
            permission: Permissions.MANAGE_BOOKS
        },
        {
            name: getFormattedMessage('members.title'),
            url: '/app/admin/members',
            icon: 'fas fa-users',
            permission: Permissions.MANAGE_MEMBERS,
        },
        {
            name: getFormattedMessage('genres.title'),
            url: '/app/admin/genres',
            icon: 'fas fa-layer-group',
            permission: Permissions.MANAGE_GENRES,
        },
        {
            name: getFormattedMessage('authors.title'),
            url: '/app/admin/authors',
            icon: 'fas fa-user-friends',
            permission: Permissions.MANAGE_AUTHORS,
        },
        {
            name: getFormattedMessage('publishers.title'),
            url: '/app/admin/publishers',
            icon: 'fas fa-atlas',
            permission: Permissions.MANAGE_PUBLISHERS,
        },
        {
            name: getFormattedMessage('book-languages.title'),
            url: '/app/admin/book-languages',
            icon: 'fa fa-globe',
            permission: Permissions.MANAGE_BOOK_LANGUAGES,
        },
        {
            name: getFormattedMessage('tags.title'),
            url: '/app/admin/tags',
            icon: 'fas fa-tags',
            permission: Permissions.MANAGE_TAGS,
        },
        {
            name: getFormattedMessage('users.title'),
            url: '/app/admin/users',
            icon: 'fa fa-user',
            permission: Permissions.MANAGE_USERS,
        },
        {
            name: getFormattedMessage('roles.title'),
            url: '/app/admin/roles',
            icon: 'fas fa-user-shield',
            permission: Permissions.MANAGE_ROLES,
        },
        {
            name: getFormattedMessage('membership-plans.title'),
            url: '/app/admin/membership-plans',
            icon: 'icon-docs',
            permission: Permissions.MANAGE_PLANS,
        },
        {
            name: getFormattedMessage('books-series.title'),
            url: '/app/admin/books-series',
            icon: 'fas fa-swatchbook',
            permission: Permissions.MANAGE_BOOK_SERIES,
        },
        {
            name: getFormattedMessage("book-request.title"),
            url: '/app/admin/book-requests',
            icon: 'fas fa-book',
            permission: Permissions.MANANGE_BOOK_REQUEST,
        },
        {
            name: getFormattedMessage("penalties.title"),
            url: '/app/admin/penalties',
            icon: 'fas fa-rupee',
            permission: Permissions.MANAGE_PENALTIES,
        },

        {
            name: getFormattedMessage("cms.title"),
            icon: 'icon-layers',
            permission: Permissions.MANAGE_SETTINGS,
            children: [
                {
                    name: getFormattedMessage('settings.title'),
                    url: '/app/admin/settings',
                    icon: 'fa fa-cog'
                },
                {
                    name: getFormattedMessage('home-settings.title'),
                    url: '/app/admin/home-settings',
                    icon: 'fa fa-cogs'
                },
                {
                    name: getFormattedMessage('testimonials.title'),
                    url: '/app/admin/testimonials',
                    icon: 'fa fa-quote-left'
                },
            ]
        },
    ],
};
