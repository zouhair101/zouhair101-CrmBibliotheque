import axios from 'axios';
import axiosInterceptor from './axiosInterceptor';
import {environment} from '../../environment';

const wampServer = environment.URL + '/api/v1/';
const axiosApi = axios.create({
    baseURL: wampServer,
});

axiosInterceptor.setupInterceptors(axiosApi);
export default axiosApi;
