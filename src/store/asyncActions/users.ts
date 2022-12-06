import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { getUsersAction } from "../usersReducer";
import { v4 as uuidv4 } from "uuid";
import { IUser } from "../fetchTypes";

export const fetchUsers = (): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => response.data)
      .then((data) => {
        const newData = data.map((user: IUser) => ({
          ...user,
          id: uuidv4(),
          edited: false,
        }));
        dispatch(getUsersAction(newData));
      });
  };
};
