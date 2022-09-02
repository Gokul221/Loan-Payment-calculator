function validateLoanAmount() {
		var loanAmt = document.getElementById("loanAmtId").value;

			// If amount of loan is not a number and more than 15 lacs
			if(isNaN(loanAmt)) {

				swal({
				  title: "Loan amount should be a number!",
				  text: "Enter valid input",
				  icon: "error",
				});

				// alert("Loan amount should be a Number!");
				document.getElementById("loanAmtId").focus();
				document.getElementById("loanAmtId").select();
				return false;
			} 
			else if(loanAmt > 1500000) {

				swal({
				  title: "Loan amount should not be more than 15 lacs!",
				  text: "Enter valid amount",
				  icon: "error",
				});

				// alert("Loan amount should not be more than 15 lacs!");
				document.getElementById("loanAmtId").focus();
				document.getElementById("loanAmtId").select();
				return false;
			}
		}


		function validateNumber(elementId, elementName) {
			var elementValue = document.getElementById(elementId).value;
			var numbers = /^[0-9]+$/;			// regex

			// If element value is not a number
			if(!elementValue.match(numbers)) {

				swal({
				  title: "Interest should be a number",
				  text: "Enter valid input",
				  icon: "error",
				});


				// alert(elementName + " should be a number");
				document.getElementById(elementId).focus();
				document.getElementById(elementId).select();
				return false;
			}
		}


		function validatePeriod(elementId) {
			var period = document.getElementById(elementId).value;

			// If period is not a number and not between 7 years to 15 years
			if(isNaN(period)) {

				swal({
				  title: "Period should be a number!",
				  text: "Enter valid input",
				  icon: "error",
				});


				// alert("Period should be a number!");
				document.getElementById(elementId).focus();
				document.getElementById(elementId).select();
				return false;
			}
			else if((period < 7) || (period > 15)) {

				swal({
				  title: "Repayment period should be between 7 years to 15 years!",
				  text: "Enter valid Repayment period",
				  icon: "error",
				});


				// alert("Repayment period should be between 7 years to 15 years!");
				document.getElementById(elementId).focus();
				document.getElementById(elementId).select();
				return false;
			}
		}


		function calculatePayment() {
			// monthly payment formula = [P * R * (1+R)^N]/[1+R^N-1]

			var loanAmount = document.loanForm.loanAmt.value;
			var annualInterestRate = document.loanForm.Interest.value;
			var annualPeriod = document.loanForm.years.value;

			// convert interest from a percentage to a decimal
			var monthlyInterestRate = (annualInterestRate/100)/12;

			// convert from annual period to monthly period
			var monthlyPeriod = annualPeriod * 12;

			// now compute the monthly payment figure
			var exponent = Math.pow(1 + monthlyInterestRate, monthlyPeriod);									// (1+R)^N
			var totalMonthlyPayment = (loanAmount * monthlyInterestRate * exponent)/(exponent-1);				// [P * R * (1+R)^N] / [1+R^N-1]

			// check that the result is a finite number, if so, declare the result
			if(!isNaN(totalMonthlyPayment) && (totalMonthlyPayment !== Number.POSITIVE_INFINITY) && (totalMonthlyPayment !== Number.NEGATIVE_INFINITY)) {

				document.loanForm.monthlyPayment.value = round(totalMonthlyPayment);
				document.loanForm.totalPayment.value = round(totalMonthlyPayment * monthlyPeriod);
				document.loanForm.totalInterest.value = round((totalMonthlyPayment * monthlyPeriod) - loanAmount);

				document.getElementById("monthlyPaymentId").readOnly = true;
				document.getElementById("totalPaymentId").readOnly = true;
				document.getElementById("totalInterestId").readOnly = true;
			}
			else {

				// display empty values
				document.loanForm.monthlyPayment.value = "";
				document.loanForm.totalPayment.value = "";
				document.loanForm.totalInterest.value = "";

			}
		}

		// this function rounds a number to two decimal places
		function round(x) {
			return Math.round((x * 100)/100);
		}