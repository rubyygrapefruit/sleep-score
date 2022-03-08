import "./Dropdown.scss";
import PropTypes from "prop-types";

const Dropdown = ({ label, options, onChange, labelledby }) => {
  return (
    <label className="dropdown-container" aria-labelledby={labelledby}>
      {label}
      <select className="dropdown-select" onChange={onChange} required>
        <option value="">Please choose an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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
