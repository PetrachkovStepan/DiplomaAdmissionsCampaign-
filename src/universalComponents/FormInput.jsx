/* eslint-disable react/prop-types */
import { Input } from "antd";
import classNames from "classnames";

const FormInput = ({
  placeholder,
  errorMessage,
  className,
  inputType = "default",
  isRequired,
  metaError,
  ...rest
}) => {
  return (
    <div className={classNames("relative z-0 w-full mb-5 group", className)}>
      {inputType === "password" && (
        <Input
          type="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0E7490] focus:outline-none focus:ring-0 focus:border-[#0E7490] peer"
          {...rest}
          placeholder=""
          required={isRequired}
        ></Input>
      )}
      {inputType === "default" && (
        <Input
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0E7490] focus:outline-none focus:ring-0 focus:border-[#0E7490] peer"
          placeholder=" "
          {...rest}
          required={isRequired}
        ></Input>
      )}
      <label
        htmlFor="spec_name"
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0E7490] peer-focus:dark:text-[#0E7490] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {placeholder}:&nbsp;
      </label>
      <label className="text-red-500 mt-0.5 text-sm ml-1">
        {errorMessage || "\t"}
      </label>
      <label className="text-red-500 mt-0.5 text-sm ml-1">
        {metaError || "\t"}
      </label>
    </div>
  );
};

export default FormInput;
