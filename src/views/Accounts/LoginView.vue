<template>
    <div>
        <div id="login" class="p-relative">
            <div class="left p-relative">
                <h4 class="">Bienvenue à la ferme</h4>
            </div>
            <div class="right p-relative">
                <h4 class="">Experimentale de L'UM6P</h4>
                <form class="container">
                    <h5 class="ms-3">S'identifier</h5>
                    <div class="row ms-3 justify-content-center">
                        <div class="col-8 emailClass p-relative">
                            <span>Email</span>
                            <input
                                type="email"
                                placeholder="Address email"
                                required
                                v-model="email"
                            />
                        </div>
                        <div class="col-8 passwordClass">
                            <span>Mot de passe</span>
                            <input
                                :type="typeField"
                                placeholder="Mot de passe"
                                required
                                v-model="password"
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
                            >Une donnee est erronée. Essayez de nouveau</span
                        >
                        <div
                            class="col-8 d-flex align-items-center"
                            @click.prevent="ChangeisRemembered"
                        >
                            <i
                                v-if="isRemembered"
                                class="fa-solid fa-square-check me-3"
                            ></i>
                            <i v-else class="fa-regular fa-square me-3"></i>
                            <span>Se souvenir de moi</span>
                        </div>
                        <div class="col-8 mt-3">
                            <button
                                class="btn btn-primary w-full"
                                @click.prevent="loginUser"
                            >
                                S'identifier
                            </button>
                        </div>
                        <div class="col-8 mt-2 inscription">
                            <p>
                                Vous n'avez pas de compte ?
                                <router-link to="/SignUp"
                                    >Inscrivez Vous</router-link
                                >
                            </p>
                            <p>
                                <router-link to="/PasswordRecovery"
                                    >Avez vous oublié votre mot de passe
                                    ?</router-link
                                >
                            </p>
                        </div>
                        <!-- <router-link to="/MyProfile">My profile</router-link> -->
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import users from "@/Js/accounts.js";
export default {
    name: "login-page",
    data() {
        return {
            typeField: "password",
            isRemembered: false,
            isCorrect: true,
            email: "",
            password: "",
        };
    },
    methods: {
        switchType() {
            this.typeField = this.typeField == "password" ? "text" : "password";
        },
        ChangeisRemembered() {
            this.isRemembered = !this.isRemembered;
        },
        loginUser() {
            const user = users.find(
                (user) =>
                    user.email == this.email && user.password == this.password
            );
            if (user) {
                // this pushing way is a good one with params {user}
                // this.$router.push({ name: "myprofile-page", params: { user } });
                console.log("the user is logged in", user);
                localStorage.setItem("user", JSON.stringify(user));
                if (user.poste === "admin") {
                    this.$router.push({ name: "dashboard-page" });
                } else {
                    this.$router.push({ name: "myprofile-page" });
                }
            } else {
                this.isCorrect = false;
            }
        },
    },
};
</script>
<style lang="scss" scoped>
#login {
    height: 100vh;
    display: grid;
    grid-template-columns: 40% 60%;
    .left {
        background-color: var(--brand-color);
        background-image: url("@/assets/landing2.jpg");
        background-position: center;
        background-size: cover;
        h4 {
            text-transform: uppercase;
            position: absolute;
            right: 6px;
            color: white;
            top: 15px;
        }
    }
    .right {
        background: var(--secondary-grey-color, #a8a8a8);

        h4 {
            text-transform: uppercase;
            position: absolute;
            left: 6px;
            color: var(--grayscale-gray-dark, #4b506d);

            top: 15px;
        }
        .container {
            margin-top: 70px;
        }
        form {
            .emailClass,
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
                    &:focus {
                        outline: none;
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
            .inscription {
                color: black;
                a {
                    color: var(--submit-blue-color);
                    &:hover {
                        color: var(--link-hovered-color);
                    }
                }
            }
        }
        img {
            max-height: 120px;
        }
    }
}
</style>
