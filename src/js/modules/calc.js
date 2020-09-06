const calc = (size, material, options, promocode, result, calcRes) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

    let sum = 0;

    function calcFunc(event, elem, prop){
        elem.addEventListener(event, ()=> {
            sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

            if (sizeBlock.value == '' || materialBlock.value == '') {
                resultBlock.textContent = "Пожалуйста, выберите размер и материал картины";
                calcRes.total = resultBlock.textContent;
            } else if (promocodeBlock.value === 'IWANTPOPART') {
                resultBlock.textContent = Math.round(sum * 0.7);
                calcRes.total = resultBlock.textContent;
            } else {
                resultBlock.textContent = sum;
                calcRes.total = resultBlock.textContent;
            }

            calcRes[prop] = elem.value;
        });
    }

    calcFunc('change', sizeBlock, "size");
    calcFunc('change', materialBlock, "material");
    calcFunc('change', optionsBlock, "options");
    calcFunc('input', promocodeBlock, "promocode");

};

export default calc;



