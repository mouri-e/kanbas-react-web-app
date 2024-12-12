import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { addQuiz, updateQuiz } from "./reducer";
import * as client from "./client";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import QuizQuestions from "./QuizQuestions";
import { deleteQuizQuestion, findQuestionsForQuiz, updateQuizQuestion } from "./QuizQuestions/client";
import * as questionReducer from "./QuizQuestions/reducer";

export default function QuizEditor() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const courseIDFromPathName = pathname.split("/")[3];
    const quizID = pathname.split("/")[5];
    // /Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit/details`
    const quizzesLink = pathname.split("/").slice(0, -3).join('/');
    //console.log("This is the one you're looking for:" + assignmentID);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
   
  
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const quiz = quizzes.find(
        (quiz: any) => (quiz?.course === cid && quiz?._id === quizID)
    );
    
    
    const [title, setTitle] = useState(quiz?.title);
    const [description, setDescription] = useState(quiz?.description);
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

    const ifQuizIDIsNew = "111111111111111111111111";
    const deleteQuizQuestionsThatHaveSpecialID = async () => { 
        const newQuestions = await findQuestionsForQuiz(courseIDFromPathName, ifQuizIDIsNew);
        console.log("THESE QUESTIONS SHOULD BE DELETED");
        console.log(newQuestions);
        newQuestions.forEach(
            async (question: any) => {
                if (question.quiz === ifQuizIDIsNew) {
                    const serverQuizQuestionDeleteObject = await deleteQuizQuestion(ifQuizIDIsNew, question._id);
                    await dispatch(questionReducer.deleteQuizQuestion(question._id));
                }
            }
        );  
    }

    const updateQuizQuestionsThatHaveSpecialID = async (quizId:string) => { 
        const newQuestions = await findQuestionsForQuiz(courseIDFromPathName, ifQuizIDIsNew);
        console.log("THESE QUESTIONS SHOULD BE UPDATED");
        console.log(newQuestions);
        newQuestions.forEach(
            async (question: any) => {
                if (question.quiz === ifQuizIDIsNew) {
                    const serverQuizQuestionDeleteObject = await updateQuizQuestion(ifQuizIDIsNew, { ...question, quiz:quizId});
                    await dispatch(questionReducer.updateQuizQuestion(question));
                }
            }
        );  
    }

    const handleQuizChanges = async () => {
        //console.log("updating new assignment check");
        if (!cid) return;
        //console.log("got past the cid check");

        if (quizID === "new") {
            const newQuiz = {
                ...quiz,
                _id: new Date().getTime().toString(),
                course: cid,
                title: title,
                decription: description,
                quizType: quizType,
                points: points,
                questions: [],
                assignmentGroup: assignmentGroup,
                shuffleAnswers: shuffleAnswers,
                timeLimit: timeLimit,
                multipleAttempts: multipleAttempts,
                numberOfAttempts: numberOfAttempts,
                showCorrectAnswers: showCorrectAnswers,
                accessCode: accessCode,
                oneQuestionAtATime: oneQuestionAtATime,
                webcamRequired: webcamRequired,
                lockQuestionsAfterAnswering: lockQuestionsAfterAnswering,
                dueDate: dueDate,
                availableDate: availableDate,
                untilDate: untilDate,
            };
            const serverQuizObject = await client.createQuizForCourse(cid, newQuiz);
            await dispatch(addQuiz(serverQuizObject));
            await updateQuizQuestionsThatHaveSpecialID(serverQuizObject._id);

            //update all quiz questions with quizID: 11111111...
            
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${serverQuizObject._id}`);

        }
        else {
            
            const newQuiz = {
                ...quiz,
                course: cid,
                title: title,
                description: description,
                quizType: quizType,
                points: points,
                questions: [],
                assignmentGroup: assignmentGroup,
                shuffleAnswers: shuffleAnswers,
                timeLimit: timeLimit,
                multipleAttempts: multipleAttempts,
                numberOfAttempts: numberOfAttempts,
                showCorrectAnswers: showCorrectAnswers,
                accessCode: accessCode,
                oneQuestionAtATime: oneQuestionAtATime,
                webcamRequired: webcamRequired,
                lockQuestionsAfterAnswering: lockQuestionsAfterAnswering,
                dueDate: dueDate,
                availableDate: availableDate,
                untilDate: untilDate,
            };
            await client.updateQuiz(newQuiz);
            dispatch(updateQuiz(newQuiz));
            
            navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}`);
        }
        
    }
    
    
    //quizzes editing url
    //#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit
    
    return (
        <div>
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <a id="wd-a" href={`#/Kanbas/Courses/${cid}/Quizzes/${quizID}/edit/details`}
                        className={`nav-link ${pathname.includes("details") ? "active" : ""}`}>
                        Details
                    </a>
                </li>
                <li className="nav-item">
                    <a id="wd-a1" href={`#/Kanbas/Courses/${cid}/Quizzes/${quizID}/edit/questions`}
                        className={`nav-link ${pathname.includes("questions") ? "active" : ""}`}>
                        Questions
                    </a>
                </li>
            
            </ul>
            <hr />
            
            
            
            {pathname.includes("details") && (

                <div id="wd-quizzes-editor">
                    <div className="mb-3">
                        <label htmlFor="wd-QuizName" className="form-label">
                            Quiz Name
                        </label>
                        <input type="text" className="form-control"
                            id="wd-QuizName"
                            defaultValue={title}
                            placeholder="Quiz Name"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea className="form-control" id="wd-description" rows={11}
                            defaultValue={description}
                            placeholder="Assignment Description"
                            onChange={(e) => setDescription(e.target.value)}
                        >
                                
                        </textarea>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-points" className="form-label float-end">Points</label>
                        </div>
                        <div className="col mb-3">
                            <input id="wd-points" className="form-control"
                                type="number"
                                defaultValue={points}
                                placeholder="100"
                                onChange={(e) => setPoints(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-quizType" className="form-label float-end">Quiz Type</label>
                        </div>
                        <div className="col mb-3">
                            <select id="wd-quizType" className="form-select"
                                onChange={(e) => setQuizType((e.target.value))}>
                                <option selected value="Graded Quiz">Graded Quiz</option>
                                <option value="Practice Quiz">Practice Quiz</option>
                                <option value="Graded Survey">Graded Survey</option>
                                <option value="Ungraded Survey">Ungraded Survey</option>
                            </select>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-quizgroup" className="form-label float-end">Assignment Group</label>
                        </div>
                        <div className="col mb-3">
                            <select id="wd-quizgroup" className="form-select"
                                onChange={(e) => setAssignmentGroup((e.target.value))}>
                                <option selected value="Quizzes">Quizzes</option>
                                <option value="Exams">Exams</option>
                                <option value="Assignments">Assignments</option>
                                <option value="Project">Project</option>
                            </select>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-shuffledAnswers" className="form-label float-end">Shuffle Answers</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-shuffledAnswers"
                                type="checkbox"
                                checked={shuffleAnswers === "Yes"}
                                onChange={(e) => setShuffleAnswers(e.target.checked ? "Yes" : "No")}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-timeLimit" className="form-label float-end">Time Limit</label>
                        </div>
                        <div className="col mb-3">
                            <input id="wd-timeLimit" className="form-control"
                                type="number"
                                defaultValue={timeLimit}
                                placeholder="20"
                                onChange={(e) => setTimeLimit(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-MultipleAttempts" className="form-label float-end">Multiple Attempts</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-MultipleAttempts"
                                type="checkbox"
                                checked={multipleAttempts === "Yes"}
                                onChange={(e) => setMultipleAttempts(e.target.checked ? "Yes" : "No")}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-numberOfAttempts" className="form-label float-end">How Many Attempts</label>
                        </div>
                        <div className="col mb-3">
                            <input id="wd-numberOfAttempts" className="form-control"
                                type="number"
                                defaultValue={numberOfAttempts}
                                placeholder="1"
                                onChange={(e) => setNumberOfAttempts(Number(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="wd-ShowCorrectAnswers" className="form-label">
                            Show Correct Answers
                        </label>
                        <input type="text" className="form-control"
                            id="wd-ShowCorrectAnswers"
                            defaultValue={showCorrectAnswers}
                            placeholder="Immediately"
                            onChange={(e) => setShowCorrectAnswers(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="wd-AccessCode" className="form-label">
                            Access Code
                        </label>
                        <input type="text" className="form-control"
                            id="wd-AccessCode"
                            defaultValue={accessCode}
                            placeholder=""
                            onChange={(e) => setAccessCode(e.target.value)}
                        />
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-OneQuestionAtATime" className="form-label float-end">One Question At A Time</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-OneQuestionAtATime"
                                type="checkbox"
                                checked={oneQuestionAtATime === "Yes"}
                                onChange={(e) => setOneQuestionAtATime(e.target.checked ? "Yes" : "No")}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-WebcamRequired" className="form-label float-end">Webcam Required</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-WebcamRequired"
                                type="checkbox"
                                checked={webcamRequired === "Yes"}
                                onChange={(e) => setWebcamRequired(e.target.checked ? "Yes" : "No")}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-LockQuestions" className="form-label float-end">Lock Questions After Answering</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-LockQuestions"
                                type="checkbox"
                                checked={lockQuestionsAfterAnswering === "Yes"}
                                onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked ? "Yes" : "No")}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-DueDate" className="form-label float-end">Due Date</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-DueDate"
                                type="date"
                                value={dueDate}
                                placeholder={Date()}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-AvailableDate" className="form-label float-end">Available Date</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-AvailableDate"
                                type="date"
                                value={availableDate}
                                placeholder={Date()}
                                onChange={(e) => setAvailableDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-3 mt-2">
                            <label htmlFor="wd-UntilDate" className="form-label float-end">Until Date</label>
                        </div>
                        <div className="col mb-3">
                            <input
                                id="wd-UntilDate"
                                type="date"
                                defaultValue={untilDate}
                                placeholder={Date()}
                                onChange={(e) => setUntilDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <hr />
                    <div className="row">
                
                        <div className="col mb-3 float-end">
                                
                            <button
                                onClick={handleQuizChanges}
                                type="button" className="btn btn-danger float-end ms-3">Save</button>
                        
                            <button
                                onClick={handleQuizChanges}
                                type="button" className="btn btn-danger float-end ms-3">Save and Publish</button>
                                
                    
                            <Link to={quizzesLink}
                                onClick={() => {deleteQuizQuestionsThatHaveSpecialID()}}>
                                <button type="button" className="btn btn-secondary float-end ms-3">Cancel</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {pathname.includes("questions") &&
                (
                    <>
                        <div className="row">
                            <div className="col mb-3 float-end">
                                {/**Possible issue with the quizID */}
                                <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quizID}/edit/questions/new`}>
                                    <button type="button" className="btn btn-secondary float-end">
                                        <BsPlusLg className="position-relative me-2" style={{ bottom: "1px" }} />
                                        New Question
                                    </button>
                                </Link>
                            </div>
                            <div className="col" ></div>
                        </div>
                        <QuizQuestions />
                        <br />
                        <div className="row">
                
                            <div className="col mb-3 float-end">
                                
                                <button
                                    onClick={handleQuizChanges}
                                    type="button" className="btn btn-danger float-end ms-3">Save</button>
                        
                                <button
                                    onClick={handleQuizChanges}
                                    type="button" className="btn btn-danger float-end ms-3">Save and Publish</button>
                                
                    
                                <Link to={quizzesLink}
                                    onClick={async () => {await deleteQuizQuestionsThatHaveSpecialID() }}>
                                    <button type="button" className="btn btn-secondary float-end ms-3">Cancel</button>
                                </Link>
                            </div>
                        </div>
                    </>
            
                )}
            
        </div>


    );
}
