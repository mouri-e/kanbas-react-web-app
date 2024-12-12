import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import { RiArrowDropDownFill } from 'react-icons/ri'
import LessonControlButtons from "../Modules/LessonControlButtons";
import { RiDraftLine } from 'react-icons/ri'
import { IoEllipsisVertical } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as client from "./client";
import { setQuizzes } from "./reducer";


export default function QuizDetailsScreen() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const quizID = pathname.split("/")[5];
    const quizLink = pathname.split("/").slice(0, -1).join('/');
    //console.log("This is the one you're looking for:" + assignmentID);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    /*const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };

    */
    console.log("THESE ARE THE QUIZZES IN QUIZ DETAIL PAGE");
        console.log(quizzes);
    //edited for console
    useEffect(() => {
        
        //fetchQuizzes();
    }, []);
    const quiz = quizzes.find(
        (quiz: any) => (quiz.course === cid && quiz._id === quizID));
    
    const [title, setTitle] = useState(quiz?.title);
    const [quizType, setQuizType] = useState(quiz?.quizType);
    const [points, setPoints] = useState(quiz?.points);
    const [assignmentGroup, setAssignmentGroup] = useState(quiz?.assignmentGroup);
    const [shuffleAnswers, setShuffleAnswers] = useState(quiz?.shuffleAnswers);
    const [timeLimit, setTimeLimit] = useState(quiz?.timeLimit);
    const [multipleAttempts, setMultipleAttempts] = useState(quiz?.multipleAttempts);
    const [numberOfAttempts, setNumberOfAttempts] = useState(quiz?.numberOfAttempts);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(quiz?.showCorrectAnswers);
    const [accessCode, setAccessCode] = useState(quiz?.accessCode);
    const [oneQuestionAtATime, setOneQuestionAtATime] = useState(quiz?.oneQuestionAtATime);
    const [webcamRequired, setWebcamRequired] = useState(quiz?.webcamRequired);
    const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(quiz?.lockQuestionsAfterAnswering);
    const [dueDate, setDueDate] = useState(quiz?.dueDate);
    const [availableDate, setAvailableDate] = useState(quiz?.availableDate);
    const [untilDate, setUntilDate] = useState(quiz?.untilDate);

    return (
        <div id="wd-quizDetails">
            {(currentUser.role === "STUDENT") &&
                <div className="position-relative">
                    <h1 className="">{title}</h1>
                    <Link
                        className=""
                        to={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/take`}>
                        <button className="btn btn-danger">
                            Start
                        </ button>
                    </Link>
                </div>
            }
            {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
                <div>
                <div className="row"> 
                    <Link
                        className="col mb-3 mt-2"
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/take`}>
                        <button className="btn btn-secondary float-end">
                            Preview
                        </ button>
                    </Link>
                    <Link
                        className="col mb-3 mt-2"
                        to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit/details`}>
                        <button className="btn btn-secondary">
                            Edit
                        </ button>
                    </Link>
                </div>
                <hr />
                <h1>{title}</h1>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-quiz-type" className="form-label float-end">Quiz Type</label>
                    </div>
                    <div className="col mb-3">
                        {quizType}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-quizPoints" className="form-label float-end">Points</label>
                    </div>
                    <div className="col mb-3">
                        {points}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-assignmentGroup" className="form-label float-end">Assignment Group</label>
                    </div>
                    <div className="col mb-3">
                        {assignmentGroup}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-shuffleAnswers" className="form-label float-end">Shuffle Answers</label>
                    </div>
                    <div className="col mb-3">
                        {shuffleAnswers}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-TimeLimit" className="form-label float-end">Time Limit</label>
                    </div>
                    <div className="col mb-3">
                        {timeLimit}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-multipleAttempts" className="form-label float-end">Multiple Attempts</label>
                    </div>
                    <div className="col mb-3">
                        {multipleAttempts}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-numberOfAttempts" className="form-label float-end">How Many Attempts</label>
                    </div>
                    <div className="col mb-3">
                        {numberOfAttempts}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-showCorrectAnswers" className="form-label float-end">Show Correct Answers</label>
                    </div>
                    <div className="col mb-3">
                        {showCorrectAnswers}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-accessCode" className="form-label float-end">Access Code</label>
                    </div>
                    <div className="col mb-3">
                        {accessCode}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-oneQuestion" className="form-label float-end">One Question at a Time</label>
                    </div>
                    <div className="col mb-3">
                        {oneQuestionAtATime}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-webcam" className="form-label float-end">Webcam Required</label>
                    </div>
                    <div className="col mb-3">
                        {webcamRequired}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-lockQuestions" className="form-label float-end">Lock Questions After Answering</label>
                    </div>
                    <div className="col mb-3">
                        {lockQuestionsAfterAnswering}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-quizDueDate" className="form-label float-end">Due Date</label>
                    </div>
                    <div className="col mb-3">
                        {dueDate}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-quizAvailableDate" className="form-label float-end">Available Date</label>
                    </div>
                    <div className="col mb-3">
                        {availableDate}
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-quizUntilDate" className="form-label float-end">Until Date</label>
                    </div>
                    <div className="col mb-3">
                        {untilDate}
                    </div>
                </div>

                
               
            
                </div>
            }
      
        </ div>
    );
}