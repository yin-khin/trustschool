import { useEffect, useState } from "react";
import { Wallet, Receipt, CreditCard, TrendingDown } from "lucide-react";
import { feeAPI, studentAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

const StudentFees = () => {
  const { user } = useAuth();
  const [fees, setFees] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const myStudent = user?.profile;

      if (myStudent) {
        const [feeRes, payRes] = await Promise.all([
          feeAPI.getAll({ student_id: myStudent.id, limit: 100 }),
          feeAPI.getPayments({ student_id: myStudent.id, limit: 100 }),
        ]);
        setFees(feeRes.data.data || []);
        setPayments(payRes.data.data || []);
      }
    } catch (e) {
      console.error("Load fees error:", e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      paid: "badge-success",
      partial: "badge-warning",
      pending: "badge-info",
      overdue: "badge-danger",
      cancelled: "badge-gray",
    };
    return map[status] || "badge-gray";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  };

  const totalOutstanding = fees.reduce((sum, fee) => {
    if (fee.status === "paid" || fee.status === "cancelled") return sum;
    const total = parseFloat(fee.amount) - parseFloat(fee.discount || 0);
    return sum + (total - parseFloat(fee.paid_amount || 0));
  }, 0);

  const totalPaid = payments.reduce(
    (sum, p) => sum + parseFloat(p.amount || 0),
    0,
  );

  const stats = [
    {
      title: "Total Fees",
      value: formatCurrency(
        fees.reduce((s, f) => s + parseFloat(f.amount || 0), 0),
      ),
      icon: Wallet,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Paid",
      value: formatCurrency(totalPaid),
      icon: CreditCard,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Outstanding",
      value: formatCurrency(totalOutstanding),
      icon: TrendingDown,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Invoices",
      value: fees.length,
      icon: Receipt,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Fees</h1>
        <p className="text-gray-500 text-sm">
          View your fee invoices and payment history
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="card p-4 fade-in">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fee invoices */}
      <div className="card overflow-x-auto no-scrollbar">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold">Fee Invoices</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Invoice</th>
              <th className="table-header">Type</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Paid</th>
              <th className="table-header">Due Date</th>
              <th className="table-header">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {fees.map((fee) => (
              <tr key={fee.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium">{fee.invoice_no}</td>
                <td className="table-cell capitalize">{fee.fee_type}</td>
                <td className="table-cell">{formatCurrency(fee.amount)}</td>
                <td className="table-cell">
                  {formatCurrency(fee.paid_amount)}
                </td>
                <td className="table-cell">{fee.due_date || "-"}</td>
                <td className="table-cell">
                  <span className={getStatusBadge(fee.status)}>
                    {fee.status}
                  </span>
                </td>
              </tr>
            ))}
            {fees.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="table-cell text-center text-gray-500 py-6"
                >
                  {loading ? "Loading..." : "No fee invoices found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Payment history */}
      <div className="card overflow-x-auto no-scrollbar">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold">Payment History</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Receipt</th>
              <th className="table-header">Invoice</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Method</th>
              <th className="table-header">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium">{payment.receipt_no}</td>
                <td className="table-cell">{payment.Fee?.invoice_no || "-"}</td>
                <td className="table-cell">{formatCurrency(payment.amount)}</td>
                <td className="table-cell capitalize">
                  {payment.payment_method}
                </td>
                <td className="table-cell">{payment.payment_date}</td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="table-cell text-center text-gray-500 py-6"
                >
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentFees;
