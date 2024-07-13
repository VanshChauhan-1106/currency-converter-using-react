import { useEffect, useState } from "react";
import "./App.css";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";

function App() {
  const [options, setOptions] = useState(["usd", "inr"]);
  const [amount, setAmount] = useState();
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmt, setConvertedAmt] = useState();

  const currencyInfo = useCurrencyInfo(from);

  useEffect(() => {
    if (currencyInfo) {
      setOptions(Object.keys(currencyInfo));
    }
  }, [currencyInfo]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmt(amount);
    setAmount(convertedAmt);
  };

  const convert = () => {
    setConvertedAmt(amount * currencyInfo[to]);
  };

  return (
    <div className="w-full h-screen bg-blue-500 flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <h1 className="text-center text-blue-700 text-2xl mb-4 font-semibold">
            <CurrencyExchangeIcon className="mr-2" />
            GlobalRates Currency Converter
          </h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                onAmountChange={(amount) => setAmount(amount)}
                currencyOptions={options}
                selectCurrency={from}
                onCurrencyChange={(currency) => setFrom(currency)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                onClick={swap}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5 hover:bg-blue-500 active:bg-blue-700 text-lg"
              >
                Swap <i className="fa-solid fa-retweet text-xl"></i>
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmt}
                currencyOptions={options}
                selectCurrency={to}
                onCurrencyChange={(currency) => setTo(currency)}
                amountDisable
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-500 active:bg-blue-700"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}{" "}
              <i className="fa-solid fa- text-xl"></i>
            </button>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-2xl text-white border-b-4 pb-2">
          Made with &hearts; by Vansh Chauhan!
        </h1>
        <div className="flex justify-center mt-2">
          <a
            href="https://www.linkedin.com/in/vansh-chauhan-741a5b257/"
            className="mx-2 text-slate-300 hover:text-white duration-100"
            target="_blank"
          >
            <LinkedInIcon fontSize="large" />
          </a>
          <a
            href="https://github.com/VanshChauhan-1106"
            className="mx-2 text-slate-300 hover:text-white duration-100"
            target="_blank"
          >
            <GitHubIcon fontSize="large" />
          </a>
          <a
            href="https://www.instagram.com/vansh_.chauhan_/"
            className="mx-2 text-slate-300 hover:text-white duration-100"
            target="_blank"
          >
            <InstagramIcon fontSize="large" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
