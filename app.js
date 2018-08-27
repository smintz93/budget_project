
// BUDGET CONTROLLER 
const budgetController = (function() {

	const Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};

	Expense.prototype.calcPercentage = function(totalIncome){
		if(totalIncome > 0) {
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	};

	// so each function has one specific task
	Expense.prototype.getPercentage = function(){
		return this.percentage;
	};

	const Income = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	const data = {
		 allItems: {
		 	exp: [],
		 	inc:[]
		 },
		 totals: {
		 	exp: 0,
		 	inc: 0
		 },
		 budget: 0,
		 percentage: -1
	};

	const calculateTotal = function(type){
		let sum = 0; 
		data.allItems[type].forEach(function(current){
			sum += current.value;
		});

		data.totals[type] = sum;

	
	}

	return {
		addItem: function(type, des, val){
			let newItem, ID
				

			// ID = last ID + 1
			// length - 1 
			// want the next id so + 1 

			// Create new ID
			if(data.allItems[type].length > 0){
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0
			}
			

			// Create new item based on 'inc' or 'exp' type 
			if(type === 'exp'){
				newItem = new Expense(ID, des, val)
			} else if(type === 'inc') {
				newItem = new Income(ID, des, val)
			}
			// Push new item into array. [type] is always going to be exp or inc
			data.allItems[type].push(newItem)

			return newItem;

		},

		deleteItem: function(type, id){
			// map returns brand new array.
			const ids = data.allItems[type].map(function(current){
				return current.id
			});

			const index = ids.indexOf(id);

			// delete item from array

			if(index !== -1){
				data.allItems[type].splice(index, 1);
			}

		},
		calculateBudget: function(){

			// calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');

			// calculate budget: income - expenses 
			data.budget = data.totals.inc - data.totals.exp;

			// calculate % of income 
			if(data.totals.inc > 0){
				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},

		calculatePercentages: function(){
			data.allItems.exp.forEach(function(current) {
				// calc perctange for each current item in the array
				current.calcPercentage(data.totals.inc);
			});
		},

		getPercentages: function(){
			const allPerc = data.allItems.exp.map(function(current) {
				return current.getPercentage();
			})
			return allPerc;
		},

		getBudget: function(){
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		}
	};

})();



// UI CONTROLLER 
const UIController = (function() {

	const DOMstrings = {
		inputType: ".add__type",
		inputDescription: ".add__description",
		inputValue: ".add__value",
		addBtn: ".add__btn",
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		expensesLabel: '.budget__expenses--value',
		incomeLabel: '.budget__income--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container',
		expensesPercLabel: '.item__percentage',
		dateLabel: '.budget__title--month'
	}

	const formatNumber = function(num, type) {
			let numSplit, int, dec;
			//+ or - before num
			//exactly two dec points, and common separting 1000s
			// overwriting paramater num
			num = Math.abs(num)
			num = num.toFixed(2)
			// now a string
			numSplit = num.split('.')

			int = numSplit[0];
			if(int.length > 3) {
				int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);			} 


			dec = numSplit[1];

			return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

		}

	return {
		getInput: function(){
			return {
			 type: document.querySelector(DOMstrings.inputType).value, // Either inc or exp. 
			 description: document.querySelector(DOMstrings.inputDescription).value,
			 value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
			}	
		},

		addListItem: function(obj, type){
			// Create HTML string with palceholder text
			let html, newHtml, element;

			if(type === 'inc') {
				element = DOMstrings.incomeContainer;
				html =  '<div class="item clearfix" id="inc-%id%"> <div class="item__description"> %description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div></div>'
			} else if(type === 'exp') {
				element = DOMstrings.expenseContainer;
				html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}

			// Replace pholder text with real data 
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

			// Insert HTML into DOM 
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

		},

		clearFields: function() {
			const fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue)

			// trick slice method into thinking fields is an array
			const fieldsArray = Array.prototype.slice.call(fields);

			// loops over all elements in fieldsArray and sets value to ""
			fieldsArray.forEach(function(current, index, array){
				current.value = "";
			});

			fieldsArray[0].focus();
		},

		deleteListItem: function(selectorID){

			const element = document.getElementById(selectorID)
			element.parentNode.removeChild(element)
		},
		// Public so it can be passed to Global App controller 
		getDOMstrings: function(){
			return DOMstrings;
		},

		displayPercentages: function(percentages){
			
			const fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

			const nodeListForEach = function(list, callback) {
				for (let i = 0; i < list.length; i++){
					callback(list[i], i)
				}
			};

			nodeListForEach(fields, function(current, index){
				if(percentages[index] > 0){
					current.textContent = percentages[index] + '%';
				} else {
					current.textContent = '---';
				}
				
			})
			
		},

		displayMonth: function(){
			let now, year, month;

			now = new Date();

			month = now.getMonth();

			year = now.getFullYear();
			document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;

		},
		displayBudget: function(obj) {
			let type;
			obj.budget > 0 ? type = 'inc' : type = 'exp'

			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
	

			if(obj.percentage > 0){
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		}
	};

})();

// GLOBAL APP CONTROLLER 
const controller = (function(budgetCtrl, UICtrl) {

	const setupEventListeners = function (){

			const DOM = UIController.getDOMstrings();
			// Pass stand along function in here. Callback function. Event listener will call functio.
			document.querySelector(DOM.addBtn).addEventListener("click", ctrlAddItem);
			// If user hits 'enter' --> keyCode 13
			document.addEventListener("keypress", function(e){
			if(e.keyCode === 13){
				ctrlAddItem();	
			} 
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);	
	}

	const updateBudget = function(){

		// 1. Calc budget 
		budgetCtrl.calculateBudget();

		// 2. Return budget 
		const budget = budgetCtrl.getBudget();

		// 3. Display budget on UI
		UICtrl.displayBudget(budget);
	}

	const updatePercentages = function(){

		// 1. Calc %
		budgetCtrl.calculatePercentages();

		// 2. Read % from budget controller
		const percentages = budgetCtrl.getPercentages();

		// 3. Update UI with new &
		UIController.displayPercentages(percentages);

	};
	const ctrlAddItem = function(){
		// 1. Get input field data
		const input = UIController.getInput();

		if(input.description !== "" && !isNaN(input.value) && input.value > 0 ){
			// 2. Add item to the Budget Controller (accepts 3 params)
			const newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// 3. Add the item to UI 
			UIController.addListItem(newItem, input.type)

			// 4. Clear fields 
			UIController.clearFields();

			// 5. Calc and update Budget
			updateBudget();

			// 6. Calc and update &
			updatePercentages();

		}
	
	};

	const ctrlDeleteItem = function(e){
		//traversing the dom to get div element we are interested it -> need the ID
		const itemId =  e.target.parentNode.parentNode.parentNode.parentNode.id;

		if(itemId){

			// inc-1 
			const splitId = itemId.split('-');
			const type = splitId[0];
			const ID = parseInt(splitId[1]);

			// 1. delete item from d.s.
			budgetCtrl.deleteItem(type, ID);

			// 2. delete item from UI
			UIController.deleteListItem(itemId)

			// 3. update and show new budget
			updateBudget()

			// 4. Calc and update &
			updatePercentages();;

		}
	}

	// Public
	return {
		init: function(){
			console.log("App has started")
			UICtrl.displayMonth();
			UICtrl.displayBudget( {
				budget: 0,	
				totalInc: 0, 
				totalExp: 0,
				percentage: 0
			});
			setupEventListeners();
		}
	};

})(budgetController, UIController);


controller.init();