import useModal from '../hooks/useModal'

const Dialog = () => {
  const { onConfirm, setOnConfirm, setShowModal } = useModal()

  const clearModal = () => {
    setShowModal(false)
    setOnConfirm(null)
  }

  const handleDelete = () => {
    onConfirm()
    clearModal()
  }

  const handleCancel = () => clearModal()

  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-md bg-darker/50 dark:bg-lighter/10 grid place-items-center'>
      <div className='text-center text-darker dark:text-lighter bg-light dark:bg-darker shadow-lg shadow-darker p-5 rounded-xl w-[min(90%,500px)]'>
        <h3 className='text-2xl font-bold mb-2'>
          Confirmación requerida
        </h3>
        <p className='text-lg'>
          Esta acción es irreversible. ¿Desea continuar?
        </p>
        <div className='flex gap-5 justify-center items-center mx-auto mt-5 text-lighter font-bold text-lg'>
          <button
            className='bg-red hover:scale-105 py-2 px-5 rounded-xl transition-transform duration-300'
            onClick={handleDelete}
          >
            Eliminar
          </button>
          <button
            className='bg-secondary hover:scale-105 py-2 px-5 rounded-xl transition-transform duration-300'
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dialog
