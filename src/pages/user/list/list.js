let that ;
let list = {
  data ( ) {
    return {
      multipleSelection:[],
      query:{
        pageIndex:1,
        pageSize:10
      },
      pageSize:this.yzy.pageSize,
      total:0,
      tableData: [{
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      },]
    }
  },
  mounted(){
    that = this;
    that.getList()
  },
  methods:{
    getList(){
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
