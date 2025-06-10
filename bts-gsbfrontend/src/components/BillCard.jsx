export default function BillCard({ bill, onClick }) {
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

  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    // @ts-ignore
    return new Date(dateString).toLocaleDateString(undefined, options);
  };


  return (
    <div 
      onClick={() => onClick(bill)}
      className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 truncate">{bill.merchant}</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(bill.status)}`}>
          {bill.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p className="mt-1 font-medium">{formatDate(bill.date)}</p>
        </div>
        <div>
          <p className="text-gray-500">Amount</p>
          <p className="mt-1 font-medium text-gray-900">${bill.amount.toFixed(2)}</p>
        </div>
      
      </div>
      
      <div className="mt-4 flex justify-end">
        <button className="text-sm text-blue-600 hover:text-blue-500">
          View details
        </button>
      </div>
    </div>
  );
} 