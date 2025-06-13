import { useEffect, useRef, useState } from 'react';

export default function StatusChangeModal({ bill, isOpen, onClose, onConfirm, isUpdating }) {
  const modalRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  useEffect(() => {
    // Handle escape key press
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    // Handle click outside modal
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset selected status when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedStatus('');
    }
  }, [isOpen]);

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
  };

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm(selectedStatus);
    }
  };

  if (!isOpen || !bill) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop with blur effect */}
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        ></div>

        {/* Modal positioning */}
        <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>

        {/* Modal content */}
        <div
          ref={modalRef}
          className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle z-[101] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/* Status Icon */}
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                  Changer le statut de la facture
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Sélectionnez le nouveau statut pour cette facture.
                  </p>

                  {/* Bill details */}
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <div className="text-sm">
                      <p><span className="font-medium text-gray-700">ID:</span> #{bill._id}</p>
                      <p><span className="font-medium text-gray-700">Merchant:</span> {bill.type}</p>
                      <p><span className="font-medium text-gray-700">Amount:</span> ${bill.amount?.toFixed(2)}</p>
                      <p><span className="font-medium text-gray-700">Statut actuel:</span>
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bill.status === 'Approved' ? 'bg-green-100 text-green-800' :
                          bill.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                          {bill.status}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Status selection buttons */}
                  <div className="mt-6">
                    <p className="text-sm font-medium text-gray-700 mb-3">Nouveau statut :</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleStatusSelect('Approved')}
                        className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${selectedStatus === 'Approved'
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                          }`}
                        disabled={isUpdating}
                      >
                        <svg className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Accepter
                      </button>

                      <button
                        onClick={() => handleStatusSelect('Rejected')}
                        className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${selectedStatus === 'Rejected'
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-200 hover:border-red-300 hover:bg-red-50'
                          }`}
                        disabled={isUpdating}
                      >
                        <svg className="h-5 w-5 mr-2 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Refuser
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={!selectedStatus || isUpdating}
              className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Mise à jour...' : 'Confirmer'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 