import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen">
        <h3>Sign in</h3>
        <input placeholder="username" className="wd-username form-control mb-2"/>
        <input className="wd-password form-control mb-2" placeholder="password" type="password" />
        <Link id="wd-signin-btn" to="/Kanbas/Dashboard" className="btn btn-primary w-100"> Sign in </Link>
        <Link  id="wd-signup-link" to="/Kanbas/Account/Signup"> Sign up </Link>
    </div>
);
}
