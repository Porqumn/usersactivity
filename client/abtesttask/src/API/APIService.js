import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default class APIService {

    static async getUsers() {
        const response = await $host.get('users');
        return response
    }

    static async editUsers(users) {
        const response = await $host.put('users/bulk', {"users": users})
            .catch((error) => {
                {
                    return error.response;
                }
            })
        return response;
    }


    static async getStatistics() {
        const response = await $host.get('users/statistics')
            .catch((error) => {
                {
                    return error.response;
                }
            })
        return response;
    }

}