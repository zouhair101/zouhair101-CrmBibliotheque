import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import progressReduce from '../../../store/reducers/progressReducer';
import searchReducer from '../../../store/reducers/searchReducer';
import sortReducer from '../../../store/reducers/sortReducer';
import genreReducer from './genreReducer';
import penaltyReducer from './penaltyReducer';
import toastReducer from '../../../store/reducers/toastReducer';
import modalReducer from '../../../store/reducers/modalReducer';
import priceReducer from '../../../store/reducers/currencyReducer';
import tagReducer from './tagReducer';
import authorReducer from './authorReducer';
import publisherReducer from './publisherReducer';
import userReducer from './userReducer';
import membershipPlanReducer from './membershipPlanReducer';
import bookLanguageReducer from './bookLanguageReducer';
import bookReducer from './bookReducer';
import roleReducer from './roleReducer';
import permissionReducer from './permissionReducer';
import bookCirculationReducer from './bookCirculationReducer';
import bookSeriesReducer from './bookSeriesReducer';
import memberReducer from './memberReducer';
import configReducer from './configReducer';
import availableBookReducer from './availableBookReducer';
import memberBookHistoryReducer from './memberBookHistoryReducer';
import currencyReducer from './currencyReducer';
import userProfileReducer from './userProfileReducer';
import countryReducer from './countryReducer';
import settingReducer from './settingReducer';
import bookItemReducer from './bookItemReducer';
import totalRecordReduce from './totalRecordReduce';
import localStorageReducer from '../../../store/reducers/localStorageReducer';
import importBookReducer from './importBookReducer';
import appSettingReducer from '../../../store/reducers/appSettingReducer';
import authReducer from './authReducer';
import dashBoardReducer from './dashBoardReducer';
import bookRequestReducer from './bookRequestReducer';
import availableBookLimitReducer from './availableBookLimitReducer';
import homeSettingReducer from "./homeSettingReducer";
import testimonialReducer from "./testimonialReducer";
import returnDueDateReducer from "./penaltiesModalReducer";
import importBookModalReducer from "./importBookModalReducer";
import fileReducer from "./fileReducer";
import cardReducer from "./cardReducer";
import exportBook from "./exportBook";
import changePasswordModalReducer from "../../../store/reducers/changePasswordModalReducer";

export default combineReducers({
    genres: genreReducer,
    cards: cardReducer,
    penalties: penaltyReducer,
    tags: tagReducer,
    authors: authorReducer,
    publishers: publisherReducer,
    membershipPlans: membershipPlanReducer,
    bookLanguages: bookLanguageReducer,
    books: bookReducer,
    users: userReducer,
    roles: roleReducer,
    booksSeries: bookSeriesReducer,
    members: memberReducer,
    booksCirculation: bookCirculationReducer,
    availableBooks: availableBookReducer,
    memberBookHistory: memberBookHistoryReducer,
    userProfile: userProfileReducer,
    countries: countryReducer,
    bookItems: bookItemReducer,
    isLoading: progressReduce,
    settings: settingReducer,
    currencies: currencyReducer,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    permissions: permissionReducer,
    config: configReducer,
    totalRecord: totalRecordReduce,
    currency: priceReducer,
    profile: localStorageReducer,
    importBook: importBookReducer,
    appSetting: appSettingReducer,
    adminAuth: authReducer,
    dashBoard: dashBoardReducer,
    adminBookRequests: bookRequestReducer,
    bookLimit: availableBookLimitReducer,
    homeSettings: homeSettingReducer,
    testimonials: testimonialReducer,
    isChangePasswordModelToggle: changePasswordModalReducer,
    isReturnDueDateModal: returnDueDateReducer,
    isImportBookModal: importBookModalReducer,
    file: fileReducer,
    exportBooks: exportBook,
});
