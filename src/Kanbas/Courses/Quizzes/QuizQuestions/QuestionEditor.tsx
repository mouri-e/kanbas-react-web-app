import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuizQuestion, updateQuizQuestion } from "./reducer";
import * as client from "./client";

export default function QuestionEditor() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const quizIdFromPath = pathname.split("/")[5];
    const quizQuestionId = pathname.split("/")[8];
    const quizQuestionLink = pathname.split("/").slice(0, -1).join('/');
    //console.log("This is the one you're looking for:" + assignmentID);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
   
  
    const { quizQuestions } = useSelector((state: any) => state.quizQuestionReducer);
    console.log("THESE ARE THE QUIZ QUESTIONS SO FAR");
    console.log(quizQuestions);
    const quizQuestion = quizQuestions.find(
        (quizQuestion: any) => (
            quizQuestion.course === cid
            && quizQuestion.quiz === quizIdFromPath
            && quizQuestion._id === quizQuestionId
        )
    );
    
    const [title, setTitle] = useState(quizQuestion?.title);
    const [question, setQuestion] = useState(quizQuestion?.question);
    const [points, setPoints] = useState(quizQuestion?.points);
    const [questionType, setQuestionType] = useState(quizQuestion?.questionType);
    const [possibleAnswers, setPossibleAnswers] = useState(quizQuestion?.possibleAnswers);
    const [correctAnswers, setCorrectAnswers] = useState(quizQuestion?.correctAnswers);
    const [currentPossibleAnswer, setCurrentPossibleAnswer] = useState("");
    const [currentCorrectAnswer, setCurrentCorrectAnswer] = useState("");
    if (!questionType) {
        setQuestionType("Multiple Choice");
    }
    if (!possibleAnswers) {
        setPossibleAnswers([]);
    }
    if (!correctAnswers) {
        setCorrectAnswers([]);
    }
    

    const handleQuizQuestionChanges = async () => {
        console.log("updating new assignment check");
        if (!cid) return;
        console.log("got past the cid check");

        if (quizQuestionId === "new") {
            const newQuizQuestion = {
                ...quizQuestion,
                _id: new Date().getTime().toString(),
                course: cid,
                quiz: quizIdFromPath,
                title: title,
                question: question,
                points: points,
                questionType: questionType,
                possibleAnswers: possibleAnswers,
                correctAnswers: correctAnswers

            };
            const serverQuizQuestionObject = await client.createQuestionForQuiz(cid, quizIdFromPath, newQuizQuestion);
            dispatch(addQuizQuestion(serverQuizQuestionObject));
        }
        else {
            
            const newQuizQuestion = {
                ...quizQuestion,
                course: cid,
                quiz: quizIdFromPath,
                title: title,
                question: question,
                points: points,
                questionType: questionType,
                possibleAnswers: possibleAnswers,
                correctAnswers: correctAnswers
            };
            //UPDATE THIS TO USE THE UPDATE FUNCTION IN coursesClient
            await client.updateQuizQuestion(quizIdFromPath, newQuizQuestion);
            dispatch(updateQuizQuestion(newQuizQuestion));
        }
        navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizIdFromPath}/edit/questions`);
    }

    const removeAllAnswers = async () => {
        setPossibleAnswers([]);
        setCorrectAnswers([]);
    }

    useEffect(() => {
        removeAllAnswers();
    }, [questionType]);

    


    return (
        <div>
            <div className="mb-3">
                <label htmlFor="wd-QuestionTitle" className="form-label">
                    Question Title
                </label>
                <input type="text" className="form-control"
                    id="wd-QuestionTitle"
                    defaultValue={title}
                    placeholder="Question Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-Question" className="form-label">
                    Question
                </label>
                <input type="text" className="form-control"
                    id="wd-Question"
                    defaultValue={question}
                    placeholder="Placeholder Question"
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="wd-QuestionPoints" className="form-label">
                    Points
                </label>
                <input className="form-control"
                    id="wd-QuestionPoints"
                    type="number"
                    defaultValue={points}
                    placeholder="10"
                    onChange={(e) => setPoints(Number(e.target.value))}
                />
            </div>

            <div className="row">
                <div className="col mb-3 mt-2">
                    <label htmlFor="wd-quizgroup" className="form-label float-end">Question Type</label>
                </div>
                <div className="col mb-3">
                    <select id="wd-quizgroup" className="form-select"
                        onChange={(e) => setQuestionType((e.target.value))}>
                        <option selected value="Multiple Choice">Multiple Choice</option>
                        <option value="True False">True / False</option>
                        <option value="Fill In The Blank">Fill In The Blank</option>
                    </select>
                </div>
            </div>

            

            {questionType === "Multiple Choice" &&
                
                (
                
                <>
                    <div className="mb-3">

                            <label className="form-label">
                                Multiple Choice Options (These Will Be Incorrect Answers) (Click Enter To Save An Option):
                            </label>
                            <input type="text" className="form-control"
                                id="wd-Question"
                                defaultValue={currentPossibleAnswer}
                                placeholder="placeholder incorrect answer"
                                onChange={(e) => { setCurrentPossibleAnswer(e.target.value) }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && currentPossibleAnswer.trim()) {
                                        setPossibleAnswers([...possibleAnswers, currentPossibleAnswer.trim().toLowerCase()]);
                                        setCurrentPossibleAnswer("");
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className="mb-3">

                            <label className="form-label">
                                Multiple Choice Answers (These Will Be Correct Answers) (Click Enter To Save An Answer):
                            </label>
                            <input type="text" className="form-control"
                                id="wd-Question"
                                defaultValue={currentCorrectAnswer}
                                placeholder="placeholder correct answer"
                                onChange={(e) => { setCurrentCorrectAnswer(e.target.value) }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && currentCorrectAnswer.trim()) {
                                        setCorrectAnswers([...correctAnswers, currentCorrectAnswer.trim().toLowerCase()]);
                                        setCurrentCorrectAnswer("");
                                        e.preventDefault();
                                    }
                                }}
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-10">
                            {(possibleAnswers.length > 0 || correctAnswers.length > 0) &&
                                possibleAnswers.concat(correctAnswers)
                                    //.filter((assignment: any) => assignment.course === cid)
                                    .map((answer: any) => (
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio"
                                                name="gridRadios" id="r3"
                                                value={answer} />
                                            <label className="form-check-label" htmlFor="r3">
                                                {answer}
                                            </label>
                                        </div>
                                    ))
                            }
                                                    
                            </div>
                        </div>
                    </>
                )
            }
                                    
            {questionType === "True False" &&
                (
                    <>
                        <h6>Select The Correct Answer:</h6>
                        <div className="row mb-3">
                                            
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        name="gridRadios" id="r3" value="True"
                                        onClick={() => setCorrectAnswers(["True"])} />
                                    <label className="form-check-label" htmlFor="r3">
                                        True
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio"
                                        name="gridRadios" id="r3" value="False"
                                        onClick={() => setCorrectAnswers(["False"])} />
                                    <label className="form-check-label" htmlFor="r3">
                                        False
                                    </label>
                                </div>
                                                  
                                                    
                            </div>
                        </div>
                    </>
                )
            }
                                    
            {questionType === "Fill In The Blank" &&
                (
                    <>
                        <div className="mb-3">

                            <label className="form-label">
                                Fill In The Blank Answers (Click Enter To Save An Answer):
                            </label>
                            <input type="text" className="form-control"
                                id="wd-Question"
                                defaultValue={currentCorrectAnswer}
                                placeholder="placeholder answer"
                                onChange={(e) => { setCurrentCorrectAnswer(e.target.value) }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && currentCorrectAnswer.trim()) {
                                        setCorrectAnswers([...correctAnswers, currentCorrectAnswer.trim().toLowerCase()]);
                                        setCurrentCorrectAnswer("");
                                        e.preventDefault(); // Prevent default form submission behavior
                                    }
                                }}
                            />
                    </div>
                    <div className="mb-3">
                        Currently Accepted Answers:
                    </div>
                    <div className="row mb-3">
                            <div className="col-sm-10">
                            { correctAnswers.length > 0 &&
                                correctAnswers
                                    //.filter((assignment: any) => assignment.course === cid)
                                    .map((answer: any) => (
                                        <div className="form-check">
                                            
                                            <label className="form-check-label" >
                                                {answer}
                                            </label>
                                        </div>
                                    ))
                            }
                                                    
                            </div>
                        </div>
                    </>
                )
            }

            <button className="btn btn-warning"
                onClick={() => { removeAllAnswers() }}>
                Clear All Answers
            </button>


            <div className="row">
                <div className="col mb-3 float-end">
                        
                    <button type="button" className="btn btn-danger float-end ms-3"
                        onClick={handleQuizQuestionChanges}>
                        Save
                    </button>
                   
                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quizIdFromPath}/edit/questions`}>
                        <button type="button" className="btn btn-secondary float-end">Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}