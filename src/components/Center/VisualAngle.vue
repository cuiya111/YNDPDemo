<template>
    <div class="visual-angle">
        <img src="../../assets/reset.png" class="reset-icon">
        <div class="text">默认视角</div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "VisualAngle"
    }
</script>

<script lang="ts" setup>

</script>

<style scoped lang="scss">
.visual-angle{
    display: flex;
    align-items: center;
    cursor: pointer;

    .reset-icon{
        display: block;
        width: px2vw(19);
        margin-right: px2vw(7);
    }

    .text{
        color: #fff;
        font-size: px2vw(18);
    }
}
</style>