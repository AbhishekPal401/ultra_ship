import {
  Home,
  Users,
  Truck,
  Package,
  ClipboardList,
  GitBranch,
  Bot,
  Code2,
  Database,
  Table2,
  FileText,
  MessageSquare,
  Search,
  FileInput,
  Map,
  Mic,
  Layers,
  Globe,
  LineChart,
  Zap,
} from "lucide-react";

export const menuGroups = [
  {
    label: null,
    items: [
      { label: "Dashboard", icon: Home, path: "/" },
      { label: "Employees", icon: Users, path: "/employees" },
      { label: "Drivers", icon: Truck, path: "/drivers" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Trips", icon: Map, path: "/trips" },
      { label: "Orders", icon: Package, path: "/orders" },
      { label: "Tasks", icon: ClipboardList, path: "/tasks" },
    ],
  },
  {
    label: "Data Management",
    items: [
      { label: "Vehicles", icon: Truck, path: "/vehicles" },
      { label: "Inventory", icon: Table2, path: "/inventory" },
      { label: "Documents", icon: FileText, path: "/documents" },
    ],
  },
  {
    label: "Automation",
    items: [
      { label: "Workflow Engine", icon: GitBranch, path: "/workflows" },
      { label: "AI Assistants", icon: Bot, path: "/assistants" },
      { label: "Rule Engine", icon: Code2, path: "/rules" },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { label: "Analytics", icon: LineChart, path: "/analytics" },
      { label: "Live Tracking", icon: Globe, path: "/tracking" },
    ],
  },
];
