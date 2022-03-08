import React, { useEffect, useState } from "react";
import "./App.scss";
import Dropdown from "./Components/Dropdown";
import post from "./Requests/post.js";

// Return array of increments in 30 mins increments from 0 to 24 hours or
// from 0 to duration of sleep selected
const getHourIncrements = (maxNum) => {
  if (maxNum === 0) maxNum = 1;
  const arrayOfTimes = [];
  for (let i = 0; maxNum ? i < maxNum : i <= 48; i++) {
    arrayOfTimes[i] = 0.5 * i;
  }

  return arrayOfTimes;
};

function App() {
  const [durationInBed, setDurationInBed] = useState(null);
  const [durationAsleep, setDurationAsleep] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [outputValue, setOutputValue] = useState(null);
  const [durationAsleepOptions, setDurationAsleepOptions] = useState([]);
  const allHourOptions = getHourIncrements();

  const getScore = () => {
    let score = ((100 * durationAsleep) / durationInBed).toFixed(2);

    if (isNaN(score)) score = "0.00";

    return score;
  };

  // Calculate the max options for duration asleep after selecting duration in bed
  useEffect(() => {
    const setOptions = async () => {
      const hours = await durationInBed;

      setDurationAsleepOptions(getHourIncrements((hours + 0.5) * 2));
    };
    setOptions();
  }, [durationInBed]);

  // Duration in bed and duration asleep are disabled until both selected
  const isDisabled = () => {
    if (durationInBed && durationAsleep) {
      return false;
    } else {
      return true;
    }
  };

  // Return an array of objects displaying dropdown options
  const getOptions = (options) => {
    return options.map((hour) => {
      return { value: hour, label: `${hour} hrs` };
    });
  };

  // Set duration in bed
  const handleDurationInBed = (event) => {
    setDurationInBed(parseFloat(event.target.value));
  };

  // Set duration asleep
  const handleDurationInAsleep = (event) => {
    setDurationAsleep(parseFloat(event.target.value));
  };

  // Post data to mock API
  const postData = async (data) => {
    await post(data);
    setOutputValue(data);
    setIsLoading(false);
  };

  // Submit data
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    await postData({
      id: 1,
      score: getScore(),
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Calculate your sleep score</h1>
        <form className="app-form" onSubmit={handleSubmit} data-testid="form">
          {outputValue && (
            <output className="app-output" name="result">
              {`Score: ${outputValue.score}`}
            </output>
          )}
          <Dropdown
            label="Duration in bed"
            onChange={handleDurationInBed}
            options={getOptions(allHourOptions)}
            labelledby="duration-in-bed"
          />
          <Dropdown
            label="Duration asleep"
            onChange={handleDurationInAsleep}
            options={getOptions(durationAsleepOptions)}
            labelledby="duration-asleep"
          />
          <input
            type="submit"
            value={isLoading ? "Loading..." : "Calculate"}
            disabled={isDisabled()}
          />
        </form>
      </header>
    </div>
  );
}

export default App;
