import { BsGripVertical, BsPlusLg } from "react-icons/bs";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { RiArrowDropDownFill } from 'react-icons/ri'
import LessonControlButtons from "../Modules/LessonControlButtons";
import { RiDraftLine } from 'react-icons/ri'
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControlButtons /><br />
      
      <ul id="wd-modules" className="list-group mt-5 rounded-0">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <RiArrowDropDownFill />
            <div className="d-inline">ASSIGNMENTS</div>
            <div className="d-inline float-end">
              <div className="border p-2 rounded d-inline"> 40% of Total </div>
              <BsPlusLg className="position-relative me-2 " style={{ bottom: "1px" }} />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a className="wd-assignment-link text-black text-decoration-none"
                href="#/Kanbas/Courses/1234/Assignments/123">
              
                <div className="row">
                  <div className="col-1 mt-4">
                    <BsGripVertical className="me-2 fs-3" />
                    <RiDraftLine className="me-2 fs-3" />
                  </div>
                  <div className="col-10">
                  
                    A1
                  
                    <br />
                    <div className="text-danger d-inline">Multiple Modules</div> | <b>Not available until</b> May 6 at 12:00am |
                    <div className="">
                      <b> Due</b> May 13 at 11:59pm | 100 pts
                    </div>
                  </div>
                  <div className="col-1 mt-4">
                    <LessonControlButtons />
                  </div>
                
                
                </div>
              
              </a>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a className="wd-assignment-link text-black text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/123">
                <div className="row">
                  <div className="col-1 mt-4">
                    <BsGripVertical className="me-2 fs-3" />
                    <RiDraftLine className="me-2 fs-3" />
                  </div>
                  <div className="col-10">
                  
                    A2
                  
                    <br />
                    <div className="text-danger d-inline">Multiple Modules</div> | <b>Not available until</b> May 13 at 12:00am |
                    <div>
                      <b> Due</b> May 20 at 11:59pm | 100 pts
                    </div>
                  
                  </div>
                  <div className="col-1 mt-4">
                    <LessonControlButtons />
                  </div>
                </div>
              </a>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a className="wd-assignment-link text-black text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/123">
                <div className="row">
                
                  <div className="col-1 mt-4">
                    <BsGripVertical className="me-2 fs-3" />
                    <RiDraftLine className="me-2 fs-3" />
                  </div>
                  <div className="col-10">
                  
                    A3
                    <div></div>
                    <div className="text-danger d-inline mt-3">Multiple Modules</div> | <b>Not available until</b> May 20 at 12:00am |
                    <div className="">
                      <b> Due</b> May 27 at 11:59pm | 100 pts
                    </div>
                  
                  </div>
                  <div className="col-1 mt-4">
                    <LessonControlButtons />
                  </div>
                
                </div>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}