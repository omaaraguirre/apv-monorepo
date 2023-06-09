
const Alerta = ({ alerta }) => {
  const color = {
    success: 'text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200',
    danger: 'text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200',
    warning: 'text-orange-500 bg-orange-100 dark:bg-orange-700 dark:text-orange-200'
  }
  const svgIcon = {
    success: 'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
    danger: 'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
    warning: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
  }
  return (
    <div id='toast-alert' className='fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-md top-5 right-5 dark:text-gray-100 dark:divide-gray-700 space-x dark:bg-gray-800' role='alert'>
      <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg ${alerta.error ? color.warning : color.success}`}>
        <svg aria-hidden='true' className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
          <path fillRule='evenodd' d={alerta.error ? svgIcon.warning : svgIcon.success} clipRule='evenodd' />
        </svg>
      </div>
      <div className='pl-4 text-sm font-normal'>{alerta.msg}</div>
    </div>
  )
}

export default Alerta
