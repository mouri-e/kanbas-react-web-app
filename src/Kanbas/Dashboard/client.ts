import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const findAllEnrollments = async () => {
    const { data } = await axios.get(`${ENROLLMENTS_API}`);
    return data;
};

export const enrollInCourse = async (courseID: any, userID: any) => {
    await axios.put(`${ENROLLMENTS_API}/${courseID}/${userID}`);
};

export const unenrollFromCourse = async (courseID : any, userID : any) => {
    await axios.delete(`${ENROLLMENTS_API}/${courseID}/${userID}`);
};

