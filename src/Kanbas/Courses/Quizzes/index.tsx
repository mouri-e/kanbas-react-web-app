import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import { RiArrowDropDownFill, RiDraftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import QuizzesContextMenu from "./QuizContextMenu";
import { useEffect } from "react";
import { setQuizzes } from "./reducer";
import * as client from "./client";
import { Link } from "react-router-dom";

export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { quizzes } = useSelector((state: any) => state.quizReducer);

    
    const dispatch = useDispatch();
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    //edited for console
    useEffect(() => {
        fetchQuizzes();
    }, []);
    
    return (
        <div id="wd-assignments">
            {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
                <>
                    <div className="mb-5">
                        <Link
                            to={`/Kanbas/Courses/${cid}/Quizzes/new/edit/details`}>
                            <button id="wd-add-assignment" className="btn btn-lg btn-danger float-end">
                                <BsPlusLg className="position-relative me-2" style={{ bottom: "1px" }} />
                                Quiz
                            </button>
                        </Link>
                    </div>
                    <br />
                </>
            }
            <ul id="wd-modules" className="list-group rounded-0 mt-5">
                <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                    <div className="wd-title p-3 ps-2 bg-secondary">
                        <BsGripVertical className="me-2 fs-3" />
                        <RiArrowDropDownFill />
                        <div className="d-inline">Assignment Quizzes</div>
            
                    </div>
                    <ul className="wd-lessons list-group rounded-0">
                        {quizzes
                            //.filter((assignment: any) => assignment.course === cid)
                            .map((quiz: any) => (
                
                                <li className="wd-lesson list-group-item p-3 ps-1">
                  
                  
                                    <a className="wd-assignment-link text-black text-decoration-none"
                                        href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}>
                  
                                        <div className="row">
                                            <div className="col-1 mt-4">
                                                <BsGripVertical className="me-2 fs-3" />
                                                <RiDraftLine className="me-2 fs-3" />
                                            </div>
                                            <div className="col-9">
                                                <h4 className="fw-bold">{quiz.title}</h4>
                                                
                                                {Date() > quiz.untilDate ? (
                                                    Date() < quiz.availableDate ? (
                                                        // Not available yet
                                                        <>
                                                            <b>Not Available Until</b> {quiz.availableDate}
                                                        </>
                                                    ) : (
                                                        // available still
                                                        <>
                                                            <b>Available Until</b> {quiz.untilDate} | <b>Due On</b> {quiz.dueDate}
                                                        </>
                                                    )
                                                ) : (
                                                    // after close date
                                                    <b>Closed</b>
                                                    
                                                )}
                                                <div className="quizDetailPreviews">
                                                    {quiz.points} pts | {quiz.questions.length} Questions | {currentUser.role === "STUDENT" && <b className="text-decoration-none"> Score {quiz.Score} </b>}
                                                </div>
                                            </div>
                                            <div className="col-2 mt-4">
                                                {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") &&
                                                    <div className="float-end">
                            
                                                        <QuizzesContextMenu quizId={quiz._id} />
                            
                                                    </div>
                            
                                                }
                                            </div>
                                        </div>
                      
                                    </a>
                      
                                </li>
                            ))}
                    </ul>
                </li>
            </ul>
      
        </ div>
    );
}