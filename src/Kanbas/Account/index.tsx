import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";

export default function Account() {
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
                        <Route path="/" element={<Navigate to="/Kanbas/Account/Signin" />} />
                        <Route path="/Signin" element={<Signin />} />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Signup" element={<Signup />} />
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
            <a href="https://a2--kanbas-react-web-app-fall-24-mouri.netlify.app/#/Kanbas/Account/Signin">
            Kanbas Link
            </a>
        </h4>
        <h4>
            <a href="https://github.com/mouri-e/kanbas-react-web-app/tree/a2">
                GitHub Repository: Assignment 2
            </a>
        </h4>
    </div>
  );
}
