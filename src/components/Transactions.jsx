import React, { useState } from 'react';

export default function Transactions({ data, setData }) {
  const [filter, setFilter] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    date: '',
    type: 'expense',
    desc: '',
    amount: '',
    category: data.categories[0] || '',
    account: data.accounts[0]?.name || '',
  });

  // ✅ Filtered transactions
  const list = data.transactions.filter(
    (t) =>
      !filter ||
      t.category.toLowerCase().includes(filter.toLowerCase()) ||
      t.desc.toLowerCase().includes(filter.toLowerCase())
  );

  // ✅ ADD or UPDATE transaction
  function add(e) {
    e.preventDefault();

    if (editIndex !== null) {
      const updated = [...data.transactions];
      updated[editIndex] = { ...form, amount: parseFloat(form.amount) };

      setData(prev => ({ ...prev, transactions: updated }));
      setEditIndex(null);
    } else {
      setData(prev => ({
        ...prev,
        transactions: [
          ...prev.transactions,
          { ...form, amount: parseFloat(form.amount) },
        ],
      }));
    }

    setForm({
      date: '',
      type: 'expense',
      desc: '',
      amount: '',
      category: data.categories[0] || '',
      account: data.accounts[0]?.name || '',
    });

    document.getElementById('addForm')?.classList.add('hidden');
  }

  // ✅ DELETE
  function remove(index) {
    if (!window.confirm('Delete this transaction?')) return;

    const updated = data.transactions.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, transactions: updated }));
  }

  // ✅ EDIT
  function editTransaction(index) {
    const t = data.transactions[index];

    setForm({
      date: t.date,
      type: t.type,
      desc: t.desc,
      amount: t.amount,
      category: t.category,
      account: t.account,
    });

    setEditIndex(index);
    document.getElementById('addForm')?.classList.remove('hidden');
  }

  return (
    <div>
      <div className="card">

        {/* ✅ HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="small">All Transactions</div>
            <div className="big">Transaction Log</div>
          </div>

          <div className="flex gap-2">
            <input
              className="input"
              placeholder="Search or filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <button
              className="btn"
              onClick={() =>
                document.getElementById('addForm')?.classList.toggle('hidden')
              }
            >
              Add
            </button>
          </div>
        </div>

        {/* ✅ ADD / EDIT FORM */}
        <form id="addForm" className="hidden mb-4" onSubmit={add}>
          <div className="grid grid-cols-2 gap-2">
            <input
              className="input"
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              required
            />

            <select
              className="input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <input
              className="input"
              placeholder="Description"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              required
            />

            <input
              className="input"
              placeholder="Amount (PKR)"
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              required
            />

            <select
              className="input"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {data.categories.map((c, i) => (
                <option key={i} value={c}>{c}</option>
              ))}
            </select>

            <select
              className="input"
              value={form.account}
              onChange={(e) => setForm({ ...form, account: e.target.value })}
            >
              {data.accounts.map((a, i) => (
                <option key={i} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>

          <div className="mt-3">
            <button className="btn" type="submit">
              {editIndex !== null ? 'Update Transaction' : 'Save Transaction'}
            </button>
          </div>
        </form>

        {/* ✅ TRANSACTIONS TABLE */}
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Account</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((t, i) => (
              <tr key={i} className="text-gray-700">
                <td className="small">{t.date}</td>
                <td>{t.desc}</td>
                <td className="small">{t.category}</td>
                <td className="font-medium">PKR {t.amount.toLocaleString()}</td>
                <td className="small">{t.account}</td>

                <td className="flex gap-2">
                  <button
                    className="text-blue-600 text-sm hover:underline"
                    onClick={() => editTransaction(i)}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-600 text-sm hover:underline"
                    onClick={() => remove(i)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}
