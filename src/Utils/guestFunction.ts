import { hasGuestAccess } from "./guestAccess";
import { toast } from "react-toastify";

const protectedAction = (action: () => void) => {
  const isGuest = hasGuestAccess();

  if (isGuest) {
    toast(
      "شما به عنوان مهمان وارد شده اید و اجازه انجام این عملیات را ندارید.",
    );
    return;
  }

  action();
};
export default protectedAction;
