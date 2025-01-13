import React, { useEffect, useState } from "react";
import axios from "axios";

interface Carrier {
  id: number;
  companyName: string;
  dba: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  email: string;
  mc: string;
  usdot: string;
  feinSsn: string;
  numberOfTrucks: string;
  numberOfDrivers: string;
  factorInvoices: string;
  preferredStates: string;
  documents: string[];
}

const CarriersList: React.FC = () => {
  const [carriers, setCarriers] = useState<Carrier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCarriers = async () => {
      try {
        const response = await axios.get<Carrier[]>(`${process.env.REACT_APP_SERVER_URI}/api/carriers`);
        setCarriers(response.data);
      } catch (error: any) {
        setError(`Error fetching carriers: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarriers();
  }, []);

  // Get current carriers
  const indexOfLastCarrier = currentPage * itemsPerPage;
  const indexOfFirstCarrier = indexOfLastCarrier - itemsPerPage;
  const currentCarriers = carriers.slice(indexOfFirstCarrier, indexOfLastCarrier);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (isLoading) {
    return <div className="text-center py-8">Loading carriers...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Carriers List</h1>

      {/* Carrier Summary */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">Carrier Summary</h2>
        <div>
          <p className="text-base font-medium text-gray-500">Total Carriers</p>
          <p className="text-2xl font-semibold">{carriers.length}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">Company Name</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">DBA</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">City</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">MC</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">USDOT</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider"># of Trucks</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider"># of Drivers</th>
              <th className="px-4 py-3 text-left text-base font-semibold text-gray-600 uppercase tracking-wider">Documents</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCarriers.map((carrier) => (
              <tr key={carrier.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">{carrier.companyName}</td>
                <td className="px-4 py-4 whitespace-nowrap">{carrier.dba}</td>
                <td className="px-4 py-4 whitespace-nowrap">{carrier.city}</td>
                <td className="px-4 py-4 whitespace-nowrap">{carrier.phone}</td>
                <td className="px-4 py-4 whitespace-nowrap">{carrier.mc}</td>
                <td className="px-4 py-4 whitespace-nowrap">{carrier.usdot}</td>
                <td className="px-4 py-4 whitespace-nowrap">{carrier.numberOfTrucks}</td>
                <td className="px-4 py-4 whitespace-nowrap">{carrier.numberOfDrivers}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {Array.isArray(carrier.documents) && carrier.documents.length > 0 ? (
                    carrier.documents.map((doc, index) => (
                      <a key={index} href={`${process.env.REACT_APP_SERVER_URI}/api/files/${doc}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 mr-2">
                        Document {index + 1}
                      </a>
                    ))
                  ) : (
                    <span>No documents</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm " aria-label="Pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 mr-1 rounded-l-md border border-gray-300 bg-white text-base font-medium text-gray-500 hover:bg-gray-50">
            Previous
          </button>
          {Array.from({ length: Math.ceil(carriers.length / itemsPerPage) }).map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative inline-flex items-center px-4 py-2 border text-base font-medium mx-1 ${currentPage === index + 1 ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(carriers.length / itemsPerPage)} className="relative inline-flex items-center px-2 py-2 ml-1 rounded-r-md border border-gray-300 bg-white text-base font-medium text-gray-500 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default CarriersList;
