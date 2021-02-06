<template>
  <div>
    <div class="container container-white p-4">
      <div class="row np flex filters">
        <div class="col-md-3 col-sm-12 col-xs-12">
          <b-form-group
            id="input-group-13"
            label="Assigned To"
            label-for="input-13"
          >
            <b-form-select
              id="input-13"
              @change="filter"
              v-model="filters.user"
              :options="user"
            ></b-form-select>
          </b-form-group>
        </div>

        <div class="col-md-3 col-sm-12 col-xs-12">
          <b-form-group id="input-group-14" label="Status" label-for="input-14">
            <b-form-select
              id="input-14"
              @change="filter"
              v-model="filters.status"
              :options="status"
            ></b-form-select>
          </b-form-group>
        </div>
        <div class="col-md-3 col-sm-12 col-xs-12">
          <b-form-group
            id="input-group-10"
            label="Due Date"
            label-for="input-date-10"
          >
            <b-form-input
              @change="filter"
              id="input-date-10"
              v-model="filters.date"
              type="date"
              placeholder="Due Date"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
    </div>

    <div class="container minheight issuelist container-white p-4">
      <div v-for="(Isssue, idx) in Isssues" :key="idx" class="card p-4 mb-2">
        <div class="row  madeblock">
          <div class="col-md-10 p-1 issueid">Issue ID : {{ Isssue.id }}</div>
          <div class="col-md-1 col-sm-12 p-1">
            <button
              @click="closeissue(Isssue.id)"
              class="btn btn btn-primary btn-close"
            >
              Close
            </button>
          </div>
          <div class="col-md-1 col-sm-12  p-1">
            <button
              @click="deleteissue(Isssue.id)"
              class="btn btn btn-primary btn-delete"
            >
              Delete
            </button>
          </div>
        </div>

        <div class="row flex">
          <div class="col-md-12 p-1 statusbox">
            <span :class="Isssue.status" > {{ Isssue.status }} </span>
          </div>
        </div>
        <div class="row flex">
          <div class="col-md-12 p-1">
            <h3>{{ Isssue.summary }}</h3>
            <p  class="decriptiontext">{{ Isssue.description }}</p>
          </div>
        </div>
        <div class="row flex">
          <div class="col-md-12 p-1 metadata">
            <img src="~/assets/bxs-flag.svg" /> {{ Isssue.severity }}
            <img src="~/assets/bxs-time-five.svg" /> {{ Isssue.date }}
            <img src="~/assets/bxs-user-circle.svg" /> {{ Isssue.users }}
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>




<style scoped>
.btn-delete {
  background: #e24e3b;
  border: #e24e3b;
}

.btn-close {
  background: #e6ba56;
  border: #e6ba56;
}
.container-white {
  padding-left: 5% !important;
  padding-right: 5% !important;
  padding-bottom: 0px !important;
}
.minheight {
  min-height: 50vh;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  head: {
    link: [
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,500;1,100;1,300;1,400;1,500&display=swap",
      },
    ],
  },
  data() {
    return {
      user: [{ text: "Select User", value: null }, "User 1", "User 2"],
      status: [
        { text: "Select Status", value: null },
        "ToDo",
        "InProgress",
        "Close",
        "Done",
      ],
      date: null,

      filters: {
        user: null,
        status: null,
        date: null,
      },
    };
  },

  computed: {
    ...mapGetters({ Isssues: "getAllIsssues" }),
  },
  methods: {
    ...mapActions([
      "filter_user",
      "filter_status",
      "filter_date",
      "deleteIssue",
      "closeIsuuse",
    ]),
    deleteissue(index) {
      this.deleteIssue(index);
    },
    closeissue(index) {
      this.closeIsuuse(index);
    },
    filter() {
      this.filter_user(this.filters.user);
      this.filter_status(this.filters.status);
      this.filter_date(this.filters.date);
    },
  },
};
</script>
