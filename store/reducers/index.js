import packageReducer from "./packageReducer";
import sugProvReducer from "./sugProvReducer";
import correctReducer from "./correctProverbsReducer";
import SubscriberReducer from "./subscriberReducer";
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import Categories from "./categoriesReducers";
import CategoryNativeName from "./categoryNativeReducers";
import Ethnics from "./ethnicReducer";
import proverbReducer from "./proverbReducer";
import PVRolesReducer from "./pv_admin_rolesReducer";
import Languages from "./languageReducer";
import Users from "./userReducer";
import FMRolesReducer from "./fmAdminRolesReducers";
import FMUserReducer from "./fmAdminUserReducer";
import faqReducer from "./faqReducer";
import subscribersReducer from "./subscribersReducer";
import questionReducer from "./factQuestionReducer";
import QuestionMappingReducer from "./questionMappingReducer";
import QuestionPropertyReducer from "./questionPropertyReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  Categories: Categories,
  faqs: faqReducer,
  CategoryNativeName: CategoryNativeName,
  Ethnics: Ethnics,
  proverb: proverbReducer,
  Languages: Languages,
  Users: Users,
  pv_roles: PVRolesReducer,
  FMRolesReducer: FMRolesReducer,
  FamilyAdminUsers: FMUserReducer,
  packages: packageReducer,
  sugProverbs: sugProvReducer,
  correctProverbs: correctReducer,
  subscribers: SubscriberReducer,
  questions: questionReducer,
  questionMapping: QuestionMappingReducer,
  questionProperty: QuestionPropertyReducer,
});
export default rootReducer;
