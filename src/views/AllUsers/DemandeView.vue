<template>
    <div>
        <section id="demande">
            <div class="container">
                <div class="mt-3 row justify-content-center align-items-center">
                    <div class="col-10 demandes-wrapper">
                        <div data-aos="fade-right">
                            <div
                                class="demande-wrapper"
                                @click.prevent="goToPage('absence')"
                            >
                                <h5>Autorisation d’absence</h5>
                            </div>
                        </div>
                        <div data-aos="fade-left">
                            <div
                                class="demande-wrapper"
                                @click.prevent="goToPage('presence')"
                            >
                                <h5>Autorisartion de présence</h5>
                            </div>
                        </div>
                    </div>
                    .
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name: "demandes-page",
    methods: {
        goToPage(page) {
            switch (page) {
                case "presence":
                    this.$router.push({
                        name: "demande-details",
                        params: { type: "presence" },
                    });
                    break;
                case "absence":
                    this.$router.push({
                        name: "demande-details",
                        params: { type: "absence" },
                    });
                    break;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
section {
    padding-left: calc(var(--sidebar-width) + 25px);
}
#demande {
    min-height: 500px;
    display: flex;
    align-items: center;
    .demandes-wrapper {
        border-radius: 3px;
        background: var(--secondary-grey2-color);
        > div {
            padding: 10px;
        }
    }
    .demande-wrapper {
        border-radius: 3px;
        transition: 0.3s;
        cursor: pointer;
        background: var(--nature-color);
        padding: 10px;
        &:hover {
            color: white;
            background: var(--link-hovered-color);
        }
    }
}
</style>
