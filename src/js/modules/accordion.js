const accordion = (triggerSelector, itemsSelector)=> {
    const btns = document.querySelectorAll(triggerSelector),
        blocks = document.querySelectorAll(itemsSelector);

    blocks.forEach(block => {
        block.classList.add("animated", "flipInX");
    });

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                btns.forEach(item => {
                    item.classList.remove('active', 'active-style');
                });
                this.classList.add('active', 'active-style');
            }
        });
    });
};

export default accordion;