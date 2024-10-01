import "./App.css";
// import CheckoutForm from './components/CheckoutForm';
// import DynamicItems from './components/DynamicItems';
// import CheckoutFormTwo from './components/CheckoutFormTwo'
import Dropdown from "./components/Dropdown";

const options = ["bird", "frog", "goat", "alligator"];

function App() {
  return (
    <div className="App">
      {/* <CheckoutForm /> */}
      {/* <DynamicItems /> */}
      {/* <CheckoutFormTwo /> */}
      <Dropdown placeholder="Select an option" options={options} />
    </div>
  );
}

export default App;
