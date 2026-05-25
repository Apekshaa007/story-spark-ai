import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const PaymentComponent = () => {
  const navigate = useNavigate();

  // FIX: Read plan and price passed from pricing page
  const [searchParams] = useSearchParams();
  const planName = searchParams.get("plan") || "Pro";
  const planPrice = searchParams.get("price") || "19";

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const formatExpiry = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/^(\d{2})(\d)/, "$1/$2");
  };

  const isFormValid = name && cardNumber.length === 19 && expiry.length === 5 && cvv.length === 3;

  const handlePay = () => {
    if (!isFormValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0d1b2a] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-200">
            Complete Your Subscription
          </h1>
          <p className="text-gray-400 mt-2">
            Enter your card details to get started
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#1a2a3f] rounded-2xl shadow-lg p-8 border border-slate-700/50">

          {/* Order Summary — dynamically shows selected plan */}
          <div className="bg-indigo-600/20 border border-indigo-500/30 rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 font-medium">
                {planName} Plan — Monthly
              </span>
              <span className="text-indigo-400 font-bold text-lg">
                ${planPrice}/mo
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Billed monthly. Cancel anytime.
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Cardholder Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-[#0d1b2a] text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-[#0d1b2a] text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Expiry + CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-[#0d1b2a] text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  CVV
                </label>
                <input
                  type="password"
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  className="w-full px-4 py-3 rounded-lg border border-slate-600 bg-[#0d1b2a] text-gray-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePay}
            disabled={loading || !isFormValid}
            className="mt-6 w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Processing...
              </>
            ) : (
              `Pay Now — $${planPrice}/mo`
            )}
          </button>

          {/* Back Link */}
          <div className="text-center mt-4">
            <Link
              to="/pricing"
              className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition"
            >
              ← Back to Pricing
            </Link>
          </div>

          {/* Security Note */}
          <p className="text-center text-xs text-gray-600 mt-4">
            🔒 Your payment is secured with 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;