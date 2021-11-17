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
        data: {
          id: this.userData.id,
          email: this.userData.email,
          username: this.userData.username,
          profile: {
            create: {
              bio: this.userData.bio,
            },
          },
        },
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
      prisma.user.update({
        where: { id: this.userData.id },
        data: {
          username: this.userData.username,
          gender: this.userData.gender,
          phone: this.userData.phone,
        },
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        reject(error);
      }).finally(() => {
        prisma.$disconnect();
      });
    });
  }

  updateBio() {
    return new Promise((resolve, reject) => {
      prisma.profile.update({
        where: {
          userId: this.userData.id,
        },
        data: {
          bio: this.userData.bio,
        },
      }).then((result) => {
        resolve(result);
      }).catch((error) => {
        if (error.code === 'P2025') {
          reject(createError.BadRequest(error.meta.cause));
        }
        reject(createError.InternalServerError(error.code));
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
