import { useState, createContext } from 'react'

const ModalContext = createContext()

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false)
  const [onConfirm, setOnConfirm] = useState()

  return (
    <ModalContext.Provider value={{
      showModal,
      setShowModal,
      onConfirm,
      setOnConfirm
    }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export default ModalContext
