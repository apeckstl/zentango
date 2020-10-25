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
	var offset = document.getElementById('canvas-col');
	if (slider.style.display === "none") {
		offset.style.marginRight = "87px";
		slider.style.display = "block";
	} else {
		offset.style.marginRight = "4rem";
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
	slider.style.height = "135px";
	slider.style.display = "none";
	slider.style.float = "left";
	slider.style.marginRight = "3px";
	slider.style.marginTop = "1px";
});
