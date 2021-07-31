import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import progressReduce from '../../../store/reducers/progressReducer';
import searchReducer from '../../../store/reducers/searchReducer';
import sortReducer from '../../../store/reducers/sortReducer';
import toastReducer from '../../../store/reducers/toastReducer';
import modalReducer from '../../../store/reducers/modalReducer';
import memberReducer from './memberReducer';
import membershipPlanReducer from './membershipPlanReducer';
import countryReducer from './countryReducer';
import bookHistoryReducer from './bookHistoryReducer';
import bookReducer from './bookReducer';
import ebookReducer from './ebookReducer';
import bookSearchReducer from './bookSearchReducer';
import authorReducer from './authorReducer';
import localStorageReducer from '../../../store/reducers/localStorageReducer';
import appSettingReducer from '../../../store/reducers/appSettingReducer';
import settingReducer from './settingReducer';
import authReducer from './authReducer';
import bookRequestReducer from './bookRequestReducer';
import genreReducer from './genreReducer';
import cardReducer from './cardReducer';
import totalBookReducer from "./totalBookReducer";
import totalRecordReduce from "./totalRecordReduce";
import homeSettingReducer from "./homeSettingReducer";
import testimonialReducer from "./testimonialReducer";
import changePasswordModalReducer from "../../../store/reducers/changePasswordModalReducer";
import changeLanguageModalReducer from "../../../store/reducers/changeLanguageModalReducer";

export default combineReducers({
    isLoading: progressReduce,
    form: formReducer,
    searchText: searchReducer,
    sortObject: sortReducer,
    toasts: toastReducer,
    isToggle: modalReducer,
    member: memberReducer,
    membershipPlans: membershipPlanReducer,
    countries: countryReducer,
    bookHistory: bookHistoryReducer,
    books: bookReducer,
    genres: genreReducer,
    aboutUsCard: cardReducer,
    ebooks: ebookReducer,
    totalBooks: totalBookReducer,
    searchBooks: bookSearchReducer,
    authors: authorReducer,
    profile: localStorageReducer,
    appSetting: appSettingReducer,
    settings: settingReducer,
    auth: authReducer,
    bookRequests: bookRequestReducer,
    totalRecordMember: totalRecordReduce,
    homeSettings: homeSettingReducer,
    testimonials: testimonialReducer,
    isChangePasswordModelToggle: changePasswordModalReducer,
    isChangeLanguageModelToggle: changeLanguageModalReducer,
});
