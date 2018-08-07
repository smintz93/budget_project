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
// this gets called right away bc of line 13
// works because of closure. inner function always has access to variables even after return statement


const UIController = (function() {

	// some code

})();

const dataController = (function() {

	// some code 
})();