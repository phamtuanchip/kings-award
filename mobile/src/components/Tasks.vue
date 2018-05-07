<template>
<q-page>
  <q-layout>   
   <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" @click.native="add" icon="add" />
  </q-page-sticky>
 <q-table
      :data="items"
      :columns="columns"
      row-key="id"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
         <q-td key="id" :props="props">
            <div class="row items-center justify-between no-wrap">
            <q-btn size="sm" round dense color="secondary" icon="remove" @click="remove(props.row)" class="q-mr-xs" />
             <div>{{ props.row.id }}</div>
            <q-btn size="sm" round dense color="tertiary" icon="add" @click="edit(props.row)" class="q-mr-sm" />
           
          </div>
           
        </q-td>  
        <q-td key="Name" :props="props" >
          <span @click="rowClick(props.row)" >
           {{ props.row.Name }}
           
          </span>
          
        </q-td>
         <q-td key="DefaultPoint" :props="props">
            <div class="row items-center justify-between no-wrap">
             {{ props.row.DefaultPoint }} 
           
          </div>
           
        </q-td>         
        <q-td key="ManualPoint" :props="props">
           <div class="row items-center justify-between no-wrap">
              {{ props.row.ManualPoint }} 
           
          </div>
         
        </q-td>
        
      
      </q-tr>
    </q-table>
     
    </q-layout>
    <q-dialog
    v-model="customDialogModel"
    
   
    @show="onShow"
    @hide="onHide"
  >
    <!-- This or use "title" prop on <q-dialog> -->
    <span slot="title">Nhập công việc</span>

    <!-- This or use "message" prop on <q-dialog> 
    <span slot="message">What is your superhero of choice?</span>
    -->

    <div slot="body">
      <Task :oldTask="selected" :ok="onOk" :cancel="onCancel"/>
    </div>
 
  </q-dialog>   
</q-page>
</template>
<script>
import Task from "components/Task";
const newTask = {
  Name: "",
  DefaultPoint: "",
  ManualPoint: 0
};
export default {
  components: { Task },
  data() {
    return {
      customDialogModel: false,
      selected: newTask,
      name: "",
      items: [],
      columns: [
        {
          name: "id",
          label: "Mã",
          field: "id"
        },
        {
          name: "Name",
          label: "Tên",
          field: "Name",
          sortable: true
        },
        {
          name: "DefaultPoint",
          label: "Điểm chuẩn",
          field: "DefaultPoint",
          sortable: true
        },
        {
          name: "ManualPoint",
          label: "Điểm thêm",
          field: "ManualPoint",
          sortable: true
        }
      ]
    };
  },
  methods: {
    onOk(isClose) {
      this.getTasks();
      this.customDialogModel = !isClose;
      this.selected = newTask;
      this.$forceUpdate();
    },

    // when props.cancel() gets called
    onCancel(isShow) {
      //console.log('cancel ' + isShow)
      this.customDialogModel = !isShow;
      this.selected = newTask;
      this.$forceUpdate();
    },

    // when we show it to the user
    onShow() {},

    // when it gets hidden
    onHide() {},

    // custom handler
    async choose(okFn, hero) {
       
    },
    edit(task) {
      this.selected = task;
      this.$forceUpdate();
      this.customDialogModel = true;
    },
    add() {
      this.selected = newTask;
      this.$forceUpdate();
      this.customDialogModel = true;
    },
    getTasks() {
      this.api.getData("tasks").then(
        res => {
          this.items = res.data;
        },
        err => {
          console.log(err);
        }
      );
    },
    remove(task) {
      this.$q
        .dialog({
          title: "Cảnh báo",
          message: "Bạn muốn xóa '"+task.Name+"' này?.",
          ok: "Xóa",
          cancel: "Không"
        })
        .then(() => {
          console.log('test xóa')
          this.api.deleteData("tasks/" + task.id.toString()).then(
            res => {
              //this.items = res.data;
              this.getTasks();
              this.$q.notify("Xóa thành công!");
              
            },
            err => {
              console.log(err);
            }
          );
        })
        .catch(() => {
          //this.$q.notify('Disagreed...')
        });
    },
    rowClick(row) {
      this.selected = row;
      this.customDialogModel = true;
      return;
      let configObj = {
        title: "Sửa",
        message: "Sửa lại tên công việc",
        prompt: {
          model: row.Name,
          type: "text" // optional
        },
        cancel: true,
        color: "secondary"
      };
      this.$q
        .dialog(configObj)
        .then(data => {
          row.Name = data;
          this.api.putData("tasks/" + row.id.toString(), row).then(
            res => {
              this.$q.notify({
                color: "secondary",
                icon: "star",
                message: "Đã chỉnh sửa thành công!"
              });
              this.getTasks();
            },
            err => {
              console.log(err);
            }
          );
          // Picked "OK"
        })
        .catch(() => {
          // Picked "Cancel" or dismissed
        });
    }
  },
  mounted() {
    this.getTasks();
  }
};
</script>

