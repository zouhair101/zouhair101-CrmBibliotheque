import React from 'react';
import {getFormattedMessage} from "../../shared/sharedMethod";

export default {
    items: [
        {
            name: getFormattedMessage("books.title"),
            url: '/app/books',
            icon: 'fa fa-book',
        },
        {
            name: getFormattedMessage("book-history.title"),
            url: '/app/book-history',
            icon: 'fas fa-book-reader',
        },
        {
            name: getFormattedMessage("book-request.title"),
            url: '/app/book-requests',
            icon: 'fas fa-book',
        },
        {
            name: getFormattedMessage("e-book.title"),
            url: '/app/e-books',
            icon: 'fas fa-book',
        },
    ]
};
