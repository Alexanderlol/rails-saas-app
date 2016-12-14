/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-signup-btn');
  
  //Set stripe public key
  Stripe.setPublishableKey($('meta[name=stripe-key]').attr('content'));
  
  //when user clicks subimt button
  submitBtn.click(function(event){
    //preven default submission behaviour
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
    //collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('$card_year').val();
    
    //use stripe js library to check for card errors
    var error = false;
    
    //validate card number
    if(!Stripe.card.validateCardNumber(ccNum)){
      error = true;
      alert('The credit card number appears to be invalid');
    }
    //validate cvc number
    if(!Stripe.card.validateCVC(cvcNum)){
      error = true;
      alert('The cvc number appears to be invalid');
    }
    //validate expiration date
    if(!Stripe.card.validateExpiry(expMonth, expYear)){
      error = true;
      alert('The expiration date appears to be invalid');
    }
    
    if(error){
      //if there are card errors dont send to stripe
      submitBtn.prop('disabled', false).val("Sign Up");
    }
    else{
      //send card info to stripe
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    
    return false;
  });
  
  //stripe will return a card token
  function stripeResponseHandler(status, response){
    //get token from response
    var token = response.id;
    
    //inject the card token in a hidden field
    theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token));
    
    //submit form to our rails append
    theForm.get(0).subimt();
  }
});