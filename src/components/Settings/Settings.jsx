import UpdateUserData from "../UpdateUserData/UpdateUserData";
import UpdateUserPassword from "../UpdateUserPassword/UpdateUserPassword";

function Settings() {
  return (
    <>
      <h1 className="text-3xl mb-3 text-center font-bold text-green-600">
        Settings
      </h1>
      <UpdateUserData />
      <hr className="max-w-md mx-auto mt-10 border-2 border-green-600" />
      <UpdateUserPassword />
    </>
  );
}

export default Settings;
