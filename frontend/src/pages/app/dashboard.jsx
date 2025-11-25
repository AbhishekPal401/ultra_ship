import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Filter,
  LayoutList,
  LayoutGrid,
  MoreVertical,
  Folder,
  Pencil,
  Trash2,
  X,
  Loader2,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./dashboard.css";
import {
  useGetEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} from "../../services/employees";
import { toast } from "react-toastify";

const DashboardHeader = ({ title, icon: Icon, onAddNew }) => (
  <div className="top-header">
    <div className="header-title-group">
      <Icon className="header-icon" size={20} />
      <h1 className="header-title">{title}</h1>
    </div>
    <div className="header-actions">
      <button className="btn">Analytics</button>
      <button className="btn">History</button>
      <button className="btn btn-primary" onClick={onAddNew}>
        <Plus size={16} /> New
      </button>
    </div>
  </div>
);

const DepartmentGrid = ({ data }) => {
  const classes = [...new Set((data || []).map((item) => item.class))].sort();

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <div className="section-title">Classes • {classes.length} ITEMS</div>
        <div className="section-action">
          <Plus size={14} /> Add Class
        </div>
      </div>
      <div className="departments-grid">
        {classes.map((cls) => (
          <div key={cls} className="dept-card">
            <div className="dept-info">
              <Folder size={18} className="dept-icon" />
              {cls} Class
            </div>
            <MoreVertical size={16} className="dept-icon" />
          </div>
        ))}
      </div>
    </div>
  );
};

const EmployeeToolbar = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewChange,
  count,
  isFetching,
}) => (
  <>
    <div className="section-header" style={{ marginTop: "24px" }}>
      <div className="section-title">
        Records • {count} (Current Page)
        {isFetching && <span className="updating-indicator">Updating...</span>}
      </div>
    </div>
    <div className="toolbar">
      <div className="search-wrapper">
        <Search className="search-icon" size={16} />
        <input
          type="text"
          className="search-input"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="view-controls">
        <button className="btn">
          <Filter size={14} /> Sort
        </button>
        <button
          className={`icon-btn ${viewMode === "list" ? "active" : ""}`}
          onClick={() => onViewChange("list")}
        >
          <LayoutList size={18} />
        </button>
        <button
          className={`icon-btn ${viewMode === "grid" ? "active" : ""}`}
          onClick={() => onViewChange("grid")}
        >
          <LayoutGrid size={18} />
        </button>
      </div>
    </div>
  </>
);

const EmployeeTable = ({ employees, onDelete, onEdit, isLoading }) => {
  if (isLoading) {
    return (
      <div className="table-container empty-state">
        <Loader2 className="animate-spin" size={24} />
        <p>Loading data...</p>
      </div>
    );
  }

  if (!employees || employees.length === 0) {
    return <div className="table-container empty-state">No records found.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="col-checkbox">
              <input type="checkbox" />
            </th>
            <th>Name</th>
            <th>Class</th>
            <th>Attendance</th>
            <th>Subjects</th>
            <th className="col-actions"></th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="col-checkbox">
                <input type="checkbox" />
              </td>
              <td>
                <div className="employee-cell">
                  <div className="avatar">{emp.name.charAt(0)}</div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: 500 }}>{emp.name}</span>
                    <span style={{ fontSize: "11px", color: "#6b7280" }}>
                      Age: {emp.age}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span className="class-badge">{emp.class}</span>
              </td>
              <td>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${emp.attendance}%`,
                        backgroundColor:
                          emp.attendance < 80 ? "#ef4444" : "#10b981",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "12px", fontWeight: 500 }}>
                    {emp.attendance}%
                  </span>
                </div>
              </td>
              <td>
                <span style={{ fontSize: "12px", color: "#4b5563" }}>
                  {(emp.subjects || []).join(", ")}
                </span>
              </td>
              <td className="col-actions">
                <div className="action-group">
                  <button
                    className="action-btn"
                    title="Edit"
                    onClick={() => onEdit(emp)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="action-btn"
                    title="Delete"
                    onClick={() => onDelete(emp.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                  <button className="action-btn">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Pagination = ({
  currentPage,
  onPageChange,
  currentCount,
  itemsPerPage,
}) => {
  return (
    <div className="pagination-footer">
      <div className="pagination-info">
        Page <strong>{currentPage}</strong>
      </div>
      <div className="pagination-controls">
        <button
          className="page-btn"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          title="Previous Page"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentCount < itemsPerPage}
          title="Next Page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

const EmployeeModal = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
  isEditing,
  isSaving,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3 className="modal-title">
            {isEditing ? "Edit Record" : "Add New Record"}
          </h3>
          <X className="close-btn" size={20} onClick={onClose} />
        </div>
        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.age}
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Class</label>
                <select
                  className="form-input"
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                >
                  <option value="8th">8th</option>
                  <option value="9th">9th</option>
                  <option value="10th">10th</option>
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Attendance (%)</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.attendance}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      attendance: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Subjects (Comma separated)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Maths, Science, Art"
                value={formData.subjects}
                onChange={(e) =>
                  setFormData({ ...formData, subjects: e.target.value })
                }
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : isEditing
                ? "Save Changes"
                : "Add Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [viewMode, setViewMode] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const LIMIT = 7;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: employees = [],
    isLoading,
    isFetching,
  } = useGetEmployeesQuery({
    search: debouncedSearch,
    page: page,
    limit: LIMIT,
  });

  const [addEmployee, { isLoading: isAdding, data, error }] =
    useAddEmployeeMutation();
  const [
    updateEmployee,
    { isLoading: isUpdating, data: updateData, error: updateError },
  ] = useUpdateEmployeeMutation();

  console.log("data, error:", data, error);
  console.log("updateData, updateError:", updateData, updateError);

  useEffect(() => {
    if (updateError) {
      const msg =
        updateError?.message ||
        updateError?.error ||
        updateError?.data?.errors[0]?.message ||
        "Not allowed";

      toast.error(msg);
    }
  }, [updateError]);

  useEffect(() => {
    if (error) {
      const msg =
        error?.message ||
        error?.error ||
        error?.data?.errors[0]?.message ||
        "Not allowed";

      toast.error(msg);
    }
  }, [error]);

  const initialFormState = {
    name: "",
    age: "",
    class: "10th",
    attendance: 0,
    subjects: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleOpenAddModal = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (emp) => {
    setFormData({
      ...emp,
      subjects: Array.isArray(emp.subjects)
        ? emp.subjects.join(", ")
        : emp.subjects,
    });
    setIsEditing(true);
    setEditingId(emp.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      age: Number(formData.age),
      attendance: Number(formData.attendance),
      subjects: formData.subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (isEditing) {
        await updateEmployee({ ...payload, id: editingId }).unwrap();
      } else {
        await addEmployee(payload).unwrap();
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to save:", err);
    }
  };

  const handleDelete = async (id) => {};

  return (
    <div className="main-content">
      <DashboardHeader
        title="School Records"
        icon={GraduationCap}
        onAddNew={handleOpenAddModal}
      />

      <div className="section-container">
        <DepartmentGrid data={employees} />

        <EmployeeToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewChange={setViewMode}
          count={employees?.length || 0}
          isFetching={isFetching}
        />

        <EmployeeTable
          employees={employees}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={handleOpenEditModal}
        />

        <Pagination
          currentPage={page}
          onPageChange={setPage}
          currentCount={employees?.length || 0}
          itemsPerPage={LIMIT}
        />
      </div>

      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        isEditing={isEditing}
        isSaving={isAdding || isUpdating}
      />
    </div>
  );
}
