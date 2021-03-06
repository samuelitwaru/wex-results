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
    meta: {
      name: "home",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher"],
    },
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
    meta: {
      name: "students",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher", "teacher"],
    },
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
            meta: {
              loginRequired: true,
              groupsRequired: ["dos", "head_teacher", "teacher"],
            },
          },
        ],
      },
    ],
  },

  {
    path: "/teachers",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "teachers",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher"],
    },
    children: [
      { path: "", component: () => import("pages/TeachersPage.vue") },
      { path: ":id", component: () => import("pages/TeacherPage.vue") },
    ],
  },

  {
    path: "/class-rooms",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "class-rooms",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher", "teacher"],
    },
    children: [
      {
        path: "",
        component: () => import("pages/ClassRoomsPage.vue"),
        // meta: {
        //     groupsRequired: ["dos", "head_teacher"],
        // },
      },
      {
        path: ":id",
        component: () => import("pages/ClassRoomPage.vue"),
        children: [
          {
            path: "",
            component: () => import("components/UpdateClassRoom.vue"),
            meta: {
              groupsRequired: ["dos", "head_teacher"],
            },
          },
          {
            path: "reports",
            component: () => import("components/ClassRoomReports.vue"),
          },
          {
            path: "students",
            component: () => import("components/ClassRoomStudents.vue"),
          },
          {
            path: "promotions",
            component: () => import("components/ClassRoomPromotions.vue"),
          },
        ],
      },
    ],
  },

  {
    path: "/subjects",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "subjects",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher"],
    },
    children: [
      { path: "", component: () => import("pages/SubjectsPage.vue") },
      { path: ":id", component: () => import("pages/SubjectPage.vue") },
    ],
  },

  {
    path: "/levels",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "levels",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher"],
    },
    children: [
      { path: "", component: () => import("pages/LevelsPage.vue") },
      { path: ":id", component: () => import("pages/LevelPage.vue") },
    ],
  },

  {
    path: "/grading-systems",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "grading-systems",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher"],
    },
    children: [
      { path: "", component: () => import("pages/GradingSystemsPage.vue") },
      { path: ":id", component: () => import("pages/GradingSystemPage.vue") },
    ],
  },

  {
    path: "/assessments",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "assessments",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher", "teacher"],
    },
    children: [
      { path: "", component: () => import("pages/AssessmentsPage.vue") },
      {
        path: ":id",
        component: () => import("pages/AssessmentPage.vue"),
        children: [
          {
            path: "",
            component: () => import("components/AssessmentScores.vue"),
          },
          //   {
          //     path: "scores",
          //     component: () => import("components/AssessmentScores.vue"),
          //   },
        ],
      },
    ],
  },

  {
    path: "/reports",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "reports",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher", "teacher"],
    },
    children: [
      {
        path: ":levelGroupId",
        component: () => import("pages/ReportsPage.vue"),
      },
    ],
  },
  {
    path: "/users",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "users",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher"],
    },
    children: [
      {
        path: "",
        component: () => import("pages/UsersPage.vue"),
      },
      {
        path: ":id",
        component: () => import("pages/UserPage.vue"),
        meta: { groupsRequired: ["dos"] },
      },
    ],
  },

  {
    path: "/subject-allocations",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "allocations",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher"],
    },
    children: [
      { path: "", component: () => import("pages/SubjectAllocationsPage.vue") },
    ],
  },
  {
    path: "/activities",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "activities",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher", "teacher"],
    },
    children: [
      { path: "", component: () => import("pages/ActivitiesPage.vue") },
      {
        path: ":id",
        component: () => import("pages/ActivityPage.vue"),
        children: [
          {
            path: "",
            component: () => import("components/UpdateActivity.vue"),
            meta: {
              groupsRequired: ["teacher"],
            },
          },
          {
            path: "scores",
            component: () => import("components/ActivityScores.vue"),
          },
        ],
      },
    ],
  },

  {
    path: "/account",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      name: "account",
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher", "teacher"],
    },
    children: [{ path: "", component: () => import("pages/AccountPage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
  // {
  //     path: "/unauthorized",
  //     component: () =>
  //         import ("pages/ErrorUnauthorized.vue"),
  //     meta: {
  //         loginRequired: true,
  //         groupsRequired: ["dos", "head_teacher", "teacher"],
  //     },
  // },

  {
    path: "/unauthorized",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      loginRequired: true,
      groupsRequired: ["dos", "head_teacher", "teacher"],
    },
    children: [
      { path: "", component: () => import("pages/ErrorUnauthorized.vue") },
    ],
  },
];

export default routes;
