<template>
  <div class="banner-bgc">
    <div class="title-wrap">
      <h1>會員中心</h1>
    </div>
  </div>

  <div>
    <ul class="nav-list">
      <li>
        <router-link to="/membercenter" class="memberlink member-page"
          >會員資料</router-link
        >
      </li>
      <li>
        <router-link to="/memberorderhistory" class="memberlink"
          >商品訂單</router-link
        >
      </li>
      <li>
        <router-link to="/membercampsiteorders" class="memberlink"
          >營地訂單</router-link
        >
      </li>
    </ul>
  </div>

  <div class="photo-box">
    <button
      v-if="memberInfo.photo === ''"
      @click="triggerFileInput"
      class="added-photo"
    >
      上傳頭貼
    </button>
    <img
      v-else
      @click="triggerFileInput"
      class="added-photo"
      :src="getDBImage(memberInfo.photo)"
      alt="用戶頭貼"
    />

    <input
      type="file"
      ref="fileInput"
      style="display: none"
      @change="handleFileUpload"
    />
  </div>

  <div class="info-container">
    <section class="info-box">
      <div v-if="!isEditing">
        <h4>個人資訊</h4>
        <div class="inner">
          <p class="member-title-1 member-no">
            會員編號 {{ memberInfo.member_id }}
          </p>
        </div>
        <p class="member-title-1">會員姓名 {{ memberInfo.name }}</p>
        <p class="member-title-1">會員信箱 {{ memberInfo.email }}</p>
        <p class="member-title-1">會員電話 {{ memberInfo.phone }}</p>
        <p class="member-title-1">會員地址 {{ memberInfo.address }}</p>
        <div class="box">
          <button class="startEditing" @click="startEditing">編輯</button>
        </div>
      </div>

      <div v-else>
        <h4>個人資訊</h4>
        <div class="inner">
          <p class="member-title-2 member-no">
            會員編號: {{ memberInfo.member_id }}
          </p>
        </div>
        <div class="inner">
          <p class="member-title-2 info-title">會員姓名:</p>
          <input
            v-model="editMemberInfo.name"
            placeholder="姓名"
            class="info-input"
          />
        </div>
        <div class="inner">
          <p class="member-title-2">會員信箱: {{ memberInfo.email }}</p>
        </div>
        <div class="inner">
          <p class="member-title-2">會員電話:</p>
          <input
            v-model="editMemberInfo.phone"
            placeholder="電話"
            class="info-input"
          />
        </div>
        <div class="inner">
          <p class="member-title-2">會員地址:</p>
          <input
            v-model="editMemberInfo.address"
            placeholder="地址"
            class="info-input"
          />
        </div>

        <div class="box">
          <button class="save-changes" @click="saveChanges">儲存</button>
          <button class="cancelEditing" @click="cancelEditing">取消</button>
        </div>
      </div>
    </section>

    <form class="password-box">
      <div v-if="!isEditingPassword">
        <h4>修改密碼</h4>
        <p class="password password-title-1" value="disabled">
          請輸入舊密碼 <span>*****************</span> {{ oldPassword }}
        </p>
        <p class="password password-title-1" value="disabled">
          請輸入新密碼 <span>*****************</span> {{ newPassword }}
        </p>
        <p class="password password-title-1" value="disabled">
          再確認新密碼 <span>*****************</span> {{ confirmPassword }}
        </p>
        <div class="box">
          <button class="save-changes" @click="startEditingPassword">
            修改密碼
          </button>
          <div class="logout" @click.stop="logout">登出</div>
        </div>
      </div>

      <div v-else>
        <h4>修改密碼</h4>
        <label class="password-title-2"
          >請輸入舊密碼:
          <input
            type="password"
            v-model="oldPassword"
            class="psw-input" /></label
        ><br />
        <label class="password-title-2"
          >請輸入新密碼:
          <input
            type="password"
            v-model="newPassword"
            class="psw-input" /></label
        ><br />
        <label class="password-title-2"
          >再確認新密碼:
          <input
            type="password"
            v-model="confirmPassword"
            class="psw-input" /></label
        ><br />

        <div class="box">
          <button class="savePasswordChanges" @click="savePasswordChanges">
            儲存
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import userStore from '@/stores/user';
import apiInstance from '@/plugins/auth';
import { getDBImage } from '@/assets/js/common';

