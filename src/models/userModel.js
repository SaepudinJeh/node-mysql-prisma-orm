/* eslint-disable consistent-return */
const { ObjectId } = require('mongodb').ObjectId;
const { dbConnect } = require('../configurations');

class User {
  constructor(userData) {
    this.userData = { ...userData };
  }

  updateUser() {
    return new Promise((resolve, reject) => {
      try {
        const payload = {
          username: this.userData.username,
          gender: this.userData.gender,
        };

        dbConnect('users', async (db) => {
          const user = await db.updateOne(
            { _id: this.userData._id },
            { $set: payload },
            { upsert: true, returnNewDocument: true },
          );

          resolve(user);
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  static findUserById(_id) {
    return new Promise((resolve, reject) => {
      try {
        dbConnect('users', async (db) => {
          const user = await db.findOne({ _id: ObjectId(_id) });

          resolve(user);
        });
      } catch (error) {
        return reject(error);
      }
    });
  }

  // static findUserById(id) {
  //   return new Promise((resolve, reject) => {

  //   });
  // }

  // static deleteUser(id) {
  //   return new Promise((resolve, reject) => {
  //   });
  // }
}

module.exports = User;
