const routes = [
  {
    path: "/login",
    component: () => import("layouts/IndexLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
      },
    ],
  },

  {
    path: "/students",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      { path: "", component: () => import("pages/StudentsPage.vue") },
      {
        path: ":id",
        component: () => import("pages/StudentPage.vue"),
        children: [
          { path: "", component: () => import("components/UpdateStudent.vue") },
          {
            path: "report",
            component: () => import("components/StudentReport.vue"),
          },
        ],
      },
    ],
  },

  {
    path: "/teachers",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      { path: "", component: () => import("pages/TeachersPage.vue") },
      { path: ":id", component: () => import("pages/TeacherPage.vue") },
    ],
  },

  {
    path: "/class-rooms",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      { path: "", component: () => import("pages/ClassRoomsPage.vue") },
      { path: ":id", component: () => import("pages/ClassRoomPage.vue") },
    ],
  },

  {
    path: "/subjects",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      { path: "", component: () => import("pages/SubjectsPage.vue") },
      { path: ":id", component: () => import("pages/SubjectPage.vue") },
    ],
  },

  {
    path: "/levels",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      { path: "", component: () => import("pages/LevelsPage.vue") },
      { path: ":id", component: () => import("pages/LevelPage.vue") },
    ],
  },

  {
    path: "/grading-systems",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      { path: "", component: () => import("pages/GradingSystemsPage.vue") },
      { path: ":id", component: () => import("pages/GradingSystemPage.vue") },
    ],
  },

  {
    path: "/assessments",
    component: () => import("layouts/MainLayout.vue"),
    meta: { loginRequired: true },
    children: [
      { path: "", component: () => import("pages/AssessmentsPage.vue") },
      {
        path: ":id",
        component: () => import("pages/AssessmentPage.vue"),
        children: [
          {
            path: "",
            component: () => import("components/UpdateAssessment.vue"),
          },
          {
            path: "scores",
            component: () => import("components/AssessmentScores.vue"),
          },
        ],
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
