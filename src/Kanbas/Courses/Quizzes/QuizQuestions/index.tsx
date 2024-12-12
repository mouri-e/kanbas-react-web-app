import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { setQuizQuestions } from "./reducer";
import * as client from "./client";

export default function QuizQuestions() {
    console.log("QUIZ QUESTION IS BEING RENDERED");
    const { cid } = useParams();
    const { pathname } = useLocation();
    const quizID = pathname.split("/")[5];
    const quizQuestionID = pathname.split("/")[8];
    // /Kanbas/Courses/${cid}/Quizzes/${quizID}/edit/details/new
    const quizEditLink = pathname.split("/").slice(0, -1).join('/');
    //console.log("This is the one you're looking for:" + assignmentID);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
   
  
    const { quizzes } = useSelector((state: any) => state.quizReducer);
    const quiz = quizzes.find(
        (quiz: any) => (quiz?.course === cid && quiz?._id === quizID)
    );
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    
    const { quizQuestions } = useSelector((state: any) => state.quizQuestionReducer);

    const ifQuizIDIsNew = 111111111111111111111111;
    /**
     * 
     * User Field: Attempts[] -> an array of quizIDs 
     * if the quiz ID the user is trying to attempt is in the attempts field more than number of allowed attempts, don't allow
     * if faculty/admin allow regardless of attempts
     * 
     * 
     */

    const fetchQuizQuestions = async () => {
        const quizQuestions = await client.findQuestionsForQuiz(cid as string, quizID as string);
        dispatch(setQuizQuestions(quizQuestions));
    };

    useEffect(() => {
        fetchQuizQuestions();
    }, []);
   

    return (
        <div>
            <ul className="wd-lessons list-group rounded-0">
                {!quizQuestions && (
                    <div>This Quiz Has No Questions Yet</div>
                )
                }
                {quizQuestions && quizQuestions
                    //this is the preview screen done :)
                    .map((quizQuestion: any) => (
                        <li className="wd-lesson list-group-item p-3">
                            
                            <a className="wd-assignment-link text-black text-decoration-none"
                                href={`#/Kanbas/Courses/${cid}/Quizzes/${quizID}/edit/questions/${quizQuestion._id}`}>
                                <div>
                                    <h2 className="fw-bold">Title: {quizQuestion.title}</h2>
                                    <h4 className="fw-bold">Points: {quizQuestion.points}</h4>
                                    <h4 className="fw-bold">Question: {quizQuestion.title}</h4>
                                    
                                    <hr />
                                    
                                    {quizQuestion.questionType === "Multiple Choice" &&
                                        (
                                            <div className="row mb-3">
                                                <div className="col-sm-10">
                                                {(quizQuestion.possibleAnswers.length > 0 || quizQuestion.correctAnswers.length > 0) &&
                                                    (quizQuestion.possibleAnswers.concat(quizQuestion.correctAnswers))
                                                        //.filter((assignment: any) => assignment.course === cid)
                                                        .map((possibleAnswer: any) => (
                                                            <div className="form-check">
                                                                <input className="form-check-input" type="radio"
                                                                    name="gridRadios" id="r3"
                                                                    value={possibleAnswer} />
                                                                <label className="form-check-label" htmlFor="r3">
                                                                    {possibleAnswer}
                                                                </label>
                                                            </div>
                                                        ))
                                                    }
                                                    
                                                </div>
                                            </div>
                                        )
                                    }
                                    
                                    {quizQuestion.questionType === "True False" &&
                                        (
                                            <div className="row mb-3">
                                            
                                                <div className="col-sm-10">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio"
                                                            name="gridRadios" id="r3" value="True" />
                                                        <label className="form-check-label" htmlFor="r3">
                                                            True
                                                        </label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="radio"
                                                            name="gridRadios" id="r3" value="False" />
                                                        <label className="form-check-label" htmlFor="r3">
                                                            False
                                                        </label>
                                                    </div>
                                                  
                                                    
                                                </div>
                                            </div>
                                        
                                        )
                                    }
                                    
                                    {quizQuestion.questionType === "Fill In The Blank" &&
                                        (
                                            <div className="mb-3">
                                                <label htmlFor="wd-FilledInAnswer" className="form-label">
                                                    Your Answer Here:
                                                </label>
                                                <input type="text" className="form-control"
                                                    id="wd-FilledInAnswer"
                                                    defaultValue=""
                                                    placeholder=""
                                                />
                                            </div>
                                        )
                                    }
                                </div>
                            </a>
                
                            
                
                        </li>
                    ))}
            </ul>
            
            
        </div>
    );
};