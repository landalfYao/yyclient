let that ;
let list = {
  data ( ) {
    return {
      multipleSelection:[],
      query:{
        wheres:'',
        sorts:'update_datetime desc,create_datetime desc',
        pageIndex:1,
        pageSize:10
      },
      wheres:[],
      pageSize:this.yzy.pageSize,
      total:0,
      tableData: [],
      searchList:[
        {label:'ID',key:'pk_id'},
        {label:'用户名',key:'username'},
        {label:'昵称',key:'nick_name'},
        {label:'手机号',key:'phone_number'},
        {label:'邮箱',key:'email'}
      ]
    }
  },
  mounted(){
    that = this;
    that.getList()
  },
  methods:{
    getList(){
      let sq = ''
      for(let i in this.wheres){
        sq = this.wheres[i].value + ' and '
      }
      if(sq != ''){
        this.query.wheres = sq.substring(0,sq.length-4)
      }else{
        this.query.wheres = ''
      }
      this.yzy.post('user/get',this.query,function(res){
        if(res.code == 1){
          for(let i in res.data.list){
            res.data.list[i].update_datetime = new Date(res.data.list[i].update_datetime).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
          }
          that.tableData = res.data.list
          that.total = res.data.total
        }else{
          that.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    filterChange(e){
      let temp = -1
      let arr = this.wheres
      let resArr = e['user_state']
      
      for(let i in resArr){
        if(resArr[i].indexOf("'")<0){
          resArr[i] = "'"+resArr[i]+"'"
        } 
      }
      
      let sq = 'user_state in ('+resArr+')'
      for(let i in arr){
        if(arr[i].label == 'user_state'){
          temp = i
        }
      }
      
      if(resArr.length == 0){
        if(temp != -1){
          this.wheres.splice(temp,1)
        }
      }else{
        if(temp == -1){
          this.wheres.push({label:'user_state',value:sq})
        }else{
          this.wheres[temp].value = sq
        }
      }
      
      this.getList()
    },
    changeUserState(state){

      if(state == 'disable'){
        this.$confirm('此操作将使用户被迫下线, 是否继续?', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.update('user/state/'+state,{ids:that.filterIds().toString()})
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });        
      }else{
        that.update('user/state/'+state,{ids:that.filterIds().toString()})
      }
    },
    filterIds(){
      let arr = []
      for(let i in this.multipleSelection){
        arr.push(this.multipleSelection[i].pk_id)
      }
      return arr
    },
    update(url,data){
      this.yzy.post(url,data,function(res){
        if(res.code == 1){
          that.$message({
            type: 'success',
            message: res.msg
          })
          that.getList()
        }else{
          that.$message({
            type: 'error',
            message: res.msg
          })
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val)
    },
    handleSizeChange(e){
      this.getList()
    },
    handleCurrentChange(e){
      this.query.pageIndex = e
      this.getList()
    },
  }
}
module.exports = list
