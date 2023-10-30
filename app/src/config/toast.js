import { toast } from 'react-toastify'

const config = {
  position: 'top-right',
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'dark',
  pauseOnFocusLoss: false
}

export const showLoadingToast = message => {
  toast.dismiss()
  toast.loading(message, config)
}
export const showSuccessToast = message =>
  toast.success(message, config)

export const showErrorToast = message =>
  toast.error(message, config)

export const stopLoadingToast = message => {
  toast.dismiss()
  setTimeout(() => {
    showSuccessToast(message)
  }, 500)
}
