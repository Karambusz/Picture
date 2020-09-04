const giftTrigger = document.querySelector('.fixed-gift');

function closeModal(selector) {
    const modalWindow = document.querySelector(selector);
    modalWindow.style.display = "none";
    document.body.style.overflow = "";
    document.body.style.marginRight = `0px`;
    giftTrigger.style.right = '';
    //document.body.classList.remove("modal-open"); // use class from bootstrap.css
}


const modals = () => {

    const scrollWidth = calcScroll();
    let btnPressed = false;


    function openModal(selector) {
        const modalWindow = document.querySelector(selector);
        modalWindow.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scrollWidth}px`;
        giftTrigger.style.right = `${(+getComputedStyle(giftTrigger).right.replace(/\D/g, '') + calcScroll())}px`;
        btnPressed = true;
        //document.body.classList.add("modal-open"); // use class from bootstrap.css
        clearInterval(timerId);
    }


    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            windows = document.querySelectorAll("[data-modal]");


        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });
                openModal(modalSelector);
            });

        });

        close.addEventListener('click', () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
            closeModal(modalSelector);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                });
                closeModal(modalSelector);
            }
        });
    }

    function showModalByTime(selector, time) {
        return setTimeout(() => {
            openModal(selector);
        }, time);
    }

    function calcScroll() {
        let div = document.createElement("div");

        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";


        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function showModalByScroll() {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight > scrollHeight - 1) {
                openModal('.popup-gift');
                giftTrigger.remove();
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    showModalByScroll();

    const timerId = showModalByTime(".popup-consultation", 60000);

};



export default modals;
export {
    closeModal
};