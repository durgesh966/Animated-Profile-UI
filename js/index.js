// Animation setup
document.addEventListener('DOMContentLoaded', () => {
    particleground(document.getElementById('animations'), {
        dotColor: '#1E90FF',
        lineColor: '#E0FFFF'
    });

    // Centering the main_body element vertically
    const intro = document.getElementById('main_body');
    intro.style.marginTop = `-${intro.offsetHeight / 2}px`;
});

class TextSwitcher {
    constructor(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = "";
        this.tick();
        this.isDeleting = false;
    }

    tick() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;

        const that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) {
            delta /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === "") {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => {
            that.tick();
        }, delta);
    }
}

window.onload = () => {
    const elements = document.getElementsByClassName("text-switcher");
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute("data-switch-content");
        const period = elements[i].getAttribute("data-hold-time");
        if (toRotate) {
            new TextSwitcher(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    const css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".text-switcher > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};
