class BackBoneTestsController < ApplicationController
  # GET /back_bone_tests
  # GET /back_bone_tests.json

  def test
    
  end

  def s_01
    
  end

  def b
    
  end

  def s_02
    
  end

  def s_03
    
  end
  
  def index
    @back_bone_tests = BackBoneTest.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @back_bone_tests }
    end
  end

  # GET /back_bone_tests/1
  # GET /back_bone_tests/1.json
  def show
    @back_bone_test = BackBoneTest.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @back_bone_test }
    end
  end

  # GET /back_bone_tests/new
  # GET /back_bone_tests/new.json
  def new
    @back_bone_test = BackBoneTest.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @back_bone_test }
    end
  end

  # GET /back_bone_tests/1/edit
  def edit
    @back_bone_test = BackBoneTest.find(params[:id])
  end

  # POST /back_bone_tests
  # POST /back_bone_tests.json
  def create
    @back_bone_test = BackBoneTest.new(params[:back_bone_test])

    respond_to do |format|
      if @back_bone_test.save
        format.html { redirect_to @back_bone_test, notice: 'Back bone test was successfully created.' }
        format.json { render json: @back_bone_test, status: :created, location: @back_bone_test }
      else
        format.html { render action: "new" }
        format.json { render json: @back_bone_test.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /back_bone_tests/1
  # PUT /back_bone_tests/1.json
  def update
    @back_bone_test = BackBoneTest.find(params[:id])

    respond_to do |format|
      if @back_bone_test.update_attributes(params[:back_bone_test])
        format.html { redirect_to @back_bone_test, notice: 'Back bone test was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @back_bone_test.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /back_bone_tests/1
  # DELETE /back_bone_tests/1.json
  def destroy
    @back_bone_test = BackBoneTest.find(params[:id])
    @back_bone_test.destroy

    respond_to do |format|
      format.html { redirect_to back_bone_tests_url }
      format.json { head :no_content }
    end
  end
end
