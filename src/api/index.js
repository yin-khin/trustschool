import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "/api";
export const assetUrl = (fileName) => {
  if (!fileName) return null;
  const apiRoot = API_URL.replace(/\/$/, "").replace(/\/api$/, "");
  return `${apiRoot}/uploads/${fileName}`;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Auth
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  changePassword: (data) => api.put("/auth/change-password", data),
};

// Public site content
export const publicAPI = {
  getSite: () => api.get("/public/site"),
};

// Students
export const studentAPI = {
  getAll: (params) => api.get("/students", { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post("/students", data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
  getByClass: (classId) => api.get(`/students/class/${classId}`),
};

// Teachers
export const teacherAPI = {
  getAll: (params) => api.get("/teachers", { params }),
  getById: (id) => api.get(`/teachers/${id}`),
  create: (data) => api.post("/teachers", data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
  deletePhoto: (id) => api.delete(`/teachers/${id}/photo`),
};

// Classes
export const classAPI = {
  getAll: (params) => api.get("/classes", { params }),
  getById: (id) => api.get(`/classes/${id}`),
  create: (data) => api.post("/classes", data),
  update: (id, data) => api.put(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
  getSections: (id) => api.get(`/classes/${id}/sections`),
  createSection: (id, data) => api.post(`/classes/${id}/sections`, data),
  updateSection: (id, data) => api.put(`/classes/sections/${id}`, data),
  deleteSection: (id) => api.delete(`/classes/sections/${id}`),
};

// Subjects
export const subjectAPI = {
  getAll: (params) => api.get("/subjects", { params }),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post("/subjects", data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
};

// Attendance
export const attendanceAPI = {
  getAll: (params) => api.get("/attendance", { params }),
  getByClassAndDate: (classId, date) =>
    api.get(`/attendance/class/${classId}/date/${date}`),
  create: (data) => api.post("/attendance", data),
  update: (id, data) => api.put(`/attendance/${id}`, data),
  delete: (id) => api.delete(`/attendance/${id}`),
  getStudentReport: (studentId, params) =>
    api.get(`/attendance/student/${studentId}/report`, { params }),
};

// Exams
export const examAPI = {
  getAll: (params) => api.get("/exams", { params }),
  getById: (id) => api.get(`/exams/${id}`),
  create: (data) => api.post("/exams", data),
  update: (id, data) => api.put(`/exams/${id}`, data),
  delete: (id) => api.delete(`/exams/${id}`),
};

// Marks
export const markAPI = {
  getAll: (params) => api.get("/marks", { params }),
  getByExam: (examId) => api.get(`/marks/exam/${examId}`),
  create: (data) => api.post("/marks", data),
  update: (id, data) => api.put(`/marks/${id}`, data),
  delete: (id) => api.delete(`/marks/${id}`),
  getStudentResults: (studentId) =>
    api.get(`/marks/student/${studentId}/results`),
};

// Fees
export const feeAPI = {
  getAll: (params) => api.get("/fees", { params }),
  getById: (id) => api.get(`/fees/${id}`),
  create: (data) => api.post("/fees", data),
  update: (id, data) => api.put(`/fees/${id}`, data),
  delete: (id) => api.delete(`/fees/${id}`),
  getPayments: (params) => api.get("/fees/payments", { params }),
  createPayment: (data) => api.post("/fees/payments", data),
  getSummary: () => api.get("/fees/summary"),
};

// Library
export const libraryAPI = {
  getBooks: (params) => api.get("/library/books", { params }),
  getBook: (id) => api.get(`/library/books/${id}`),
  createBook: (data) => api.post("/library/books", data),
  updateBook: (id, data) => api.put(`/library/books/${id}`, data),
  deleteBook: (id) => api.delete(`/library/books/${id}`),
  getTransactions: (params) => api.get("/library/transactions", { params }),
  issueBook: (data) => api.post("/library/transactions", data),
  returnBook: (id, data) => api.put(`/library/transactions/${id}/return`, data),
  deleteTransaction: (id) => api.delete(`/library/transactions/${id}`),
};

// Announcements
export const announcementAPI = {
  getAll: (params) => api.get("/announcements", { params }),
  getById: (id) => api.get(`/announcements/${id}`),
  create: (data) => api.post("/announcements", data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
  deletePhoto: (id) => api.delete(`/announcements/${id}/photo`),
};

// Notifications
export const notificationAPI = {
  getAll: (params) => api.get("/notifications", { params }),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  markAllAsRead: () => api.put("/notifications/read-all"),
  delete: (id) => api.delete(`/notifications/${id}`),
};

// Timetables
export const timetableAPI = {
  getAll: (params) => api.get("/timetables", { params }),
  getById: (id) => api.get(`/timetables/${id}`),
  create: (data) => api.post("/timetables", data),
  update: (id, data) => api.put(`/timetables/${id}`, data),
  delete: (id) => api.delete(`/timetables/${id}`),
};

// Assignments
export const assignmentAPI = {
  getAll: (params) => api.get("/assignments", { params }),
  getById: (id) => api.get(`/assignments/${id}`),
  create: (data) => api.post("/assignments", data),
  update: (id, data) => api.put(`/assignments/${id}`, data),
  delete: (id) => api.delete(`/assignments/${id}`),
};

// Dashboard
export const dashboardAPI = {
  getStats: () => api.get("/dashboard/stats"),
  getEnrollment: () => api.get("/dashboard/enrollment"),
  getAttendanceStats: (params) =>
    api.get("/dashboard/attendance-stats", { params }),
  getRevenue: (params) => api.get("/dashboard/revenue", { params }),
  getClassCourses: () => api.get("/dashboard/class-distribution"),
  getRecentActivities: () => api.get("/dashboard/recent-activities"),
};

// Users
export const userAPI = {
  getAll: (params) => api.get("/users", { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post("/users", data),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Parents
export const parentAPI = {
  getAll: (params) => api.get("/parents", { params }),
  getById: (id) => api.get(`/parents/${id}`),
  create: (data) => api.post("/parents", data),
  update: (id, data) => api.put(`/parents/${id}`, data),
  delete: (id) => api.delete(`/parents/${id}`),
  deletePhoto: (id) => api.delete(`/parents/${id}/photo`),
};

// Staff
export const staffAPI = {
  getAll: (params) => api.get("/staffs", { params }),
  getById: (id) => api.get(`/staffs/${id}`),
  create: (data) => api.post("/staffs", data),
  update: (id, data) => api.put(`/staffs/${id}`, data),
  delete: (id) => api.delete(`/staffs/${id}`),
  deletePhoto: (id) => api.delete(`/staffs/${id}/photo`),
};

export default api;
