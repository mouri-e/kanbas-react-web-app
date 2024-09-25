import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1> 
        <hr />
        <h2 id="wd-dashboard-published">Published Courses (12)</h2> 
        <hr />
        <div id="wd-dashboard-courses">
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/1234/Home">
                    <img src="/images/reactjs.png" width={200} alt="React Logo"/>
                    <div>
                        <h5>  CS1234 React JS </h5>
                        <p className="wd-dashboard-course-title">Full Stack software developer</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            {/* Start of the 7 Unique Classes*/}
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/3500/Home">
                    <img src="/images/Class2.png" width={200} alt="Class 2 Logo"/>
                    <div>
                        <h5> CS 3500 </h5>
                        <p className="wd-dashboard-course-title">Object Oriented Design</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/4400/Home">
                    <img src="/images/Class3.jpg" width={200} alt="Class 3 Logo"/>
                    <div>
                        <h5> CS 4400 </h5>
                        <p className="wd-dashboard-course-title">Programming Languages</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/3000/Home">
                    <img src="/images/Class4.png" width={200} alt="Class 4 Logo"/>
                    <div>
                        <h5> CS 3000 </h5>
                        <p className="wd-dashboard-course-title">Algorithms and Data</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/4550/Home">
                    <img src="/images/Class5.png" width={200} alt="Class 5 Logo"/>
                    <div>
                        <h5> CS 4550 </h5>
                        <p className="wd-dashboard-course-title">Web Development</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/2500/Home">
                    <img src="/images/Class6.png" width={200} alt="Class 6 Logo"/>
                    <div>
                        <h5> CS 2500 </h5>
                        <p className="wd-dashboard-course-title">Fundamentals of Computer Science 1</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/2510/Home">
                    <img src="/images/Class7.png" width={200} alt="Class 7 Logo"/>
                    <div>
                        <h5> CS 2510 </h5>
                        <p className="wd-dashboard-course-title">Fundamentals of Computer Science 2</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
            <div className="wd-dashboard-course">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Courses/3200/Home">
                    <img src="/images/Class8.png" width={200} alt="Class 8 Logo"/>
                    <div>
                        <h5> CS 3200 </h5>
                        <p className="wd-dashboard-course-title">Database Design</p>
                        <button> Go </button>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  );
}

