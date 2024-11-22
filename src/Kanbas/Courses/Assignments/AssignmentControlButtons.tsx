import { BsPlusLg } from "react-icons/bs";
import { RxMagnifyingGlass } from 'react-icons/rx';
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function AssignmentControlButtons() {
    const { cid } = useParams();
    
    return (
        <div className="mb-5">
            <div className="d-inline">
                <RxMagnifyingGlass/>
                <input id="wd-search-assignment" style={{ width: "300px" }} className="form-control-lg d-inline" placeholder="Search..." />
            </div>
            <Link
                to={`/Kanbas/Courses/${cid}/Assignments/new`}>
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

