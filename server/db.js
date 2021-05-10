const faker = require('faker');
const { Connection } = require('pg');
const Sequelize = require('sequelize'); //for things like Sequelize.STRING

//initialize your db, don't forget to include the possible heroku database URL
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/campuses_db',
  {
    logging: false,
  }
);

const { DataTypes } = Sequelize;
//define your model
const Campus = db.define('campus', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: '/public/images/campus-placeholder.jpg',
  },
  streetAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.streetAddress,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.city,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.stateAbbr,
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.address.zipCode,
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: faker.lorem.paragraph,
  },
});

const Student = db.define('student', {
  firstName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.name.firstName,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    defaultValue: faker.name.lastName,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
    defaultValue: faker.internet.email,
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: 'public/images/placeholder.jpg',
  },
  gpa: {
    type: DataTypes.FLOAT,
    defaultValue: 3.6,
    validate: {
      max: 4,
      min: 0,
    },
  },
});
//define any class or instance methods

//state your model associations (hasOne etc)
Student.belongsTo(Campus);
Campus.hasMany(Student);

//create syncAndSeed
const syncAndSeed = async () => {
  await db.sync({ force: true });

  const weigand = await Campus.create({
    name: 'Weigand University',
    imageUrl: 'public/images/duke.jpg',
  });
  const braun = await Campus.create({
    name: 'Braun University',
    imageUrl: 'public/images/unc.jpg',
  });
  const bergstrom = await Campus.create({
    name: 'Bergstrom University',
    imageUrl: 'public/images/ncstate.png',
  });

  const jack = await Student.create({
    firstName: 'Jack',
    lastName: 'Smith',
    email: 'jsmith@gmail.com',
    gpa: 3.6,
    imageUrl: 'public/images/jack.jpeg',
  });
  const jane = await Student.create({
    firstName: 'Jane',
    lastName: 'Adams',
    email: 'jadams@gmail.com',
    gpa: 3.8,
    imageUrl: 'public/images/jane.jpeg',
  });
  const jen = await Student.create({
    firstName: 'Jen',
    lastName: 'Withers',
    email: 'jwithers@gmail.com',
    gpa: 3.5,
    imageUrl: 'public/images/jen.jpeg',
  });

  jack.campusId = 1;
  jack.save();
  jane.campusId = 2;
  jane.save();
  jen.campusId = 3;
  jen.save();

  return {
    students: { jack, jane, jen },
    campuses: { weigand, braun, bergstrom },
  };
};

//export your model
module.exports = { db, syncAndSeed, models: { Campus, Student } };
