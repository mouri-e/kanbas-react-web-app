import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2>
            <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.png" width={250} height={160} alt="React Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">  CS1234 React JS </h5>
                                    <p className="wd-dashboard-course-title card-text">Full Stack software developer</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Start of the 7 Unique Classes*/}

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/Class2.png" width={250} height={160} alt="Class 2 Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 3500 </h5>
                                    <p className="wd-dashboard-course-title card-text">Object Oriented Design</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/Class3.jpg" width={250} height={160} alt="Class 3 Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 4400 </h5>
                                    <p className="wd-dashboard-course-title card-text">Programming Languages</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/Class4.png" width={250} height={160} alt="Class 4 Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 3000 </h5>
                                    <p className="wd-dashboard-course-title card-text">Algorithms and Data</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/Class5.png" width={250} height={160} alt="Class 5 Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 4550 </h5>
                                    <p className="wd-dashboard-course-title card-text">Web Development</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/Class6.png" width={250} height={160} alt="Class 6 Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 2500 </h5>
                                    <p className="wd-dashboard-course-title card-text">Fundamentals of Computer Science 1</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/Class7.png" width={250} height={160} alt="Class 7 Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 2510 </h5>
                                    <p className="wd-dashboard-course-title card-text">Fundamentals of Computer Science 2</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="wd-dashboard-course col" style={{ width: "270px" }}>
                        <div className="card rounded-3 overflow-hidden">
                            <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                                to="/Kanbas/Courses/1234/Home">
                                <img src="/images/Class8.png" width={250} height={160} alt="Class 8 Logo" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title"> CS 3200 </h5>
                                    <p className="wd-dashboard-course-title card-text">Database Design</p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

