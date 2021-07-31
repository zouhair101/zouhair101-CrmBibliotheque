import {Filters} from "../constants";

export default (filters = Filters.OBJ) => {
    let url = '?';
    if (filters.order_By !== '' || !filters.order_By) {
        url = url + 'order_by=' + filters.order_By + '&direction=' + filters.direction;
    }
    if (filters.limit > 0) {
        if (url !== '?') {
            url += '&'
        }
        url = url + 'limit=' + filters.limit + '&skip=' + filters.skip;
    }
    if (filters.search !== '') {
        if (url !== '?') {
            url += '&'
        }
        url += 'search=' + filters.search;
    }
    if (filters.start_date && filters.end_date) {
        if (url !== '?') {
            url += '&'
        }
        url = url + 'start_date=' + filters.start_date + '&end_date=' + filters.end_date;
    }
    if (filters.is_ebooks) {
        if (url !== '?') {
            url += '&'
        }
        url += 'is_ebooks=' + filters.is_ebooks;
    }
    return url;
}
