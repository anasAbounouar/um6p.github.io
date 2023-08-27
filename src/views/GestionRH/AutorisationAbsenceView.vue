<template>
    <div>
        <SideBarView />
        <NavBarView />
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
export default {
    name: "RH-autorisation-absence",
    components: {
        SideBarView,
        NavBarView,
        // VSelect, // Register the VSelect component
    },
};
</script>
