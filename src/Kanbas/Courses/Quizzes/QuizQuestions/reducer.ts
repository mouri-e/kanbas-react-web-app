import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizQuestions: [],
};
const quizQuestionsSlice = createSlice({
    name: "quizQuestions",
    initialState,
    reducers: {
        setQuizQuestions: (state, action) => {
            state.quizQuestions = action.payload;
        },

        addQuizQuestion: (state, { payload: quizQuestion }) => {
            const newQuizQuestion: any = {
                _id: quizQuestion._id,
                course: quizQuestion.course,
                quiz: quizQuestion.quiz,
                question: quizQuestion.question,
                points: quizQuestion.points,
                questionType: quizQuestion.questionType,
                possibleAnswers: quizQuestion.possibleAnswers,
                correctAnswers: quizQuestion.correctAnswers,

            };
            state.quizQuestions = [...state.quizQuestions, newQuizQuestion] as any;
        },
        
        deleteQuizQuestion: (state, { payload: quizQuestionId }) => {
            state.quizQuestions = state.quizQuestions.filter(
                (q: any) => q._id !== quizQuestionId);
        },
        updateQuizQuestion: (state, { payload: quizQuestion }) => {
            state.quizQuestions = state.quizQuestions.map((q: any) =>
                q._id === quizQuestion._id ? quizQuestion : q
            ) as any;
        },
        editQuizQuestion: (state, { payload: quizQuestionId }) => {
            state.quizQuestions = state.quizQuestions.map((q: any) =>
                q._id === quizQuestionId ? { ...q, editing: true } : q
            ) as any;
        },
    },
});
export const { addQuizQuestion, deleteQuizQuestion,
    updateQuizQuestion, editQuizQuestion, setQuizQuestions } =
  quizQuestionsSlice.actions;
export default quizQuestionsSlice.reducer;
