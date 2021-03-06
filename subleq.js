var fs = require('fs')

var output = ""
var input = process.argv.slice(3).map(x => parseInt(x))
var currentInput = 0

// takes an array of instructions
function subleq(instrs) {
	var data = {}
	instrs.forEach((x,i) => data[i] = x)

	function get(index) {
		if(index === -1) {
			return input[currentInput++]
		}
		return data[index] || 0
	}

	current = 0
	var running = true
	while(running) {
		var a = get(current)
		var b = get(current+1)
		var c = get(current+2)
		var computed = a - b
		if(b === -1) {
			output += String.fromCharCode(data[a])
			current += 3
		} else {
			data[b] = computed
			if(computed <= 0) {
				current = c
				if(current < 0) {
					running = false
				}
			} else {
				current += 3
			}
		}
	}
	console.log(output)
}

fs.readFile(__dirname + '/' + process.argv[2], 'utf8', function(err, contents) {
	if(err) {
		throw err
	} else {
		var splitted = contents
			.split(/\s+/)
			.filter(x => x != '')
			.map(x => parseInt(x))

		subleq(splitted)
	}
})
