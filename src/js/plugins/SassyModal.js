export default class SassyModal {

    constructor(config) {
        this.animations = ['fade-in', 'fade-out'];
        this.dataAttributes = {
            trigger: 'data-modal-trigger',
            closer: 'data-modal-close',
            id: 'data-modal-id'
        }

        this.options = {
            blur: true,
            centered: true,
            showModalCSS: 'show-modal',
            animation: this.animations[0],
            dataAttributes: this.dataAttributes
        }

        if (typeof config === 'object') {
            this.options = { ...this.options, ...config };
        }

        // Extract data attributes from options object
        this.triggerDataAtt = this.options.dataAttributes.trigger;
        this.closerDataAtt = this.options.dataAttributes.closer;
        this.modalDataAtt = this.options.dataAttributes.id;

        this.currentModal = '';

        this.init();
    }

    init() {
        this.setTriggers();
        this.setClosers();
        this.setClasses();
    }

    setTriggers() {
        const triggers = document.querySelectorAll(`[${this.triggerDataAtt}]`);

        if (triggers.length > 0) {
            triggers.forEach((trigger) => {
                trigger.addEventListener('click', (event) => {
                    event.preventDefault();
                    const modalID = event.target.getAttribute(`${this.triggerDataAtt}`);
                    this.openModal({ modalID: modalID });
                });
            });
        }
    }

    setClosers() {
        const modals = document.querySelectorAll(`[${this.modalDataAtt}]`);
        const closeBtns = document.querySelectorAll(`[${this.closerDataAtt}]`);

        if (modals.length > 0) {
            modals.forEach((modal) => {
                modal.querySelector('.modal__backdrop')
                    .addEventListener('click', (event) => {
                        this.closeModal({
                            modalID: event.target.parentElement.getAttribute(`${this.modalDataAtt}`)
                        });
                    });
            });
        }

        if (closeBtns.length > 0) {
            closeBtns.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const modalID = event.target.getAttribute(`${this.closerDataAtt}`);
                    this.closeModal({ modalID: modalID });
                });
            });
        }
    }

    setClasses() {
        const modals = document.querySelectorAll(`[${this.modalDataAtt}]`);

        if (modals.length > 0) {
            modals.forEach((modal) => {
                modal.classList.add(...this.calculateClasses());
            });
        }
    }

    openModal({ modalID }) {
        const modal = document.querySelector(`[${this.modalDataAtt}=${modalID}]`);

        // Check if any modal is open before we open another modal
        if (this.currentModal.length > 0) {
            this.closeModal({ modalID: this.currentModal });
        }

        this.handleCustomEvents({ type: 'before_open', modal });
        modal.classList.add(this.options.showModalCSS);
        this.currentModal = modalID;
        this.handleCustomEvents({ type: 'after_open', modal });
    }

    closeModal({ modalID }) {
        const modal = document.querySelector(`[${this.modalDataAtt}=${modalID}]`);

        this.handleCustomEvents({ type: 'before_close', modal });
        modal.classList.remove(this.options.showModalCSS);
        this.currentModal = '';
        this.handleCustomEvents({ type: 'after_close', modal });
    }

    handleCustomEvents({ type, modal }) {
        const event = new CustomEvent(type, { bubbles: true, detail: modal });
        modal.dispatchEvent(event);
    }

    calculateClasses() {
        const cssClasses = [];

        if (this.options.centered) {
            cssClasses.push('modal-centered');
        }

        if (this.options.blur) {
            cssClasses.push('modal-blur');
        }

        if(this.isValidAnimation(this.options.animation)) {
            cssClasses.push(this.options.animation);
        } else {
            cssClasses.push(this.animations[0]);
        }

        return cssClasses;
    }

    isValidAnimation(animation) {
        return this.animations.includes(animation);
    }

}
