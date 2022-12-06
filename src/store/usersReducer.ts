import { RootState } from ".";
import { IUser } from "./fetchTypes";

export interface IStore {
  users: IUser[];
  user: IUser | null | undefined;
}
const defaultState: IStore = {
  users: [],
  user: null,
};

export type action = {
  type: string;
  users: IUser[];
  id: string;
  user: IUser;
  editableUser: IUser;
};

const GET_USERS = "GET_USERS";
const GET_USER = "GET_USER";
const CLEAR_INFO_USER = "CLEAR_INFO_USER";
const CREATE_USER = "CREATE_USER";
const UPDATE_USER = "UPDATE_USER";
const REMOVE_USER = "REMOVE_USER";

export const usersReducer = (state = defaultState, action: action): IStore => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.users };
    case CREATE_USER:
      return { ...state, users: [...state.users, action.user] };
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((item) =>
          item.id === action.editableUser.id ? action.editableUser : item
        ),
      };
    case CLEAR_INFO_USER:
      return { ...state, user: null };
    case GET_USER:
      return {
        ...state,
        user: state.users.find((user) => user.id === action.id),
      };
    case REMOVE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      return state;
  }
};

// Dispatch actions

export const getUsersAction = (users: IUser[]) => ({ type: GET_USERS, users });
export const getUserAction = (id: string) => ({ type: GET_USER, id });
export const clearInfoUserAction = () => ({ type: CLEAR_INFO_USER });
export const createUserAction = (user: IUser) => ({ type: CREATE_USER, user });
export const updateUserAction = (editableUser: IUser) => ({
  type: UPDATE_USER,
  editableUser,
});
export const removeUserAction = (id: string) => ({ type: REMOVE_USER, id });

// Selectors

export const usersSelector = (state: RootState): IUser[] =>
  state.usersReducer.users;

export const userSelector = (state: RootState): IUser | null | undefined =>
  state.usersReducer.user;
