<script>
export default{
    
}

</script>

<template>
    <a class="back-to-top bg-blue-3">
        <div class="dash bg-white01"></div>
        <div class="triangle"></div>
        <p class="white01">TOP</p>
    </a>
</template>

<style lang="scss" scoped>

.back-to-top{
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;

width: 45px;
height: 70px;
padding: 15px 9px;
border-radius: $radius;
background: $blue-3;

  @include desktop{
    width: 80px;
    height: 110px;
    }
}

.dash{
    width: 23px;
    height: 3px;
    margin: 0 auto;

    @include desktop{
        width: 35px;
        height: 5px;
    }
}

.triangle {
    width: 0;
    height: 0;
    margin: 3px auto 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 23px solid $white01; 
    
    @include desktop{
        border-left: 17.5px solid transparent;
        border-right: 17.5px solid transparent;
        border-bottom: 31px solid $white01; 
    }
   
}

p{
    display: none;

    @include desktop{
        display: block;
        text-align: center;
        margin-top: 5px;
        @include font-style(20px, 700, 20%, 100%);
    }
}


</style>