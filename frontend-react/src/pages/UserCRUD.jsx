import { useEffect, useState } from "react";
import { getAllUsers } from "../api/user";
import Nav from "../components/Nav";
import Processing from "../components/Processing"
import UserEdit from "../components/UserEdit";
import TopBar from "../components/TopBar";
import classNames from "classnames";

export default function UserCRUD() {
  const [refreshTrigger, setRefreshTrigger] = useState();
  const [selectedUserID, setSelectedUserID] =
    useState(null);

  // Load user list
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getAllUsers().then((users) => {
      setUsers(users);
    });
  }, [refreshTrigger]);

  return (
  <>
  <TopBar />
      <div className="container grid grid-cols-6 ">
        <Nav />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 col-span-6 md:col-span-5 py-8 px-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4">Users</h2>
            <div className="overflow-auto w-full">
              {users == null ? (
                <Processing />
              ) : (
                <table className="table w-full overflow-scroll text-left">
                  <thead>
                    <tr>
                      <th className="px-2 py-1">Select</th>
                      <th className="px-2 py-1">Name</th>
                      <th className="px-2 py-1">Role</th>
                      <th className="px-2 py-1">Email</th>
                      <th className="px-2 py-1">Phone</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className={classNames("border-b", {
                        active: selectedUserID === user.id,
                      })}
                    >
                        <td className="px-2 py-1">
                          <button
                            className="btn btn-xs mt-1 btn-primary"
                            onClick={() =>
                              setSelectedUserID(user.id)
                            }
                          >
                            Edit
                          </button>
                        </td>
                        <td className="px-2 py-1">
                          {user.firstName} {user.lastName}
                        </td>
                        <td className="px-2 py-1">{user.role}</td>
                        <td className="px-2 py-1">{user.email}</td>
                        <td className="px-2 py-1">{user.phone}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4">Selected User</h2>
            <UserEdit
            deleteFunction={true}
              userID={selectedUserID}
              onSave={() => setRefreshTrigger({})}
              allowEditRole={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}

