import "./App.css";
import Card from "./components/Card/Card.js";
import IndividualStateForm from "./components/IndividualStateForm";
import LocalStorageForm from "./components/LocalStorageForm";
import Navbar from "./components/Navbar";
import Newform from "./components/Newform";

function App() {
  return (
    <>
    
      <Navbar title="Input-Form" />
      <Card className=" container mainCenter">
        <div>
          <Newform/>
         {/* <IndividualStateForm/> */}
        </div>
        {/* <LocalStorageForm/> */}
      </Card>
     
    </>
  );
}

export default App;
