// Safe storage for browser environment
const storage = window.localStorage || {};

/* Data structures */
let currentUser = null; // {role, username, name, employeeId?}

// Call Types and Groups
const callTypes = [
  "Printer Problem",
  "Computer Problem",
  "Network Issue",
  "Software Issue",
  "Hardware Problem"
];

// Companies data structure
let companies = [
  {
    id: "C001",
    name: "ABC Corporation",
    phone: "9876543210",
    email: "info@abc.com",
    gstNo: "18AABCT1234F1Z0",
    address: {
      line1: "123 Business Street",
      line2: "Suite 100",
      line3: "Tech Park",
      pincode: "560001"
    }
  }
];

// Customers data structure
let customers = [
  {
    id: "CUS001",
    type: "individual",
    name: "John Doe",
    phone: "9876543210",
    email: "john@customer.com",
    address: "456 Customer Lane, Apt 5B, Downtown",
    gst: "",
    contactPerson: "",
    companyId: ""
  },
  {
    id: "CUS002",
    type: "corporate",
    name: "ABC Corporation",
    companyName: "ABC Corporation",
    phone: "9876543211",
    email: "contact@abc.com",
    address: "789 Business Ave, Suite 200, Business District",
    gst: "18AABCT1234F1Z0",
    contactPerson: "Sarah Smith",
    companyId: "C001"
  }
];

const employees = [
  { id: "E001", name: "Rajesh Kumar", email: "rajesh@company.com", phone: "9876543101", department: "IT Support", password: "rajesh123", role: "employee" },
  { id: "E002", name: "Priya Sharma", email: "priya@company.com", phone: "9876543102", department: "Sales", password: "priya123", role: "employee" },
  { id: "E003", name: "Amit Singh", email: "amit@company.com", phone: "9876543103", department: "IT Support", password: "amit123", role: "employee" },
  { id: "E004", name: "Sample Employee", email: "employee@company.com", phone: "9876543104", department: "IT Support", password: "emp123", username: "employee", role: "employee" },
  { id: "E005", name: "test1", email: "test1@company.com", phone: "9876543105", department: "IT Support", password: "123", username: "employee", role: "employee" }
];

let managers = [
  { id: "M001", name: "Sales Manager", email: "sales.mgr@company.com", phone: "9876500001", password: "manager123", username: "mgr_sales", role: "manager", assignedGroups: ["GRP001"] },
  { id: "M002", name: "Installation Manager", email: "install.mgr@company.com", phone: "9876500002", password: "manager123", username: "mgr_install", role: "manager", assignedGroups: ["GRP002"] },
  { id: "M003", name: "Services Manager", email: "services.mgr@company.com", phone: "9876500003", password: "manager123", username: "mgr_services", role: "manager", assignedGroups: ["GRP003"] },
  { id: "M004", name: "Complaints Manager", email: "complaints.mgr@company.com", phone: "9876500004", password: "manager123", username: "mgr_complaints", role: "manager", assignedGroups: ["GRP004"] }
];

// Call Groups structure
let callGroups = [
  { id: "GRP001", name: "Sales Group", callType: "Sales" },
  { id: "GRP002", name: "Installation Group", callType: "Installation" },
  { id: "GRP003", name: "Services Group", callType: "Services" },
  { id: "GRP004", name: "Complaints Group", callType: "Complaints" }
];

let frontOfficeUsers = [
  { id: "F001", name: "Front Office User", email: "frontoffice@company.com", phone: "9876511111", department: "Front Office", password: "office123", username: "frontoffice", role: "frontoffice" }
];

let financeUsers = [
  { id: "FN001", name: "Finance User", email: "finance@company.com", phone: "9876522222", department: "Finance", password: "finance123", username: "finance", role: "finance" }
];

// Admin users with permissions
let admins = [
  { id: "A001", name: "Default Admin", email: "admin@company.com", username: "admin", password: "admin123", role: "admin", permissions: { canEdit: true, canDelete: true } }
];

function getCurrentAdminPerms() {
  if (!currentUser || currentUser.role !== 'admin') return { canEdit: false, canDelete: false };
  const a = admins.find(x => x.username === currentUser.username);
  return (a && a.permissions) ? a.permissions : { canEdit: false, canDelete: false };
}

let tickets = [
  {
    id: "TK001",
    customerName: "John Doe",
    customerEmail: "john@customer.com",
    customerId: "CUS001",
    companyId: "C001",
    callType: null,
    callGroup: null,
    serviceType: "IT Support",
    description: "Laptop not connecting to WiFi",
    status: "Raised",
    raisedDate: "2025-11-27",
    frontOfficeUser: "frontoffice",
    assignedEmployeeId: null,
    completedDate: null,
    taskStatus: null,
    taskStartedDate: null,
    taskStartedTime: null,
    taskProgress: 0,
    taskNeeds: "",
    taskCompletionImage: null,
    reportedToManager: false,
    tasks: []
  },
  {
    id: "TK002",
    customerName: "Sarah Smith",
    customerEmail: "sarah@customer.com",
    customerId: "CUS002",
    companyId: "C001",
    callType: null,
    callGroup: null,
    serviceType: "Sales",
    description: "Need consultation for new project",
    status: "Assigned",
    raisedDate: "2025-11-26",
    frontOfficeUser: "frontoffice",
    assignedEmployeeId: "E002",
    completedDate: null,
    taskStatus: null,
    taskStartedDate: null,
    taskStartedTime: null,
    taskProgress: 0,
    taskNeeds: "",
    taskCompletionImage: null,
    reportedToManager: false,
    tasks: []
  }
];

let feedbacks = [];

/* Service pricing */
const servicePricing = {
  "IT Support": 50,
  "Sales": 30
};

/* Utility functions */
function generateEmployeeId() {
  const num = employees.length + 1;
  return "E" + String(num).padStart(3, "0");
}

function generateTicketId() {
  const num = tickets.length + 1;
  return "TK" + String(num).padStart(3, "0");
}

function generateCompanyId() {
  const num = companies.length + 1;
  return "C" + String(num).padStart(3, "0");
}

function generateCustomerId() {
  const num = customers.length + 1;
  return "CUS" + String(num).padStart(3, "0");
}

function generateGroupId() {
  const num = callGroups.length + 1;
  return "GRP" + String(num).padStart(3, "0");
}

let selectedCustomerProgress = null;

function formatDateTime(dt = new Date()) {
  return dt.toLocaleString();
}

/* Action log for admin reporting */
let systemLogs = [];
function logAction(actor, action, ticketId, details = '') {
  systemLogs.push({
    ts: new Date().toISOString(),
    actor,
    action,
    ticketId,
    details
  });
}

/* DOM helpers */
function $(id) {
  // Return the element if present, otherwise return a safe proxy that no-ops
  const el = document.getElementById(id);
  if (el) return el;

  const noop = () => {};
  const fakeEl = {
    classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    style: {},
    dataset: {},
    addEventListener: noop,
    removeEventListener: noop,
    appendChild: noop,
    removeChild: noop,
    querySelectorAll: () => [],
    querySelector: () => null,
    getElementsByTagName: () => [],
    innerHTML: '',
    textContent: '',
    value: '',
    setAttribute: noop,
    removeAttribute: noop,
    focus: noop,
    scrollTo: noop
  };

  return new Proxy(fakeEl, {
    get(target, prop) {
      if (prop in target) return target[prop];
      return noop;
    },
    set() { return true; }
  });
}

function showSection(sectionId) {
  console.log("Showing section:", sectionId);
  
  // Hide all known sections
  const idsToHide = [
    "loginPage",
    "dashboards",
    "adminDashboard",
    "frontOfficeDashboard",
    "managerDashboard",
    "employeeDashboard",
    "newCompanyPage",
    "newCustomerPage",
    "newGroupPage",
    "forgotPasswordPage"
  ];

  idsToHide.forEach(id => {
    const el = $(id);
    if (el) {
      el.classList.add("hidden");
    }
  });

  if (!sectionId) return;

  // Show dashboards container if showing a dashboard
  if (sectionId !== "loginPage") {
    const dashboardsEl = $("dashboards");
    if (dashboardsEl) {
      dashboardsEl.classList.remove("hidden");
    }
  } else {
    // Show login page
    const loginPageEl = $("loginPage");
    if (loginPageEl) {
      loginPageEl.classList.remove("hidden");
    }
    return;
  }

  // Show the target section
  const target = $(sectionId);
  if (target) {
    target.classList.remove("hidden");
    console.log("Section shown:", sectionId);
  } else {
    console.error("Section not found:", sectionId);
  }
}

function updateHeader() {
  const logoutBtn = $("logoutBtn");
  
  if (!currentUser) {
    $("currentUserInfo").textContent = "";
    if (logoutBtn) logoutBtn.classList.add("hidden");
    return;
  }
  
  $("currentUserInfo").textContent =
    `Logged in as ${currentUser.name} (${currentUser.role.toUpperCase()})`;
  if (logoutBtn) logoutBtn.classList.remove("hidden");
}

/* Stats */
function updateStats() {
  $("statTotalEmployees").textContent = employees.length;
  $("statTotalTickets").textContent = tickets.length;
  $("statPendingTickets").textContent = tickets.filter(t => t.status !== "Finished").length;
  $("statCompletedTickets").textContent = tickets.filter(t => t.status === "Finished").length;
}

/* Render tables */
function renderEmployees() {
  const tbody = $("employeesTableBody");
  tbody.innerHTML = "";
  
  // Combine all user types
  const allUsers = [
    ...employees.map(e => ({ ...e, type: "employee" })),
    ...managers.map(m => ({ ...m, type: "manager" })),
    ...frontOfficeUsers.map(f => ({ ...f, type: "frontoffice" }))
  ];
  
  allUsers.forEach(user => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role || user.type}</td>
      <td>${user.department}</td>
      <td><button class="btn small secondary" data-user-id="${user.id}" data-user-type="${user.type}">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-user-id]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-user-id");
      const type = btn.getAttribute("data-user-type");
      if (!confirm("Are you sure you want to delete this user?")) return;
      
      if (type === "employee") {
        const index = employees.findIndex(e => e.id === id);
        if (index >= 0) employees.splice(index, 1);
      } else if (type === "manager") {
        const index = managers.findIndex(m => m.id === id);
        if (index >= 0) managers.splice(index, 1);
      } else if (type === "frontoffice") {
        const index = frontOfficeUsers.findIndex(f => f.id === id);
        if (index >= 0) frontOfficeUsers.splice(index, 1);
      }
      
      renderEmployees();
      updateStats();
    };
  });
}

function renderAdminTickets() {
  const tbody = $("adminTicketsTableBody");
  tbody.innerHTML = "";
  tickets.forEach(t => {
    const emp = t.assignedEmployeeId
      ? employees.find(e => e.id === t.assignedEmployeeId)
      : null;
    const empName = emp ? emp.name : "-";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.serviceType}</td>
      <td>${t.status}</td>
      <td>${empName}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderAdminCompanies() {
  const tbody = $("companiesTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  companies.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>${c.gstNo}</td>
      <td>
        <button class="btn small primary" data-edit-company="${c.id}">Edit</button>
        <button class="btn small secondary" data-del-company="${c.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-del-company]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-del-company");
      if (!confirm("Delete this company?")) return;
      const idx = companies.findIndex(c => c.id === id);
      if (idx >= 0) {
        companies.splice(idx, 1);
        renderAdminCompanies();
      }
    };
  });

  Array.from(tbody.querySelectorAll("button[data-edit-company]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-company");
      const company = companies.find(c => c.id === id);
      if (company) {
        $("companyName").value = company.name;
        $("companyPhone").value = company.phone;
        $("companyEmail").value = company.email;
        $("companyGST").value = company.gstNo;
        $("companyAddr1").value = company.address.line1;
        $("companyAddr2").value = company.address.line2;
        $("companyAddr3").value = company.address.line3;
        $("companyPincode").value = company.address.pincode;
        // Store the ID for update
        $("companyName").dataset.editId = id;
        showSection("newCompanyPage");
      }
    };
  });
}

function renderAdminCustomers() {
  const tbody = $("customersTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  customers.forEach(c => {
    const comp = companies.find(co => co.id === c.companyId);
    const compName = comp ? comp.name : "-";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>${compName}</td>
      <td>
        <button class="btn small primary" data-edit-customer="${c.id}">Edit</button>
        <button class="btn small secondary" data-del-customer="${c.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-del-customer]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-del-customer");
      if (!confirm("Delete this customer?")) return;
      const idx = customers.findIndex(c => c.id === id);
      if (idx >= 0) {
        customers.splice(idx, 1);
        renderAdminCustomers();
      }
    };
  });

  Array.from(tbody.querySelectorAll("button[data-edit-customer]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-customer");
      const customer = customers.find(c => c.id === id);
      if (customer) {
        $("newCustName").value = customer.name;
        $("newCustPhone").value = customer.phone;
        $("newCustEmail").value = customer.email;
        $("newCustCompany").value = customer.companyId;
        $("newCustAddr1").value = customer.address.line1;
        $("newCustAddr2").value = customer.address.line2;
        $("newCustAddr3").value = customer.address.line3;
        $("newCustPincode").value = customer.address.pincode;
        $("newCustName").dataset.editId = id;
        showSection("newCustomerPage");
      }
    };
  });
}

function renderCallGroups() {
  const tbody = $("callGroupsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  callGroups.forEach(g => {
    // Handle both 'managers' and 'assignedManagers' properties for compatibility
    const managerList = g.managers || g.assignedManagers || [];
    const managerNames = managerList.map(mId => {
      const mgr = managers.find(m => m.id === mId);
      return mgr ? mgr.name : mId;
    }).join(", ") || "None";
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.id}</td>
      <td>${g.name}</td>
      <td>${g.department || g.callType || "-"}</td>
      <td>${(g.services || []).join(", ") || "-"}</td>
      <td>${managerNames}</td>
      <td>
        <button class="btn small primary" data-edit-group="${g.id}">Edit</button>
        <button class="btn small secondary" data-del-group="${g.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-del-group]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-del-group");
      if (!confirm("Delete this group?")) return;
      const idx = callGroups.findIndex(g => g.id === id);
      if (idx >= 0) {
        callGroups.splice(idx, 1);
        renderCallGroups();
      }
    };
  });

  Array.from(tbody.querySelectorAll("button[data-edit-group]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-group");
      const group = callGroups.find(g => g.id === id);
      if (group) {
        $("groupName").value = group.name;
        $("groupCallType").value = group.callType || group.department || "";
        $("groupServices").value = (group.services || []).join(", ");
        $("groupName").dataset.editId = id;
        populateGroupManagers(group.managers || group.assignedManagers || []);
        showSection("newGroupPage");
      }
    };
  });
}

function populateGroupManagers(assignedManagers = []) {
  const managersList = $("groupManagersList");
  managersList.innerHTML = "";
  managers.forEach(m => {
    const isChecked = assignedManagers.includes(m.id);
    const label = document.createElement("label");
    label.style.display = "block";
    label.style.padding = "5px 0";
    label.innerHTML = `
      <input type="checkbox" value="${m.id}" ${isChecked ? "checked" : ""} class="manager-checkbox" />
      ${m.name} (${m.email})
    `;
    managersList.appendChild(label);
  });
}

