import { AdminCreateUser } from "./AdminCreateUser";
import { AdminUserList } from "./AdminUserList";
import { AdminUpdateUser } from "./AdminUpdateUser";
import UserService from "./user.service";

const userServiceObj = new UserService();

export { AdminCreateUser, AdminUserList, AdminUpdateUser, userServiceObj };
