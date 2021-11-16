import instance from 'axios';

export default function axios() {
    const axios = instance.create({
        baseURL: 'https://crediter.kz/api/',
    });
    axios.interceptors.request.use(config => {
        const data = {token: 'rggere4w4e'};
        config.data = {...config.data, ...data};
        return config;
    });
    return axios;
}
