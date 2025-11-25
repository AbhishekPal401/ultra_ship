import Sidebar from "../sidebar/sidebar";

export default function AppLayout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ marginLeft: 260, padding: "20px", width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
