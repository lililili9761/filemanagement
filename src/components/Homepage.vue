<template>
  <el-container>
    <el-aside>
      <el-card class="box-card usercard" shadow="never">
        <el-dropdown>
          <span class="el-dropdown-link">
            欢迎您，
            <span v-if="isadmin==1">管理员</span>
            <span>{{username}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>帮助</el-dropdown-item>
            <el-dropdown-item @click.native="loginout" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-card>
      <el-button v-if="isadmin==1" class="delete" type="danger" @click="deleteFile()">
        <i class="el-icon-delete"></i>删除文件
      </el-button>
      <el-upload
        ref="upload"
        class="upload-demo"
        action="/api/upload_file"
        :on-change="handleChange"
        :limit="5"
        :on-exceed="uploadOverrun"
        :file-list="fileList3"
        multiple
        accpet="audio/*,video/*"
        :before-upload="onBeforeUpload"
      >
        <el-button v-if="isadmin==1" class="upload" type="primary">
          <i class="el-icon-upload"></i>上传文件
        </el-button>
      </el-upload>
    </el-aside>
    <el-main>
      <el-table
        stripe
        highlight-current-row
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="file_name" label="文件名" width="120"></el-table-column>
        <el-table-column prop="file_path" label="路径" class="size"></el-table-column>
        <el-table-column prop="openmethod" label="打开方式" class="openmethod">
          <template slot-scope="scope">
            <img
              src="../assets/iqiyi.png"
              width="28"
              style="border-radius: 50%;margin-right: 7px;cursor:pointer"
              class="head_pic"
              @click="open_file(scope.row,'aqy')"
            >
            <img
              src="../assets/qqlive.png"
              width="28"
              style="border-radius: 50%;margin-right: 7px;cursor:pointer"
              class="head_pic"
              @click="open_file(scope.row,'qq')"
            >
            <img
              src="../assets/mgtv.png"
              width="28"
              style="border-radius: 50%;margin-right: 7px;cursor:pointer"
              class="head_pic"
              @click="open_file(scope.row,'mg')"
            >
          </template>
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="文件名">
                <span>{{ props.row.file_name }}</span>
              </el-form-item>

              <el-form-item label="文件类型">
                <span>{{ props.row.file_type }}</span>
              </el-form-item>

              <el-form-item label="作者">
                <span>{{ props.row.file_author }}</span>
              </el-form-item>
              <el-form-item label="专辑">
                <span>{{ props.row.file_album }}</span>
              </el-form-item>
              <el-form-item label="文件描述">
                <span>{{ props.row.file_info }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="tag"
          label="类型"
          width="100"
          :filters="[{ text: 'mp4', value: 'mp4' }, { text: 'avi', value: 'avi' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === 'mp4' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.file_type}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<style>
.el-aside {
  color: #333;
  width: 16.66667% !important;
  background-color: #f8f8f8;
  font-size: 12px;
  border-right: 1px solid #e7e7e7;
}
.el-card {
  text-align: center;
}
.upload-demo {
  margin-top: 2em;
  padding: 0 25%;
}
.delete {
  margin-top: 3em;
  margin-left: 25%;
}
.usercard {
  background-color: #f8f8f8;
  border-bottom: 1px solid #e7e7e7;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: none;
  padding: 3em 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

<script>
import EventHandler from "../assets/EventHandler.js";
export default {
  data() {
    return {
      tableData: [],
      fileList3: [
        //{
        //   name: 'food.jpeg',
        //   url:
        //   'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, {
        //   name: 'food2.jpeg',
        //   url:
        //   'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        //}
      ],
      isadmin: "",
      username: "",
      openmethod: [
        "../assets/iqiyi.png",
        "../assets/qqlive.png",
        "../assets/mgtv.png"
      ],
      selection: "",
      deleteindex: ""
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange(file, fileList) {
      var uploaddata = this.$refs.upload.uploadFiles;
      this.fileList3 = fileList;

      for (var i = uploaddata.length - 1; i < uploaddata.length; i++) {
        var j = 4;
        this.$axios
          .post("/api/upload_file", {
            file_name: uploaddata[i].name,
            file_type: uploaddata[i].raw.type,
            file_path: "/Users/lililili9761/Downloads/" + uploaddata[i].name
          })
          .then(res => {});
        this.tableData.push({
          file_name: uploaddata[i].name,
          file_type: uploaddata[i].raw.type,
          file_id: j++,
          file_path: "/Users/lililili9761/Downloads/" + +uploaddata[i].name
        });
      }
    },
    deleteFile: function() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          var me = this;
          var row_index = [];
          var send_file_id = [];
          // for(var i=0;i<me.selection.length;i++) {
          //   me.$axios.post("/api/delete",{
          //     file_id:me.selection[i].file_id
          //   }).then(res = {});
          // }
          me.selection.forEach((val, index, arr) => {
            me.tableData.forEach((v, i, a) => {
              if (val.file_id == v.file_id) {
                row_index.push(i);
                send_file_id.push(val.file_id);
              }
            });
          });
          console.log(send_file_id);
          for (var j = row_index.length - 1; j >= 0; j--) {
            me.tableData.splice(row_index[j], 1);
            this.$axios
              .post("/api/delete_file", {
                send_file_id: send_file_id[j]
              })
              .then(ans => {
                console.log(ans.data)
                alert('删除成功！')
              })
              .catch(er => {})
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onBeforeUpload(file) {
      var isTruetype = file.type === "audio/*" || "video/*";
      console.log(isTruetype);
      if (!isTruetype) {
        this.$message.error("上传文件只能是视频/音频");
      }
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制，最多上传5个文件。"
      });
    },
    loginout: function() {
      var me = this;
      setTimeout(function() {
        this.$cookies.remove("username");
        me.$router.push("/");
        window.location.reload();
      }, 1000);
    },
    open_file: function(data, byway) {
      this.$axios
        .post("/api/play", {
          file_name: data.file_name,
          byway: byway
        })
        .then(ans => {})
        .catch(er => {});
    },
    handleSelectionChange: function(val) {
      this.selection = val;
    }
  },
  mounted() {
    var me = this;
    EventHandler.$on("newdata", data => {
      me.tableData = data;
    });

    this.$axios.get("/api/show_files").then(ans => {
      this.tableData = ans.data;
      console.log(this.tableData);
      var isadmin = this.$cookies.get("isadmin");
      var username = this.$cookies.get("username");
      this.username = username;
      this.isadmin = isadmin;
    });
  }
};
</script>