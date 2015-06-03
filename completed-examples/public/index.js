$(function(){
	function getColorQueue(){
		$.ajax({
			url: '/colorQueue',
			dataType: 'json',
			success: function(result){
				console.log(result);
				$('.onDisplay').html('');
				for(var i = 0; i < 4; i++){
					var newColor = result.colorsOnDisplay[i];
					$('<div></div>')
						.css('background-color', 'rgb(' + newColor[0] + ', ' + newColor[1] + ', ' + newColor[2] + ')')
						.css('height', '50px')
						.css('width', '50px')
						.css('display', 'inline-block')
						.appendTo('.onDisplay');
				}
				$('.inQueue').html('');
				for(var i = 0; i < result.colorsQueued.length; i++){
					var newColor = result.colorsQueued[i];
					$('<div></div>')
						.css('background-color', 'rgb(' + newColor[0] + ', ' + newColor[1] + ', ' + newColor[2] + ')')
						.css('height', '50px')
						.css('width', '50px')
						.css('display', 'inline-block')
						.appendTo('.inQueue');
				}
			},
			error: function(err){
				console.log(err);
			}
		})
	}

	getColorQueue();

	setInterval(getColorQueue, 5000);
})
