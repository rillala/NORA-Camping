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