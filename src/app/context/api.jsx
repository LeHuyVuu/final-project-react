import axios from 'axios';

const api = axios.create({
    baseURL: '',
    timeout: 10000, // Thời gian timeout mặc định
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Hàm gọi API tùy biến với phương thức (GET, POST, v.v...)
 * @param {string} method - Phương thức HTTP (GET, POST, PUT, DELETE, v.v...)
 * @param {string} url - Địa chỉ API
 * @param {object} [data] - Dữ liệu cần gửi (chỉ áp dụng cho POST, PUT, v.v...)
 * @param {object} [params] - Các tham số cần gửi trong URL (chỉ áp dụng cho GET, v.v...)
 * @returns {Promise} - Trả về Promise chứa dữ liệu API trả về
 */
const callApi = async (method, url, data = {}, params = {}) => {
    try {
        const response = await api({
            method,
            url,
            data,
            params,
        });
        return response;
    } catch (error) {
        console.error('API error:', error);
        throw error;
    }
};

// Các phương thức gọi API cho tiện dụng
export const getData = (url, params) => callApi('get', url, {}, params);
// export const postData = (url, data) => callApi('post', url, data);
// export const putData = (url, data) => callApi('put', url, data);
// export const deleteData = (url, data) => callApi('delete', url, data);

