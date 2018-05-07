<template>
  <q-page>
  <q-field
        icon="filter vintage"
        
        label="Tên việc"
        :label-width="3"
      >
        <q-input v-model="task.Name" />
      </q-field>
      <q-field
        icon="iso"
        
        label="Thưởng/Phạt"
        :label-width="3"
      >
      <q-option-group
        color="secondary"
        type="radio"
        inline
        v-model="task.DefaultPoint"
        :options="[
        {label: 'Rất tốt', value: 2},
        {label: 'Hoàn thành', value: 1},
        {label: 'Không tốt', value: -1},
        ]"
      />
      </q-field>
      <q-field
        icon="thumb up"
        
        label="Tự chọn"
        :label-width="3"
      >
        <q-input v-model="task.ManualPoint" />
      </q-field>
       <q-btn icon="save" label="Lưu"  color="primary" @click="onSave()" />
       <q-btn flat label="Bỏ qua"   @click="onCancel()" />
  </q-page>
</template>

<script>
export default {
  props: ["oldTask", "ok", "cancel"],
  data() {
    return {
      task: {
        Name: "",
        DefaultPoint: "",
        ManualPoint: 0
      }
    };
  },
  watch:{
    'oldTask.Name': function(newVal){
      this.task = this.oldTask
    },
    'task.Name' : function(newVal){
      this.task.Name = newVal.toUpperCase()
    }
  },
  mounted() {
    
    
  },
  methods: {
     searchTaskByName(name) {
      //?title=json-server&author=typicode

      let promise = new Promise((resolve, reject) => {
        let task = undefined;
        this.api.getData("tasks?Name=" + name.toUpperCase()).then(
          res => {
            task = res.data;
            
            resolve(task);
            
          },
          err => {
            console.log(err);
            reject(task);
          }
        );
      });
      return promise;
    },
    onCancel(){
      this.cancel(true)
    },
    onSave(){
      
      if (this.task.Name && this.task.Name.trim() != "" && this.task.DefaultPoint != "") {
        this.searchTaskByName(this.task.Name).then(
          task => {
            //console.log(task)
            if(task.length > 0) {
              this.$q.notify({
                  color: 'secondary',
                  icon: 'delete',
                  message: 'Công việc này đã có'
                })
              return;
            } else if(this.task.id) {
              this.api.putData('tasks/' + this.task.id.toString(), this.task).then((res) => {           
                this.$q.notify({
                  color: 'secondary',
                  icon: 'delete',
                  message: 'Cập nhật công việc thành công'
                })
                 this.ok(true);
              }, (err) => {
                console.log(err)
              })
              
            } else {
            //this.task.Name = this.task.Name.toUpperCase();
            this.api.postData("tasks", this.task).then(
              res => {
                this.$q.notify({
                  color: 'secondary',
                  icon: 'delete',
                  message: 'Tạo công việc thành công'
                })
                this.ok(true);
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

        /// return;
      } else {
         this.$q.notify({
                  color: 'secondary',
                  icon: 'delete',
                  message: 'Cần có tên công việc hoặc chọn điểm'
                })
              return;
      }
      //this.ok(this.task)
    }
  }
};
</script>