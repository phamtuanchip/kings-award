<template>
  <q-page>
     <q-card inline style="width: 500px">
  <q-card-media>
    <img src="~assets/donuts.png">
  </q-card-media>
  <q-card-title>
    {{award.Title}}
    <q-rating slot="subtitle" v-model="stars" :max="5" />
    <div slot="right" class="row items-center">
      <q-icon name="place" />  {{award.SubTitle}}
    </div>
  </q-card-title>
  <q-card-main>
    <p>{{award.TargetPoint}}</p>
    <p class="text-faded">Small plates, salads & sandwiches in an intimate setting.</p>
  </q-card-main>
  <q-card-separator />
  <q-card-actions>
    <q-btn flat round dense icon="event" />
    <q-btn flat label="award.From" />
    <q-btn flat label="award.To" />
    <q-btn flat label="20%" />
    <q-btn flat color="primary" label="Quay lại" />
  </q-card-actions>
</q-card>
<q-field
        icon="access_time"
        label="Ngày"
         
      >
        <q-datetime
          type="date"
          v-model="archives.DateTime"
          color="secondary"
          float-label="Ngày"
        />
      </q-field>
      <q-field
        icon="face"
        label="Chọn con của bạn"
       
      >
        <q-select
           
            float-label="Tên con là:"
            v-model="archives.childrenId"
            :options="children"
          />
          
         
      </q-field>
      <q-field
        icon="local florist"
        label="Việc bé đã làm"
       
      >
        <q-select
          float-label="Con đã thực hiện:"
          filter
          v-model="tasksId"
          :options="tasks"
        />
      </q-field>
     <q-field
        icon="add circle outline"
        label="Thêm mới"
        
        
      >
        <q-input  v-model="newTask" float-label="Nhập công việc mới" />
      </q-field>
     
      <q-field 
       icon="thumb up"
        label="Kết quả"
        
      >

         <q-option-group
    color="secondary"
    type="radio"
    inline
    v-model="group"
    :options="[
    {label: 'Rất tốt', value: 2},
    {label: 'Hoàn thành', value: 1},
    {label: 'Không tốt', value: -1},
    ]"
  />
      </q-field>
      

       <q-field
        icon="exposure"
        label="Điểm số tự cho"
       
        
      >
        <q-input type="number"  v-model="newPoint" float-label="Cho điểm" />
      </q-field>
  </q-page>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      item: {},
      group:[],
      rangeValues: {},
      stars:0,
      date: '',
      select: '',
      text: '',
      model:'',
      mailHasError:'',
      award: {},
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
      newTask,
      newPoint,
      Point: "",
      childrenName: ""
    };
  },
  watch: {
    tasksId: function(newVal) {
      let task = this.tasks[parseInt(newVal) - 1];
      if (task) this.tasksName = task.Name;
    },
    "archives.childrenId": function(newVal) {
      let child = this.children[parseInt(newVal) - 1];
      if (child) this.childrenName = child.Name;
    }
  },
  mounted() {
    console.log(this.$route.params.id);
    this.getItemById();
    this.getChildren();
    this.getTasks();
  },
  methods: {
    searchArchives(childId, awardId) {
      let promise = new Promise((resolve, reject)=> {
        let archive = {};
        this.api
          .getData("archives?childrenId=" + childId + "&awardsId=" + awardId)
          .then(
            res => {
              archive = res.data
              console.log(archive);
               resolve(archive);
              // this.customer.avatar = '/assets/' + this.customer.avatar
            },
            err => {
              console.log(err);
               reject(archive);
            }
          );
      });
      return promise;
      /*
      let archive = {};
      this.api
        .getData("archives?childrenId=" + childId + "&awardsId=" + awardId)
        .then(
          res => {
            archive = res.data;
            console.log(archive);
            return promise.resolve(archive);
            // this.customer.avatar = '/assets/' + this.customer.avatar
          },
          err => {
            console.log(err);
            return promise.resolve(archive);
          }
        );
        */
    },
    updateImage() {},
    updateActivities(archives) {
      let activities = {
        DateTime: Vue.moment().format("YYYY-MM-DD hh:mm"),
        Title: "Chúc mừng " + this.childrenName,
        SubTitle: "Đã đạt được " + archives.ArchivePoints + " điểm",
        ItemText: "Đã hoàn thành " + this.tasksName,
        ItemInerText: "Con đang được xếp hạng: "
      };
      this.api.postData("activities", activities).then(
        res => {},
        err => {
          console.log(err);
        }
      );
    },
    save() {
      let archives ={}
      this.searchArchives(archives.childrenId, archives.awardsId).then(
        archive => {
          console.log(archive);
          if(archive.constructor == Array) {
            archives = archive[0]
          }else {
            archives = archive;
          }

          if (!archive) {
            archives = this.archives;
            archives.TaskDone = [];
            archives.ArchivePoints = this.Point;
            archives.TaskDone.push({ tasksId: this.tasksId, Point: this.Point });
            this.api.postData("archives", archives).then(
              res => {
                this.updateActivities(archives);
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
                this.updateActivities(archives);
              },
              err => {
                console.log(err);
              }
            );
          }
        },
        err => {
          console.log(err);
        }
      );

      
    },
    setPoint() {},
    getChildren() {
      this.api.getData("children").then(
        res => {
          this.children = res.data.map(child =>{
            return {'label': child.Name, 'value': child.id}
          })
          console.log(this.children);
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
          this.tasks = res.data.map(task =>{
            return {'label': task.Name, 'value': task.id}
          });
          console.log(this.tasks);
          // this.customer.avatar = '/assets/' + this.customer.avatar
        },
        err => {
          console.log(err);
        }
      );
    },
    getItemById() {
      //this.archives.awardsId = this.$route.params.Id;
      this.api.getData("awards/" + this.$route.params.Id).then(
        res => {
          this.award = res.data;
          console.log(this.award)
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
