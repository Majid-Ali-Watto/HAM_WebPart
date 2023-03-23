import { createWebHashHistory, createRouter } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import MainMenu from '../components/MainMenu.vue'
import GenericForm from '../components/GenericForm.vue'
import StudentSec from '../components/Student.vue'
import HostelSec from '../components/Hostel.vue'
import MessSec from '../components/Mess.vue'
import SecuritySec from '../components/Security.vue'
import ViewWardensData from '../components/ViewWardensData.vue'
import ViewData from '../components/ViewData.vue'
const routes = [
  { path: '/', component: HelloWorld },
  { path: '/MainMenu', component: MainMenu, props: { list: [{ option: 'Student Section', name: 'Student', route: 'Student' }, { option: 'Hostel Supervisor', name: 'Hostel', route: 'Hostel' }, { option: 'Mess Supervisor', name: 'Mess', route: 'Mess' }, { option: 'Security Supervisor', name: 'Security', route: 'Security' }] } },
  { path: '/Student', name: 'Student', component: StudentSec },
  { path: '/Hostel', name: 'Hostel',  component: HostelSec },
  { path: '/Mess', name: 'Mess',  component: MessSec },
  { path: '/Security', name: 'Security',  component: SecuritySec },
  { path: '/ViewData', name: 'ViewData',  component: ViewData },
  { path: '/ViewWardensData', name: 'ViewWardensData',  component: ViewWardensData },
  { path: '/GenericForm', name: 'GenericForm', component: GenericForm },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})
export default router;