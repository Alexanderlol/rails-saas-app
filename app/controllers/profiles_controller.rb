class ProfilesController < ApplicationController
  #GET to /users/:user_id/profile/new
  def new
    #render a blank profile details form
    @profile = Profile.new
  end
end