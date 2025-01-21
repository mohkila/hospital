const { default: axios } = require("axios");

const api_Key = process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api/",
  headers: {
    Authorization: `Bearer ${api_Key}`,
  },
});

const getCategory = () => axiosClient.get("categories?populate=*");
const getDoctors = () => axiosClient.get("doctors?populate=*");
const getDoctorByCategory = (category) =>
  axiosClient.get(
    `doctors?filters[category][Name][$in]=${category}&populate=*`
  );

const getDoctorById = (id) => axiosClient.get(`doctors/${id}?populate=*`);

//
const bookAppoinment = (data) => axiosClient.post("appoinments", data);
// 

const sendEmail = (data) => axios.post("/api/sendEmail", data);




// 

const getUserBookingList=(userEmail)=>axiosClient.get(
  `appoinments?filters[Email][$eq]
  =${userEmail}&populate[doctor][populate][Image][populate][0]=url&populate=* `)
// 

const deleteBooking=(id)=>axiosClient.delete(`appoinments/${id}`)

export default {
  getCategory,
  getDoctors,
  getDoctorByCategory,
  getDoctorById,
  bookAppoinment,
  sendEmail,
  getUserBookingList,
  deleteBooking,
  
  
};
