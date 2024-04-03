import Users from "./Components/Users";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <Users />
    <ToastContainer position="top-center" />
    </>
  );
}

export default App;
