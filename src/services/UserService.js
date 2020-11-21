import axios from 'axios'

const USERS_REST_API_URL = 'http://localhost:5000/get_tasks';

class UserService {

    getUsers(){
        return axios.get(USERS_REST_API_URL);
    }
}

export default new UserService();
