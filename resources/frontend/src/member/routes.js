import React, {lazy} from 'react';

const Books = lazy(() => import('./components/book-search/BookSearch'));
const MemberProfile = lazy(() => import('./components/member-profile/MemberProfile'));
const BookHistory = lazy(() => import('./components/book-history/BookHistory'));
const BookRequests = lazy(() => import('./components/book-requests/BookRequests'));
const Ebooks = lazy(() => import('./components/E-books/Ebooks'));

export default [
    {
        path: '/app/books',
        exact: true,
        name: 'Books',
        component: Books
    },
    {
        path: '/app/book-history',
        exact: true,
        name: 'Book History',
        component: BookHistory
    },
    {
        path: '/app/member-profile',
        exact: true,
        name: 'MemberProfile',
        component: MemberProfile
    },
    {
        path: '/app/book-requests',
        exact: true,
        name: 'BookRequests',
        component: BookRequests
    },
    {
        path: '/app/e-books',
        exact: true,
        name: 'E-Books',
        component: Ebooks
    },
];
