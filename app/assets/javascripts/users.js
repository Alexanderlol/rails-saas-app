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
    
    //collect the credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('$card_year').val();
    //send card info to stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
  });
  
  
  
  //stripe will return a card token
  //inject card token as hidden field into form
  //submit form to our rails app
});