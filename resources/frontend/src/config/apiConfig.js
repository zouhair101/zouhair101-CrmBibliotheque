import axios from 'axios';
import {environment} from "../environment";

const wampServer = environment.URL + '/api/';
export default axios.create({
    baseURL: wampServer,
})
