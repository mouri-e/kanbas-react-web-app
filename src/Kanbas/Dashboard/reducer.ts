import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";

const initialState = {
  enrollments,
};
const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        addEnrollment: (state, { payload: enrollment }) => {
            const newEnrollment: any = {
                _id: new Date().getTime().toString(),
                user: enrollment.user,
                course: enrollment.course,
            };
            state.enrollments = [...state.enrollments, newEnrollment] as any;
        },
        
        deleteEnrollment: (state, { payload: enrollmentObject }) => {
            state.enrollments = state.enrollments.filter(
                (e: any) => (
                    !(e.user === enrollmentObject.user &&
                    e.course === enrollmentObject.course)
                ));
        },
    },
});
export const { addEnrollment, deleteEnrollment} =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
