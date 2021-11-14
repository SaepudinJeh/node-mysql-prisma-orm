/* eslint-disable consistent-return */
const createError = require('http-errors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  errorFormat: 'pretty',
});

class User {
  constructor(userData) {
    this.userData = { ...userData };
  }

  async save() {
    return new Promise((resolve, reject) => {
      prisma.user.create({
        data: this.userData,
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        if (error.code === 'P2002') {
          reject(createError.BadRequest('value must be unique'));
        }
        reject(createError.InternalServerError(error.code));
      }).finally(async () => {
        await prisma.$disconnect();
      });
    });
  }

  updateUser() {
    return new Promise((resolve, reject) => {
      prisma.user.updateMany({
        where: { id: this.userData.id },
        data: {
          name: this.userData.name,
          gender: this.userData.gender,
          phone: this.userData.phone,
        },
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        console.log(error);
        reject(error);
      }).finally(() => {
        prisma.$disconnect();
      });
    });
  }

  static findUsers() {
    return new Promise((resolve, reject) => {
      try {
        prisma.user.findMany({
          include: {
            profile: true,
          },
        }).then((result) => {
          resolve(result);
        }).catch((error) => {
          reject(error);
        }).finally(() => {
          prisma.$disconnect();
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  static findUserById(id) {
    return new Promise((resolve, reject) => {
      try {
        prisma.user.findUnique({
          where: {
            id,
          },
          include: {
            profile: true,
          },
        }).then((result) => {
          resolve(result);
        }).catch((error) => reject(error));
      } catch (error) {
        return reject(error);
      }
    });
  }

  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      try {
        const deleteUser = prisma.user.deleteMany({
          where: {
            id,
          },
        });
        resolve(deleteUser);
      } catch (error) {
        return reject(error);
      }
    });
  }
}

// const data = {
//   name: 'Alice2',
//   email: 'alice@prisma.io0',
//   posts: {
//     create: { title: 'Wkwkwkw' },
//   },
//   profile: {
//     create: { bio: 'Ahahaahah' },
//   },
// };

// const userTest = new User(data);

// userTest.save().then((result) => {
//   console.log(result);
// }).catch((err) => {
//   console.log(err);
// });

// User.findUser(1).then((result) => {
//   console.log(result);
// }).catch((err) => console.log(err));

// User.deleteUser(1).then((result) => {
//   console.log(result);
// }).catch((err) => console.log(err));
module.exports = User;
