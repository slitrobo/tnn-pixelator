var Jimp = require('jimp');

	Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  		return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
	}

module.exports = function (refName, saveName, divisions) {

	Jimp.read(refName, function (err, ref) {
	    if (err) throw err;

	    var pixels = ref.bitmap.data;
	    console.log(refName+' is loaded');

	    var divX = Math.floor(ref.bitmap.width/divisions);
	    var divY = Math.floor(ref.bitmap.height/divisions);

		var image = new Jimp(divX*divisions, divY*divisions, function (err,img) {

			console.log('Rendering '+saveName+'...');

			for (var dx = 0; dx < divisions; dx++) {
				for (var dy = 0; dy < divisions; dy++) {

					var cellColor = Jimp.intToRGBA(ref.getPixelColor(dx * divX + divX/2, dy * divY + divY/2));
					var nextCellColor;

					if (((dy + 1) * divY + divY/2) < img.bitmap.height) {

						nextCellColor = Jimp.intToRGBA(ref.getPixelColor(dx * divX + divX/2, (dy + 1) * divY));

					} else {

						nextCellColor = cellColor;

					}

					for (var y = 0; y < divY; y++) {

						var rowColor = {
							r: parseInt(y.map(0,divY, cellColor.r, nextCellColor.r)),
							g: parseInt(y.map(0,divY, cellColor.g, nextCellColor.g)),
							b: parseInt(y.map(0,divY, cellColor.b, nextCellColor.b)),
							a: 255
						}

						for (var x = 0; x < divX; x++) {

							img.setPixelColor(Jimp.rgbaToInt(rowColor.r,rowColor.g,rowColor.b,rowColor.a), dx * divX + x, dy * divY + y);

						}
					}
				}
			}

			img.write(saveName);

			console.log('Image file at '+refName+' saved to '+saveName);
			
		})
	});
}