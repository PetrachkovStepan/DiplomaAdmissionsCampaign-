/* eslint-disable react/prop-types */
import {
  CheckIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { FloatingLabel, Button, TextInput } from "flowbite-react";
import { useState } from "react";
import "../reuse.css";

export const FlipInput = ({
  value = "",
  onChange = () => {},
  text = "Value",
  fieldName,
  submitText = "Submit",
  fieldParam,
  submitCallback = () => {},
}) => {
  const [isStateChange, setIsStateChanged] = useState(false);
  const handleSubmit = async () => {
    await submitCallback(fieldParam, value);
    await setIsStateChanged(false);
  };

  return (
    <div className=' h-9 max-h-9 flex gap-3 items-center '>
      {isStateChange ? (
        <>
          <TextInput
            variant='filled'
            style={{ borderRadius: "0.125rem" }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          ></TextInput>
          <div className='flex gap-0.5 items-center'>
            <Button
              color='green'
              className='h-fit w-fit m-0 p-0 border-none [&_span]:p-0 bg-transparent'
              onClick={handleSubmit}
            >
              <CheckIcon width={20} color='green' />
            </Button>
            <Button
              color='red'
              className='h-fit w-fit m-0 p-0 border-none [&_span]:p-0 bg-transparent'
              onClick={() => setIsStateChanged(false)}
            >
              <XMarkIcon width={20} color='red'></XMarkIcon>
            </Button>
          </div>
        </>
      ) : (
        <>
          <span className='editWrapper'>
            <PencilSquareIcon
              onClick={() => !isStateChange && setIsStateChanged(true)}
              width={20}
              className='editIcon'
            />{" "}
            {text}
          </span>
        </>
      )}
    </div>
  );
};
