export class Utils {
  static sort(data, onKey, order) {
    if (order !== "asc" && order !== "desc") {
      order = "asc";
    }

    let _sorted = [];
    if (order === "asc") {
      _sorted = data.sort((a, b) =>
        a[onKey].toString().toLowerCase().localeCompare(b[onKey])
      );
    } else {
      _sorted = data.sort((a, b) =>
        b[onKey].toString().toLowerCase().localeCompare(a[onKey])
      );
    }
    return _sorted.slice();
  }
}
