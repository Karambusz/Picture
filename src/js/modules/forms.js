// import checkNumInputs from "./checkNumInputs";
import {postData} from "../services/requests";
const forms = (state) => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        upload = document.querySelectorAll('[name="upload"]');


        inputs.forEach(item => {
            if(item.getAttribute('name') === 'upload') {
                item.setAttribute('required', '');
            }
        });


    const message = {
        loading: 'Идет отправка...',
        success: 'Отправлено! Скоро с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };


    upload.forEach(item => {
        item.addEventListener('input', ()=> {
            let dots;
            const tmp = item.files[0].name.split('.');
            tmp[0].length > 11 ? dots = "..." : dots = ".";
            const name =  tmp[0].substring(0, 11) + dots + tmp[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener("submit", (e) => {
            e.preventDefault();

            let statusMessage = document.createElement("div");
            statusMessage.classList.add("status");
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');

            setTimeout(() => {
                item.style.display = "none";
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            const formData = new FormData(item);

            if (item.getAttribute("data-calc") === "") {
                for(let key in state) {
                    formData.append(key, state[key]);
                }
            }

            let api;
            item.closest('.popup-design') || item.classList.contains("calc_form") ? api = path.designer : api = path.question;
            console.log(api);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.innerHTML = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.innerHTML = message.failure;
                })
                .finally(() => {
                    console.log(item);
                    item.reset();
                    upload.forEach(item => {
                        item.previousElementSibling.textContent = "Файл не выбран"; 
                    });

                    if(state) {                       
                        for(let key in state) {
                            delete state[key];
                        }
                        const resultBlock = document.querySelector(".calc-price");
                        resultBlock.textContent = "Для расчета нужно выбрать размер картины и материал картины";
                        console.log(state); 
                    }

                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeIn');
                    }, 3000);
                });

        });
    });

};

export default forms;