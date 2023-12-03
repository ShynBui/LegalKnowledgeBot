import axios from "axios";
// import cookie from "react-cookies";

const SERVER = "http://localhost:5051";

export const endpoints = {
    "chu_de_phap_dien": `/api/chu_de_phap_dien`,
    "de_muc_phap_dien": (id) => `/api/chu_de_phap_dien/${id}/de_muc`,
    "chuong_va_dieu_phap_dien": (id) => `/api/de_muc_phap_dien/${id}/chi_muc`,
    "chuong_va_dieu_phap_dien_con": (id) => `/api/chuong_va_dieu_phap_dien/${id}/chi_muc`,
    "login": `/api/users/login/`,
    "current-user": `/api/current-user/`,
    "register": `/api/users/register/`,
    "terminologies": `/api/terminologies/`,
    "cau_hoi_theo_chu_de": (chu_de_id) => `/api/cau_hoi/${chu_de_id}`,
    "add_cau_hoi": `/api/add_cau_hoi/`,
    "cau_hoi_theo_id": (id) => `/api/cau_hoi_by_id/${id}`,
    "tra_loi": (id) => `/api/tra_loi/${id}`,

}


export default axios.create({
    baseURL: SERVER
})  