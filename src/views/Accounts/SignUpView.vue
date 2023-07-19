<template>
    <div>
        <section id="signup">
            <div class="container">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-10 col-lg-8 inscription p-0">
                        <div class="inscription-bar">
                            <span>Inscription</span>
                        </div>
                        <form action="" class="p-3">
                            <div class="nomPrenom p-2">
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nom*"
                                        required
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Prenom*"
                                        required
                                    />
                                </div>
                            </div>
                            <div class="p-2">
                                <input
                                    type="text"
                                    placeholder="Numero de telephone*"
                                    v-model="telephone"
                                    required
                                />
                                <span
                                    v-if="!isValidTelephone"
                                    class="d-flex c-orange"
                                    >Écrire un numéro de téléphone comportant 10
                                    chiffres</span
                                >
                            </div>
                            <div class="p-2">
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    v-model="email"
                                    required
                                />
                                <span
                                    v-if="!isValidEmail"
                                    class="d-flex c-orange"
                                    >Écrire un email</span
                                >
                            </div>
                            <div class="p-2 p-relative">
                                <div class="p-relative">
                                    <input
                                        :type="typeField"
                                        placeholder="Mot de passe*"
                                        v-model="password"
                                        required
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
                                <span
                                    v-if="!isValidPassword"
                                    class="d-flex c-orange"
                                    >Écrire un mot de passe avec au moins 6
                                    caractères.</span
                                >
                            </div>
                            <div class="p-2 p-relative">
                                <input
                                    :type="typeField"
                                    placeholder=" Confirmer le Mot de passe*"
                                    v-model="confirmPassword"
                                    required
                                />
                                <span
                                    v-if="!isSamePassword"
                                    class="d-flex c-orange"
                                    >Les 2 mots de passes sont differents
                                    !</span
                                >
                            </div>
                            <div
                                class="d-flex justify-content-between my-3 p-2"
                            >
                                <button
                                    class="btn btn-primary"
                                    @click.prevent="register"
                                >
                                    S'inscrire
                                </button>
                                <div class="suggestion-login">
                                    <router-link to="/"
                                        >Vous Avez deja un compte ?</router-link
                                    >
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
    name: "signup-page",
    data() {
        return {
            typeField: "password",
            telephone: "",
            starValidation: false,
            password: "",
            confirmPassword: "",
            email: "",
        };
    },
    computed: {
        isValidTelephone() {
            return this.starValidation ? /^\d{10}$/.test(this.telephone) : true;
        },
        isValidEmail() {
            return this.starValidation
                ? // eslint-disable-next-line no-useless-escape
                  this.email.length > 0
                : true;
        },
        isValidPassword() {
            return this.starValidation ? this.password.length >= 6 : true;
        },
        isSamePassword() {
            return this.starValidation
                ? this.password === this.confirmPassword
                : true;
        },
    },
    methods: {
        switchType() {
            this.typeField =
                this.typeField === "password" ? "text" : "password";
        },
        register() {
            this.starValidation = true;
            if (
                this.isValidEmail &&
                this.isValidPassword &&
                this.isSamePassword
            ) {
                Swal.fire({
                    icon: "success",
                    title: "Demande envoyée",
                    text: "Ta demande est bien envoyée a l'admin pour l'approuver. Un email sera envoyé dans le cas de succes",
                    confirmButtonText: "OK",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#signup {
    min-height: 100vh;
    background-image: url("@/assets/landing2.jpg");
    background-position: center;
    background-size: cover;
    .inscription {
        background: white;
        border-radius: 5.225px;
        .inscription-bar {
            border-radius: 5.225px 5.225px 0px 0px;
            background: var(--principal-color);
            padding: 10px;
            span {
                color: white;
                font-size: 15.675px;
            }
        }
        .nomPrenom {
            display: grid;
            grid-template-columns: 49% 49%;
            justify-content: space-between;
        }
        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            &::placeholder {
                color: #4b506d;
            }
            &:focus {
                outline: 1px solid #eee;
            }
        }
        button {
            background: var(--principal-color);
            border: none;
            &:hover {
                background: var(--link-hovered-color, #0d6efd);
            }
        }
        .suggestion-login {
            background-color: var(--grey-50, #ebebeb);
            padding: 5px;
            border-radius: 6px;
            transition: 0.3s;
            a {
                color: #4b506d;
            }

            &:hover {
                background: var(--link-hovered-color);
                a {
                    color: white;
                }
            }
        }
        i {
            right: 15px;
            position: absolute;
            top: 50%;
            transform: translateY(-60%);
            cursor: pointer;
        }
    }
}
</style>