function renderPendingTicketsForManager() {
  const tbody = $("pendingTicketsTableBody");
  tbody.innerHTML = "";
  const myManagerId = currentUser.userId;
  
  // Show tickets from groups this manager is in
  const pending = tickets.filter(t => 
    t.status === "Pending Assignment" && 
    t.assignedManagerIds && 
    t.assignedManagerIds.includes(myManagerId) &&
    !t.acceptedByManager
  );
  
  pending.forEach(t => {
    const tr = document.createElement("tr");
    const employeeOptions = employees
      .filter(e => e.managerId === myManagerId || !e.managerId)
      .map(e => `<option value="${e.id}">${e.name} (${e.phone || '-'})</option>`)
      .join("");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.callType || "-"}</td>
      <td>${t.callGroup || "-"}</td>
      <td>${t.description}</td>
      <td>${t.raisedDate}</td>
      <td>
        <select data-assign-ticket="${t.id}">
          <option value="">Select Employee</option>
          ${employeeOptions}
        </select>
      </td>
      <td>
        <button class="btn small primary" data-accept-btn="${t.id}" style="margin-bottom: 4px;">Accept</button><br/>
        <button class="btn small secondary" data-decline-btn="${t.id}" style="margin-bottom: 4px;">Decline</button><br/>
        <button class="btn small secondary" data-swap-btn="${t.id}">Swap</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Add event listeners
  Array.from(tbody.querySelectorAll("button[data-accept-btn]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-accept-btn");
      const select = tbody.querySelector(`select[data-assign-ticket="${ticketId}"]`);
      const empId = select.value;
      if (!empId) {
        alert("Please select an employee first");
        return;
      }
      const ticket = tickets.find(t => t.id === ticketId);
      ticket.acceptedByManager = currentUser.userId;
      ticket.assignedEmployeeId = empId;
      const empIdx = employees.findIndex(e => e.id === empId);
      if (empIdx >= 0 && !employees[empIdx].managerId) {
        employees[empIdx].managerId = currentUser.userId;
      }
      ticket.status = "Assigned";
      logAction('manager','accept_and_assign', ticket.id, `emp:${empId}`);
      renderPendingTicketsForManager();
      renderAssignedTicketsForManager();
      renderAdminAllTickets();
      renderEmployeeTicketsIfEmployeeLoggedIn();
      updateStats();
      alert("Ticket accepted and assigned to employee!");
    };
  });

  Array.from(tbody.querySelectorAll("button[data-decline-btn]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-decline-btn");
      const ticket = tickets.find(t => t.id === ticketId);
      // Keep ticket pending for other managers in the group
      logAction('manager','decline_ticket', ticket.id);
      alert("You have declined this ticket. Other managers in the group will see it.");
      renderPendingTicketsForManager();
    };
  });

  Array.from(tbody.querySelectorAll("button[data-swap-btn]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-swap-btn");
      const ticket = tickets.find(t => t.id === ticketId);
      const callTypesUnique = [...new Set(callGroups.map(g => g.callType))];
      const ctChoices = callTypesUnique.map(ct => ct).join("\n");
      const newCt = prompt("Enter new Call Type:\n" + ctChoices, ticket.callType || "");
      if (!newCt) return;
      const groupsForCt = callGroups.filter(g => g.callType === newCt);
      const grpChoices = groupsForCt.map(g => `${g.id}:${g.name}`).join("\n");
      const newGrp = prompt("Enter Group ID for selected Call Type:\n" + grpChoices, ticket.callGroup || "");
      if (!newGrp) return;
      ticket.callType = newCt;
      ticket.callGroup = newGrp;
      ticket.acceptedByManager = null;
      ticket.assignedEmployeeId = null;
      ticket.status = "Pending Assignment";
      const mgrIds = managers.filter(m => (m.assignedGroups || []).includes(newGrp)).map(m => m.id);
      ticket.assignedManagerIds = mgrIds;
      logAction('manager','swap_department', ticket.id, `${newCt}/${newGrp}`);
      renderPendingTicketsForManager();
      renderAssignedTicketsForManager();
      renderAdminAllTickets();
      updateStats();
    };
  });
}

/* Admin Master Control Center Functions */
function setupAdminTabNavigation() {
  const navButtons = document.querySelectorAll(".admin-nav-tab");
  navButtons.forEach(btn => {
    btn.onclick = () => {
      const tabName = btn.getAttribute("data-tab");
      
      // Hide all tabs
      document.querySelectorAll(".admin-tab-content").forEach(tab => {
        tab.classList.add("hidden");
      });
      
      // Remove active class from all buttons
      navButtons.forEach(b => b.classList.remove("active"));
      
      // Show selected tab
      const tabElement = $(`adminTab${tabName.charAt(0).toUpperCase() + tabName.slice(1)}`);
      if (tabElement) {
        tabElement.classList.remove("hidden");
      }
      
      // Add active class to clicked button
      btn.classList.add("active");
      
      // Refresh data for tab
      refreshAdminTabData(tabName);
    };
  });
}

function refreshAdminTabData(tabName) {
  switch(tabName) {
    case "employees":
      renderAdminEmployees();
      break;
    // case "managers":
    //   renderAdminManagers();
    //   break;
    // case "groups":
    //   renderAdminCallGroups();
    //   break;
    case 'managersGroups':  // NEW: combined tab
      renderAdminManagers();
      renderAdminCallGroups();
      break;
    case "managerEmployees":
      renderAdminManagerEmployees();
      break;
    case "otherEmployees":
      renderAdminOtherEmployees();
      break;
    case "customers":
      renderAdminCustomers();
      break;
    case "tickets":
      renderAdminAllTickets();
      break;
    case "reports":
      renderAdminReports();
      break;
    case "admins":
      renderAdminAdmins();
      break;
  }
}

function renderAdminManagerEmployees() {
  const mgrSel = $("hireMgrSelect");
  const empSel = $("hireEmpSelect");
  const tableBody = $("managerEmployeesTableBody");
  if (mgrSel) {
    mgrSel.innerHTML = '<option value="">-- Select Manager --</option>' + managers.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
  }
  if (empSel) {
    empSel.innerHTML = '<option value="">-- Select Employee --</option>' + employees.filter(e => !e.managerId).map(e => `<option value="${e.id}">${e.name} (${e.id})</option>`).join('');
  }
  if (tableBody) {
    tableBody.innerHTML = '';
    managers.forEach(m => {
      const size = employees.filter(e => e.managerId === m.id).length;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${m.id}</td><td>${m.name}</td><td>${size}</td>`;
      tableBody.appendChild(tr);
    });
  }
}

function setupAdminManagerEmployees() {
  const modeExisting = $("hireModeExisting");
  const modeNew = $("hireModeNew");
  const existingBox = $("hireExistingBox");
  const newBox = $("hireNewBox");
  const hireBtn = $("hireEmployeeBtn");
  const refreshBtn = $("refreshHireDataBtn");

  const toggle = () => {
    const isNew = modeNew && modeNew.checked;
    if (existingBox) existingBox.classList.toggle('hidden', !!isNew);
    if (newBox) newBox.classList.toggle('hidden', !isNew);
  };
  if (modeExisting) modeExisting.onchange = toggle;
  if (modeNew) modeNew.onchange = toggle;

  if (refreshBtn) refreshBtn.onclick = () => renderAdminManagerEmployees();

  if (hireBtn) {
    hireBtn.onclick = () => {
      const mgrId = $("hireMgrSelect").value;
      $("hireErr").textContent = '';
      $("hireMsg").textContent = '';
      if (!mgrId) { $("hireErr").textContent = 'Select a manager'; return; }
      if (modeExisting && modeExisting.checked) {
        const empId = $("hireEmpSelect").value;
        if (!empId) { $("hireErr").textContent = 'Select an employee'; return; }
        const idx = employees.findIndex(e => e.id === empId);
        if (idx >= 0) {
          employees[idx].managerId = mgrId;
          $("hireMsg").textContent = `Assigned ${employees[idx].name} to manager`;
        }
      } else {
        const name = $("hireEmpName").value.trim();
        const email = $("hireEmpEmail").value.trim();
        const phone = $("hireEmpPhone").value.trim();
        const password = $("hireEmpPassword").value;
        if (!name || !email || !phone || !password) { $("hireErr").textContent = 'All fields are required'; return; }
        const newId = "E" + (employees.length + 1).toString().padStart(3, "0");
        employees.push({ id: newId, name, email, phone, password, role: 'employee', managerId: mgrId });
        $("hireMsg").textContent = `Hired ${name} and assigned to manager`;
        $("hireEmpName").value = '';
        $("hireEmpEmail").value = '';
        $("hireEmpPhone").value = '';
        $("hireEmpPassword").value = '';
      }
      renderAdminManagerEmployees();
      updateAdminStats();
      renderAdminEmployees();
    };
  }
}

function renderManagerEmployeesBox() {
  const select = $("managerEmployeesSelect");
  const list = $("managerEmployeesList");
  if (select) {
    select.innerHTML = '';
    const myId = currentUser.userId;
    employees
      .filter(e => e.managerId === myId)
      .forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.id;
        opt.textContent = `${e.id} - ${e.name} (${e.phone || '-'})`;
        select.appendChild(opt);
      });
  }
  if (list) {
    list.innerHTML = '';
    employees
      .filter(e => e.managerId === currentUser.userId)
      .forEach(e => {
        const li = document.createElement('li');
        li.style.cssText = 'padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1);';
        li.textContent = `${e.name} • ${e.phone || '-'} • ${e.id}`;
        list.appendChild(li);
      });
  }
}

function updateAdminStats() {
  $("statTotalEmployees").textContent = employees.length;
  $("statTotalManagers").textContent = managers.length;
  $("statTotalTickets").textContent = tickets.length;
  $("statPendingTickets").textContent = tickets.filter(t => t.status !== "Finished" && t.status !== "Reported").length;
  $("statCompletedTickets").textContent = tickets.filter(t => t.status === "Finished" || t.status === "Reported").length;
  $("statTotalGroups").textContent = callGroups.length;
}

// EMPLOYEES MANAGEMENT
function renderAdminEmployees() {
  const tbody = $("employeesTableBody");
  tbody.innerHTML = "";
  const perms = getCurrentAdminPerms();

  employees.forEach(e => {
    const assignedTickets = tickets.filter(t => t.assignedEmployeeId === e.id).length;
    const mgrName = e.managerId ? (managers.find(m => m.id === e.managerId)?.name || '-') : '-';
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${e.id}</td>
      <td>${e.name}</td>
      <td>${e.email}</td>
      <td>${e.phone || '-'}</td>
      <td>${mgrName}</td>
      <td><span style="background: rgba(255,165,0,0.2); padding: 4px 8px; border-radius: 4px;">${assignedTickets}</span></td>
      <td>
        ${perms.canEdit ? `<button class="btn small primary" data-edit-emp="${e.id}">Edit</button>` : ''}
        ${perms.canDelete ? `<button class="btn small secondary" data-delete-emp="${e.id}">Delete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-delete-emp]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-delete-emp");
      if (confirm("Delete this employee? All assigned tickets will be unassigned.")) {
        const index = employees.findIndex(e => e.id === id);
        if (index >= 0) {
          employees.splice(index, 1);
          tickets.forEach(t => {
            if (t.assignedEmployeeId === id) t.assignedEmployeeId = null;
          });
          renderAdminEmployees();
          updateAdminStats();
        }
      }
    };
  });

  // Edit employee
  Array.from(tbody.querySelectorAll("button[data-edit-emp]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-emp");
      const emp = employees.find(e => e.id === id);
      if (!emp) return;
      const form = $("addEmployeeForm");
      form.classList.remove("hidden");
      form.dataset.editId = id;
      $("empName").value = emp.name;
      $("empEmail").value = emp.email;
      if ($("empPhone")) $("empPhone").value = emp.phone || "";
      $("empPassword").value = emp.password || "";
      const mgrSel = $("empManager");
      if (mgrSel) {
        mgrSel.innerHTML = '<option value="">-- Select Manager --</option>' + managers.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
        mgrSel.value = emp.managerId || "";
      }
      $("empAddMsg").textContent = "";
      $("empAddErr").textContent = "";
    };
  });
}

function setupEmployeeForm() {
  const addBtn = $("adminAddEmployeeBtn");
  const form = $("addEmployeeForm");
  const saveBtn = $("saveEmployeeBtn");
  const cancelBtn = $("cancelEmployeeBtn");

  if (addBtn) {
    addBtn.onclick = () => {
      form.classList.remove("hidden");
      $("empName").value = "";
      $("empEmail").value = "";
      $("empDept").value = "";
      $("empPassword").value = "";
      const mgrSel = $("empManager");
      if (mgrSel) {
        mgrSel.innerHTML = '<option value="">-- Select Manager --</option>' + managers.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
      }
      $("empAddMsg").textContent = "";
      $("empAddErr").textContent = "";
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      form.classList.add("hidden");
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const name = $("empName").value.trim();
      const email = $("empEmail").value.trim();
      const phone = $("empPhone") ? $("empPhone").value.trim() : '';
      const password = $("empPassword").value;
      const managerId = $("empManager") ? $("empManager").value : "";
      const editId = $("addEmployeeForm").dataset.editId;

      $("empAddErr").textContent = "";
      $("empAddMsg").textContent = "";

      if (!name || !email || !phone || !password) {
        $("empAddErr").textContent = "All fields are required";
        return;
      }

      if (editId) {
        const idx = employees.findIndex(e => e.id === editId);
        if (idx >= 0) {
          employees[idx].name = name;
          employees[idx].email = email;
          employees[idx].phone = phone;
          employees[idx].password = password;
          employees[idx].managerId = managerId || null;
  $("empAddMsg").textContent = `Employee ${name} updated successfully!`;
          setTimeout(() => {
            form.classList.add("hidden");
            form.dataset.editId = "";
            renderAdminEmployees();
            updateAdminStats();
          }, 1500);
          return;
        }
      }

      const newId = "E" + (employees.length + 1).toString().padStart(3, "0");
      employees.push({
        id: newId,
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: "employee",
        managerId: managerId || null
      });

  $("empAddMsg").textContent = `Employee ${name} added successfully!`;
      setTimeout(() => {
        form.classList.add("hidden");
        form.dataset.editId = "";
        renderAdminEmployees();
        updateAdminStats();
      }, 1500);
    };
  }
}

// MANAGERS MANAGEMENT
function renderAdminManagers() {
  const tbody = $("managersTableBody");
  tbody.innerHTML = "";
  const perms = getCurrentAdminPerms();

  managers.forEach(m => {
    const groupNames = (m.assignedGroups || []).map(gid => {
      const g = callGroups.find(x => x.id === gid);
      return g ? g.name : gid;
    }).join(", ") || "No groups";

    const pendingTickets = tickets.filter(t => 
      t.assignedManagerIds && t.assignedManagerIds.includes(m.id) && t.status === "Pending Assignment"
    ).length;
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${m.id}</td>
      <td>${m.name}</td>
      <td>${m.email}</td>
      <td>${m.phone || '-'}</td>
      <td><span style="background: rgba(135,206,235,0.2); padding: 4px 8px; border-radius: 4px;">${groupNames}</span></td>
      <td><span style="background: rgba(255,107,107,0.2); padding: 4px 8px; border-radius: 4px;">${pendingTickets}</span></td>
      <td>
        ${perms.canEdit ? `<button class="btn small primary" data-edit-mgr="${m.id}">Edit</button>` : ''}
        ${perms.canDelete ? `<button class="btn small secondary" data-delete-mgr="${m.id}">Delete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-delete-mgr]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-delete-mgr");
      if (confirm("Delete this manager? They will be removed from all assigned groups.")) {
        const index = managers.findIndex(m => m.id === id);
        if (index >= 0) {
          managers.splice(index, 1);
          renderAdminManagers();
          updateAdminStats();
        }
      }
    };
  });

  // Edit manager
  Array.from(tbody.querySelectorAll("button[data-edit-mgr]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-mgr");
      const mgr = managers.find(m => m.id === id);
      if (!mgr) return;
      const form = addManagerForm;
      form.classList.remove('hidden');
      form.dataset.editId = id;
      mgrName.value = mgr.name;
      mgrEmail.value = mgr.email;
      if (typeof mgrPhone !== 'undefined') mgrPhone.value = mgr.phone || '';
      mgrPassword.value = mgr.password || '';
      populateManagerCallGroupsDropdown();
      // preselect groups
      Array.from(mgrCallGroupDropdown.options).forEach(opt => {
        opt.selected = (mgr.assignedGroups || []).includes(opt.value);
      });
      mgrAddMsg.textContent = '';
      mgrAddErr.textContent = '';
    };
  });
}

// ADMINS MANAGEMENT
function renderAdminAdmins() {
  const tbody = $("adminsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  admins.forEach(a => {
    const tr = document.createElement("tr");
    const permBadge = `<span style="background: rgba(135,206,235,0.2); padding: 4px 8px; border-radius: 4px;">${a.permissions?.canEdit ? 'Edit' : 'View'}</span> ` +
                      `<span style="background: rgba(255,107,107,0.2); padding: 4px 8px; border-radius: 4px;">${a.permissions?.canDelete ? 'Delete' : 'No Delete'}</span>`;
    tr.innerHTML = `
      <td>${a.id}</td>
      <td>${a.name}</td>
      <td>${a.email}</td>
      <td>${a.username}</td>
      <td>${permBadge}</td>
      <td>
        <button class="btn small primary" data-edit-admin="${a.id}">Edit</button>
        <button class="btn small secondary" data-delete-admin="${a.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-delete-admin]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-delete-admin");
      const admin = admins.find(x => x.id === id);
      if (!admin) return;
      if (currentUser && currentUser.role === 'admin' && (admin.username === currentUser.username)) {
        alert("You cannot delete the currently logged-in admin.");
        return;
      }
      if (!confirm("Delete this admin?")) return;
      const index = admins.findIndex(x => x.id === id);
      if (index >= 0) {
        admins.splice(index, 1);
        renderAdminAdmins();
      }
    };
  });

  Array.from(tbody.querySelectorAll("button[data-edit-admin]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-admin");
      const a = admins.find(x => x.id === id);
      if (!a) return;
      const form = $("addAdminForm");
      form.classList.remove("hidden");
      form.dataset.editId = id;
      $("admName").value = a.name || "";
      $("admEmail").value = a.email || "";
      $("admUsername").value = a.username || "";
      $("admPassword").value = a.password || "";
      $("admCanEdit").checked = !!(a.permissions && a.permissions.canEdit);
      $("admCanDelete").checked = !!(a.permissions && a.permissions.canDelete);
      $("adminAddMsg").textContent = "";
      $("adminAddErr").textContent = "";
    };
  });
}

