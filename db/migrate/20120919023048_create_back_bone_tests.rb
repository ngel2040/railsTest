class CreateBackBoneTests < ActiveRecord::Migration
  def change
    create_table :back_bone_tests do |t|
      t.string :ToDo

      t.timestamps
    end
  end
end
