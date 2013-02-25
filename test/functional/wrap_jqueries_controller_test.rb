require 'test_helper'

class WrapJqueriesControllerTest < ActionController::TestCase
  setup do
    @wrap_jquery = wrap_jqueries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:wrap_jqueries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create wrap_jquery" do
    assert_difference('WrapJquery.count') do
      post :create, wrap_jquery: {  }
    end

    assert_redirected_to wrap_jquery_path(assigns(:wrap_jquery))
  end

  test "should show wrap_jquery" do
    get :show, id: @wrap_jquery
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @wrap_jquery
    assert_response :success
  end

  test "should update wrap_jquery" do
    put :update, id: @wrap_jquery, wrap_jquery: {  }
    assert_redirected_to wrap_jquery_path(assigns(:wrap_jquery))
  end

  test "should destroy wrap_jquery" do
    assert_difference('WrapJquery.count', -1) do
      delete :destroy, id: @wrap_jquery
    end

    assert_redirected_to wrap_jqueries_path
  end
end
