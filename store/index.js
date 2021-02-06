export const state = {
  currentIsssue: [],
  allIsssues: [],
  filter: {
    user: null,
    status: null,
    date: null
  }
};
export const mutations = {
  //syncrous
  setCurrentIsssue(state, payload) {
    state.currentIsssue = payload;
    if (state.allIsssues) {

    } else {
      state.allIsssues = [];
    }
    state.allIsssues.push(payload);
    localStorage.setItem('allIsssues', JSON.stringify(state.allIsssues));
  }

  ,
  filter_user(state, payload) {
    state.filter.user = payload;
  },
  filter_status(state, payload) {
    state.filter.status = payload;
  },
  filter_date(state, payload) {
    state.filter.date = payload;
  },
  deleteIssue(state, id) {
    try {
      state.allIsssues = JSON.parse(localStorage.getItem('allIsssues'));
    } catch (error) {
      state.allIsssues = [];
    }
    // if (state.allIsssues[id] == null) {
    //   return;
    // }
    // state.allIsssues[id] = null;
    state.allIsssues.filter(
      function (item, idx) {
        if (!item) {
          return item;
        }
        if (item.id == id) {
          state.allIsssues[idx] = null;
        }
        return item.id == id;
      }
    );


    localStorage.setItem('allIsssues', JSON.stringify(state.allIsssues));

  },
  closeIsuuse(state, id) {
    try {
      state.allIsssues = JSON.parse(localStorage.getItem('allIsssues'));
    } catch (error) {
      state.allIsssues = [];
    }

    // if (state.allIsssues[id] == null) {
    //   return;
    // }

    state.allIsssues.filter(
      function (item, idx) {
        if (!item) {
          return item;
        }
        if (item.id == id) {
          state.allIsssues[idx].status = 'Close';
        }
        return item.id == id;
      }
    );


    localStorage.setItem('allIsssues', JSON.stringify(state.allIsssues));
  }

  ,
  filter_all_data(state) {
    try {
      var localdata = JSON.parse(localStorage.getItem('allIsssues'));
    } catch (error) {
      localdata = [];
    }

    if (!localdata) {
      state.allIsssues = [];
      return [];
    }

    state.allIsssues = localdata;

    if (state.filter.user && state.allIsssues) {
      state.allIsssues = state.allIsssues.filter(function (item) {
        if (!item) {
          return item;
        }
        return state.filter.user == item.users;
      });
    }


    if (state.filter.status && state.allIsssues) {
      state.allIsssues = state.allIsssues.filter(function (item) {
        if (!item) {
          return item;
        }
        return state.filter.status == item.status;

      });
    }

    if (state.filter.date && state.allIsssues) {
      state.allIsssues = state.allIsssues.filter(function (item) {
        if (!item) {
          return item;
        }
        return state.filter.date == item.date;
      });
    }
    if (state.allIsssues) {
      state.allIsssues = state.allIsssues.filter(function (el) {
        return el;
      });
    }

    return state.allIsssues;
  }
};
export const actions = {
  //asyncronous
  async setCurrentIsssue(state, issue) {
    state.commit("setCurrentIsssue", issue);
  },
  filter_user(state, value) {
    state.commit("filter_user", value);
  },
  filter_status(state, value) {
    state.commit("filter_status", value);
  },
  filter_date(state, value) {
    state.commit("filter_date", value);
  },
  deleteIssue(state, id) {
    state.commit("deleteIssue", id);

  },
  closeIsuuse(state, id) {
    state.commit("closeIsuuse", id);
  }

};
export const modules = {};
export const getters = {
  getAllIsssues: state => {
    mutations.filter_all_data(state);

    return state.allIsssues;
  }
};
