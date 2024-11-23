import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function ProtectedRoute(
    { children,
        courseID }:
        {
            children: any,
            courseID: any
        }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const enrollment = enrollments.some((enrollment: { course: any; user:any }) => 
        enrollment.course === courseID &&
        enrollment.user === currentUser._id
    )

    if (enrollment) {
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
