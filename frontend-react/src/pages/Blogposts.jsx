import { useEffect, useState } from "react";
import {
  getAllBlogpostsWithUserName,
  deleteBlogpost,
} from "../api/blogposts";
import Nav from "../components/Nav";
import Processing from "../components/Processing";
import TopBar from "../components/TopBar";
import { useAuthentication } from "../hooks/authentication";
import { AiOutlineEye } from "react-icons/ai";
import AddBlogpost from "../components/AddBlogpost";
export default function Blogposts() {
  const [user] = useAuthentication();
  const [refreshTrigger, setRefreshTrigger] = useState();

  // modal
  const [showModal, setShowModal] = useState(false);
  const [selectedBlogpost, setSelectedBlogpost] =
    useState(null);
  // delete modal
  const [
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  ] = useState(false);
  const [blogpostToDelete, setBlogpostToDelete] =
    useState(null);

  // Load blogpost list
  const [blogposts, setBlogposts] = useState([]);
  useEffect(() => {
    getAllBlogpostsWithUserName().then((blogposts) => {
      setBlogposts(blogposts);
    });
  }, [refreshTrigger]);
  // modal
  function handleViewButtonClick(blogpost) {
    setSelectedBlogpost(blogpost);
    setShowModal(true);
  }
  // delete
  const handleDeleteClick = (blogpost) => {
    setBlogpostToDelete(blogpost);
    setShowDeleteConfirmation(true);
  };
  // add blogpost
  const handleBlogpostAdded = async () => {
    getAllBlogpostsWithUserName().then((blogposts) =>
      setBlogposts(blogposts)
    );
  };

  //format date
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 min-h-0">
        <Nav />
        <div className="container mx-auto grid grid-cols-1  gap-4 col-span-6 md:col-span-5 py-8 px-4">
          <div className="rounded border-2 border-primary p-2">
            <h2 className="text-2xl font-semibold mb-4">
              Blogposts
            </h2>
            <div className="overflow-auto w-full">
              {blogposts == null ? (
                <Processing />
              ) : (
                <table className="table table-compact w-full overflow-scroll">
                  <thead>
                    <th>View</th>
                    <th>User</th>
                    <th>Title</th>
                    <th className="hidden md:flex">
                      Content
                    </th>
                    <th>Date</th>
                    <th>Delete</th>
                  </thead>
                  <tbody>
                    {blogposts.map((blogpost) => (
                      <tr key={blogpost.id}>
                        <div>
                          <button
                            className="p-2 "
                            onClick={() =>
                              handleViewButtonClick(
                                blogpost
                              )
                            }
                          >
                            <AiOutlineEye size={25} />
                          </button>
                        </div>

                        <td>
                          {blogpost.user_firstname}{" "}
                          {blogpost.user_lastname}
                        </td>
                        <td>
                          {blogpost.title.slice(0, 20)}
                        </td>
                        <td className="hidden md:flex">
                          {blogpost.content.slice(0, 20)}...
                        </td>
                        <td>
                          {formatDate(blogpost.datetime)}
                        </td>
                        <button
                          className="btn btn-xs btn-danger mt-1 ml-1"
                          onClick={() =>
                            handleDeleteClick(blogpost)
                          }
                        >
                          Delete
                        </button>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <AddBlogpost
              onBlogpostAdded={handleBlogpostAdded}
            />
          </div>
        </div>

        {showModal && (
          <div
            className="fixed z-50 inset-0 overflow-y-auto"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                aria-hidden="true"
              ></div>
              <span
                className="hidden sm:inline-block sm:align-middle sm:h-screen"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      {selectedBlogpost && (
                        <div className="mt-2">
                          <span className="font-semibold">
                            User:
                          </span>
                          <span>
                            {" "}
                            {
                              selectedBlogpost.user_firstname
                            }{" "}
                            {selectedBlogpost.user_lastname}
                          </span>
                          <br />
                          <span className="font-semibold">
                            Title:
                          </span>
                          <span>
                            {" "}
                            {selectedBlogpost.title}
                          </span>
                          <br />
                          <br />
                          <span className="font-semibold">
                            Content:
                          </span>
                          <p> {selectedBlogpost.content}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {showDeleteConfirmation && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h3 className="text-xl font-bold">
                Delete Blogpost
              </h3>
              <p>
                Are you sure you want to delete this
                blogpost?
              </p>
              <div className="mt-4">
                <button
                  className="btn btn-danger mr-2"
                  onClick={async () => {
                    await deleteBlogpost(
                      blogpostToDelete.id
                    ); // Pass the blogpost ID
                    setShowDeleteConfirmation(false);
                    setRefreshTrigger(!refreshTrigger);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    setShowDeleteConfirmation(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
