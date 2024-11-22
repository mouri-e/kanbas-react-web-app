import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEnrollment, deleteEnrollment } from "./reducer";
import { useNavigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute";


export default function Dashboard(
    { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
        courses: any[];
        course: any;
        setCourse: (course: any) => void;
        addNewCourse: () => void;
        deleteCourse: (course: any) => void;
        updateCourse: () => void;
    }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
    

    const [filteredCourses, setFilteredCourses] = useState(
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

    const dispatch = useDispatch();
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
    
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            {currentUser.role == "FACULTY" &&
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

            {currentUser.role == "STUDENT" &&
                <button
                    onClick={handleCoursesFiltering}
                    className="btn btn-primary float-end">
                    Enrollments
                </button>

            }
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    
                    {filteredCourses
                        .map((course) =>
                            
                            <div key={course._id} className="wd-dashboard-course col" style={{ width: "270px" }}>
                                <div className="card rounded-3 overflow-hidden">
                                    <ProtectedRoute courseID={course._id}>
                                    
                                            
                                        <img src={`/images/${course.image}`} width="100%" height={160} alt="React Logo" />
                                        <div className="card-body">
                                            <h5 className="wd-dashboard-course-title card-title"> {course.name} </h5>
                                            <p className="wd-dashboard-course-title card-text overflow-y-hidden"
                                                style={{ maxHeight: 100 }}>
                                                {course.description}
                                            </p>
                                            <button className="btn btn-primary">
                                                Go
                                            </button>
                                            {/** There is an enrollment in the course matching the student */}
                                            {currentUser.role === "STUDENT" &&
                                                enrollments.some(
                                                    (enrollment: { user: any; course: any; }) => (enrollment.user === currentUser._id && enrollment.course === course._id)
                                                )
                                                &&
                                                (
                                                <Link to={`/Kanbas/Dashboard/`}>
                                                <button
                                                    onClick={() => handleUnenrollment(course._id)}
                                                    className="btn btn-danger float-end">
                                                        Unenroll
                                                    </button>
                                                </Link>
                                                )}
                                            {/** There is no enrollment matching the student */}
                                            {currentUser.role === "STUDENT"
                                                && 
                                                (!
                                                enrollments.some(
                                                    (enrollment: { user: any; course: any; }) => (enrollment.user === currentUser._id && enrollment.course === course._id)
                                                ))
                                                &&
                                                (
                                                <Link to={`/Kanbas/Dashboard/`}>
                                                <button
                                                    onClick={() => handleEnrollment(course._id)}
                                                    className="btn btn-success float-end">
                                                        Enroll
                                                    </button>
                                                    </Link>
                                                )}

                                            {currentUser.role === "FACULTY" &&
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