function setupAdminAdminForm() {
  const addBtn = $("adminAddAdminBtn");
  const form = $("addAdminForm");
  const saveBtn = $("saveAdminBtn");
  const cancelBtn = $("cancelAdminBtn");

  if (addBtn) {
    addBtn.onclick = () => {
      form.classList.remove("hidden");
      form.dataset.editId = "";
      $("admName").value = "";
      $("admEmail").value = "";
      $("admUsername").value = "";
      $("admPassword").value = "";
      $("admCanEdit").checked = true;
      $("admCanDelete").checked = true;
      $("adminAddMsg").textContent = "";
      $("adminAddErr").textContent = "";
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      form.classList.add("hidden");
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const name = $("admName").value.trim();
      const email = $("admEmail").value.trim();
      const username = $("admUsername").value.trim();
      const password = $("admPassword").value;
      const canEdit = $("admCanEdit").checked;
      const canDelete = $("admCanDelete").checked;
      const editId = $("addAdminForm").dataset.editId;

      $("adminAddErr").textContent = "";
      $("adminAddMsg").textContent = "";

      if (!name || !email || !username || !password) {
        $("adminAddErr").textContent = "All fields are required.";
        return;
      }
      if (!email.includes("@")) {
        $("adminAddErr").textContent = "Enter a valid email.";
        return;
      }
      const emailExists = admins.some(a => a.email.toLowerCase() === email.toLowerCase());
      const usernameExists = admins.some(a => a.username.toLowerCase() === username.toLowerCase() && a.id !== editId);
      if (!editId && (emailExists || usernameExists)) {
        $("adminAddErr").textContent = "Admin with this email/username already exists.";
        return;
      }

      if (editId) {
        const idx = admins.findIndex(a => a.id === editId);
        if (idx >= 0) {
          admins[idx].name = name;
          admins[idx].email = email;
          admins[idx].username = username;
          admins[idx].password = password;
          admins[idx].permissions = { canEdit, canDelete };
          $("adminAddMsg").textContent = `Admin ${name} updated successfully!`;
          setTimeout(() => {
            form.classList.add("hidden");
            form.dataset.editId = "";
            renderAdminAdmins();
          }, 1200);
          return;
        }
      }

      const newId = 'A' + (admins.length + 1).toString().padStart(3, '0');
      admins.push({ id: newId, name, email, username, password, role: 'admin', permissions: { canEdit, canDelete } });
      $("adminAddMsg").textContent = `Admin ${name} added successfully!`;
      setTimeout(() => {
        form.classList.add("hidden");
        form.dataset.editId = "";
        renderAdminAdmins();
      }, 1200);
    };
  }
}

function applyAdminPermissionUI() {
  const perms = getCurrentAdminPerms();
  if (!perms.canEdit) {
    [
      "adminAddEmployeeBtn",
      "adminAddManagerBtn",
      "adminAddGroupBtn",
      "adminAddCompanyBtn",
      "adminAddCustomerBtn",
      "adminAddAdminBtn"
    ].forEach(id => { const el = $(id); if (el && el.classList) el.classList.add("hidden"); });
  }
}

// function setupManagerForm() {
//   const addBtn = $("adminAddManagerBtn");
//   const form = $("addManagerForm");
//   const saveBtn = $("saveManagerBtn");
//   const cancelBtn = $("cancelManagerBtn");

//   if (addBtn) {
//     addBtn.onclick = () => {
//       form.classList.remove("hidden");
//       $("mgrName").value = "";
//       $("mgrEmail").value = "";
//       $("mgrPassword").value = "";
//       populateManagerCallGroupsCheckbox();
//       $("mgrAddMsg").textContent = "";
//       $("mgrAddErr").textContent = "";
//     };
//   }

//   if (cancelBtn) {
//     cancelBtn.onclick = () => {
//       form.classList.add("hidden");
//     };
//   }

//   if (saveBtn) {
//     saveBtn.onclick = () => {
//       const name = $("mgrName").value.trim();
//       const email = $("mgrEmail").value.trim();
//       const password = $("mgrPassword").value;
//       const selectedGroups = Array.from(document.querySelectorAll("#mgrCallGroupsCheckbox input:checked"))
//         .map(cb => cb.value);

//       $("mgrAddErr").textContent = "";
//       $("mgrAddMsg").textContent = "";

//       if (!name || !email || !password) {
//         $("mgrAddErr").textContent = "Name, email and password are required";
//         return;
//       }

//       if (selectedGroups.length === 0) {
//         $("mgrAddErr").textContent = "Please select at least one call group";
//         return;
//       }

//       const newId = "M" + (managers.length + 1).toString().padStart(3, "0");
//       managers.push({
//         id: newId,
//         name: name,
//         email: email,
//         password: password,
//         role: "manager",
//         username: `mgr_${name.toLowerCase().replace(" ", "_").substring(0, 10)}`,
//         assignedGroups: selectedGroups
//       });

      // $("mgrAddMsg").textContent = `Manager ${name} added successfully!`;
//       setTimeout(() => {
//         form.classList.add("hidden");
//         renderAdminManagers();
//         updateAdminStats();
//       }, 1500);
//     };
//   }
// }

function setupManagerForm() {
  const addBtn = adminAddManagerBtn;
  const form = addManagerForm;
  const saveBtn = saveManagerBtn;
  const cancelBtn = cancelManagerBtn;

  if (addBtn) {
    addBtn.onclick = () => {
      form.classList.remove('hidden');
      mgrName.value = '';
      mgrEmail.value = '';
      if (typeof mgrPhone !== 'undefined') mgrPhone.value = '';
      mgrPassword.value = '';
      mgrCallGroupDropdown.value = '';
      // Reset custom UI
      const menu = $("mgrGroupsMenu");
      const toggle = $("mgrGroupsToggle");
      if (menu) menu.classList.add('hidden');
      if (toggle) toggle.textContent = '-- Select Groups --';
      mgrAddMsg.textContent = '';
      mgrAddErr.textContent = '';
      populateManagerCallGroupsDropdown(); // Populate dropdown when form opens
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      form.classList.add('hidden');
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const name = mgrName.value.trim();
      const email = mgrEmail.value.trim();
      const phone = (typeof mgrPhone !== 'undefined' && mgrPhone.value) ? mgrPhone.value.trim() : '';
      const password = mgrPassword.value;
      
      // Get selected groups from dropdown (allows multiple select)
      const selectedOptions = Array.from(mgrCallGroupDropdown.selectedOptions);
      const selectedGroups = selectedOptions.map(opt => opt.value);

      mgrAddErr.textContent = '';
      mgrAddMsg.textContent = '';

      if (!name || !email || !phone || !password) {
        mgrAddErr.textContent = 'Name, email, phone and password are required';
        return;
      }

      if (selectedGroups.length === 0) {
        mgrAddErr.textContent = 'Please select at least one call group';
        return;
      }

      const editId = addManagerForm.dataset.editId;
      if (editId) {
        const idx = managers.findIndex(m => m.id === editId);
        if (idx >= 0) {
          managers[idx].name = name;
          managers[idx].email = email;
          managers[idx].phone = phone;
          managers[idx].password = password;
          managers[idx].assignedGroups = selectedGroups;

          // Reflect selection in custom UI button
          const toggle = $("mgrGroupsToggle");
          if (toggle) toggle.textContent = selectedGroups.length ? `${selectedGroups.length} group(s) selected` : '-- Select Groups --';
          mgrAddMsg.textContent = `Manager ${name} updated successfully!`;
          setTimeout(() => {
            form.classList.add('hidden');
            form.dataset.editId = '';
            renderAdminManagers();
            updateAdminStats();
          }, 1500);
          return;
        }
      }

      const newId = 'M' + (managers.length + 1).toString().padStart(3, '0');
      managers.push({
        id: newId,
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: 'manager',
        username: 'mgr_' + name.toLowerCase().replace(' ', '_').substring(0, 10),
        assignedGroups: selectedGroups
      });
      const toggle = $("mgrGroupsToggle");
      if (toggle) toggle.textContent = selectedGroups.length ? `${selectedGroups.length} group(s) selected` : '-- Select Groups --';
      mgrAddMsg.textContent = `Manager ${name} added successfully!`;
      setTimeout(() => {
        form.classList.add('hidden');
        form.dataset.editId = '';
        renderAdminManagers();
        updateAdminStats();
      }, 1500);
    };
  }
}


// function populateManagerCallGroupsCheckbox() {
//   const container = mgrCallGroupsCheckbox;
//   container.innerHTML = '';

//   callGroups.forEach(g => {
//     const label = document.createElement('label');
//     label.style.cssText =
//       'display:inline-flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(255,255,255,0.35);border-radius:999px;cursor:pointer;';

//     label.innerHTML =
//       `<input type="checkbox" value="${g.id}">` +
//       `<span style="margin-left:8px;font-size:13px;color:#232f49;font-weight:600;">` +
//       `${g.name} (${g.callType})` +
//       `</span>`;

//     container.appendChild(label);
//   });
// }

function populateManagerCallGroupsDropdown() {
  const select = mgrCallGroupDropdown;
  const optionsContainer = $("mgrGroupsOptions");
  const toggleBtn = $("mgrGroupsToggle");
  const menu = $("mgrGroupsMenu");

  if (select) {
    select.innerHTML = '<option value="">-- Select Groups --</option>';
  }
  if (optionsContainer) optionsContainer.innerHTML = '';

  callGroups.forEach(g => {
    if (select) {
      const option = document.createElement('option');
      option.value = g.id;
      option.textContent = `${g.name} (${g.callType})`;
      select.appendChild(option);
    }
    if (optionsContainer) {
      const label = document.createElement('label');
      label.innerHTML = `<input type="checkbox" value="${g.id}"> <span>${g.name} (${g.callType})</span>`;
      optionsContainer.appendChild(label);
    }
  });

  if (toggleBtn && menu) {
    toggleBtn.onclick = () => menu.classList.toggle('hidden');
  }

  const applyBtn = $("mgrGroupsApplyBtn");
  const cancelBtn = $("mgrGroupsCancelBtn");
  if (applyBtn && select) {
    applyBtn.onclick = () => {
      // Sync checked boxes to hidden select
      const checked = Array.from(optionsContainer.querySelectorAll('input[type=checkbox]:checked')).map(i => i.value);
      Array.from(select.options).forEach(opt => {
        opt.selected = checked.includes(opt.value);
      });
      // Update button label
      $("mgrGroupsToggle").textContent = checked.length ? `${checked.length} group(s) selected` : '-- Select Groups --';
      if (menu) menu.classList.add('hidden');
    };
  }
  if (cancelBtn && menu) {
    cancelBtn.onclick = () => menu.classList.add('hidden');
  }
}



// CALL GROUPS MANAGEMENT
function renderAdminCallGroups() {
  const tbody = $("callGroupsTableBody");
  tbody.innerHTML = "";
  const perms = getCurrentAdminPerms();

  callGroups.forEach(g => {
    const assignedTickets = tickets.filter(t => t.callGroup === g.id).length;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${g.id}</td>
      <td>${g.callType}</td>
      <td>${g.name}</td>
      <td><span style="background: rgba(81,207,102,0.2); padding: 4px 8px; border-radius: 4px;">${assignedTickets}</span></td>
      <td>
        ${perms.canEdit ? `<button class="btn small primary" data-edit-group="${g.id}">Edit</button>` : ''}
        ${perms.canDelete ? `<button class="btn small secondary" data-delete-group="${g.id}">Delete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-delete-group]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-delete-group");
      if (confirm("Delete this call group?")) {
        const index = callGroups.findIndex(g => g.id === id);
        if (index >= 0) {
          callGroups.splice(index, 1);
          renderAdminCallGroups();
          updateAdminStats();
        }
      }
    };
  });

  // Edit group
  Array.from(tbody.querySelectorAll("button[data-edit-group]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-group");
      const group = callGroups.find(g => g.id === id);
      if (!group) return;
      const form = $("addGroupForm");
      form.classList.remove("hidden");
      $("groupName").value = group.name;
      $("groupCallType").value = group.callType || group.department || "";
      $("groupServices").value = (group.services || []).join(", ");
      $("groupName").dataset.editId = id;
      populateGroupManagers(group.managers || group.assignedManagers || []);
      $("groupAddMsg").textContent = "";
      $("groupAddErr").textContent = "";
      showSection("newGroupPage");
    };
  });
}

function setupGroupForm() {
  const addBtn = $("adminAddGroupBtn");
  const form = $("addGroupForm");
  const saveBtn = $("saveGroupBtn");
  const cancelBtn = $("cancelGroupBtn");

  if (addBtn) {
    addBtn.onclick = () => {
      form.classList.remove("hidden");
      const nameInput = form.querySelector('#groupName');
      const typeSelect = form.querySelector('#groupCallType');
      const msg = form.querySelector('#groupAddMsg');
      const err = form.querySelector('#groupAddErr');
      if (nameInput) nameInput.value = "";
      if (typeSelect) typeSelect.value = "";
      if (msg) msg.textContent = "";
      if (err) err.textContent = "";
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      form.classList.add("hidden");
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const name = (form.querySelector('#groupName')?.value || '').trim();
      const callType = form.querySelector('#groupCallType')?.value || '';

      const msg = form.querySelector('#groupAddMsg');
      const err = form.querySelector('#groupAddErr');
      if (err) err.textContent = "";
      if (msg) msg.textContent = "";

      if (!name || !callType) {
        if (err) err.textContent = "Group name and call type are required";
        return;
      }

      const newId = "GRP" + (callGroups.length + 1).toString().padStart(3, "0");
      callGroups.push({
        id: newId,
        name: name,
        callType: callType
      });

      if (msg) msg.textContent = `Call group ${name} created successfully!`;
      setTimeout(() => {
        form.classList.add("hidden");
        renderAdminCallGroups();
        updateAdminStats();
      }, 1500);
    };
  }
}


// COMPANIES MANAGEMENT
function renderAdminCompanies() {
  const tbody = $("companiesTableBody");
  tbody.innerHTML = "";
  const perms = getCurrentAdminPerms();

  companies.forEach(c => {
    const custCount = customers.filter(x => x.companyId === c.id).length;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td>${c.gstNo || "N/A"}</td>
      <td><span style="background: rgba(135,206,235,0.2); padding: 4px 8px; border-radius: 4px;">${custCount}</span></td>
      <td>
        ${perms.canEdit ? `<button class="btn small primary" data-edit-comp="${c.id}">Edit</button>` : ''}
        ${perms.canDelete ? `<button class="btn small secondary" data-delete-comp="${c.id}">Delete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-delete-comp]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-delete-comp");
      if (confirm("Delete this company?")) {
        const index = companies.findIndex(c => c.id === id);
        if (index >= 0) {
          companies.splice(index, 1);
          renderAdminCompanies();
        }
      }
    };
  });

  Array.from(tbody.querySelectorAll("button[data-edit-comp]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-comp");
      const company = companies.find(c => c.id === id);
      const form = $("addCompanyForm");
      if (!company || !form) return;
      form.classList.remove("hidden");
      form.dataset.editId = id;
      $("companyName").value = company.name || "";
      $("companyEmail").value = company.email || "";
      $("companyPhone").value = company.phone || "";
      $("companyGST").value = company.gstNo || "";
      $("companyAddMsg").textContent = "";
      $("companyAddErr").textContent = "";
    };
  });
}

