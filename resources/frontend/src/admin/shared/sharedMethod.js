import {bookCirculationStatusConstant} from "../../member/constants";

export const getCurrentUser = () => {
    return localStorage.getItem('user') ? JSON.parse(atob(localStorage.getItem('user'))) : null;
};

export const getCurrentMember = () => {
    return localStorage.getItem('member') ? JSON.parse(atob(localStorage.getItem('member'))) : null;
};

export const getApiRouteForBookCirculation = (status) => {
    switch (status) {
        case bookCirculationStatusConstant.BOOK_RESERVED:
            return 'reserve-book';
        case bookCirculationStatusConstant.BOOK_ISSUED:
            return 'issue-book';
        case bookCirculationStatusConstant.BOOK_RETURNED:
            return 'return-book';
        default:
            return 'un-reserve-book';
    }
};

export const getBookCirculationSuccessMessage = (status) => {
    switch (status) {
        case bookCirculationStatusConstant.BOOK_RESERVED:
            return 'books-circulation.success.reserve.message';
        case bookCirculationStatusConstant.BOOK_ISSUED:
            return 'books-circulation.success.issue.message';
        case bookCirculationStatusConstant.BOOK_RETURNED:
            return 'books-circulation.success.return.message';
        case bookCirculationStatusConstant.BOOK_LOST:
            return 'books-circulation.success.lost.message';
        case bookCirculationStatusConstant.BOOK_DAMAGED:
            return 'books-circulation.success.damage.message';
        case bookCirculationStatusConstant.BOOK_UN_RESERVED:
            return 'books-circulation.success.unreserve.message';
        default:
            return 'books-circulation.success.reserve.message';
    }
};
