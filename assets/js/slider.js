
 $('#weightSlider').on('click', function(e) {
    $('#weightSlider')
        .parent()
        .find(' >.card')
        .toggleClass()
        .find('input')
        .slider('relayout');
    e.preventDefault();
});

function toggleWeightSlider() {
    var slider = document.getElementById('weightSlider');
    console.log(slider);
    slider.disable();
    // console.log(slider.style.display);
    // if (slider.style.display === "none") {
    //     slider.style.display = "block";
    // } else {
    //     slider.style.display = "none";
    // }
    // console.log(slider.style.display);
}

function setWeight() {
    width = document.getElementById('weightSlider').getAttribute('value');
}