import SocialBoard from "../step1/entity/board/SocialBoard";
import CommunityMember from "../step1/entity/club/CommunityMember";
import TravelClub from "../step1/entity/club/TravelClub";
import MapStorage from "./logic/storage/MapStorage";
import MainMenu from "./ui/menu/MainMenu";


const clubMap = MapStorage.getInstance().clubMap.set(TravelClub.getSample(true).getId(), TravelClub.getSample(true));
const memberMap = MapStorage.getInstance().memberMap.set(CommunityMember.getSample().email, CommunityMember.getSample());
const boardMap = MapStorage.getInstance().boardMap.set(SocialBoard.getSample(TravelClub.getSample(true)).getId(), SocialBoard.getSample(TravelClub.getSample(true)));

const mainMenu = new MainMenu();

mainMenu.showMenu();