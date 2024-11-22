import { Link } from "react-router-dom";
import { deleteAssignment } from "./reducer";
import { useDispatch } from "react-redux";

export default function AssignmentDeleter(
    {
        assignmentIDBeingDeleted,
        cid
    }:
        {
            assignmentIDBeingDeleted: string;
            cid: any;
        }
) {
    const dispatch = useDispatch();
    return (
        <div id={"wd-delete-assignment-dialog" + assignmentIDBeingDeleted}
            className="modal fade"
            data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Are You Sure You Want To Delete This Assignment?
                        </h1>
                        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </Link >
                    </div>
                    <div className="modal-footer">
                        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>
                        </Link>
                        <Link to={`/Kanbas/Courses/${cid}/Assignments`}>
                            <button onClick={() => dispatch(deleteAssignment(assignmentIDBeingDeleted))}    type="button" data-bs-dismiss="modal" className="btn btn-danger">
                                Yes
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
