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
     
    </q-layout>
    <q-dialog
    v-model="customDialogModel"
    stack-buttons
    prevent-close
    @ok="onOk"
    @cancel="onCancel"
    @show="onShow"
    @hide="onHide"
  >
    <!-- This or use "title" prop on <q-dialog> -->
    <span slot="title">Favorite Superhero</span>

    <!-- This or use "message" prop on <q-dialog> -->
    <span slot="message">What is your superhero of choice?</span>

    <div slot="body">
      <Task />
    </div>

    <template slot="buttons" slot-scope="props">
      <q-btn color="primary" label="Choose Superman" @click="choose(props.ok, 'Superman')" />
      <q-btn color="black" label="Choose Batman" @click="choose(props.ok, 'Batman')" />
      <q-btn color="negative" label="Choose Spiderman" @click="choose(props.ok, 'Spiderman')" />
      <q-btn flat label="No thanks" @click="props.cancel" />
    </template>
  </q-dialog>   
</q-page>
</template>
<script>
import Task from "components/Task";

export default {
  components: { Task },
  data() {
    return {
      customDialogModel : false,
      name: '',
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
      onOk (data) { },

    // when props.cancel() gets called
    onCancel () { },

    // when we show it to the user
    onShow () { },

    // when it gets hidden
    onHide () { },

    // custom handler
    async choose (okFn, hero) {
      if (this.name.length === 0) {
        this.$q.dialog({
          title: 'Please specify your name!',
          message: `Can't buy tickets without knowing your name.`
        })
      }
      else {
        await okFn()
        this.$q.notify(`Ok ${this.name}, going with ${hero}`)
      }
    },
    edit(id) {},
    add() {
       alert('test')
       this.customDialogModel = true
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
