const router = require('express').Router();
//import models from /db
const {
  models: { Campus, Student },
} = require('../db');
//routes go here - these will be for your api routes
const { alpaca } = require('../alpaca');

router.get('/account', async (req, res, next) => {
  try {
    const account = await alpaca.getAccount();
    console.log(account);
    res.send(account);
  } catch (error) {
    next(error);
  }
});

router.get('/campuses', async (req, res, next) => {
  try {
    const campuses = await Campus.findAll();
    res.send(campuses);
  } catch (error) {
    next(error);
  }
});

router.get('/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: Student,
      },
    });
    res.send(campus);
  } catch (error) {
    next(error);
  }
});

router.post('/campuses', async (req, res, next) => {
  try {
    const campus = req.body;
    res.status(201).send(await Campus.create(campus));
  } catch (error) {
    next(error);
  }
});

router.delete('/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    await campus.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/campuses/:id', async (req, res, next) => {
  try {
    const campus = await Campus.findByPk(req.params.id);
    const newCampus = await campus.update(req.body);
    res.send(newCampus);
  } catch (error) {
    next(error);
  }
});

router.get('/students', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.send(students);
  } catch (error) {
    next(error);
  }
});

router.get('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findAll({
      where: {
        id: req.params.id,
      },
      include: {
        model: Campus,
      },
    });
    res.send(student);
  } catch (error) {
    next(error);
  }
});

router.post('/students', async (req, res, next) => {
  try {
    const student = req.body;
    const newStudent = await Student.create(student);
    newStudent.campusId = 1;
    newStudent.save();
    res.status(201).send(newStudent);
  } catch (error) {
    next(error);
  }
});

router.delete('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

router.put('/students/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    const newStudent = await student.update(req.body);
    res.send(newStudent);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
