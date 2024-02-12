<div id="user-avatar" v-if="isLogin">
  <img :src="userProfileImage" alt="User Avatar" />
  <div class="sub-menu-container" v-if="isMemberSubOpen">
    <ul>
      <li>
        <router-link class="sub-menu" to="/membercenter" @click.stop="closeSubmenu">會員中心</router-link>
      </li>
      <li>
        <router-link class="sub-menu" to="/membercampsiteorders" @click.stop="closeSubmenu">商品訂單</router-link>
      </li>
      <li>
        <router-link class="sub-menu" to="/memberorderhistory" @click.stop="closeSubmenu">營地訂單</router-link>
      </li>
      <button class="logout" @click.stop="logout">登出</button>
    </ul>
  </div>
</div>
<button
  v-else
  id="member-login"
  @click="memberCenter(); closeHam();"
>
  <member-login :isOpen="isLoginOpen" @close="handleClose" />
</button>

<button
            id="member-login"
            @click="
              memberCenter();
              closeHam();
            "
          >
            <!--如果登入了就可以 @click展示子選單, 而不是跳轉開啟燈箱-->
            <div class="sub-menu-container" v-if="isMemberSubOpen">
              <ul>
                <div class="close-sub-menu" @click.stop="closeSubmenu">X</div>

                <li>
                  <RouterLink
                    class="sub-menu"
                    to="/membercenter"
                    @click.stop="closeSubmenu"
                    >會員中心</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    class="sub-menu"
                    to="/membercampsiteorders"
                    @click.stop="closeSubmenu"
                    >商品訂單</RouterLink
                  >
                </li>
                <li>
                  <RouterLink
                    class="sub-menu"
                    to="/memberorderhistory"
                    @click.stop="closeSubmenu"
                    >營地訂單</RouterLink
                  >
                </li>
                <button class="logout" @click.stop="logout">登出</button>
              </ul>
            </div>
            <memberLogin :isOpen="isLoginOpen" @close="handleClose" />
          </button>