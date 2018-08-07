const budgetController = (function() {
	const x = 23;
	const add = function(a){
		return x + a
	}

	return {
		publicTest: function(b){
			return add(b);
		}
	}
})();
// this gets called right away bc of line 13
// works because of closure. inner function always has access to variables even after return statement


const UIController = (function() {

	// some code

})();

const controller = (function(budgetCtrl, UICtrl) {

	const z = budgetCtrl.publicTest(5);

	return {
		anotherPublic: function(){
			console.log(z);
		}
	}

})(budgetController, UIController);