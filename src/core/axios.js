import instance from 'axios';

export default function axios() {
    const axios = instance.create({
        baseURL: 'https://crediter.kz/api/',
    });
    axios.interceptors.request.use(config => {
        const data = {token: '53258406383fbb1f3ab66a40e893c3ccb4a9d116'};
        console.log(config.data);
        config.data = {...config.data, ...data};
        return config;
    });
    return axios;
}
