import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import "./styles.css";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import { useSelector } from "react-redux";


export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [previewing, setPreviewMode] = useState<Boolean>(false);
    const [course, setCourse] = useState<any>({
        _id: "1234", name: "New Course", number: "New Number",
        startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
        image: "reactjs.png"
    });

    const { currentUser } = useSelector((state: any) => state.accountReducer);

    const fetchCourses = async () => {
        try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
        } catch (error) {
            console.error(error);
        }
    };

    const findAllCoursesInKanbas = async () => {
        {/** Gets all courses in the server database */ }
        try {
            const allCourses = await courseClient.fetchAllCourses();
            setCourses(allCourses);
        } catch (error) {
            console.error(error);
        }
    };

    const addNewCourse = async () => {
        const newCourse = await userClient.createCourse(course);
        setCourses([...courses, newCourse]);
    };

    const deleteCourse = async (courseId: string) => {
        const status = await courseClient.deleteCourse(courseId);
        setCourses(courses.filter((course) => course._id !== courseId));
    };


    const updateCourse = async () => {
        await courseClient.updateCourse(course);
        setCourses(courses.map((c) => {
            if (c._id === course._id) { return course; }
            else { return c; }
        })
        );
    };

    useEffect(() => {
        if (previewing) {
            findAllCoursesInKanbas();
        } else {
            fetchCourses();
        }
        
    }, [currentUser, previewing]);

    return (
        <Session>
            <div id="wd-kanbas">
                <KanbasNavigation />
                {/* < h1 > Kanbas</h1>*/}
                <div className="wd-main-content-offset p-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard"
                            element={<ProtectedRoute>
                                <Dashboard
                                    courses={courses}
                                    course={course}
                                    previewing={previewing}
                                    setPreviewMode={setPreviewMode}
                                    setCourse={setCourse}
                                    addNewCourse={addNewCourse}
                                    deleteCourse={deleteCourse}
                                    updateCourse={updateCourse} />
                            </ProtectedRoute>} />
                        <Route path="/Courses/:cid/*"
                            element={<ProtectedRoute>
                                <Courses courses={courses} />
                            </ProtectedRoute>} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    </Routes>
                </div>
            </div>
        </Session>
    );
}

  