function setupCompanyForm() {
  const addBtn = $("adminAddCompanyBtn");
  const form = $("addCompanyForm");
  const saveBtn = $("saveCompanyBtn");
  const cancelBtn = $("cancelCompanyFormBtn");

  if (addBtn) {
    addBtn.onclick = () => {
      form.classList.remove("hidden");
      $("companyName").value = "";
      $("companyEmail").value = "";
      $("companyPhone").value = "";
      $("companyGST").value = "";
      $("companyAddMsg").textContent = "";
      $("companyAddErr").textContent = "";
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      form.classList.add("hidden");
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const name = $("companyName").value.trim();
      const email = $("companyEmail").value.trim();
      const phone = $("companyPhone").value.trim();
      const gst = $("companyGST").value.trim();
      const editId = $("addCompanyForm").dataset.editId;

      $("companyAddErr").textContent = "";
      $("companyAddMsg").textContent = "";

      if (!name) {
        $("companyAddErr").textContent = "Company name is required";
        return;
      }

      if (editId) {
        const idx = companies.findIndex(c => c.id === editId);
        if (idx >= 0) {
          companies[idx].name = name;
          companies[idx].email = email;
          companies[idx].phone = phone;
          companies[idx].gstNo = gst;
          $("companyAddMsg").textContent = `✅ Company ${name} updated successfully!`;
          setTimeout(() => {
            form.classList.add("hidden");
            form.dataset.editId = "";
            refreshAllDataViews();
          }, 1200);
          return;
        }
      }

      const newId = "C" + (companies.length + 1).toString().padStart(3, "0");
      companies.push({ id: newId, name, email, phone, gstNo: gst });
      $("companyAddMsg").textContent = `✅ Company ${name} added successfully!`;
      setTimeout(() => {
        form.classList.add("hidden");
        form.dataset.editId = "";
        refreshAllDataViews();
      }, 1200);
    };
  }
}

// CUSTOMERS MANAGEMENT
function renderAdminCustomers() {
  const tbody = $("customersTableBody");
  tbody.innerHTML = "";
  const perms = getCurrentAdminPerms();

  customers.forEach(c => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.email}</td>
      <td><span style="background: ${c.type === "corporate" ? "rgba(135,206,235,0.2)" : "rgba(81,207,102,0.2)"}; padding: 4px 8px; border-radius: 4px;">${c.type === "corporate" ? "Corporate" : "Individual"}</span></td>
      <td>
        ${perms.canEdit ? `<button class="btn small primary" data-edit-cust="${c.id}">Edit</button>` : ''}
        ${perms.canDelete ? `<button class="btn small secondary" data-delete-cust="${c.id}">Delete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-delete-cust]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-delete-cust");
      if (confirm("Delete this customer?")) {
        const index = customers.findIndex(c => c.id === id);
        if (index >= 0) {
          customers.splice(index, 1);
          refreshAllDataViews();
        }
      }
    };
  });

  Array.from(tbody.querySelectorAll("button[data-edit-cust]")).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute("data-edit-cust");
      const customer = customers.find(c => c.id === id);
      const form = $("addCustomerForm");
      if (!customer || !form) return;
      form.classList.remove("hidden");
      form.dataset.editId = id;
      $("custName").value = customer.name || "";
      $("custEmail").value = customer.email || "";
      $("custPhone").value = customer.phone || "";
      $("custCompany").value = customer.companyId || "";
      $("customerAddMsg").textContent = "";
      $("customerAddErr").textContent = "";
    };
  });
}

function setupCustomerForm() {
  const addBtn = $("adminAddCustomerBtn");
  const form = $("addCustomerForm");
  const saveBtn = $("saveCustomerBtn");
  const cancelBtn = $("cancelCustomerFormBtn");
  const custCompanySelect = $("custCompany");

  // Populate company dropdown
  if (custCompanySelect) {
    custCompanySelect.innerHTML = "<option value=''>-- None (Individual) --</option>";
    companies.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c.id;
      opt.textContent = c.name;
      custCompanySelect.appendChild(opt);
    });
  }

  if (addBtn) {
    addBtn.onclick = () => {
      form.classList.remove("hidden");
      $("custName").value = "";
      $("custEmail").value = "";
      $("custPhone").value = "";
      $("custCompany").value = "";
      $("customerAddMsg").textContent = "";
      $("customerAddErr").textContent = "";
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      form.classList.add("hidden");
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const name = $("custName").value.trim();
      const email = $("custEmail").value.trim();
      const phone = $("custPhone").value.trim();
      const companyId = $("custCompany").value;
      const editId = $("addCustomerForm").dataset.editId;

      $("customerAddErr").textContent = "";
      $("customerAddMsg").textContent = "";

      if (!name || !phone) {
        $("customerAddErr").textContent = "Name and phone are required";
        return;
      }

      if (editId) {
        const idx = customers.findIndex(c => c.id === editId);
        if (idx >= 0) {
          customers[idx].name = name;
          customers[idx].email = email;
          customers[idx].phone = phone;
          customers[idx].companyId = companyId;
          customers[idx].type = companyId ? "corporate" : "individual";
          $("customerAddMsg").textContent = `Customer ${name} updated successfully!`;
          setTimeout(() => {
            form.classList.add("hidden");
            form.dataset.editId = "";
            refreshAllDataViews();
          }, 1200);
          return;
        }
      }

      const newId = "CUS" + (customers.length + 1).toString().padStart(4, "0");
      customers.push({ id: newId, type: companyId ? "corporate" : "individual", name, email, phone, companyId, address: "", gst: "" });
      $("customerAddMsg").textContent = `Customer ${name} added successfully!`;
      setTimeout(() => {
        form.classList.add("hidden");
        form.dataset.editId = "";
        refreshAllDataViews();
      }, 1200);
    };
  }
}

// TICKETS VIEW
function renderAdminAllTickets() {
  const tbody = $("adminTicketsTableBody");
  tbody.innerHTML = "";

  tickets.forEach(t => {
    const manager = t.acceptedByManager
      ? (managers.find(m => m.id === t.acceptedByManager)?.name || "Unassigned")
      : (t.assignedManagerIds && t.assignedManagerIds.length > 0
        ? (managers.find(m => m.id === t.assignedManagerIds[0])?.name || "Unassigned")
        : "Unassigned");
    const employee = t.assignedEmployeeId ? employees.find(e => e.id === t.assignedEmployeeId)?.name || "Unassigned" : "Unassigned";
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.callType || "General"}</td>
      <td><span style="background: ${t.status === "Pending Assignment" ? "rgba(255,165,0,0.2)" : "rgba(81,207,102,0.2)"}; padding: 4px 8px; border-radius: 4px;">${t.status}</span></td>
      <td>${manager}</td>
      <td>${employee}</td>
      <td>${t.raisedDate || "N/A"}</td>
    `;
    tbody.appendChild(tr);
  });
}

// REPORTS
function renderAdminReports() {
  // Tickets by status
  const statusList = $("reportTicketsByStatus");
  statusList.innerHTML = "";
  
  const statuses = {};
  tickets.forEach(t => {
    statuses[t.status] = (statuses[t.status] || 0) + 1;
  });

  Object.entries(statuses).forEach(([status, count]) => {
    const li = document.createElement("li");
    li.style.cssText = "padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;";
    li.innerHTML = `<span>${status}</span><span style="font-weight: 800; color: #ffa500;">${count}</span>`;
    statusList.appendChild(li);
  });

  // Employee performance
  const perfList = $("reportEmployeePerformance");
  perfList.innerHTML = "";

  const empPerf = {};
  employees.forEach(e => {
    const completed = tickets.filter(t => t.assignedEmployeeId === e.id && (t.status === "Reported" || t.status === "Finished")).length;
    const total = tickets.filter(t => t.assignedEmployeeId === e.id).length;
    empPerf[e.name] = { completed, total };
  });

  Object.entries(empPerf).forEach(([name, perf]) => {
    const li = document.createElement("li");
    li.style.cssText = "padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; justify-content: space-between;";
    const percentage = perf.total > 0 ? Math.round((perf.completed / perf.total) * 100) : 0;
    li.innerHTML = `<span>${name}</span><span style="font-weight: 800; color: #51cf66;">${perf.completed}/${perf.total} (${percentage}%)</span>`;
    perfList.appendChild(li);
  });

  // Action Logs (compact)
  const statusList2 = statusList; // reuse existing list to avoid layout changes
  if (systemLogs.length > 0) {
    const divider = document.createElement('li');
    divider.style.cssText = 'padding:8px 0; font-weight:700; color:#e84c3d;';
    divider.textContent = 'Action Logs';
    statusList2.appendChild(divider);
    systemLogs.slice(-10).forEach(log => {
      const li = document.createElement('li');
      li.style.cssText = 'padding:6px 0; font-size:12px; color:rgba(255,255,255,0.85);';
      li.textContent = `${log.ts} - ${log.actor} ${log.action} (${log.ticketId}) ${log.details||''}`;
      statusList2.appendChild(li);
    });
  }
}

// Global refresh to keep pages linked
function refreshAllDataViews() {
  try {
    if (typeof updateStats === 'function') updateStats();
    if (typeof updateAdminStats === 'function') updateAdminStats();
    if (typeof renderAdminEmployees === 'function') renderAdminEmployees();
    if (typeof renderAdminManagers === 'function') renderAdminManagers();
    // companies tab removed
    if (typeof renderAdminCustomers === 'function') renderAdminCustomers();
    if (typeof renderAdminAllTickets === 'function') renderAdminAllTickets();
    if (typeof renderFrontOfficeTickets === 'function') renderFrontOfficeTickets();
    if (typeof renderAdminManagerEmployees === 'function') renderAdminManagerEmployees();
    if (typeof renderAdminOtherEmployees === 'function') renderAdminOtherEmployees();
    if (typeof renderFinanceTickets === 'function') renderFinanceTickets();
  } catch (e) {
    console.error('Refresh views error', e);
  }
}

/* Front Office: Customer Type Selection Handler */
function setupFrontOfficeHandlers() {
  const custTypeSelect = $("foCustType");
  const custSelectionSection = $("foCustomerSelectionSection");
  const issueDetailsSection = $("foIssueDetailsSection");
  const existingCustSection = $("foExistingCustSection");
  const newCustForm = $("foNewCustForm");
  const existingCustBtn = $("foExistingCustBtn");
  const newCustBtn = $("foNewCustBtn");
  const saveNewCustBtn = $("foSaveNewCustBtn");
  const cancelNewCustBtn = $("foCancelNewCustBtn");
  const callTypeSelect = $("foCallType");
  const callGroupSelect = $("foCallGroup");
  const createTicketBtn = $("foCreateTicketBtn");
  const companyNameDiv = $("foCompanyNameDiv");
  const contactPersonDiv = $("foContactPersonDiv");
  const selectExistingCust = $("foSelectExistingCust");
  const autoAssignedManagersDiv = $("foAutoAssignedManagers");

  // Step 1: Customer Type Selection
  if (custTypeSelect) {
    custTypeSelect.onchange = () => {
      const type = custTypeSelect.value;
      if (type === "individual" || type === "corporate") {
        custSelectionSection.classList.remove("hidden");
        issueDetailsSection.classList.add("hidden");
        existingCustSection.classList.remove("hidden");
        newCustForm.classList.add("hidden");
        populateExistingCustomers(type);
      } else {
        custSelectionSection.classList.add("hidden");
        issueDetailsSection.classList.add("hidden");
      }
    };
  }

  // Step 2: Existing vs New Customer
  if (existingCustBtn) {
    existingCustBtn.onclick = () => {
      existingCustSection.classList.remove("hidden");
      newCustForm.classList.add("hidden");
    };
  }

  if (newCustBtn) {
    newCustBtn.onclick = () => {
      const type = custTypeSelect.value;
      existingCustSection.classList.add("hidden");
      newCustForm.classList.remove("hidden");
      
      // Display customer type
      const typeDisplay = $("foNewCustTypeDisplay");
      if (typeDisplay) {
        const typeLabel = type === "corporate" ? "Corporate Customer" : "Individual Customer";
        typeDisplay.textContent = typeLabel;
      }
      
      // Show/hide fields based on type
      if (type === "corporate") {
        companyNameDiv.classList.remove("hidden");
        contactPersonDiv.classList.remove("hidden");
      } else {
        companyNameDiv.classList.add("hidden");
        contactPersonDiv.classList.add("hidden");
      }
      
      // Clear form
      $("foNewCustName").value = "";
      $("foNewCompanyName").value = "";
      $("foNewCustPhone").value = "";
      $("foNewCustEmail").value = "";
      $("foNewCustAddress").value = "";
      $("foNewCustGST").value = "";
      $("foNewContactPerson").value = "";
    };
  }

  // Save new customer
  if (saveNewCustBtn) {
    saveNewCustBtn.onclick = saveNewCustomer;
  }

  if (cancelNewCustBtn) {
    cancelNewCustBtn.onclick = () => {
      newCustForm.classList.add("hidden");
      existingCustSection.classList.remove("hidden");
    };
  }

  // Step 2.5: When existing customer is selected, show Step 3
  if (selectExistingCust) {
    selectExistingCust.onchange = () => {
      const custId = selectExistingCust.value;
      if (custId) {
        issueDetailsSection.classList.remove("hidden");
      } else {
        issueDetailsSection.classList.add("hidden");
      }
    };
  }

  // Step 3: Call Type and Groups
  if (callTypeSelect) {
    callTypeSelect.onchange = () => {
      const type = callTypeSelect.value;
      callGroupSelect.innerHTML = "<option value=''>-- Select Group --</option>";
      
      if (type) {
        const matchingGroups = callGroups.filter(g => (g.callType && g.callType === type) || (g.department && g.department === type));
        matchingGroups.forEach(group => {
          const option = document.createElement("option");
          option.value = group.id;
          option.textContent = group.name;
          callGroupSelect.appendChild(option);
        });
      }
    };
  }

  // Step 3: When group is selected, show auto-assigned managers
  if (callGroupSelect) {
    callGroupSelect.onchange = () => {
      const groupId = callGroupSelect.value;
      if (groupId) {
        const mgrIds = managers.filter(m => (m.assignedGroups || []).includes(groupId)).map(m => m.id);
        if (mgrIds.length > 0) {
          const managerNames = mgrIds.map(mId => {
            const mgr = managers.find(m => m.id === mId);
            return mgr ? mgr.name : mId;
          }).join(", ");
          autoAssignedManagersDiv.textContent = `Auto-assigned to: ${managerNames}`;
          autoAssignedManagersDiv.style.display = "block";
        } else {
          autoAssignedManagersDiv.style.display = "none";
        }
      } else {
        autoAssignedManagersDiv.style.display = "none";
      }
    };
  }

  if (createTicketBtn) {
    createTicketBtn.onclick = createTicketFromFrontOffice;
  }
}

function populateExistingCustomers(type) {
  const select = $("foSelectExistingCust");
  if (!select) return;
  select.innerHTML = "<option value=''>-- Select Customer --</option>";
  
  const filteredCustomers = customers.filter(c => c.type === type);
  filteredCustomers.forEach(cust => {
    const option = document.createElement("option");
    option.value = cust.id;
    const displayName = cust.type === "corporate" ? cust.companyName : cust.name;
    option.textContent = `${displayName} (${cust.phone})`;
    select.appendChild(option);
  });
}

function saveNewCustomer() {
  const type = $("foCustType").value;
  const name = $("foNewCustName").value.trim();
  const phone = $("foNewCustPhone").value.trim();
  const email = $("foNewCustEmail").value.trim();
  const address = $("foNewCustAddress").value.trim();
  const gst = $("foNewCustGST").value.trim();
  
  $("foNewCustErr").textContent = "";
  $("foNewCustMsg").textContent = "";

  if (!name || !phone || !email || !address) {
    $("foNewCustErr").textContent = "Please fill all required fields.";
    return;
  }

  const newCustId = "CUS" + (customers.length + 1).toString().padStart(4, "0");
  
  if (type === "corporate") {
    const companyName = $("foNewCompanyName").value.trim();
    const contactPerson = $("foNewContactPerson").value.trim();
    
    if (!companyName || !contactPerson) {
      $("foNewCustErr").textContent = "Please fill company name and contact person.";
      return;
    }

    customers.push({
      id: newCustId,
      type: "corporate",
      name: contactPerson,
      companyName: companyName,
      phone: phone,
      email: email,
      address: address,
      gst: gst,
      contactPerson: contactPerson,
      companyId: ""
    });
  } else {
    customers.push({
      id: newCustId,
      type: "individual",
      name: name,
      phone: phone,
      email: email,
      address: address,
      gst: gst,
      contactPerson: "",
      companyId: ""
    });
  }

  $("foNewCustMsg").textContent = "Customer created successfully!";
  
  // Hide form and show existing customers
  setTimeout(() => {
    $("foNewCustForm").classList.add("hidden");
    $("foExistingCustSection").classList.remove("hidden");
    populateExistingCustomers(type);
  }, 1000);
}

