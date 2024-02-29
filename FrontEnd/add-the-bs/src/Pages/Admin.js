import React, { useEffect, useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchReviews();
  }, []);

  useEffect(() => {
    if (users != null && reviews != null) {
      setIsLoading(false);
    }
  }, [users, reviews]);

  const fetchUsers = async () => {
    const response = await fetch("http://localhost:3306/users");
    const data = await response.json();
    console.log(data);
    setUsers(data.slice().reverse());
  };
  const fetchReviews = async () => {
    const response = await fetch("http://localhost:3306/reviews");
    const data = await response.json();
    console.log(data);
    setReviews(data.slice().reverse());
  };

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  const deleteUser = async (user) => {
    console.log("Deleting user: ", user);
    //API call here
    if (user.userKey !== null) {
      const response = await fetch(
        `http://localhost:3306/user/delete/key/${user.userKey}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (response.ok) {
        setMessage("User " + user.Email + " deleted Successfully");
        fetchUsers();
      }
    } else {
      setMessage("YOU CANNOT DELETE ONE OF 1k IMPORTED USERS");
    }
  };
  const deleteReview = async (review) => {
    console.log("Deleting user: ", review);
    //API call here
    const response = await fetch(
      `http://localhost:3306/review/delete/${review.id}`,
      {
        method: "DELETE",
      }
    );
    console.log(response);
    if (response.ok) {
      setMessage("Review " + review.id + " deleted Successfully");
      fetchReviews();
    }
  };

  return (
    <div>
      <header className="App-header">
        {isLoading ? (
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-10 h-10text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <>
            {message && <h2>{message}</h2>}
            <div className="flex flex-wrap -mb-px font-medium text-center my-5 text-xl">
              <button
                className={`px-4 mx-5 py-2 rounded ${
                  activeTab === 1
                    ? "border-b-2 border-blue-500 bg-blue-500 text-white"
                    : "border-b-4 border-blue-500 text-gray-800 text-white"
                }`}
                onClick={() => changeTab(1)}
              >
                Users
              </button>
              <button
                className={`px-4 mx-5 py-2 rounded ${
                  activeTab === 2
                    ? "border-b-2 border-blue-500 bg-blue-500 text-white"
                    : "border-blue-500 text-gray-800 border-b-4 text-white"
                }`}
                onClick={() => changeTab(2)}
              >
                Reviews
              </button>
            </div>

            <div>
              {activeTab === 1 && (
                <ul className="mt-5 container flex flex-col text-base">
                  <li className="grid grid-cols-5 gap-4 text-lg text-center">
                    <div>
                      <b>Email</b>
                    </div>
                    <div>
                      <b>User ID Keys</b>
                    </div>
                    <div>
                      <b>Full Name</b>
                    </div>
                    <div>
                      <b>Address</b>
                    </div>
                  </li>
                  <hr className="mb-5" />

                  {users.map((user) => (
                    <>
                      <li key={user.id} className="grid grid-cols-5 gap-4">
                        <div className="mr-6">{user.Email}</div>
                        <div>
                          {user.userKey ? <>{user.userKey}</> : <>NO KEY</>}
                        </div>
                        <div>
                          {user.fname && user.lname ? (
                            <>
                              {user.fname} {user.lname}
                            </>
                          ) : (
                            <>NO NAME</>
                          )}
                        </div>
                        <div>
                          {user.city && user.street && user.state ? (
                            <>
                              {user.street} {user.city} {user.state}
                            </>
                          ) : (
                            <>NO ADDRESS</>
                          )}
                        </div>
                        <div className="flex justify-center">
                          <button
                            type="button"
                            className="text-red-700 w-40 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => deleteUser(user)}
                          >
                            Delete User
                          </button>
                        </div>
                      </li>
                      <hr className="mb-5" />
                    </>
                  ))}
                </ul>
              )}
              {activeTab === 2 && (
                <ul className="mt-5 container flex flex-col text-base">
                  <li className="grid grid-cols-5 gap-4 text-lg text-center">
                    <div>
                      <b>MovieId</b>
                    </div>
                    <div>
                      <b>User Keys</b>
                    </div>
                    <div>
                      <b>Comment</b>
                    </div>
                    <div>
                      <b>Star Rating</b>
                    </div>
                  </li>
                  <hr className="mb-5" />

                  {reviews.map((review) => (
                    <>
                      <li key={review.id} className="grid grid-cols-5 gap-4">
                        <div className="mr-6">{review.movieId}</div>
                        <div>
                          {review.userKey ? <>{review.userKey}</> : <>NO KEY</>}
                        </div>
                        <div>
                          {review.comment ? (
                            <>{review.comment}</>
                          ) : (
                            <>NO COMMENT</>
                          )}
                        </div>
                        <div>
                          {review.starRating ? (
                            <>{review.starRating}</>
                          ) : (
                            <>NO Star Rating Found</>
                          )}
                        </div>
                        <div className="flex justify-center">
                          <button
                            type="button"
                            className="text-red-700 w-40 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => deleteReview(review)}
                          >
                            Delete review
                          </button>
                        </div>
                      </li>
                      <hr className="mb-5" />
                    </>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </header>
    </div>
  );
};

export default Admin;
