import './App.css';
import { Routes, Route } from 'react-router-dom';
import { RegiserStudentpage } from './pages/registerStudentPage';
import { RegiserLecturerPage } from './pages/registerLecturePage';
import { LoginStudentPage } from './pages/loginStudentpage';
import { LoginLecturerPage } from './pages/loginLecturerPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { LecturerDashboardPage } from './pages/lecturerDashboardPage.js';
import { VerifyEmailPage } from './pages/verifyEmailPage.js';
import { CongratulationsPage } from './pages/congratualtionsPages.js';
import { ForgetPasswordRequestPage } from './pages/forgetPasswordRequestPage.js';
import { ForgetPwdTokenConfirmationPage } from './pages/forgetPwdTokenConfirmPage.js';
import { NewPwdCongratulationsPage } from './pages/newPwdCongratulations.js';
import { NewPassworPage } from './pages/NewPasswordPage.js';
import { AssignmentCreationPage } from './pages/assignmentCreationPage.js';
import { AddTaskPage } from './pages/addTaskPage.js';
import { CongratulationsAssignmentPage } from './pages/congratulationAssignment.js';
import { CongratulationsTaskPage } from './pages/congratsTasksPage.js';
function App() {
  return (
    <Routes>
        <Route path="/auth/register/student"  element={ <RegiserStudentpage />} />
        <Route path="/auth/register/lecturer" element={ <RegiserLecturerPage />} />
        <Route path='/auth/login/student'   element={<LoginStudentPage />} />
        <Route path="/auth/login/lecturer"    element = {<LoginLecturerPage />} />
        <Route path="/student/dashboard" element = { <StudentDashboard />} />
        <Route path="/lecturer/dashboard" element = { <LecturerDashboardPage />} />
        <Route path="/auth/verify/email"  element ={<VerifyEmailPage />} />
        <Route path="/user/congratulations"  element ={<CongratulationsPage />} />
        <Route path="/user/request/password-reset"  element ={<ForgetPasswordRequestPage />} />
        <Route path="/user/request/password-reset/confirm-token"  element ={<ForgetPwdTokenConfirmationPage />} />
        <Route path="/user/new-password" element={<NewPassworPage />} />
        <Route path="/user/congratulations/new-password" element={<NewPwdCongratulationsPage />} />
        <Route path='/lecturer/create/assignment' element = {<AssignmentCreationPage />} />
        <Route path='/lecturer/assingment/congrats' element = {<CongratulationsAssignmentPage />} />
        <Route path='/lecturer/add/task' element = {<AddTaskPage />} />
        <Route path='/lecturer/task/congrats' element = {<CongratulationsTaskPage />} />
    </Routes>
  )
}

export default App;
