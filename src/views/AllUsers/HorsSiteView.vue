<template>
    <div>
        <SideBarView />
        <NavBarView />
        <section id="horsSite">
            <h5 class="my-3">Liste des deplacements hors site</h5>
            <div class="site-table m-3">
                <table class="w-full mt-3">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>demandeur</th>
                            <th>Date</th>
                            <th>
                                <div class="filter-container">
                                    <select
                                        name=""
                                        id="etatHorsSite"
                                        v-model="selectedEtat"
                                    >
                                        <option
                                            value=""
                                            disabled
                                            hidden
                                            selected
                                        >
                                            Etat
                                        </option>
                                        <option
                                            v-for="option in etatOptions"
                                            :key="option.id"
                                        >
                                            {{ option.label }}
                                        </option>
                                    </select>
                                    <i
                                        class="fa-solid fa-sort-down p-absolute"
                                    ></i>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="deplacement in filteredDeplacement"
                            :key="deplacement.id"
                        >
                            <td>{{ deplacement.numero }}</td>
                            <td>{{ deplacement.demandeur }}</td>
                            <td>{{ deplacement.date }}</td>
                            <td>
                                <i
                                    class="fa-solid"
                                    :class="etatBetter(deplacement)"
                                ></i>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
import deplacements from "@/Js/deplacement";
export default {
    name: "hors-site-page",
    components: {
        SideBarView,
        NavBarView,
    },
    data() {
        return {
            etatOptions: [
                { id: 0, label: "Tout" },
                { id: 1, label: "autorisé" },
                { id: 2, label: "enCours" },
            ],
            selectedEtat: "",
            deplacements,
        };
    },
    computed: {
        etatBetter() {
            return (deplacement) => {
                if (deplacement.etat === true) {
                    return "fa-check c-nature";
                } else if (deplacement.etat === "enCours") {
                    return "fa-spinner";
                }
            };
        },
        filteredDeplacement() {
            if (this.selectedEtat === "" || this.selectedEtat == "Tout") {
                return this.deplacements;
            }
            return this.deplacements.filter((deplacement) => {
                if (this.selectedEtat === "autorisé") {
                    return deplacement.etat === true;
                } else if (this.selectedEtat === "enCours") {
                    return deplacement.etat === "enCours";
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#horsSite {
    .site-table {
        padding: 10px;
        border: 3px solid #eee;
        border-radius: 4px;
        table {
            tr {
                th,
                td {
                    padding: 10px;
                    border: 2px solid #eee;
                }
            }
        }
        .filter-container {
            cursor: pointer;
            font-size: 14px;
            line-height: 1.5;

            select {
                cursor: pointer;
                padding: 15px;
                margin-left: 15px;
                &:focus {
                    outline: none;
                    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
                    color: var(--link-hovered-color);
                }
                option {
                    border-top: 1px solid #ebebeb;
                    font-weight: 40px;
                    color: #5f6467;
                    padding: 5px;
                    background-color: #f0f0f0; /* Replace with your desired background color for all options */
                    color: #333; /* Replace with your desired text color for all options */
                }
            }
            position: relative;
            i {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                bottom: -3px;
            }
        }
    }
}
</style>
