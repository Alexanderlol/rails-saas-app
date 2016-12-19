class ProfilesController < ApplicationController
  #GET to /users/:user_id/profile/new
  def new
    #render a blank profile details form
    @profile = Profile.new
  end
  
  #POST  to /users/:user_id/profile
  def create
    #ensure that we have the user who is filling out the form
    @user = User.find( params[:user_id] )
    #create profile linked to this specific user
    @profile = @user.build_profile(profile_params)
    if @profile.save
      flash[:success] = "Profule updated!"
      redirect_to user_path(params[:user_id])
    else
      render action: :new
    end
  end
  
  private
    def profile_params
      params.require(:profile).permit(:first_name, :last_name, :job_title, :phone_number, :contact_email, :description)
    end
end