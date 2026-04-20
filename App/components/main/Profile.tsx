import { X } from "lucide-react";

export default function UserCard({
  name,
  email,
  credits,
  premium,
  onClose,
}: {
  name: string;
  email: string;
  credits: number;
  premium: boolean;
  onClose: () => void;
}) {
  return (
    <section className="bg-white mt-5 w-88 rounded-2xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">User Profile</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Avatar + Name */}
      <div className="flex flex-col items-center py-5 gap-2">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
          {name.charAt(0)}
        </div>
        <p className="text-lg font-medium">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>

      {/* Info Section */}
      <div className="flex flex-col gap-4 px-5 pb-5">
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Plan</span>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              premium
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {premium ? "Premium" : "Flexible"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Credits</span>
          <span className="font-medium">{premium ? "No Limit" : credits}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Full Name</span>
          <span className="font-medium">{name}</span>
        </div>

      </div>
    </section>
  );
}