function createTicketFromFrontOffice() {
  const custId = $("foSelectExistingCust").value;
  const callType = $("foCallType").value;
  const problemTitle = $("foProblemTitle").value.trim();
  const problemDesc = $("foProblemDesc").value.trim();
  const callGroupId = $("foCallGroup").value;

  $("foTicketErr").textContent = "";
  $("foTicketMsg").textContent = "";

  if (!custId || !callType || !problemTitle || !problemDesc || !callGroupId) {
    $("foTicketErr").textContent = "Please fill all required fields.";
    return;
  }

  const cust = customers.find(c => c.id === custId);
  if (!cust) {
    $("foTicketErr").textContent = "Customer not found.";
    return;
  }

  const group = callGroups.find(g => g.id === callGroupId);
  const assignedMgrIds = managers.filter(m => (m.assignedGroups || []).includes(callGroupId)).map(m => m.id);
  if (!group || assignedMgrIds.length === 0) {
    $("foTicketErr").textContent = "Selected group has no assigned managers.";
    return;
  }

  // Create ticket that will be visible to ALL managers in the group
  const ticketId = "TKT" + (tickets.length + 1).toString().padStart(4, "0");
  const newTicket = {
    id: ticketId,
    customerId: cust.id,
    customerName: cust.type === "corporate" ? cust.companyName : cust.name,
    customerEmail: cust.email,
    customerPhone: cust.phone,
    callType: callType,
    problemTitle: problemTitle,
    description: problemDesc,
    callGroup: callGroupId,
    frontOfficeUser: currentUser.userId,
    assignedManagerIds: assignedMgrIds.slice(),
    acceptedByManager: null, // Which manager accepted it
    assignedEmployeeId: null,
    taskStatus: null,
    taskProgress: 0,
    completedDate: null,
    raisedDate: new Date().toISOString().split("T")[0],
    status: "Pending Assignment",
    paymentStatus: "pending",
    paymentReceivedDate: null,
    amountPaid: 0,
    paymentHistory: []
  };

  tickets.push(newTicket);
  logAction('frontoffice','create_ticket', newTicket.id, `${callType}/${callGroupId}`);
  $("foTicketMsg").textContent = `Ticket ${ticketId} created successfully! Sent to ${group.name} (${assignedMgrIds.length} managers).`;

  // Reset and show ticket list
  setTimeout(() => {
    $("foCustType").value = "";
    $("foCustomerSelectionSection").classList.add("hidden");
    $("foIssueDetailsSection").classList.add("hidden");
    renderFrontOfficeTickets();
    updateStats();
  }, 1500);
}

function renderFrontOfficeTickets() {
  const tbody = $("foMyTicketsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const myTickets = tickets.filter(t => t.frontOfficeUser === currentUser.userId);
  myTickets.forEach(t => {
    // Get the manager who accepted it, or show the group managers if not accepted yet
    let managerName = "-";
    if (t.acceptedByManager) {
      const manager = managers.find(m => m.id === t.acceptedByManager);
      managerName = manager ? manager.name : "Unassigned";
    } else if (t.assignedManagerIds && t.assignedManagerIds.length > 0) {
      managerName = `${t.assignedManagerIds.length} managers`;
    }
    
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><button class="btn small primary" data-view-progress="${t.id}">${t.id}</button></td>
      <td>${t.customerName}</td>
      <td>${t.callType}</td>
      <td>${t.status}</td>
      <td>${managerName}</td>
      <td>${t.raisedDate}</td>
    `;
    tbody.appendChild(tr);
  });

  // Add progress view handlers
  Array.from(tbody.querySelectorAll("button[data-view-progress]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-view-progress");
      showTicketProgress(ticketId);
    };
  });
}

function renderEmployeeTicketsIfEmployeeLoggedIn() {
  if (!currentUser || currentUser.role !== "employee") return;
  renderEmployeeTickets();
}

let selectedTicketForEmployee = null;
let selectedTaskForWork = null;
let taskWorkSessionData = {}; // Track work sessions with breaks, start times, etc.

function renderEmployeeTickets() {
  const pendingTbody = $("employeePendingTasksTableBody");
  const activeTbody = $("employeeActiveTasksTableBody");
  const completedTbody = $("employeeCompletedTasksTableBody");
  
  pendingTbody.innerHTML = "";
  activeTbody.innerHTML = "";
  completedTbody.innerHTML = "";

  const myEmployeeId = currentUser.employeeId;
  const myTickets = tickets.filter(t => t.assignedEmployeeId === myEmployeeId);

  // Separate tickets by status
  const pendingTickets = myTickets.filter(t => t.status === "Assigned");
  const activeTickets = myTickets.filter(t => t.status === "In Progress");
  const completedTickets = myTickets.filter(t => t.status === "Reported" || t.status === "Finished");

  // Render Pending Tasks (Need Accept/Reject/Swap)
  pendingTickets.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.customerPhone ? t.customerPhone + " (Location)" : "Address not available"}</td>
      <td>${t.callType || t.serviceType || "General Service"}</td>
      <td>${t.description || "No description"}</td>
      <td>
        <button class="btn small primary" data-respond-task="${t.id}">Respond</button>
      </td>
    `;
    pendingTbody.appendChild(tr);
  });

  // Render Active Tasks
  activeTickets.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.callType || "Service"}</td>
      <td>~ 2 hours</td>
      <td><span style="color: #ffa500; font-weight: 800;">In Progress</span></td>
      <td>
        <button class="btn small primary" data-open-work="${t.id}">Open Work Panel</button>
      </td>
    `;
    activeTbody.appendChild(tr);
  });

  // Render Completed Tasks
  completedTickets.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.callType || "Service"}</td>
      <td>${t.completedDate || "N/A"}</td>
      <td>${t.totalWorkTime || "N/A"}</td>
      <td>
        <button class="btn small secondary" data-view-completed="${t.id}">Details</button>
      </td>
    `;
    completedTbody.appendChild(tr);
  });

  // Respond to task buttons
  Array.from(pendingTbody.querySelectorAll("button[data-respond-task]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-respond-task");
      showTaskResponseModal(ticketId);
    };
  });

  // Open work panel buttons
  Array.from(activeTbody.querySelectorAll("button[data-open-work]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-open-work");
      openTaskWorkPanel(ticketId);
    };
  });

  // View completed details
  Array.from(completedTbody.querySelectorAll("button[data-view-completed]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-view-completed");
      const ticket = tickets.find(t => t.id === ticketId);
      alert(`Task: ${ticket.id}\nCustomer: ${ticket.customerName}\nCompleted: ${ticket.completedDate}\nNotes: ${ticket.workNotes || "No notes"}`);
    };
  });

  // Update performance stats
  updateEmployeePerformanceStats();
}

