import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const fetchProfile = () => {
        if (!currentUser) return navigate("/Kanbas/Account/Signin");
        setProfile(currentUser);
    };
    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/Kanbas/Account/Signin");
    };




    const [username, setUsername] = useState(currentUser?.username);
    const [password, setPassword] = useState(currentUser?.password);
    const [firstName, setFirstName] = useState(currentUser?.firstName);
    const [lastName, setLastName] = useState(currentUser?.lastName);
    const [email, setEmail] = useState(currentUser?.email);
    const [DOB, setDOB] = useState(currentUser?.dob);
    const [role, setRole] = useState(currentUser?.role);
    

    const updateProfile = async () => {
        const newProfile = {
            ...currentUser,
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email,
            DOB: DOB,
            role: role

            };
        const updatedProfile = await client.updateUser(newProfile);
        dispatch(setCurrentUser(updatedProfile));
    };



    //edited for console
    useEffect(() => { fetchProfile(); }, []);

    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {currentUser && (
                <div>
                    <input defaultValue={username} id="wd-username" className="form-control mb-2"
                        onChange={(e) => setUsername(e.target.value)} />
                    <input defaultValue={password} id="wd-password" className="form-control mb-2"
                        onChange={(e) => setPassword(e.target.value )} />
                    <input defaultValue={firstName} id="wd-firstname" className="form-control mb-2"
                        onChange={(e) => setFirstName(e.target.value )} />
                    <input defaultValue={lastName} id="wd-lastname" className="form-control mb-2"
                        onChange={(e) => setLastName(e.target.value)} />
                    <input defaultValue={DOB} id="wd-dob" className="form-control mb-2"
                        onChange={(e) => setDOB(e.target.value)} type="date" />
                    <input defaultValue={email} id="wd-email" className="form-control mb-2"
                        onChange={(e) => setEmail(e.target.value )} />
                    <select onChange={(e) => setRole(e.target.value)}
                        className="form-control mb-2" id="wd-role">
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                        <option value="FACULTY">Faculty</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
                    <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
