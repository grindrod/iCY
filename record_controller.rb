class DataController < ApplicationController
  # GET /data
  # GET /data.json
  def create
  @data = Data.new(params[:data])
  respond_to do |format|
      if @data.save
        format.html { redirect_to @data, notice: 'Survey was successfully created.' }
        format.json { render json: @data, status: :created, location: @data }
      else
        format.html { render action: "new" }
        format.json { render json: @data.errors, status: :unprocessable_entity }
      end
    end
  end

  def index
   @datum = Data.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @datum }
    end
  
  
  
  end

end