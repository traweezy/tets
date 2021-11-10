import { ToastContainer } from 'react-toastify';
import Locations from './pages/locations';
import Residents from './pages/residents';

const App = () => {
  return (
    <div className="container h-screen p-4 mx-auto grid grid-cols-2 gap-4">
      <Locations />
      <Residents />
      <ToastContainer />
    </div>
  );
};

export default App;
