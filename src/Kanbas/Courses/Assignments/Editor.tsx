import { useLocation, useParams } from "react-router";
import { FaRegCalendarAlt } from "react-icons/fa";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const assignmentID = pathname.split("/")[5];
    const assignmentsLink = pathname.split("/").slice(0, -1).join('/');
    console.log("This is the one you're looking for:" + assignmentID);

    const assignments = db.assignments;
    return (
        <div>
            {assignments.filter((assignment: any) => (assignment.course === cid && assignment._id === assignmentID))
                .map((assignment: any) => (
                    <div key={assignmentID } id="wd-assignments-editor">
            
                        <div className="mb-3">
                            <label htmlFor="wd-name" className="form-label">
                                Assignment Name
                            </label>
                            <input type="text" className="form-control"
                                id="wd-name" value={assignment.title} />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" id="wd-description" rows={11}>
                                {assignment.description}
                            </textarea>
                        </div>

                        <div className="row">
                            <div className="col mb-3 mt-2">
                                <label htmlFor="wd-points" className="form-label float-end">Points</label>
                            </div>
                            <div className="col mb-3">
                                <input id="wd-points" className="form-control" value={assignment.points} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3 mt-2">
                                <label htmlFor="wd-group" className="form-label float-end">Assignment Group</label>
                            </div>
                            <div className="col mb-3">
                                <select id="wd-group" className="form-select">
                                    <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
                                    <option value="QUIZZES">QUIZZES</option>
                                    <option value="EXAMS">EXAMS</option>
                                    <option value="PROJECTS">PROJECTS</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3 mt-2">
                                <label className="form-label float-end" htmlFor="wd-display-grade-as">Display Grade as</label>
                            </div>
                            <div className="col mb-3">
                                <select id="wd-display-grade-as" className="form-select">
                                    <option selected value="Percentage">Percentage</option>
                                    <option value="Fraction">Fraction</option>
                                </select>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3 mt-2">
                                <label className="form-label float-end" htmlFor="wd-submission-type">Submission Type</label>
                    
                            </div>
                            <div className="col mb-3 border border-gray rounded pt-2">
                                <select id="wd-submission-type" className="form-select mt-2">
                                    <option selected value="Online">Online</option>
                                </select>
                                <label className="fw-bold mb-3 mt-3">Online Entry Options</label>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox"
                                        id="text-entry" />
                                    <label className="form-check-label" htmlFor="text-entry">
                                        Text Entry
                                    </label>
                                </div>
                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox"
                                        id="website-url" />
                                    <label className="form-check-label" htmlFor="website-url">
                                        Website URL
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox"
                                        id="media-recordings" />
                                    <label className="form-check-label" htmlFor="media-recordings">
                                        Media Recordings
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox"
                                        id="student-annotation" />
                                    <label className="form-check-label" htmlFor="student-annotation">
                                        Student Annotation
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox"
                                        id="file-upload" />
                                    <label className="form-check-label" htmlFor="file-upload">
                                        File Uploads
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3 mt-2">
                                <label className="form-label float-end mt-2" htmlFor="wd-assign">Assign</label>
                            </div>
                            <div className="col mb-5 border border-gray rounded pt-2">
                                <label className="fw-bold mb-1 mt-2">Assign to</label>
                                <input id="wd-points" className="form-control mb-3" value={"Everyone"} />

                                <label htmlFor="wd-due-date" className="fw-bold mb-1">Due</label>
                                <input id="wd-due-date" type="text" className="form-control mb-4" value={assignment.due} />
                
                                <div className="row">
                                    <div className="col mb-1">
                                        <label htmlFor="wd-available-from" className="fw-bold mb-1">Available from</label>
                            
                                    </div>
                                    <div className="col mb-1">
                                        <label htmlFor="wd-available-until" className="fw-bold mb-1">Until</label>
                            
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col mb-3">
                                        <input className="form-control mb-3" id="wd-available-from" type="text" value={assignment.available} />
                                        
                                    </div>
                                    <div className="col mb-3">
                                        <input className="form-control mb-3" id="wd-available-until" type="text" value={assignment.closedOn} />
                                        
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr />
                        <div className="row">
                
                            <div className="col mb-3 float-end">
                                <Link to={assignmentsLink}>
                                    <button type="button" className="btn btn-danger float-end">Save</button>
                                </Link>
                                <Link to={assignmentsLink}>
                                    <button type="button" className="btn btn-secondary float-end">Cancel</button>
                                </Link>
                            </div>
                        </div>

                        <table align="right">
                            <tr>
                                <td align="right" valign="top">
                        
                                </td>
                            </tr>
                        </table>
            
                    </div>
                ))
            }
        </div>
    );
}
  