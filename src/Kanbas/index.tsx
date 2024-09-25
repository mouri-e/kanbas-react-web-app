import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";

export default function Kanbas() {
  return (
    <div id="wd-kanbas">
        <table>
            <tr>
                <td valign="top">
                    <KanbasNavigation />
                </td>
                <td valign="top">
                    <h1>Kanbas</h1>
                    <Routes>
                        <Route path="/" element={<Navigate to="Account" />} />
                        <Route path="/Account/*" element={<Account />} />
                        <Route path="/Dashboard" element={<Dashboard />} />
                        <Route path="/Courses/:cid/*" element={<Courses />} />
                        <Route path="/Calendar" element={<h1>Calendar</h1>} />
                        <Route path="/Inbox" element={<h1>Inbox</h1>} />
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
            <a href="https://a1--kanbas-react-web-app-fall-24-mouri.netlify.app/#/Kanbas/Account/Signin">
            Kanbas Link
            </a>
        </h4>
        <h4>
            <a href="https://github.com/mouri-e/kanbas-react-web-app/tree/a1">
                GitHub Repository: Assignment 1
            </a>
        </h4>
    </div>
);}

  