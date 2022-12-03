import { useLazyQuery } from "@apollo/client";
import { GET_USER_BY_ID, GET_USER_BY_EMAIL } from "./gql";
import errorHandler from "@/helpers/errorHandler";

export const useGetUserByID = () => {
  const res = useLazyQuery(GET_USER_BY_ID, {
    onCompleted: async (data) => {
      console.log(data.getUserByID);
    },
    onError: async (err) => {
      const msg = errorHandler(err);
    },
  });

  return res;
};

export const useGetUserByEmail = () => {
  const res = useLazyQuery(GET_USER_BY_EMAIL, {
    onCompleted: async (data) => {
      console.log(data.getUserByEmail);
    },
    onError: async (err) => {
      const msg = errorHandler(err);
    },
  });

  return res;
};
