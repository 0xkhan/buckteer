function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}

function testRenderModalGoal({ data }) {
    const elem = document.querySelector('[data-elem-id="form-goal"] .modal-form__label');

    elem.children[0].innerHTML = data.dataArray[0].icon;
    elem.children[1].innerHTML = data.dataArray[0].name;

    console.assert(elem.children[0].innerHTML === data.dataArray[0].icon, 'Render icon');
    console.assert(elem.children[1].innerHTML === data.dataArray[0].name, 'Render name');
}

// Test for rendering the whole modal
function testFullRenderModalGoal({ data }) {
    const elem = document.querySelector('[data-elem-id="form-goal"]');

    const chevron = data.commonChevron;
    elem.innerHTML = '';

    data.dataArray.forEach((data) => {
        const markup = `
            <div class="modal-form__extras-group">
                <a href="#" data-submodal-trigger="goal-activity">
                    <label class="modal-form__label" for="">
                        <span class="modal-form__label-icon">
                            ${data.icon}
                        </span>
                        <span class="modal-form__label-text" data-submodal-viewValue="goal-activity">
                            ${data.name}
                        </span>
                        <span class="modal-form__label-chevron">
                            ${chevron}
                        </span>
                    </label>
                </a>
                <input id="list-cat" data-submodal-inputValue="goal-activity" class="modal-form__input modal-form__input--cat" type="hidden" >
            </div>
        `;
        elem.insertAdjacentHTML('beforeend', markup);
    });

    const icons = qsa('[data-elem-id="form-goal"] .modal-form__label-icon');
    const names = qsa('[data-elem-id="form-goal"] .modal-form__label-text');
    const chevrons = qsa('[data-elem-id="form-goal"] .modal-form__label-chevron');


    data.dataArray.forEach((data, i) => {
        console.assert(icons[i].innerHTML.trim() === data.icon, 'Render Icon');
        console.assert(names[i].innerHTML.trim() === data.name, 'Render Name');
        console.assert(chevrons[i].innerHTML.trim() === chevron, 'Render Chevron');
    });
}

const testData = {
    dataArray: [
        {
            icon: "<svg></svg>",
            name: "Activity"
        },
        {
            icon: "<svg></svg>",
            name: "Location"
        }
    ],
    commonChevron: '<svg>Chevron</svg>'
};

testRenderModalGoal({ data: testData });
testFullRenderModalGoal({ data: testData });
