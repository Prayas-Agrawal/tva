import Fuse from "fuse.js";

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

  static filter(data, query) {
    if (query == null || query == "") return data;
    const filteredUsers = data.filter((item) =>
      (item.first_name + item.last_name)
        .toLowerCase()
        .includes(query.replace(/ /g, "").toLowerCase())
    );
    return filteredUsers;
  }

  static fuzzyFilter(data, query) {
    const options = {
      // isCaseSensitive: false,
      // includeScore: false,
      // shouldSort: true,
      // includeMatches: false,
      findAllMatches: false,
      minMatchCharLength: 3,
      // location: 0,
      threshold: 0.6,
      // distance: 100,
      // useExtendedSearch: false,
      ignoreLocation: false,
      // ignoreFieldNorm: false,
      // fieldNormWeight: 1,
      keys: ["first_name", "last_name"],
    };

    if (query == null || query == "") {
      return data;
    }

    const fuse = new Fuse(data, options);
    let _ret = fuse.search(query);
    console.log("filter ret: ", query, _ret);

    return _ret.map((val) => val.item);
  }
}
