import axios from "axios";

export class Api {
  static getUsers() {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://datapeace-storage.s3-us-west-2.amazonaws.com/dummy_data/users.json"
        )
        .then((response) => {
          if (response.status === 200 && response.data) {
            resolve(response.data);
          } else {
            resolve([]);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static async getUserByID(userID) {
    try {
      let _users = await Api.getUsers();
      for (let i = 0; i < _users.length; i++) {
        if (_users[i].id == userID) {
          return _users[i];
        }
      }
      throw "no user by id " + userID + " found";
    } catch (e) {
      return null;
    }
  }
}
