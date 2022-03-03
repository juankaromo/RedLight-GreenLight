export class game extends HTMLElement {
    connectedCallback() {
        this.innerHTML = this.getTemplate();
        this.init();
        this.render();
    }

    getTemplate() {
        return `
        <style> @import "components/game/styles.css"; </style>       
        <div class="game-header"></div>
        <div class="game-content">
            <h1>Highscore</h1>
            <div class="highscore"></div>
            <div class="light-content">
                <div class="light"></div>
            </div>
            <h1>Score</h1>
            <div class="score"></div>
            <div class="buttons">
                <custom-button id="left" myname="left" mytext="👣 LEFT" iscustom=true> </custom-button>
                <custom-button id="right" myname="right" mytext="👣 RIGHT" iscustom=true> </custom-button>
            </div>
        </div>
        `;
    }

    init() {
        var url = new URL(window.location.href.replace('#', ''));
        const urlParams = new URLSearchParams(url.search);
        const userName = urlParams.get('id');
        this.game = getUser(userName);
        if (!this.game) {
            router.push("home");
        }
        this.$header = this.querySelector(".game-header");
        this.$highscore = this.querySelector(".highscore");
        this.$score = this.querySelector(".score");
        this.$light = this.querySelector(".light");

        this.redLigth = getRedLigthDuration();
        this.lastBtn = '';
        this.gameTimeout;

        this.song = new Audio('../audio/song.mp3');
        this.songDuration = 12500;
    }

    render() {
        this.$header.innerHTML = `
            <h2><custom-link mytext="‹" mylink="home"></custom-link> Hello ${this.game.user}!</h2>
        `;
        this.$highscore.innerHTML = `<h2>${this.game.highscore}</h2>`;
        this.$score.innerHTML = `<h2>${this.game.score}</h2>`;
        this.$leftBtn = this.querySelector("#left");
        this.$rightBtn = this.querySelector("#right");

        this.$leftBtn.addEventListener('click', () => { this.engine("left"); });
        this.$rightBtn.addEventListener('click', () => { this.engine("rigth"); });

        this.timer = () => { this.changeLight(); }
        this.changeLight();
    }

    engine(btn) {
        if (this.lightIsRed) {
            if (this.game.score > this.game.highscore) {
                this.game.highscore = this.game.score;
            }
            this.game.score = 0;
            this.lastBtn = '';
        } else {
            if (btn != this.lastBtn) {
                this.game.score++;
            } else {
                if (this.game.score > 0) {
                    this.game.score--;
                    if (window.navigator && window.navigator.vibrate) {
                        window.navigator.vibrate(100);
                     }
                }
            }
            this.lastBtn = btn;
        }
        this.$score.innerHTML = `<h2>${this.game.score}</h2>`;
        this.$highscore.innerHTML = `<h2>${this.game.highscore}</h2>`;
        updateUser(this.game);
    }

    changeLight() {
        let greenLight;
        if (!this.lightIsRed) {
            this.lightIsRed = true;
        } else {
            greenLight = Math.max(10000 - this.game.score * 100, 2000) + Math.floor(Math.random() * (1500 - (-1500) + 1) + (-1500))
            this.lightIsRed = !this.lightIsRed;
        }
        this.lightTime = this.lightIsRed ? this.redLigth : greenLight;
        console.log(this.lightTime)
        clearTimeout(this.gameTimeout);
        this.gameTimeout = setTimeout(this.timer, this.lightTime);

        this.$light.classList.remove(this.lightIsRed ? 'green' : 'red');
        this.$light.classList.add(this.lightIsRed ? 'red' : 'green');

        if (!this.lightIsRed) {
            const rate = this.songDuration / this.lightTime;
            this.song.playbackRate = rate;
            this.song.play();
        } else {
            this.song.pause();
            this.song.currentTime = 0;
        }
    }

    disconnectedCallback() {
        clearTimeout(this.gameTimeout);
        this.song.pause();
        this.song.currentTime = 0;
    }
}
window.customElements.define("game-app", game);
