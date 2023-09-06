const Employee = require('../models/Employee');

exports.createFuncionario = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const funcionario = new funcionario({ username, password, role });
    await funcionario.save();
    res.status(201).json({ message: 'Funcionário registrado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar funcionário!' });
  }
}

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
      const employee = await Employee.findByIdAndUpdate(
        employeeId,
        { name, cpf, age },
        { new: true }
      );
      if (!employee) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }
      res.json({ message: 'Funcionário atualizado com sucesso!', employee });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao atualizar o funcionário' });
    }
  };
  
exports.deleteEmployee = async (req, res) => {
    const employeeId = req.params.id;
    try {
      const employee = await Employee.findByIdAndRemove(employeeId);
      if (!employee) {
        return res.status(404).json({ error: 'Funcionário não encontrado' });
      }
      res.json({ message: 'Funcionário excluído com sucesso!' });
    } catch (err) {
      res.status(500).json({ error: 'Erro ao excluir o funcionário' });
    }
  };

  
