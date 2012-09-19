require 'test_helper'

class BackBoneTestsControllerTest < ActionController::TestCase
  setup do
    @back_bone_test = back_bone_tests(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:back_bone_tests)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create back_bone_test" do
    assert_difference('BackBoneTest.count') do
      post :create, back_bone_test: { \ToDo: @back_bone_test.\ToDo }
    end

    assert_redirected_to back_bone_test_path(assigns(:back_bone_test))
  end

  test "should show back_bone_test" do
    get :show, id: @back_bone_test
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @back_bone_test
    assert_response :success
  end

  test "should update back_bone_test" do
    put :update, id: @back_bone_test, back_bone_test: { \ToDo: @back_bone_test.\ToDo }
    assert_redirected_to back_bone_test_path(assigns(:back_bone_test))
  end

  test "should destroy back_bone_test" do
    assert_difference('BackBoneTest.count', -1) do
      delete :destroy, id: @back_bone_test
    end

    assert_redirected_to back_bone_tests_path
  end
end
