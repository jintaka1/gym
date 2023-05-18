import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Processing from "../components/Processing";
import {
  getAllClassInfo,

} from "../api/classes";
import { formatDate } from "../components/FormatDate";
import ClassEdit from "../components/ClassEdit";
import TopBar from "../components/TopBar";
import classNames from "classnames";
import { useAuthentication } from "../hooks/authentication";

export default function ClassCRUD() {
  const [refreshTrigger, setRefreshTrigger] = useState();
  const [selectedClassID, setSelectedClassID] =
    useState(null);
//// find the trianer classes for the trainer////
const [user] = useAuthentication();
  // Load class list
  //if the user role is trainer, then only show the classes that the trainer is teaching
  const [classes, setClasss] = useState([]);
  useEffect(() => {
    getAllClassInfo().then((classes) => {
      if (user.role === "trainer") {
        const filteredClasses = classes.filter(
          (cls) =>
            cls.trainer_firstname === user.firstName &&
            cls.trainer_lastname === user.lastName
        );
        setClasss(filteredClasses);
      } else {
        setClasss(classes);
      }
    });
  }, [refreshTrigger]);

  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 ">
        <Nav />
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 col-span-6 md:col-span-5 py-8 px-4">
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-2xl font-semibold mb-4">Classes</h2>
            <div className="overflow-auto w-full">
              {classes == null ? (
                <Processing />
              ) : (
                <table className="table table-compact w-full overflow-scroll">
                  <thead>
                    <tr>
                    <th>Select</th>
                    <th>Trainer</th>
                    <th>Room</th>
                    <th>Activity</th>
                    <th>Datetime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map((cls) => (
                      <tr key={cls.class_id}className={classNames("border-b", {
                        active: selectedClassID === cls.class_id,
                      })}
                    >
                        <td>
                          <button
                            className="btn btn-xs mt-1 btn-primary"
                            onClick={() =>
                              setSelectedClassID(cls.class_id)
                            }
                          >
                            Edit
                          </button>
                        </td>
                        <td>
                          {cls.trainer_firstname}{" "}
                          {cls.trainer_lastname}
                        </td>
                        <td>
                          {cls.room_location}
                          <br />
                          Room No.
                          {cls.room_number}
                        </td>
                        <td>{cls.activity_name}</td>
                        <td>
                          {formatDate(cls.class_datetime)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-2xl font-semibold mb-4">
              Selected Class
            </h2>
            <ClassEdit
              classID={selectedClassID}
              onSave={() => setRefreshTrigger({})}
              user={user}
            />
          </div>
        </div>
      </div>
    </>
  );
}
