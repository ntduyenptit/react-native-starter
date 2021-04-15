import HomeScreen from '../QuanLyTaiSan/QuanLyTaiSan';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const tabNavigationData = [
  {
    name: 'Toàn bộ TS',
    component: HomeScreen,
    icon: iconHome,
  },
 
  {
    name: 'TS mất',
    component: GridsScreen,
    icon: iconGrids,
  },
  {
    name: 'TS hỏng',
    component: PagesScreen,
    icon: iconPages,
  },
  {
    name: 'TS thanh lý',
    component: CalendarScreen,
    icon: iconCalendar,
  },
  {
    name: 'Khác',
    component: PagesScreen,
    icon: iconComponents,
  },
];

export default tabNavigationData;