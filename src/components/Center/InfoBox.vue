<template>
    <div class="info-box">
        <img :src="img_src" class="icon">
        <div class="info">
            <h3>{{ title }}</h3>
            <p class="record">{{ record }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
        name: "InfoBox"
    }
</script>

<script lang="ts" setup>

    import { ref, onMounted } from "vue";
    import iconBook from "@/assets/bottom-icon/book.png";
    import iconFile from "@/assets/bottom-icon/file.png";
    import iconCar from "@/assets/bottom-icon/car.png";

    type iconType = "book" | "file" | "car";

    const img_src = ref(iconBook);

    const props = withDefaults(
        defineProps<{
            icon?: iconType;
            title: string;
            record: string;
        }>(), 
        {
            icon: "book",
        }
    );
    onMounted(() => {
        if (props.icon === "book") {
            img_src.value = iconBook;
        } else if (props.icon === "file") {
            img_src.value = iconFile;
        } else if (props.icon === "car") {
            img_src.value = iconCar;
        }
    });
</script>

<style scoped lang="scss">
.info-box {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-family: 'Source Han Sans', sans-serif;

    .icon{
        display: block;
        width: px2vw(100);
    }

    h3{
        font-size: px2vw(14);
        margin-bottom: px2vh(8);
        font-weight: lighter;
    }

    .record{
        font-size: px2vw(20);
        font-weight: bold;
        letter-spacing: .1em;
    }

}
</style>