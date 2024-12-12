import { BsPlusLg } from "react-icons/bs";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { BiBlock } from "react-icons/bi";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { deleteQuiz } from "./reducer";
import { FaTrash } from "react-icons/fa";

function QuizzesContextMenu(
    { quizId, 

    }:
    {
    quizId: any;
    })
{
    
    const { cid } = useParams();
    const dispatch = useDispatch();
    const removeQuiz = async (quizId: string) => {
        await client.deleteQuiz(quizId);
        dispatch(deleteQuiz(quizId));
    };
    
    return (
        <div className="mb-5">
            {/** If quiz is published */}
            <GreenCheckmark />
            {/** If quiz is not published */}
            {/**<BiBlock />*/}
            {/** On Click drop down for edit delete and publish 
            <IoEllipsisVertical className="fs-4" />
            */}

            <div className="dropdown d-inline me-1 float-end">
                <IoEllipsisVertical className="fs-4 dropdown-toggle" data-bs-toggle="dropdown"/>
                
                <ul className="dropdown-menu">
                    <li>
                        <a id="wd-publish-all-modules-and-items-btn" className="dropdown-item"
                            href={`#/Kanbas/Courses/${cid}/Quizzes/${quizId}/edit/details`}>
                            <GreenCheckmark />
                            Edit
                        </a>
                    </li>
                    <li>
                        <a id="wd-publish-modules-only-button" className="dropdown-item"
                            href={`#/Kanbas/Courses/${cid}/Quizzes`}
                            onClick={async () => { removeQuiz(quizId) }}>
                            <FaTrash className="text-danger mb-6 me-3"/>
                            Delete
                        </a>
                    </li>
                    <li>
                        <a id="wd-unpublish-all-modules-and-items" className="dropdown-item" href={`#/Kanbas/Courses/${cid}/Quizzes`}>
                            <GreenCheckmark />
                            Publish  <BiBlock />
                            Unpublish
                        </a>
                    </li>
                   
                </ul>
            </div>
        </div>
    );
}
export default QuizzesContextMenu;
