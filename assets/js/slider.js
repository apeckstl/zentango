// for nice scale slider
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
	// toggle visibility of scale on button press
	var slider = document.getElementById('weightSlider');
	if (slider.style.display === "none") {
		slider.style.display = "block";
	} else {
		slider.style.display = "none";
	}
}

function setWeight() {
	// sets width of draw tool based on scale's value
    width = document.getElementById('weightSlider2').getAttribute('value');
}

$(document).ready(function() {
	// set height and display settings for scale
	var slider = document.getElementById('weightSlider');
	slider.style.height = "150px";
	slider.style.display = "none";
});
