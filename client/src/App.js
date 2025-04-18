import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import AdminLogin from './Components/AdminLogin';
import AdminHome from './Components/Admin/AdminHome';
import Logout from './Logout';
import CustomerLogin from './Components/CustomerLogin';
import CustomerRegistration from './Components/CustomerRegistration';
import CustomerHome from './Components/Customer/CustomerHome';
import FoodCategories from './Components/Admin/FoodCategories';
import Managers from './Components/Admin/Managers';
import ManagerLogin from './Components/ManagerLogin';
import ManagerHome from './Components/Manager/ManagerHome';
import ViewFood from './Components/Admin/ViewFood';
import AddFood from './Components/Admin/AddFood';
import ManagerViewFood from './Components/Manager/ManagerViewFood';
import AddManagerFood from './Components/Manager/AddManagerFood';
import FoodMenu from './Components/Customer/FoodMenu';
import Cart from './Components/Customer/Cart';
import PaymentPage from './Components/Customer/PaymentPage';
import Orders from './Components/Customer/Orders';
import OrderHistory from './Components/Customer/OrderHistory';
import EditFood from './Components/Admin/EditFood';
import RestaurantTables from './Components/Admin/RestaurantTables';
import Tables from './Components/Customer/Tables';
import ReserveTable from './Components/Customer/ReserveTable';
import Reservations from './Components/Customer/Reservations';
import EditTable from './Components/Admin/EditTable';

function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
      <Route path='/' Component={Home} />
      <Route path='/adminLogin' Component={AdminLogin}></Route>
      <Route path='/adminHome' Component={AdminHome}></Route>
      <Route path='/logout' Component={Logout}></Route>
      <Route path='/customerLogin' Component={CustomerLogin}></Route>
      <Route path='/customerReg' Component={CustomerRegistration}></Route>
      <Route path='/customerHome' Component={CustomerHome}></Route>
      <Route path='/categories' Component={FoodCategories}></Route>
      <Route path='/managers' Component={Managers}></Route>
      <Route path='/managerLogin' Component={ManagerLogin}></Route>
      <Route path='/managerHome' Component={ManagerHome}></Route>
      <Route path='/viewFood' Component={ViewFood}></Route>
      <Route path='/addFood' Component={AddFood}></Route>
      <Route path='/managerViewFood' Component={ManagerViewFood}></Route>
      <Route path='/addManagerFood' Component={AddManagerFood}></Route>
      <Route path='/foodMenu' Component={FoodMenu}></Route>
     <Route path='/cart' Component={Cart}></Route>
     <Route path='/paymentPage' Component={PaymentPage}></Route>
     <Route path='/orders' Component={Orders}></Route>
     <Route path='/history' Component={OrderHistory}></Route>
     <Route path='/editFood' Component={EditFood}></Route>
     <Route path='/restaurantTables' Component={RestaurantTables}></Route>
      <Route path='/tables' Component={Tables}></Route>
      <Route path='/reserveTable' Component={ReserveTable}></Route>
      <Route path='/reservations' Component={Reservations}></Route>
      <Route path='/editTable' Component={EditTable}></Route>
      </Routes>
    </div>
   </Router>
  );
}

export default App;
