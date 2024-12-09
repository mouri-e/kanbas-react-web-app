import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import Users from "./Users";

export default function Account() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);

    return (
        <div id="wd-account-screen">
            {/*<h2>Account</h2>*/}
            <table>
                <tr>
                    <td valign="top">
                        <AccountNavigation />
                    </td>
                    <td valign="top">
                        <Routes>
                            <Route path="/"
                                element={
                                    <Navigate to={
                                        currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin"
                                    } />
                                } />
                            <Route path="/Signin" element={<Signin />} />
                            <Route path="/Profile" element={<Profile />} />
                            <Route path="/Signup" element={<Signup />} />
                            <Route path="/Users" element={<Users />} />
                            <Route path="/Users/:uid" element={<Users />} />
                        </Routes>
                    </td>
                </tr>
            </table>
            <h4>This text is here because this is the landing page of
                my website and listed as required in the Canvas Assignment. This information is also listed
                in the Labs section of the website:</h4>
            <h4>Ethan Mouri</h4>
            <h4>Section 1</h4>
            <h4>
                <a href="https://project--kanbas-react-web-app-fall-24-mouri.netlify.app/#/Kanbas/Account/Signin">
                    Project Link: Kanbas With Quizzes
                </a>
            </h4>
            <h4>
                Team Name: Motivation Through Procrastination
            </h4>
            <h4>
                Team Members: Ethan Mouri
            </h4>
            <h4>
                <a href="https://github.com/mouri-e/kanbas-react-web-app/tree/project">
                    GitHub Repository (Netlify): Quizzes Project
                </a>
            </h4>
            <h4>
                <a href="https://github.com/mouri-e/kanbas-node-server-app/tree/project">
                    GitHub Repository (Render): Quizzes Project
                </a>
            </h4>
            
        </div>
    );
}
