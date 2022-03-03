export class login extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.getTemplate();
    this.init();
  }

  getTemplate() {
    return `
        <style> @import "components/login/styles.css"; </style>
        <div class="login-content">
            <form>
                <div>
                    <img src="./images/logo.png">
                </div>
                <h1>Create new player</h1>
                <div>
                    <custom-input myname="name" mylabel="Type your name" isRequeired="true"></custom-input>
                </div>
                <div>
                    <custom-button myname="game" mytext="JOIN" issubmit=true></custom-button>
                </div>
            </form>
            <div>
                <custom-button myname="ranking" mytext="Ranking"></custom-button>
            </div>
        </div>
        `;
  }

  init() {
    const form = this.querySelector("form");

    form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const data = {};
      const input = this.querySelector(".form-control");
      let value = input.value;

      if (value) {
        const idCreated = createUser(value);
        router.push("game", `id=${idCreated}`);
      } else {
        alert("You must enter a name.");
      }
    });
  }
}

window.customElements.define("login-app", login);
