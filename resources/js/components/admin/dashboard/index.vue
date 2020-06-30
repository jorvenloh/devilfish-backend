<template>
    <div class="row">
        <div class="col-md-4">
            <userCard></userCard>
        </div>
        <div class="col-md-4">
            <productCard></productCard>
        </div>
        <div class="col-md-4">
            <articleCard></articleCard>
        </div>
    </div>
</template>

<script>
import userCard from "@/components/admin/dashboard/userCard";
import articleCard from "@/components/admin/dashboard/articleCard";
import productCard from "@/components/admin/dashboard/productCard";

export default {
    components: {
        userCard,
        articleCard,
        productCard
    }
};
</script>

<style>
</style>