export default {
  data() {
    return {
      isEditing: false,
      editMemberInfo: {
        name: '',
        phone: '',
        email: '',
        address: '',
      },
      isEditingPassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      imageSrc: '',
    };
  },

  mounted() {
    this.getMemberInfo();
  },
  computed: {
    ...mapState(userStore, ['memberInfo']),
  },
  methods: {
    // 使用 mapActions 輔助函數將/src/stores/user裡的actions/methods 映射在這裡
    ...mapActions(userStore, ['updateToken', 'updateUserData', 'logout']),
    async getMemberInfo() {
      try {
        const token = localStorage.getItem('token'); // 使用 getItem 方法和 'token' 鍵
        // 確保 token 存在
        if (!token) {
          console.error('Logout error: No token found');
          return;
        }
        // 發送請求到後端，獲取用戶資料
        const response = await apiInstance.get('memberInfo.php', {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.updateUserData(response.data);
        // 調用 Pinia action 並傳入響應數據
      } catch (error) {
        console.error('Error fetching member info:', error);
        // 處理錯誤，可能需要在界面上顯示錯誤資訊
      }
    },
    startEditing() {
      this.editMemberInfo = {
        name: this.memberInfo.name,
        phone: this.memberInfo.phone,
        email: this.memberInfo.email, // 假設郵箱不允許在此處編輯
        address: this.memberInfo.address,
      };
      this.isEditing = true;
    },
    getDBImage(paths) {
      return getDBImage(paths);
    },
    saveChanges() {
      const token = localStorage.getItem('token'); // 從本地存儲獲取用戶的token
      // 使用 api 實例
      apiInstance
        .post(
          '/memberUpdate.php',
          {
            member_id: this.memberInfo.member_id,
            name: this.editMemberInfo.name,
            phone: this.editMemberInfo.phone,
            address: this.editMemberInfo.address,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        .then(response => {
          // 更新成功
          alert('資料更新成功');
          // console.log(response.data)
          this.getMemberInfo();
          this.isEditing = false;
        })
        .catch(error => {
          console.error('更新資料失敗:', error);
          alert('資料更新失敗');
        });
    },
    cancelEditing() {
      this.isEditing = false;
    },
    startEditingPassword() {
      this.isEditingPassword = true;
    },

    // savePasswordChanges() {
    //   if (
    //     !this.oldPassword.trim() ||
    //     !this.newPassword.trim() ||
    //     !this.confirmPassword.trim()
    //   ) {
    //     alert('密碼欄位不能為空');
    //     return;
    //   }
    //   // 檢查新密碼與確認密碼是否一致
    //   if (this.newPassword !== this.confirmPassword) {
    //     alert('新密碼和確認密碼不一致');
    //     return;
    //   }

    //   // 從 localStorage 中獲取 token
    //   const token = localStorage.getItem('token');
    //   if (!token) {
    //     console.error('No token found');
    //     return;
    //   }

    //   try {
    //     // 發送更新密碼的請求
    //     const response = apiInstance({
    //       method: 'post',
    //       url: '/updatePassword.php',
    //       data: {
    //         oldPassword: this.oldPassword,
    //         newPassword: this.newPassword,
    //       },
    //       headers: { Authorization: `Bearer ${token}` },
    //     });

    //     // 根據後端響應處理前端邏輯
    //     if (response.data.error === false) {
    //       // 如果密碼更新成功
    //       alert(response.data.message); //沒辦法返回後端訊息
    //       this.isEditingPassword = false;
    //       this.logout(); // 無法登出

    //       console.log(this.logout);
    //     } else {
    //       // 如果後端報告說密碼更新失敗
    //       alert(response.data.message);
    //     }
    //   } catch (error) {
    //     // 處理請求過程中發生的錯誤
    //     // console.error("密碼更新失敗:", error);
    //     alert('密碼更新過程中發生錯誤');
    //   }
    // },

    savePasswordChanges() {
      if (
        !this.oldPassword.trim() ||
        !this.newPassword.trim() ||
        !this.confirmPassword.trim()
      ) {
        alert('密碼欄位不能為空');
        return;
      }
      // 檢查新密碼與確認密碼是否一致
      if (this.newPassword !== this.confirmPassword) {
        alert('新密碼和確認密碼不一致');
        return;
      }
      // 從 localStorage 中獲取 token
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      apiInstance({
        method: 'post',
        url: '/updatePassword.php',
        data: {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        },
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          if (response.data.error === false) {
            // 如果密碼更新成功
            alert(response.data.message);
            this.isEditingPassword = false;
            console.log(logout);
            this.logout(); // 登出操作
          }
        })
        .catch(error => {
          // 處理請求過程中發生的錯誤
          alert('密碼更新過程中發生錯誤');
        });
    },
    cancelPasswordEditing() {
      // 在這裡處理取消密碼修改的邏輯
      this.isEditingPassword = false;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const fileName = file.name;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        apiInstance
          .post('uploadPhoto.php', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then(response => {
            console.log(response.data);
            this.uploadImagePath(fileName);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    },
    uploadImagePath(file) {
      const memberId = this.memberInfo.member_id;
      const filePath = 'member/' + file;

      const formDataForPath = new FormData();
      formDataForPath.append('fileName', filePath);
      formDataForPath.append('memberId', memberId);

      apiInstance
        .post('uploadPhotoPath.php', formDataForPath)
        .then(response => {
          if (!response.data.error) {
            console.log(response.data.msg);
            this.getMemberInfo();
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/page/memberCenterView.scss';

.added-photo {
  border-radius: 100px;
  height: 150px;
  width: 150px;
  border: 1px dashed;
}
.photo-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.logout {
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
}
</style>
