import { useEffect, useState } from "react";
import { getAllBlogpostsWithUserName } from "../api/blogposts";
import Nav from "../components/Nav";
import Processing from "../components/Processing";
import AddBlogpost from "../components/AddBlogpost"
import TopBar from "../components/TopBar";

export default function MemberBlogposts() {
  // Load blogpost list
  const [blogposts, setBlogposts] = useState([]);
  useEffect(() => {
    getAllBlogpostsWithUserName().then((blogposts) => {
      setBlogposts(blogposts);
    });
  }, []);
  // add blogpost
  const handleBlogpostAdded = async () => {
    getAllBlogpostsWithUserName().then((blogposts) =>
      setBlogposts(blogposts)
    );
  };
  return (
    <>
      <TopBar />
      <div className="container grid grid-cols-6 ">
        <Nav />
        <div className="container   col-span-6 md:col-span-5  ">
      <div className="container px-4 py-4 w-full">
        <div className="w-full mx-auto ">
            <div className="flex justify-between flex-wrap sm:flex-nowrap">
          <h2 className="text-3xl font-semibold mb-4">Blogposts</h2>
          <div><AddBlogpost onBlogpostAdded={handleBlogpostAdded} /></div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {blogposts == null ? (
              <Processing />
            ) : (
              blogposts.map((blogpost, index) => (
                <div
                  key={blogpost.id}
                  className={` mt-2 rounded-xl bg-slate-100 shadow-xl p-4 flex flex-wrap sm:flex-nowrap ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/3">
                  <img
                    src={"../src/assets/blogpost"+index % 4+".jpg" }
                    alt="Blogpost"
                    className=" w-full h-64 object-cover mb-4 md:mb-0 md:mr-4 rounded "
                  />
                  </div>
                  <div className="md:w-2/3 md:ml-5">
                    <h3 className="text-xl font-semibold">
                      {blogpost.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      By {blogpost.user_firstname} {blogpost.user_lastname}
                    </p>
                    <p>{blogpost.content}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  );
}