function showTaskResponseModal(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  selectedTicketForEmployee = ticket;
  const modal = $("taskResponseModal");
  const content = $("taskResponseContent");

  content.innerHTML = `
    <div style="margin-bottom: 20px;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
        <div>
          <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Ticket ID</label>
          <p style="font-size: 16px; font-weight: 800; color: #e84c3d; margin: 4px 0;">${ticket.id}</p>
        </div>
        <div>
          <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Customer Name</label>
          <p style="font-size: 16px; font-weight: 800; color: rgba(255,255,255,0.9); margin: 4px 0;">${ticket.customerName}</p>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
        <div>
          <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Service Type</label>
          <p style="font-size: 14px; color: rgba(255,255,255,0.9); margin: 4px 0;">${ticket.callType || "General"}</p>
        </div>
        <div>
          <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Customer Location</label>
          <p style="font-size: 14px; color: rgba(255,255,255,0.9); margin: 4px 0;">${ticket.customerPhone || "Location TBD"}</p>
        </div>
      </div>
      <div style="margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #e84c3d;">
        <label style="color: rgba(255,255,255,0.7); font-size: 12px;">Issue Description</label>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0; line-height: 1.5;">${ticket.description || "No description provided"}</p>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");

  // Setup response buttons
  $("acceptTaskBtn").onclick = () => acceptTask(ticket.id);
  $("rejectTaskBtn").onclick = () => rejectTask(ticket.id);
  $("swapTaskBtn").onclick = () => {
    $("swapReasonDiv").classList.remove("hidden");
  };
  $("submitSwapBtn").onclick = () => submitSwapRequest(ticket.id);
  $("closeTaskResponseBtn").onclick = () => closeTaskResponseModal();
}

function closeTaskResponseModal() {
  $("taskResponseModal").classList.add("hidden");
  $("taskResponseContent").innerHTML = "";
  $("swapReasonDiv").classList.add("hidden");
  $("taskResponseMsg").textContent = "";
  $("taskResponseErr").textContent = "";
}

function acceptTask(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  ticket.status = "In Progress";
  ticket.acceptedDate = new Date().toISOString();
  ticket.taskStartDate = new Date().toISOString().split("T")[0];
  logAction('employee','accept_task', ticket.id);

  // Initialize work session
  taskWorkSessionData[ticketId] = {
    startTime: new Date(),
    breaks: [],
    currentBreakStart: null,
    totalBreakTime: 0,
    updates: []
  };

  $("taskResponseMsg").textContent = "Task accepted! You can now begin work.";
  setTimeout(() => {
    closeTaskResponseModal();
    renderEmployeeTickets();
    renderAssignedTicketsForManager();
    updateStats();
    openTaskWorkPanel(ticketId);
  }, 1500);
}

function rejectTask(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  const reason = prompt("Why are you rejecting this task?");
  if (!reason) return;

  ticket.status = "Assigned"; // Keep assigned, will reassign to another employee
  ticket.rejectionReason = reason;
  ticket.rejectedDate = new Date().toISOString();
  logAction('employee','reject_task', ticket.id, reason);

  $("taskResponseMsg").textContent = "Task rejection submitted to manager.";
  setTimeout(() => {
    closeTaskResponseModal();
    renderEmployeeTickets();
    renderAssignedTicketsForManager();
  }, 1500);
}

function submitSwapRequest(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  const reason = $("swapReason").value.trim();

  if (!reason) {
    $("taskResponseErr").textContent = "Please provide a reason for swap request.";
    return;
  }

  ticket.swapRequested = true;
  ticket.swapReason = reason;
  ticket.swapRequestedDate = new Date().toISOString();
  logAction('employee','request_swap', ticket.id, reason);

  $("taskResponseMsg").textContent = "Swap request submitted! Manager will review your request.";
  setTimeout(() => {
    closeTaskResponseModal();
    renderEmployeeTickets();
    renderAssignedTicketsForManager();
  }, 1500);
}

function openTaskWorkPanel(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  selectedTaskForWork = ticket;

  // Initialize session if not exists
  if (!taskWorkSessionData[ticketId]) {
    taskWorkSessionData[ticketId] = {
      startTime: new Date(),
      breaks: [],
      currentBreakStart: null,
      totalBreakTime: 0,
      updates: []
    };
  }

  const panel = $("taskWorkPanel");
  panel.classList.remove("hidden");

  // Fill task header
  $("workTicketId").textContent = ticket.id;
  $("workCustomerLocation").textContent = ticket.customerPhone || "On-site";
  $("workServiceType").textContent = ticket.callType || "Service";
  $("workEstimatedDuration").textContent = "2 hours (estimated)";

  // Set start time if not set
  if (!$("workStartTime").value) {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    $("workStartTime").value = `${hours}:${minutes}`;
  }

  // Update work time display
  updateWorkTimeDisplay();
}

function updateWorkTimeDisplay() {
  if (!selectedTaskForWork) return;

  const session = taskWorkSessionData[selectedTaskForWork.id];
  if (!session) return;

  const now = new Date();
  const totalMs = now - session.startTime - session.totalBreakTime;
  const hours = Math.floor(totalMs / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));

  $("workTotalTime").textContent = `${hours}h ${minutes}m`;

  // Update break status if on break
  if (session.currentBreakStart) {
    const breakMs = now - session.currentBreakStart;
    const breakMins = Math.floor(breakMs / (1000 * 60));
  $("breakStatus").textContent = `On break for ${breakMins} minutes`;
    $("breakInfo").style.display = "block";
  }
}

function startBreak() {
  if (!selectedTaskForWork) return;
  const session = taskWorkSessionData[selectedTaskForWork.id];
  if (session.currentBreakStart) {
    alert("Already on break!");
    return;
  }

  session.currentBreakStart = new Date();
  $("startBreakBtn").classList.add("hidden");
  $("endBreakBtn").classList.remove("hidden");
  $("breakStatus").textContent = "Break started at " + new Date().toLocaleTimeString();
  $("breakInfo").style.display = "block";
}

function endBreak() {
  if (!selectedTaskForWork) return;
  const session = taskWorkSessionData[selectedTaskForWork.id];
  if (!session.currentBreakStart) {
    alert("No active break!");
    return;
  }

  const breakDuration = new Date() - session.currentBreakStart;
  session.totalBreakTime += breakDuration;
  session.breaks.push({
    start: session.currentBreakStart,
    end: new Date(),
    duration: breakDuration
  });

  // Add to history
  const historyDiv = $("breakHistory");
  const breakEntry = document.createElement("div");
  breakEntry.style.cssText = "padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px; margin-bottom: 6px; font-size: 12px; color: rgba(255,255,255,0.8);";
  const startTime = session.currentBreakStart.toLocaleTimeString();
  const endTime = new Date().toLocaleTimeString();
  const mins = Math.floor(breakDuration / (1000 * 60));
  breakEntry.textContent = `Break: ${startTime} - ${endTime} (${mins}m)`;
  historyDiv.appendChild(breakEntry);

  session.currentBreakStart = null;
  $("startBreakBtn").classList.remove("hidden");
  $("endBreakBtn").classList.add("hidden");
  $("breakStatus").textContent = "";
  updateWorkTimeDisplay();
}

function submitProgressUpdate() {
  if (!selectedTaskForWork) return;

  const status = $("workProgressUpdate").value;
  const blockers = $("workBlockers").value.trim();
  const notes = $("workNotes").value.trim();
  const estimatedTime = $("estimatedTimeToComplete").value;

  if (!status) {
    $("workUpdateErr").textContent = "Please select current work status.";
    return;
  }

  const session = taskWorkSessionData[selectedTaskForWork.id];
  const update = {
    timestamp: new Date().toISOString(),
    status: status,
    blockers: blockers,
    notes: notes,
    estimatedTimeRemaining: estimatedTime,
    workTimeSoFar: calculateWorkTime(session)
  };

  session.updates.push(update);
  selectedTaskForWork.workUpdates = session.updates;

  $("workUpdateMsg").textContent = "Progress update sent to manager!";
  setTimeout(() => {
    $("workUpdateMsg").textContent = "";
  }, 3000);

  // Log update
  console.log("Work update submitted:", update);
  renderAssignedTicketsForManager();
}

function completeTask() {
  if (!selectedTaskForWork) return;

  if (!confirm("Mark this task as completed? Ensure all work is done and documented.")) return;

  const session = taskWorkSessionData[selectedTaskForWork.id];
  const totalWorkTime = calculateWorkTime(session);

  selectedTaskForWork.status = "Reported";
  selectedTaskForWork.completedDate = new Date().toISOString();
  selectedTaskForWork.totalWorkTime = totalWorkTime;
  selectedTaskForWork.workNotes = $("workNotes").value;
  selectedTaskForWork.workUpdates = session.updates;
  logAction('employee','report_completed', selectedTaskForWork.id);

  $("workUpdateMsg").textContent = "Task marked as completed! Manager will review.";
  setTimeout(() => {
    $("taskWorkPanel").classList.add("hidden");
    $("workUpdateMsg").textContent = "";
    renderEmployeeTickets();
    renderAssignedTicketsForManager();
    updateEmployeePerformanceStats();
  }, 2000);
}

function calculateWorkTime(session) {
  const now = new Date();
  const totalMs = now - session.startTime - session.totalBreakTime;
  const hours = Math.floor(totalMs / (1000 * 60 * 60));
  const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
}

function updateEmployeePerformanceStats() {
  const myEmployeeId = currentUser.employeeId;
  const today = new Date().toISOString().split("T")[0];

  const todayCompletedTickets = tickets.filter(t => 
    t.assignedEmployeeId === myEmployeeId && 
    t.completedDate && 
    t.completedDate.startsWith(today)
  );

  let totalWorkHours = 0;
  todayCompletedTickets.forEach(t => {
    if (t.totalWorkTime) {
      const match = t.totalWorkTime.match(/(\d+)h\s*(\d+)m/);
      if (match) {
        totalWorkHours += parseInt(match[1]) + parseInt(match[2]) / 60;
      }
    }
  });

  $("tasksCompletedToday").textContent = todayCompletedTickets.length;
  $("totalWorkHoursToday").textContent = `${Math.floor(totalWorkHours)}h ${Math.round((totalWorkHours % 1) * 60)}m`;
  
  if (todayCompletedTickets.length > 0) {
    const avgHours = totalWorkHours / todayCompletedTickets.length;
    $("avgTimePerTask").textContent = `${Math.floor(avgHours)}h ${Math.round((avgHours % 1) * 60)}m`;
  }

  const thisMonth = new Date().getMonth();
  const monthCompletedTickets = tickets.filter(t => 
    t.assignedEmployeeId === myEmployeeId && 
    t.completedDate && 
    new Date(t.completedDate).getMonth() === thisMonth
  );
  $("totalTasksMonth").textContent = monthCompletedTickets.length;
}

// tasks UI removed; replaced by description + accept/report flow for employees

/* Payment & Feedback */
let paymentTicket = null;

function openPaymentPage(ticket) {
  paymentTicket = ticket;
  $("payTicketId").textContent = ticket.id;
  $("payCustomer").textContent = ticket.customerName;
  $("payService").textContent = ticket.serviceType;
  $("payAmount").textContent = servicePricing[ticket.serviceType] || 0;
  if ($("paymentStatusSelect")) $("paymentStatusSelect").value = ticket.paymentStatus || 'pending';
  if ($("paymentAmountInput")) $("paymentAmountInput").value = ticket.amountPaid || '';
  const hist = $("paymentHistoryList");
  if (hist) {
    hist.innerHTML = (ticket.paymentHistory || []).map(h => `<li>${h.date} - ${h.method} - ${h.amount}</li>`).join('');
  }
  $("payMsg").textContent = "";
  $("feedbackMsg").textContent = "";
  $("feedbackComment").value = "";
  $("feedbackRating").value = "5";
  showSection("paymentPage");
}

/* Login handling */
function login() {
  const username = $("loginUsername").value.trim();
  const password = $("loginPassword").value;
  const role = $("loginRole").value;
  $("loginError").textContent = "";

  if (!username || !password) {
    $("loginError").textContent = "Please enter username and password.";
    return;
  }

  if (role === "admin") {
    const admin = admins.find(a => (a.username === username || a.email === username) && a.password === password);
    if (admin) {
      currentUser = { role: "admin", username: admin.username, name: admin.name, userId: admin.id };
    } else {
      $("loginError").textContent = "Invalid admin credentials.";
      return;
    }
  } else if (role === "frontoffice") {
    const user = frontOfficeUsers.find(u => (u.username === username || u.email === username) && u.password === password);
    if (user) {
      currentUser = { role: "frontoffice", username, name: user.name, userId: user.id };
    } else {
      $("loginError").textContent = "Invalid front office credentials.";
      return;
    }
  } else if (role === "manager") {
    const user = managers.find(m => (m.username === username || m.email === username) && m.password === password);
    if (user) {
      currentUser = { role: "manager", username, name: user.name, userId: user.id };
    } else {
      $("loginError").textContent = "Invalid manager credentials.";
      return;
    }
  } else if (role === "employee") {
    const emp = employees.find(
      e =>
        (e.username && e.username === username) ||
        e.email === username
    );
    if (!emp || emp.password !== password) {
      $("loginError").textContent = "Invalid employee credentials.";
      return;
    }
    currentUser = {
      role: "employee",
      username,
      name: emp.name,
      employeeId: emp.id
    };
  } else if (role === "finance") {
    const fin = financeUsers.find(f => (f.username === username || f.email === username) && f.password === password);
    if (fin) {
      currentUser = { role: "finance", username, name: fin.name, userId: fin.id };
    } else {
      $("loginError").textContent = "Invalid finance credentials.";
      return;
    }
  } else {
    $("loginError").textContent = "Invalid credentials.";
    return;
  }

  $("loginUsername").value = "";
  $("loginPassword").value = "";
  onLoginSuccess();
}

function onLoginSuccess() {
  try {
    updateHeader();
    updateStats();
    updateAdminStats();
    renderEmployees();
    renderAdminAllTickets();
    renderAdminCompanies();
    renderAdminCustomers();
    renderCallGroups();
    renderPendingTicketsForManager();
    renderAssignedTicketsForManager();
    renderTaskProgressReports();
    selectedTicketForEmployee = null;
    if ($("ticketDescInfo")) $("ticketDescInfo").textContent = "Select a ticket to view description and actions.";

    if (currentUser.role === "admin") {
      setupAdminTabNavigation();
      setupEmployeeForm();
      setupAdminManagerEmployees();
      setupOtherEmployeeForm();
      setupManagerForm();
      // Step 8: Initialize the new functions
      populateManagerCallGroupsDropdown();
      setupManagerForm();
      setupGroupForm();
      renderAdminManagers();
      renderAdminCallGroups();
      updateAdminStats();

      setupGroupForm();
      // setupCompanyForm(); // companies removed from admin nav
      setupCustomerForm();
      renderAdminManagerEmployees();
      renderAdminOtherEmployees();
      setupAdminAdminForm();
      renderAdminAdmins();
      applyAdminPermissionUI();
      
      showSection("adminDashboard");
    } else if (currentUser.role === "frontoffice") {
      setupFrontOfficeHandlers();
      renderFrontOfficeTickets();
      showSection("frontOfficeDashboard");
  } else if (currentUser.role === "manager") {
      renderManagerEmployeesBox();
      showSection("managerDashboard");
  } else if (currentUser.role === "employee") {
    renderEmployeeTickets();
    showSection("employeeDashboard");
  } else if (currentUser.role === "finance") {
    renderFinanceTickets();
    showSection("financeDashboard");
  }
  } catch (error) {
    console.error("Login error:", error);
    alert("Error loading dashboard: " + error.message);
    currentUser = null;
    updateHeader();
  }
}

/* Logout */
function logout() {
  currentUser = null;
  updateHeader();
  showSection("loginPage");
}

/* Event listeners */
window.onload = () => {
  showSection("loginPage");

  $("loginBtn").onclick = login;
  $("logoutBtn").onclick = logout;

  // Show/hide department field based on role selection
  const empRoleSelect = $("empRole");
  const deptGroup = $("deptGroup");
  
  if (empRoleSelect && deptGroup) {
    empRoleSelect.onchange = () => {
      if (empRoleSelect.value === "employee") {
        deptGroup.classList.remove("hidden");
      } else {
        deptGroup.classList.add("hidden");
      }
    };
  }

  // Call Type dropdown - populate Call Group AND Managers
  const callTypeSelect = $("callType");
  const callGroupSelect = $("callGroup");
  const managerSelect = $("assignedManagerForTicket");
  
  if (callTypeSelect) {
    callTypeSelect.onchange = () => {
      const selectedType = callTypeSelect.value;
      callGroupSelect.innerHTML = "<option value=''>Select Group</option>";
      managerSelect.innerHTML = "<option value=''>-- Manager auto-assigned from group --</option>";
      
      if (selectedType) {
        const matchingGroups = callGroups.filter(g => g.department === selectedType || g.callType === selectedType);
        matchingGroups.forEach(group => {
          const groupOption = document.createElement("option");
          groupOption.value = group.id;
          groupOption.textContent = group.name;
          groupOption.dataset.groupId = group.id;
          callGroupSelect.appendChild(groupOption);
        });
      }
    };
  }

  // Call Group dropdown - no manual manager selection needed (auto-assigned)
  if (callGroupSelect) {
    callGroupSelect.onchange = () => {
      const selectedGroupId = callGroupSelect.value;
      managerSelect.innerHTML = "";
      
      if (selectedGroupId) {
        const group = callGroups.find(g => g.id === selectedGroupId);
        const managerList = group && (group.managers || group.assignedManagers) ? (group.managers || group.assignedManagers) : [];
        
        if (managerList.length > 0) {
          const opt = document.createElement("option");
          opt.value = "";
          opt.textContent = `Auto-assigned to ${managerList.length} manager(s)`;
          opt.disabled = true;
          managerSelect.appendChild(opt);
        } else {
          const noManagerOption = document.createElement("option");
          noManagerOption.value = "";
          noManagerOption.textContent = "No managers assigned to this group";
          noManagerOption.disabled = true;
          managerSelect.appendChild(noManagerOption);
        }
      }
    };
  }

  // Forgot password flow
  const forgotLink = $("forgotLink");
  const sendResetBtn = $("sendResetBtn");
  const sendOtpBtn = $("sendOtpBtn");
  const verifyOtpBtn = $("verifyOtpBtn");
  const fpOtpInput = $("fpOtpInput");
  if (forgotLink) {
    forgotLink.onclick = () => {
      $("fpIdentifier").value = "";
      $("fpMobile").value = "";
      $("fpRole").value = "";
      $("fpMsg").textContent = "";
      $("fpErr").textContent = "";
      // ensure reset-now UI is hidden by default
      const toggle = $("fpResetNowToggle");
      const section = $("fpResetNowSection");
      if (toggle) toggle.checked = false;
      if (section) section.classList.add("hidden");
      showSection("forgotPasswordPage");
    };
  }

  // Store requests and OTPs
  let passwordResetRequests = [];
  let otpStore = {}; // key: role+ident, value: { otp, expiresAt, verified }

  function findUserByRoleAndIdent(role, ident) {
    if (role === "frontoffice") return frontOfficeUsers.find(u => u.username === ident || u.email === ident || u.phone === ident);
    if (role === "manager") return managers.find(u => u.username === ident || u.email === ident || u.phone === ident);
    if (role === "employee") return employees.find(u => (u.username && u.username === ident) || u.email === ident || u.phone === ident);
    if (role === "admin") return admins.find(u => u.username === ident || u.email === ident);
    if (role === "finance") return financeUsers.find(u => u.username === ident || u.email === ident || u.phone === ident);
    return null;
  }

  if (sendOtpBtn) {
    sendOtpBtn.onclick = () => {
      const ident = $("fpIdentifier").value.trim();
      const role = $("fpRole").value;
      const mobile = $("fpMobile").value.trim();
      $("fpMsg").textContent = "";
      $("fpErr").textContent = "";
      if (!ident || !role || !mobile) {
        $("fpErr").textContent = "Enter username/email, role, and registered mobile number.";
        return;
      }
      const user = findUserByRoleAndIdent(role, ident);
      if (!user || (user.phone && user.phone !== mobile)) {
        $("fpErr").textContent = "User not found or mobile does not match.";
        return;
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      const key = role + ':' + (user.username || user.email || user.id);
      otpStore[key] = { otp, expiresAt: Date.now() + 5 * 60 * 1000, verified: false };
      $("fpMsg").textContent = `OTP sent to ${mobile}. For demo, OTP: ${otp}`;
    };
  }

  if (verifyOtpBtn) {
    verifyOtpBtn.onclick = () => {
      const ident = $("fpIdentifier").value.trim();
      const role = $("fpRole").value;
      const user = findUserByRoleAndIdent(role, ident);
      if (!user) { $("fpErr").textContent = "User not found."; return; }
      const key = role + ':' + (user.username || user.email || user.id);
      const rec = otpStore[key];
      const val = fpOtpInput.value.trim();
      if (!rec || !val) { $("fpErr").textContent = "Enter OTP."; return; }
      if (Date.now() > rec.expiresAt) { $("fpErr").textContent = "OTP expired."; return; }
      if (rec.otp !== val) { $("fpErr").textContent = "Invalid OTP."; return; }
      rec.verified = true;
      $("fpMsg").textContent = "OTP verified. You may reset password now.";
      const toggle = $("fpResetNowToggle");
      if (toggle) { toggle.checked = true; toggle.onchange && toggle.onchange(); }
    };
  }
  if (sendResetBtn) {
    sendResetBtn.onclick = () => {
      const ident = $("fpIdentifier").value.trim();
      const role = $("fpRole").value;
      $("fpMsg").textContent = "";
      $("fpErr").textContent = "";

      if (!ident || !role) {
        $("fpErr").textContent = "Please enter username/email and role.";
        return;
      }

      passwordResetRequests.push({ ts: new Date().toISOString(), ident, role });
      logAction('user','request_password_reset', null, `${role}:${ident}`);
      $("fpMsg").textContent = "Request sent to Admin. You will receive a reset link or temporary password by email.";
    };
  }

  // Copy temp password button
  const copyTempBtn = $("copyTempBtn");
  if (copyTempBtn) {
    copyTempBtn.onclick = async () => {
      try {
        await navigator.clipboard.writeText("temp1234");
        $("fpMsg").textContent = "Temporary password copied to clipboard.";
      } catch (err) {
        $("fpErr").textContent = "Clipboard copy not supported in this browser.";
      }
    };
  }

  // Toggle for immediate reset
  const fpResetNowToggle = $("fpResetNowToggle");
  const fpResetNowSection = $("fpResetNowSection");
  const fpResetNowBtn = $("fpResetNowBtn");
  if (fpResetNowToggle) {
    fpResetNowToggle.onchange = () => {
      if (fpResetNowToggle.checked) {
        if (fpResetNowSection) fpResetNowSection.classList.remove("hidden");
        if (sendResetBtn) sendResetBtn.classList.add("hidden");
      } else {
        if (fpResetNowSection) fpResetNowSection.classList.add("hidden");
        if (sendResetBtn) sendResetBtn.classList.remove("hidden");
      }
    };
  }

  if (fpResetNowBtn) {
    fpResetNowBtn.onclick = () => {
      const ident = $("fpIdentifier").value.trim();
      const role = $("fpRole").value;
      const newPwd = $("fpNewPassword").value;
      const conf = $("fpConfirmPassword").value;
      $("fpMsg").textContent = "";
      $("fpErr").textContent = "";

      if (!ident || !role) {
        $("fpErr").textContent = "Please enter username/email and role.";
        return;
      }
      if (!newPwd || !conf) {
        $("fpErr").textContent = "Please enter and confirm the new password.";
        return;
      }
      if (newPwd !== conf) {
        $("fpErr").textContent = "Passwords do not match.";
        return;
      }

      let user = null;
      if (role === "frontoffice") {
        user = frontOfficeUsers.find(u => u.username === ident || u.email === ident);
      } else if (role === "manager") {
        user = managers.find(u => u.username === ident || u.email === ident);
      } else if (role === "employee") {
        user = employees.find(u => (u.username && u.username === ident) || u.email === ident);
      } else if (role === "admin") {
        user = admins.find(u => u.username === ident || u.email === ident);
      }

      if (!user) {
        $("fpErr").textContent = "No user found with provided identifier and role.";
        return;
      }
      // Require OTP verification for non-admin roles
      if (role !== 'admin') {
        const key = role + ':' + (user.username || user.email || user.id);
        if (!otpStore[key] || !otpStore[key].verified) {
          $("fpErr").textContent = "Please verify OTP sent to your mobile before resetting.";
          return;
        }
      }

      // Set new password immediately
      user.password = newPwd;
      $("fpMsg").textContent = "Password changed successfully. You can now login with the new password.";
      // clear inputs and return to login after a moment
      setTimeout(() => {
        showSection("loginPage");
      }, 1500);
    };
  }

  // Back button delegation: any element with class 'back-btn' should navigate to its data-target
  document.addEventListener("click", (e) => {
    const btn = e.target.closest && e.target.closest('.back-btn');
    if (!btn) return;
    const target = btn.getAttribute('data-target') || 'loginPage';
    showSection(target);
  });

  // New Customer Button
  const newCustomerBtn = $("newCustomerBtn");
  if (newCustomerBtn) {
    newCustomerBtn.onclick = () => {
      // Populate company dropdown
      const companySel = $("newCustCompany");
      companySel.innerHTML = "<option value=''>Select Company</option>";
      companies.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        companySel.appendChild(opt);
      });
      showSection("newCustomerPage");
    };
  }

  // Add Company Handler
  const addCompanyBtn = $("addCompanyBtn");
  if (addCompanyBtn) {
    addCompanyBtn.onclick = () => {
      const name = $("companyName").value.trim();
      const phone = $("companyPhone").value.trim();
      const email = $("companyEmail").value.trim();
      const gst = $("companyGST").value.trim();
      const addr1 = $("companyAddr1").value.trim();
      const addr2 = $("companyAddr2").value.trim();
      const addr3 = $("companyAddr3").value.trim();
      const pincode = $("companyPincode").value.trim();
      const editId = $("companyName").dataset.editId;

      $("companyAddMsg").textContent = "";
      $("companyAddErr").textContent = "";

      if (!name || !phone || !email || !gst || !pincode) {
        $("companyAddErr").textContent = "Required fields: Name, Phone, Email, GST, Pincode";
        return;
      }

      if (editId) {
        // Update existing company
        const company = companies.find(c => c.id === editId);
        if (company) {
          company.name = name;
          company.phone = phone;
          company.email = email;
          company.gstNo = gst;
          company.address = { line1: addr1, line2: addr2, line3: addr3, pincode };
          $("companyAddMsg").textContent = `Company ${name} updated successfully`;
          renderAdminCompanies();
        }
      } else {
        // Create new company
        const id = generateCompanyId();
        companies.push({
          id,
          name,
          phone,
          email,
          gstNo: gst,
          address: { line1: addr1, line2: addr2, line3: addr3, pincode }
        });
        $("companyAddMsg").textContent = `Company ${name} added with ID ${id}`;
        setTimeout(() => showSection("newCustomerPage"), 1500);
      }

      $("companyName").value = "";
      $("companyPhone").value = "";
      $("companyEmail").value = "";
      $("companyGST").value = "";
      $("companyAddr1").value = "";
      $("companyAddr2").value = "";
      $("companyAddr3").value = "";
      $("companyPincode").value = "";
      $("companyName").dataset.editId = "";
    };
  }

  const cancelCompanyBtn = $("cancelCompanyBtn");
  if (cancelCompanyBtn) {
    cancelCompanyBtn.onclick = () => {
      showSection("frontOfficeDashboard");
      renderFrontOfficeTickets();
    };
  }

  // Add Customer Handler
  const addCustomerBtn = $("addCustomerBtn");
  if (addCustomerBtn) {
    addCustomerBtn.onclick = () => {
      const name = $("newCustName").value.trim();
      const phone = $("newCustPhone").value.trim();
      const email = $("newCustEmail").value.trim();
      const companyId = $("newCustCompany").value;
      const addr1 = $("newCustAddr1").value.trim();
      const addr2 = $("newCustAddr2").value.trim();
      const addr3 = $("newCustAddr3").value.trim();
      const pincode = $("newCustPincode").value.trim();
      const editId = $("newCustName").dataset.editId;

      $("customerAddMsg").textContent = "";
      $("customerAddErr").textContent = "";

      if (!name || !phone || !email || !companyId || !pincode) {
        $("customerAddErr").textContent = "Required fields: Name, Phone, Email, Company, Pincode";
        return;
      }

      if (editId) {
        // Update existing customer
        const customer = customers.find(c => c.id === editId);
        if (customer) {
          customer.name = name;
          customer.phone = phone;
          customer.email = email;
          customer.companyId = companyId;
          customer.address = { line1: addr1, line2: addr2, line3: addr3, pincode };
          $("customerAddMsg").textContent = `Customer ${name} updated successfully`;
          renderAdminCustomers();
        }
      } else {
        // Create new customer
        const id = generateCustomerId();
        customers.push({
          id,
          name,
          phone,
          email,
          companyId,
          address: { line1: addr1, line2: addr2, line3: addr3, pincode }
        });
        $("customerAddMsg").textContent = `Customer ${name} added with ID ${id}`;
      }

      $("newCustName").value = "";
      $("newCustPhone").value = "";
      $("newCustEmail").value = "";
      $("newCustCompany").value = "";
      $("newCustAddr1").value = "";
      $("newCustAddr2").value = "";
      $("newCustAddr3").value = "";
      $("newCustPincode").value = "";
      $("newCustName").dataset.editId = "";

      if (!editId) {
        setTimeout(() => showSection("frontOfficeDashboard"), 1500);
        renderFrontOfficeTickets();
      }
    };
  }

  const cancelCustomerBtn = $("cancelCustomerBtn");
  if (cancelCustomerBtn) {
    cancelCustomerBtn.onclick = () => {
      showSection("frontOfficeDashboard");
      renderFrontOfficeTickets();
    };
  }

  const adminAddCompanyBtn = $("adminAddCompanyBtn");
  if (adminAddCompanyBtn) {
    adminAddCompanyBtn.onclick = () => {
      // Clear form for new company
      $("companyName").value = "";
      $("companyPhone").value = "";
      $("companyEmail").value = "";
      $("companyGst").value = "";
      $("companyAddr1").value = "";
      $("companyAddr2").value = "";
      $("companyAddr3").value = "";
      $("companyPincode").value = "";
      $("companyName").dataset.editId = "";
      $("companyAddMsg").textContent = "";
      $("companyAddErr").textContent = "";
      showSection("newCompanyPage");
    };
  }

  const adminAddCustomerBtn = $("adminAddCustomerBtn");
  if (adminAddCustomerBtn) {
    adminAddCustomerBtn.onclick = () => {
      // Clear form for new customer
      $("newCustName").value = "";
      $("newCustPhone").value = "";
      $("newCustEmail").value = "";
      $("newCustCompany").value = "";
      $("newCustAddr1").value = "";
      $("newCustAddr2").value = "";
      $("newCustAddr3").value = "";
      $("newCustPincode").value = "";
      $("newCustName").dataset.editId = "";
      $("customerAddMsg").textContent = "";
      $("customerAddErr").textContent = "";
      // Populate company dropdown
      const companySelect = $("newCustCompany");
      companySelect.innerHTML = '<option value="">-- Select Company --</option>';
      companies.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c.id;
        opt.textContent = c.name;
        companySelect.appendChild(opt);
      });
      showSection("newCustomerPage");
    };
  }

  const adminAddGroupBtn = $("adminAddGroupBtn");
  if (adminAddGroupBtn) {
    adminAddGroupBtn.onclick = () => {
      const inlineForm = $("addGroupForm");
      if (inlineForm && inlineForm.classList) {
        inlineForm.classList.remove("hidden");
        const nameInput = inlineForm.querySelector('#groupName');
        const typeSelect = inlineForm.querySelector('#groupCallType');
        const msg = inlineForm.querySelector('#groupAddMsg');
        const err = inlineForm.querySelector('#groupAddErr');
        if (nameInput) nameInput.value = "";
        if (typeSelect) typeSelect.value = "";
        if (msg) msg.textContent = "";
        if (err) err.textContent = "";
      } else {
        // Fallback to dedicated page
        $("groupName").value = "";
        $("groupCallType").value = "";
        $("groupServices").value = "";
        $("groupName").dataset.editId = "";
        $("groupAddMsg").textContent = "";
        $("groupAddErr").textContent = "";
        populateGroupManagers([]);
        showSection("newGroupPage");
      }
    };
  }

  const cancelGroupBtn = $("cancelGroupBtn");
  if (cancelGroupBtn) {
    cancelGroupBtn.onclick = () => {
      const inlineForm = $("addGroupForm");
      if (inlineForm && inlineForm.classList) {
        inlineForm.classList.add("hidden");
        renderAdminCallGroups();
        updateAdminStats();
      } else {
        showSection("adminDashboard");
        renderCallGroups();
      }
    };
  }

  const addGroupBtn = $("addGroupBtn");
  if (addGroupBtn) {
    addGroupBtn.onclick = () => {
      const name = $("groupName").value.trim();
      const callType = $("groupCallType").value;
      const services = $("groupServices").value.split(",").map(s => s.trim()).filter(s => s);
      const editId = $("groupName").dataset.editId;

      $("groupAddMsg").textContent = "";
      $("groupAddErr").textContent = "";

      if (!name || !callType) {
        $("groupAddErr").textContent = "Group Name and Call Type are required";
        return;
      }

      // Get selected managers
      const selectedManagers = Array.from(document.querySelectorAll(".manager-checkbox:checked"))
        .map(cb => cb.value);

      if (editId) {
        // Update existing group
        const group = callGroups.find(g => g.id === editId);
        if (group) {
          group.name = name;
          group.department = callType;
          group.callType = callType;
          group.services = services.length > 0 ? services : ["IT Support"];
          group.managers = selectedManagers;
          group.assignedManagers = selectedManagers; // Keep for compatibility
          $("groupAddMsg").textContent = `Group ${name} updated successfully`;
          renderCallGroups();
        }
      } else {
        // Create new group
        const id = generateGroupId();
        callGroups.push({
          id,
          name,
          department: callType,
          callType,
          services: services.length > 0 ? services : ["IT Support"],
          managers: selectedManagers,
          assignedManagers: selectedManagers // Keep for compatibility
        });
        $("groupAddMsg").textContent = `Group ${name} added with ID ${id}`;
      }

      setTimeout(() => {
        showSection("adminDashboard");
        renderCallGroups();
      }, 1500);
    };
  }

  $("addEmployeeBtn").onclick = () => {
    const name = $("empName").value.trim();
    const email = $("empEmail").value.trim();
    const role = $("empRole").value;
    const dept = role === "employee" ? $("empDept").value : "N/A";
    const pwd = $("empPassword").value;

    $("empAddMsg").textContent = "";
    $("empAddErr").textContent = "";

    if (!name || !email || !role || !pwd) {
      $("empAddErr").textContent = "All fields are required.";
      return;
    }
    
    if (role === "employee" && !dept) {
      $("empAddErr").textContent = "Department is required for employees.";
      return;
    }
    
    if (!email.includes("@")) {
      $("empAddErr").textContent = "Enter a valid email.";
      return;
    }

    // Check if email already exists across all user types
    const emailExists = 
      employees.some(e => e.email.toLowerCase() === email.toLowerCase()) ||
      managers.some(m => m.email.toLowerCase() === email.toLowerCase()) ||
      frontOfficeUsers.some(f => f.email.toLowerCase() === email.toLowerCase());
    
    if (emailExists) {
      $("empAddErr").textContent = "User with this email already exists.";
      return;
    }

    // Generate username from email (before @)
    const username = email.split("@")[0];

    if (role === "employee") {
      const id = generateEmployeeId();
      employees.push({
        id,
        name,
        email,
        department: dept,
        password: pwd,
        username,
        role: "employee"
      });
      $("empAddMsg").textContent = `Employee ${name} added with ID ${id}. Login with email/username: ${username}`;
    } else if (role === "manager") {
      const id = "M" + String(managers.length + 1).padStart(3, "0");
      managers.push({
        id,
        name,
        email,
        department: "Management",
        password: pwd,
        username,
        role: "manager"
      });
      $("empAddMsg").textContent = `Manager ${name} added with ID ${id}. Login with email/username: ${username}`;
    } else if (role === "frontoffice") {
      const id = "F" + String(frontOfficeUsers.length + 1).padStart(3, "0");
      frontOfficeUsers.push({
        id,
        name,
        email,
        department: "Front Office",
        password: pwd,
        username,
        role: "frontoffice"
      });
      $("empAddMsg").textContent = `Front Office user ${name} added with ID ${id}. Login with email/username: ${username}`;
    }

    $("empName").value = "";
    $("empEmail").value = "";
    $("empPassword").value = "";
    $("empRole").value = "employee";
    $("empDept").value = "IT Support";
    if (deptGroup) deptGroup.classList.remove("hidden");

    renderEmployees();
    updateStats();
  };

  $("createTicketBtn").onclick = () => {
    const custName = $("custName").value.trim();
    const custEmail = $("custEmail").value.trim();
    const callType = $("callType").value;
    const callGroup = $("callGroup").value;
    const assignedManagerId = $("assignedManagerForTicket").value;
    const service = $("serviceType").value;
    const desc = $("ticketDesc").value.trim();
    $("ticketCreateMsg").textContent = "";
    $("ticketCreateErr").textContent = "";

    if (!custName || !custEmail || !callType || !callGroup || !assignedManagerId || !desc) {
      $("ticketCreateErr").textContent = "All fields are required.";
      return;
    }
    if (!custEmail.includes("@")) {
      $("ticketCreateErr").textContent = "Enter a valid email.";
      return;
    }

    // Find customer by name/email
    const customer = customers.find(c => c.name.toLowerCase() === custName.toLowerCase() || c.email.toLowerCase() === custEmail.toLowerCase());
    const customerId = customer ? customer.id : null;
    const companyId = customer ? customer.companyId : null;

    const id = generateTicketId();
    const today = new Date().toISOString().slice(0, 10);
    tickets.push({
      id,
      customerName: custName,
      customerEmail: custEmail,
      customerId: customerId,
      companyId: companyId,
      serviceType: service,
      callType: callType,
      callGroup: callGroup,
      status: "Raised",
      raisedDate: today,
      frontOfficeUser: currentUser.username,
      assignedManagerId: assignedManagerId,
      assignedEmployeeId: null,
      completedDate: null,
      taskStatus: null,
      taskStartedDate: null,
      taskStartedTime: null,
      taskProgress: 0,
      taskNeeds: "",
      taskCompletionImage: null,
      reportedToManager: false,
      tasks: []
    });

    $("custName").value = "";
    $("custEmail").value = "";
    $("ticketDesc").value = "";
    $("callType").value = "";
    $("callGroup").value = "";
    $("assignedManagerForTicket").value = "";
    if (callGroupSelect) callGroupSelect.innerHTML = "<option value=''>Select Group</option>";
    if (managerSelect) managerSelect.innerHTML = "<option value=''>Select Manager</option>";

    $("ticketCreateMsg").textContent = `Ticket ${id} created successfully and assigned to manager.`;
    renderFrontOfficeTickets();
    renderPendingTicketsForManager();
    renderAdminAllTickets();
    updateStats();
  };

  const addTaskBtnEl = $("addTaskBtn");
  if (addTaskBtnEl) {
    addTaskBtnEl.onclick = () => {
      // tasks UI removed; nothing to do here
    };
  }

  const reportCompletedBtn = $("reportCompletedBtn");
  if (reportCompletedBtn) {
    reportCompletedBtn.onclick = () => {
      if (!selectedTicketForEmployee) {
        $("taskAddErr").textContent = "Select a ticket first.";
        return;
      }
      const ticket = selectedTicketForEmployee;
      if (!confirm("Report this ticket as completed to Front Office?")) return;
      ticket.status = "Reported";
      ticket.completedDate = formatDateTime();
      renderEmployeeTickets();
      renderAssignedTicketsForManager();
      renderAdminAllTickets();
      renderFrontOfficeReportedTickets();
      updateStats();
      alert("Ticket reported to Front Office. Front Office will send payment & feedback to customer.");
    };
  }

  $("payNowBtn").onclick = () => {
    if (!paymentTicket) return;
    const statusSel = $("paymentStatusSelect");
    const amtInput = $("paymentAmountInput");
    const statusVal = statusSel ? statusSel.value : 'pending';
    const amtVal = amtInput && amtInput.value ? parseFloat(amtInput.value) : 0;
    paymentTicket.paymentStatus = statusVal;
    paymentTicket.amountPaid = amtVal;
    if (statusVal === 'received') {
      paymentTicket.paymentReceivedDate = formatDateTime();
    }
    if (!paymentTicket.paymentHistory) paymentTicket.paymentHistory = [];
    paymentTicket.paymentHistory.push({ date: formatDateTime(), method: 'Cash', amount: amtVal, status: statusVal });
    $("payMsg").textContent = "Payment saved.";
    renderFinanceTickets();
  };
  $("submitFeedbackBtn").onclick = () => {
    if (!paymentTicket) return;
    const rating = $("feedbackRating").value;
    const comment = $("feedbackComment").value.trim();
    const confirmText = $("financeConfirmText") ? $("financeConfirmText").value.trim() : '';
    if (!confirmText) {
      $("feedbackMsg").textContent = "Please enter finance confirmation text.";
      return;
    }
    const rec = document.querySelector("input[name=recommend]:checked").value;
    feedbacks.push({
      ticketId: paymentTicket.id,
      rating,
      comment,
      recommendation: rec
    });
    // mark ticket as Finished and record payment/feedback send time
    paymentTicket.status = "Finished";
    paymentTicket.paymentSentDate = formatDateTime();
    logAction('finance','confirm_and_complete', paymentTicket.id, confirmText);
    $("feedbackMsg").textContent = "Feedback submitted and payment sent. Ticket marked Finished.";
    // refresh views
    renderFrontOfficeTickets();
    renderFrontOfficeReportedTickets();
    renderAssignedTicketsForManager();
    renderAdminAllTickets();
    renderFinanceTickets();
    updateStats();
  };

  $("backToStatusBtn").onclick = () => {
    if (!currentUser) {
      showSection("loginPage");
      return;
    }
    if (currentUser.role === "employee") {
      renderEmployeeTickets();
      showSection("employeeDashboard");
    } else if (currentUser.role === "manager") {
      showSection("managerDashboard");
    } else if (currentUser.role === "frontoffice") {
      renderFrontOfficeTickets();
      showSection("frontOfficeDashboard");
    } else if (currentUser.role === "admin") {
      showSection("adminDashboard");
    }
  };

  $("logoutFromAdmin").onclick = logout;
  $("logoutFromFrontOffice").onclick = logout;
  $("logoutFromManager").onclick = logout;
  $("logoutFromEmployee").onclick = logout;

  // Employee Work Panel Event Listeners
  const startBreakBtn = $("startBreakBtn");
  const endBreakBtn = $("endBreakBtn");
  const submitProgressUpdateBtn = $("submitProgressUpdateBtn");
  const completeTaskBtn = $("completeTaskBtn");
  const closeWorkPanelBtn = $("closeWorkPanelBtn");
  const workProgressRange = $("workProgressRange");

  if (startBreakBtn) startBreakBtn.onclick = startBreak;
  if (endBreakBtn) endBreakBtn.onclick = endBreak;
  if (submitProgressUpdateBtn) submitProgressUpdateBtn.onclick = submitProgressUpdate;
  if (completeTaskBtn) completeTaskBtn.onclick = completeTask;
  if (closeWorkPanelBtn) {
    closeWorkPanelBtn.onclick = () => {
      $("taskWorkPanel").classList.add("hidden");
      $("workUpdateMsg").textContent = "";
      $("workUpdateErr").textContent = "";
    };
  }

  // Update work time every second when task is open
  setInterval(() => {
    if (selectedTaskForWork && !$("taskWorkPanel").classList.contains("hidden")) {
      updateWorkTimeDisplay();
    }
  }, 1000);

  // Task Progress Tracking Handlers
  const taskProgressRange = $("taskProgressRange");
  if (taskProgressRange) {
    taskProgressRange.oninput = () => {
      $("taskProgressDisplay").textContent = taskProgressRange.value + "%";
    };
  }

  const updateTaskProgressBtn = $("updateTaskProgressBtn");
  if (updateTaskProgressBtn) {
    updateTaskProgressBtn.onclick = () => {
      if (!selectedTicketForEmployee) {
        alert("No ticket selected");
        return;
      }
      const status = $("taskStatusSelect").value;
      const progress = parseInt($("taskProgressRange").value) || 0;
      const needs = $("taskNeeds").value.trim();
      const startDate = $("taskStartDate").value;
      const startTime = $("taskStartTime").value;

      $("progressUpdateErr").textContent = "";
      $("progressUpdateMsg").textContent = "";

      if (!status) {
        $("progressUpdateErr").textContent = "Please select a task status";
        return;
      }

      selectedTicketForEmployee.taskStatus = status;
      selectedTicketForEmployee.taskProgress = progress;
      selectedTicketForEmployee.taskNeeds = needs;
      
      if (startDate && !selectedTicketForEmployee.taskStartedDate) {
        selectedTicketForEmployee.taskStartedDate = startDate;
      }
      if (startTime && !selectedTicketForEmployee.taskStartedTime) {
        selectedTicketForEmployee.taskStartedTime = startTime;
      }

      $("progressUpdateMsg").textContent = `Progress updated: ${status}, ${progress}% complete`;
      renderEmployeeTickets();
    };
  }

  const reportTaskBtn = $("reportTaskBtn");
  if (reportTaskBtn) {
    reportTaskBtn.onclick = () => {
      if (!selectedTicketForEmployee) {
        alert("No ticket selected");
        return;
      }
      if (!selectedTicketForEmployee.taskStatus) {
        alert("Please update task status first");
        return;
      }

      selectedTicketForEmployee.reportedToManager = true;
      $("progressUpdateMsg").textContent = "Task progress reported to manager";
      
      // Call render function to show report in manager dashboard
      renderTaskProgressReports();
      alert("Task details reported to manager. Manager can view in Task Progress Reports section.");
    };
  }

  const closeProgressBtn = $("closeProgressBtn");
  if (closeProgressBtn) {
    closeProgressBtn.onclick = () => {
      $("customerProgressSection").classList.add("hidden");
      selectedCustomerProgress = null;
    };
  }
};

/* Front Office: render reported tickets and send payment */
function renderFrontOfficeReportedTickets() {
  const tbody = $("frontOfficeReportedTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const reported = tickets.filter(t => t.status === "Reported" && t.frontOfficeUser === currentUser.username && t.verifiedByManager);
  reported.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.serviceType}</td>
      <td>${t.completedDate || ""}</td>
      <td><button class="btn small primary" data-send-payment="${t.id}">Send Payment & Feedback</button></td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-send-payment]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-send-payment");
      const ticket = tickets.find(t => t.id === ticketId);
      if (!ticket) return;
      // simulate sending to customer (email/phone)
      alert(`Sending payment & feedback link to ${ticket.customerEmail}`);
      openPaymentPage(ticket);
      logAction('frontoffice','send_payment_link', ticket.id);
    };
  });
}

/* Show Ticket Progress - Modal/Alert Display */
function showTicketProgress(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) {
    alert("Ticket not found");
    return;
  }
  
  const emp = ticket.assignedEmployeeId ? employees.find(e => e.id === ticket.assignedEmployeeId) : null;
  const empName = emp ? emp.name : "Unassigned";
  
  let progressInfo = `
TICKET PROGRESS
===============
Ticket ID: ${ticket.id}
Customer: ${ticket.customerName}
Phone: ${ticket.customerPhone}
Email: ${ticket.customerEmail}
Status: ${ticket.status}
Assigned Employee: ${empName}
Department: ${ticket.callType}
Problem: ${ticket.problemTitle}
Description: ${ticket.description}

TASK PROGRESS:
Task Status: ${ticket.taskStatus || "Not Started"}
Progress: ${ticket.taskProgress}%
Started Date: ${ticket.taskStartedDate || "Not Started"}
Started Time: ${ticket.taskStartedTime || "-"}
Task Needs: ${ticket.taskNeeds || "None specified"}
Completion Image: ${ticket.taskCompletionImage ? "Available" : "Not provided"}
  `;
  
  alert(progressInfo);
}

/* Manager: Task Progress Reports */
function renderTaskProgressReports() {
  const tbody = $("taskReportsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const reported = tickets.filter(t => t.reportedToManager && (t.status === "In Progress" || t.status === "Reported"));
  
  reported.forEach(t => {
    const emp = employees.find(e => e.id === t.assignedEmployeeId);
    const empName = emp ? emp.name : "-";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${empName}</td>
      <td>${t.taskStatus || "-"}</td>
      <td>${t.taskProgress || 0}%</td>
      <td>${t.taskStartedDate || "-"}</td>
      <td><button class="btn small primary" data-view-task-details="${t.id}">View Details</button></td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll("button[data-view-task-details]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-view-task-details");
      const ticket = tickets.find(t => t.id === ticketId);
      if (!ticket) return;
      const emp = employees.find(e => e.id === ticket.assignedEmployeeId);
      const message = `
Ticket: ${ticket.id}
Customer: ${ticket.customerName}
Employee: ${emp ? emp.name : "-"}
Task Status: ${ticket.taskStatus}
Progress: ${ticket.taskProgress}%
Date Started: ${ticket.taskStartedDate}
Time Started: ${ticket.taskStartedTime}
Task Needs: ${ticket.taskNeeds}
      `;
      alert(message);
    };
  });
}

/* Manager: include accepted date in assigned tickets */
function renderAssignedTicketsForManager() {
  const tbody = $("assignedTicketsTableBody");
  tbody.innerHTML = "";
  const myManagerId = currentUser.userId;
  const assigned = tickets.filter(t => 
    (t.acceptedByManager === myManagerId) && 
    (t.status === "Assigned" || t.status === "In Progress" || t.status === "Completed" || t.status === "Reported" || t.status === "Finished")
  );
  
  assigned.forEach(t => {
    const emp = t.assignedEmployeeId ? employees.find(e => e.id === t.assignedEmployeeId) : null;
    const empName = emp ? emp.name : "-";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><button class="btn small primary" data-view-ticket="${t.id}">${t.id}</button></td>
      <td>${t.customerName}</td>
      <td>${t.description}</td>
      <td>${empName}</td>
      <td>${t.acceptedDate || "-"}</td>
      <td>${t.status}</td>
      <td>
        ${t.status === "Reported" && !t.verifiedByManager ? '<button class="btn small primary" data-verify="' + t.id + '">Verify</button>' : ''}
        ${t.status !== "Finished" ? '<button class="btn small secondary" data-reassign="' + t.id + '">Reassign</button>' : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Add click handlers for viewing ticket progress
  Array.from(tbody.querySelectorAll("button[data-view-ticket]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-view-ticket");
      showTicketProgress(ticketId);
    };
  });

  Array.from(tbody.querySelectorAll("button[data-reassign]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-reassign");
      const ticket = tickets.find(t => t.id === ticketId);
      const employeeNames = employees.map(e => `${e.id} - ${e.name} (${e.department})`).join("\n");
      const empId = prompt("Enter employee ID to reassign to:\n" + employeeNames);
      if (!empId) return;
      const emp = employees.find(e => e.id === empId.trim());
      if (!emp) {
        alert("Invalid employee ID");
        return;
      }
      ticket.assignedEmployeeId = emp.id;
      ticket.status = "Assigned";
      ticket.acceptedDate = null;
      ticket.acceptedByEmployeeId = null;
      renderAssignedTicketsForManager();
      renderEmployeeTicketsIfEmployeeLoggedIn();
      renderAdminAllTickets();
      updateStats();
    };
  });

  Array.from(tbody.querySelectorAll("button[data-verify]")).forEach(btn => {
    btn.onclick = () => {
      const ticketId = btn.getAttribute("data-verify");
      const ticket = tickets.find(t => t.id === ticketId);
      if (!ticket) return;
      ticket.verifiedByManager = true;
      logAction('manager','verify_ticket', ticket.id);
      renderAssignedTicketsForManager();
      renderFrontOfficeReportedTickets();
      renderAdminAllTickets();
      updateStats();
      alert("Ticket verified by manager. Front Office can proceed with payment.");
    };
  });
}
function renderFinanceTickets() {
  const tbody = $("financeTicketsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const list = tickets.filter(t => t.status === "Reported" && t.verifiedByManager);
  list.forEach(t => {
    const amount = servicePricing[t.serviceType] || 0;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.customerName}</td>
      <td>${t.serviceType}</td>
      <td>${amount}</td>
      <td>${t.paymentStatus || 'pending'}</td>
      <td>
        <button class="btn small primary" data-record-cash="${t.id}">Record Cash Payment</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll('button[data-record-cash]')).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-record-cash');
      const ticket = tickets.find(t => t.id === id);
      if (!ticket) return;
      openPaymentPage(ticket);
    };
  });
}
function renderAdminOtherEmployees() {
  const tbody = $("otherEmployeesTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  const perms = getCurrentAdminPerms();
  const rows = [];
  frontOfficeUsers.forEach(u => rows.push({ id: u.id, name: u.name, email: u.email, username: u.username, role: 'frontoffice' }));
  financeUsers.forEach(u => rows.push({ id: u.id, name: u.name, email: u.email, username: u.username, role: 'finance' }));
  rows.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.id}</td>
      <td>${r.name}</td>
      <td>${r.phone || '-'}</td>
      <td>${r.email}</td>
      <td>${r.username}</td>
      <td>${r.role === 'frontoffice' ? 'Front Office' : 'Finance'}</td>
      <td>
        ${perms.canEdit ? `<button class="btn small primary" data-edit-other="${r.id}" data-role="${r.role}">Edit</button>` : ''}
        ${perms.canDelete ? `<button class="btn small secondary" data-delete-other="${r.id}" data-role="${r.role}">Delete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });

  Array.from(tbody.querySelectorAll('button[data-edit-other]')).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-edit-other');
      const role = btn.getAttribute('data-role');
      const form = $("addOtherEmployeeForm");
      form.classList.remove('hidden');
      const user = role === 'finance' ? financeUsers.find(x => x.id === id) : frontOfficeUsers.find(x => x.id === id);
      if (!user) return;
      $("otherName").value = user.name || '';
      $("otherEmail").value = user.email || '';
      $("otherUsername").value = user.username || '';
      $("otherPassword").value = user.password || '';
      $("otherPhone").value = user.phone || '';
      $("otherRole").value = role;
      form.dataset.editId = id;
      form.dataset.editRole = role;
      $("otherAddMsg").textContent = '';
      $("otherAddErr").textContent = '';
    };
  });

  Array.from(tbody.querySelectorAll('button[data-delete-other]')).forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-delete-other');
      const role = btn.getAttribute('data-role');
      if (!confirm('Delete this user?')) return;
      if (role === 'finance') {
        const idx = financeUsers.findIndex(x => x.id === id);
        if (idx >= 0) financeUsers.splice(idx, 1);
      } else {
        const idx = frontOfficeUsers.findIndex(x => x.id === id);
        if (idx >= 0) frontOfficeUsers.splice(idx, 1);
      }
      renderAdminOtherEmployees();
      updateAdminStats();
    };
  });
}

