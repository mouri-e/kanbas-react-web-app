import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { RiArrowDropDownFill } from 'react-icons/ri'
import LessonControlButtons from "../Modules/LessonControlButtons";
import { RiDraftLine } from 'react-icons/ri'
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import * as db from "../../Database";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState<any[]>(db.assignments);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  return (
    <div id="wd-assignments">
      {currentUser.role == "FACULTY" &&
        <AssignmentControlButtons />
      }
      <ul id="wd-modules" className="list-group rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <RiArrowDropDownFill />
            <div className="d-inline">ASSIGNMENTS</div>
            <div className="d-inline float-end">
              <div className="border p-2 rounded d-inline"> 40% of Total </div>
              {currentUser.role == "FACULTY" &&
                <>
                  <BsPlusLg className="position-relative me-2 " style={{ bottom: "1px" }} />
                  <IoEllipsisVertical className="fs-4" />
                </>
              }
            </div>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1">
                  
                  
                  <a className="wd-assignment-link text-black text-decoration-none"
                    href={`#/Kanbas/Courses/${cid}/Assignments${currentUser.role === "FACULTY" ?
                      ("/" + assignment._id) : ""}`}>
                  
                      <div className="row">
                        <div className="col-1 mt-4">
                          <BsGripVertical className="me-2 fs-3" />
                          <RiDraftLine className="me-2 fs-3" />
                        </div>
                        <div className="col-10">
                          <h4 className="fw-bold">{assignment.title}</h4>
                        
                          <div className="text-danger d-inline">Multiple Modules</div> |
                          <b> Not available until</b> {assignment.available} |
                          <div className="">
                            <b> Due</b> {assignment.due} | {assignment.points} pts
                          </div>
                        </div>
                        <div className="col-1 mt-4">
                          {currentUser.role == "FACULTY" &&
                            <LessonControlButtons />
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