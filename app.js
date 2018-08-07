const budgetController = (function() {
	const x = 23;

	const add = function(a){
		return x + a
	}

	return {
		publicTest: function(b){
			console.log(add(b));
		}
	}
})();