import React from 'react';
import {Permissions} from './constants';
import {Routes} from "../constants";
import HomeSettings from "./components/home-settings/HomeSettings";

const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const Users = React.lazy(() => import('./components/users/Users'));
const Books = React.lazy(() => import(/* webpackChunkName: "books" */'./components/books/Books'));
const CreateBook = React.lazy(() => import(/* webpackChunkName: "books" */'./components/books/CreateBook'));
const ImportBook = React.lazy(() => import(/* webpackChunkName: "books" */'./components/import-book/ImportBook'));
const Genres = React.lazy(() => import('./components/genres/Genres'));
const Tags = React.lazy(() => import('./components/tags/Tags'));
const Authors = React.lazy(() => import('./components/authors/Authors'));
const Publishers = React.lazy(() => import('./components/publishers/Publishers'));
const BookLanguages = React.lazy(() => import('./components/book-languages/BookLanguages'));
const MembershipPlans = React.lazy(() => import('./components/membership-plans/MembershipPlans'));
const Roles = React.lazy(() => import('./components/roles/Roles'));
const Members = React.lazy(() => import('./components/members/Members'));
const BooksSeries = React.lazy(() => import(/* webpackChunkName: "books-series" */'./components/books-series/BooksSeries'));
const CreateBookSeries = React.lazy(() => import(/* webpackChunkName: "books-series" */'./components/books-series/CreateBookSeries'));
const EditBookSeries = React.lazy(() => import(/* webpackChunkName: "books-series" */'./components/books-series/EditBookSeries'));
const BooksCirculation = React.lazy(() => import('./components/books-circulation/BooksCirculation'));
const BookDetails = React.lazy(() => import('./components/book-details/BookDetails'));
const MemberDetails = React.lazy(() => import('./components/member-details/MemberDetails'));
const UserDetails = React.lazy(() => import('./components/user-details/UserDetails'));
const BookCirculationDetails = React.lazy(() => import('./components/book-circulation-details/BookCirculationDetails'));
const UserProfile = React.lazy(() => import('./components/user-profile/UserProfile'));
const Settings = React.lazy(() => import('./components/settings/Settings'));
const BookRequests = React.lazy(() => import('./components/book-requests/BookRequests'));
const Testimonials = React.lazy(() => import('./components/testimonials/Testimonials'));
const CreateMember = React.lazy(() => import('./components/members/CreateMember'));
const EditMember = React.lazy(() => import('./components/members/EditMember'));
const Penalties = React.lazy(() => import('./components/Penalties/Penalties'));

export default [
    {
        path: Routes.ADMIN_DEFAULT,
        exact: true,
        name: 'Dashboard',
        component: Dashboard,
        permission: Permissions.MANAGE_USERS
    },
    {
        path: Routes.USERS,
        exact: true,
        name: 'Users',
        component: Users,
        permission: Permissions.MANAGE_USERS
    },
    {
        path: `${Routes.USERS}:id/details`,
        exact: true,
        name: 'UserDetails',
        component: UserDetails,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: Routes.BOOKS,
        exact: true,
        name: 'Books',
        component: Books,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOKS}new`,
        exact: true,
        name: 'Add Book',
        component: CreateBook,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOKS}:id/details`,
        exact: true,
        name: 'BookDetails',
        component: BookDetails,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOKS}import-book`,
        exact: true,
        name: 'Import Book',
        component: ImportBook,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/genres',
        exact: true,
        name: 'Genres',
        component: Genres,
        permission: Permissions.MANAGE_GENRES
    },
    {
        path: '/app/admin/tags',
        exact: true,
        name: 'Tags',
        component: Tags,
        permission: Permissions.MANAGE_TAGS
    },
    {
        path: '/app/admin/authors',
        exact: true,
        name: 'Authors',
        component: Authors,
        permission: Permissions.MANAGE_AUTHORS
    },
    {
        path: '/app/admin/publishers',
        exact: true,
        name: 'Publishers',
        component: Publishers,
        permission: Permissions.MANAGE_PUBLISHERS
    },
    {
        path: '/app/admin/book-languages',
        exact: true,
        name: 'BookLanguages',
        component: BookLanguages,
        permission: Permissions.MANAGE_BOOK_LANGUAGES
    },
    {
        path: '/app/admin/membership-plans',
        exact: true,
        name: 'MembershipPlans',
        component: MembershipPlans,
        permission: Permissions.MANAGE_PLANS
    },
    {
        path: Routes.MEMBERS,
        exact: true,
        name: 'Members',
        component: Members,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: `${Routes.MEMBERS}new`,
        exact: true,
        name: 'CreateMember',
        component: CreateMember,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: `${Routes.MEMBERS}:id/edit`,
        exact: true,
        name: 'EditMember',
        component: EditMember,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: `${Routes.MEMBERS}:id/details`,
        exact: true,
        name: 'MemberDetail',
        component: MemberDetails,
        permission: Permissions.MANAGE_MEMBERS
    },
    {
        path: '/app/admin/roles',
        exact: true,
        name: 'Roles',
        component: Roles,
        permission: Permissions.MANAGE_ROLES
    },
    {
        path: '/app/admin/books-series',
        exact: true,
        name: 'BooksSeries',
        component: BooksSeries,
        permission: Permissions.MANAGE_BOOK_SERIES
    },
    {
        path: '/app/admin/books-series/new',
        exact: true,
        name: 'CreateSeriesBook',
        component: CreateBookSeries,
        permission: Permissions.MANAGE_BOOK_SERIES
    },
    {
        path: '/app/admin/books-series/:id/edit',
        exact: true,
        name: 'EditSeriesBook',
        component: EditBookSeries,
        permission: Permissions.MANAGE_BOOK_SERIES
    },
    {
        path: Routes.BOOKS_CIRCULATION,
        exact: true,
        name: 'BooksCirculation',
        component: BooksCirculation,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: `${Routes.BOOKS_CIRCULATION}:id/details`,
        exact: true,
        name: 'BookCirculationDetails',
        component: BookCirculationDetails,
        permission: Permissions.MANAGE_BOOKS
    },
    {
        path: '/app/admin/user-profile',
        exact: true,
        name: 'UserProfile',
        component: UserProfile,
        permission: Permissions.MANAGE_USERS
    },
    {
        path: '/app/admin/penalties',
        exact: true,
        name: 'Penalties',
        component: Penalties,
        permission: Permissions.MANAGE_PENALTIES
    },
    {
        path: '/app/admin/settings',
        exact: true,
        name: 'Settings',
        component: Settings,
        permission: Permissions.MANAGE_FINANCE
    },
    {
        path: '/app/admin/book-requests',
        exact: true,
        name: 'BookRequests',
        component: BookRequests,
        permission: Permissions.MANANGE_BOOK_REQUEST
    },
    {
        path: '/app/admin/home-settings',
        exact: true,
        name: 'HomeSettings',
        component: HomeSettings,
        permission: Permissions.MANAGE_SETTINGS
    },
    {
        path: '/app/admin/testimonials',
        exact: true,
        name: 'Testimonials',
        component: Testimonials,
        permission: Permissions.MANAGE_SETTINGS
    },
];
