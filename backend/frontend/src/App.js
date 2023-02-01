import "bootstrap/dist/css/bootstrap.min.css";
import Login from'./components/Login';
import Signup from './components/Signup';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import WhatsApp from "./pages/WhatsApp"
import ChatAdvisor from "./pages/ChatAdvisor"
import ChatReviewer from "./pages/ChatReviewer"
import ChatStudent from "./pages/ChatStudent"
import TemporaryDrawer from "./components/TemporaryDrawer";
import ReviewerSignup from "./components/ReviewerSignup";
import AdvisorSignup from "./components/AdvisorSignup";
import Left from "./pages/Batch/Left";
import AddManifest from "./components/AddManifest";
import BasicTable from "./components/BasicTable";
import ReviewerTimeSlot from "./components/ReviewerTimeSlot";
import Slot_modal from "./components/Slot_modal";
import Reviewer from "./pages/Reviewer/Reviewer";
import Manage from "./pages/management/Manage";
import AddBatchModal from "./components/AddBatchModal";
import AddDomainModal from "./components/AddDomainModal";
import ProfileComponent from "./components/ProfileComponent";
import View_profile from "./components/View_profile";
import Advisor_view from "./pages/management/Advisor_view";
import Reviewer_view from "./pages/management/Reviewer_view";
import Domain_view from "./pages/management/Domain_view.js";
import Batch_view from "./pages/management/Batch_view.js";
import HomePage from "./pages/home";
import RoomPage from "./pages/room";
import WhatsAppGroupChat from "./pages/GroupChat/WhatsAppGroupChat";
import StaticTimePickerDemo from "./components/StaticTimePickerDemo";
import ChatApp from "./pages/Chat/chatApp";
import ChatProfileData from "./pages/Chat/ChatProfileData";
import CreateGroup from "./pages/Chat/CreateGroup";
import AddMembers from "./pages/GroupChat/AddMembers";
import Verify from "./components/Verify";
function App() {
  return (
    <div>
    <Router>
      <Routes>
      <Route element={<WhatsApp/>} path="/admin_home"/>
      <Route element={<WhatsAppGroupChat/>} path="/group_chat"/>
      <Route element={<ChatAdvisor/>} path="/advisor_home"/>
      <Route element={<ChatReviewer/>} path="/reviewer_home"/>
      <Route element={<WhatsApp/>} path="/home"/>
      <Route element={<Login/>} path="/"/>
      <Route element={<Signup/>} path="/signup"/>
      <Route element={<TemporaryDrawer/>} path="/side"/>
      <Route element={<ReviewerSignup/>} path="/reviewer_signup"/>
      <Route element={<AdvisorSignup/>} path="/advisor_signup"/>
      <Route element={<Left/> } path="/left"/>
      <Route element={<AddManifest/>} path='Add_manifest/:id'/>
      <Route element={<BasicTable/>} path='table'/>
      <Route element={<ReviewerTimeSlot/>} path='/ReviewerTimeSlot'/>
      <Route element={<Slot_modal/>} path='/Slot_modal'/>
      <Route element={<Reviewer/>} path='/bookslotreviewer'/>
      <Route element={<AddBatchModal/> } path='/add_batch_modal'/>
      <Route element={<AddDomainModal/> } path='/add_domain_modal'/>
      <Route element={<ProfileComponent/> } path='/photo'/>
      <Route element={<View_profile/> } path='/photo1'/>
      <Route element={<Manage/>} path='/manage'/>
      <Route element={<Advisor_view/>} path='/manage1'/>
      <Route element={<Reviewer_view/>} path='/manage2'/>
      <Route element={<Batch_view/>} path='/manage3'/>
      <Route element={<StaticTimePickerDemo/>} path='/time'/>
      <Route element={<HomePage/>} path='/meet'/>
      <Route element={<RoomPage/>} path='/room/:roomId'/>
      {/* <Route element={<ChatForFun/>} path='/chat'/> */}
      <Route element={<ChatProfileData/>} path='/profileData'/>
      
      <Route element={<CreateGroup/>} path='/creategroup'/>
      <Route element={<AddMembers/>} path='/asish'/>
      <Route element={<Verify/>} path='/verify/:id/:username'/>      
      <Route element={<ChatApp/>} path='/chat'/>

      </Routes>
    </Router>
    </div>
  );
}

export default App;
