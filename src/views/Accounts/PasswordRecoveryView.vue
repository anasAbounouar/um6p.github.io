<template>
    <div>
        <section id="password-recovery">
            <div class="container h-full">
                <div
                    class="row justify-content-center align-items-center h-full"
                >
                    <div class="col-md-10 col-lg-8 recovery p-0">
                        <div class="recovery-bar">
                            <span>Récupération de mot de passe</span>
                        </div>
                        <form action="" class="p-3">
                            <!-- Password recovery form fields -->
                            <div class="p-2">
                                <span class="d-flex mb-1"
                                    >Saisir votre email</span
                                >
                                <input
                                    type="email"
                                    placeholder="Email*"
                                    v-model="email"
                                    required
                                />
                                <span
                                    v-if="!isValidEmail"
                                    class="d-flex c-orange"
                                    >Please enter a valid email.</span
                                >
                            </div>
                            <!-- Other form fields if required -->

                            <div
                                class="d-flex justify-content-between my-3 p-2"
                            >
                                <button
                                    class="btn btn-primary"
                                    @click.prevent="recoverPassword"
                                >
                                    Réinitialiser le mot de passe
                                </button>
                                <div class="suggestion-login">
                                    <router-link to="/"
                                        >Retour à la connexion</router-link
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
import swal from "sweetalert2";
export default {
    name: "password-recovery-page",
    data() {
        return {
            email: "",
            starValidation: false,
        };
    },
    computed: {
        isValidEmail() {
            return this.starValidation
                ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
                : true;
        },
    },
    methods: {
        recoverPassword() {
            this.starValidation = true;
            // Implement the password recovery logic here
            if (this.isValidEmail) {
                // Send password recovery email or perform password reset
                // Display a success message or redirect the user to a confirmation page
                console.log(
                    "Password recovery initiated for email:",
                    this.email
                );
                swal.fire({
                    icon: "success",
                    title: "Demande de réinitialisation de mot de passe.",
                    text: "Un message a été envoyé dans votre courrier électronique.",
                    confirmButtonText: "OK",
                });
                this.email = null;
                this.starValidation = false;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#password-recovery {
    height: 100vh;
    background-image: url("@/assets/landing2.jpg");
    background-position: center;
    background-size: cover;
    .recovery {
        background-color: white;
        border-radius: 6px;
        .recovery-bar {
            background: var(--principal-color);
            padding: 10px;
            color: white;
            border-radius: 6px 6px 0px 0px;
        }
        input {
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
            &:focus {
                outline: 1px solid #777;
            }
        }
        form {
            button {
                background: var(--principal-color);
                border: none;
                &:hover {
                    background: var(--link-hovered-color, #0d6efd);
                }
            }
        }

        .suggestion-login {
            background: var(--grey-50, #ebebeb);
            padding: 5px;
            border-radius: 6px;
            a {
                color: var(--principal-color);
                &:hover {
                    color: var(--link-hovered-color);
                }
            }
        }
    }
}
</style>
