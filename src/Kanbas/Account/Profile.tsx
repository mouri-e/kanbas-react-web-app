import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
        <h3>Profile</h3>
        <input defaultValue="alice" placeholder="username" className="wd-username form-control mb-2"/>
        <input defaultValue="123"   placeholder="password" type="password" className="wd-password form-control mb-2" />
        
        <input defaultValue="Alice" placeholder="First Name" id="wd-firstname" className="form-control mb-2"/>
        <input defaultValue="Wonderland" placeholder="Last Name" id="wd-lastname" className="form-control mb-2"/>
        <input defaultValue="mm/dd/yyyy" type="date" id="wd-dob" className="form-control mb-2" />
        <input defaultValue="alice@wonderland" type="email" id="wd-email" className="form-control mb-2"/>
        <select defaultValue="FACULTY" id="wd-role" className="form-select mb-2">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
        </select>
        <Link to="/Kanbas/Account/Signin" className="form-control bg-danger text-white text-decoration-none text-center">Signout</Link>
    </div>
);}