function setupOtherEmployeeForm() {
  const addBtn = $("adminAddOtherEmployeeBtn");
  const form = $("addOtherEmployeeForm");
  const saveBtn = $("saveOtherEmployeeBtn");
  const cancelBtn = $("cancelOtherEmployeeBtn");

  if (addBtn) {
    addBtn.onclick = () => {
      form.classList.remove('hidden');
      form.dataset.editId = '';
      form.dataset.editRole = '';
      $("otherName").value = '';
      $("otherEmail").value = '';
      $("otherUsername").value = '';
      $("otherPassword").value = '';
      $("otherRole").value = '';
      $("otherAddMsg").textContent = '';
      $("otherAddErr").textContent = '';
    };
  }

  function generateFrontOfficeId() {
    const num = frontOfficeUsers.length + 1;
    return 'F' + String(num).padStart(3, '0');
  }
  function generateFinanceId() {
    const num = financeUsers.length + 1;
    return 'FN' + String(num).padStart(3, '0');
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const name = $("otherName").value.trim();
      const email = $("otherEmail").value.trim();
      const username = $("otherUsername").value.trim();
      const password = $("otherPassword").value;
      const phone = $("otherPhone").value.trim();
      const role = $("otherRole").value;
      $("otherAddErr").textContent = '';
      $("otherAddMsg").textContent = '';
      if (!name || !email || !username || !password || !phone || !role) {
        $("otherAddErr").textContent = 'All fields are required.';
        return;
      }
      const editId = form.dataset.editId;
      const editRole = form.dataset.editRole;
      if (editId) {
        if (editRole === 'finance') {
          const idx = financeUsers.findIndex(x => x.id === editId);
          if (idx >= 0) Object.assign(financeUsers[idx], { name, email, username, password, phone });
        } else {
          const idx = frontOfficeUsers.findIndex(x => x.id === editId);
          if (idx >= 0) Object.assign(frontOfficeUsers[idx], { name, email, username, password, phone });
        }
        $("otherAddMsg").textContent = `User ${name} updated successfully!`;
      } else {
        if (role === 'finance') {
          const id = generateFinanceId();
          financeUsers.push({ id, name, email, username, password, phone, role: 'finance', department: 'Finance' });
        } else {
          const id = generateFrontOfficeId();
          frontOfficeUsers.push({ id, name, email, username, password, phone, role: 'frontoffice', department: 'Front Office' });
        }
        $("otherAddMsg").textContent = `User ${name} added successfully!`;
      }
      setTimeout(() => {
        form.classList.add('hidden');
        form.dataset.editId = '';
        form.dataset.editRole = '';
        renderAdminOtherEmployees();
        updateAdminStats();
      }, 1200);
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      form.classList.add('hidden');
      form.dataset.editId = '';
      form.dataset.editRole = '';
    };
  }
}
