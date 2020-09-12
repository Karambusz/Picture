import {postData} from "../services/requests";

const drop = ()=> {
    // drag *
    // dragend *
    // dragenter - A dragged element or text selection enters a valid drop target.
    // dragexit *
    // dragleave - A dragged element or text selection leaves a valid drop target.
    // dragover - 	An element or text selection is being dragged over a valid drop target
    // dragstart *
    // drop - 	An element is dropped on a valid drop target.

    const fileInputs = document.querySelectorAll('[name ="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDafaults, false);
        });
    });

    function preventDafaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest(".file_upload").style.border = "5px solid yellow";
        item.closest(".file_upload").style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unhighlight(item) {
        item.closest(".file_upload").style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else if (item.closest('#block')) {
            item.closest('.file_upload').style.backgroundColor = "#f7e7e6";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, ()=> highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, ()=> unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e)=> {
            input.files = e.dataTransfer.files;

            
            let formData = new FormData();
            formData.append('file', input.files[0]);
            postData('assets/server.php', formData)
            .then(res => {
                console.log(res);
            });

            let dots;
            const tmp = input.files[0].name.split('.');
            tmp[0].length > 11 ? dots = "..." : dots = ".";
            const name =  tmp[0].substring(0, 11) + dots + tmp[1];
            input.previousElementSibling.textContent = name;
        });
    });

};

export default drop;