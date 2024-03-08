import { Select } from "antd";
import PropTypes from "prop-types";

const filterOption = (input, option) =>
  (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const CustomSelect = ({ options, placeholder, onChange, ...props }) => (
  <Select
    placeholder={placeholder}
    optionFilterProp="children"
    onChange={onChange}
    filterOption={filterOption}
    options={options}
    {...props}
  />
);

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
