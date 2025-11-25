import { Engine } from "json-rules-engine";

export const RBACPermission = {
  CAN_VIEW_EMPLOYEES: "can-view-employees",
  CAN_EDIT_EMPLOYEES: "can-edit-employees",
  CAN_ADD_EMPLOYEES: "can-add-employees",
};

export function allow(permission, roles) {
  return {
    conditions: {
      any: roles.map((r) => ({ fact: "role", operator: "contains", value: r })),
    },
    event: { type: permission, params: { allowed: true } },
  };
}

export function createRBACEngine() {
  const engine = new Engine();

  engine.addRule(
    allow(RBACPermission.CAN_VIEW_EMPLOYEES, ["admin", "employee"])
  );
  engine.addRule(allow(RBACPermission.CAN_EDIT_EMPLOYEES, ["admin"]));
  engine.addRule(allow(RBACPermission.CAN_ADD_EMPLOYEES, ["admin"]));

  return engine;
}
