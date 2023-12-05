import axios from "axios";

const SERVER = import.meta.env.VITE_SERVER_URL + "/api"

export const endpoints = {
    "chu_de_phap_dien": `/chu_de_phap_dien/`,
    "de_muc_phap_dien": (id) => `/chu_de_phap_dien/${id}/de_muc/`,
    "chuong_va_dieu_phap_dien": (id) => `/de_muc_phap_dien/${id}/chi_muc/`,
    "chuong_va_dieu_phap_dien_con": (id) => `/chuong_va_dieu_phap_dien/${id}/chi_muc/`,
    "login": `/users/login/`,
    "current-user": `/current-user/`,
    "register": `/users/register/`,
    "terminologies": `/terminologies/`,
    "cau_hoi_theo_chu_de": (chu_de_id) => `/cau_hoi/${chu_de_id}/`,
    "add_cau_hoi": `/add_cau_hoi/`,
    "cau_hoi_theo_id": (id) => `/cau_hoi_by_id/${id}/`,
    "tra_loi": (id) => `/tra_loi/${id}/`,
    "terminologies": `/terminologies/`,
    "search": `/terminologies/search-paragraph/`
}


export default axios.create({
    baseURL: SERVER
})  
