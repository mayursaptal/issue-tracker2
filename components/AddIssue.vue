<template>
  <div class="blueheader p-4">
    <div class="container">
      <div class="row flex">
        <div class="col-md-6 col-xs-6 col-sm-6 width100 text-left title">
          All Issue
        </div>
        <div class="col-md-6 col-xs-6 col-sm-6 width100 text-right">
          <b-button class="btn-add" v-b-modal.modal-1>Add New Issue</b-button>

          <b-modal v-model="show" size="lg" id="modal-1" title="Add New Issue">
            <div>
              <b-form method="post"  id="issueform" class="flex" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="Summary:"
                  label-for="input-1"
                  class="col-md-12 p-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.summary"
                    type="text"
                    placeholder="Issue Summary"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="Severity"
                  label-for="input-2"
                  class="col-md-6 p-1"
                >
                  <b-form-select
                    id="input-2"
                    v-model="form.severity"
                    :options="severity"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group
                  id="input-group-1"
                  label="Due Date"
                  label-for="input-date"
                  class="col-md-6 p-1"
                >
                  <b-form-input
                    id="input-date"
                    v-model="form.date"
                    type="date"
                    placeholder="Due Date"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-3"
                  label="Assigned To"
                  label-for="input-3"
                  class="col-md-6 p-1"
                >
                  <b-form-select
                    id="input-3"
                    v-model="form.users"
                    :options="users"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group
                  id="input-group-4"
                  label="Status"
                  label-for="input-4"
                  class="col-md-6 p-1"
                >
                  <b-form-select
                    id="input-4"
                    v-model="form.status"
                    :options="status"
                    required
                  ></b-form-select>
                </b-form-group>

                <b-form-group
                  id="input-group-5"
                  label="Description"
                  label-for="input-5"
                  class="col-md-12 p-1"
                >
                  <b-form-textarea
                    id="textarea"
                    v-model="form.description"
                    placeholder="Describe the issue…"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </b-form-group>

               <span class="error"> {{erromsg}} </span>
              </b-form>
            </div>
            <template #modal-footer>
              <div class="w-100">
                <p class="float-left">
                  <b-button
                    variant="primary"
                    size="sm"
                    class="float-right p-2 bnt-white"
                    @click="show = false"
                  >
                    Close
                  </b-button>
                </p>
                <b-button
                  variant="primary"
                  size="sm"
                  class="float-right btn-close p-2"
                  @click="submit"
                >
                  Save issue
                </b-button>
              </div>
            </template>
          </b-modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      show: false,
      erromsg : '',
      form: {
        severity: null,
        summary: "",
        date: "",
        users: null,
        status: null,
        description: "",
      },
      users: [{ text: "Select User", value: null }, "User 1", "User 2"],
      severity: [
        { text: "Select Severity", value: null },
        "High",
        "Medium",
        "Low",
      ],
      status: [
        { text: "Select Status", value: null },
        "ToDo",
        "InProgress",
        "Close",
        "Done",
      ],
    };
  },

  methods: {
    ...mapActions(["setCurrentIsssue"]),

    submit() {
      if (
        this.form.severity == "" ||
        this.form.summary == "" ||
        this.form.date == "" ||
        this.form.users == "" ||
        this.form.status == "" ||
        this.form.description == ""
      ) {

        this.erromsg = "All fields are required ";
        return false;
      }

       this.erromsg = "";

      var id = Math.random().toString(36).substring(7);
      var data = {
        id: id,
        severity: this.form.severity,
        summary: this.form.summary,
        date: this.form.date,
        users: this.form.users,
        status: this.form.status,
        description: this.form.description,
      };
      this.setCurrentIsssue(data);
      this.show = false;
      this.form.severity = null;
      this.form.summary = "";
      this.form.date = null;
      this.form.users = null;
      this.form.status = null;
      this.form.description = "";
    },
  },
};
</script>
