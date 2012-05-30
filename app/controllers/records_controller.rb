class RecordsController < ApplicationController
  require "csv"
  layout "index2", :only => [:index]
  before_filter :authenticate_user, :only => [:index]
  protect_from_forgery :except => :create
  # GET /records
  # GET /records.json
  def index
    
    @start_date = Date.parse(params[:start_date][:day] + "/" +
                             params[:start_date][:month]+"/" +
                             params[:start_date][:year]).beginning_of_day.to_time.to_i rescue nil
    @end_date = Date.parse(params[:end_date][:day] + "/" +
                           params[:end_date][:month]+"/" +
                           params[:end_date][:year]).end_of_day.to_time.to_i rescue nil
    opts = {:order => "created_at"}
    opts[:conditions]  = (@start_date.nil? ? "" : "created_at >= to_timestamp(#{@start_date})")
    opts[:conditions] += ((@start_date.nil? || @end_date.nil?) ? "" : " and ")
    opts[:conditions] += (@end_date.nil?   ? "" : "created_at <= to_timestamp(#{@end_date})")
    opts.delete_if {|k,v| v == ""}
    @records = (Record.find(:all,opts))
    @records.group_by{|s| s.id}
    @record ||= Record.new
    return render @records if request.xhr?
    respond_to do |format|
      format.html
      format.csv
    end
  end
  def search
  end
  
  def export
    @record = Record.new
    @num = 1
  end

  # GET /records/1
  # GET /records/1.json
  def show
  end
  

  # GET /records/new
  # GET /records/new.json
  def new
    @record = Record.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @record }
    end
  end

  # GET /records/1/edit
  def edit
    @record = Record.find(params[:id])
  end

  # POST /records
  # POST /records.json
  def create
    @records = Record.all
    @record = Record.new 
    @record.datetime = params[:datetime]
    @record.corticosteriods = params[:history]['0']['value']
    @record.anticholinergics = params[:history]['1']['value']
    @record.eyedrops = params[:history]['2']['value']
    @record.diabetes = params[:history]['3']['value']
    @record.hypertension = params[:history]['4']['value']
    @record.glaucoma = params[:history]['5']['value']
    @record.cataracts = params[:history]['6']['value']
    @record.maculardegeneration = params[:history]['7']['value']
    @record.cognitiveimpairment = params[:history]['8']['value']
    @record.glasses = params[:questionnaire]['0']['value']
    @record.magnifier = params[:questionnaire]['1']['value']
    @record.largeprint = params[:questionnaire]['2']['value']
    @record.helpWithMed = params[:questionnaire]['3']['value']
    @record.prescription = params[:questionnaire]['4']['value']
    @record.nonprescription = params[:questionnaire]['5']['value']
    @record.worn = params[:questionnaire]['6']['value']
    @record.glossy = params[:questionnaire]['7']['value']
    @record.time = params[:test][:time]
    @record.userFont = params[:test][:userFont]
    #done = true
    #currId = 1
    #while done
    #  rec = Record[currId]
    #  if rec.nil?
    #    done = false
    #  else
    #    currId += 1
    #  end
    #end
    #@record.userID = currId
    currID = Record.order(:userID).last.userID
    @record.userID = currID + 1
    
    if(params[:history]['9'].nil?)
      @record.other1 = ""
    else 
      if(params[:history]['9']['value'] == "true")
        @record.other1 = params[:history]['9']['name'] end
    end
      
    if(params[:history]['10'].nil?)
      @record.other2 = ""
    else       
      if(params[:history]['10']['value'] == "true")
        @record.other2 = params[:history]['10']['name'] end
    end
      
    if(params[:history]['11'].nil?)
      @record.other3 = ""
    else       
      if(params[:history]['11']['value'] == "true")
        @record.other3 = params[:history]['11']['name'] end
    end   
    
    if(params[:history]['12'].nil?)
      @record.other4 = ""
    else       
      if(params[:history]['12']['value'] == "true")
        @record.other4 = params[:history]['12']['name'] end
    end
      
    if(params[:history]['13'].nil?)
      @record.other5 = ""
    else       
      if(params[:history]['13']['value'] == "true")
        @record.other5 = params[:history]['13']['name'] end
    end
    @record.save
    render :nothing => true
  end

  # PUT /records/1
  # PUT /records/1.json
  def update
    @record = Record.find(params[:id])

    respond_to do |format|
      if @record.update_attributes(params[:record])
        format.html { redirect_to @record, notice: 'Record was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @record.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /records/1
  # DELETE /records/1.json
  def destroy
    @record = Record.find(params[:id])
    @record.destroy

    respond_to do |format|
      format.html { redirect_to records_url }
      format.json { head :no_content }
    end
  end
  
end
