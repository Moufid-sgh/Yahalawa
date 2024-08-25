import { forwardRef } from 'react'

const InputField = forwardRef(({ placeholder, type, setValue, isDisabled}, ref) => (
  <>
    <input
      placeholder={placeholder}
      type={type}
      ref={ref}
      onChange={(e) => setValue(e.target.value)}
      className="w-72 md:w-96 rounded-md border border-gray py-2 px-4 my-3 outline-none focus:ring-[1.5px] focus:ring-ringblue focus:border-gray"
      c={isDisabled}
    />
  </>
));

export default InputField;
