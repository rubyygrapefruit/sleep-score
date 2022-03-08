import React, { useEffect, useState } from "react";
import "./App.scss";
import Dropdown from "./Components/Dropdown";
import post from "./Requests/post.js";

// Create options for 0 - 24 hours in 30 min increments
const getHourIncrements = () => {
  const arrayOfTimes = [];
  for (let i = 0; i <= 48; i++) {
    arrayOfTimes[i] = 0.5 * i;
  }
  return arrayOfTimes;
};

function App() {
  const [durationInBed, setDurationInBed] = useState(null);
  const [durationAsleep, setDurationAsleep] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [outputValue, setOutputValue] = useState(null);
  const [isOnlyOption, setOnlyOption] = useState(false);
  const hourIncrements = getHourIncrements();

  const getScore = () => {
    let score = ((100 * durationAsleep) / durationInBed).toFixed(2);

    if (isNaN(score)) score = "0.00";

    return score;
  };

  // If duration in bed is 0, the only option for duration asleep should only be 0
  useEffect(() => {
    const setOptions = async () => {
      const isDurationInBedZero = await getDurationInBed();
      setOnlyOption(isDurationInBedZero);
    };

    setOptions();
  }, [durationInBed]);

  const getDurationInBed = () => {
    return durationInBed === 0 ? true : false;
  };

  const options = hourIncrements.map((hour) => {
    return { value: hour, label: `${hour} hrs` };
  });

  const isDisabled = () => {
    if (
      typeof durationAsleep === "number" &&
      typeof durationInBed === "number" &&
      durationInBed >= durationAsleep
    )
      return false;
    return true;
  };

  const postData = async (data) => {
    await post(data);
    setOutputValue(data);
    setIsLoading(false);
  };

  const handleDurationInBed = (event) => {
    setDurationInBed(parseFloat(event.target.value));
  };

  const handleDurationInAsleep = (event) => {
    setDurationAsleep(parseFloat(event.target.value));
  };

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
        <div className="app-text-container">
          <h1 className="app-title">Calculate your sleep score!</h1>
          <div className="app-note">
            Note: Duration in bed should be greater or equal to duration asleep
          </div>
        </div>
        <form className="app-form" onSubmit={handleSubmit} data-testid="form">
          {outputValue && (
            <output className="app-output" name="result">
              {`Score: ${outputValue.score}`}
            </output>
          )}
          <Dropdown
            label="Duration in bed"
            onChange={handleDurationInBed}
            options={options}
            labelledby="duration-in-bed"
            isDurationAsleep={false}
          />
          <Dropdown
            label="Duration asleep"
            onChange={handleDurationInAsleep}
            options={options}
            labelledby="duration-asleep"
            isOnlyOption={isOnlyOption}
            isDurationAsleep
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
