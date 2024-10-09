import { BsPlusLg } from "react-icons/bs";
import { RxMagnifyingGlass } from 'react-icons/rx'

export default function AssignmentControlButtons() {
    return (
        <>
            <div className="d-inline">
                <RxMagnifyingGlass/>
                <input id="wd-search-assignment" style={{ width: "300px" }} className="form-control-lg d-inline" placeholder="Search..." />
            </div>
            
            <button id="wd-add-assignment" className="btn btn-lg btn-danger float-end d-inline">
                <BsPlusLg className="position-relative me-2" style={{ bottom: "1px" }} />
                Assignment
            </button>

            <button id="wd-add-assignment-group" className="btn btn-lg btn-secondary float-end d-inline">
                <BsPlusLg className="position-relative me-1" style={{ bottom: "1px" }} />
                Group
            </button>
        </>
    );
}

