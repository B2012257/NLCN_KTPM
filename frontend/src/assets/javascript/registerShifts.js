function operationTimeInput(checkbox) {
    var timeInputs = checkbox.parentNode.parentNode.getElementsByTagName('input');

    for (var i = 0; i < timeInputs.length; i++) {
        if (timeInputs[i].type === 'time') {
            if (checkbox.checked) {
                timeInputs[i].removeAttribute('disabled');
            } else {
                timeInputs[i].setAttribute('disabled', 'disabled');
            }
        }
    }
}


