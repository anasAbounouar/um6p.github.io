<template>
    <div>
        <SideBarView />
        <NavBarView />
        <section id="passwordchange">
            <form class="container">
                <h5 class="ms-3">Changer le mot de passe</h5>
                <div class="row ms-3 justify-content-center">
                    <div class="col-8 passwordClass p-relative">
                        <span>Ancien mot de passe</span>
                        <input
                            :type="typeField"
                            placeholder="******"
                            required
                            v-model="oldPassword"
                        />
                        <i
                            v-if="typeField == 'password'"
                            class="fa-solid fa-eye-slash"
                            @click.prevent="switchType"
                        ></i>
                        <i
                            v-else
                            class="fa-solid fa-eye"
                            @click.prevent="switchType"
                        ></i>
                    </div>
                    <div class="col-8 passwordClass">
                        <span>Nouveau mot de passe</span>
                        <input
                            :type="typeField"
                            placeholder="******"
                            required
                            v-model="newPassword"
                        />
                        <i
                            v-if="typeField == 'password'"
                            class="fa-solid fa-eye-slash"
                            @click.prevent="switchType"
                        ></i>
                        <i
                            v-else
                            class="fa-solid fa-eye"
                            @click.prevent="switchType"
                        ></i>
                    </div>
                    <div class="col-8 passwordClass">
                        <span> Confirmer le nouveau Mot de passe</span>
                        <input
                            :type="typeField"
                            placeholder="******"
                            required
                            v-model="confirmNewPassword"
                        />
                        <i
                            v-if="typeField == 'password'"
                            class="fa-solid fa-eye-slash"
                            @click.prevent="switchType"
                        ></i>
                        <i
                            v-else
                            class="fa-solid fa-eye"
                            @click.prevent="switchType"
                        ></i>
                    </div>
                    <span v-if="!isCorrect" class="d-flex col-8 c-orange"
                        >L'ancien mot de passe n'est pas correcte</span
                    >
                    <span v-if="!isMatched" class="d-flex col-8 c-orange"
                        >Saisir le meme nouveau mot de passe !</span
                    >
                    <div class="col-8 mt-3">
                        <button
                            class="btn btn-primary w-full"
                            @click.prevent="changePassword"
                        >
                            Enregister
                        </button>
                    </div>
                </div>
            </form>
        </section>
    </div>
</template>
<script>
import SideBarView from "@/components/SideBarView.vue";
import NavBarView from "@/components/NavBarView";
export default {
    name: "mypassword-page",
    components: {
        SideBarView,
        NavBarView,
    },
    data() {
        return {
            user: null,
            typeField: "password",
            isCorrect: true,
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
            isMatched: true,
        };
    },
    created() {
        const user = localStorage.getItem("user");
        if (user) {
            this.user = JSON.parse(user);
        }
    },
    methods: {
        switchType() {
            this.typeField = this.typeField == "password" ? "text" : "password";
        },
        changePassword() {
            if (
                this.user.password == this.oldPassword &&
                this.newPassword == this.confirmNewPassword
            ) {
                this.isCorrect = true;
                this.isMatched = true;
                //perform the necessarychanges
            } else if (this.user.password !== this.oldPassword) {
                this.isCorrect = false;
            } else {
                this.isMatched = false;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
#passwordchange {
    padding-left: calc(var(--sidebar-width) + 25px);
    form {
        .passwordClass {
            position: relative;
            padding: 10px;
            display: flex;
            flex-direction: column;
            span {
                display: flex;
                color: var(--label-text-color, #5f5f5f);
            }
            input {
                padding: 10px;
                border: none;
                border-radius: 4px;
                background: #e8f0fe !important;
                &:focus {
                    outline: 1px solid #eee;
                }
            }
            i {
                right: 14px;
                position: absolute;
                top: 50%;
                transform: translateY(38%);
                cursor: pointer;
            }
        }
        button {
            background: var(--submit-blue-color, #007e94);
            border: none;
            &:hover {
                background: var(--link-hovered-color);
            }
        }
    }
}
</style>
