// src/components/UsersList.tsx
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { debounce } from "lodash";

interface User {
  id: number;
  email: string;
  displayName: string;
  roles: string[];
  isApproved: boolean;
}

interface UserSummary {
  total: number;
  admin: number;
  user: number;
  dispatcher: number;
  broker: number;
  owner: number;
  driver: number;
}

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [userSummary, setUserSummary] = useState<UserSummary>({
    total: 0,
    admin: 0,
    user: 0,
    dispatcher: 0,
    broker: 0,
    owner: 0,
    driver: 0,
  });
  const auth = getAuth();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setLocalUsers(users);
    updateUserSummary(users);
  }, [users]);

  const updateUserSummary = (users: User[]) => {
    const summary: UserSummary = {
      total: users.length,
      admin: 0,
      user: 0,
      dispatcher: 0,
      broker: 0,
      owner: 0,
      driver: 0,
    };

    users.forEach((user) => {
      user.roles.forEach((role) => {
        if (role in summary) {
          summary[role as keyof UserSummary]++;
        }
      });
    });

    setUserSummary(summary);
  };

  const fetchUsers = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/admin/users`, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const approveUser = async (userId: number) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/admin/users/${userId}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const updateUser = async (userId: number, data: Partial<User>) => {
    try {
      const idToken = await auth.currentUser?.getIdToken();
      await axios.put(`${process.env.REACT_APP_SERVER_URI}/api/admin/users/${userId}`, data, {
        headers: { Authorization: `Bearer ${idToken}` },
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const debouncedUpdateUser = useCallback(
    debounce((userId: number, data: Partial<User>) => updateUser(userId, data), 1000),
    []
  );

  const handleDisplayNameChange = (userId: number, displayName: string) => {
    setLocalUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, displayName } : user)));
    debouncedUpdateUser(userId, { displayName });
  };

  const handleRolesChange = (userId: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoles = Array.from(event.target.selectedOptions, (option) => option.value);
    setLocalUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, roles: selectedRoles } : user)));
    updateUser(userId, { roles: selectedRoles });
  };

  // Get current users
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = localUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Users List</h1>

      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-3">User Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-base font-medium text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold">{userSummary.total}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Admins</p>
            <p className="text-2xl font-semibold">{userSummary.admin}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Dispatchers</p>
            <p className="text-2xl font-semibold">{userSummary.dispatcher}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Brokers</p>
            <p className="text-2xl font-semibold">{userSummary.broker}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Owners</p>
            <p className="text-2xl font-semibold">{userSummary.owner}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Drivers</p>
            <p className="text-2xl font-semibold">{userSummary.driver}</p>
          </div>
          <div>
            <p className="text-base font-medium text-gray-500">Regular Users</p>
            <p className="text-2xl font-semibold">{userSummary.user}</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Display Name</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Roles</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Approved</th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <input className="border rounded px-2 py-1 w-full" value={user.displayName} onChange={(e) => handleDisplayNameChange(user.id, e.target.value)} />
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <select multiple className="border rounded px-2 py-1 w-full" value={user.roles} onChange={(e) => handleRolesChange(user.id, e)} size={5}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="dispatcher">Dispatcher</option>
                    <option value="broker">Broker</option>
                    <option value="owner">Owner</option>
                    <option value="driver">Driver</option>
                  </select>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isApproved ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{user.isApproved ? "Yes" : "No"}</span>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  {!user.isApproved && (
                    <button onClick={() => approveUser(user.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm" aria-label="Pagination">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-base font-medium text-gray-500 hover:bg-gray-50 mr-1">
            Previous
          </button>
          {Array.from({ length: Math.ceil(localUsers.length / itemsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)} className={`relative mx-1 inline-flex items-center px-4 py-2 border text-base font-medium ${currentPage === index + 1 ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"}`}>
              {index + 1}
            </button>
          ))}
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(localUsers.length / itemsPerPage)} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-base ml-1 font-medium text-gray-500 hover:bg-gray-50">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default UsersList;
