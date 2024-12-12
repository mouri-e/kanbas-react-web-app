import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as client from "./client";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizQuestions from "./Quizzes/QuizQuestions";
import QuestionEditor from "./Quizzes/QuizQuestions/QuestionEditor";
import TakeQuiz from "./Quizzes/QuizQuestions/TakeQuiz";

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const course = courses.find((course) => course._id === cid);


  //NEW FOR ASSIGNMENT 6

  const fetchUsers = async () => {
    if (cid) {
      const users = await client.findUsersForCourse(cid);
      setUsers(users);
    }
        
        
    };

    useEffect(() => {
        fetchUsers();
    }, [cid]);
  
  
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">

          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable users={users} />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />

            {/** #/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit/questions/${quizQuestion._id} */}
            <Route path="Quizzes/:qid/edit/questions/:questionID" element={<QuestionEditor />} />
            <Route path="Quizzes/:qid/edit/questions" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/edit/*" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/take" element={<TakeQuiz />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

  