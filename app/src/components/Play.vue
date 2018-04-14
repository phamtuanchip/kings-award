<template>
  <f7-page>
    <f7-navbar title="About" back-link="Back" sliding></f7-navbar>
      <div>
  <b-card :title="item.Title"
          :img-src="item.Gift"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2">
    <p class="card-text">
     {{item.SubTitle}}
    </p>
    <f7-button big fill color="green">Mở quả</f7-button>
  </b-card>
</div>
    <f7-list form>
      <f7-list-item>
        <f7-label>Ngày</f7-label>
        <f7-input type="date" placeholder="Birth date" v-model="archives.DateTime"></f7-input>
      </f7-list-item>
    <f7-list-item>
        <f7-label>Con của bạn</f7-label>
        <f7-input type="select" v-model="archives.childrenId" >
          <option :value="item.id" v-for="item in children" :key="item.id">{{item.Name}}</option>
         
        </f7-input>
      </f7-list-item>
    <f7-list-item>
        <f7-label>Việc tốt</f7-label>
        <f7-input type="select" @change="setPoint" v-model="tasksId" >
          <option :value="item.id" v-for="item in tasks" :key="item.id">{{item.Name}}</option>
        </f7-input>
      </f7-list-item>
      <f7-list-item>
        <f7-label>Điểm</f7-label>
        <f7-input type="number" v-model="Point" ></f7-input>
      </f7-list-item>
         <f7-grid>
          <f7-col><f7-button big fill color="green" @click="save">Lưu</f7-button></f7-col>
          <f7-col><f7-button big fill  >Bỏ qua</f7-button></f7-col>
        </f7-grid>
    </f7-list>
  </f7-page>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      item: {},
      children: [],
      tasks: [],
      archives: {
        DateTime: Vue.moment().format("MM/DD/YYYY"),
        childrenId: "",
        awardsId: "",
        ArchivePoints: "",
        TaskDone: []
      },
      tasksId: "",
      tasksName: "",
      Point: "",
      childrenName: ""
      
    };
  },
  watch: {
    tasksId: function(newVal){
      this.tasksName = this.tasks[newVal].Name
    },
    'archives.childrenId': function(newVal){
      this.childrenName = this.children[newVal].Name
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getItemById();
    this.getChildren();
    this.getTasks();
  },
  methods: {
    updateActivities(archives) {
      let activities = {
        DateTime: Vue.moment().format("YYYY-MM-DD hh:mm"),
        Title: 'Đã hoàn thành '+ this.tasksName,
        SubTitle: 'Đã đạt được '+ archives.ArchivePoints + ' điểm',
        ItemText: 'Chúc mừng ' + this.childrenName,
        ItemInerText: 'Con đang được xếp hạng: '
      }
       this.api.postData("activities", activities).then(
          res => {},
          err => {
            console.log(err);
          }
        );
    },
    save() {
      let archives = this.archives;

      console.log(archives);
      if (!archives.id) {
        archives.TaskDone = [];
        archives.ArchivePoints = this.Point;
        archives.TaskDone.push({ tasksId: this.tasksId, Point: this.Point });
        this.api.postData("archives", archives).then(
          res => {
            this.updateActivities(archives)
          },
          err => {
            console.log(err);
          }
        );
      } else {
        archives.TaskDone.push({ tasksId: this.tasksId, Point: this.Point });
        let pCount = 0;
        archives.ArchivePoints += this.Point;
        this.api.putData("archives/" + archives.id.toString(), archives).then(
          res => {
            this.updateActivities(archives)
          },
          err => {
            console.log(err);
          }
        );
      }
      
    },
    setPoint() {},
    getChildren() {
      this.api.getData("children").then(
        res => {
          this.children = res.data;
          // this.customer.avatar = '/assets/' + this.customer.avatar
        },
        err => {
          console.log(err);
        }
      );
    },
    getTasks() {
      this.api.getData("tasks").then(
        res => {
          this.tasks = res.data;
          // this.customer.avatar = '/assets/' + this.customer.avatar
        },
        err => {
          console.log(err);
        }
      );
    },
    getItemById() {
      this.archives.awardsId = this.$route.params.Id;
      this.api.getData("awards/" + this.archives.awardsId).then(
        res => {
          this.item = res.data;
          // this.customer.avatar = '/assets/' + this.customer.avatar
        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
