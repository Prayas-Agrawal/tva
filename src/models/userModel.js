export class UserDetail {
  constructor(json) {
    this.id = json["id"];
    this.first_name = json["first_name"];
    this.last_name = json["last_name"];
    this.age = json["age"];
    this.email = json["email"];
    this.web = json["web"];
    this.company_name = json["company_name"];
    this.city = json["city"];
    this.state = json["state"];
    this.zip = json["zip"];
  }
}

export class UserDataRow {
  constructor(json) {
    this.first_name = json["first_name"];
    this.last_name = json["last_name"];
    this.age = json["age"];
    this.email = json["email"];
    this.web = json["web"];
  }
}
