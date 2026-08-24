import { useEffect, useState } from "react";
import { BookMarked, Search, BookOpen, User, Calendar } from "lucide-react";
import { libraryAPI, studentAPI } from "../../api";
import { useAuth } from "../../context/AuthContext";

const StudentLibrary = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const bookRes = await libraryAPI.getBooks({ limit: 100 });
      setBooks(bookRes.data.data || []);

      const myStudent = user?.profile;

      if (myStudent) {
        const transRes = await libraryAPI.getTransactions({
          student_id: myStudent.id,
          limit: 100,
        });
        setTransactions(transRes.data.data || []);
      }
    } catch (e) {
      console.error("Load library error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await libraryAPI.getBooks({ search, limit: 100 });
      setBooks(res.data.data || []);
    } catch (e) {
      console.error("Search books error:", e);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      available: "badge-success",
      borrowed: "badge-warning",
      maintenance: "badge-info",
      lost: "badge-danger",
    };
    return map[status] || "badge-gray";
  };

  const getTransStatusBadge = (status) => {
    const map = {
      issued: "badge-info",
      returned: "badge-success",
      overdue: "badge-danger",
      lost: "badge-danger",
    };
    return map[status] || "badge-gray";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Library</h1>
          <p className="text-gray-500 text-sm">
            Browse books and view your borrowed items
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="input max-w-xs"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="btn-primary" onClick={handleSearch}>
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Books grid */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Available Books</h2>
        {loading ? (
          <div className="text-center py-8 text-gray-500">Loading books...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.map((book) => (
              <div
                key={book.id}
                className="card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                    <BookMarked className="w-5 h-5" />
                  </div>
                  <span className={`badge ${getStatusBadge(book.status)}`}>
                    {book.status}
                  </span>
                </div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> {book.book_id}
                  </span>
                  <span>
                    Available: {book.available}/{book.quantity}
                  </span>
                </div>
                {book.category && (
                  <span className="badge-info mt-2">{book.category}</span>
                )}
              </div>
            ))}
            {books.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                No books found
              </div>
            )}
          </div>
        )}
      </div>

      {/* My borrowed books */}
      <div className="card overflow-x-auto no-scrollbar">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold">My Borrowed Books</h2>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="table-header">Book</th>
              <th className="table-header">Issue Date</th>
              <th className="table-header">Due Date</th>
              <th className="table-header">Status</th>
              <th className="table-header">Fine</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {transactions.map((trans) => (
              <tr key={trans.id} className="hover:bg-gray-50">
                <td className="table-cell font-medium">
                  {trans.Book?.title || "-"}
                </td>
                <td className="table-cell">{trans.issue_date}</td>
                <td className="table-cell">{trans.due_date}</td>
                <td className="table-cell">
                  <span className={getTransStatusBadge(trans.status)}>
                    {trans.status}
                  </span>
                </td>
                <td className="table-cell">{trans.fine_amount || 0}</td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="table-cell text-center text-gray-500 py-6"
                >
                  No borrowed books
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentLibrary;
