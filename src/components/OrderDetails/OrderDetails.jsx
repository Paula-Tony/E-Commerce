const OrderDetails = ({ order }) => {
  const {
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalOrderPrice,
    paymentMethodType,
    isPaid,
    isDelivered,
    user,
    cartItems,
    createdAt,
  } = order;

  return (
    <div className="max-w-5xl border-b mb-4 mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-extrabold text-green-600 mb-8 text-center">
        Order Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Shipping Address
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-2">{shippingAddress.details}</p>
            <p className="text-gray-700 mb-2">{shippingAddress.city}</p>
            <p className="text-gray-700 mb-2">{shippingAddress.phone}</p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            User Info
          </h3>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 mb-2">Name: {user.name}</p>
            <p className="text-gray-700 mb-2">Email: {user.email}</p>
            <p className="text-gray-700 mb-2">Phone: {user.phone}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Payment Info
        </h3>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-700 mb-2">
            Payment Method: {paymentMethodType}
          </p>
          <p className="text-gray-700 mb-2">Tax Price: ${taxPrice}</p>
          <p className="text-gray-700 mb-2">Shipping Price: ${shippingPrice}</p>
          <p className="text-gray-700 mb-2">
            Total Order Price: ${totalOrderPrice}
          </p>
          <p className={`mb-2 ${isPaid ? "text-green-600" : "text-red-600"}`}>
            Is Paid: {isPaid ? "Yes" : "No"}
          </p>
          <p
            className={`mb-2 ${
              isDelivered ? "text-green-600" : "text-red-600"
            }`}
          >
            Is Delivered: {isDelivered ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Cart Items</h3>
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white p-6 rounded-lg shadow-md space-x-6"
            >
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.product.title}
                </h4>
                <p className="text-gray-700">
                  Brand: {item.product.brand.name}
                </p>
                <p className="text-gray-700">
                  Category: {item.product.category.name}
                </p>
                <p className="text-gray-700">Price: ${item.price}</p>
                <p className="text-gray-700">Quantity: {item.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-gray-500 text-center">
        Order Created At: {new Date(createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default OrderDetails;
