import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
// #/api/courses/:courseId/quizzes/:quizId/edit/questions
export const findQuestionsForQuiz = async (courseId: string, quizId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/quizzes/${quizId}/edit/questions`);
  return response.data;
};

export const createQuestionForQuiz = async (courseId: string, quizId: string, quiz: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/quizzes/${quizId}/edit/questions`,
    quiz
  );
  return response.data;
};

// #/api/quizzes/:quizId/edit/questions/:questionId
export const deleteQuizQuestion = async (quizId: string, questionId: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}/edit/questions/${questionId}`);
  return data;
};
export const updateQuizQuestion = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quizId}/edit/questions/${question._id}`, question);
  return data;
};
