import { useSelector } from "react-redux";

export const SubHeader = () => {
  const user = useSelector(state => state.user);


  return (
    <div className="flex justify-between items-center mb-6 mt-4">
        <div>
          <h1 className="text-2xl font-semibold">Hi, {user?.Name || "User"} 👋</h1>
          
        </div>
        <img
          src={user?.imgURL }
          alt="Profile"
          className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-gray-300 object-cover"
        />
      </div>
  )
}
