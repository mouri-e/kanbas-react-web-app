import { useLocation, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const assignmentID = pathname.split("/")[5];
    const assignmentsLink = pathname.split("/").slice(0, -1).join('/');
    console.log("This is the one you're looking for:" + assignmentID);
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
   
  
    const { assignments } = useSelector((state: any) => state.assignmentReducer);
    const assignment = assignments.find(
        (assignment: any) => (assignment.course === cid && assignment._id === assignmentID));
    
    const [assignmentTitle, setAssignmentTitle] = useState(assignment?.title);
    const [assignmentDescription, setAssignmentDescription] = useState(assignment?.description);
    const [assignmentPoints, setAssignmentPoints] = useState(assignment?.points);
    const [assignmentDue, setAssignmentDue] = useState(assignment?.due);
    const [assignmentAvailable, setAssignmentAvailable] = useState(assignment?.available);
    const [assignmentClosedOn, setAssignmentClosedOn] = useState(assignment?.closedOn);
    

    const handleAssignmentChanges = () => {
        if (assignmentID === "new") {
            dispatch(addAssignment({
                ...assignment,
                _id: new Date().getTime().toString(),
                course: cid,
                title: assignmentTitle,
                decription: assignmentDescription,
                points: assignmentPoints,
                due: assignmentDue,
                available: assignmentAvailable,
                closedOn: assignmentClosedOn

            }));
        }
        else {
            dispatch(updateAssignment({
                ...assignment,
                course: cid,
                title: assignmentTitle,
                decription: assignmentDescription,
                points: assignmentPoints,
                due: assignmentDue,
                available: assignmentAvailable,
                closedOn: assignmentClosedOn
            }));
        }
        navigate(`/Kanbas/Courses/${cid}/Assignments`);
    }
    
    return (
        <div>
            <div id="wd-assignments-editor">
                <div className="mb-3">
                    <label htmlFor="wd-name" className="form-label">
                        Assignment Name
                    </label>
                    <input type="text" className="form-control"
                        id="wd-name"
                        defaultValue={assignmentTitle}
                        placeholder="Assignment Name"
                        onChange={(e) => setAssignmentTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" id="wd-description" rows={11}
                        defaultValue={assignmentDescription}
                        placeholder="Assignment Description"
                        onChange={(e) => setAssignmentDescription(e.target.value)}
                    >
                                
                    </textarea>
                </div>

                <div className="row">
                    <div className="col mb-3 mt-2">
                        <label htmlFor="wd-points" className="form-label float-end">Points</label>
                    </div>
                    <div className="col mb-3">
                        <input id="wd-points" className="form-control"
                            defaultValue={assignmentPoints}
                            placeholder="100"
                            onChange={(e) => setAssignmentPoints((e.target.value))}
                        />
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
                        <input id="wd-due-date" type="text" className="form-control mb-4"
                            defaultValue={assignmentDue}
                            placeholder="Assignment Due Date"
                            onChange={(e) => setAssignmentDue(e.target.value)}
                        />
                
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
                                <input className="form-control mb-3" id="wd-available-from" type="text"
                                    defaultValue={assignmentAvailable}
                                    placeholder="Assignment Available On"
                                    onChange={(e) => setAssignmentAvailable(e.target.value)}
                                />
                                        
                            </div>
                            <div className="col mb-3">
                                <input className="form-control mb-3" id="wd-available-until" type="text"
                                    defaultValue={assignmentClosedOn}
                                    placeholder="Assignment Closed On"
                                    onChange={(e) => setAssignmentClosedOn(e.target.value)}
                                />
                                        
                            </div>
                        </div>
                    </div>

                </div>
                <hr />
                <div className="row">
                
                    <div className="col mb-3 float-end">
                                
                        <button
                            onClick={handleAssignmentChanges}
                            type="button" className="btn btn-danger float-end">Save</button>
                                
                    
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
            )
        </div>
    );
}
  