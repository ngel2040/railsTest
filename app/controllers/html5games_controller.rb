class Html5gamesController < ApplicationController
  # GET /html5games
  # GET /html5games.json
  def index
    # XXX
    # 동적으로 table만들고 값을 넣고 빼는 로직 필요.
    @html5games = Html5game.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @html5games }
    end
  end

  # GET /html5games/1
  # GET /html5games/1.json
  def show
    @html5game = Html5game.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @html5game }
    end
  end

  # GET /html5games/new
  # GET /html5games/new.json
  def new
    @html5game = Html5game.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @html5game }
    end
  end

  # GET /html5games/1/edit
  def edit
    @html5game = Html5game.find(params[:id])
  end

  # POST /html5games
  # POST /html5games.json
  def create
    @html5game = Html5game.new(params[:html5game])

    respond_to do |format|
      if @html5game.save
        format.html { redirect_to @html5game, notice: 'Html5game was successfully created.' }
        format.json { render json: @html5game, status: :created, location: @html5game }
      else
        format.html { render action: "new" }
        format.json { render json: @html5game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /html5games/1
  # PUT /html5games/1.json
  def update
    @html5game = Html5game.find(params[:id])

    respond_to do |format|
      if @html5game.update_attributes(params[:html5game])
        format.html { redirect_to @html5game, notice: 'Html5game was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @html5game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /html5games/1
  # DELETE /html5games/1.json
  def destroy
    @html5game = Html5game.find(params[:id])
    @html5game.destroy

    respond_to do |format|
      format.html { redirect_to html5games_url }
      format.json { head :no_content }
    end
  end
end
