<!--AvatarUploader-->
<template>
  <div class="AvatarUploader">
    <div>
      <span
        v-if="!avatarUrl"
        @click="openEditAvatarDialog()"
        style="
          display: inline-block;
          padding: 70px;
          border: 1px dashed gray;
          cursor: pointer;
        "
      >
        <el-tooltip effect="dark" content="上传头像" placement="top">
          <i class="el-icon-plus" />
        </el-tooltip>
      </span>
 
      <div v-else class="image">
        <el-image :src="avatarUrl" fit="fill" />
        <div class="mask">
          <el-tooltip effect="dark" content="预览头像" placement="top">
            <i
              class="el-icon-zoom-in"
              style="cursor: pointer"
              @click="isVisible_previewAvatarDialog = true"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除头像" placement="top">
            <i
              class="el-icon-delete"
              style="cursor: pointer"
              @click="deleteAvatar()"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
    <!-- 预览头像窗口 -->
    <el-dialog :visible.sync="isVisible_previewAvatarDialog">
      <img width="100%" :src="avatarUrl" />
    </el-dialog>
    <!-- 修改头像窗口 -->
    <el-dialog
      title="修改头像"
      :visible.sync="isVisible_editAvatarDialog"
      width="800"
    >
      <el-row>
        <el-col :span="12" style="height: 300px">
          <vue-cropper
            ref="cropper"
            :img="options.img"
            :info="true"
            :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth"
            :autoCropHeight="options.autoCropHeight"
            :fixedBox="options.fixedBox"
            @realTime="realTime"
          >
          </vue-cropper>
          <div style="display: flex; padding-top: 20px">
            <el-upload
              ref="uploadCropper"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false"
              action
              style="margin-right: 10px"
            >
              <el-button type="primary" size="small">上传头像</el-button>
            </el-upload>
            <el-tooltip
              class="item"
              effect="dark"
              content="向左旋转"
              placement="top"
            >
              <el-button size="small" @click="rotateLeft"
                ><i class="el-icon-refresh-left"></i
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="向右旋转"
              placement="top"
            >
              <el-button size="small" @click="rotateRight"
                ><i class="el-icon-refresh-right"></i
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="放大"
              placement="top"
            >
              <el-button size="small" @click="changeScale(1)"
                ><i class="el-icon-plus"></i
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              effect="dark"
              content="缩小"
              placement="top"
            >
              <el-button size="small" @click="changeScale(-1)"
                ><i class="el-icon-minus"></i
              ></el-button>
            </el-tooltip>
          </div>
        </el-col>
        <el-col :span="12" style="height: 300px">
          <div class="upload-preview">
            <img
              :src="previews.url"
              :style="previews.img"
              v-show="previews.url"
            />
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isVisible_editAvatarDialog = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          :loading="loading"
          @click="submitUpdate"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
 
<script>
import { VueCropper } from "vue-cropper";
export default {
  name: "AvatarUploader",
  components: { VueCropper },
  props: {
    avatar: String,
 
    region: String,
    accessKeyId: String,
    accessKeySecret: String,
    bucket: String,
  },
  data() {
    return {
      isVisible_editAvatarDialog: false,
      isVisible_previewAvatarDialog: false,
      options: {
        img: "", //裁剪图片的地址
        info: true, //裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: "", // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, //是否默认生成截图框
        autoCropWidth: 200, //默认生成截图框宽度
        autoCropHeight: 200,
        fixedBox: true, // 固定截图框大小 是否允许改变
        fixed: true, //是否开启截图框宽高固定比例
        fixedNumber: [1, 1], //截图框的宽高比例
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      previews: {},
      loading: false,
      avatarName: "", //头像名，包含后缀
      avatarUrl:this.avatar, //头像服务端链接
      client_alioss: {},
    };
  },
 
  created() {
    const OSS = require("ali-oss");
    this.client_alioss = new OSS({
      region: this.region,
      accessKeyId: this.accessKeyId,
      accessKeySecret: this.accessKeySecret,
      bucket: this.bucket,
    });
  },
  mounted() {},
  computed: {},
  methods: {
    //打开编辑头像窗口
    openEditAvatarDialog() {
      this.isVisible_editAvatarDialog = true;
      if (this.previews.url) {
        this.previews.url = "";
        this.options.img = "";
      }
    },
    // 实时预览函数
    realTime(data) {
      this.previews = data;
    },
    beforeAvatarUpload(file) {
      //this.avatarName = this.$uuid.v1() + file.name; //包含后缀
      this.avatarName = '123456' + file.name;
      let uploadAccept = ["jpeg", "jpg", "png"]; //上传图片允许的格式
      let ext = file.type.split("/")[1]; //后缀名
      if (!uploadAccept.includes(ext)) {
        this.$message.warning("您上传的图片格式不符，请重新上传");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.options.img = reader.result; //base64
      };
    },
    changeScale(num) {
      this.$refs.cropper.changeScale(num);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    rotateRight() {
      this.$refs.cropper.rotateRight();
    },
    //删除服务器中的头像
    async deleteAvatar() {
      try {
        if (this.avatarUrl) {
          let { pathname } = new URL(this.avatarUrl);
          await this.client_alioss.deleteMulti([decodeURIComponent(pathname)]); //删除服务器中的头像。decodeURIComponent解决中文乱码
          this.$message.success("头像删除成功");
          this.avatarUrl = "";
          this.$emit("deleteAvatar");
        }
      } catch (error) {
        this.$message.error("头像删除失败");
      }
    },
    //上传头像
    submitUpdate() {
      try {
        this.loading = true;
        this.$refs.cropper.getCropData(async (base64) => {
          let file_img = this.base64toFile(base64, this.avatarName);
          let { name } = file_img;
          let {
            res: { requestUrls },
          } = await this.client_alioss.multipartUpload(name, file_img);
          this.deleteAvatar(); //删除服务器中的旧头像
          this.avatarUrl = requestUrls[0]; //展示新头像
          this.$message.success("上传头像成功");
          this.$emit("avatarUrl", this.avatarUrl); //把头像url传出去
        });
      } catch (error) {
        this.$message.error("上传头像失败");
      } finally {
        this.loading = false;
        this.isVisible_editAvatarDialog = false;
      }
    },
    //base64转换为file类型
    base64toFile(base64, filename) {
      let arr = base64.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  },
  watch: {},
};
</script>
 
<style lang="less" scoped>
.AvatarUploader {
  .image {
    position: relative;
    display: inline-block;
    width: 150px;
    height: 150px;
    .mask {
      opacity: 0;
      color: white;
      font-size: 25px;
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
 
      display: flex;
      justify-content: space-evenly;
      align-items: center;
 
      &:hover {
        opacity: 1;
      }
    }
  }
 
  .upload-preview {
    position: relative;
    top: 50%;
    transform: translate(50%, -50%);
    width: 200px;
    height: 200px;
    border-radius: 50%;
    box-shadow: 0 0 4px #bbbbbb;
    overflow: hidden;
  }
}
</style>