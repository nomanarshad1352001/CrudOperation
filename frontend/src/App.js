import "./App.css";
// import IndividualStateForm from "./components/IndividualStateForm";
// import LocalStorageForm from "./components/LocalStorageForm";
// import NewForm from "./components/NewForm";
import Navbar from "./Ui Elements/Navbar";
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
