import axios, { AxiosResponse } from "axios";
import { BroBizz } from "../../features/BroBizz/brobizzInterface";
import { User, UserFormValues } from "../../features/users/users";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = "https://localhost:7029/"

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const BroBizzs = {
    list: () => requests.get<BroBizz []>('/brobizz')
}

const Account = {
    current: () => requests.get<User>('api/account'),
    login: (user: UserFormValues) => requests.post<User>('api/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('api/account/register', user)
}

const agent = {
    BroBizzs,
    Account
}

export default agent;