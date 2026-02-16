export default function ItemCard({ item }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200">

      <div className="flex justify-between items-center">

        <div>
          <h3 className="font-medium capitalize text-gray-800">
            {item.name}
          </h3>

          <p className="text-sm text-gray-500">
            Qty: {item.quantity}
          </p>
        </div>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">
          {item.category}
        </span>

      </div>
    </div>
  );
}
