<template>
<q-page>   
   <q-page-sticky position="top-left" :offset="[18, 18]">
    <q-btn round color="primary" @click="add" icon="add" />
  </q-page-sticky>
 <q-table
      :data="items"
      :columns="columns"
      row-key="id"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="Name" :props="props" >
          <span @click="rowClick(props.row)" >
           {{ props.row.Name }}
           
          </span>
          
        </q-td>
         <q-td key="DefaultPoint" :props="props">
            <div class="row items-center justify-between no-wrap">
            <q-btn size="sm" round dense color="secondary" icon="remove" @click="props.row.DefaultPoint--" class="q-mr-xs" />
             <div>{{ props.row.DefaultPoint }}</div>
            <q-btn size="sm" round dense color="tertiary" icon="add" @click="props.row.DefaultPoint++" class="q-mr-sm" />
           
          </div>
           
        </q-td>         
        <q-td key="ManualPoint" :props="props">
           <div class="row items-center justify-between no-wrap">
            <q-btn size="sm" round dense color="secondary" icon="remove" @click="props.row.ManualPoint--" class="q-mr-xs" />
             <div> {{ props.row.ManualPoint }}</div>
            <q-btn size="sm" round dense color="tertiary" icon="add" @click="props.row.ManualPoint++" class="q-mr-sm" />
           
          </div>
         
        </q-td>
        
      
      </q-tr>
    </q-table>
    <Task />
</q-page>
</template>
<script>
import Task from "components/Task";

export default {
  components: { Task },
  data() {
    return {
      items: [],
      columns: [
        {
          name: "Name",
          label: "Tên",
          field: "Name",
          sortable: true
        },
        { name: "DefaultPoint", label: "Điểm chuẩn", field: "DefaultPoint" },
        { name: "ManualPoint", label: "Điểm thêm", field: "ManualPoint" }
      ]
    };
  },
  methods: {
    edit(id) {},
    add() {
      Task.show()
    },
    getTasks() {
      this.api.getData("tasks").then(
        res => {
          this.items = res.data;
          console.log(this.children);
        },
        err => {
          console.log(err);
        }
      );
    },
    deleteRow() {
      this.$q.notify({
        color: "secondary",
        icon: "delete",
        message: `Will delete the selected row${
          this.selectedSecond.length > 1 ? "s" : ""
        } later, ok?`
      });
    },
    rowClick(row) {
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
        .then((data) => {
          console.log(row)
          row.Name = data;
           this.api.putData('tasks/' + row.id.toString(), row).then(
              res => {
                 
                this.$q.notify({
                        color: 'secondary',
                        icon: 'star',
                        message: 'Đã chỉnh sửa thành công!'
                      })
                this.getTasks()      
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
