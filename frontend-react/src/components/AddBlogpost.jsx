import { useState } from "react";
import { createBlogpost, getAllBlogpostsWithUserName } from "../api/blogposts";
import { useAuthentication } from "../hooks/authentication";

export default function AddBlogpost({ onBlogpostAdded }) {
  const [user] = useAuthentication();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddBlogpost = async (e) => {
    e.preventDefault();

    const blogpostTitle = e.target.title.value;
    const blogpostContent = e.target.content.value;
    try {
      const newBlogpost = {
        userID: user.id,
        title: blogpostTitle,
        content: blogpostContent,
      };
      await createBlogpost(newBlogpost);
      setShowAddModal(false);
      onBlogpostAdded();
    } catch (error) {
      console.error("Error adding blogpost:", error);
    }
    setShowAddModal(false);
  };

  return (
    <>
      <button
        className="btn bg-blue-600 text-white py-1 px-4 rounded mt-4 hover:bg-blue-700 transition duration-200"
        onClick={() => setShowAddModal(true)}
      >
        Add New Blogpost
      </button>
      {showAddModal && (
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
              <form onSubmit={handleAddBlogpost}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg leading-6 font-medium text-gray-900"
                        id="modal-title"
                      >
                        Add New Blogpost
                      </h3>
                      <div className="mt-2 ">
                        <input
                          type="text"
                          name="title"
                          placeholder="title"
                          className="border p-2 rounded-md w-full mt-2"
                          required
                        />
                        <textarea
                          type="text"
                          name="content"
                          placeholder="content"
                          className="textarea textarea-bordered p-2 w-full mt-2"
                          required
                          style={{ height: "200px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Blogpost
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
    );
}