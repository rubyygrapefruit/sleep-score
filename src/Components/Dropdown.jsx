import "./Dropdown.scss";
import PropTypes from "prop-types";

const Dropdown = ({ label, options, onChange, labelledby, isOnlyOption }) => {
  const onlyOption = { value: 0, label: "0 hrs" };

  return (
    <label className="dropdown-container" aria-labelledby={labelledby}>
      {label}
      <select className="dropdown-select" onChange={onChange} required>
        <option value="">Please choose an option</option>
        {!isOnlyOption ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option key={onlyOption.value} value={onlyOption.value}>
            {onlyOption.label}
          </option>
        )}
      </select>
    </label>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
  labelledby: PropTypes.string,
};

export default Dropdown;
