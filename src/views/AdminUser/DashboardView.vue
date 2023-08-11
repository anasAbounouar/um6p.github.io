<template>
    <div>
        <SideBarView />
        <NavBarView />
        <section id="dashboard">
            <div class="container">
                <div class="row">
                    <div v-for="box in boxes" :key="box.id" class="col-4">
                        <div class="box">
                            <span class="fw-bold d-flex m-3">
                                {{ box.title }}
                            </span>
                            <div class="data-container m-3">
                                <p>{{ box.data }}</p>
                                <i class="fa-solid" :class="box.icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-container">
                <!-- Use the Pie chart component -->
                <Pie :data="data" :options="options" />
            </div>
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";
import { data, options } from "./ChartConfig";
ChartJS.register(ArcElement, Tooltip, Legend);

export default {
    name: "dashboard-page",
    components: { SideBarView, NavBarView, Pie },
    data() {
        return {
            boxes: [
                {
                    id: 0,
                    title: "Nb d’employés",
                    data: 856,
                    icon: "fa-user-tie",
                },
                {
                    id: 1,
                    title: "Nb d’embauches",
                    data: 900,
                    icon: "fa-suitcase",
                },
                {
                    id: 2,
                    title: "Nb des debauches",
                    data: 30,
                    icon: "fa-user-slash",
                },
                {
                    id: 3,
                    title: "Presence du jour",
                    data: 850,
                    icon: "fa-solid fa-hand-pointer",
                },
                {
                    id: 4,
                    title: "Absence du jour",
                    data: 6,
                    icon: "fa-user-xmark",
                },
                {
                    id: 5,
                    title: "repos",
                    data: 15,
                    icon: "fa-house",
                },
            ],
            malePercentage: 0.7,
            femalePercentage: 0.3,
            data,
            options,
        };
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#dashboard {
    .box {
        padding: 8px;
        border-radius: 4px;
        background: #e7e7e7;
        box-shadow: -1.8418585062026978px 1.8418585062026978px
            2.7627878189086914px -1.8418585062026978px rgba(108, 107, 107, 0.23);
        transition: 0.3s;
        &:hover {
            transform: translateY(-3px);
        }
        .data-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            p {
                color: var(--secondary-300, #394e75);
                font-size: 20px;
                line-height: 9.209px; /* 64.516% */
            }
            i {
                font-size: 35px;
            }
        }
    }
    .chart-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
}
</style>
