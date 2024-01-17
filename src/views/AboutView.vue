<script>
// 引入函式庫
import axios from 'axios';

export default {};
</script>

<template>
  <div class="wrap">頁面裡的內容請寫在.wrap標籤裡面</div>
  <Space direction="vertical">
        <Space wrap>
            <Button type="primary" shape="circle" icon="ios-search"></Button>
            <Button type="primary" icon="ios-search">Search</Button>
            <Button type="primary" shape="circle" icon="ios-search">Search</Button>
            <Button type="primary" shape="circle">Circle</Button>
        </Space>
        <Space wrap>
            <Button shape="circle" icon="ios-search"></Button>
            <Button icon="ios-search">Search</Button>
            <Button shape="circle" icon="ios-search">Search</Button>
            <Button shape="circle">Circle</Button>
        </Space>
    </Space>
</template>

<style lang="scss" scoped>

</style>
