import PropTypes from "prop-types";
import "../reuse.css";

export const FloatingTextInput = ({ id_name, placeholder, ...props }) => {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        type="text"
        name={id_name}
        id={id_name}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0E7490] focus:outline-none focus:ring-0 focus:border-[#0E7490] peer"
        placeholder=" "
        required
        {...props}
      />

      <label
        htmlFor="spec_name"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0E7490] peer-focus:dark:text-[#0E7490] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {placeholder}
      </label>
    </div>
  );
};
FloatingTextInput.propTypes = {
  id_name: PropTypes.string,
  placeholder: PropTypes.string,
};
