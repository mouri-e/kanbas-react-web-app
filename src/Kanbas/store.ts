import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Dashboard/reducer";
import quizReducer from "./Courses/Quizzes/reducer";
import quizQuestionReducer from "./Courses/Quizzes/QuizQuestions/reducer";
const store = configureStore({
  reducer: {
        modulesReducer,
        accountReducer,
        assignmentReducer,
        enrollmentsReducer,
        quizReducer,
        quizQuestionReducer
  },
});
export default store;