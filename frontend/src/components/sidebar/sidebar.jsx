import React, { useState } from "react";
import { ChevronDown, LogOut, Plus, X } from "lucide-react";
import styles from "./Sidebar.module.css";
import { menuGroups } from "./menuConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../store/slices/auth/login";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const user = useSelector((state) => state.auth.user);

  const handleClick = (item) => {
    navigate(item.path);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <div className={styles.orgSelector}>
          <div className={styles.orgAvatar}>A</div>
          <span>{user?.name || ""}</span>
          <ChevronDown size={14} color="#6b7280" />
        </div>

        <button className={styles.addBtn}>
          <Plus size={16} />
        </button>
      </div>

      <div className={styles.scrollArea}>
        {menuGroups.map((group, i) => (
          <div key={i} className={styles.menuSection}>
            {group.label && (
              <div className={styles.sectionLabel}>
                {group.label}
                <ChevronDown size={10} />
              </div>
            )}

            {group.items.map((item) => {
              const active = pathname === item.path;

              return (
                <div
                  key={item.label}
                  className={`${styles.menuItem} ${
                    active ? styles.active : ""
                  }`}
                  onClick={() => handleClick(item)}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles.sidebarFooter}>
        <div
          className={`${styles.menuItem} ${styles.logoutbtn}`}
          onClick={handleLogoutClick}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </div>
      </div>
    </div>
  );
}
