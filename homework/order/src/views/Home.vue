<template>
<div class="home">
  <el-container style="height: 500px; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-active="$route.path" :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-message"></i>导航
        </template>
        <el-menu-item-group>
          <el-menu-item index="/Home">购物车列表</el-menu-item>
          <el-menu-item index="/About">新增订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>  
  <el-container>
    <el-header style="text-align: left; font-size: 12px">
      <span class="order">订单管理</span>
    </el-header>
     <el-main>
      <el-table :data="purData" height="350" style="width: 100%" class="table">
        <el-table-column prop="name" label="品牌" width="140">
        </el-table-column>
        <el-table-column prop="date" label="订单日期" width="200">
          <template slot-scope="scope">
              <span>{{scope.row.date|formaDate}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="订单单价">
        </el-table-column>
        <el-table-column label="订单数量">
          <template slot-scope="scope1">
              <el-input-number v-model="scope1.row.number" size="small" @change="handleChange" :min="1" :max="100"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="a">
            <el-button size="mini" type="danger" @click="update(a.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="del(a.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
      <span  class="span2" v-show="purData.length>0" style="font-family: Microsoft YaHei;margin-bottom:15px;margin-left: 10px;font-weight: bold;">总价：{{sumPrice}}元</span>
  </el-container>
</el-container>
    <!-- 可以用它的名字来找它 -->
    <router-view></router-view>
</div>  
</template>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .order{
    font-size: 20px;
    margin-left: 10px;
    font-weight: bold;
  }
</style>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

var padaDate = function(value) {
  return value < 10 ? "0" + value : value;
};

export default {
  name: "Home",
  data() {
    return {
      purData: []
    };
  },
  computed: {
    sumPrice: function() {
      var sum = 0;
      for (var i = 0; i < this.purData.length; i++) {
        sum += this.purData[i].price * this.purData[i].number;
      }
      return sum;
    }
  },
  filters: {
    formaDate: function(value) {
      //创建一个时间日期对象
      var date = new Date();
      var year = date.getFullYear(); //存储年
      var month = padaDate(date.getMonth() + 1); //存储月份
      var day = padaDate(date.getDate()); //存储日期
      var hours = padaDate(date.getHours()); //存储时
      var minutes = padaDate(date.getMinutes()); //存储分
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes;
    }
  },
  methods: {
    update(row) {
      this.$router.push({
        path: '/update',
        query: {
          id: row.id
        }
      });
    },
    del(row) {
      const _this = this;
      axios.delete('http://localhost:8181/order/deleteById/'+ row.id).then(function(resp){
          _this.$message('删除成功!');
          window.location.reload();
      })
    },
    handleChange(value) {
        console.log(value);
      }
  },
  created(){
    const _this = this;
    axios.get('http://localhost:8181/order/findAll').then(function(resp){
      _this.purData = resp.data;
    })
  }
};
</script>
