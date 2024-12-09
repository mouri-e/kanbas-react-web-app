import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as enrollmentsClient from "./client";
import { useEffect, useState } from "react";


export default function ProtectedRoute(
    { children,
        courseID }:
        {
            children: any,
            courseID: any
        }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    //const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [possibleEnrollment, setPossibleEnrollment] = useState(false);

    useEffect(() => {
        
        try {
            const currentEnrollments = enrollmentsClient.findAllEnrollments();
            currentEnrollments.then(enrollments => enrollments.some((enrollment: { course: any; user: any }) =>
                enrollment.course === courseID &&
                enrollment.user === currentUser._id
            )).then(setPossibleEnrollment);
        }
        catch (error) {
            console.error(error);
        }
        
    }, []);
    /*
    const foundEnrollment = async () => {
        try {
            const currentEnrollments = await enrollmentsClient.findAllEnrollments();
            const enrollment = currentEnrollments.some((enrollment: { course: any; user: any }) =>
                enrollment.course === courseID &&
                enrollment.user === currentUser._id
            )
            return enrollment;
        } catch (error) {
            console.error(error);
        }
    };
    */


    if (possibleEnrollment) {
            return (
                <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                    to={`/Kanbas/Courses/${courseID}/Home`}>
                    {children}
                </Link>
            );
        }
        else {
            return children;
        }
        
    
}
