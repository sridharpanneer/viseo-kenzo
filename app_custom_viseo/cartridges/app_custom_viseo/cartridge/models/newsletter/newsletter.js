/**
* Script file for use in the Script pipelet node.
* To define input and output parameters, create entries of the form:
*
* @<paramUsageType> <paramName> : <paramDataType> [<paramComment>]
*
* where
*   <paramUsageType> can be either 'input' or 'output'
*   <paramName> can be any valid parameter name
*   <paramDataType> identifies the type of the parameter
*   <paramComment> is an optional comment
*
* For example:
*
*-   @input ExampleIn : String This is a sample comment.
*-   @output ExampleOut : Number
*
*/


function subscribe(newsletterData) {
	
	var result = {'success' : false, message : ''};
	
	var customObjectMgr = require('dw/object/CustomObjectMgr');
	var subscriptionList = customObjectMgr.queryCustomObjects('Newsletter', 'custom.emailId = {0}', null, newsletterData.hpEmailSignUp);

    if(subscriptionList.count !== 0) {
        result.success = false;
        result.message = 'user alerady registered!';
    } else {
    	
    	try {
    		
    		var Transaction = require('dw/system/Transaction');
    		Transaction.wrap(function () {
    			customObjectMgr.createCustomObject('Newsletter', newsletterData.hpEmailSignUp);
    		});
    		
    		result.success = true;
            result.message = 'user successfully registered!';
    		
    	} catch (e) {
    		result.success = false;
            result.message = 'Some error occurred. Please try again letter!';
		}
		
    }
    
    return result;
	
}

function NewsletterModel(newsletterData) {
	this.subscriptionStatus = subscribe(newsletterData);
	
}

module.exports = NewsletterModel;
