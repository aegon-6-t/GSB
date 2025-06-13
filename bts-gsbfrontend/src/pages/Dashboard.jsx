import { authAPI } from '../services/api';
import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext/AuthContext'
import Header from '../components/Header';
import BillModal from '../components/BillModal';
import AddBillModal from '../components/AddBillModal';
import EditBillModal from '../components/EditBillModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import StatusChangeModal from '../components/StatusChangeModal';

// Sample bills data
const initialBills = [
];

export default function Dashboard() {
  const [bills, setBills] = useState(initialBills);
  const [selectedBill, setSelectedBill] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();

  console.log('User from LOGIN:', user);  // ← ICI !

  // Ensure proper modal cleanup when component unmounts
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const data = await authAPI.getBills();
        setBills(data);
      } catch (e) {
        console.error('Error fetching bills:', e);
      }
    };

    fetchBills();
  }, []);

  const handleAddBill = (newBill) => {
    setBills([newBill, ...bills]);
  };

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setIsDetailModalOpen(true);
  };

  const handleEditBill = (bill) => {
    setSelectedBill(bill);
    setIsEditModalOpen(true);
  };

  const handleDeleteBill = (bill) => {
    setSelectedBill(bill);
    setIsDeleteModalOpen(true);
  };

  const handleStatusClick = (bill) => {
    // Only allow admins to change status
    if (user?.role === 'admin') {
      setSelectedBill(bill);
      setIsStatusModalOpen(true);
    }
  };

  const handleUpdateBill = (updatedBill) => {
    setBills(bills.map(bill =>
      bill._id === updatedBill._id ? updatedBill : bill
    ));
  };

  const handleConfirmDelete = async () => {
    if (!selectedBill) return;

    setIsDeleting(true);
    try {
      await authAPI.deleteBill(selectedBill._id);
      setBills(bills.filter(bill => bill._id !== selectedBill._id));
      setIsDeleteModalOpen(false);
      setSelectedBill(null);
    } catch (error) {
      console.error('Error deleting bill:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmStatusChange = async (newStatus) => {
    if (!selectedBill) return;

    setIsUpdatingStatus(true);
    try {
      const billData = {
        metadata: {
          date: selectedBill.date,
          amount: selectedBill.amount,
          type: selectedBill.type,
          description: selectedBill.description,
          status: newStatus
        }
      };

      const updatedBill = await authAPI.updateBill(selectedBill._id, billData);
      setBills(bills.map(bill =>
        bill._id === updatedBill._id ? updatedBill : bill
      ));
      setIsStatusModalOpen(false);
      setSelectedBill(null);
    } catch (error) {
      console.error('Error updating bill status:', error);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Function to determine status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      case 'Pending':
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  // Function to determine if status is clickable (admin only)
  const getStatusClickableClasses = (isClickable) => {
    return isClickable
      ? 'cursor-pointer hover:opacity-80 transition-opacity'
      : 'cursor-default';
  };

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    // @ts-ignore
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredBills = bills.filter(bill => {
    // Filter by status
    if (filterStatus !== 'All' && bill.status !== filterStatus) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        bill.type.toLowerCase().includes(query) ||
        bill.description?.toLowerCase().includes(query) ||
        bill.amount.toString().includes(query)
      );
    }

    return true;
  });

  const handleRowClick = (bill) => {
    console.log('Opening bill details:', bill);
    setSelectedBill({ ...bill });
    setTimeout(() => {
      setIsDetailModalOpen(true);
    }, 0);
  };

  const openAddBillModal = () => {
    console.log('Opening add bill modal');
    setIsAddModalOpen(true);
  };

  const closeDetailModal = () => {
    console.log('Closing detail modal');
    setIsDetailModalOpen(false);
    setTimeout(() => {
      setSelectedBill(null);
    }, 300);
  };

  const closeAddModal = () => {
    console.log('Closing add modal');
    setIsAddModalOpen(false);
  };

  const closeEditModal = () => {
    console.log('Closing edit modal');
    setIsEditModalOpen(false);
    setTimeout(() => {
      setSelectedBill(null);
    }, 300);
  };

  const closeDeleteModal = () => {
    console.log('Closing delete modal');
    setIsDeleteModalOpen(false);
    setTimeout(() => {
      setSelectedBill(null);
    }, 300);
  };

  const closeStatusModal = () => {
    console.log('Closing status modal');
    setIsStatusModalOpen(false);
    setTimeout(() => {
      setSelectedBill(null);
    }, 300);
  };

  console.log('Current state:', {
    isDetailModalOpen,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    isStatusModalOpen,
    // @ts-ignore
    selectedBill: selectedBill ? `Bill #${selectedBill._id}` : 'None'
  });

  return (
    <div className="min-h-screen bg-white">
      <Header onLogout={logout} />

      <main className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="mb-6 md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate">
                Hello, {user?.name}
              </h2>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                onClick={openAddBillModal}
                className="ml-3 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                </svg>
                Add Bill
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-x-4">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Search bills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="md:col-span-2 md:flex md:items-center md:justify-end">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Status:</span>
                <select
                  className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bills Table */}
          {filteredBills.length === 0 ? (
            <div className="mt-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No bills found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || filterStatus !== 'All'
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : 'Get started by creating a new bill.'}
              </p>
              {!searchQuery && filterStatus === 'All' && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={openAddBillModal}
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                  >
                    <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                    </svg>
                    Add Bill
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            ID
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Date
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Type
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Amount
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Description
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredBills.map((bill) => (
                          <tr
                            key={bill._id}
                            className="hover:bg-gray-50"
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              #{bill._id}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {formatDate(bill.date)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {bill.type}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                              ${bill.amount.toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              {bill.description}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClasses(bill.status)} ${getStatusClickableClasses(user?.role === 'admin')}`}
                                onClick={() => handleStatusClick(bill)}
                                title={user?.role === 'admin' ? 'Cliquer pour changer le statut' : ''}
                              >
                                {bill.status}
                                {user?.role === 'admin' && (
                                  <svg className="ml-1 h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                )}
                              </span>
                            </td>
                            <td className="whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-6">
                              <div className="flex items-center space-x-2">
                                {/* View Button - Eye Icon */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewBill(bill);
                                  }}
                                  className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50"
                                  title="View bill details"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  <span className="sr-only">View bill #{bill._id}</span>
                                </button>

                                {/* Edit Button - Pencil Icon */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditBill(bill);
                                  }}
                                  className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50"
                                  title="Edit bill"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  <span className="sr-only">Edit bill #{bill._id}</span>
                                </button>

                                {/* Delete Button - Trash Icon */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteBill(bill);
                                  }}
                                  className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50"
                                  title="Delete bill"
                                >
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  <span className="sr-only">Delete bill #{bill._id}</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                  <button className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredBills.length}</span> of{' '}
                      <span className="font-medium">{filteredBills.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                      <button className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 bg-blue-50">
                        1
                      </button>
                      <button className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bill Detail Modal */}
      <BillModal
        bill={selectedBill}
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal}
      />

      {/* Add Bill Modal */}
      <AddBillModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onSave={handleAddBill}
      />

      {/* Edit Bill Modal */}
      <EditBillModal
        bill={selectedBill}
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onSave={handleUpdateBill}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        bill={selectedBill}
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Status Change Modal */}
      <StatusChangeModal
        bill={selectedBill}
        isOpen={isStatusModalOpen}
        onClose={closeStatusModal}
        onConfirm={handleConfirmStatusChange}
        isUpdating={isUpdatingStatus}
      />
    </div>
  );
} 