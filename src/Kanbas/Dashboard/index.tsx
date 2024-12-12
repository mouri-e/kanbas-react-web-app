import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEnrollment, deleteEnrollment, setEnrollments} from "./reducer";
import ProtectedRoute from "./ProtectedRoute";
import * as enrollmentsClient from "./client";
import * as coursesClient from "../Courses/client";


export default function Dashboard(
    { courses, course, previewing, setPreviewMode, setCourse, addNewCourse,
        deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment }:
        {
            courses: any[];
            course: any;
            previewing: Boolean;
            setPreviewMode: (val: Boolean) => void;
            setCourse: (course: any) => void;
            addNewCourse: () => void;
            deleteCourse: (course: any) => void;
            updateCourse: () => void;
            enrolling: boolean;
            setEnrolling: (enrolling: boolean) => void;
            updateEnrollment: (courseId: string, enrolled: boolean) => void
        }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const dispatch = useDispatch();
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    const [enrollmentChanges, setEnrollmentChanges] = useState(false);
    //const [enrollments, setEnrollmentsFunc] = useState<any[]>([]);
    const fetchEnrollments = async () => {
        try {
            const currentEnrollments = await enrollmentsClient.findAllEnrollments();
            dispatch(setEnrollments(currentEnrollments));
            
        } catch (error) {
            console.error(error);
        }
    };

    /*const fetchModules = async () => {
        const modules = await coursesClient.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };*/
    
    /*const [filteredCourses, setFilteredCourses] = useState(
        courses.filter((course) =>
            enrollments.some(
                (enrollment: { user: any; course: any; }) =>
                    enrollment.user === currentUser._id &&
                    enrollment.course === course._id
            )));
    
    const [allCoursesBool, setAllCoursesBool] = useState(false);

    const handleCoursesFiltering = () => {
        const oppCoursesBool = !allCoursesBool;
        setAllCoursesBool(oppCoursesBool);
        if (oppCoursesBool) {
            setFilteredCourses(courses);
        }
        else {
            setFilteredCourses(
                courses.filter((course) =>
                    enrollments.some(
                        (enrollment: { user: any; course: any; }) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                    )))
        }
    }
    */

    
    const handleEnrollment = (courseID: string) => {
        dispatch(addEnrollment({
            _id: new Date().getTime().toString(),
            user: currentUser._id,
            course: courseID
        
        }));
    }
    
    const handleUnenrollment = (courseID: string) => {
        const enrollmentObject =
        {
            user: currentUser._id,
            course: courseID
        }
        dispatch(deleteEnrollment(enrollmentObject));
    }
    
    const enrollUserInCourse = async (cid: string) => {
        await enrollmentsClient.enrollInCourse(cid, currentUser._id);
        handleEnrollment(cid);
        const updated = !enrollmentChanges;
        setEnrollmentChanges(updated);
    };

    const unenrollUserFromCourse = async (cid: string) => {
        await enrollmentsClient.unenrollFromCourse(cid, currentUser._id);
        handleUnenrollment(cid);
        const updated = !enrollmentChanges;
        setEnrollmentChanges(updated);
    };

    const [allEnrollments, setAllEnrollments] = useState([]);

    useEffect(() => {
        enrollmentsClient.findAllEnrollments().then(setAllEnrollments);
        
    }, [enrollmentChanges]);
    /*
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
    */

    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">
                Dashboard
                <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
                    {enrolling ? "My Courses" : "All Courses"}
                </button>
            </h1>
            <hr />
            {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
                <>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse} >
                            Add
                        </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5>
            
            
                    <br />
                    <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
                    <hr />
                </>
            }
            
            {/*currentUser.role === "STUDENT" &&
                <button
                    onClick={() => {
                        const oppPreviewing = !previewing;
                        setPreviewMode(oppPreviewing)
                    }}
                    className="btn btn-primary float-end">
                    Enrollments
                </button>

            */}
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    
                    {//filteredCourses
                        courses
                            .map((course) =>
                            
                                <div key={course._id} className="wd-dashboard-course col" style={{ width: "270px" }}>
                                    <div className="card rounded-3 overflow-hidden">
                                        <ProtectedRoute courseID={course._id}>
                                            <img src={`images/${course.image}`} width="100%" height={160} alt="React Logo" />
                                            <div className="card-body">
                                                <h5 className="wd-dashboard-course-title card-title">
                                                    {enrolling && (() => {

                                                        const possibleEnrollment = allEnrollments.some((enrollment: { course: any; user: any }) => (
                                                            enrollment.course === course._id &&
                                                            enrollment.user === currentUser._id
                                                        ));
                                                    
                                                        if (possibleEnrollment) {
                                                            return(
                                                                <button
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        updateEnrollment(course._id, false);
                                                                    }}
                                                                    className="btn btn-danger float-end">
                                                        
                                                                    Unenroll
                                                                </button>
                                                            )
                                                    
                                                        }
                                                        else {
                                                            return (
                                                                <button
                                                                    onClick={(event) => {
                                                                        event.preventDefault();
                                                                        updateEnrollment(course._id, true);
                                                                    }}
                                                                    className="btn btn-success float-end">
                                                                    Enroll
                                                                </button>
                                                            )
                                                        }
                                                    })()} {}
                                                    {course.name}
                                                </h5>
                                                <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                                                    style={{ maxHeight: 100 }}>
                                                    {course.description}
                                                </p>
                                                <button className="btn btn-primary">
                                                    Go
                                                </button>
                                                {/** There is an enrollment in the course matching the student */}
                                                {/*currentUser.role === "STUDENT" &&
                                                    enrollments.some(
                                                        (enrollment: { user: any; course: any; }) => (enrollment.user === currentUser._id && enrollment.course === course._id)
                                                    )
                                                    &&
                                                    (
                                                        <Link to={`/Kanbas/Dashboard/`}>
                                                            <button
                                                                onClick={() => unenrollUserFromCourse(course._id)}
                                                                className="btn btn-danger float-end">
                                                                Unenroll
                                                            </button>
                                                        </Link>
                                                    )*/}
                                                {/** There is no enrollment matching the student */}
                                                {/*currentUser.role === "STUDENT"
                                                    &&
                                                    (!
                                                        enrollments.some(
                                                            (enrollment: { user: any; course: any; }) => (enrollment.user === currentUser._id && enrollment.course === course._id)
                                                        ))
                                                    &&
                                                    (
                                                        <Link to={`/Kanbas/Dashboard/`}>
                                                            <button
                                                                onClick={() => enrollUserInCourse(course._id)}
                                                                //() => handleEnrollment(course._id)}
                                                                className="btn btn-success float-end">
                                                                Enroll
                                                            </button>
                                                        </Link>
                                                    )*/}

                                                {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
                                                    <>
                                                        <button onClick={(event) => {
                                                            event.preventDefault();
                                                            deleteCourse(course._id);
                                                        }}
                                                            className="btn btn-danger float-end"
                                                            id="wd-delete-course-click">
                                                            Delete
                                                        </button>
                                                        <button id="wd-edit-course-click"
                                                            onClick={(event) => {
                                                                event.preventDefault();
                                                                setCourse(course);
                                                            }}
                                                            className="btn btn-warning me-2 float-end">
                                                            Edit
                                                        </button>
                                                    </>
                                                }
                                            </div>
                                        </ProtectedRoute>
                                    </div>
                                </div>
                                
                            )}
                    
                    
                </div>
            </div>
        </div>
    );
}

