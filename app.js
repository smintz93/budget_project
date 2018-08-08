
// BUDGET CONTROLLER 
const budgetController = (function() {


})();
// this gets called right away bc of line 13
// works because of closure. inner function always has access to variables even after return statement


// UI CONTROLLER 
const UIController = (function() {

	// some code

})();

// GLOBAL APP CONTROLLER 
const controller = (function(budgetCtrl, UICtrl) {

	document.querySelector(".add__btn").addEventListener("click", function(){
		
	})

})(budgetController, UIController);