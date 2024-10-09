export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <div className="mb-3">
                <label htmlFor="wd-name" className="form-label">
                    Assignment Name
                </label>
                <input type="text" className="form-control"
                    id="wd-name" value="A1" />
            </div>
            <div className="mb-3">
                <textarea className="form-control" id="wd-description" rows={10}>
                        The assignment is available online
                        Submit a link to the landing page of your Web application running on Netlify.
                        The landing page should include the following:
                        -Your full name and section
                        -Links to each of the lab assignments
                        -Link to the Kanbas application
                        -Links to all relevant source code repositories
                        The Kanbas application should include a link to navigate back to the landing page.
                </textarea>
            </div>

            <div className="row">
                <div className="col mb-3 mt-2">
                    <label htmlFor="wd-points" className="form-label float-end">Points</label>
                </div>
                <div className="col mb-3">
                    <input id="wd-points" className="form-control" value={100} />
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
                    <input id="wd-due-date" type="date" className="form-control mb-4" value="2024-05-13" />
                
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
                            <input className="form-control mb-3" id="wd-available-from" type="date" value="2024-05-06" />
                        </div>
                        <div className="col mb-3">
                            <input className="form-control mb-3" id="wd-available-until" type="date" value="2024-05-20" />
                        </div>
                    </div>
                </div>

            </div>
            <hr />
            <div className="row">
                
                <div className="col mb-3 float-end">
                    <button type="button" className="btn btn-danger float-end">Save</button>
                
                    <button type="button" className="btn btn-secondary float-end">Cancel</button>
                </div>
            </div>

            <table align="right">
                <tr>
                    <td align="right" valign="top">
                        
                    </td>
                </tr>
            </table>
            
        </div>
);}
  