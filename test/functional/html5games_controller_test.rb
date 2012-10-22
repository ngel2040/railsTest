require 'test_helper'

class Html5gamesControllerTest < ActionController::TestCase
  setup do
    @html5game = html5games(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:html5games)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create html5game" do
    assert_difference('Html5game.count') do
      post :create, html5game: {  }
    end

    assert_redirected_to html5game_path(assigns(:html5game))
  end

  test "should show html5game" do
    get :show, id: @html5game
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @html5game
    assert_response :success
  end

  test "should update html5game" do
    put :update, id: @html5game, html5game: {  }
    assert_redirected_to html5game_path(assigns(:html5game))
  end

  test "should destroy html5game" do
    assert_difference('Html5game.count', -1) do
      delete :destroy, id: @html5game
    end

    assert_redirected_to html5games_path
  end
end
