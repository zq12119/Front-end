<template>
  <div class="update">
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
        <el-main>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="数据编号">
              <el-input v-model="ruleForm.id" readOnly></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="price">
              <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="number">
              <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      ruleForm: {
        id: "",
        name: "",
        price: "",
        number: ""
      },
      rules: {
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        price: [
          { required: true, message: "请输入价格范围", trigger: "change" }
        ],
        number: [{ required: true, message: "请输入数量,例如2", trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios.put('http://localhost:8181/order/update',this.ruleForm).then(function(resp){
            if(resp.data == 'success'){
              _this.$router.push('/home');
              _this.$message('修改成功!');
            }else{
              _this.$message('修改失败');
            }
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created(){
      const _this = this;
      axios.get('http://localhost:8181/order/findById/'+ this.$route.query.id).then(function(resq){
          _this.ruleForm = resq.data;
      })
  }
};
</script>

<style>
.about .el-aside {
  color: #333;
}
</style>

