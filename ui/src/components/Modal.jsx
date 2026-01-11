const Modal = ({ isOpen, title, message, confirmText = 'Confirm', cancelText = 'Cancel', onConfirm, onCancel, isDangerous = false, statusMessage = '', isLoading = false }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black border border-white/10 rounded-2xl p-8 max-w-sm mx-4 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-white/70 mb-6">{message}</p>
        
        {statusMessage && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-sm animate-slideDown ${
            statusMessage.includes('success') || statusMessage.includes('deleted')
              ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
              : 'bg-red-500/10 text-red-300 border border-red-500/20'
          }`}>
            {statusMessage}
          </div>
        )}
        
        {isLoading && (
          <div className="flex justify-center items-center mb-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            <span className="ml-2 text-white/70 text-sm">Processing...</span>
          </div>
        )}
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 bg-white/5 border border-white/10 text-white/70 px-4 py-3 rounded-lg font-semibold hover:bg-white/8 hover:border-white/20 transition-all disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all disabled:opacity-60 ${
              isDangerous
                ? 'bg-red-500/90 text-white hover:bg-red-600'
                : 'bg-white text-black hover:bg-white/90'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
