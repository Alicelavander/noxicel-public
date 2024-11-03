import TopPage from "./components/pages/TopPage.vue";
import LogInPage from "./components/pages/LogInPage.vue";
import SignUpPage from "./components/pages/SignUpPage.vue";
import MyPage from "./components/pages/MyPage.vue";
import ProblemPage from "./components/pages/ProblemPage.vue";
import ResultPage from "./components/pages/ResultPage.vue";
import EditProfile from "./components/pages/EditProfilePage.vue";
import CourseDetail from "./components/pages/CourseDetailPage.vue";
import FAQPage from "./components/pages/FAQPage.vue";
import FinishRoundPage from "./components/pages/FinishRoundPage.vue";

import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from "firebase/auth";

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    //{ path: '/submit', component: SubmitPage },
    { path: '/', component: TopPage },
    { path: '/login', component: LogInPage },
    { path: '/signup', component: SignUpPage },
    {
      path: '/mypage', redirect: { path: '/mypage/courses' }, meta: { requiresAuth: true }, children: [
        {
          path: 'courses',
          component: MyPage,
        },
        {
          name: 'course detail',
          path: 'courses/:course',
          component: CourseDetail
        },
        {
          path: 'account',
          component: EditProfile
        },
      ]
    },
    {
      path: '/problem',
      component: ProblemPage,
      meta: { requiresAuth: true }
    },
    { path: '/result', component: ResultPage, meta: { requiresAuth: true } },
    { path: '/done', component: FinishRoundPage, meta: { requiresAuth: true } },
    { path: '/faq', component: FAQPage },
  ]
});

router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const requiresAuth = to.matched.some(recode => recode.meta.requiresAuth);
  console.log(auth.currentUser);
  if (requiresAuth && !auth.currentUser) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});
