import "./App.css";
import Card from "./components/Card/Card.js";
import IndividualStateForm from "./components/IndividualStateForm";
import LocalStorageForm from "./components/LocalStorageForm";
import Navbar from "./components/Navbar";
import NewForm from "./components/NewForm";
import FormWithDb from "./components/FormWithDB";

function App() {
    return (
        <>
            <Navbar title="Input-Form"/>
            <div className="container mainCenter">
                <div>
                    <FormWithDb/>
                    {/*<NewForm/>*/}
                    {/*<IndividualStateForm/>*/}
                    {/*<LocalStorageForm/>*/}
                </div>
            </div>
        </>
    );
}

export default App;
