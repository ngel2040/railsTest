class WrapJqueriesController < ApplicationController
  # GET /wrap_jqueries
  # GET /wrap_jqueries.json
  def index
    @wrap_jqueries = WrapJquery.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @wrap_jqueries }
    end
  end

  # GET /wrap_jqueries/1
  # GET /wrap_jqueries/1.json
  def show
    @wrap_jquery = WrapJquery.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @wrap_jquery }
    end
  end

  # GET /wrap_jqueries/new
  # GET /wrap_jqueries/new.json
  def new
    @wrap_jquery = WrapJquery.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @wrap_jquery }
    end
  end

  # GET /wrap_jqueries/1/edit
  def edit
    @wrap_jquery = WrapJquery.find(params[:id])
  end

  # POST /wrap_jqueries
  # POST /wrap_jqueries.json
  def create
    @wrap_jquery = WrapJquery.new(params[:wrap_jquery])

    respond_to do |format|
      if @wrap_jquery.save
        format.html { redirect_to @wrap_jquery, notice: 'Wrap jquery was successfully created.' }
        format.json { render json: @wrap_jquery, status: :created, location: @wrap_jquery }
      else
        format.html { render action: "new" }
        format.json { render json: @wrap_jquery.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /wrap_jqueries/1
  # PUT /wrap_jqueries/1.json
  def update
    @wrap_jquery = WrapJquery.find(params[:id])

    respond_to do |format|
      if @wrap_jquery.update_attributes(params[:wrap_jquery])
        format.html { redirect_to @wrap_jquery, notice: 'Wrap jquery was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @wrap_jquery.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /wrap_jqueries/1
  # DELETE /wrap_jqueries/1.json
  def destroy
    @wrap_jquery = WrapJquery.find(params[:id])
    @wrap_jquery.destroy

    respond_to do |format|
      format.html { redirect_to wrap_jqueries_url }
      format.json { head :no_content }
    end
  end
end
