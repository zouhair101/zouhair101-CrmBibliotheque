export default (items = [], searchText = '', filterKeys = []) => {
    if (searchText && filterKeys.length > 0) {
        const resultArray = [];
        items.forEach((obj) => {
            filterKeys.some(property => {
                if (obj[property] && obj[property].toString().toLowerCase().includes(searchText.toLowerCase())) {
                    resultArray.push(obj);
                    return true;
                }
            });
        });
        return resultArray;
    } else if (searchText) {
        return items.filter(item => JSON.stringify(item).toLowerCase().indexOf(searchText.toLowerCase()) >= 0);
    }
    else {
        return items;
    }
}
