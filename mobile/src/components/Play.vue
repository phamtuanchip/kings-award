<template>
  <q-page>
     <q-card inline style="width: 500px" >
  <q-card-media>
    <img :src="award.Gift">
  </q-card-media>
  <q-card-title>
    {{award.Title}}
    <q-rating slot="subtitle" v-model="stars" :max="5" />
    <div slot="right" class="row items-center">
      <q-icon name="local play" />  {{award.TargetPoint}}
    </div>
  </q-card-title>
  <q-card-main>
    <p>{{award.TargetPoint}}</p>
    <p class="text-faded">{{award.SubTitle}}</p>
  </q-card-main>
  <q-card-separator />
  <q-card-actions>
    <q-btn flat round dense icon="event" />
    <q-btn flat :label="award.From" />
    <q-btn flat :label="award.To" />
    <q-btn flat label="20%" />
    <q-btn flat color="primary" label="Quay lại" @click.native="$router.go(-1)" />
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
        v-model="Point"
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
      <q-btn icon="create" label="New item"  color="primary"
    @click="save" />
  </q-page>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      item: {},
      group: [],
      rangeValues: {},
      stars: 0,
      date: "",
      select: "",
      text: "",
      model: [],
      mailHasError: "",
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
      newTask: "",
      newPoint: 0,
      Point: "",
      childrenName: ""
    };
  },
  watch: {
    tasksId: function(newVal) {
      console.log(newVal)
      let task = this.tasks.filter((ta)=>{
        return ta.value == newVal;
      })
       console.log(task)
      if (task.length >= 1) this.tasksName = task[0].label;
       console.log(this.tasksName)
    },
    "archives.childrenId": function(newVal) {
      let child = this.children.filter((ta)=>{
        return ta.value == newVal;
      })
      if (child.length >= 1) this.childrenName = child[0].label;
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
      let promise = new Promise((resolve, reject) => {
        let archive = {};
        this.api
          .getData("archives/?childrenId=" + childId + "&awardsId=" + awardId)
          .then(
            res => {
              archive = res.data;
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
      //console.log(this.group)
      //return ;
      let tId = undefined;
      let tPoint = undefined;
      if(this.newTask && this.newTask.trim() != "") {
        let task = {Name: this.newTask, DefaultPoint: this.Point, ManualPoint: this.newPoint }
          this.api.postData("tasks", task).then(
              res => {
                console.log(res)
                tId =res.data.id;
                tPoint = res.data.Point;
                this.getTasks()
                this.$q.notify({
                        color: 'secondary',
                        icon: 'star',
                        message: 'Đã thêm mới công việc thành công!'
                      })
              },
              err => {
                console.log(err);
              }
            );
         
        return;
      }
      let archives = {};
      this.searchArchives(
        this.archives.childrenId,
        this.archives.awardsId
      ).then(
        archive => {
          console.log(archive);
          if (archive.constructor == Array && archive.length > 0) {
            archives = archive[0];
          } else if (archive.constructor == Array && archive.length == 0) {
            archives = this.archives;
            archives.TaskDone = [];
            archives.ArchivePoints = this.Point;
            archives.TaskDone.push({
              tasksId: tId == undefined ? tId : this.tasksId,
              Point: tPoint == undefined ? tPoint : this.Point
            });
            this.api.postData("archives", archives).then(
              res => {
                this.updateActivities(archives);
                this.$q.notify({
                        color: 'secondary',
                        icon: 'star',
                        message: 'Đã thêm mới thành công!'
                      })
              },
              err => {
                console.log(err);
              }
            );
          } else {
            archives = archive;
          }
          console.log(archives)

         
          archives.TaskDone.push({ tasksId: tId == undefined ? tId : this.tasksId, Point: tPoint == undefined ? tPoint : this.Point });
          let pCount = 0;
          archives.ArchivePoints += this.Point;
          this.api.putData("archives/" + archives.id, archives).then(
            res => {
              this.updateActivities(archives);
              this.$q.notify({
                        color: 'secondary',
                        icon: 'star',
                        message: 'Đã cập nhật thành công!'
                      })
            },
            err => {
              console.log(err);
            }
          );
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
          this.children = res.data.map(child => {
            return { label: child.Name, value: child.id };
          });
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
          this.tasks = res.data.map(task => {
            return { label: task.Name, value: task.id };
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
      console.log(this.$route.params.id);
      this.archives.awardsId = this.$route.params.id;
      this.api.getData("awards/" + this.$route.params.id).then(
        res => {
          this.award = res.data;
          console.log(this.award);
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
