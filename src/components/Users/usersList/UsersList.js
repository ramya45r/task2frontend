import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  fetchUsersAction} from "../../../redux/slices/users/usersSlices";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
   
  const dispatch = useDispatch();
  const users = useSelector((state) => state?.users);
  const { usersList, loading, appErr, serverErr,block,unblock } = users;
  useEffect(() => {
    dispatch(fetchUsersAction());
  }, [block,unblock]);

  //data from store
  
  return (
    <>
      <section class="py-8 bg-gray-200 min-h-screen ">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h3 className="text-red-500 text-center text-lg font-serif">
            {appErr} {serverErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map((user) => (
            <>
          
              <UsersListItem user={user} />

            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;