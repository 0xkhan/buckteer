export default class CtrlView {

    constructor(config) {
        this.options = {
            activateElemCSS: 'activate__elem',
            trigger: 'data-elem-trigger',
            id: 'data-elem-id'
        }

        if (typeof config === 'object') {
            this.options = { ...this.options, ...config };
        }

        // Extract data attributes from options object
        this.activate = this.options.activateElemCSS;
        this.triggerDataAtt = this.options.trigger;
        this.elemDataAtt = this.options.id;

        this.currentElem = '';

        this.init();
    }

    init() {
        this.setTriggers();
    }

    setTriggers() {
        const triggers = document.querySelectorAll(`[${this.triggerDataAtt}]`);

        if (triggers.length > 0) {

            const firstElemID = triggers[0].getAttribute(this.triggerDataAtt);
            this.activateElem({ elemID: firstElemID });

            triggers.forEach((trigger) => {
                trigger.addEventListener('click', (event) => {
                    event.preventDefault();
                    const elemID = event.target.getAttribute(`${this.triggerDataAtt}`);
                    this.activateElem({ elemID: elemID });
                })
            });
        }
    }

    activateElem({ elemID }) {
        const elem = document.querySelector(`[${this.elemDataAtt}=${elemID}]`);

        if (this.currentElem.length > 0) {
            this.deactivateElem({ elemID: this.currentElem });
        }

        elem.classList.add(this.activate);
        this.currentElem = elemID;
    }

    deactivateElem({ elemID }) {
        const elem = document.querySelector(`[${this.elemDataAtt}=${elemID}]`);
        elem.classList.remove(this.activate);
        this.currentElem = '';
    }

}
