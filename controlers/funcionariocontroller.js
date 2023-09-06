const Employee = require('../models/employeeModel'); 
exports.createEmployee = async (req, res) => {
  try {
    const { name, cpf, age } = req.body;

    if (!name || !cpf || !age) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: name, cpf, age' });
    }

    const newEmployee = new Employee({ name, cpf, age });
    await newEmployee.save();
    res.status(201).json({ message: 'Funcionário registrado com sucesso!', employee: newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar o funcionário' });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar os funcionários' });
  }
};

exports.getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao recuperar o funcionário' });
  }
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const { name, cpf, age } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { name, cpf, age },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json({ message: 'Funcionário atualizado com sucesso!', employee: updatedEmployee });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o funcionário' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const deletedEmployee = await Employee.findByIdAndRemove(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json({ message: 'Funcionário excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir o funcionário' });
  }
};
const Employee = require('../models/employeeModel'); 
exports.createEmployee = async (req, res) => {
  try {
    const { name, cpf, age } = req.body;

    if (!name || !cpf || !age) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios: name, cpf, age' });
    }

    const newEmployee = new Employee({ name, cpf, age });
    await newEmployee.save();
    res.status(201).json({ message: 'Funcionário registrado com sucesso!', employee: newEmployee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar o funcionário' });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar os funcionários' });
  }
};

exports.getEmployeeById = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao recuperar o funcionário' });
  }
};

exports.updateEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const { name, cpf, age } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { name, cpf, age },
      { new: true }
    );
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json({ message: 'Funcionário atualizado com sucesso!', employee: updatedEmployee });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar o funcionário' });
  }
};

exports.deleteEmployee = async (req, res) => {
  const employeeId = req.params.id;
  try {
    const deletedEmployee = await Employee.findByIdAndRemove(employeeId);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }
    res.json({ message: 'Funcionário excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir o funcionário' });
  }
};
