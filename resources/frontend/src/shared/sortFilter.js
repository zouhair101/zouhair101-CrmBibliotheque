import _ from 'lodash';

export default (data = [], sortObject) => {
    return _.orderBy(data, (item) => {
        return item[sortObject.orderBy]
    }, sortObject.order);
};
