const FormInput = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  autoFocus = false
}) => {
  return (
    <label className='py-2'>
      {label}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className='border font-normal w-full p-3 mt-2 text-black dark:text-lighter border-medium outline-secondary bg-lighter dark:bg-medium rounded-xl'
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
      />
    </label>
  )
}

export default FormInput
