const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// API employees
server.get("/employees", (req, res) => {
  const employees = router.db.get("employees").value();

  const result = employees.map((employee) => {
    const db = router.db;
    const position = db
      .get("position")
      .find({ id: employee.positionId })
      .value();

    const department = db
      .get("department")
      .find({ id: employee.departmentId })
      .value();

    const company = db.get("company").find({ id: employee.companyId }).value();

    return {
      ...employee,
      positionId: position,
      departmentId: department,
      companyId: company,
    };
  });

  res.json(result);
});
//! ---------------------------------------- !\\
// API customCompanies
server.get("/companyCustom/:companyId", (req, res) => {
  const { companyId } = req.params; // Lấy companyId từ URL

  const db = router.db;
  const company = db
    .get("company")
    .find({ id: parseInt(companyId) }) // Tìm công ty với id tương ứng
    .value();

  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }

  const employees = db
    .get("employees")
    .filter({ companyId: parseInt(companyId) }) // Lọc nhân viên của công ty này
    .value();

  const formattedEmployees = employees.map((employee) => {
    const position = db
      .get("position")
      .find({ id: employee.positionId })
      .value();

    const department = db
      .get("department")
      .find({ id: employee.departmentId })
      .value();

    return {
      ...employee,
      positionId: position,
      departmentId: department,
    };
  });

  const customData = {
    ...company,
    employees: formattedEmployees,
  };

  res.json(customData);
});
// server.get("/companyCustom", (req, res) => {
//   const db = router.db;

//   const companies = db.get("company").value();

//   const customData = companies.map((company) => {
//     const employees = db
//       .get("employees")
//       .filter({ companyId: company.id })
//       .value();

//     const formattedEmployees = employees.map((employee) => {
//       const position = db
//         .get("position")
//         .find({ id: employee.positionId })
//         .value();

//       const department = db
//         .get("department")
//         .find({ id: employee.departmentId })
//         .value();

//       return {
//         ...employee,
//         positionId: position,
//         departmentId: department,
//       };
//     });

//     return {
//       ...company,
//       employees: formattedEmployees,
//     };
//   });

//   res.json(customData);
// });

//! ---------------------------------------- !\\
// API leaveApplicationForm

server.get("/leaveApplicationForm", (req, res) => {
  const leaveALF = router.db.get("leaveApplicationForm").value();

  const result = leaveALF.map((leaveALF) => {
    const employeesLst = router.db
      .get("employees")
      .find({ id: leaveALF.employeesId })
      .value();

    return {
      ...leaveALF,
      employeesId: employeesLst,
    };
  });

  res.json(result);
});
//! ---------------------------------------- !\\
server.get("/company/:id/leaveALF", (req, res) => {
  const { id } = req.params;

  const db = router.db;
  const company = db
    .get("company")
    .find({ id: parseInt(id) })
    .value();

  if (!company) {
    return res.status(404).json({ error: "Company not found" });
  }

  const employees = db
    .get("employees")
    .filter({ companyId: parseInt(id) })
    .value();

  const employeeIds = employees.map((employee) => employee.id);

  const leaveALFs = db
    .get("leaveApplicationForm")
    .filter((alf) => employeeIds.includes(alf.employeesId))
    .value();

  const formattedLeaveALFs = leaveALFs.map((leaveALF) => {
    const employee = db
      .get("employees")
      .find({ id: leaveALF.employeesId })
      .value();

    return {
      ...leaveALF,
      employee,
    };
  });

  const result = {
    ...company,
    leaveApplicationForms: formattedLeaveALFs,
  };

  res.json(result);
});
//! ---------------------------------------- !\\
server.put("/leaveALF/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const db = router.db;
  const leaveALF = db
    .get("leaveApplicationForm")
    .find({ id: parseInt(id) })
    .value();

  if (!leaveALF) {
    return res.status(404).json({ error: "Leave Application Form not found" });
  }

  // Cập nhật trạng thái của Leave Application Form
  db.get("leaveApplicationForm")
    .find({ id: parseInt(id) })
    .assign({ status }) // Gán trạng thái mới
    .write();

  res.json({ message: "Leave Application Form status updated successfully" });
});
//! ---------------------------------------- !\\
server.use(router);
const PORT = 1000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});
