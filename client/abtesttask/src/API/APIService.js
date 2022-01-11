import axios from "axios";

const $host = axios.create({
    baseURL: 'https://localhost:5001/api/'
})

export default class APIService {

         static async getAll() {
        const response = await $host.get('users');
        return response
    }

    static async addUsers(users) {
        const response = await $host.post('users/bulk', {"users": users })
            .catch((error) => {
                {
                    return error.response;
                }
            })
        return response;
    }

    static async editUser(id, user) {
        const response = await $host.put('users' + '/' + id, user)
            .catch((error) => {
                {
                    return error.response;
                }
            })
        return response;
    }

    static async deleteUser(id) {
        const response = await $host.delete('users' + '/' + id)
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