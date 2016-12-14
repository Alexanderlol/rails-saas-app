class Users::RegistrationsController < Devise::RegistrationsController
  #extend default devise gem behaviour so that users signing up with
  #the pro account (plan id 2) save with a special stripe subscription function
  #otherwise devise signs up users as usual
  def create
    super do |resource|
      if params[:plan]
        resource.plan_id = params[:plan]
        if resource.plan_id == 2
          resource.save_with_subscription
        else
          resource.save
        end
      end
    end
  end
end