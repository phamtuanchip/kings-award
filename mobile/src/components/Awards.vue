<template>
<q-page>   
   <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn round color="primary" @click="add" icon="add a photo" />
  </q-page-sticky>
 <q-table
      :data="items"
      :columns="columns"
      row-key="id"
    >
      <q-tr slot="body" slot-scope="props" :props="props">
        <q-td key="Image" :props="props" >
          <span ><img :src="props.row.Gift" width="44"/></span>
          <q-btn size="sm" round dense color="secondary" icon="mode edit"  @click.native="rowClick(props.row)" class="q-mr-xs" />
          <q-tooltip>{{ props.row.Title }}</q-tooltip>
        </q-td>
         <q-td key="Name" :props="props">
          <span class="text-italic">{{ props.row.Title }}</span>
           <q-tooltip>{{ props.row.SubTitle }}</q-tooltip>
        </q-td>         
        <q-td key="From" :props="props">
          {{ props.row.From }}
        </q-td>
        <q-td key="To" :props="props">{{ props.row.To }}</q-td>
        <q-td key="Point" :props="props">
          <div class="row items-center justify-between no-wrap">
            <q-btn size="sm" round dense color="secondary" icon="remove" @click="props.row.TargetPoint--" class="q-mr-xs" />
             <div>{{ props.row.TargetPoint }}</div>
            <q-btn size="sm" round dense color="tertiary" icon="add" @click="props.row.TargetPoint++" class="q-mr-sm" />
           
          </div>
        </q-td>
      </q-tr>
    </q-table>
 
</q-page>
</template>
<script>
import Award from 'components/Award'
export default {
  components: {Award},
  data(){
    return {
      items: [],
      columns: [
        {
          name: 'Image',
          required: true,
          label: 'Award',
          align: 'left',
          field: 'Gift',
          sortable: true
        },
        { name: 'Name', label: 'Name', field: 'Title', sortable: true },
        //{ name: 'Desc', label: 'Description', field: 'SubTitle', sortable: true },
        { name: 'From', label: 'From date', field: 'From' },
        { name: 'To', label: 'End date', field: 'To' },
        { name: 'Point', label: 'Target', field: 'TargetPoint' },
        
      ]
    }
  },
  methods: {
    getAwards(){
      this.api.getData('awards').then((res) => {
        this.items = res.data
        console.log(this.children) 
      }, (err) => {
        console.log(err)
      })
    },
    deleteRow () {
      this.$q.notify({
        color: 'secondary',
        icon: 'delete',
        message: `Will delete the selected row${this.selectedSecond.length > 1 ? 's' : ''} later, ok?`
      })
    },
    rowClick (row) {
      this.$router.push('play/'+ row.id)
    }
  },
  mounted(){
    this.getAwards()
  }
}
</script>
