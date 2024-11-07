import { BsPlusLg } from "react-icons/bs";
import { RxMagnifyingGlass } from 'react-icons/rx'
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import AssignmentEditor from "./Editor";

export default function AssignmentControlButtons(

    
) {
    const { currentAssignments } = useSelector((state: any) => state.assignmentReducer);
    const { cid } = useParams();
    return (
        <div className="mb-5">
            <div className="d-inline">
                <RxMagnifyingGlass/>
                <input id="wd-search-assignment" style={{ width: "300px" }} className="form-control-lg d-inline" placeholder="Search..." />
            </div>
            <Link to={`/Kanbas/Courses/${cid}/Assignments/`}>
            <button id="wd-add-assignment" className="btn btn-lg btn-danger float-end d-inline">
                <BsPlusLg className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </button>
            </Link>

            <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary float-end d-inline">
                <BsPlusLg className="position-relative me-1" style={{ bottom: "1px" }} />
                Group
            </button>
        </div>
    );
}

