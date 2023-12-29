import { https } from "./config";

export const userSer = {
  //   sigIn: (data) => {
  //     return https.post("/api/Users/signin", data);
  //   },
  signUp: (data) => {
    return https.post("/auth/login", data);
  },
  //   getAllUser: () => {
  //     return https.get("/users/get-users");
  //   }
};
