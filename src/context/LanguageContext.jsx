import { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    // Common
    appName: 'School Portal',
    tagline: 'Student, Parent & Teacher Portal',
    welcome: 'Welcome',
    welcomeBack: 'Welcome back',
    login: 'Login',
    logout: 'Logout',
    signIn: 'Sign In',
    email: 'Email',
    password: 'Password',
    loading: 'Loading...',
    viewAll: 'View all',
    search: 'Search...',
    noData: 'No data',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    actions: 'Actions',
    status: 'Status',
    date: 'Date',
    action: 'Action',

    // Navigation
    dashboard: 'Dashboard',
    myClasses: 'My Classes',
    timetable: 'Timetable',
    attendance: 'Attendance',
    assignments: 'Assignments',
    exams: 'Exams',
    results: 'Results',
    fees: 'Fees',
    library: 'Library',
    announcements: 'Announcements',
    notifications: 'Notifications',
    profile: 'Profile',
    settings: 'Settings',
    myChildren: 'My Children',
    mySubjects: 'My Subjects',
    myProfile: 'My Profile',
    messages: 'Messages',
    students: 'Students',
    marks: 'Marks',
    marksLabel: 'Marks',
    attendanceLabel: 'Attendance',
    assignmentsLabel: 'Assignments',
    examsLabel: 'Exams',
    dashboardLabel: 'Dashboard',
    classLabel: 'Class',
    schedule: 'Schedule',
    currentGrade: 'Current Grade',
    teacherName: 'Teacher',
    profileSettings: 'Profile Settings',
    markAsRead: 'Mark as Read',
    markAllAsRead: 'Mark All as Read',
    viewAllNotifications: 'View All Notifications',
    deleteNotification: 'Delete Notification',
    typeMessage: 'Type a message...',
    send: 'Send',
    online: 'Online',
    offline: 'Offline',
    myMessages: 'My Messages',
    changeLanguage: 'Change Language',
    backToHome: 'Back to Home',
    register: 'Register',
    submit: 'Submit',
    fullName: 'Full Name',
    yourMessage: 'Your Message',
    contactInfo: 'Contact Info',
    sendMessage: 'Send Message',
    visitUs: 'Visit Us',
    schoolHours: 'School Hours',
    quickLinks: 'Quick Links',
    allRightsReserved: 'All rights reserved',
    ourStory: 'Our Story',
    ourValues: 'Our Values',
    ourJourney: 'Our Journey',
    joinCommunity: 'Join Our Community',
    startYourJourney: 'Start Your Journey',
    academicPrograms: 'Academic Programs',
    schoolNews: 'School News',
    schoolEvents: 'School Events',
    ourFacilities: 'Our Facilities',
    ourTeachers: 'Our Teachers',
    readMore: 'Read More',
    learnMoreAbout: 'Learn More',
    alreadyHaveAccount: 'Already have an account?',
    createNewAccount: 'Create a New Account',
    currentPasswordLabel: 'Current Password',
    newPasswordLabel: 'New Password',
    confirmPasswordLabel: 'Confirm Password',
    passwordChanged: 'Password changed successfully!',
    passwordReset: 'Password Reset!',
    checkYourEmail: 'Check Your Email',
    backToLogin: 'Back to Login',
    sendResetLink: 'Send Reset Link',
    myProfileTitle: 'My Profile',
    editProfile: 'Edit Profile',
    profileUpdated: 'Profile updated successfully!',
    profileUpdateFailed: 'Failed to update profile',
    account: 'Account',
    security: 'Security',
    changePasswordTitle: 'Change Password',
    passwordChangedSuccess: 'Password changed successfully!',
    oldPassword: 'Current Password',
    name: 'Name',
    role: 'Role',
    notificationsTitle: 'Notifications',
    unreadCount: 'unread notifications',
    noNotifications: 'No notifications found',
    justNow: 'Just now',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    all: 'All',
    read: 'Read',
    new: 'New',
    deleteItem: 'Delete',
    confirmDelete: 'Delete notification',
    onlineUsers: 'online',
    studentsInClass: 'No students in this class',
    searchStudents: 'Search students...',
    section: 'Section',
    roll: 'Roll',
    home: 'Home',
    about: 'About',
    programs: 'Programs',
    news: 'News',
    events: 'Events',
    gallery: 'Gallery',
    contact: 'Contact',

    // Student Dashboard
    hello: 'Hello',
    todayClasses: "Today's Classes",
    upcoming: 'Upcoming',
    attendanceRate: 'Attendance',
    gpa: 'GPA',

    // Public
    welcomeToSchool: 'WELCOME TO OUR SCHOOL',
    schoolMotto: 'Knowledge • Discipline • Future',
    applyNow: 'Apply Now',
    learnMore: 'Learn More',
    schoolIntro: 'Providing quality education for a brighter future',

    // Auth
    demoAccounts: 'Demo Accounts',
    forgotPassword: 'Forgot Password?',
    resetPassword: 'Reset Password',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',

    // Roles
    student: 'Student',
    teacher: 'Teacher',
    parent: 'Parent',
    admin: 'Administrator',

    // Common labels
    pendingAssignments: 'Assignments',
    upcomingExams: 'Upcoming Exams',
    recentAnnouncements: 'Recent Announcements',
    feeInvoices: 'Fee Invoices',
    paymentHistory: 'Payment History',
    myBorrowedBooks: 'My Borrowed Books',
    availableBooks: 'Available Books',
    searchBooks: 'Search books...',
    book: 'Book',
    textbook: 'Textbook',
    examDate: 'Exam Date',
    totalMarks: 'Total Marks',
    teacherLabel: 'Teacher',
    subject: 'Subject',
    class: 'Class',
    room: 'Room',
    studentId: 'Student ID',
    dateOfBirth: 'Date of Birth',
    phone: 'Phone',
    address: 'Address',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    bloodGroup: 'Blood Group',
    attendanceRateLabel: 'Attendance Rate',
    present: 'Present',
    absent: 'Absent',
    late: 'Late',
    excused: 'Excused',
    rate: 'Rate',
    total: 'Total',
    dueDate: 'Due Date',
    invoice: 'Invoice',
    amount: 'Amount',
    paid: 'Paid',
    outstanding: 'Outstanding',
    receipt: 'Receipt',
    method: 'Method',
    invoiceNo: 'Invoice No',
    feeType: 'Fee Type',
    issued: 'Issue Date',
    fine: 'Fine',
    noClasses: 'No classes assigned yet',
    noTeachers: 'No teachers found',
    noBooks: 'No books found',
    noExams: 'No exams scheduled',
    noAssignments: 'No assignments available',
    noStudents: 'No students found'
  },
  kh: {
    // Common
    appName: 'វិបផតថលសាលា',
    tagline: 'វិបផតថលសិស្ស មាតាបិតា និងគ្រូ',
    welcome: 'សូមស្វាគមន៍',
    welcomeBack: 'សូមស្វាគមន៍មកកាន់',
    login: 'ចូលប្រព័ន្ធ',
    logout: 'ចាកចេញ',
    signIn: 'ចូលប្រព័',
    email: 'អ៊ីមែល',
    password: 'ពាក្យសម្ងាត់',
    loading: 'កំពុងផ្ទុក...',
    viewAll: 'មើលទាំងអស់',
    noData: 'គ្មានទិន្នន័យ',
    save: 'រក្សាទុក',
    cancel: 'បោះបង់',
    delete: 'លុប',
    edit: 'កែប្រែ',
    actions: 'សកម្មភាព',
    status: 'ស្ថានភាព',
    date: 'កាលបរិច្ឆេទ',

    // Navigation
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    myClasses: 'ថ្នាក់របស់ខ្ញុំ',
    timetable: 'កាលវិភាគ',
    attendance: 'វត្តមាន',
    assignments: 'កិច្ចការផ្ទះ',
    exams: 'ការប្រឡង',
    results: 'លទ្ធផល',
    fees: 'ថ្លៃសិក្សា',
    library: 'បណ្ណាល័យ',
    announcements: 'សេចក្តីជូនដំណឹង',
    notifications: 'ការជូនដំណឹង',
    profile: 'ប្រវត្តិ',
    settings: 'ការកំណត់',
    myChildren: 'កូនរបស់ខ្ញុំ',
    mySubjects: 'មុខវិជ្ជា',
    myProfile: 'ប្រវត្តិរបស់ខ្ញុំ',
    messages: 'សារ',
    students: 'សិស្ស',
    home: 'ទំព័រដើម',
    about: 'អំពីសាលា',
    programs: 'កម្មវិធី',
    news: 'ព័ត៌មាន',
    events: 'ព្រឹត្តិការណ៍',
    gallery: 'វិចិត្រសាល',
    contact: 'ទំនាក់ទំនង',

    // Student Dashboard
    hello: 'ជំរាបសួរ',
    letClasses: "ថ្នាក់ថ្ងៃនេះ",
    upcoming: 'ពេលខាងមុន',
    attendanceRate: 'វត្តមាន',
    gpa: 'ចំណាត់មធ្យម',

    // Public
    welcomeToSchool: 'ស្វាគមន៍មកកាន់សាលារបស់យើង',
    schoolMotto: 'ចំណេះដឹង • វិន័យ • អនត្ត',
    applyNow: 'ដាក់ពាក្យឥឡូវនេ',

    // Auth
    demoAccounts: 'គណនីសាកល្បង',
    forgotPassword: 'ភ្លេចពាក្យសម្ងាត់?',
    resetPassword: 'កំណត់ពាក្យសម្ងាត់ឡើងវិញ',
    changePassword: 'ផ្លាស់ប្តូរ',
    currentPassword: 'ពាក្យសម្ងាត់បច្ចុប្បន្ន',
    newPassword: 'ពាក្យសម្ងាត់ថ្មី',
    confirmPassword: 'បញ្ជាក់ពាក្យសម្ងាត់',

    // Roles
    studentRole: 'សិស្ស',
    teacherRole: 'គ្រែ',
    parentRole: 'អាណាពើភាព',
    adminRole: 'អ្នកគ្រប់គ្រង'
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'kh' : 'en');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;